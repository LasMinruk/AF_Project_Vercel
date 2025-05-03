// Import React and required dependencies
import React from "react";
import { Link } from "react-router-dom";

// 404 Not Found page component
const NotFound = () => {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f3f4f6",
      padding: "0 1.5rem",
      textAlign: "center"
    }}>
      <h1 style={{
        fontSize: "3.75rem",
        fontWeight: "700",
        color: "#2563eb",
        marginBottom: "1rem"
      }}>404</h1>
      <p style={{
        fontSize: "1.25rem",
        color: "#374151",
        marginBottom: "0.5rem"
      }}>Oops! Page Not Found</p>
      <p style={{
        fontSize: "0.875rem",
        color: "#6b7280",
        marginBottom: "1.5rem"
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          backgroundColor: "#2563eb",
          color: "white",
          fontWeight: "500",
          padding: "0.75rem 1.5rem",
          borderRadius: "0.5rem",
          transition: "all 0.2s"
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
