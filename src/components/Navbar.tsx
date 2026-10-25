import React, { useState, useEffect } from 'react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const updateScrolled = () => {
      ticking = false;
      const next = window.scrollY > 24;
      setIsScrolled((prev) => (prev === next ? prev : next));
    };
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScrolled);
      }
    };
    updateScrolled();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#171518]/95 border-b border-[#C5A15A]/25 shadow-lg'
          : 'bg-[#171518]/85 md:bg-transparent border-b border-white/10'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Main Header Bar */}
        <div className="flex items-center justify-between gap-3 sm:gap-8 py-2.5 sm:py-4">
          {/* Zone 1: Brand Logo & Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="group inline-flex items-center gap-2.5 sm:gap-3 text-[#F7F0E5] hover:text-[#C5A15A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#C5A15A]"
          >
            <span className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#651B32] via-[#3A101E] to-[#171518] border border-[#C5A15A]/50 shadow-[0_0_18px_rgba(197,161,90,0.18)] group-hover:border-[#C5A15A] transition-all duration-300 shrink-0">
              <svg
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5A15A]"
                aria-hidden="true"
              >
                {/* Top Viewfinder Prism & Shutter Button */}
                <path
                  d="M12.5 9.5L14.2 6.8C14.55 6.25 15.15 5.9 15.8 5.9H20.2C20.85 5.9 21.45 6.25 21.8 6.8L23.5 9.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="25.2"
                  y="7.2"
                  width="3.6"
                  height="1.8"
                  rx="0.9"
                  fill="#F7F0E5"
                />
                {/* Camera Body */}
                <rect
                  x="4.5"
                  y="9.5"
                  width="27"
                  height="19.5"
                  rx="4.2"
                  fill="#171518"
                  fillOpacity="0.65"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                {/* Outer Gold Lens Ring */}
                <circle
                  cx="18"
                  cy="19.2"
                  r="6.8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                {/* Inner Aperture Blades Ring */}
                <circle
                  cx="18"
                  cy="19.2"
                  r="4.2"
                  fill="#651B32"
                  stroke="#F7F0E5"
                  strokeWidth="1"
                  strokeDasharray="3.2 1.8"
                />
                {/* Lens Core Reflection */}
                <circle cx="18" cy="19.2" r="1.6" fill="#C5A15A" />
                <circle cx="16.4" cy="17.5" r="0.8" fill="#F7F0E5" />
                {/* Studio Flash Sparkle */}
                <circle cx="9.2" cy="13.5" r="1.1" fill="#C5A15A" />
              </svg>
            </span>

            <span className="flex flex-col leading-tight">
              <span className="font-editorial text-base sm:text-xl font-bold tracking-[0.12em] sm:tracking-[0.14em] text-[#F7F0E5] group-hover:text-[#C5A15A] transition-colors">
                ZIDNAS STUDIO
              </span>
              <span className="text-[9.5px] sm:text-[11px] font-medium tracking-[0.06em] sm:tracking-[0.08em] text-[#C5A15A]/90">
                Jasa Foto &amp; Sewa Kebaya
              </span>
            </span>
          </a>

          {/* Zone 2 (Desktop): 5 clean single-line text navigation links */}
          <nav
            aria-label="Navigasi Utama Desktop"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#F7F0E5]/80"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#C5A15A] ${
                    isActive
                      ? 'text-[#F7F0E5]'
                      : 'text-[#F7F0E5]/70 hover:text-[#F7F0E5]'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#C5A15A] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action CTA */}
          <div className="flex items-center shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-[#F7F0E5] bg-[#651B32] border border-[#C5A15A]/45 rounded-lg hover:bg-[#7A223D] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#C5A15A]"
            >
              Booking Foto
            </a>
          </div>
        </div>

        {/* Mobile Tab Menu Bar — Always visible on mobile devices (< md) */}
        <nav
          aria-label="Navigasi Utama Mobile"
          className="flex md:hidden items-center justify-between gap-1 border-t border-white/10 py-1.5 overflow-x-auto no-scrollbar"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`relative px-2 py-1.5 text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#C5A15A] ${
                  isActive
                    ? 'text-[#F7F0E5] font-semibold'
                    : 'text-[#F7F0E5]/70 active:text-[#F7F0E5]'
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-2 right-2 bottom-0 h-[2px] rounded-full bg-[#C5A15A] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

