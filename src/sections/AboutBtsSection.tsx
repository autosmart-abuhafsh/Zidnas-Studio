import React from 'react';
import { motion } from 'motion/react';
import { Camera, MapPin, Aperture } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { EditorialImage } from '../components/EditorialImage';
import { BatikOrnament } from '../components/BatikOrnament';

export const AboutBtsSection: React.FC = () => {
  const { about, behindTheScenes, brand } = siteConfig;

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 bg-[#171518] text-[#F7F0E5] border-t border-white/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* =============================================================== */}
        {/* PART 1: ABOUT — STORY, CRAFT, AND CULTURE                       */}
        {/* =============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch mb-28">
          {/* Left Column: Photographer / Team Editorial Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between bg-[#1F1B1F] border border-[#C5A15A]/30 rounded-2xl overflow-hidden group"
          >
            <div className="relative h-[380px] sm:h-[440px] w-full overflow-hidden">
              <EditorialImage
                id="about-photographer-profile"
                src={about.imageUrl}
                alt={about.photographerName}
                theme="direction-bts"
                aspect="portrait"
                className="w-full h-full"
                imgClassName="transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#1F1B1F] via-transparent to-transparent"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#C5A15A] mb-2">
                <span>{about.role}</span>
                <span aria-hidden="true">·</span>
                <span>{brand.location}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F0E5] mb-3">
                {about.photographerName}
              </h3>

              <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-[#F7F0E5]/75">
                <p>
                  <span className="text-[#C5A15A]">Mulai Beroperasi:</span>{' '}
                  {about.operatingSince}
                </p>
                <p>
                  <span className="text-[#C5A15A]">Spesialisasi:</span>{' '}
                  {about.specialization}
                </p>
                <p className="text-[11px] text-[#F7F0E5]/55 pt-1">
                  Data profil ini dapat disesuaikan melalui{' '}
                  <code className="font-exif text-[#C5A15A]">
                    src/data/siteConfig.ts
                  </code>
                  .
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Brand Story & Philosophy Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A15A] mb-3">
                05. STORY, CRAFT, AND CULTURE
              </p>

              <h2
                className="font-editorial text-3xl sm:text-5xl font-normal text-[#F7F0E5] leading-[1.12] mb-4"
                style={{ textWrap: 'balance' }}
              >
                Photography with Purpose and{' '}
                <span className="italic text-[#C5A15A]">Feeling.</span>
              </h2>

              <p className="font-editorial italic text-lg sm:text-xl text-[#B9838C] mb-6">
                {about.subheading}
              </p>

              <div className="space-y-4 text-sm sm:text-base text-[#F7F0E5]/80 leading-relaxed mb-10">
                {about.storyParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* 3 Creative Philosophy Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8 border-t border-white/10">
              {about.philosophyPillars.map((pillar) => (
                <div
                  key={pillar.number}
                  className="p-5 rounded-xl bg-[#1F1B1F]/80 border border-white/10 hover:border-[#C5A15A]/45 transition-colors duration-200"
                >
                  <p className="font-exif text-xs text-[#C5A15A] tabular-nums mb-2">
                    {pillar.number}.
                  </p>
                  <h3 className="font-editorial text-xl text-[#F7F0E5] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#F7F0E5]/70 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* =============================================================== */}
        {/* PART 2: PHOTO EXPERIENCE / BEHIND THE SCENES                    */}
        {/* =============================================================== */}
        <div className="pt-20 border-t border-[#C5A15A]/20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A15A] mb-3">
                06. THE PHOTOGRAPHY EXPERIENCE · BEHIND THE SCENES
              </p>
              <h2
                className="font-editorial text-3xl sm:text-4xl font-normal text-[#F7F0E5] leading-[1.15]"
                style={{ textWrap: 'balance' }}
              >
                Suasana Kerja yang Tenang, Hangat, dan{' '}
                <span className="italic text-[#C5A15A]">Terarah</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#F7F0E5]/75">
              <MapPin className="w-4 h-4 text-[#C5A15A] shrink-0" />
              <span>Area Layanan: Malang · Batu · Bromo · Jawa Timur</span>
            </div>
          </div>

          {/* Staggered Behind The Scenes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {behindTheScenes.map((bts, idx) => (
              <motion.article
                key={bts.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group bg-[#1F1B1F] border border-white/10 hover:border-[#C5A15A]/45 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 ${
                  idx === 1 ? 'md:mt-8' : ''
                }`}
              >
                <div className="relative h-[260px] sm:h-[300px] w-full overflow-hidden">
                  <EditorialImage
                    id={bts.id}
                    src={bts.imageUrl}
                    alt={bts.title}
                    theme={bts.theme}
                    aspect={bts.aspect}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#1F1B1F] via-transparent to-transparent"
                  />
                  <div className="absolute top-4 left-4 text-xs font-exif text-[#C5A15A] bg-[#171518]/85 px-3 py-1 rounded-md border border-[#C5A15A]/30">
                    {bts.stage}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-editorial text-2xl text-[#F7F0E5] mb-2">
                      {bts.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F7F0E5]/75 leading-relaxed mb-5">
                      {bts.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-exif text-[#C5A15A]">
                    {idx % 2 === 0 ? (
                      <Camera className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <Aperture className="w-3.5 h-3.5 shrink-0" />
                    )}
                    <span className="truncate">{bts.equipmentNote}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-16">
            <BatikOrnament />
          </div>
        </div>
      </div>
    </section>
  );
};
