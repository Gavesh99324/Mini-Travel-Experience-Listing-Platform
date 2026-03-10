"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiArrowLeft, FiUploadCloud, FiX } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";

export default function EditListing({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetchingListing, setFetchingListing] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (!token) {
      toast.error("Please login to edit listing");
      router.push("/");
      return;
    }
    fetchListing();
  }, [token, router, params.id]);

  const fetchListing = async () => {
    try {
      const response = await api.get(`/listings/${params.id}`);
      const listing = response.data.data.listing;

      // Check if user is the owner
      if (user && listing.creator._id !== user.id) {
        toast.error("You are not authorized to edit this listing");
        router.push("/");
        return;
      }

      setFormData({
        title: listing.title,
        location: listing.location,
        description: listing.description,
        price: listing.price?.toString() || "",
        image: listing.image,
      });

      const imageUrl = listing.image.startsWith("http")
        ? listing.image
        : `http://localhost:5000${listing.image}`;
      setImagePreview(imageUrl);
    } catch (error: any) {
      toast.error("Failed to load listing");
      router.push("/");
    } finally {
      setFetchingListing(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setUploading(true);
    const formDataImage = new FormData();
    formDataImage.append("image", file);

    try {
      const response = await api.post("/listings/upload/image", formDataImage, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.data.imageUrl;
      setFormData({ ...formData, image: imageUrl });
      setImagePreview(`http://localhost:5000${imageUrl}`);
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setFormData({ ...formData, image: url });
    setImagePreview(url);
  };

  const removeImage = () => {
    setFormData({ ...formData, image: "" });
    setImagePreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        price: formData.price ? Number(formData.price) : undefined,
      };

      await api.put(`/listings/${params.id}`, submitData);
      toast.success("Listing updated successfully!");
      router.push(`/listings/${params.id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update listing");
    } finally {
      setLoading(false);
    }
  };

  if (!token || fetchingListing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom max-w-4xl">
        <Link
          href={`/listings/${params.id}`}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8 font-semibold"
        >
          <FiArrowLeft className="w-5 h-5 mr-2" />
          Back to Listing
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Edit Experience
          </h1>
          <p className="text-gray-600 mb-8">
            Update your travel experience details
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Experience Image *
              </label>

              {imagePreview ? (
                <div className="relative h-80 rounded-xl overflow-hidden group">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <label className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <FiUploadCloud className="w-16 h-16 text-gray-400 mb-4" />
                    <span className="text-gray-600 font-semibold mb-2">
                      {uploading ? "Uploading..." : "Click to upload image"}
                    </span>
                    <span className="text-sm text-gray-500">
                      PNG, JPG up to 5MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="text-gray-500 text-sm">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  <input
                    type="url"
                    placeholder="Paste image URL here"
                    value={formData.image}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    className="input-field"
                  />
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Experience Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="input-field"
                placeholder="e.g., Sunset Boat Tour"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="input-field"
                placeholder="e.g., Bali, Indonesia"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="input-field min-h-[150px]"
                placeholder="Describe your experience in detail..."
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (USD) - Optional
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="input-field pl-8"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push(`/listings/${params.id}`)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !formData.image}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Experience"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
