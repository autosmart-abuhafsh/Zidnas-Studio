import React, { useState } from 'react';
import { Sparkles, ArrowRight, Sun } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { EditorialImage } from '../components/EditorialImage';
import { BatikOrnament } from '../components/BatikOrnament';

interface EditorialPhilosophySectionProps {
  onNavigate: (sectionId: string) => void;
}

export const EditorialPhilosophySection: React.FC<
  EditorialPhilosophySectionProps
> = ({ onNavigate }) => {
  const { editorialSection } = siteConfig;
  const [activeStudyIndex, setActiveStudyIndex] = useState(0);
  const [lightingMode, setLightingMode] = useState<'warm-kebaya' | 'chiaroscuro'>(
    'warm-kebaya'
  );
  const activeStudy = editorialSection.studies[activeStudyIndex];

  return (
    <section className="relative py-24 sm:py-32 bg-[#171518] text-[#F7F0E5] border-t border-[#C5A15A]/15 overflow-hidden">
      {/* Subtle Kawung Corner Ornament */}
      <BatikOrnament
        variant="kawung-corner"
        className="w-40 h-40 absolute top-6 right-6 opacity-60 hidden lg:block"
      />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Multi-ratio Editorial Visual Composition */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#C5A15A]/35 h-[360px] sm:h-[440px] bg-[#121013] shadow-xl">
              <EditorialImage
                id={activeStudy.id}
                alt={activeStudy.label}
                theme={activeStudy.theme}
                aspect="portrait"
                className="w-full h-full"
                imgClassName={
                  lightingMode === 'chiaroscuro'
                    ? 'contrast-125 brightness-90 saturate-75'
                    : 'contrast-100 brightness-100'
                }
              />

              {/* Top Lighting Tone Selector */}
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-2">
                <span className="font-exif text-[11px] text-[#C5A15A] bg-[#171518]/90 px-3 py-1 rounded-md border border-[#C5A15A]/30 tabular-nums">
                  {activeStudy.exif}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setLightingMode((prev) =>
                      prev === 'warm-kebaya' ? 'chiaroscuro' : 'warm-kebaya'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-[#171518]/90 text-[#F7F0E5] border border-[#C5A15A]/40 rounded-md hover:border-[#C5A15A] transition-colors cursor-pointer"
                >
                  <Sun className="w-3.5 h-3.5 text-[#C5A15A]" />
                  <span>
                    {lightingMode === 'warm-kebaya'
                      ? 'Tone: Kebaya Warm Grade'
                      : 'Tone: Studio Chiaroscuro'}
                  </span>
                </button>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171518] via-transparent to-transparent"
              />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-xs text-[#C5A15A] mb-1">
                  <span>Studi Visual 0{activeStudyIndex + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span>Eksplorasi Cahaya & Tekstur</span>
                </div>
                <p className="font-editorial text-2xl text-[#F7F0E5]">
                  {activeStudy.label}
                </p>
                <p className="text-xs text-[#F7F0E5]/75 mt-1 max-w-md">
                  {activeStudy.caption}
                </p>
              </div>
            </div>

            {/* Study Selector Tabs */}
            <div className="grid grid-cols-3 gap-3">
              {editorialSection.studies.map((study, index) => {
                const isSelected = index === activeStudyIndex;
                return (
                  <button
                    key={study.id}
                    type="button"
                    onClick={() => setActiveStudyIndex(index)}
                    className={`p-3.5 rounded-xl text-left border transition-colors duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#651B32] border-[#C5A15A] text-[#F7F0E5] shadow-md'
                        : 'bg-[#1F1C20] border-white/10 text-[#F7F0E5]/70 hover:border-[#C5A15A]/45 hover:text-[#F7F0E5]'
                    }`}
                  >
                    <p className="font-exif text-[11px] text-[#C5A15A] tabular-nums mb-1">
                      0{index + 1}
                    </p>
                    <p className="text-xs font-medium leading-snug line-clamp-2">
                      {study.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Javanese Kebaya Sensibility */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A15A] mb-3">
              02. {editorialSection.kicker}
            </p>

            <h2
              className="font-editorial text-3xl sm:text-5xl font-normal text-[#F7F0E5] leading-[1.12] mb-6"
              style={{ textWrap: 'balance' }}
            >
              Bukan Sekadar Foto.{' '}
              <span className="italic text-[#C5A15A]">Sebuah Cerita.</span>
            </h2>

            <div className="h-px w-24 bg-[#C5A15A]/60 mb-6" />

            <p className="text-base sm:text-lg text-[#F7F0E5]/85 leading-relaxed mb-6">
              {editorialSection.body}
            </p>

            <p className="text-sm text-[#F7F0E5]/70 leading-relaxed mb-8">
              Terinspirasi dari kehalusan kain kebaya adat Jawa, sulaman benang
              emas, dan ritme motif batik klasik, setiap komposisi kami
              menonjolkan keseimbangan antara keanggunan budaya dan kejujuran
              emosi.
            </p>

            {/* Key Visual Elements Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10 mb-8">
              <div>
                <h3 className="font-editorial text-xl text-[#C5A15A] mb-1">
                  Harmoni Cahaya & Tekstur
                </h3>
                <p className="text-xs text-[#F7F0E5]/70 leading-relaxed">
                  Menjaga detail serat beludru, kilau payet, dan rona kulit tetap
                  natural tanpa kehilangan kedalaman atmosfer.
                </p>
              </div>
              <div>
                <h3 className="font-editorial text-xl text-[#C5A15A] mb-1">
                  Komposisi Editorial
                </h3>
                <p className="text-xs text-[#F7F0E5]/70 leading-relaxed">
                  Penataan ruang negatif dan proporsi visual yang tenang layaknya
                  lembaran monograf fotografi.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="group inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium bg-[#651B32] text-[#F7F0E5] border border-[#C5A15A]/50 rounded-lg hover:bg-[#7A223D] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-4 h-4 text-[#C5A15A]" />
                <span>Pelajari Layanan Kami</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
