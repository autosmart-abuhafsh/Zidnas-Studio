import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { servicesData, ServiceItem } from '../data/services';
import { EditorialImage } from '../components/EditorialImage';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(
    servicesData[0].id
  );

  const activeService: ServiceItem =
    servicesData.find((s) => s.id === activeServiceId) || servicesData[0];

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 bg-[#171518] text-[#F7F0E5] border-t border-white/10"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A15A] mb-3">
              03. BESPOKE PHOTOGRAPHY SERVICES
            </p>
            <h2
              className="font-editorial text-3xl sm:text-5xl font-normal text-[#F7F0E5] leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Layanan Fotografi untuk Setiap{' '}
              <span className="italic text-[#C5A15A]">Babak Cerita Anda</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#F7F0E5]/70 max-w-md">
            Pilih jenis layanan di bawah ini untuk melihat pendekatan artistik
            kami atau langsung menjadwalkan sesi konsultasi di Malang.
          </p>
        </div>

        {/* Interactive Split Editorial Services Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Chapter Index of 6 Services */}
          <div className="lg:col-span-6 flex flex-col justify-between divide-y divide-white/10 border-t border-b border-white/10">
            {servicesData.map((service) => {
              const isSelected = service.id === activeService.id;
              return (
                <div
                  key={service.id}
                  className={`py-5 px-4 transition-colors duration-150 rounded-lg ${
                    isSelected
                      ? 'bg-[#651B32]/35 border border-[#C5A15A]/30'
                      : 'hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveServiceId(service.id)}
                      className="group flex-1 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C5A15A]"
                    >
                      <div className="flex items-baseline gap-3 mb-1.5">
                        <span className="font-exif text-xs text-[#C5A15A] tabular-nums">
                          {service.number}.
                        </span>
                        <h3
                          className={`font-editorial text-2xl sm:text-3xl transition-transform duration-150 group-hover:translate-x-1 ${
                            isSelected ? 'text-[#C5A15A]' : 'text-[#F7F0E5]'
                          }`}
                        >
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-[#F7F0E5]/75 leading-relaxed pl-7">
                        {service.shortDescription}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectServiceForBooking(service.title)}
                      aria-label={`Konsultasikan ${service.title}`}
                      className="mt-1 px-3.5 py-1.5 text-xs font-medium text-[#F7F0E5] bg-[#651B32]/85 border border-[#C5A15A]/45 rounded-lg hover:bg-[#651B32] hover:border-[#C5A15A] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Konsultasikan
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Service Deep-Dive & Representative Artwork */}
          <div className="lg:col-span-6 bg-[#1F1B1F] border border-[#C5A15A]/35 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl">
            <div className="flex-1 flex flex-col justify-between">
              <div className="relative h-[300px] sm:h-[360px] w-full overflow-hidden">
                <EditorialImage
                  id={`service-plate-${activeService.id}`}
                  src={activeService.imageUrl}
                  alt={activeService.title}
                  theme={activeService.theme}
                  aspect={activeService.aspect}
                  className="w-full h-full"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#1F1B1F] via-[#1F1B1F]/30 to-transparent"
                />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-[#C5A15A]">
                  <span className="font-exif tabular-nums">
                    LAYANAN {activeService.number} / 06
                  </span>
                  <span>{activeService.priceLabel}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-editorial text-3xl text-[#F7F0E5] mb-3">
                    {activeService.title}
                  </h3>
                  <p className="text-sm text-[#F7F0E5]/80 leading-relaxed mb-6">
                    {activeService.editorialApproach}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    <p className="text-xs font-semibold tracking-wider text-[#C5A15A]">
                      CAKUPAN PENDEKATAN SESI:
                    </p>
                    {activeService.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F7F0E5]/80"
                      >
                        <Check className="w-4 h-4 text-[#C5A15A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] text-[#F7F0E5]/60">
                      Estimasi Investasi
                    </p>
                    <p className="text-sm font-medium text-[#C5A15A]">
                      {activeService.priceLabel}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectServiceForBooking(activeService.title)
                    }
                    className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium bg-[#651B32] text-[#F7F0E5] border border-[#C5A15A]/55 rounded-lg hover:bg-[#7A223D] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Konsultasikan {activeService.title}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
