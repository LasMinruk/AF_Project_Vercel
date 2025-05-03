import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useFavorites } from "../contexts/FavoritesContext";
import { useAuth } from "../contexts/AuthContext";
import { FaHeart, FaUser, FaSignOutAlt } from "react-icons/fa";

const Layout = ({ children }) => {
  const { favorites } = useFavorites();
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleFavoritesClick = () => {
    if (location.pathname !== "/") {
      localStorage.setItem("showFavoritesOnly", "true");
      navigate("/favorites");
    } else {
      window.dispatchEvent(new Event("favorites-toggle"));
    }
  };

  const handleLogout = () => logout();

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, white, #f0f9ff, white)",
        minHeight: "100vh",
        color: "#1f2937",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          borderBottom: "1px solid #e5e7eb",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0.75rem 1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            rowGap: "0.5rem",
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: "1.75rem",
              fontWeight: "800",
              color: "#1d4ed8",
              textDecoration: "none",
              letterSpacing: "-0.5px",
              flex: "1 1 auto",
            }}
          >
            Country Explorer
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "flex-end",
              flex: "1 1 auto",
            }}
          >
            {/* Favorites */}
            <motion.button
              onClick={handleFavoritesClick}
              whileHover={{ scale: 1.05 }}
              style={{
                position: "relative",
                backgroundColor: "#fce7f3",
                color: "#be185d",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "none",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
            >
              <FaHeart />
              Favorites
              {favorites.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#db2777",
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    borderRadius: "9999px",
                    padding: "2px 6px",
                    lineHeight: 1,
                  }}
                >
                  {favorites.length}
                </motion.span>
              )}
            </motion.button>

            {/* Auth buttons */}
            {currentUser ? (
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: "none",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                <FaSignOutAlt />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  textDecoration: "none",
                }}
              >
                <FaUser />
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          flexGrow: 1,
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1rem",
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "1rem",
          fontSize: "0.75rem",
          color: "#6b7280",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        © {new Date().getFullYear()} Country Explorer. All rights reserved. Created by <span style={{ color: "#1d4ed8", fontWeight: "500" }}>Lasiru</span>
      </footer>
    </div>
  );
};

export default Layout;
