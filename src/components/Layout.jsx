import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFavorites } from "../contexts/FavoritesContext";
import { useAuth } from "../contexts/AuthContext";

// Main layout component with header, main content, and footer
const Layout = ({ children }) => {
  // Get favorites and auth context hooks
  const { favorites } = useFavorites();
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle favorites button click
  const handleFavoritesClick = () => {
    if (location.pathname !== "/") {
      localStorage.setItem("showFavoritesOnly", "true");
      navigate("/favorites");
    } else {
      window.dispatchEvent(new Event("favorites-toggle"));
    }
  };

  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-white min-h-screen text-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          
          {/* Brand Name with Hover Effect */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-blue-700 hover:text-red-600 hover:scale-110 transition duration-200 ease-in-out transform"
          >
            Country Explorer
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* Favorites Button */}
            <motion.button
              onClick={handleFavoritesClick}
              className="relative bg-pink-100 hover:bg-pink-200 text-pink-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm font-medium shadow-sm transition"
              whileHover={{ scale: 1.05 }}
            >
              💖 Favorites
              {favorites.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full px-1.5 py-[1px]"
                >
                  {favorites.length}
                </motion.span>
              )}
            </motion.button>

            {/* Auth Buttons */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 hidden sm:block">
                  {currentUser.email}
                </span>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm shadow-sm transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm shadow-sm transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-4 border-t border-gray-200">
        © {new Date().getFullYear()} Country Explorer. Created by Lasiru Minruk.
      </footer>
    </div>
  );
};

export default Layout;
