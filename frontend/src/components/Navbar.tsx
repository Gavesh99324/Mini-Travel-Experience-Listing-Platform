"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { FiMenu, FiX, FiPlus, FiUser, FiLogOut, FiHeart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold gradient-text hidden sm:block">
                TravelXP
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    href="/create"
                    className="btn-primary flex items-center space-x-2"
                  >
                    <FiPlus className="w-5 h-5" />
                    <span>Create Listing</span>
                  </Link>

                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full ring-2 ring-indigo-500"
                      />
                      <span className="font-semibold text-gray-700">
                        {user.name}
                      </span>
                    </button>

                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
                        >
                          <Link
                            href="/profile"
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <FiUser className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700">My Profile</span>
                          </Link>
                          <Link
                            href="/saved"
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <FiHeart className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-700">
                              Saved Listings
                            </span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
                          >
                            <FiLogOut className="w-5 h-5" />
                            <span>Logout</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="btn-secondary"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="btn-primary"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FiX className="w-6 h-6 text-gray-700" />
              ) : (
                <FiMenu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="container-custom py-4 space-y-3">
                {user ? (
                  <>
                    <Link
                      href="/create"
                      className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FiPlus className="w-5 h-5" />
                      <span>Create Listing</span>
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-100 rounded-xl"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FiUser className="w-5 h-5" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      href="/saved"
                      className="flex items-center space-x-2 px-4 py-3 hover:bg-gray-100 rounded-xl"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FiHeart className="w-5 h-5" />
                      <span>Saved Listings</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      <FiLogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setShowLoginModal(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full btn-secondary"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setShowRegisterModal(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full btn-primary"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
}
