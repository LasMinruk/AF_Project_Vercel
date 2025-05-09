import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useAuth } from "../contexts/AuthContext";
import { FaHeart } from "react-icons/fa";

const CountryCard = ({ country }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { currentUser } = useAuth();
  const isFavorite = favorites.some((fav) => fav.cca3 === country.cca3);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  if (!country) return null;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (!currentUser) {
      setShowLoginPopup(true);
      return;
    }
    isFavorite ? removeFavorite(country.cca3) : addFavorite(country);
  };

  const handleHeartMouseEnter = () => {
    if (!currentUser) setShowLoginPopup(true);
  };

  const handleHeartMouseLeave = () => {
    setShowLoginPopup(false);
  };

  return (
    <Link
      to={`/country/${country.cca3}`}
      style={{
        position: "relative",
        backgroundColor: "#ffffff",
        borderRadius: "1rem",
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.07)",
        padding: "1.2rem",
        marginBottom: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        textDecoration: "none",
        color: "#1f2937",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.015)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Favorite Button */}
      <div style={{ position: "relative" }}>
        <button
          onClick={handleFavoriteClick}
          onMouseEnter={handleHeartMouseEnter}
          onMouseLeave={handleHeartMouseLeave}
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "9999px",
            padding: "0.4rem",
            cursor: "pointer",
            zIndex: 10,
          }}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <FaHeart style={{ color: isFavorite ? "#ef4444" : "#9ca3af", fontSize: "1rem" }} />
        </button>
        {/* Login Required Popup */}
        {showLoginPopup && !currentUser && (
          <div style={{
            position: "absolute",
            top: "-2.5rem",
            right: 0,
            left: "auto",
            background: "#ef4444",
            color: "white",
            padding: "0.5rem 1.2rem",
            borderRadius: "0.75rem",
            fontWeight: 500,
            fontSize: "0.95rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            zIndex: 100,
            whiteSpace: "nowrap"
          }}>
            First you have to login for save favourites
          </div>
        )}
      </div>
      {/* Flag */}
      <div
        style={{
          borderRadius: "0.75rem",
          overflow: "hidden",
          height: "180px",
          backgroundColor: "#f9fafb",
        }}
      >
        <img
          src={country.flags.svg || country.flags.png}
          alt={`${country.name.common} flag`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      {/* Details */}
      <div style={{ padding: "0 0.25rem" }}>
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
            color: "#111827",
          }}
        >
          {country.name.common}
        </h2>
        <p style={infoText}><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p style={infoText}><strong>Region:</strong> {country.region}</p>
        <p style={infoText}><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
      </div>
    </Link>
  );
};

const infoText = {
  fontSize: "0.9rem",
  color: "#374151",
  marginBottom: "0.3rem",
};

export default CountryCard;
