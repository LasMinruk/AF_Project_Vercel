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
    padding: windowWidth <= 480 ? "1rem" : "2rem",
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
              backgroundColor: "#ffffff",
              borderRadius: "1.2rem",
              padding: windowWidth <= 480 ? "1rem" : "1.5rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontWeight: 700,
                fontSize: windowWidth <= 480 ? "1.2rem" : "1.35rem",
                color: "#2563eb",
                marginBottom: "1rem",
              }}
            >
              Filter Countries
            </h2>

            <div
              style={{
                display: "grid",
                gap: windowWidth <= 480 ? "0.75rem" : "1rem",
                gridTemplateColumns: `repeat(${getFilterColumns()}, 1fr)`,
              }}
            >
              <div>
                <label style={{
                  ...labelStyle,
                  fontSize: windowWidth <= 480 ? "0.875rem" : "0.9rem",
                }}>Search Countries</label>
                <div style={{ position: "relative" }}>
                  <FaSearch
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: windowWidth <= 480 ? "0.75rem" : "1rem",
                      transform: "translateY(-50%)",
                      color: "#9ca3af",
                      fontSize: windowWidth <= 480 ? "0.875rem" : "1rem",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: windowWidth <= 480 ? "0.6rem 0.75rem 0.6rem 2rem" : "0.75rem 1rem 0.75rem 2.5rem",
                      borderRadius: "0.9rem",
                      width: "100%",
                      background: "#f8fafc",
                      border: "1.5px solid #e5e7eb",
                      outline: "none",
                      fontSize: windowWidth <= 480 ? "0.875rem" : "1rem",
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  ...labelStyle,
                  fontSize: windowWidth <= 480 ? "0.875rem" : "0.9rem",
                }}>Region</label>
                <SearchableDropdown
                  options={[
                    { value: "", name: "All Regions" },
                    { value: "Africa", name: "Africa" },
                    { value: "Americas", name: "Americas" },
                    { value: "Asia", name: "Asia" },
                    { value: "Europe", name: "Europe" },
                    { value: "Oceania", name: "Oceania" },
                  ]}
                  value={region}
                  onChange={setRegion}
                  icon={FaGlobe}
                  style={{
                    fontSize: windowWidth <= 480 ? "0.875rem" : "1rem",
                    padding: windowWidth <= 480 ? "0.6rem 0.75rem" : "0.75rem 1rem",
                  }}
                />
              </div>

              <div>
                <label style={{
                  ...labelStyle,
                  fontSize: windowWidth <= 480 ? "0.875rem" : "0.9rem",
                }}>Language</label>
                <SearchableDropdown
                  options={[{ value: "", name: "All Languages" }, ...languages]}
                  value={language}
                  onChange={setLanguage}
                  icon={FaLanguage}
                  style={{
                    fontSize: windowWidth <= 480 ? "0.875rem" : "1rem",
                    padding: windowWidth <= 480 ? "0.6rem 0.75rem" : "0.75rem 1rem",
                  }}
                />
              </div>

              <div>
                <label style={{
                  ...labelStyle,
                  fontSize: windowWidth <= 480 ? "0.875rem" : "0.9rem",
                }}>Currency</label>
                <SearchableDropdown
                  options={[{ value: "", name: "All Currencies" }, ...currencies]}
                  value={currency}
                  onChange={setCurrency}
                  icon={FaMoneyBillWave}
                  style={{
                    fontSize: windowWidth <= 480 ? "0.875rem" : "1rem",
                    padding: windowWidth <= 480 ? "0.6rem 0.75rem" : "0.75rem 1rem",
                  }}
                />
              </div>

              <div>
                <label style={{
                  ...labelStyle,
                  fontSize: windowWidth <= 480 ? "0.875rem" : "0.9rem",
                }}>Sort By</label>
                <SearchableDropdown
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  icon={FaSort}
                  style={{
                    fontSize: windowWidth <= 480 ? "0.875rem" : "1rem",
                    padding: windowWidth <= 480 ? "0.6rem 0.75rem" : "0.75rem 1rem",
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              style={{
                marginTop: windowWidth <= 480 ? "0.75rem" : "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: windowWidth <= 480 ? "0.6rem" : "0.85rem",
                borderRadius: "0.9rem",
                fontWeight: "500",
                background: "#f8fafc",
                border: "1.5px solid #e5e7eb",
                color: showFavoritesOnly ? "#be185d" : "#4b5563",
                fontSize: windowWidth <= 480 ? "0.875rem" : "1rem",
                width: windowWidth <= 480 ? "100%" : "auto",
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
              marginTop: windowWidth <= 480 ? "1.5rem" : "2rem",
              display: "grid",
              gridTemplateColumns: getCardColumns(),
              gap: windowWidth <= 480 ? "1.5rem" : "2rem",
            }}
          >
            {loading ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
                <p style={{ fontSize: windowWidth <= 480 ? "0.875rem" : "1rem" }}>Loading countries...</p>
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
                <p style={{ fontSize: windowWidth <= 480 ? "0.875rem" : "1rem" }}>No countries found</p>
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
            bottom: windowWidth <= 480 ? "1rem" : "2rem",
            right: windowWidth <= 480 ? "1rem" : "2rem",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: windowWidth <= 480 ? "2.5rem" : "3rem",
            height: windowWidth <= 480 ? "2.5rem" : "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <FaArrowUp style={{ fontSize: windowWidth <= 480 ? "1rem" : "1.25rem" }} />
        </motion.button>
      )}
    </motion.div>
  );
};

export default Home;
