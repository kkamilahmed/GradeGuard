"use client";
import React, { useState } from "react";
import LoginModal from "./components/LoginModal";
import EvaluateModal from "./components/EvaluateModal";
import ReportModal from "./components/ReportModal";

const App = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isEvaluateOpen, setEvaluateOpen] = useState(false);
  const [isReportOpen, setReportOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  
  const handleLogin = () => {
    setLoginOpen(false);
    setEvaluateOpen(true);
  };

  const handleCheckForBias = (feedbackData) => {
    console.log("Transitioning to ReportModal");
    setEvaluateOpen(false);
    setReportOpen(true);
    setFeedback(feedbackData.feedback);
  };

  return (
    <div style={styles.container}>
       <div style={styles.logoContainer}>
       <img src="/logo.png" alt="Logo" style={styles.logo} />
      </div>
      <h1 style={styles.title}>&nbsp; Your Essays, <br/>Our Impartiality</h1>
      <img src="/center-1.png" alt="Logo" style={styles.center} />
      <h3 style={styles.subtitle}>Our web app uses your rubric <br/> and cutting - edge LLM technology to check <br/> if you have been evaluated fairly. </h3>
      <button
        style={styles.button}
        onClick={() => setLoginOpen(true)}
      >
        Check for Bias
      </button>

      {isLoginOpen && <LoginModal onLogin={handleLogin} onClose={() => setLoginOpen(false)} />}
      {isEvaluateOpen && <EvaluateModal onClose={() => setEvaluateOpen(false)} onSubmit={handleCheckForBias} />}
      {isReportOpen && <ReportModal feedback={feedback} onLogin={handleLogin} onClose={() => setReportOpen(false)} />}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#084c61",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  logoContainer: {
    position: "absolute",
    top: "40px",
    left: "40px",
  },
  logo: {
    width: "150px", // Adjust size as needed
    height: "180px",
    cursor: "pointer",
    
  },
  center: {
    width: "330px", // Adjust size as needed
    height: "240px",
    cursor: "pointer",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#DBF2FA",
    fontSize: "60px",
    alignItems: "center"
  },
  button: {
    backgroundColor: "#ffcc00",
    border: "none",
    borderRadius: "10px",
    padding: "20px 40px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease",
    margin: "10px 30px",
    marginTop: "3%"
  },
  subtitle: {
    textAlign: "center"
  }
 
};

export default App;
