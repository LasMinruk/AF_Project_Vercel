import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 1rem",
      backgroundColor: "#f3f4f6"
    }}>
      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "28rem",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        borderRadius: "1.5rem",
        padding: "2rem",
        transition: "all 0.3s"
      }}>
        <Link
          to="/"
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            color: "#2563eb",
            fontSize: "0.875rem",
            fontWeight: "500",
            transition: "all 0.2s"
          }}
        >
          ← Back to Home
        </Link>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{
            fontSize: "2.25rem",
            fontWeight: "800",
            color: "#1d4ed8",
            letterSpacing: "-0.025em"
          }}>Welcome Back</h1>
          <p style={{
            fontSize: "0.875rem",
            color: "#4b5563",
            marginTop: "0.25rem"
          }}>Log in to explore countries you love</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.25rem"
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
                outline: "none"
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#374151",
                marginBottom: "0.25rem"
              }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #d1d5db",
                outline: "none"
              }}
            />
          </div>

          {error && (
            <p style={{
              fontSize: "0.875rem",
              color: "#ef4444",
              marginTop: "0.25rem"
            }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(to right, #3b82f6, #6366f1)",
              color: "white",
              padding: "0.75rem",
              borderRadius: "0.75rem",
              fontWeight: "600",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s"
            }}
          >
            Log In
          </button>
        </form>

        <p style={{
          fontSize: "0.75rem",
          textAlign: "center",
          color: "#6b7280",
          marginTop: "1.5rem"
        }}>
          Country Explorer by <span style={{ color: "#3b82f6", fontWeight: "500" }}>Lasiru Minruk</span>
        </p>
      </div>
    </div>
  );
};

export default Login;