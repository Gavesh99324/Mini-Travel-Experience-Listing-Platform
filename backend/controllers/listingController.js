import Listing from "../models/Listing.js";
import User from "../models/User.js";

// @desc    Get all listings with search and pagination
// @route   GET /api/listings
// @access  Public
export const getListings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }

    const listings = await Listing.find(query)
      .populate("creator", "name email avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Listing.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        listings,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Public
export const getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "creator",
      "name email avatar",
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.status(200).json({
      success: true,
      data: { listing },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new listing
// @route   POST /api/listings
// @access  Private
export const createListing = async (req, res) => {
  try {
    const { title, location, description, price, image } = req.body;

    const listing = await Listing.create({
      title,
      location,
      description,
      price,
      image,
      creator: req.user.id,
    });

    const populatedListing = await Listing.findById(listing._id).populate(
      "creator",
      "name email avatar",
    );

    res.status(201).json({
      success: true,
      data: { listing: populatedListing },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private
export const updateListing = async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Check if user is the creator
    if (listing.creator.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this listing",
      });
    }

    listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("creator", "name email avatar");

    res.status(200).json({
      success: true,
      data: { listing },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Check if user is the creator
    if (listing.creator.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this listing",
      });
    }

    await listing.deleteOne();

    res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Like/Unlike listing
// @route   POST /api/listings/:id/like
// @access  Private
export const toggleLike = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    const isLiked = listing.likes.includes(req.user.id);

    if (isLiked) {
      // Unlike
      listing.likes = listing.likes.filter(
        (id) => id.toString() !== req.user.id,
      );
    } else {
      // Like
      listing.likes.push(req.user.id);
    }

    await listing.save();

    res.status(200).json({
      success: true,
      data: {
        isLiked: !isLiked,
        likesCount: listing.likesCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Save/Unsave listing
// @route   POST /api/listings/:id/save
// @access  Private
export const toggleSave = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    const user = await User.findById(req.user.id);
    const isSaved = user.savedListings.includes(req.params.id);

    if (isSaved) {
      // Unsave
      user.savedListings = user.savedListings.filter(
        (id) => id.toString() !== req.params.id,
      );
    } else {
      // Save
      user.savedListings.push(req.params.id);
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        isSaved: !isSaved,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Upload listing image
// @route   POST /api/listings/upload
// @access  Private
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.status(200).json({
      success: true,
      data: { imageUrl },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
