// components/Gallery.tsx
import React from 'react';

interface GalleryItemProps {
  src: string;
  alt: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ src, alt }) => (
  <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_8px_28px_rgba(108,46,31,0.08)] border-2 border-gold-light transition-all duration-300 hover:-translate-y-2 hover:border-gold hover:shadow-[0_16px_48px_rgba(108,46,31,0.15)] aspect-[4/3] relative group">
    <img
      src={src}
      alt={alt}
      className="w-full h-full max-w-full object-cover block transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
  </div>
);

const Gallery: React.FC = () => {
  const images = [
    {
      src: 'https://m.media-amazon.com/images/I/8129jhBjurL._AC_UF894,1000_QL80_.jpg',
      alt: 'பரதநாட்டியம் - 1',
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWkcuKnCfbOhNibmfPlP6AQRFcqj1I_ud5ypT8CAbaGxlrMWDeCKudi34&s=10',
      alt: 'பரதநாட்டியம் - 2',
    },
    {
      src: 'https://whatshappbangalore.wordpress.com/wp-content/uploads/2016/06/ashtalakshmi-vaibhava-bharatanatyam-group-dance-by-ponnaiah-lalithakala-academy-1.jpg',
      alt: 'பரதநாட்டியம் - 3',
    },
    {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFbXUm0XzQnNaOisZ7ZjSMacz_i2J7Xg2DVeXdRh4zdexCoPEiwFsOu2o&s=10',
      alt: 'பரதநாட்டியம் - 4',
    },
  ];

  return (
    <div id="gallery" className="container-custom">
      <div className="section-title">
        <h2>
          படத்தொகுப்பு <span>தருணங்கள்</span>
        </h2>
        <div className="line" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 my-6 md:my-8">
        {images.map((img, index) => (
          <GalleryItem key={index} {...img} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;