// components/QRScanner.tsx
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRScanner: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const FORM_URL = 'https://forms.gle/e8UDGavfZJ8NHKwm7';

useEffect(() => {
  if (!canvasRef.current) return;

  QRCode.toCanvas(canvasRef.current, FORM_URL, {
    width: 160,
    margin: 2,
    color: {
      dark: "#6C2E1F",
      light: "#FFFFFF",
    },
  }).catch(console.error);
}, []);

  return (
<section
  id="register"
  className="bg-white py-8 md:py-12 lg:py-16 px-4 md:px-6"
>      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 xl:gap-16">
        <div className="text-center">
          <h3 className="text-lg md:text-xl lg:text-2xl font-extrabold text-maroon">QR குறியீடு</h3>
          <p className="text-gray-600 text-sm md:text-base font-medium mb-3 md:mb-4">
            மொபைலில் ஸ்கேன் செய்து படிவத்தை நிரப்பவும்
          </p>
<div
  className="
    inline-block
    bg-white
    p-3
    rounded-2xl
    border-[3px]
    border-[#D4AF37]
    shadow-[0_8px_30px_rgba(212,175,55,0.25)]
    min-w-[80px]
    min-h-[80px]
  "
>            <canvas
              ref={canvasRef}
              width={160}
              height={160}
              className="block w-[120px] h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] max-w-full rounded-lg"
            />
          </div>
        </div>
        <div className="flex-1 min-w-[280px] md:min-w-[300px] lg:min-w-[350px] text-center lg:text-left">
          <h4 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-maroon mb-2 md:mb-3">
            <i className="fas fa-feather-alt text-gold mr-2"></i>
            இப்போதே உங்கள் இடத்தை உறுதி செய்யுங்கள்
          </h4>
          <p className="text-gray-600 text-sm md:text-base font-medium mb-4 md:mb-6 leading-relaxed">
            மேலே உள்ள QR குறியீட்டை ஸ்கேன் செய்யவும் அல்லது கீழே உள்ள பொத்தானை அழுத்தி
            Google Form மூலம் நேரடியாகப் பதிவு செய்யலாம்.
            பதிவுக் கட்டணத்தைச் செலுத்திய பின் சேர்க்கை உறுதி செய்யப்படும்.
          </p>
          <div>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3 bg-maroon text-white px-6 md:px-10 lg:px-12 py-3 md:py-4 rounded-full font-bold text-sm md:text-base lg:text-lg border-none cursor-pointer transition-all duration-300 shadow-lg hover:bg-gold hover:text-maroon hover:-translate-y-1 hover:shadow-gold/35"
            >
              <i className="fas fa-external-link-alt"></i>
              ஆன்லைனில் பதிவு செய்க
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRScanner;