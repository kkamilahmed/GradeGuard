"use client";
import React, { useState } from "react";

const ReportModal = ({ onClose, feedback }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match the animation duration
  };

  return (
    <div
      style={{
        ...styles.modalOverlay,
        animation: isClosing
          ? "fadeOut 0.3s ease forwards"
          : "fadeIn 0.3s ease forwards",
      }}
    >
      <div
        style={{
          ...styles.modalContent,
          animation: isClosing
            ? "expandOut 0.3s ease forwards"
            : "expandIn 0.3s ease forwards",
        }}
      >
        <button style={styles.closeButton} onClick={handleClose}>
          X
        </button>
        <h2 style={styles.header}>Evaluate Unfairness</h2>
        <div style={styles.scrollableContainer}>
          <p style={styles.text}>
            <strong>Evaluation Summary:</strong>
          </p>
          <div style={styles.feedbackContainer}>
            {feedback.split("\n").map((line, index) => (
              <p key={index} style={styles.feedbackText}>
                {line}
              </p>
            ))}
          </div>
        </div>
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
  },
  modalContent: {
    backgroundColor: "#f8f4ee",
    padding: "30px",
    borderRadius: "12px",
    width: "600px",
    maxWidth: "90%",
    height: "400px",
    maxHeight: "90%",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#e74c3c",
  },
  header: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  scrollableContainer: {
    backgroundColor: "#eef4fc",
    borderRadius: "8px",
    padding: "15px",
    height: "250px",
    overflowY: "auto",
    textAlign: "left",
    border: "1px solid #ddd",
  },
  text: {
    fontSize: "0.9rem",
    lineHeight: "1.5",
    marginBottom: "10px",
    color: "#333",
  },
  feedbackContainer: {
    marginTop: "10px",
    textAlign: "left",
  },
  feedbackText: {
    fontSize: "0.9rem",
    lineHeight: "1.5",
    marginBottom: "8px",
    color: "#444",
  },
};

// Add CSS animations using keyframes
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  @keyframes expandIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(2);
      opacity: 1;
    }
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  @keyframes expandOut {
    from {
      transform: scale(1);
      opacity: 1;
    }
    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`, styleSheet.cssRules.length);

export default ReportModal;
