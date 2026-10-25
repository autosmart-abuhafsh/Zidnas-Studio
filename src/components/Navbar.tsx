import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const updateScrolled = () => {
      ticking = false;
      const next = window.scrollY > 36;
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

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#171518]/95 border-b border-[#C5A15A]/20 shadow-lg'
            : 'bg-transparent border-b border-white/5'
        }`}
      >
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-8 px-5 sm:px-8 py-4">
          {/* Zone 1: Brand Logo & Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="group inline-flex items-center gap-3 text-[#F7F0E5] hover:text-[#C5A15A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#C5A15A]"
          >
            <span className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#651B32] via-[#3A101E] to-[#171518] border border-[#C5A15A]/50 shadow-[0_0_18px_rgba(197,161,90,0.18)] group-hover:border-[#C5A15A] group-hover:shadow-[0_0_24px_rgba(197,161,90,0.32)] transition-all duration-300">
              <svg
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-[#C5A15A] group-hover:scale-105 transition-transform duration-300"
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
              <span className="font-editorial text-lg sm:text-xl font-bold tracking-[0.14em] text-[#F7F0E5] group-hover:text-[#C5A15A] transition-colors">
                ZIDNAS STUDIO
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.08em] text-[#C5A15A]/90">
                Jasa Foto &amp; Sewa Kebaya
              </span>
            </span>
          </a>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav
            aria-label="Navigasi Utama"
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
                    className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#C5A15A] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + Mobile Drawer Button */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-[#F7F0E5] bg-[#651B32] border border-[#C5A15A]/45 rounded-lg hover:bg-[#7A223D] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#C5A15A]"
            >
              Booking Foto
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={
                mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'
              }
              className="md:hidden p-2.5 text-[#F7F0E5] hover:text-[#C5A15A] rounded-lg border border-white/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C5A15A]"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-200 bg-[#171518] border-b border-[#C5A15A]/20 ${
            mobileMenuOpen
              ? 'max-h-96 opacity-100'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <nav
            aria-label="Navigasi Mobile"
            className="px-6 py-5 flex flex-col gap-3"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`py-2.5 text-base font-medium border-b border-white/5 flex items-center justify-between transition-colors ${
                    isActive
                      ? 'text-[#C5A15A]'
                      : 'text-[#F7F0E5]/85 hover:text-[#C5A15A]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="text-xs font-exif text-[#C5A15A]">
                      Aktif
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile Menu Outside-Tap Backdrop */}
      {mobileMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}
    </>
  );
};
