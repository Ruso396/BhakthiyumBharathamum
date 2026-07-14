// App.tsx
import React from 'react';
import Navbar from '../src/component/Navbar';
import Footer from '../src/component/Footer';
import HeroBanner from '../src/pages/HeroBanner';
import QRScanner from '../src/pages/QRScanner';
import VideoSection from './pages/AboutSection';
import StatsBar from '../src/pages/StatsBar';
import Gallery from '../src/pages/Gallery';
import Details from '../src/pages/Details';
import Perks from '../src/pages/Perks';
import FeeBox from '../src/pages/FeeBox';


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream font-inter text-[#1a1a1a] overflow-x-hidden w-full max-w-full">
      <Navbar/>
      <HeroBanner />
      <QRScanner />
      <VideoSection />
      <StatsBar />
      <Gallery />
      <Details />
      <Perks />
      <FeeBox />
      <Footer />
    </div>
  );
}

export default App;