import { useState } from 'react';
// main.jsx
// import './index.css';  // make sure this is present

import About from '../components/about';
import Features from '../components/features';
import Explore from '../components/explore';
import Header from '../components/header';
import Title from '../components/title';
function Home() {
    return (
        <>
            <div className='mt-10'>
                <Header />
            </div>
            <div>
                <Title />
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
        </>
    );
}

export default Home;
