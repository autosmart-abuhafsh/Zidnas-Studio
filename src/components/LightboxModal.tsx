import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Camera,
  ArrowUpRight,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { PortfolioItem } from '../data/portfolio';
import { EditorialImage } from './EditorialImage';

interface LightboxModalProps {
  items: PortfolioItem[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onBookSimilar: (category: string, title: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onBookSimilar,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setIsZoomed(false);
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIndex, onClose, onPrev, onNext]);

  if (currentIndex === null || !items[currentIndex]) return null;

  const item = items[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Detail Karya: ${item.title}`}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#171518]/95 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
    >
      {/* Top Bar Controls */}
      <div className="fixed top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 z-20 flex items-center justify-between pointer-events-none">
        <div className="text-xs font-exif text-[#F7F0E5]/75 tabular-nums bg-[#171518]/90 px-3.5 py-2 rounded-lg border border-[#C5A15A]/30 pointer-events-auto">
          <span>
            {String(currentIndex + 1).padStart(2, '0')} /{' '}
            {String(items.length).padStart(2, '0')}
          </span>
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <span className="text-[#C5A15A]">{item.category}</span>
        </div>

        <div className="flex items-center gap-2.5 pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed((prev) => !prev);
            }}
            aria-label={
              isZoomed ? 'Perkecil tampilan foto' : 'Perbesar detail foto'
            }
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#F7F0E5] bg-[#171518] border border-white/15 rounded-lg hover:border-[#C5A15A] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {isZoomed ? (
              <>
                <ZoomOut className="w-3.5 h-3.5 text-[#C5A15A]" />
                <span className="hidden sm:inline">1.0x Normal</span>
              </>
            ) : (
              <>
                <ZoomIn className="w-3.5 h-3.5 text-[#C5A15A]" />
                <span className="hidden sm:inline">1.6x Loupe</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pratinjau foto (Escape)"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#F7F0E5] bg-[#171518] border border-[#C5A15A]/40 rounded-lg hover:bg-[#651B32] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Tutup</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop Previous & Next Floating Buttons */}
      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Karya sebelumnya"
            className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#171518]/90 text-[#F7F0E5] border border-[#C5A15A]/35 hover:bg-[#651B32] hover:border-[#C5A15A] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Karya berikutnya"
            className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#171518]/90 text-[#F7F0E5] border border-[#C5A15A]/35 hover:bg-[#651B32] hover:border-[#C5A15A] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Animated Modal Content Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl bg-[#1F1C20] border border-[#C5A15A]/35 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 my-auto mt-14 sm:mt-auto"
        >
          {/* Artwork Plate Column with Optical Loupe Zoom */}
          <div
            onClick={() => setIsZoomed((prev) => !prev)}
            className="lg:col-span-7 bg-[#141215] flex items-center justify-center min-h-[280px] sm:min-h-[440px] lg:min-h-[560px] relative overflow-hidden cursor-zoom-in"
          >
            <EditorialImage
              id={`lightbox-${item.id}`}
              src={item.imageUrl}
              alt={item.title}
              theme={item.theme}
              aspect={item.aspect}
              priority
              className="w-full h-full max-h-[70vh]"
              imgClassName={`transition-transform duration-300 ease-out ${
                isZoomed ? 'scale-[1.65]' : 'scale-100'
              }`}
            />
          </div>

          {/* Artwork Editorial Details Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[#171518] text-[#F7F0E5]">
            <div>
              {/* Clean Unboxed Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#C5A15A] mb-3">
                <span>{item.category}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {item.isDemoArtwork
                    ? 'Visualisasi Editorial Demo'
                    : 'Koleksi Studio'}
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[#F7F0E5] leading-snug mb-4">
                {item.title}
              </h3>

              <p className="text-sm text-[#F7F0E5]/80 leading-relaxed mb-6">
                {item.description}
              </p>

              <div className="border-t border-b border-white/10 py-4 space-y-2.5 text-xs text-[#F7F0E5]/75">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C5A15A] shrink-0" />
                  <span>Lokasi: {item.location}</span>
                </div>
                <div className="flex items-center gap-2.5 font-exif tabular-nums">
                  <Camera className="w-4 h-4 text-[#C5A15A] shrink-0" />
                  <span>Parameter Optik: {item.exif}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 space-y-3">
              {/* Mobile Previous / Next Bar (Non-overlapping on narrow viewports) */}
              {items.length > 1 && (
                <div className="flex md:hidden items-center justify-between gap-2 pb-2">
                  <button
                    type="button"
                    onClick={onPrev}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium bg-[#1F1C20] text-[#F7F0E5] border border-white/15 rounded-lg hover:border-[#C5A15A] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#C5A15A]" />
                    <span>Sebelumnya</span>
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium bg-[#1F1C20] text-[#F7F0E5] border border-white/15 rounded-lg hover:border-[#C5A15A] cursor-pointer"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-4 h-4 text-[#C5A15A]" />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => onBookSimilar(item.category, item.title)}
                className="group w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium bg-[#651B32] text-[#F7F0E5] border border-[#C5A15A]/50 rounded-lg hover:bg-[#7A223D] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Diskusikan Konsep Serupa</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
