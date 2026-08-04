"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSlider() {
  const slides = [
    {
      id: 1,
      image: "/hero_banner.png",
      title: "Vệ Sinh Không Gian Sống",
      description: "Tận tâm trong từng không gian sống, mang lại sự bình yên và hạnh phúc cho gia đình bạn.",
    },
    {
      id: 2,
      image: "/images/IMG_3535.JPG",
      title: "Vệ Sinh Công Nghiệp Cao Cấp",
      description: "Đội ngũ chuyên nghiệp, trang thiết bị hiện đại, làm sạch hiệu quả mọi công trình.",
    },
    {
      id: 3,
      image: "/images/IMG_3541.JPG",
      title: "Làm Sạch Chuyên Sâu Tận Tâm",
      description: "Uy tín tạo niềm tin - Giữ trọn vẻ đẹp như mới cho tổ ấm của bạn.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen min-h-[500px] overflow-hidden bg-slate-900 group">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <motion.img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className="w-full h-full object-cover object-center select-none"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
            draggable="false"
          />
          {/* Elegant Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          
          {/* Slide Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 lg:p-24 max-w-7xl mx-auto z-10">
            <motion.h2 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 drop-shadow-lg leading-tight max-w-3xl"
            >
              {slides[currentIndex].title}
            </motion.h2>
            <motion.p 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 max-w-2xl font-medium drop-shadow-md leading-relaxed"
            >
              {slides[currentIndex].description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:outline-none shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/25 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:outline-none shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Indicators Dots */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-500 shadow-sm ${
              currentIndex === idx ? "w-8 bg-brand-green" : "w-2.5 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
