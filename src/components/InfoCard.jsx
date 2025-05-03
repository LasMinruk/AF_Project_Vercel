import React from "react";

const InfoCard = ({ label, value }) => {
  const cardStyle = {
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "default",
    width: "100%",
    maxWidth: "280px",
    margin: "0 auto",
  };

  const labelStyle = {
    fontSize: "14px",
    color: "#6b7280", // Gray-500
    marginBottom: "6px",
  };

  const valueStyle = {
    fontSize: "20px",
    fontWeight: "600",
    color: "#111827", // Gray-900
    overflowWrap: "break-word",
  };

  const hoverStyle = {
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
    transform: "translateY(-2px)",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
      onMouseLeave={(e) =>
        Object.assign(e.currentTarget.style, {
          boxShadow: cardStyle.boxShadow,
          transform: "translateY(0)",
        })
      }
    >
      <p style={labelStyle}>{label}</p>
      <p style={valueStyle}>{value}</p>
    </div>
  );
};

export default InfoCard;
