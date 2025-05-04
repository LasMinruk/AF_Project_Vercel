import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { FaHeart } from "react-icons/fa";

const CountryCard = ({ country }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.cca3 === country.cca3);

  if (!country) return null;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    isFavorite ? removeFavorite(country.cca3) : addFavorite(country);
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
      <button
        onClick={handleFavoriteClick}
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
