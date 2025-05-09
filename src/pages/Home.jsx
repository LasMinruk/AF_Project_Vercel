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
    if (windowWidth <= 600) return 1;
    if (windowWidth <= 900) return 2;
    return 5;
  };

  const getCardColumns = () => {
    if (windowWidth <= 600) return "repeat(1, 1fr)";
    if (windowWidth <= 900) return "repeat(2, 1fr)";
    return "repeat(auto-fit, minmax(240px, 1fr))";
  };

  const containerWrapper = {
    display: "flex",
    justifyContent: "center",
    padding: "0 1rem",
    boxSizing: "border-box",
    width: "100%",
  };

  const innerContainer = {
    width: "100%",
    maxWidth: "1100px",
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
        padding: "2.5rem 0",
        width: "100%",
        boxSizing: "border-box",
        overflowX: "hidden"
      }}
    >
      {/* Filter Panel */}
      <div style={containerWrapper}>
        <div style={innerContainer}>
          <div
            style={{
              background: "#fff",
              borderRadius: "1.25rem",
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            <h2
              style={{
                fontWeight: 700,
                fontSize: "1.35rem",
                color: "#2563eb",
                marginBottom: "1rem",
              }}
            >
              Filter Countries
            </h2>

            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: `repeat(${getFilterColumns()}, 1fr)`,
              }}
            >
              <div>
                <label style={labelStyle}>Search Countries</label>
                <div style={{ position: "relative" }}>
                  <FaSearch
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "1rem",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: "0.75rem 1rem 0.75rem 2.5rem",
                      borderRadius: "0.9rem",
                      width: "100%",
                      background: "#f8fafc",
                      border: "1.5px solid #e5e7eb",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Region</label>
                <div style={{ position: "relative" }}>
                  <FaGlobe
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "0.75rem",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                    }}
                  />
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    style={{
                      padding: "0.75rem 1rem 0.75rem 2.5rem",
                      borderRadius: "0.9rem",
                      width: "100%",
                      background: "#f8fafc",
                      border: "1.5px solid #e5e7eb",
                      outline: "none",
                    }}
                  >
                    <option value="">All Regions</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Language</label>
                <SearchableDropdown
                  options={languages}
                  value={language}
                  onChange={setLanguage}
                  placeholder="Select Language"
                  icon={FaLanguage}
                  labelKey="name"
                  valueKey="value"
                />
              </div>

              <div>
                <label style={labelStyle}>Currency</label>
                <SearchableDropdown
                  options={currencies}
                  value={currency}
                  onChange={setCurrency}
                  placeholder="Select Currency"
                  icon={FaMoneyBillWave}
                  labelKey="name"
                  valueKey="value"
                />
              </div>

              <div>
                <label style={labelStyle}>Sort By</label>
                <div style={{ position: "relative" }}>
                  <FaSort
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "0.75rem",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                    }}
                  />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      padding: "0.75rem 1rem 0.75rem 2.5rem",
                      borderRadius: "0.9rem",
                      width: "100%",
                      background: "#f8fafc",
                      border: "1.5px solid #e5e7eb",
                      outline: "none",
                    }}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.85rem",
                borderRadius: "0.9rem",
                fontWeight: "500",
                background: "#f8fafc",
                border: "1.5px solid #e5e7eb",
                color: showFavoritesOnly ? "#be185d" : "#4b5563",
              }}
            >
              <FaHeart style={{ color: showFavoritesOnly ? "#ec4899" : "#9ca3af" }} />
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
              marginTop: "2rem",
              display: "grid",
              gridTemplateColumns: getCardColumns(),
              gap: "2rem",
            }}
          >
            {loading ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                <p>Loading countries...</p>
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
                <p>No countries found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            backgroundColor: "#3b82f6",
            color: "white",
            width: "3.5rem",
            height: "3.5rem",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
            zIndex: 1000,
            padding: 0
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2563eb")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#3b82f6")}
          aria-label="Back to top"
        >
          <FaArrowUp style={{ fontSize: "1.7rem", margin: 0, padding: 0, display: "block" }} />
        </button>
      )}
    </motion.div>
  );
};

export default Home;
