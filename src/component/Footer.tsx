// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#1a0f0b] text-gray-300 border-t-4 border-gold mt-auto w-full">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mb-6 md:mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-sm md:text-base font-extrabold bg-gradient-to-br from-gold to-[#b8942a] text-maroon flex-shrink-0">
                <i className="fas fa-om" />
              </div>
              <span className="text-lg md:text-xl font-extrabold text-gold">பக்தியும் – பரதமும்</span>
            </div>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              பதஞ்சலி புக் ஆஃப் வேர்ல்ட் ரெக்கார்ட்ஸ் அங்கீகாரத்துடன்
              <br className="hidden sm:block" />
              2026-ம் ஆண்டு நடைபெறும் மாபெரும் உலக சாதனை நிகழ்வு.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 md:w-11 md:h-11 bg-white/6 rounded-full flex items-center justify-center text-sm md:text-base text-gray-300 transition-all duration-300 border border-white/8 hover:bg-gold hover:text-[#1a0f0b] hover:-translate-y-1"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 md:w-11 md:h-11 bg-white/6 rounded-full flex items-center justify-center text-sm md:text-base text-gray-300 transition-all duration-300 border border-white/8 hover:bg-gold hover:text-[#1a0f0b] hover:-translate-y-1"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 md:w-11 md:h-11 bg-white/6 rounded-full flex items-center justify-center text-sm md:text-base text-gray-300 transition-all duration-300 border border-white/8 hover:bg-gold hover:text-[#1a0f0b] hover:-translate-y-1"
              >
                <i className="fab fa-youtube" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 md:w-11 md:h-11 bg-white/6 rounded-full flex items-center justify-center text-sm md:text-base text-gray-300 transition-all duration-300 border border-white/8 hover:bg-gold hover:text-[#1a0f0b] hover:-translate-y-1"
              >
                <i className="fab fa-twitter" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-gold text-base md:text-lg font-extrabold mb-3 md:mb-4">இணைப்புகள்</h4>
            <a href="#details" className="block text-sm md:text-base text-gray-400 hover:text-gold transition-colors py-1">
              நிகழ்வு விவரங்கள்
            </a>
            <a href="#gallery" className="block text-sm md:text-base text-gray-400 hover:text-gold transition-colors py-1">
              படத்தொகுப்பு
            </a>
            <a href="#perks" className="block text-sm md:text-base text-gray-400 hover:text-gold transition-colors py-1">
              சிறப்புகள்
            </a>
            <a href="#register" className="block text-sm md:text-base text-gray-400 hover:text-gold transition-colors py-1">
              பதிவு
            </a>
          </div>
          <div>
            <h4 className="text-gold text-base md:text-lg font-extrabold mb-3 md:mb-4">தொடர்பு</h4>
            <a href="tel:+919092770105" className="block text-sm md:text-base text-gray-400 hover:text-gold transition-colors py-1">
              <i className="fas fa-phone-alt text-gold mr-2" />
              +91 90927 70105
            </a>
            <a href="mailto:info@adlvallan.com" className="block text-sm md:text-base text-gray-400 hover:text-gold transition-colors py-1">
              <i className="fas fa-envelope text-gold mr-2" />
              info@adlvallan.com
            </a>
            <a href="#" className="block text-sm md:text-base text-gray-400 hover:text-gold transition-colors py-1">
              <i className="fas fa-globe text-gold mr-2" />
              ஸ்ரீஆடல்வல்லான் நாட்டிய சாம்ராஜ்யம்
            </a>
            <a href="#" className="block text-sm md:text-base text-gray-400 hover:text-gold transition-colors py-1">
              <i className="fas fa-map-pin text-gold mr-2" />
              அரியலூர், தமிழ்நாடு
            </a>
          </div>
        </div>
        <div className="border-t border-white/6 pt-4 md:pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs md:text-sm text-gray-500">
          <span>
            <i className="fas fa-heart text-gold mr-1" />
            2026 &nbsp;·&nbsp; அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை
          </span>
          <span>பதஞ்சலி புக் ஆஃப் வேர்ல்ட் ரெக்கார்ட்ஸ் ®</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;