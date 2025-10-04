import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/header'
import About from './components/about'
import Features from './components/features'
import Explore from './components/explore'
// import Title from './components/title'
import Analysis from './pages/analysis'
// import Home from './pages/home'
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
     <div className='mt-10'>
                < Navbar />
            </div>
            <div>
                <About />
            </div>

            <div className='mt-20'>
                <Features />
            </div>
            <div className='mt-20'>
                <Explore />
            </div>
    </>  )
}

export default App
