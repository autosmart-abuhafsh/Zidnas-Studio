import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowDown,
  Aperture,
  Camera,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import {
  Hero3DScene,
  CameraViewPreset,
  FloatingFrameMeta,
  HERO_GALLERY_FRAMES,
} from '../components/Hero3DScene';
import { siteConfig } from '../data/siteConfig';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [cameraPreset, setCameraPreset] =
    useState<CameraViewPreset>('overview');
  const [explodedFactor, setExplodedFactor] = useState<number>(0.18);
  const [apertureOpen, setApertureOpen] = useState<number>(0.68);
  const [hudCollapsed, setHudCollapsed] = useState<boolean>(false);
  const [hoveredFrame, setHoveredFrame] = useState<FloatingFrameMeta | null>(
    null
  );
  const [selectedFrame, setSelectedFrame] = useState<FloatingFrameMeta | null>(
    null
  );

  const activeInspectedFrame = selectedFrame || hoveredFrame;

  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-[#171518] text-[#F7F0E5] overflow-hidden flex flex-col justify-between"
    >
      {/* Background 3D WebGL Canvas Layer (Isolated Ref Container) */}
      <div className="absolute inset-0 z-0">
        <Hero3DScene
          cameraPreset={cameraPreset}
          explodedFactor={explodedFactor}
          apertureOpen={apertureOpen}
          focusedFrameId={selectedFrame?.id || null}
          onSelectFrame={(frame) => setSelectedFrame(frame)}
          onHoverFrame={(frame) => setHoveredFrame(frame)}
        />
        {/* Measured contrast scrim so typography is always legible while keeping the 3D scene vivid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#171518]/90 via-[#171518]/30 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171518] via-transparent to-[#171518]/60"
        />
      </div>

      {/* Semantic Foreground Content Layer with Sequential Entrance Choreography */}
      <div className="relative z-10 max-w-[1360px] w-full mx-auto px-5 sm:px-8 pt-28 pb-36 md:pt-36 md:pb-40 flex-1 flex flex-col justify-center pointer-events-none">
        <div className="max-w-xl pointer-events-auto">
          {/* Kicker Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-[#C5A15A]" />
            <p className="text-xs sm:text-sm font-medium tracking-[0.2em] text-[#C5A15A]">
              {siteConfig.hero.kicker}
            </p>
          </motion.div>

          {/* Hero Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-editorial text-4xl sm:text-6xl lg:text-[4.35rem] font-normal leading-[1.06] tracking-tight text-[#F7F0E5] mb-5"
            style={{ textWrap: 'balance' }}
          >
            Memories, Framed in{' '}
            <span className="italic text-[#C5A15A]">Elegance.</span>
          </motion.h1>

          {/* Indonesian Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.24,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-editorial italic text-lg sm:text-2xl text-[#B9838C] mb-3"
          >
            “{siteConfig.brand.taglineId}”
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.34,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-sm sm:text-base text-[#F7F0E5]/80 leading-relaxed mb-8 max-w-lg"
          >
            {siteConfig.hero.subtitle}
          </motion.p>

          {/* Primary & Secondary Call-To-Actions */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.44,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() => onNavigate('portfolio')}
              className="group px-6 py-3.5 text-sm font-medium bg-[#651B32] text-[#F7F0E5] border border-[#C5A15A]/65 rounded-lg hover:bg-[#7D223F] hover:border-[#C5A15A] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2.5 shadow-lg focus-visible:outline-2 focus-visible:outline-[#C5A15A]"
            >
              <span>{siteConfig.hero.primaryCta}</span>
              <ArrowDown className="w-4 h-4 text-[#C5A15A] transition-transform duration-200 group-hover:translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 text-sm font-medium bg-[#171518]/90 text-[#F7F0E5] border border-[#F7F0E5]/25 rounded-lg hover:border-[#C5A15A] hover:text-[#C5A15A] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#C5A15A]"
            >
              {siteConfig.hero.secondaryCta}
            </button>
          </motion.div>

          {/* Interactive 3D Frame Inspection Status Readout */}
          <div className="mt-7 min-h-[44px]">
            <AnimatePresence mode="wait">
              {activeInspectedFrame ? (
                <motion.div
                  key={activeInspectedFrame.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#171518]/95 border border-[#C5A15A]/45 text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A15A] shrink-0" />
                  <span className="font-medium text-[#F7F0E5]">
                    {activeInspectedFrame.title}
                  </span>
                  <span aria-hidden="true" className="text-[#C5A15A]">
                    ·
                  </span>
                  <span className="text-[#C5A15A]">
                    {activeInspectedFrame.category}
                  </span>
                  <span aria-hidden="true" className="text-[#F7F0E5]/40">
                    ·
                  </span>
                  <span className="font-exif text-[#F7F0E5]/75 tabular-nums">
                    {activeInspectedFrame.exif}
                  </span>
                  {selectedFrame && (
                    <button
                      type="button"
                      onClick={() => setSelectedFrame(null)}
                      className="ml-2 inline-flex items-center gap-1 text-[#C5A15A] hover:underline cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Fokus</span>
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-[#F7F0E5]/55 font-exif"
                >
                  Arahkan pointer atau pilih bingkai foto 3D untuk menginspeksi
                  karya di ruang galeri.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Unified Collapsible Bottom 3D Gallery Control Dock */}
      <div className="relative z-20 w-full px-4 pb-5 flex flex-col items-center pointer-events-none">
        <div className="w-full max-w-[960px] flex flex-col items-center pointer-events-auto">
          {/* Collapse / Expand Toggle */}
          <button
            type="button"
            onClick={() => setHudCollapsed((prev) => !prev)}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-[#F7F0E5]/80 bg-[#171518] border border-b-0 border-[#C5A15A]/30 rounded-t-lg hover:text-[#C5A15A] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {hudCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-[#C5A15A]" />
                <span>Tampilkan Kontrol Kamera 3D</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-[#C5A15A]" />
                <span>Sembunyikan Kontrol 3D</span>
              </>
            )}
          </button>

          {/* Bottom Control Dock Body */}
          {!hudCollapsed && (
            <div className="w-full bg-[#171518]/95 border border-[#C5A15A]/35 rounded-xl p-3 sm:px-5 sm:py-3.5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Camera View Presets + Touch/Keyboard Frame Focus Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <div className="flex items-center gap-1 bg-[#35251F]/60 p-1 rounded-lg border border-white/5">
                  <Camera className="w-3.5 h-3.5 text-[#C5A15A] ml-2 mr-1 shrink-0 hidden sm:block" />
                  {(
                    [
                      { id: 'overview', label: 'Ruang Galeri' },
                      { id: 'optics', label: 'Detail Lensa' },
                      { id: 'frames', label: 'Bingkai Karya' },
                    ] as const
                  ).map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setSelectedFrame(null);
                        setCameraPreset(preset.id);
                      }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        cameraPreset === preset.id && !selectedFrame
                          ? 'bg-[#651B32] text-[#F7F0E5] border border-[#C5A15A]/50'
                          : 'text-[#F7F0E5]/70 hover:text-[#F7F0E5]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Quick 3D Frame Focus Selector (accessible on Mobile & Keyboard) */}
                <div
                  role="group"
                  aria-label="Inspeksi Cepat Bingkai 3D"
                  className="flex items-center gap-1 bg-[#35251F]/40 p-1 rounded-lg border border-white/5"
                >
                  {HERO_GALLERY_FRAMES.slice(0, 4).map((frame, i) => {
                    const isFocused = selectedFrame?.id === frame.id;
                    return (
                      <button
                        key={frame.id}
                        type="button"
                        onClick={() =>
                          setSelectedFrame(isFocused ? null : frame)
                        }
                        title={`Fokus ke ${frame.title}`}
                        className={`px-2 py-1 text-[11px] font-exif tabular-nums rounded transition-colors cursor-pointer ${
                          isFocused
                            ? 'bg-[#C5A15A] text-[#171518] font-semibold'
                            : 'text-[#F7F0E5]/70 hover:text-[#C5A15A]'
                        }`}
                      >
                        F0{i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Exploded Optical Elements & Aperture Sliders */}
              <div className="flex items-center gap-4 w-full md:w-auto justify-center">
                <label className="flex items-center gap-2 text-xs text-[#F7F0E5]/80 whitespace-nowrap shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A15A]" />
                  <span>Susunan Optik</span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.02}
                    value={explodedFactor}
                    onChange={(e) =>
                      setExplodedFactor(parseFloat(e.target.value))
                    }
                    aria-label="Eksplorasi Susunan Lensa 3D"
                    className="w-16 sm:w-20 accent-[#C5A15A] cursor-pointer"
                  />
                </label>

                <label className="flex items-center gap-2 text-xs text-[#F7F0E5]/80 whitespace-nowrap shrink-0">
                  <Aperture className="w-3.5 h-3.5 text-[#C5A15A]" />
                  <span className="font-exif tabular-nums">
                    f/{(1.2 + (1 - apertureOpen) * 6.8).toFixed(1)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={apertureOpen}
                    onChange={(e) =>
                      setApertureOpen(parseFloat(e.target.value))
                    }
                    aria-label="Bukaan Diafragma Lensa"
                    className="w-14 sm:w-18 accent-[#C5A15A] cursor-pointer"
                  />
                </label>
              </div>

              {/* Animated Scroll Indicator */}
              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                aria-label="Gulir ke bagian Portofolio"
                className="hidden xl:flex items-center gap-2 text-xs text-[#C5A15A] hover:text-[#F7F0E5] transition-colors cursor-pointer whitespace-nowrap shrink-0 group"
              >
                <span>Gulir Galeri</span>
                <ArrowDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
