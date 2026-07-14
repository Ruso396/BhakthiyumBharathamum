// components/StatsBar.tsx
import React from 'react';

interface StatCardProps {
  icon: string;
  num: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, num, label }) => (
  <div className="bg-white p-4 md:p-5 lg:p-6 rounded-2xl md:rounded-3xl text-center shadow-[0_12px_40px_rgba(108,46,31,0.10)] border-2 border-gold-light transition-all duration-300 hover:-translate-y-2 hover:border-gold">
    <i className={`${icon} text-2xl md:text-3xl text-gold block mb-1 md:mb-2`} />
    <span className="text-base md:text-lg lg:text-xl font-extrabold text-maroon block">{num}</span>
    <span className="text-xs md:text-sm text-gray-600 font-semibold block mt-1">{label}</span>
  </div>
);

const StatsBar: React.FC = () => {
  const stats = [
    { icon: 'fas fa-calendar-day', num: '09-08-2026', label: 'ஞாயிற்றுக்கிழமை' },
    { icon: 'fas fa-clock', num: 'மாலை 3:00', label: 'நிகழ்வு துவக்கம்' },
    { icon: 'fas fa-map-marked-alt', num: 'அரியலூர்', label: 'கோகிலாம்பாள் நிறுவனங்கள்' },
    { icon: 'fas fa-users', num: '1008', label: 'நாட்டியக் கலைஞர்கள்' },
  ];

  return (
    <div className="container-custom -mt-4 md:-mt-6 lg:-mt-8 relative z-10 px-3 md:px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5 max-w-[1200px] mx-auto">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default StatsBar;