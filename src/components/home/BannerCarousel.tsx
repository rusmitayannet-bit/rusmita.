"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const BANNERS = [
  {
    id: 1,
    image: "https://placehold.co/1920x600/022A4F/FFFFFF?text=OFERTAS+FIESTAS+PATRIAS+-+60%25+DSCTO",
    alt: "Ofertas Fiestas Patrias",
    href: "/categoria/fiestas-patrias",
  },
  {
    id: 2,
    image: "https://placehold.co/1920x600/C41A75/FFFFFF?text=TODO+PARA+EL+ANIVERSARIO+DE+AREQUIPA",
    alt: "Aniversario Arequipa",
    href: "/categoria/fiestas-arequipa",
  },
  {
    id: 3,
    image: "https://placehold.co/1920x600/D2D6D7/022A4F?text=NUEVOS+INGRESOS+NAVIDE%C3%91OS",
    alt: "Nuevos Ingresos Navideños",
    href: "/categoria/navidad",
  },
];

export function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + BANNERS.length) % BANNERS.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1] overflow-hidden group">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 cursor-pointer"
        >
          {/* We'll use a normal anchor tag or Next Link here depending on needs, 
              for now we'll just have the image filling the space */}
          <a href={BANNERS[currentIndex].href} className="block w-full h-full relative">
             <Image
                src={BANNERS[currentIndex].image}
                alt={BANNERS[currentIndex].alt}
                fill
                priority
                className="object-cover"
                unoptimized
             />
          </a>
        </motion.div>
      </AnimatePresence>

      {/* Flechas */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Indicadores (Dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/20 px-3 py-1.5 rounded-full">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
