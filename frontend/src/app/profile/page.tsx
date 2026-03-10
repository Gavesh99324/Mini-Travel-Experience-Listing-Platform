"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiCalendar, FiHeart } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
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

export default function Profile() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/");
      return;
    }
    fetchMyListings();
  }, [token, router]);

  const fetchMyListings = async () => {
    try {
      const response = await api.get("/listings", {
        params: { limit: 100 },
      });
      const allListings = response.data.data.listings;
      const userListings = allListings.filter(
        (listing: Listing) => listing.creator._id === user?.id,
      );
      setMyListings(userListings);
    } catch (error) {
      console.error("Error fetching listings:", error);
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
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-full ring-8 ring-indigo-100 shadow-xl"
            />

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold gradient-text mb-4">
                {user.name}
              </h1>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center md:justify-start text-gray-600">
                  <FiMail className="w-5 h-5 mr-3" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start text-gray-600">
                  <FiUser className="w-5 h-5 mr-3" />
                  <span>Experience Host</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 px-6 py-3 rounded-xl">
                  <div className="text-3xl font-bold text-indigo-600">
                    {myListings.length}
                  </div>
                  <div className="text-sm text-gray-600">Experiences</div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-red-50 px-6 py-3 rounded-xl">
                  <div className="text-3xl font-bold text-pink-600">
                    {myListings.reduce(
                      (acc, listing) => acc + listing.likesCount,
                      0,
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Total Likes</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* My Listings */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            My Experiences
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-semibold">
                Loading your experiences...
              </p>
            </div>
          </div>
        ) : myListings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-12 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiHeart className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No experiences yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start sharing your amazing travel experiences with the world!
            </p>
            <button
              onClick={() => router.push("/create")}
              className="btn-primary"
            >
              Create Your First Experience
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myListings.map((listing, index) => (
              <motion.div
                key={listing._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ListingCard listing={listing} onUpdate={fetchMyListings} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
