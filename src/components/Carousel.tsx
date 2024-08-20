import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface CarouselProps {
  images: string[];
  productIds: number[]; 
}

const Carousel: React.FC<CarouselProps> = ({ images, productIds }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const scrollCarousel = (direction: number) => {
    setCurrentIndex(prevIndex => (prevIndex + direction + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden relative rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <Link to={`/product/${productIds[index]}`} key={index} className="min-w-full flex items-center justify-center">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-64 h-64 object-cover cursor-pointer" 
              />
            </Link>
          ))}
        </div>
      </div>

      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-3 bg-gray-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 focus:outline-none"
        onClick={() => scrollCarousel(-1)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-3 bg-gray-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 focus:outline-none"
        onClick={() => scrollCarousel(1)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
