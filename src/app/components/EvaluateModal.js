"use client";
import React, { useState } from "react";

const EvaluateModal = ({ onSubmit, onClose }) => {
  const [essay, setEssay] = useState(null);
  const [criteria, setCriteria] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [success, setSuccess] = useState(false); // Success state

  const handleFileChange = (setter, fileSetter) => (e) => {
    const file = e.target.files[0];
    setter(file);
    fileSetter(file ? file.name : null); // Update file name state
  };

  const [essayFileName, setEssayFileName] = useState(null);
  const [criteriaFileName, setCriteriaFileName] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!essay || !criteria) {
      alert("Please upload both files.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    const formData = new FormData();
    formData.append("essay", essay);
    formData.append("rubric", criteria);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setFeedback(data.feedback);
      setSuccess(true);
      onSubmit({ feedback: data.feedback });
    } catch (error) {
      console.error("Error submitting files:", error);
      alert("An error occurred while submitting the files.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
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
            ? "slideOut 0.3s ease forwards"
            : "slideIn 0.3s ease forwards",
        }}
      >
        <button style={styles.closeButton} onClick={handleClose}>
          X
        </button>
        <h2 style={styles.header}>Evaluate Unfairness</h2>
        <p style={styles.subHeader}>Upload Files</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.uploadSection}>
            <label style={styles.label}>Upload your essay</label>
            <div style={styles.fileInputWrapper}>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange(setEssay, setEssayFileName)}
                style={styles.fileInput}
              />
            </div>
            {essayFileName && (
              <p style={styles.fileName}>Selected File: {essayFileName}</p>
            )}
          </div>

          <div style={styles.uploadSection}>
            <label style={styles.label}>Upload the evaluation criteria</label>
            <div style={styles.fileInputWrapper}>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange(setCriteria, setCriteriaFileName)}
                style={styles.fileInput}
              />
            </div>
            {criteriaFileName && (
              <p style={styles.fileName}>Selected File: {criteriaFileName}</p>
            )}
          </div>

          <button
            type="submit"
            style={{
              ...styles.submitButton,
              backgroundColor: loading ? "#ccc" : "#ffcc00",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Uploading..." : success ? "✔ Uploaded" : "Submit"}
          </button>
        </form>

        {feedback && (
          <div style={{ marginTop: "20px", color: "#333" }}>
            <h3>Feedback:</h3>
            <p>{feedback}</p>
          </div>
        )}
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
    width: "450px",
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
    marginBottom: "10px",
    color: "#333",
  },
  subHeader: {
    fontSize: "1rem",
    marginBottom: "20px",
    color: "#666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  uploadSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center content horizontally
    marginBottom: "15px",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#555",
  },
  fileInputWrapper: {
    display: "flex",
    justifyContent: "center", // Center the file input
    width: "100%",
  },
  fileInput: {
    display: "block",
    width: "60%", // Adjust width to better fit the center
    padding: "12px",
    border: "2px dashed #aaa",
    borderRadius: "8px",
    textAlign: "center",
    background: "#fafafa",
    cursor: "pointer",
  },
  fileName: {
    fontSize: "0.85rem",
    color: "#555",
    marginTop: "5px",
  },
  submitButton: {
    border: "none",
    borderRadius: "12px",
    padding: "15px 30px",
    fontSize: "1rem",
    fontWeight: "bold",
    justifyContent: "center",
    marginTop: "20px",
  },
};

export default EvaluateModal;

