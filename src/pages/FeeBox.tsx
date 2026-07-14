// components/FeeBox.tsx
import React from 'react';

const FeeBox: React.FC = () => {
  return (
    <div className="container-custom">
      <div className="bg-white border-2 border-dashed border-maroon rounded-3xl md:rounded-[60px] px-4 md:px-8 lg:px-12 py-4 md:py-5 lg:py-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-10 my-8 md:my-10 lg:my-12 shadow-[0_8px_24px_rgba(0,0,0,0.02)]">
        <div className="text-base md:text-lg lg:text-2xl font-extrabold text-[#1a1a1a] flex items-center gap-2 flex-wrap justify-center">
          <i className="fas fa-rupee-sign text-gold" />
          ஒரு நபர் பதிவு கட்டணம்:{' '}
          <span className="bg-maroon text-white px-3 md:px-4 lg:px-5 py-1 rounded-full text-base md:text-lg lg:text-xl">
            ₹1,500
          </span>
        </div>
        <div className="text-sm md:text-base text-maroon bg-[#FFF0EC] px-3 md:px-4 lg:px-6 py-1.5 md:py-2 rounded-full font-bold flex items-center gap-2">
          <i className="fas fa-exclamation-circle" />
          1008 நபர்களுக்கு மட்டுமே – முன்பதிவு அவசியம்!
        </div>
      </div>
    </div>
  );
};

export default FeeBox;