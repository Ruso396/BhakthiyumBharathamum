// src/component/VideoSection.tsx

import React from "react";
import About from "../assets/videoleft.png";

const VideoSection: React.FC = () => {
  const handleVideoClick = () => {
    alert("📽️ விரைவில் காணொளி வெளியாகும்! Video coming soon!");
  };

  return (
    <section id="video" className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container-custom">

        {/* Section Heading */}
        <div className="section-title mb-12">
          <h2>
            நிகழ்வு <span>முன்னோட்டம்</span>
          </h2>
          <div className="line"></div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Image */}
          <div
            className="flex justify-center lg:justify-start cursor-pointer"
            onClick={handleVideoClick}
          >
            <img
              src={About}
              alt="பக்தியும் – பரதமும் நிகழ்வு முன்னோட்டம்"
              className="
                w-full
                max-w-[520px]
                h-auto
                object-contain
                bg-transparent
                shadow-none
                rounded-none
                select-none
              "
              draggable={false}
            />
          </div>

          {/* Right Content */}
          <div className="text-center lg:text-left">

            <span className="inline-flex items-center gap-2 bg-gold/15 text-gold border border-gold/30 rounded-full px-5 py-2 text-sm font-bold mb-5">
              <i className="fas fa-video"></i>
              EVENT PREVIEW
            </span>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-maroon mb-5">
              1008 பரதநாட்டிய{" "}
              <span className="text-gold">
                கலைஞர்களின்
              </span>{" "}
              மாபெரும் சங்கமம்
            </h3>

            <p className="text-gray-600 text-base leading-8 mb-8">
              பதஞ்சலி புக் ஆஃப் வேர்ல்ட் ரெக்கார்ட்ஸ் அங்கீகாரத்துடன்,
              ஸ்ரீ ஆடல்வல்லான் இசை & நாட்டிய சாம்ராஜ்யம் நடத்தும்
              இந்த வரலாற்றுச் சிறப்புமிக்க நிகழ்வில் நீங்களும்
              பங்கேற்று உலக சாதனையாளராக உயருங்கள்!
            </p>

            <a
              href="#register"
              className="
                inline-flex
                items-center
                gap-3
                bg-maroon
                text-white
                px-8
                py-4
                rounded-full
                font-bold
                transition-all
                duration-300
                hover:bg-gold
                hover:text-maroon
                hover:-translate-y-1
              "
            >
              <i className="fas fa-arrow-right"></i>
              இப்போதே பதிவு செய்க
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};

export default VideoSection;