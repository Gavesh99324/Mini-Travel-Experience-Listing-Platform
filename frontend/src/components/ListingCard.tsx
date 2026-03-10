"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMapPin, FiHeart, FiBookmark, FiClock } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import toast from "react-hot-toast";

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
    avatar: string;
  };
  likes: string[];
  likesCount: number;
  createdAt: string;
}

interface ListingCardProps {
  listing: Listing;
  onUpdate?: () => void;
}

export default function ListingCard({ listing, onUpdate }: ListingCardProps) {
  const { user, token } = useAuth();
  const [isLiked, setIsLiked] = useState(
    user ? listing.likes.includes(user.id) : false,
  );
  const [isSaved, setIsSaved] = useState(
    user ? user.savedListings?.includes(listing._id) : false,
  );
  const [likesCount, setLikesCount] = useState(listing.likesCount);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      toast.error("Please login to like listings");
      return;
    }

    try {
      const response = await api.post(`/listings/${listing._id}/like`);
      setIsLiked(response.data.data.isLiked);
      setLikesCount(response.data.data.likesCount);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to like listing");
    }
  };

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!token) {
      toast.error("Please login to save listings");
      return;
    }

    try {
      const response = await api.post(`/listings/${listing._id}/save`);
      setIsSaved(response.data.data.isSaved);
      toast.success(
        response.data.data.isSaved ? "Listing saved!" : "Listing unsaved",
      );
      if (onUpdate) onUpdate();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save listing");
    }
  };

  const getImageUrl = (url: string) => {
    if (url.startsWith("http")) return url;
    return `http://localhost:5000${url}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="card group cursor-pointer"
    >
      <Link href={`/listings/${listing._id}`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={getImageUrl(listing.image)}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Like and Save buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`p-3 rounded-full backdrop-blur-md transition-colors ${
                isLiked
                  ? "bg-red-500 text-white"
                  : "bg-white/90 text-gray-700 hover:bg-white"
              }`}
            >
              <FiHeart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSave}
              className={`p-3 rounded-full backdrop-blur-md transition-colors ${
                isSaved
                  ? "bg-indigo-500 text-white"
                  : "bg-white/90 text-gray-700 hover:bg-white"
              }`}
            >
              <FiBookmark
                className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`}
              />
            </motion.button>
          </div>

          {/* Price badge */}
          {listing.price && (
            <div className="absolute bottom-4 left-4">
              <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-indigo-600 font-bold text-lg">
                  ${listing.price}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
              {listing.title}
            </h3>
          </div>

          <div className="flex items-center text-gray-600 mb-3">
            <FiMapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{listing.location}</span>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {listing.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <img
                src={listing.creator.avatar}
                alt={listing.creator.name}
                className="w-8 h-8 rounded-full ring-2 ring-indigo-100"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {listing.creator.name}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <FiClock className="w-3 h-3 mr-1" />
                  {formatDistanceToNow(new Date(listing.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>

            {likesCount > 0 && (
              <div className="flex items-center text-gray-600">
                <FiHeart className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">{likesCount}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
