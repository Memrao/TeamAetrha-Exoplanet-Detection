
import React, { useState } from "react";
import Navbar from "../components/header";

export default function Analysis() {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [probabilities, setProbabilities] = useState([]);
  const [xaiResults, setXaiResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a CSV file first!");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.error) {
        alert(`Error: ${data.error}`);
        return;
      }

      setPredictions(data.predictions);
      setProbabilities(data.probabilities || []);
      setXaiResults(data.shap || []);
      
    } catch (err) {
      console.error(err);
      alert("Error analyzing the file!");
    } finally {
      setLoading(false);
    }
  };

  const getPredictionIcon = (pred) => {
    switch(pred) {
      case "Exoplanet": return "🌍";
      case "Candidate": return "🔹";
      case "False Positive": return "❌";
      default: return "❓";
    }
  };

  return (
    <div id="analysis" className="min-h-screen w-full text-white py-20 px-20">
      <Navbar />
      <h1 className="text-4xl mt-20 font-exo font-bold mb-12 text-center text-white-400">
        Exoplanet Analysis
      </h1>

      {/* Upload Section */}
      <div className="w-[1200px] ml-20 backdrop-blur-lg border border-cyan-500/40 rounded-2xl p-10 shadow-lg">
        <p className="text-2xl font-montserrat mb-6 font-semibold text-center">
          UPLOAD YOUR DATASET (.csv)
        </p>

        <div className="flex justify-center items-center gap-6 text-xl font-montserrat font-bold">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-1/2 text-sm text-gray-300 
                       file:mr-4 file:py-3 file:px-6
                       file:rounded-md file:border-0
                       file:text-xl file:font-semibold file:bg-cyan-500 file:text-white
                       hover:file:bg-cyan-400 cursor-pointer"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-cyan-500 font-exo text-xl font-bold hover:bg-cyan-400 text-white px-8 py-3 rounded-md font-semibold transition-all disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {predictions.length > 0 && (
        <div className="w-full mt-20 ml-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* AI Predictions */}
          <div className="border border-cyan-500/40 rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-montserrat mb-4 text-cyan-300">
              AI Predictions
            </h2>
            <div className="overflow-y-auto max-h-[400px]">
              {predictions.map((pred, index) => (
                <div key={index} className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{getPredictionIcon(pred)}</span>
                    <span className="font-semibold">Row {index + 1}: {pred}</span>
                  </div>
                  {probabilities[index] && (
                    <div className="text-sm text-gray-300 ml-6">
                      {Object.entries(probabilities[index]).map(([className, prob]) => (
                        <div key={className} className="flex justify-between">
                          <span>{className}:</span>
                          <span>{(prob * 100).toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* XAI Insights */}
          <div className="border border-cyan-500/40 rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-montserrat mb-4 text-cyan-300">
              Explainable AI Insights
            </h2>
            <div className="overflow-y-auto max-h-[400px]">
              {xaiResults.map((row, rowIndex) => (
                <div key={rowIndex} className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                  <p className="font-semibold text-cyan-400 mb-2">Row {rowIndex + 1}</p>
                  <ul className="space-y-1 text-gray-300">
                    {row.slice(0, 5).map((feat, i) => ( // Show top 5 features
                      <li key={i} className="flex justify-between">
                        <span className="text-cyan-300">{feat.feature}:</span>
                        <span>{feat.importance > 0 ? '+' : ''}{feat.importance.toFixed(4)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="border border-cyan-500/40 rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-montserrat mb-4 text-cyan-300">
              Analysis Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Objects:</span>
                <span>{predictions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Exoplanets:</span>
                <span>{predictions.filter(p => p === "Exoplanet").length}</span>
              </div>
              <div className="flex justify-between">
                <span>Candidates:</span>
                <span>{predictions.filter(p => p === "Candidate").length}</span>
              </div>
              <div className="flex justify-between">
                <span>False Positives:</span>
                <span>{predictions.filter(p => p === "False Positive").length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}