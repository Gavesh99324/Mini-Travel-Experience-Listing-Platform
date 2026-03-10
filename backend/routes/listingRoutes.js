import express from "express";
import {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  toggleLike,
  toggleSave,
  uploadImage,
} from "../controllers/listingController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Public routes
router.get("/", getListings);
router.get("/:id", getListing);

// Protected routes
router.post("/", protect, createListing);
router.put("/:id", protect, updateListing);
router.delete("/:id", protect, deleteListing);
router.post("/:id/like", protect, toggleLike);
router.post("/:id/save", protect, toggleSave);
router.post("/upload/image", protect, upload.single("image"), uploadImage);

export default router;
