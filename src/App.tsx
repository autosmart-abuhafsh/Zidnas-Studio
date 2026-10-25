import React, { useState, useEffect, useCallback } from 'react';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './sections/HeroSection';
import { PortfolioSection } from './sections/PortfolioSection';
import { EditorialPhilosophySection } from './sections/EditorialPhilosophySection';
import { ServicesSection } from './sections/ServicesSection';
import { ScrollStorySection } from './sections/ScrollStorySection';
import { AboutBtsSection } from './sections/AboutBtsSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { BookingSection } from './sections/BookingSection';
import { FaqFooterSection } from './sections/FaqFooterSection';
import { siteConfig } from './data/siteConfig';
import { servicesData } from './data/services';
import { mapCategoryToServiceTitle } from './data/portfolio';

const SECTION_IDS = ['home', 'portfolio', 'services', 'about', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [preselectedService, setPreselectedService] = useState<string>(
    servicesData[0].title
  );
  const [preselectedConceptNote, setPreselectedConceptNote] =
    useState<string>('');

  const handleNavigate = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const isMobile = window.innerWidth < 768;
      const headerOffset = sectionId === 'home' ? 0 : isMobile ? 102 : 70;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - headerOffset);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleSelectServiceForBooking = useCallback(
    (serviceTitle: string) => {
      setPreselectedService(serviceTitle);
      setPreselectedConceptNote('');
      handleNavigate('contact');
    },
    [handleNavigate]
  );

  const handleSelectCategoryForBooking = useCallback(
    (category: string, artworkTitle?: string) => {
      const mappedTitle = mapCategoryToServiceTitle(category);
      setPreselectedService(mappedTitle);
      if (artworkTitle) {
        setPreselectedConceptNote(artworkTitle);
      }
      handleNavigate('contact');
    },
    [handleNavigate]
  );

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const quickWaHref = siteConfig.contact.whatsappNumber
    ? `https://wa.me/${siteConfig.contact.whatsappNumber.replace(
        /\D/g,
        ''
      )}?text=${encodeURIComponent(
        "Assalamu'alaikum, saya tertarik untuk berkonsultasi mengenai Jasa Foto & Sewa Kebaya di ZIDNAS STUDIO Malang."
      )}`
    : '#contact';

  return (
    <div className="min-h-screen bg-[#171518] text-[#F7F0E5] flex flex-col selection:bg-[#651B32] selection:text-[#F7F0E5]">
      {/* Top 3-Zone Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. 3D Hero Section: The Immersive Photography Gallery */}
        <HeroSection onNavigate={handleNavigate} />

        {/* 2. Portfolio Section: Stories Behind Every Frame */}
        <PortfolioSection
          onSelectCategoryForBooking={handleSelectCategoryForBooking}
        />

        {/* 3. Editorial Philosophy: The Art of Capturing Moments */}
        <EditorialPhilosophySection onNavigate={handleNavigate} />

        {/* 4. Services Section: Layanan Fotografi */}
        <ServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* 5. Signature Experience: 3D Scroll Story — From Moment to Memory */}
        <ScrollStorySection />

        {/* 6. About & Behind The Scenes */}
        <AboutBtsSection />

        {/* 7. Client Testimonials */}
        <TestimonialsSection />

        {/* 8. Booking & Contact Form */}
        <BookingSection
          preselectedService={preselectedService}
          preselectedConceptNote={preselectedConceptNote}
        />
      </main>

      {/* 9. FAQ Accordion, Footer & GitHub Pages Guide */}
      <FaqFooterSection onNavigate={handleNavigate} />

      {/* Discreet Floating WhatsApp Consultation Button */}
      <a
        href={quickWaHref}
        target={siteConfig.contact.whatsappNumber ? '_blank' : undefined}
        rel={
          siteConfig.contact.whatsappNumber ? 'noopener noreferrer' : undefined
        }
        aria-label="Konsultasi Cepat via WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#651B32] text-[#F7F0E5] border border-[#C5A15A]/60 shadow-xl hover:bg-[#7D223F] transition-colors text-xs font-medium whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#C5A15A]"
      >
        <MessageCircle className="w-4 h-4 text-[#C5A15A]" />
        <span className="hidden sm:inline">Konsultasi WhatsApp</span>
      </a>
    </div>
  );
}
