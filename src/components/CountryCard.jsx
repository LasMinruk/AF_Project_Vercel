import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useAuth } from "../contexts/AuthContext";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// Component for displaying country information in a card format
const CountryCard = ({ country }) => {
  // Get favorites and auth context hooks
  const { toggleFavorite, isFavorite } = useFavorites();
  const { currentUser } = useAuth();

  if (!country) return null;

  // Check if country is in favorites
  const fav = isFavorite(country.cca3);

  // Handle favorite button click
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!currentUser) return;
    toggleFavorite(country);
  };

  return (
    <Link
      to={`/country/${country.cca3}`}
      className="relative bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 block"
    >
      {/* Favorite Button */}
      <button
        onClick={handleFavoriteClick}
        data-tooltip-id={`tooltip-${country.cca3}`}
        data-tooltip-content={
          currentUser
            ? fav
              ? "Remove from Favorites"
              : "Add to Favorites"
            : "First you have to login for save favourite"
        }
        className="absolute top-2 right-2 text-xl z-10 bg-white bg-opacity-90 px-2 py-1 rounded-full"
      >
        {fav ? "💖" : "🤍"}
      </button>
      <Tooltip id={`tooltip-${country.cca3}`} place="top" />

      {/* Country Flag */}
      <img
        src={country.flags?.png}
        alt={`${country.name?.common} Flag`}
        className="w-full h-40 object-cover rounded mb-3"
      />

      {/* Country Info */}
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
        {country.name?.common}
      </h2>
      <p className="text-sm text-gray-700">
        <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Region:</strong> {country.region || "N/A"}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Population:</strong> {country.population?.toLocaleString() || "N/A"}
      </p>
    </Link>
  );
};

export default CountryCard;
