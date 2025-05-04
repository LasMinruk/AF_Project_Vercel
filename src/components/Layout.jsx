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
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid #e5e7eb",
          boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0.75rem 1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
              fontWeight: "700",
              color: "#1d4ed8",
              textDecoration: "none",
              position: "relative",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#1d4ed8";
            }}
          >
            Country Explorer
            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: -2,
                width: "100%",
                height: "2px",
                backgroundColor: "#ef4444",
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.3s ease-in-out",
              }}
              className="underline-hover"
            />
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
                backgroundColor: "#fdf2f8",
                color: "#be185d",
                padding: "0.4rem 0.9rem",
                borderRadius: "9999px",
                fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                border: "1px solid #f9a8d4",
                cursor: "pointer",
              }}
            >
              <FaHeart />
              Favorites
              {favorites.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-0.4rem",
                    right: "-0.6rem",
                    backgroundColor: "#db2777",
                    color: "#fff",
                    fontSize: "0.7rem",
                    fontWeight: "700",
                    borderRadius: "9999px",
                    padding: "0.15rem 0.45rem",
                    minWidth: "1.25rem",
                    textAlign: "center",
                  }}
                >
                  {favorites.length}
                </span>
              )}
            </motion.button>

            {/* Auth */}
            {currentUser ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {/* User Avatar (first letter) */}
                <div
                  style={{
                    backgroundColor: "#e0f2fe",
                    color: "#0369a1",
                    fontWeight: "700",
                    borderRadius: "9999px",
                    width: "2rem",
                    height: "2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                  }}
                  title={currentUser.email}
                >
                  {currentUser.email[0].toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "#fff",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "0.5rem",
                    fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    border: "none",
                    cursor: "pointer",
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
                  backgroundColor: "#2563eb",
                  color: "white",
                  padding: "0.4rem 0.9rem",
                  borderRadius: "0.5rem",
                  fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
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

      {/* Main content */}
      <main
        style={{
          flexGrow: 1,
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1rem 1.25rem 2rem",
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          fontSize: "clamp(0.7rem, 2vw, 0.875rem)",
          color: "#6b7280",
          padding: "1.25rem 0",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        © {new Date().getFullYear()} Country Explorer. All rights reserved. Created by{" "}
        <span style={{ color: "#1d4ed8", fontWeight: "600" }}>Lasiru</span>
      </footer>
    </div>
  );
};

export default Layout;
