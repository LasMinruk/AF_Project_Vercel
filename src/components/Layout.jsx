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
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          borderBottom: "1px solid #e5e7eb",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0.5rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: "clamp(1.25rem, 4vw, 1.5rem)",
              fontWeight: "700",
              color: "#1d4ed8",
              transition: "all 0.2s",
              textDecoration: "none",
              display: "inline-block",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#ef4444";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#1d4ed8";
              e.target.style.transform = "scale(1)";
            }}
          >
            Country Explorer
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flexWrap: "wrap",
              justifyContent: "flex-end",
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
                padding: "0.375rem 0.75rem",
                borderRadius: "9999px",
                fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                fontWeight: "500",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                whiteSpace: "nowrap",
              }}
            >
              <FaHeart />
              Favorites
              {favorites.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-0.5rem",
                    right: "-0.5rem",
                    backgroundColor: "#db2777",
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    borderRadius: "9999px",
                    padding: "0.125rem 0.375rem",
                    minWidth: "1.25rem",
                    textAlign: "center",
                  }}
                >
                  {favorites.length}
                </span>
              )}
            </motion.button>

            {/* Auth buttons */}
            {currentUser ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "#374151",
                    display: "none",
                  }}
                >
                  {currentUser.email}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    padding: "0.375rem 0.75rem",
                    borderRadius: "0.375rem",
                    fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  padding: "0.375rem 0.75rem",
                  borderRadius: "0.375rem",
                  fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  whiteSpace: "nowrap",
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
          padding: "0.5rem 1rem 1.5rem",
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          fontSize: "clamp(0.625rem, 2vw, 0.75rem)",
          color: "#6b7280",
          padding: "1rem 0",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        © {new Date().getFullYear()} Country Explorer. All rights reserved. Created by <span style={{ color: "#1d4ed8", fontWeight: "500" }}>Lasiru</span>
      </footer>
    </div>
  );
};

export default Layout;
