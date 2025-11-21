"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Icon from "./Icon";

interface PhoneMockupProps {
  screenshots: string[];
  className?: string;
}

export default function PhoneMockup({ screenshots, className = "" }: PhoneMockupProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (isHovered) return; // Pause on hover

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % screenshots.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, screenshots.length]);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div 
      className={`relative mx-auto ${className}`}
      style={{ width: "300px", height: "600px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* iPhone Frame */}
      <div className="absolute inset-0 bg-charcoal rounded-[3rem] shadow-2xl border-[8px] border-charcoal overflow-hidden z-10">
        {/* Screen Content */}
        <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
          
          {/* Status Bar Placeholder - simplified without notch */}
          <div className="absolute top-0 left-0 right-0 h-8 z-20 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
          
          {/* Carousel Images */}
          <div className="relative w-full h-full">
            {screenshots.map((src, index) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={src}
                  alt={`App Screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Navigation Controls (visible on hover) */}
          <div 
            className={`absolute inset-0 z-40 flex items-center justify-between px-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button 
              onClick={(e) => { e.preventDefault(); prevSlide(); }}
              className="w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 backdrop-blur-sm transition-colors"
              aria-label="Previous slide"
            >
              <span className="text-xl leading-none">‹</span>
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); nextSlide(); }}
              className="w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 backdrop-blur-sm transition-colors"
              aria-label="Next slide"
            >
              <span className="text-xl leading-none">›</span>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-6 left-0 right-0 z-40 flex justify-center gap-2">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? "bg-white w-4" 
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Outer Shadow/Glow for depth */}
      <div className="absolute inset-4 bg-coral/20 blur-3xl rounded-full -z-10 transform translate-y-8"></div>
      
      {/* Reflection Glare */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-[3rem] pointer-events-none z-20 border border-white/10"></div>
    </div>
  );
}
