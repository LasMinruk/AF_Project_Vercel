import React, { useEffect, useState } from "react";
import CountryCard from "../components/CountryCard";
import { useFavorites } from "../contexts/FavoritesContext";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaSearch,
  FaGlobe,
  FaArrowUp,
  FaLanguage,
  FaMoneyBillWave,
  FaSort,
} from "react-icons/fa";
import SearchableDropdown from "../components/SearchableDropdown";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");
  const [currency, setCurrency] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { favorites } = useFavorites();

  const sortOptions = [
    { value: "", name: "Sort by..." },
    { value: "population_asc", name: "Population (Low to High)" },
    { value: "population_desc", name: "Population (High to Low)" },
    { value: "area_asc", name: "Area (Small to Large)" },
    { value: "area_desc", name: "Area (Large to Small)" },
  ];

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
      setFiltered(res.data);
      setLoading(false);

      const uniqueLanguages = new Set();
      const uniqueCurrencies = new Set();

      res.data.forEach((country) => {
        if (country.languages) {
          Object.entries(country.languages).forEach(([code, name]) => {
            uniqueLanguages.add(JSON.stringify({ value: code, name }));
          });
        }
        if (country.currencies) {
          Object.entries(country.currencies).forEach(([code, data]) => {
            uniqueCurrencies.add(JSON.stringify({ value: code, name: data.name }));
          });
        }
      });

      setLanguages(Array.from(uniqueLanguages).map((lang) => JSON.parse(lang)));
      setCurrencies(Array.from(uniqueCurrencies).map((curr) => JSON.parse(curr)));
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

    if (language) {
      result = result.filter((c) => c.languages && c.languages[language]);
    }

    if (currency) {
      result = result.filter((c) => c.currencies && c.currencies[currency]);
    }

    if (showFavoritesOnly) {
      result = result.filter((c) =>
        favorites.some((fav) => fav.cca3 === c.cca3)
      );
    }

    if (sortBy) {
      result = [...result].sort((a, b) => {
        switch (sortBy) {
          case "population_asc":
            return a.population - b.population;
          case "population_desc":
            return b.population - a.population;
          case "area_asc":
            return (a.area || 0) - (b.area || 0);
          case "area_desc":
            return (b.area || 0) - (a.area || 0);
          default:
            return 0;
        }
      });
    }

    setFiltered(result);
  }, [
    searchTerm,
    region,
    language,
    currency,
    sortBy,
    showFavoritesOnly,
    countries,
    favorites,
  ]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getFilterColumns = () => {
    if (windowWidth <= 480) return 1;
    if (windowWidth <= 768) return 2;
    if (windowWidth <= 1024) return 3;
    return 5;
  };

  const getCardColumns = () => {
    if (windowWidth <= 480) return "repeat(1, 1fr)";
    if (windowWidth <= 768) return "repeat(2, 1fr)";
    if (windowWidth <= 1024) return "repeat(3, 1fr)";
    return "repeat(4, 1fr)";
  };

  const containerWrapper = {
    width: "100%",
    maxWidth: "1440px",
    margin: "0 auto",
    padding: windowWidth <= 480 ? "1rem 0" : windowWidth <= 768 ? "1.5rem 0" : "2.5rem 0",
  };

  const innerContainer = {
    width: "100%",
    maxWidth: "1280px",
    margin: "0 auto",
  };

  const labelStyle = {
    fontWeight: 500,
    marginBottom: "0.5rem",
    display: "block",
    fontSize: "0.95rem",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        background: "#f6f7fb",
        padding: windowWidth <= 480 ? "1rem 0" : windowWidth <= 768 ? "1.5rem 0" : "2.5rem 0",
        width: "100%",
        boxSizing: "border-box",
        overflowX: "hidden"
      }}
    >
      {/* Filter Panel */}
      <div style={{
        width: "100%",
        maxWidth: "1440px",
        margin: "0 auto",
        padding: windowWidth <= 480 ? "0.5rem" : windowWidth <= 768 ? "0.75rem" : "1rem"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto"
        }}>
          <div
            style={{
              background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ef 100%)",
              borderRadius: windowWidth <= 480 ? "1rem" : "1.5rem",
              padding: windowWidth <= 480 ? "1rem" : windowWidth <= 768 ? "1.5rem" : "2rem",
              boxShadow: "0 8px 32px rgba(31, 41, 55, 0.08)",
              border: "1px solid #e0e7ef",
              marginBottom: windowWidth <= 480 ? "1rem" : "1.5rem",
              transition: "all 0.3s ease"
            }}
          >
            <h2
              style={{
                fontWeight: 800,
                fontSize: windowWidth <= 480 ? "1.2rem" : windowWidth <= 768 ? "1.4rem" : "1.7rem",
                color: "#2563eb",
                marginBottom: windowWidth <= 480 ? "1rem" : "1.5rem",
                letterSpacing: "-0.02em",
                textAlign: windowWidth <= 480 ? "center" : "left"
              }}
            >
              Filter Countries
            </h2>
            <div
              style={{
                display: "grid",
                gap: "1rem", // Consistent spacing between elements
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // Responsive grid layout
                marginBottom: "1.5rem",
              }}
            >
              {/* Search Input */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  style={{
                    fontWeight: 600,
                    marginBottom: windowWidth <= 480 ? "0.4rem" : "0.5rem",
                    display: "block",
                    fontSize: windowWidth <= 480 ? "0.85rem" : windowWidth <= 768 ? "0.9rem" : "0.95rem",
                    color: "#1e293b",
                  }}
                >
                  Search Countries
                </label>
                <div style={{ position: "relative" }}>
                  <FaSearch
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: windowWidth <= 480 ? "0.6rem" : windowWidth <= 768 ? "0.75rem" : "0.75rem",
                      transform: "translateY(-50%)",
                      color: "#94a3b8",
                      fontSize: windowWidth <= 480 ? "0.85rem" : windowWidth <= 768 ? "0.9rem" : "1rem",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: windowWidth <= 480 
                        ? "0.5rem 0.6rem 0.5rem 2rem" 
                        : windowWidth <= 768 
                        ? "0.6rem 0.75rem 0.6rem 2.25rem" 
                        : "0.6rem 0.75rem 0.6rem 2.25rem",
                      borderRadius: windowWidth <= 480 ? "0.75rem" : "0.9rem",
                      width: "100%",
                      background: "#f1f5f9",
                      border: "1.5px solid #e2e8f0",
                      outline: "none",
                      fontSize: windowWidth <= 480 ? "0.85rem" : windowWidth <= 768 ? "0.9rem" : "0.95rem",
                      transition: "all 0.2s ease-in-out",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      color: "#1e293b",
                      height: windowWidth <= 480 ? "2.5rem" : windowWidth <= 768 ? "2.75rem" : "2.75rem",
                    }}
                  />
                </div>
              </div>

              {/* Filter Dropdowns */}
              {[
                {
                  label: "Region",
                  value: region,
                  onChange: setRegion,
                  options: [
                    { value: "", name: "All Regions" },
                    { value: "Africa", name: "Africa" },
                    { value: "Americas", name: "Americas" },
                    { value: "Asia", name: "Asia" },
                    { value: "Europe", name: "Europe" },
                    { value: "Oceania", name: "Oceania" },
                  ],
                  icon: FaGlobe,
                },
                {
                  label: "Language",
                  value: language,
                  onChange: setLanguage,
                  options: [{ value: "", name: "All Languages" }, ...languages],
                  icon: FaLanguage,
                },
                {
                  label: "Currency",
                  value: currency,
                  onChange: setCurrency,
                  options: [{ value: "", name: "All Currencies" }, ...currencies],
                  icon: FaMoneyBillWave,
                },
                {
                  label: "Sort By",
                  value: sortBy,
                  onChange: setSortBy,
                  options: sortOptions,
                  icon: FaSort,
                },
              ].map((filter, index) => (
                <div key={index}>
                  <label
                    style={{
                      fontWeight: 600,
                      marginBottom: "0.5rem",
                      display: "block",
                      fontSize: "0.95rem",
                      color: "#1e293b",
                    }}
                  >
                    {filter.label}
                  </label>
                  <SearchableDropdown
                    options={filter.options}
                    value={filter.value}
                    onChange={filter.onChange}
                    icon={filter.icon}
                    style={{
                      fontSize: "0.95rem",
                      padding: "0.6rem 0.75rem",
                      borderRadius: "0.9rem",
                      background: "#f1f5f9",
                      border: "1.5px solid #e2e8f0",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      color: "#1e293b",
                      width: "100%",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Favorites Button */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                background: showFavoritesOnly ? "linear-gradient(90deg, #ec4899 0%, #be185d 100%)" : "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
                color: "#fff",
                border: "none",
                borderRadius: windowWidth <= 480 ? "0.75rem" : "1rem",
                padding: windowWidth <= 480 ? "0.6rem 1rem" : "0.8rem 1.5rem",
                fontWeight: 600,
                fontSize: windowWidth <= 480 ? "0.9rem" : "1rem",
                boxShadow: "0 2px 8px rgba(59, 130, 246, 0.08)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                width: "100%",
                maxWidth: windowWidth <= 480 ? "100%" : "300px",
                margin: "0 auto"
              }}
              onMouseOver={e => (e.currentTarget.style.background = showFavoritesOnly ? "linear-gradient(90deg, #be185d 0%, #ec4899 100%)" : "linear-gradient(90deg, #2563eb 0%, #6366f1 100%)")}
              onMouseOut={e => (e.currentTarget.style.background = showFavoritesOnly ? "linear-gradient(90deg, #ec4899 0%, #be185d 100%)" : "linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)")}
            >
              <FaHeart style={{ color: "#fff" }} />
              {showFavoritesOnly ? "Showing Favorites" : "Show Favorites Only"}
            </button>
          </div>
        </div>
      </div>

      {/* Country Grid */}
      <div style={containerWrapper}>
        <div style={innerContainer}>
          <div
            style={{
              display: "grid",
              gap: windowWidth <= 480 ? "1rem" : windowWidth <= 768 ? "1.25rem" : "1.5rem",
              gridTemplateColumns: windowWidth <= 480 ? "1fr" : 
                                 windowWidth <= 640 ? "repeat(2, 1fr)" : 
                                 windowWidth <= 1024 ? "repeat(3, 1fr)" : 
                                 "repeat(4, 1fr)",
              marginTop: windowWidth <= 480 ? "0.75rem" : windowWidth <= 768 ? "1rem" : "1.5rem"
            }}
          >
            {loading ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                <p style={{ 
                  fontSize: windowWidth <= 480 ? "0.8rem" : windowWidth <= 768 ? "0.875rem" : "1rem",
                  color: "#4b5563"
                }}>Loading countries...</p>
              </div>
            ) : filtered.length > 0 ? (
              filtered.map((country) => (
                <motion.div
                  key={country.cca3}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4 }}
                >
                  <CountryCard country={country} />
                </motion.div>
              ))
            ) : (
              <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                <p style={{ 
                  fontSize: windowWidth <= 480 ? "0.8rem" : windowWidth <= 768 ? "0.875rem" : "1rem",
                  color: "#4b5563"
                }}>No countries found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: windowWidth <= 480 ? "0.75rem" : windowWidth <= 768 ? "1rem" : "2rem",
            right: windowWidth <= 480 ? "0.75rem" : windowWidth <= 768 ? "1rem" : "2rem",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: windowWidth <= 480 ? "2.25rem" : windowWidth <= 768 ? "2.5rem" : "3rem",
            height: windowWidth <= 480 ? "2.25rem" : windowWidth <= 768 ? "2.5rem" : "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            zIndex: 1000
          }}
        >
          <FaArrowUp style={{ 
            fontSize: windowWidth <= 480 ? "0.875rem" : windowWidth <= 768 ? "1rem" : "1.25rem"
          }} />
        </motion.button>
      )}
    </motion.div>
  );
};

export default Home;
