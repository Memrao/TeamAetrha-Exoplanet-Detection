import React from "react";

export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-5xl ml-52 bg-transparent border-2 border-transparent rounded-2xl
                 relative
                 before:absolute before:inset-0 before:rounded-2xl
                 before:p-[2px] before:bg-gradient-to-r
                 before:from-cyan-400 before:via-blue-500 before:to-purple-500
                 before:content-[''] before:-z-10
                 after:absolute after:inset-[2px] after:bg-black/60 after:rounded-2xl after:-z-10
                 py-16 mt-52"
    >
      <div className="flex flex-row items-center justify-between gap-12 px-10">
        {/* Left: Image */}
        <div className="flex-shrink-0">
          <img
            className="w-[450px] h-[600px] rounded-xl object-cover shadow-lg -mt-72"
            src="features.png"
            alt="Exoplanet Detection AI Visualization"
          />
        </div>

        {/* Right: Text Content */}
        <div className="flex flex-col space-y-10 text-left">
          {/* Exoplanet Detection */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-cyan-300 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Exoplanet Detection Using AI
            </h3>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm  text-justify leading-relaxed max-w-md ml-auto">
                Leveraging machine learning to analyze Kepler mission datasets, this project provides an automated system for identifying potential exoplanets. Users can upload CSV files containing pre-processed planetary features such as orbital period, transit duration, and planetary radius. The Random Forest model classifies each candidate as Exoplanet, Candidate, or False Positive, while also providing probability scores and feature importance explanations using SHAP. This approach allows researchers and enthusiasts to interact with NASA’s publicly available exoplanet datasets, receive accurate predictions, and gain insights into which features influence the classification, all via an intuitive web interface.
              </p>
              <div className="flex text-left text-md font-bold items-center gap-4 text-cyan-400">
                <span>Feature-Based Classification</span>
                <span>Probability Scoring</span>
              </div>
            </div>
          </div>

          {/* XAI Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-purple-300 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Explainable AI for Interpretation
            </h3>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm leading-relaxed max-w-md ml-auto">
                Transparent AI decisions showing exactly how each prediction is made,
                with detailed feature importance and confidence metrics for complete interpretability.
              </p>
              <div className="flex text-left items-center gap-4 text-md font-bold text-white-400">
                <span>SHAP Values</span>
                <span>Feature Impact</span>
                <span>Decision Transparency</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-end gap-6 pt-4">
            <div className="text-center">
              <div className="text-cyan-400 text-lg font-bold">84%</div>
              <div className="text-gray-400 text-2xs">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-cyan-400 text-lg font-bold">11</div>
              <div className="text-gray-400 text-2xs">Features</div>
            </div>
            <div className="text-center">
              <div className="text-cyan-400 text-lg font-bold">3</div>
              <div className="text-gray-400 text-2xs">Classes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}