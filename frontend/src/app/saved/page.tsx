"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiBookmark, FiHeart } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import ListingCard from "@/components/ListingCard";

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

export default function SavedListings() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }
    fetchSavedListings();
  }, [token, router]);

  const fetchSavedListings = async () => {
    try {
      // Fetch user data to get saved listings
      const userResponse = await api.get("/auth/me");
      const savedIds = userResponse.data.data.user.savedListings || [];

      if (savedIds.length === 0) {
        setLoading(false);
        return;
      }

      // Fetch all listings and filter saved ones
      const response = await api.get("/listings", {
        params: { limit: 100 },
      });

      const allListings = response.data.data.listings;
      const saved = allListings.filter((listing: Listing) =>
        savedIds.includes(listing._id),
      );

      setSavedListings(saved);
    } catch (error) {
      console.error("Error fetching saved listings:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!token || !user) {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <FiBookmark className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold gradient-text">
                Saved Experiences
              </h1>
              <p className="text-gray-600 mt-1">
                Your collection of favorite travel experiences
              </p>
            </div>
          </div>
        </motion.div>

        {/* Saved Listings */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-semibold">
                Loading saved experiences...
              </p>
            </div>
          </div>
        ) : savedListings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-12 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiHeart className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No saved experiences yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start saving experiences you love to find them easily later!
            </p>
            <button onClick={() => router.push("/")} className="btn-primary">
              Explore Experiences
            </button>
          </motion.div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {savedListings.length}{" "}
                {savedListings.length === 1 ? "experience" : "experiences"}{" "}
                saved
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedListings.map((listing, index) => (
                <motion.div
                  key={listing._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ListingCard
                    listing={listing}
                    onUpdate={fetchSavedListings}
                  />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
