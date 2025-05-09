import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import InfoCard from "../components/InfoCard";

const CountryDetail = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [error, setError] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => res.json())
      .then((data) => {
        const found = data[0];
        if (found) {
          setCountry(found);
          setError(false);

          if (found.borders?.length) {
            fetch(
              `https://restcountries.com/v3.1/alpha?codes=${found.borders.join(",")}`
            )
              .then((res) => res.json())
              .then(setBorderCountries);
          }
        } else {
          setError(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching country detail:", err);
        setError(true);
      });
  }, [code]);

  if (error) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center", 
        color: "#dc2626", 
        padding: windowWidth <= 480 ? "1rem" : "1.5rem" 
      }}>
        <h1 style={{ 
          fontSize: windowWidth <= 480 ? "1.5rem" : windowWidth <= 768 ? "1.75rem" : "2rem", 
          fontWeight: "bold" 
        }}>Country Not Found</h1>
        <p style={{ 
          color: "#6b7280", 
          marginTop: "0.5rem",
          fontSize: windowWidth <= 480 ? "0.875rem" : "1rem",
          textAlign: "center"
        }}>
          Something went wrong.{" "}
          <Link to="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
            Go back home
          </Link>
        </p>
      </div>
    );
  }

  if (!country) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        color: "#6b7280", 
        fontSize: windowWidth <= 480 ? "1rem" : windowWidth <= 768 ? "1.125rem" : "1.25rem" 
      }}>
        <div style={{
          animation: "spin 1s linear infinite",
          borderTop: "4px solid #3b82f6",
          borderRadius: "9999px",
          width: windowWidth <= 480 ? "2rem" : windowWidth <= 768 ? "2.5rem" : "3rem",
          height: windowWidth <= 480 ? "2rem" : windowWidth <= 768 ? "2.5rem" : "3rem",
          marginRight: windowWidth <= 480 ? "0.75rem" : "1rem"
        }}></div>
        Loading country details...
      </div>
    );
  }

  const {
    name,
    flags,
    capital,
    region,
    subregion,
    population,
    area,
    languages,
    timezones,
    currencies,
    maps,
  } = country;

  const languageList = languages ? Object.values(languages).join(", ") : "N/A";
  const currencyList = currencies
    ? Object.values(currencies)
        .map((cur) => `${cur.name} (${cur.symbol})`)
        .join(", ")
    : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ffffff, #e0f2fe, #ffffff)",
        padding: windowWidth <= 480 ? "1rem" : windowWidth <= 768 ? "1.5rem" : "2.5rem 1.5rem",
      }}
    >
      <div style={{
        maxWidth: "80rem",
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: windowWidth <= 480 ? "0.75rem" : "1rem",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        padding: windowWidth <= 480 ? "1rem" : windowWidth <= 768 ? "1.5rem" : "2rem"
      }}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            color: "#2563eb",
            fontWeight: "500",
            marginBottom: windowWidth <= 480 ? "0.75rem" : "1rem",
            textDecoration: "none",
            fontSize: windowWidth <= 480 ? "0.875rem" : "1rem"
          }}
        >
          <FiArrowLeft style={{ marginRight: "0.5rem" }} /> Back to Home
        </Link>

        {/* Flag */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: windowWidth <= 480 ? "1.5rem" : "2rem" }}>
          <div style={{
            background: "linear-gradient(to bottom right, #eff6ff, #ffffff)",
            padding: windowWidth <= 480 ? "0.75rem" : "1rem",
            borderRadius: windowWidth <= 480 ? "0.5rem" : "0.75rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            maxWidth: "30rem",
            width: "100%",
            border: "1px solid #bfdbfe"
          }}>
            <div style={{ overflow: "hidden", borderRadius: "0.5rem" }}>
              <img
                src={flags?.svg || flags?.png}
                alt={`${name.common} flag`}
                style={{
                  width: "100%",
                  height: windowWidth <= 480 ? "180px" : windowWidth <= 768 ? "200px" : "240px",
                  objectFit: "contain",
                  transition: "transform 0.3s ease-in-out"
                }}
              />
            </div>
            <p style={{ 
              textAlign: "center", 
              color: "#6b7280", 
              fontStyle: "italic", 
              fontSize: windowWidth <= 480 ? "0.75rem" : "0.875rem", 
              marginTop: "0.5rem" 
            }}>
              Official flag of {name.common}
            </p>
          </div>
        </div>

        <h2 style={{ 
          fontSize: windowWidth <= 480 ? "1.75rem" : windowWidth <= 768 ? "2rem" : "2.5rem", 
          fontWeight: "bold", 
          color: "#1f2937", 
          marginBottom: "0.25rem" 
        }}>
          {name.common}
        </h2>
        <p style={{ 
          color: "#6b7280", 
          marginBottom: windowWidth <= 480 ? "1rem" : "1.5rem", 
          fontStyle: "italic",
          fontSize: windowWidth <= 480 ? "0.875rem" : "1rem"
        }}>{name.official}</p>

        {/* Info Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: windowWidth <= 480 ? "1fr" : 
                             windowWidth <= 768 ? "repeat(2, 1fr)" : 
                             "repeat(auto-fill, minmax(250px, 1fr))",
          gap: windowWidth <= 480 ? "1rem" : "1.5rem"
        }}>
          <InfoCard label="Capital" value={capital?.[0] || "N/A"} />
          <InfoCard label="Region" value={region} />
          <InfoCard label="Subregion" value={subregion || "N/A"} />
          <InfoCard label="Population" value={population.toLocaleString()} />
          <InfoCard label="Area" value={`${area.toLocaleString()} km²`} />
          <InfoCard label="Languages" value={languageList} />
          <InfoCard label="Timezones" value={timezones?.join(", ")} />
          <InfoCard label="Currencies" value={currencyList} />
        </div>

        {/* Border Countries */}
        {borderCountries.length > 0 && (
          <div style={{ marginTop: windowWidth <= 480 ? "1.5rem" : "2.5rem" }}>
            <h3 style={{ 
              fontSize: windowWidth <= 480 ? "1.125rem" : "1.25rem", 
              fontWeight: "600", 
              marginBottom: "0.5rem" 
            }}>
              Border Countries:
            </h3>
            <div style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: windowWidth <= 480 ? "0.375rem" : "0.5rem" 
            }}>
              {borderCountries.map((b) => (
                <Link
                  key={b.cca3}
                  to={`/country/${b.cca3}`}
                  style={{
                    backgroundColor: "#e5e7eb",
                    padding: windowWidth <= 480 ? "0.375rem 0.5rem" : "0.5rem 0.75rem",
                    borderRadius: "9999px",
                    fontSize: windowWidth <= 480 ? "0.75rem" : "0.875rem",
                    textDecoration: "none",
                    color: "#111827"
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#bfdbfe")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e5e7eb")
                  }
                >
                  {b.name.common}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Google Maps Link */}
        <div style={{ 
          marginTop: windowWidth <= 480 ? "1.5rem" : "2.5rem", 
          textAlign: "center" 
        }}>
          <a
            href={maps?.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: "600",
              padding: windowWidth <= 480 ? "0.625rem 1.25rem" : "0.75rem 1.5rem",
              borderRadius: windowWidth <= 480 ? "0.375rem" : "0.5rem",
              textDecoration: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              fontSize: windowWidth <= 480 ? "0.875rem" : "1rem",
              display: "inline-block"
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#1d4ed8")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#2563eb")
            }
          >
            🌐 View on Google Maps
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default CountryDetail;
