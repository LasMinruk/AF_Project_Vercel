import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import { useFavorites } from "../contexts/FavoritesContext";
import axios from "axios";
import { motion } from "framer-motion";
import { FaHeart, FaSearch, FaGlobe, FaArrowUp } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { favorites } = useFavorites();

  useEffect(() => {
    const toggleFromHeader = () => setShowFavoritesOnly((prev) => !prev);
    window.addEventListener("favorites-toggle", toggleFromHeader);
    return () => window.removeEventListener("favorites-toggle", toggleFromHeader);
  }, []);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = countries;

    if (searchTerm) {
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (region) {
      result = result.filter((c) => c.region === region);
    }

    if (showFavoritesOnly) {
      result = result.filter((c) =>
        favorites.some((fav) => fav.cca3 === c.cca3)
      );
    }

    setFiltered(result);
  }, [searchTerm, region, showFavoritesOnly, countries, favorites]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: "1rem",
        maxWidth: "1280px",
        margin: "0 auto",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
        position: "relative"
      }}
    >
      {/* Controls */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginBottom: "2.5rem"
      }}>
        {/* Search */}
        <div style={{ position: "relative", width: "100%" }}>
          <FaSearch style={{
            position: "absolute",
            left: "0.75rem",
            top: "0.75rem",
            color: "#9ca3af"
          }} />
          <input
            type="text"
            placeholder="Search by country name..."
            style={{
              padding: "0.75rem 1rem 0.75rem 2.5rem",
              width: "100%",
              borderRadius: "0.75rem",
              border: "1px solid #d1d5db",
              outline: "none",
              transition: "all 0.2s"
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Region Filter */}
        <div style={{ position: "relative", width: "100%" }}>
          <FaGlobe style={{
            position: "absolute",
            left: "0.75rem",
            top: "0.75rem",
            color: "#9ca3af"
          }} />
          <select
            style={{
              padding: "0.75rem 1rem 0.75rem 2.5rem",
              width: "100%",
              borderRadius: "0.75rem",
              border: "1px solid #d1d5db",
              backgroundColor: "white",
              outline: "none",
              transition: "all 0.2s"
            }}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        {/* Favorites Toggle */}
        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.75rem 1rem",
            borderRadius: "0.75rem",
            fontWeight: "500",
            border: "1px solid",
            fontSize: "0.875rem",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            backgroundColor: showFavoritesOnly ? "#fce7f3" : "white",
            color: showFavoritesOnly ? "#be185d" : "#4b5563",
            borderColor: showFavoritesOnly ? "#f472b6" : "#d1d5db"
          }}
        >
          <FaHeart style={{ color: showFavoritesOnly ? "#ec4899" : "#9ca3af" }} />
          {showFavoritesOnly ? "Showing Favorites" : "Show Favorites Only"}
        </button>
      </div>

      {/* Country Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "5rem 0" }}>
          <div style={{
            animation: "spin 1s linear infinite",
            borderRadius: "50%",
            height: "4rem",
            width: "4rem",
            borderTop: "4px solid #3b82f6",
            margin: "0 auto"
          }}></div>
          <p style={{ color: "#6b7280", marginTop: "1rem" }}>Loading countries...</p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1.5rem"
        }}>
          {filtered.length > 0 ? (
            filtered.map((country) => (
              <motion.div
                key={country.cca3}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <CountryCard country={country} />
              </motion.div>
            ))
          ) : (
            <div style={{ textAlign: "center", color: "#6b7280", gridColumn: "1 / -1" }}>
              <p style={{ fontSize: "1.125rem" }}>😔 No countries found</p>
              <p style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>
                Try clearing your filters or search again.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Back to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            right: "1.5rem",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.75rem",
            borderRadius: "50%",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            zIndex: 50,
            transition: "transform 0.2s",
            border: "none",
            cursor: "pointer"
          }}
          aria-label="Back to top"
        >
          <FaArrowUp style={{ fontSize: "1.125rem" }} />
        </motion.button>
      )}
    </motion.div>
  );
};

export default Home;