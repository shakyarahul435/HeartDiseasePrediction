import React, { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

const FEATURE_SETTINGS = {
  age: { type: "range", min: 8, max: 106, step: 1, label: "Age", default: 55 },
  bp: { type: "range", min: 60, max: 200, step: 1, label: "Resting BP", default: 120 },
  cholesterol: { type: "range", min: 100, max: 400, step: 1, label: "Cholesterol", default: 240 },
  max_hr: { type: "range", min: 60, max: 220, step: 1, label: "Max Heart Rate", default: 150 },
  oldpeak: { type: "range", min: 0, max: 6.5, step: 0.1, label: "Oldpeak", default: 1.0 },
  slope: {
    type: "dropdown",
    options: [
      { label: "Upsloping", value: 0 },
      { label: "Flat", value: 1 },
      { label: "Downsloping", value: 2 },
    ],
    label: "ST Slope",
    default: 1,
  },
};

function App() {
  const [form, setForm] = useState(
    Object.fromEntries(
      Object.keys(FEATURE_SETTINGS).map((key) => [key, FEATURE_SETTINGS[key].default])
    )
  );

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, key) => {
    const value =
      FEATURE_SETTINGS[key].type === "range" ? parseFloat(e.target.value) : e.target.value;
    setForm({ ...form, [key]: value });
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: form }),
      });

      if (!res.ok) throw new Error("Network response not ok");

      const data = await res.json();
      setResult(data);
      setLoading(false);
    } catch (err) {
      console.error("Prediction failed:", err);
      alert("Prediction failed. Make sure backend is running on port 5000.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#1d4ed8",
          color: "white",
          padding: "20px 0",
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        Heart Disease Prediction Dashboard
      </header>

      {/* Main content */}
      <main
        style={{
          padding: "30px",
          maxWidth: "1200px",
          margin: "auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px",
            marginBottom: "25px",
          }}
        >
          {Object.keys(FEATURE_SETTINGS).map((key) => {
            const setting = FEATURE_SETTINGS[key];
            return (
              <div
                key={key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "15px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <label
                  style={{
                    marginBottom: "8px",
                    fontWeight: "bold",
                    color: "#1e40af",
                  }}
                >
                  {setting.label}
                </label>

                {setting.type === "range" && (
                  <>
                    <input
                      type="range"
                      min={setting.min}
                      max={setting.max}
                      step={setting.step}
                      value={form[key]}
                      onChange={(e) => handleChange(e, key)}
                      style={{
                        width: "100%",
                        marginBottom: "8px",
                        accentColor: "#2563eb",
                        cursor: "pointer",
                      }}
                    />
                    <span
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#1f2937",
                      }}
                    >
                      {form[key]}
                    </span>
                  </>
                )}

                {setting.type === "dropdown" && (
                  <select
                    value={form[key]}
                    onChange={(e) => handleChange(e, key)}
                    style={{
                      padding: "10px",
                      fontSize: "16px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      backgroundColor: "#fff",
                      width: "100%",
                      color: "#111",
                      cursor: "pointer",
                    }}
                  >
                    {setting.options.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        style={{padding: "10px", fontSize: "16px", marginRight: "8px", width: "100%", backgroundColor: "#441dd1ff", color: "white"}}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            );
          })}
        </div>
          {loading ? <CircularProgress /> : null}
        <button
          onClick={handlePredict}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "14px 30px",
            borderRadius: "8px",
            border: "none",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "block",
            margin: "auto",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1e40af")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
        >
          Predict
        </button>

        {result && (
          <div
            style={{
              marginTop: "35px",
              padding: "30px",
              border: "1px solid #ddd",
              borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              backgroundColor: "#fff",
            }}
          >
            <h2 style={{ fontSize: "26px", marginBottom: "10px" }}>
              Probability: {(result.prob * 100).toFixed(2)}%
            </h2>
            <p
              style={{
                color: result.is_risk ? "#dc2626" : "#16a34a",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {result.is_risk ? "High Risk" : "Low Risk"}
            </p>
            {/* <h3 style={{ marginTop: "25px", fontWeight: "bold", color: "#1e40af" }}>
              SHAP Explanation:
            </h3>
            <div style={{ overflowX: "auto" }}>
              <img
                src={`data:image/png;base64,${result.shap_base64}`}
                alt="SHAP plot"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "600px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  marginTop: "10px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div> */}


            <h3 style={{ marginTop: "30px", fontWeight: "bold", color: "#1e40af" }}>
              Global Diagnostics:
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                marginTop: "15px",
              }}
            >

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
                {[
                  "shap_bar.png",
                  "shap_summary.png",
                  "conf_matrix.png",
                  "cv_vs_test_accuracy.png",
                  "roc_comparison.png"
                ].map((imgName) => (
                  <a
                    key={imgName}
                    href={`http://localhost:5000/assets/${imgName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`http://localhost:5000/assets/${imgName}`}
                      style={{
                        width: "100%",
                        height: "400px",
                        borderRadius: "8px",
                        objectFit: "contain",
                        cursor: "pointer",
                      }}
                      alt={imgName.split(".")[0]}
                    />
                  </a>
                ))}
              </div>


            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#1d4ed8",
          color: "white",
          textAlign: "center",
          padding: "15px 0",
          marginTop: "40px",
          fontSize: "16px",
        }}
      >
        &copy; 2025 Heart Disease Prediction. All rights reserved. By Rahul Shakya and Alston Alvares @ AIT
      </footer>
    </div>
  );
}

export default App;
