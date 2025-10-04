import React from "react";
// import Analysis from "../pages/analysis";
import { useNavigate } from "react-router-dom";
export default function Header() {
    const navigate = useNavigate();
  return (

    <header className="fixed top-10 left-0 w-full z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Logo */}
        <p className="text-5xl font-semibold font-montserrat text-cyan-400 tracking-wide">
          Aethra
        </p>

        {/* Center Menu */}
        <nav className="font-exo text-3xl flex items-center gap-20 px-6 py-4 
                        bg-transparent border-2 border-transparent rounded-2xl
                        relative
                        before:absolute before:inset-0 before:rounded-2xl
                        before:p-[2px] before:bg-gradient-to-r
                        before:from-cyan-400 before:via-blue-500 before:to-purple-500
                        before:content-[''] before:-z-10
                        after:absolute after:inset-[2px] after:bg-black/60 after:rounded-2xl after:-z-10">
          <a className="text-white font-medium hover:text-cyan-400 transition-colors" href="#home">
            Home
          </a>
          <a className="text-white font-medium hover:text-cyan-400 transition-colors" href="#about">
            About
          </a>
          <a className="text-white font-medium hover:text-cyan-400 transition-colors" href="#features">
            Features
          </a>
          <a className="text-white font-medium hover:text-cyan-400 transition-colors" href="#explore">
            Explore
          </a>
        </nav>

        {/* Right Button */}
        <button 
         onClick={() => navigate("/analysis")}
        className="px-6 py-4 text-xl font-montserrat font-medium text-white bg-cyan-500 
                           hover:bg-cyan-400 rounded-lg transition-all duration-200">
          Analysis
        </button>
      </div>
    </header>
  );
}
