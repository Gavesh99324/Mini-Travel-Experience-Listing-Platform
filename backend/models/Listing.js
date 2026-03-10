import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
    },
    price: {
      type: Number,
      min: [0, "Price cannot be negative"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Index for search functionality
listingSchema.index({ title: "text", location: "text", description: "text" });

// Update likesCount before saving
listingSchema.pre("save", function (next) {
  this.likesCount = this.likes.length;
  next();
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
