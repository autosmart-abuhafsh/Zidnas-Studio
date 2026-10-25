import React, { useState, useMemo, useRef } from 'react';
import { Expand, MapPin, Aperture } from 'lucide-react';
import {
  PORTFOLIO_CATEGORIES,
  PortfolioCategory,
  portfolioItems,
  PortfolioItem,
} from '../data/portfolio';
import { EditorialImage } from '../components/EditorialImage';
import { LightboxModal } from '../components/LightboxModal';
import { BatikOrnament } from '../components/BatikOrnament';

interface PortfolioSectionProps {
  onSelectCategoryForBooking: (category: string, artworkTitle?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onSelectCategoryForBooking,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<PortfolioCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return portfolioItems;
    return portfolioItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + filteredItems.length) % filteredItems.length
    );
  };

  const handleNextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handleGridPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!gridRef.current || !cursorFollowerRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 42;
    const y = e.clientY - rect.top - 42;
    cursorFollowerRef.current.style.transform = `translate3d(${x.toFixed(
      1
    )}px, ${y.toFixed(1)}px, 0)`;
  };

  const getGridColumnClasses = (item: PortfolioItem, idx: number) => {
    if (selectedCategory !== 'All') {
      return 'md:col-span-6 lg:col-span-6';
    }
    switch (item.gridSpan) {
      case 'featured-wide':
        return 'md:col-span-12 lg:col-span-8';
      case 'tall-editorial':
        return 'md:col-span-6 lg:col-span-4';
      case 'cinematic-split':
        return 'md:col-span-6 lg:col-span-6';
      default:
        return idx % 3 === 0
          ? 'md:col-span-6 lg:col-span-4'
          : 'md:col-span-6 lg:col-span-4';
    }
  };

  return (
    <section
      id="portfolio"
      className="relative py-24 sm:py-32 bg-[#F7F0E5] text-[#171518]"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Editorial Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#651B32] mb-3">
            01. CURATED PORTFOLIO GALLERY
          </p>
          <h2
            className="font-editorial text-3xl sm:text-5xl font-normal text-[#171518] leading-[1.12] mb-4"
            style={{ textWrap: 'balance' }}
          >
            Stories Behind Every{' '}
            <span className="italic text-[#651B32]">Frame</span>
          </h2>
          <p className="text-sm sm:text-base text-[#35251F]/85 leading-relaxed">
            Setiap gambar menyimpan emosi, perjalanan, dan kenangan yang layak
            diabadikan. Klik pada karya untuk melihat detail komposisi dan
            parameter optik.
          </p>
        </div>

        {/* Interactive Category Filter Controls (Segmented Bar) */}
        <div
          role="tablist"
          aria-label="Filter Kategori Portofolio"
          className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-10 border-b border-[#35251F]/15 no-scrollbar"
        >
          {PORTFOLIO_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setLightboxIndex(null);
                }}
                className={`relative px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#651B32] text-[#F7F0E5] shadow-sm'
                    : 'text-[#35251F]/80 hover:text-[#171518] hover:bg-[#35251F]/5'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Asymmetric Editorial Gallery Grid with Custom Viewfinder Indicator */}
        <div
          ref={gridRef}
          onPointerMove={handleGridPointerMove}
          onPointerLeave={() => setHoveredCardId(null)}
          className="relative grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8"
        >
          {/* Desktop Optical Viewfinder Cursor Follower */}
          <div
            ref={cursorFollowerRef}
            aria-hidden="true"
            style={{
              opacity: hoveredCardId ? 1 : 0,
            }}
            className="hidden lg:flex pointer-events-none absolute top-0 left-0 z-30 w-[84px] h-[84px] rounded-full bg-[#171518]/90 border border-[#C5A15A] text-[#F7F0E5] flex-col items-center justify-center gap-0.5 shadow-xl transition-opacity duration-150 will-change-transform"
          >
            <Aperture className="w-4 h-4 text-[#C5A15A]" />
            <span className="font-exif text-[10px] tracking-wider text-[#C5A15A]">
              BUKA
            </span>
          </div>

          {filteredItems.map((item, idx) => {
            const colClass = getGridColumnClasses(item, idx);
            const heightClass =
              item.gridSpan === 'featured-wide' ||
              item.gridSpan === 'tall-editorial'
                ? 'h-[380px] sm:h-[460px]'
                : item.gridSpan === 'cinematic-split'
                ? 'h-[340px] sm:h-[400px]'
                : 'h-[340px] sm:h-[380px]';

            return (
              <article
                key={item.id}
                onPointerEnter={() => setHoveredCardId(item.id)}
                onPointerLeave={() =>
                  setHoveredCardId((prev) =>
                    prev === item.id ? null : prev
                  )
                }
                className={`group flex flex-col justify-between bg-white/80 border border-[#35251F]/12 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#651B32]/40 transition-transform duration-200 hover:-translate-y-1.5 ${colClass}`}
              >
                {/* Clickable Artwork Frame */}
                <button
                  type="button"
                  onClick={() => handleOpenLightbox(idx)}
                  aria-label={`Buka karya ${item.title} dalam tampilan penuh`}
                  className={`relative w-full ${heightClass} overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#651B32]`}
                >
                  <EditorialImage
                    id={item.id}
                    src={item.imageUrl}
                    alt={item.title}
                    theme={item.theme}
                    aspect={item.aspect}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  />

                  {/* Measured Gradient Scrim for Hover / Mobile Readability */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#171518]/90 via-[#171518]/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-200"
                  />

                  {/* Subtle Gold Inner Frame Border on Hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-3 rounded-xl border border-[#C5A15A]/0 group-hover:border-[#C5A15A]/45 transition-colors duration-200"
                  />

                  {/* Top-Right Expand Affordance Icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#171518]/80 border border-[#C5A15A]/45 flex items-center justify-center text-[#F7F0E5] group-hover:bg-[#651B32] group-hover:scale-105 transition-all duration-200">
                    <Expand className="w-4 h-4" />
                  </div>

                  {/* Bottom Artwork Overlay Metadata */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-[#F7F0E5] transition-transform duration-200 group-hover:-translate-y-1">
                    {/* Unboxed Metadata with Typographic Separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#C5A15A] mb-1.5">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-exif tabular-nums text-[#F7F0E5]/75">
                        {item.exif}
                      </span>
                    </div>

                    <h3 className="font-editorial text-xl sm:text-2xl font-normal text-[#F7F0E5] leading-snug mb-1">
                      {item.title}
                    </h3>

                    <p className="flex items-center gap-1.5 text-xs text-[#F7F0E5]/75">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A15A] shrink-0" />
                      <span>{item.location}</span>
                    </p>
                  </div>
                </button>
              </article>
            );
          })}
        </div>

        {/* Quiet Editorial Note on Demo Artworks */}
        <div className="mt-12 pt-8 border-t border-[#35251F]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#35251F]/75">
          <p>
            Seluruh slot karya di atas terstruktur di dalam{' '}
            <code className="font-exif text-[#651B32]">
              src/data/portfolio.ts
            </code>{' '}
            dan siap diganti dengan foto asli studio Anda kapan saja.
          </p>
          <BatikOrnament className="shrink-0" />
        </div>
      </div>

      {/* Lightbox Viewer Modal */}
      <LightboxModal
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrevLightbox}
        onNext={handleNextLightbox}
        onBookSimilar={(category, title) => {
          setLightboxIndex(null);
          onSelectCategoryForBooking(category, title);
        }}
      />
    </section>
  );
};
