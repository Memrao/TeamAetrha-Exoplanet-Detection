import React from "react";
import { useNavigate } from "react-router-dom";
export default function Explore() {
  const navigate = useNavigate();
  return (
    <section
      id="explore"
      className="w-full py-16 rounded-3xl relative flex flex-col items-center justify-center text-center"
    >
      <p className="text-5xl ml-32 md:text-7xl font-bold font-exo text-cyan-400">
        Let's Explore & Predict with Aethra!
      </p> 

      <button
      onClick={() => navigate("/analysis")}
        className="mt-10 px-6 py-4 text-xl font-montserrat font-medium text-white bg-cyan-500 
                   hover:bg-cyan-400 rounded-lg transition-all duration-200 ml-32"
      >
        Use AI for Prediction and Interpretations
      </button>
    </section>
  );
}
