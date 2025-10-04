import React from "react";

export default function Title() {
  return (
    <section
      className="w-full py-16 rounded-3xl relative flex flex-col items-center justify-center text-center"
    >
      <p className="text-8xl ml-32 mt-52 md:text-7xl font-bold font-exo text-cyan-400">
        Discover Exoplanets
      </p> 

      <p className="text-3xl mt-10 ml-32 md:text-3xl font-bold font-montserrat text-white-400">
        An AI-powered analysis for exoplanet detection and exploration
      </p> 

    </section>
  );
}
