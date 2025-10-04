
import React from "react";

export default function About() {
    return (
        <section id="about" className="py-40 ml-52">
            <div className="w-full flex items-center justify-between gap-32">
                {/* Left Text */}
                <div className="max-w-2xl">
                    <p className="text-6xl font-bold font-exo text-left mb-6">About</p>
                    <p className="text-xl text-justify leading-relaxed font-semibold text-gray-200">
                        Aethra is an AI-powered platform for exoplanet detection and interpretability.
                        Using machine learning models trained on NASA’s Kepler dataset, it predicts potential exoplanets and explains its reasoning through Explainable AI (XAI), helping users understand the key factors behind each prediction and build trust in AI-driven space discovery.
                    </p>
                </div>

                {/* Right Image */}
                <div className="flex justify-center items-center">
                    <img
                        src="/about.png"
                        alt="About"
                        className="rounded-full w-96 h-96 object-cover border-4 border-white/60 shadow-lg"
                    />
                </div>
            </div>
        </section>

    );
}
