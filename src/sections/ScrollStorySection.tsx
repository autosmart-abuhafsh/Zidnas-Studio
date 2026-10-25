import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { EditorialImage } from '../components/EditorialImage';
import { BatikOrnament } from '../components/BatikOrnament';

export const ScrollStorySection: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<number>(0);

  const { chapters, kicker, title } = siteConfig.scrollStory;
  const currentChapter = chapters[activeChapter] || chapters[0];
  const isLightStage = currentChapter.bgHex === '#F7F0E5';

  return (
    <section
      aria-label="Perjalanan Visual From Moment to Memory"
      style={{
        backgroundColor: currentChapter.bgHex,
        color: currentChapter.textHex,
      }}
      className="relative py-24 sm:py-32 overflow-hidden border-t border-[#C5A15A]/20"
    >
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

        {/* Interactive Exhibition Stage + Narrative Chapters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Exhibition Frame */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div
              className={`w-full max-w-2xl rounded-2xl p-4 sm:p-6 shadow-xl border ${
                isLightStage
                  ? 'bg-white border-[#651B32]/25'
                  : 'bg-[#171518] border-[#C5A15A]/45'
              }`}
            >
              {/* Inner Gold Gallery Mat Frame */}
              <div className="relative h-[340px] sm:h-[460px] w-full rounded-xl overflow-hidden border border-[#C5A15A]/45 bg-[#121013]">
                <EditorialImage
                  id={`scroll-story-${currentChapter.step}`}
                  alt={currentChapter.title}
                  theme={currentChapter.theme}
                  aspect="landscape"
                  className="w-full h-full"
                />

                {/* Exhibition Plaque Overlay */}
                <div className="absolute bottom-3 left-3 right-3 z-20 px-4 py-2.5 rounded-lg bg-[#171518]/95 border border-[#C5A15A]/40 flex items-center justify-between text-xs text-[#F7F0E5]">
                  <span className="font-exif text-[#C5A15A] tabular-nums">
                    BABAK {currentChapter.step} / 04
                  </span>
                  <span className="truncate ml-3 text-[#F7F0E5]/85">
                    {currentChapter.caption}
                  </span>
                </div>
              </div>

              {/* Journey Progress Bar */}
              <div className="mt-4 h-1 w-full rounded-full overflow-hidden bg-black/20">
                <div
                  style={{
                    width: `${Math.max(
                      15,
                      Math.round(((activeChapter + 1) / chapters.length) * 100)
                    )}%`,
                  }}
                  className="h-full bg-[#C5A15A] transition-all duration-200"
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
                    onClick={() => setActiveChapter(idx)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
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

          {/* Right Column: Narrative Cards */}
          <div className="lg:col-span-5 space-y-5">
            {chapters.map((chap, idx) => {
              const isCurrent = idx === activeChapter;
              return (
                <div
                  key={chap.step}
                  onClick={() => setActiveChapter(idx)}
                  className={`p-6 rounded-2xl border transition-colors duration-150 cursor-pointer ${
                    isCurrent
                      ? isLightStage
                        ? 'bg-white border-[#651B32] shadow-lg'
                        : 'bg-[#171518] border-[#C5A15A] shadow-xl'
                      : isLightStage
                      ? 'bg-white/50 border-[#171518]/10 opacity-70 hover:opacity-100'
                      : 'bg-black/25 border-white/10 opacity-65 hover:opacity-95'
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
