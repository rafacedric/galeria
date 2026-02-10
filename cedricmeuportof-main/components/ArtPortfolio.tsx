import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react'; // Added ArrowRight and Chevron icons if preferred
import ScrollReveal from './ScrollReveal';

interface ArtPortfolioProps {
  onBack: () => void;
  onHoverChange: (isHovering: boolean) => void;
}

const GALLERY_ITEMS = [
  { 
    id: 1, 
    src: "/PXL_20250820_200642276.jpg", // Remove /images/ and /public/
    title: "Porco", 
    aspect: "aspect-square" 
  },
  { 
    id: 2, 
    src: "/PXL_20250813_132657005~2.jpg", 
    title: "Ponte de Sonderborg", 
    aspect: "aspect-[3/4]" 
  },
  { 
    id: 3, 
    src: "/PXL_20250723_183117285~2.jpg", 
    title: "Limões", 
    aspect: "aspect-[4/3]" 
  },
  { 
    id: 4, 
    src: "/PXL_20250610_070422514~2.jpg", 
    title: "Cristo Redentor", 
    aspect: "aspect-[2/3]" 
  },
  { 
    id: 5, 
    src: "/PXL_20240812_201747600.MP~2.jpg", 
    title: "Santa Ceia", 
    aspect: "aspect-[3/2]" 
  },
  { 
    id: 6, 
    src: "/PXL_20240731_193823264.jpg", 
    title: "Cerejas", 
    aspect: "aspect-square" 
  },
  { 
    id: 7, 
    src: "/PXL_20240106_133313208.jpg", 
    title: "Abstrato ", 
    aspect: "aspect-[16/9]" 
  }
];

const ArtPortfolio: React.FC<ArtPortfolioProps> = ({ onBack, onHoverChange }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const navigateImage = (direction: 'next' | 'prev') => {
    if (selectedImageIndex === null) return;
    
    if (direction === 'next') {
      setSelectedImageIndex((selectedImageIndex + 1) % GALLERY_ITEMS.length);
    } else {
      setSelectedImageIndex((selectedImageIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  const selectedImage = selectedImageIndex !== null ? GALLERY_ITEMS[selectedImageIndex] : null;

  return (
    <div className="relative w-full min-h-screen z-20">
      
      {/* Header */}
      <div className="fixed top-0 left-0 w-full h-24 z-50 flex items-center justify-between px-8 md:px-12 pointer-events-none bg-gradient-to-b from-white/80 to-transparent backdrop-blur-[2px]">
        <button 
          onClick={onBack}
          className="pointer-events-auto flex items-center text-black/70 hover:text-black transition-colors group"
        >
          <div className="p-4 rounded-full border border-black/10 group-hover:bg-black/5 transition-all hover:scale-110 bg-white/50">
            <ArrowLeft size={28} />
          </div>
        </button>


      </div>

      <div className="w-full max-w-6xl mx-auto pt-32 pb-20 px-4 md:px-8">
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-400 tracking-tighter">
            ART&nbsp;GALLERY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          {GALLERY_ITEMS.map((art, index) => (
            <ScrollReveal key={art.id} delay={index * 80} className="h-full">
              <div
                className="relative group h-full rounded-3xl p-4 bg-white/10 border border-white/40 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.22)] flex flex-col cursor-pointer"
                onMouseEnter={() => onHoverChange(true)}
                onMouseLeave={() => onHoverChange(false)}
                onClick={() => setSelectedImageIndex(index)}
              >
                <div className="relative rounded-2xl overflow-hidden mb-4 flex-1">
                  <img
                    src={art.src}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                </div>

                <div className="mt-1">
                  <h3 className="text-sm md:text-base font-semibold tracking-tight text-gray-900">
                    {art.title}
                  </h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                    Oil on canvas
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Expanded Image View */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-white animate-in fade-in duration-300"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-8 right-8 p-3 rounded-full bg-black/5 hover:bg-black/10 transition-colors z-[110]"
            onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(null); }}
          >
            <X size={32} className="text-black" />
          </button>

          {/* Navigation Arrows */}
          <button 
            className="absolute left-4 md:left-8 p-4 rounded-full bg-black/5 hover:bg-black/10 transition-all z-[110] hover:scale-110 active:scale-95"
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
          >
            <ArrowLeft size={32} className="text-black" />
          </button>

          <button 
            className="absolute right-4 md:right-8 p-4 rounded-full bg-black/5 hover:bg-black/10 transition-all z-[110] hover:scale-110 active:scale-95"
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
          >
            <ArrowRight size={32} className="text-black" />
          </button>
          
          <div 
            className="relative max-w-5xl max-h-full w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-full object-contain animate-in zoom-in-95 duration-500"
            />
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">{selectedImage.title}</h3>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mt-2">Oil on canvas</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtPortfolio;