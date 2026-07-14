// components/Details.tsx
import React from 'react';

interface DetailCardProps {
  icon: string;
  title: string;
  description: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-5 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl border border-gray-100 shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(108,46,31,0.08)] hover:scale-[1.02] hover:border-gold relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1.5 h-full bg-maroon" />
    <i className={`${icon} text-3xl md:text-4xl text-gold block mb-3 md:mb-4`} />
    <h4 className="text-base md:text-lg lg:text-xl font-extrabold text-maroon mb-1 md:mb-2">{title}</h4>
    <p className="text-sm md:text-base text-gray-700 font-medium">{description}</p>
  </div>
);

const Details: React.FC = () => {
  const details = [
    {
      icon: 'fas fa-gopuram',
      title: 'பக்தி & பரதம்',
      description:
        'தமிழகத்தின் பாரம்பரிய வீரம், தெய்வீகக் கலை, மற்றும் பண்பாட்டை உலகிற்கு பறைசாற்றும் பிரம்மாண்ட நாட்டிய சங்கமம்.',
    },
    {
      icon: 'fas fa-trophy',
      title: 'உலக சாதனை',
      description:
        'பதஞ்சலி புக் ஆஃப் வேர்ல்ட் ரெக்கார்ட்ஸ் (Patanjali Book of World Records) அங்கீகாரத்துடன் நிகழும் வரலாற்றுப் பதிவு.',
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'சிறப்பு வேதிகை',
      description:
        'கோகிலாம்பாள் கல்வி நிறுவனங்கள், குழவடையான், அரியலூர் மாவட்டம், தமிழ்நாடு.',
    },
    {
      icon: 'fas fa-music',
      title: 'நெறியாள்கை',
      description:
        'ஸ்ரீஆடல்வல்லான் இசை & நாட்டிய சாம்ராஜ்யம் பெருமையுடன் வழங்கும் கலைப் பெருவிழா.',
    },
  ];

  return (
    <div id="details" className="container-custom">
      <div className="section-title">
        <h2>
          நிகழ்வு <span>விவரங்கள்</span>
        </h2>
        <div className="line" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-8 md:mb-10">
        {details.map((detail, index) => (
          <DetailCard key={index} {...detail} />
        ))}
      </div>
    </div>
  );
};

export default Details;