// components/Navbar.tsx
import React from 'react';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';
import logo3 from '../assets/logo3.png';

const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-cream/97 backdrop-blur-custom border-b-3 border-gold py-3.5 shadow-[0_4px_24px_rgba(108,46,31,0.08)]">
      <div className="container-custom flex items-center justify-center flex-wrap gap-3 md:gap-5 lg:gap-10">
        <div className="flex items-center justify-center px-3 md:px-4 lg:px-5 py-1.5 transition-transform duration-300 hover:-translate-y-1">
          <img
            src={logo1}
            alt="பக்தியும் – பரதமும் 2026"
            className="max-h-8 md:max-h-10 lg:max-h-12 w-auto object-contain rounded"
          />
        </div>
        <div className="flex items-center justify-center px-3 md:px-4 lg:px-5 py-1.5 transition-transform duration-300 hover:-translate-y-1">
          <img
            src={logo2}
            alt="கோகிலாம்பாள் அறக்கட்டளை"
            className="max-h-8 md:max-h-10 lg:max-h-12 w-auto object-contain rounded"
          />
        </div>
        <div className="flex items-center justify-center px-3 md:px-4 lg:px-5 py-1.5 transition-transform duration-300 hover:-translate-y-1">
          <img
            src={logo3}
            alt="பதஞ்சலி உலக சாதனை"
            className="max-h-8 md:max-h-10 lg:max-h-12 w-auto object-contain rounded"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;