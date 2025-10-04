// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // import Home from "./pages/Home.jsx";
// import Home from "./pages/home";
import Analysis from "./pages/analysis";
// import home from "./pages/home";
import Home from "./pages/home";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />           {/* Landing page */}
        <Route path="/analysis" element={<Analysis />} /> {/* Analysis page */}
      </Routes>
    </Router>
  </React.StrictMode>
);

