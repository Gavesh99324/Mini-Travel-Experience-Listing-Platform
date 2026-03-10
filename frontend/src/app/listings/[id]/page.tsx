"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiMapPin,
  FiUser,
  FiClock,
  FiHeart,
  FiBookmark,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";

interface Listing {
  _id: string;
  title: string;
  location: string;
  description: string;
  price?: number;
  image: string;
  creator: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
  };
  likes: string[];
  likesCount: number;
  createdAt: string;
}

export default function ListingDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user, token } = useAuth();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [params.id]);

  useEffect(() => {
    if (listing && user) {
      setIsLiked(listing.likes.includes(user.id));
      setIsSaved(user.savedListings?.includes(listing._id) || false);
      setLikesCount(listing.likesCount);
    }
  }, [listing, user]);

  const fetchListing = async () => {
    try {
      const response = await api.get(`/listings/${params.id}`);
      setListing(response.data.data.listing);
    } catch (error: any) {
      toast.error("Failed to load listing");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!token) {
      toast.error("Please login to like listings");
      return;
    }

    try {
      const response = await api.post(`/listings/${params.id}/like`);
      setIsLiked(response.data.data.isLiked);
      setLikesCount(response.data.data.likesCount);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to like listing");
    }
  };

  const handleSave = async () => {
    if (!token) {
      toast.error("Please login to save listings");
      return;
    }

    try {
      const response = await api.post(`/listings/${params.id}/save`);
      setIsSaved(response.data.data.isSaved);
      toast.success(
        response.data.data.isSaved ? "Listing saved!" : "Listing unsaved",
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save listing");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    setDeleting(true);
    try {
      await api.delete(`/listings/${params.id}`);
      toast.success("Listing deleted successfully");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete listing");
      setDeleting(false);
    }
  };

  const getImageUrl = (url: string) => {
    if (url.startsWith("http")) return url;
    return `http://localhost:5000${url}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading experience...</p>
        </div>
      </div>
    );
  }

  if (!listing) return null;

  const isOwner = user && listing.creator._id === user.id;

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8 font-semibold"
        >
          <FiArrowLeft className="w-5 h-5 mr-2" />
          Back to Feed
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card overflow-hidden"
        >
          {/* Image */}
          <div className="relative h-[500px]">
            <img
              src={getImageUrl(listing.image)}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Price Badge */}
            {listing.price && (
              <div className="absolute bottom-6 left-6">
                <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="text-indigo-600 font-bold text-2xl">
                    ${listing.price}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {listing.title}
                </h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <FiMapPin className="w-5 h-5 mr-2" />
                  <span className="text-lg">{listing.location}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  className={`p-4 rounded-xl transition-colors ${
                    isLiked
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FiHeart
                    className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  className={`p-4 rounded-xl transition-colors ${
                    isSaved
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FiBookmark
                    className={`w-6 h-6 ${isSaved ? "fill-current" : ""}`}
                  />
                </motion.button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center text-gray-600">
                <FiHeart className="w-5 h-5 mr-2" />
                <span className="font-semibold">{likesCount} likes</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiClock className="w-5 h-5 mr-2" />
                <span>
                  Posted{" "}
                  {formatDistanceToNow(new Date(listing.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Experience
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                {listing.description}
              </p>
            </div>

            {/* Creator */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Hosted By
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={listing.creator.avatar}
                    alt={listing.creator.name}
                    className="w-16 h-16 rounded-full ring-4 ring-white"
                  />
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      {listing.creator.name}
                    </p>
                    <p className="text-gray-600">{listing.creator.email}</p>
                  </div>
                </div>
                <FiUser className="w-12 h-12 text-indigo-300" />
              </div>
            </div>

            {/* Owner Actions */}
            {isOwner && (
              <div className="flex gap-4">
                <Link
                  href={`/listings/${listing._id}/edit`}
                  className="btn-secondary flex-1 flex items-center justify-center space-x-2"
                >
                  <FiEdit className="w-5 h-5" />
                  <span>Edit Listing</span>
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <FiTrash2 className="w-5 h-5" />
                  <span>{deleting ? "Deleting..." : "Delete Listing"}</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
