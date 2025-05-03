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
      className="p-4 sm:p-6 max-w-7xl mx-auto relative bg-gray-100 min-h-screen"
    >
      {/* Controls */}
      <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-between mb-10">
        {/* Search */}
        <div className="relative w-full md:w-[45%]">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by country name..."
            className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Region Filter */}
        <div className="relative w-full md:w-[25%]">
          <FaGlobe className="absolute left-3 top-3 text-gray-400" />
          <select
            className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
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
          className={`w-full md:w-[25%] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium border transition text-sm shadow-sm ${
            showFavoritesOnly
              ? "bg-pink-100 text-pink-700 border-pink-400"
              : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
          }`}
        >
          <FaHeart className={showFavoritesOnly ? "text-pink-500" : "text-gray-400"} />
          {showFavoritesOnly ? "Showing Favorites" : "Show Favorites Only"}
        </button>
      </div>

      {/* Country Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading countries...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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
            <div className="text-center text-gray-500 col-span-full">
              <p className="text-lg">😔 No countries found</p>
              <p className="text-sm mt-1">Try clearing your filters or search again.</p>
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
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 transition transform hover:scale-110"
          aria-label="Back to top"
        >
          <FaArrowUp className="text-lg" />
        </motion.button>
      )}
    </motion.div>
  );
};

export default Home;
