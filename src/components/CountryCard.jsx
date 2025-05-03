import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { FaHeart } from "react-icons/fa";

// Component for displaying country information in a card format
const CountryCard = ({ country }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.cca3 === country.cca3);

  if (!country) return null;

  // Handle favorite button click
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isFavorite) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  return (
    <Link
      to={`/country/${country.cca3}`}
      style={{
        position: "relative",
        backgroundColor: "white",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        padding: "1rem",
        transition: "all 0.3s",
        display: "block",
        textDecoration: "none"
      }}
    >
      <button
        onClick={handleFavoriteClick}
        style={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          fontSize: "1.25rem",
          backgroundColor: "white",
          opacity: 0.9,
          padding: "0.25rem 0.5rem",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          zIndex: 10
        }}
      >
        <FaHeart style={{ color: isFavorite ? "#ec4899" : "#9ca3af" }} />
      </button>

      <div style={{ marginBottom: "1rem" }}>
        <img
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
            borderRadius: "0.375rem"
          }}
        />
      </div>

      <h2 style={{
        fontSize: "1.125rem",
        fontWeight: "600",
        color: "#1f2937",
        marginBottom: "0.25rem"
      }}>
        {country.name.common}
      </h2>

      <p style={{
        fontSize: "0.875rem",
        color: "#374151"
      }}>
        <strong>Population:</strong> {country.population.toLocaleString()}
      </p>

      <p style={{
        fontSize: "0.875rem",
        color: "#374151"
      }}>
        <strong>Region:</strong> {country.region}
      </p>

      <p style={{
        fontSize: "0.875rem",
        color: "#374151"
      }}>
        <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
      </p>
    </Link>
  );
};

export default CountryCard;
