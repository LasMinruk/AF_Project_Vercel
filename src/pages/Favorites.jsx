import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import CountryCard from "../components/CountryCard";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites } = useFavorites();

  const containerStyle = {
    padding: "2rem 1rem",
    maxWidth: "1280px",
    margin: "0 auto",
  };

  const headingStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#1f2937",
  };

  const emptyStateStyle = {
    textAlign: "center",
    padding: "2rem 1rem",
    color: "#4b5563",
  };

  const linkStyle = {
    color: "#2563eb",
    textDecoration: "underline",
    fontWeight: "500",
    fontSize: "1rem",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.5rem",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>🌍 Favorite Countries</h1>

      {favorites.length === 0 ? (
        <div style={emptyStateStyle}>
          <p style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
            You haven’t added any favorites yet.
          </p>
          <Link to="/" style={linkStyle}>
            Browse Countries
          </Link>
        </div>
      ) : (
        <div style={gridStyle}>
          {favorites.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
