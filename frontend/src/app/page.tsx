"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";
import api from "@/lib/api";
import ListingCard from "@/components/ListingCard";
import { useInView } from "react-intersection-observer";

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

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    fetchListings(1, search);
  }, [search]);

  useEffect(() => {
    if (inView && hasMore && !isLoadingMore) {
      loadMore();
    }
  }, [inView]);

  const fetchListings = async (pageNum: number, searchQuery: string) => {
    try {
      const response = await api.get("/listings", {
        params: {
          page: pageNum,
          limit: 9,
          search: searchQuery,
        },
      });

      const newListings = response.data.data.listings;
      const pagination = response.data.data.pagination;

      if (pageNum === 1) {
        setListings(newListings);
      } else {
        setListings((prev) => [...prev, ...newListings]);
      }

      setHasMore(pagination.page < pagination.pages);
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMore = async () => {
    setIsLoadingMore(true);
    await fetchListings(page + 1, search);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setLoading(true);
    setPage(1);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Discover Unique</span>
            <br />
            Travel Experiences
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Connect with local guides and explore authentic adventures around
            the world
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search by title, location, or description..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-16 pr-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all duration-300 text-lg bg-white shadow-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Listings Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-semibold">
                Loading amazing experiences...
              </p>
            </div>
          </div>
        ) : listings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No experiences found
            </h3>
            <p className="text-gray-600">
              {search
                ? `No results for "${search}". Try a different search.`
                : "Be the first to create a travel experience!"}
            </p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((listing, index) => (
                <motion.div
                  key={listing._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ListingCard listing={listing} />
                </motion.div>
              ))}
            </div>

            {/* Load More Trigger */}
            {hasMore && (
              <div ref={ref} className="flex justify-center py-12">
                {isLoadingMore && (
                  <div className="flex items-center space-x-3 text-indigo-600">
                    <FiLoader className="w-6 h-6 animate-spin" />
                    <span className="font-semibold">Loading more...</span>
                  </div>
                )}
              </div>
            )}

            {!hasMore && listings.length > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 font-semibold">
                  You've reached the end! 🎉
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
