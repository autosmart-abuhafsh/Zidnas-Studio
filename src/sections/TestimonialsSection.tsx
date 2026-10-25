import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = siteConfig;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentItem = testimonials[currentIndex] || testimonials[0];

  return (
    <section className="relative py-24 sm:py-28 bg-[#F7F0E5] text-[#171518] border-t border-[#35251F]/15">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#651B32] mb-3">
              07. CLIENT STORIES & IMPRESSIONS
            </p>
            <h2
              className="font-editorial text-3xl sm:text-5xl font-normal text-[#171518] leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Kesan dari Setiap{' '}
              <span className="italic text-[#651B32]">Kolaborasi</span>
            </h2>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Testimoni sebelumnya"
              className="p-2.5 rounded-lg border border-[#35251F]/20 text-[#171518] hover:bg-[#651B32] hover:text-[#F7F0E5] hover:border-[#651B32] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-exif text-xs text-[#35251F]/80 px-2 tabular-nums">
              0{currentIndex + 1} / 0{testimonials.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Testimoni berikutnya"
              className="p-2.5 rounded-lg border border-[#35251F]/20 text-[#171518] hover:bg-[#651B32] hover:text-[#F7F0E5] hover:border-[#651B32] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Featured Editorial Testimonial with Smooth Transition */}
        <div className="bg-white border border-[#35251F]/12 rounded-2xl p-8 sm:p-12 shadow-sm mb-8 min-h-[260px] flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Quote className="w-8 h-8 text-[#651B32]/60" />
            {currentItem.isDemoPlaceholder && (
              <span className="font-exif text-xs text-[#651B32] tracking-wider">
                PLACEHOLDER DEMO · DAPAT DIEDIT DI SITECONFIG.TS
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#171518] leading-snug mb-8">
                “{currentItem.quote}”
              </blockquote>

              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#35251F]">
                <span className="font-semibold text-[#171518]">
                  {currentItem.clientName}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#651B32] font-medium">
                  {currentItem.sessionType}
                </span>
                <span aria-hidden="true">·</span>
                <span>{currentItem.location}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3-Column Overview Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((item, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`p-5 rounded-xl text-left border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#651B32] text-[#F7F0E5] border-[#651B32] -translate-y-0.5 shadow-md'
                    : 'bg-white/70 text-[#171518] border-[#35251F]/10 hover:border-[#651B32]/40'
                }`}
              >
                <div className="flex items-center gap-2 text-xs opacity-75 mb-1.5">
                  <span className="font-exif tabular-nums">0{idx + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.sessionType}</span>
                </div>
                <p className="font-medium text-sm mb-1">{item.clientName}</p>
                <p className="text-xs opacity-80 line-clamp-2">{item.quote}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
