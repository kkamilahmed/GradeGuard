"use client";
import React, { useState, useEffect } from "react";

const LoginModal = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the animation when the component mounts
    setIsVisible(true);
    return () => setIsVisible(false); // Clean up on unmount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  const handleClose = () => {
    // Add delay for exit animation
    setIsVisible(false);
    setTimeout(onClose, 300); // Match the CSS animation duration
  };

  return (
    <div
      style={{
        ...styles.modalOverlay,
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        transition: "opacity 0.3s ease, visibility 0.3s ease",
      }}
    >
      <div
        style={{
          ...styles.modalContent,
          transform: isVisible ? "translateY(0)" : "translateY(-20px)",
          transition: "transform 0.3s ease",
        }}
      >
        <button style={styles.closeButton} onClick={handleClose}>
          X
        </button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  input: {
    display: "block",
    width: "100%",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#ffcc00",
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default LoginModal;
