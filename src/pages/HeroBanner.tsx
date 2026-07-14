// components/HeroBanner.tsx
import React from 'react';
import HomeBanner from '../assets/baratham2.png';

const HeroBanner: React.FC = () => {
  return (
    <section className="relative w-full aspect-[16/9] md:aspect-[16/7] lg:aspect-[16/6.5] min-h-[180px] md:min-h-[320px] lg:min-h-[420px] overflow-hidden bg-gradient-to-br from-[#2c1a12] to-[#4A1E14] border-b-4 border-gold">
      <img
        src={HomeBanner}
        alt="பக்தியும் – பரதமும் 2026 பன்னர்"
        className="w-full h-full object-cover block opacity-60"
      />
      <div className="absolute inset-0 hero-gradient flex flex-col items-center justify-center text-center px-4 py-8">
        <span className="inline-block bg-gold/20 backdrop-blur-custom border border-gold/60 px-4 md:px-8 py-1.5 md:py-2 rounded-full text-gold text-[10px] md:text-xs lg:text-sm font-bold tracking-wider uppercase mb-2 md:mb-4">
          உலக சாதனை நிகழ்வு
        </span>
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-shadow leading-tight">
          பக்தியும் – <span className="text-gold">பரதமும்</span> 2026
        </h1>
        <p className="text-white/95 text-sm md:text-base lg:text-xl xl:text-2xl font-semibold text-shadow mt-1 md:mt-3 max-w-3xl">
          1008 பரதநாட்டியக் கலைஞர்களின் மாபெரும் சங்கமம்
        </p>
      </div>
    </section>
  );
};

export default HeroBanner;