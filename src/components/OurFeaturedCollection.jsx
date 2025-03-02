import React from 'react';
import Feat1 from '../assets/images/features4.png';
import Feat2 from '../assets/images/features3.png';
import Feat3 from '../assets/images/features2.png';
import Feat4 from '../assets/images/features1.png';

const ImageCard = ({ src, alt, text, text2 }) => {
  return (
    <div className="relative w-[282px] h-[282px] overflow-hidden group mb-8">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-1">
        <p className="text-white text-lg font-bold text-center">{text}</p>
        <p className="text-white text-sm font-bold text-center">{text2}</p>
      </div>
    </div>
  );
};

const ImageGrid = () => {
  const images = [
    { src: Feat4, alt: 'Image 1', text: 'Office Ready/Officials', text2: 'Luxury official wears for your official occasions' },
    { src: Feat3, alt: 'Image 2', text: 'Party Vibes', text2: 'Luxury party wears for your special occasions' },
    { src: Feat2, alt: 'Image 3', text: 'Vacation Vibes', text2: 'Comfortable and stylish wears for your vacations' },
    { src: Feat4, alt: 'Image 4', text: 'Gym', text2: 'Activewear for your fitness routines' },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-8">Our Featured Collections</h1>

      {/* Image Grid */}
      <div className="flex flex-wrap justify-center gap-2">
        {images.map((image, index) => (
          <ImageCard key={index} src={image.src} alt={image.alt} text={image.text} text2={image.text2} />
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;