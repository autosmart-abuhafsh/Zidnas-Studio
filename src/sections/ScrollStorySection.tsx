import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/siteConfig';
import { EditorialImage } from '../components/EditorialImage';
import { BatikOrnament } from '../components/BatikOrnament';

gsap.registerPlugin(ScrollTrigger);

export const ScrollStorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ringOuterRef = useRef<SVGSVGElement>(null);
  const ringInnerRef = useRef<SVGSVGElement>(null);
  const frameCardRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeChapter, setActiveChapter] = useState<number>(0);
  const activeChapterRef = useRef<number>(0);
  const scrollProgressRef = useRef<number>(0);
  const pointerTiltRef = useRef<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

  const { chapters, kicker, title } = siteConfig.scrollStory;
  const currentChapter = chapters[activeChapter] || chapters[0];

  const applyFrameTransform = () => {
    if (!frameCardRef.current) return;
    const p = scrollProgressRef.current;
    const { rx, ry } = pointerTiltRef.current;
    const frameScale = 0.9 + p * 0.1;
    const frameRotateX = (0.5 - p) * 5 + rx;
    const frameRotateY = ry;
    frameCardRef.current.style.transform = `perspective(1100px) rotateX(${frameRotateX.toFixed(
      2
    )}deg) rotateY(${frameRotateY.toFixed(2)}deg) scale(${frameScale.toFixed(
      3
    )})`;
  };

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top 55%',
        end: 'bottom 45%',
        onUpdate: (self) => {
          const p = self.progress;
          scrollProgressRef.current = p;

          const idx = Math.min(
            chapters.length - 1,
            Math.floor(p * chapters.length)
          );
          if (idx !== activeChapterRef.current) {
            activeChapterRef.current = idx;
            setActiveChapter(idx);
          }

          applyFrameTransform();

          if (ringOuterRef.current) {
            ringOuterRef.current.style.transform = `rotate(${(p * 160).toFixed(1)}deg)`;
          }
          if (ringInnerRef.current) {
            ringInnerRef.current.style.transform = `rotate(${(-p * 210).toFixed(1)}deg)`;
          }
        },
      });
    }, sectionEl);

    return () => ctx.revert();
  }, [chapters.length]);

  const isLightStage = currentChapter.bgHex === '#F7F0E5';

  const handleFramePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    pointerTiltRef.current = {
      rx: -ny * 3.5,
      ry: nx * 4.5,
    };
    applyFrameTransform();
  };

  const handleFramePointerLeave = () => {
    pointerTiltRef.current = { rx: 0, ry: 0 };
    applyFrameTransform();
  };

  const selectChapterManually = (idx: number) => {
    activeChapterRef.current = idx;
    setActiveChapter(idx);
    scrollProgressRef.current = (idx + 0.5) / chapters.length;
    applyFrameTransform();
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Perjalanan Visual From Moment to Memory"
      style={{
        backgroundColor: currentChapter.bgHex,
        color: currentChapter.textHex,
      }}
      className="relative py-24 sm:py-32 transition-colors duration-500 overflow-hidden border-t border-[#C5A15A]/20"
    >
      {/* Golden Geometric Rings Moving with Scroll */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-25"
      >
        <svg
          ref={ringOuterRef}
          viewBox="0 0 600 600"
          className="w-[520px] h-[520px] sm:w-[740px] sm:h-[740px] text-[#C5A15A] absolute"
        >
          <circle
            cx="300"
            cy="300"
            r="280"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="8 12"
          />
          <rect
            x="100"
            y="100"
            width="400"
            height="400"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            transform="rotate(45 300 300)"
          />
        </svg>

        <svg
          ref={ringInnerRef}
          viewBox="0 0 500 500"
          className="w-[380px] h-[380px] sm:w-[540px] sm:h-[540px] text-[#C5A15A] absolute"
        >
          <circle
            cx="250"
            cy="250"
            r="220"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="250" cy="30" r="6" fill="currentColor" />
          <circle cx="250" cy="470" r="6" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Top Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p
            className={`text-xs font-semibold tracking-[0.2em] mb-3 ${
              isLightStage ? 'text-[#651B32]' : 'text-[#C5A15A]'
            }`}
          >
            04. {kicker}
          </p>
          <h2
            className="font-editorial text-3xl sm:text-5xl font-normal leading-[1.12] mb-6"
            style={{ textWrap: 'balance' }}
          >
            {title}
          </h2>
          <BatikOrnament />
        </div>

        {/* Interactive 3D Exhibition Stage + Narrative Chapters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: 3D Expanding Exhibition Frame with Pointer Tilt & Cinematic Masking */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              ref={frameCardRef}
              onPointerMove={handleFramePointerMove}
              onPointerLeave={handleFramePointerLeave}
              className={`w-full max-w-2xl rounded-2xl p-4 sm:p-6 transition-transform duration-150 ease-out will-change-transform shadow-2xl border ${
                isLightStage
                  ? 'bg-white border-[#651B32]/25'
                  : 'bg-[#171518]/90 border-[#C5A15A]/45'
              }`}
            >
              {/* Inner Gold Gallery Mat Frame */}
              <div className="relative h-[340px] sm:h-[460px] w-full rounded-xl overflow-hidden border border-[#C5A15A]/45 bg-[#121013]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentChapter.step}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="w-full h-full"
                  >
                    <EditorialImage
                      id={`scroll-story-${currentChapter.step}`}
                      alt={currentChapter.title}
                      theme={currentChapter.theme}
                      aspect="landscape"
                      className="w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Exhibition Plaque Overlay */}
                <div className="absolute bottom-3 left-3 right-3 z-20 px-4 py-2.5 rounded-lg bg-[#171518]/90 border border-[#C5A15A]/40 flex items-center justify-between text-xs text-[#F7F0E5]">
                  <span className="font-exif text-[#C5A15A] tabular-nums">
                    BABAK {currentChapter.step} / 04
                  </span>
                  <span className="truncate ml-3 text-[#F7F0E5]/85">
                    {currentChapter.caption}
                  </span>
                </div>
              </div>

              {/* Scroll Journey Progress Bar */}
              <div className="mt-4 h-1 w-full rounded-full overflow-hidden bg-black/20">
                <div
                  ref={progressBarRef}
                  style={{
                    width: `${Math.max(
                      15,
                      Math.round(((activeChapter + 1) / chapters.length) * 100)
                    )}%`,
                  }}
                  className="h-full bg-[#C5A15A] transition-all duration-300"
                />
              </div>
            </div>

            {/* Interactive Chapter Stepper Buttons */}
            <div
              role="tablist"
              aria-label="Tahapan Cerita Visual"
              className="flex flex-wrap items-center justify-center gap-2 mt-6"
            >
              {chapters.map((chap, idx) => {
                const isSelected = idx === activeChapter;
                return (
                  <button
                    key={chap.step}
                    role="tab"
                    aria-selected={isSelected}
                    type="button"
                    onClick={() => selectChapterManually(idx)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelected
                        ? isLightStage
                          ? 'bg-[#651B32] text-[#F7F0E5] border-[#651B32] shadow-md'
                          : 'bg-[#C5A15A] text-[#171518] border-[#C5A15A] shadow-md'
                        : isLightStage
                        ? 'bg-transparent text-[#171518]/75 border-[#171518]/20 hover:border-[#651B32]'
                        : 'bg-transparent text-[#F7F0E5]/75 border-white/15 hover:border-[#C5A15A]'
                    }`}
                  >
                    <span className="font-exif tabular-nums mr-1.5">
                      {chap.step}.
                    </span>
                    <span>{chap.phase}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Progressive Scroll Narrative Cards */}
          <div className="lg:col-span-5 space-y-5">
            {chapters.map((chap, idx) => {
              const isCurrent = idx === activeChapter;
              return (
                <div
                  key={chap.step}
                  onClick={() => selectChapterManually(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? isLightStage
                        ? 'bg-white border-[#651B32] shadow-lg -translate-x-1'
                        : 'bg-[#171518]/90 border-[#C5A15A] shadow-xl -translate-x-1'
                      : isLightStage
                      ? 'bg-white/40 border-[#171518]/10 opacity-65 hover:opacity-95'
                      : 'bg-black/20 border-white/10 opacity-60 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span
                      className={`font-exif tabular-nums font-semibold ${
                        isLightStage ? 'text-[#651B32]' : 'text-[#C5A15A]'
                      }`}
                    >
                      {chap.step} · {chap.phase}
                    </span>
                    {isCurrent && (
                      <span className="font-exif text-[11px] opacity-75">
                        Babak Aktif
                      </span>
                    )}
                  </div>

                  <h3 className="font-editorial text-2xl font-normal mb-2">
                    {chap.title}
                  </h3>

                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                    {chap.narrative}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
