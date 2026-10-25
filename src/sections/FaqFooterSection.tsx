import React, { useState } from 'react';
import {
  ChevronDown,
  BookOpen,
  X,
  ArrowUp,
  ExternalLink,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { BatikOrnament } from '../components/BatikOrnament';

interface FaqFooterSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const FaqFooterSection: React.FC<FaqFooterSectionProps> = ({
  onNavigate,
}) => {
  const { faqs, brand, contact } = siteConfig;
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);
  const [showDocsModal, setShowDocsModal] = useState<boolean>(false);

  const currentYear = new Date().getFullYear();

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* =============================================================== */}
      {/* FAQ ACCORDION SECTION                                           */}
      {/* =============================================================== */}
      <section className="py-24 sm:py-28 bg-[#F7F0E5] text-[#171518] border-t border-[#35251F]/15">
        <div className="max-w-[1040px] mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#651B32] mb-3">
              09. FREQUENTLY ASKED QUESTIONS
            </p>
            <h2
              className="font-editorial text-3xl sm:text-5xl font-normal text-[#171518] leading-[1.12] mb-4"
              style={{ textWrap: 'balance' }}
            >
              Pertanyaan Seputar Sesi{' '}
              <span className="italic text-[#651B32]">Pemotretan</span>
            </h2>
            <p className="text-sm text-[#35251F]/80">
              Informasi dasar mengenai pemesanan jadwal, lokasi di Malang Raya,
              dan alur kolaborasi kreatif.
            </p>
          </div>

          <div className="divide-y divide-[#35251F]/15 border-t border-b border-[#35251F]/15">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id} className="py-5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#651B32]"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-exif text-xs text-[#651B32] tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span className="font-editorial text-xl sm:text-2xl font-medium text-[#171518]">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#651B32] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-200 pl-7 pr-4 ${
                      isOpen
                        ? 'max-h-64 opacity-100 pt-3'
                        : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <p className="text-sm text-[#35251F]/85 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =============================================================== */}
      {/* DEEP CHARCOAL EDITORIAL FOOTER                                  */}
      {/* =============================================================== */}
      <footer className="bg-[#171518] text-[#F7F0E5] border-t border-[#C5A15A]/25">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-white/10">
            {/* Brand Identity Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <BatikOrnament variant="gold-emblem" />
                <span className="font-editorial text-xl sm:text-2xl tracking-wider text-[#F7F0E5]">
                  {brand.name}
                </span>
              </div>

              <p className="font-editorial italic text-lg text-[#C5A15A]">
                “{brand.taglineEn}”
              </p>

              <p className="text-xs sm:text-sm text-[#F7F0E5]/70 max-w-sm leading-relaxed">
                {brand.taglineId} — Studio & galeri fotografi profesional untuk
                pernikahan, prewedding, portrait, keluarga, dan komersial di{' '}
                {brand.location}.
              </p>
            </div>

            {/* Quick Navigation Column */}
            <div className="md:col-span-3 space-y-3">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#C5A15A]">
                NAVIGASI GALERI
              </p>
              <ul className="space-y-2 text-sm text-[#F7F0E5]/75">
                {[
                  { id: 'home', label: 'Home · 3D Gallery' },
                  { id: 'portfolio', label: 'Portfolio Karya' },
                  { id: 'services', label: 'Layanan Fotografi' },
                  { id: 'about', label: 'Tentang & Filosofi' },
                  { id: 'contact', label: 'Booking & Konsultasi' },
                ].map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(item.id);
                      }}
                      className="hover:text-[#C5A15A] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Socials Column */}
            <div className="md:col-span-4 space-y-3">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#C5A15A]">
                KONTAK & LOKASI LAYANAN
              </p>
              <p className="text-xs sm:text-sm text-[#F7F0E5]/80">
                {contact.studioAddress}
              </p>
              <p className="text-xs text-[#F7F0E5]/70">
                WhatsApp: {contact.whatsappDisplay}
              </p>
              <p className="text-xs text-[#F7F0E5]/70">
                Email: {contact.email}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-2 text-xs text-[#C5A15A]">
                <a
                  href={contact.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline inline-flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={contact.socials.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline inline-flex items-center gap-1"
                >
                  <span>Behance</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={contact.socials.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline inline-flex items-center gap-1"
                >
                  <span>Pinterest</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => setShowDocsModal(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#F7F0E5] bg-[#35251F]/70 border border-[#C5A15A]/35 rounded-lg hover:bg-[#651B32] transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#C5A15A]" />
                  <span>Panduan Kustomisasi & GitHub Pages</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Back to Top */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F0E5]/60">
            <p>
              © {currentYear} {brand.name} · Malang, Jawa Timur. Seluruh hak
              cipta dilindungi.
            </p>

            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 text-[#C5A15A] hover:text-[#F7F0E5] transition-colors cursor-pointer"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* =============================================================== */}
      {/* DOCUMENTATION & GITHUB PAGES DEPLOYMENT GUIDE MODAL             */}
      {/* =============================================================== */}
      {showDocsModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Panduan Konfigurasi Konten dan Deployment GitHub Pages"
          onClick={() => setShowDocsModal(false)}
          className="fixed inset-0 z-50 bg-[#171518]/90 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-[#1F1B1F] border border-[#C5A15A]/45 rounded-2xl p-6 sm:p-8 text-[#F7F0E5] shadow-2xl max-h-[88vh] overflow-y-auto space-y-6"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-exif text-[#C5A15A] mb-1">
                  DOKUMENTASI TEKNIS & KUSTOMISASI
                </p>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F0E5]">
                  Panduan Penggantian Konten & Deployment GitHub Pages
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDocsModal(false)}
                aria-label="Tutup panduan"
                className="p-2 rounded-lg bg-[#171518] border border-white/15 text-[#F7F0E5] hover:border-[#C5A15A] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#F7F0E5]/85 leading-relaxed">
              <div>
                <h4 className="font-semibold text-[#C5A15A] mb-1">
                  A. File Konfigurasi Konten (Mudah Diedit Tanpa Mengubah Komponen UI)
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <code className="font-exif text-[#C5A15A]">
                      src/data/siteConfig.ts
                    </code>
                    : Ubah nama brand, tagline, nomor WhatsApp bisnis (
                    <code>contact.whatsappNumber</code>), email, alamat studio
                    Malang, profil fotografer, testimoni klien, dan FAQ.
                  </li>
                  <li>
                    <code className="font-exif text-[#C5A15A]">
                      src/data/portfolio.ts
                    </code>
                    : Ubah daftar karya foto, kategori, parameter EXIF, lokasi
                    pemotretan, dan isi properti <code>imageUrl</code> dengan
                    path foto asli Anda (misal <code>./photos/karya-1.jpg</code>
                    ).
                  </li>
                  <li>
                    <code className="font-exif text-[#C5A15A]">
                      src/data/services.ts
                    </code>
                    : Ubah deskripsi layanan, cakupan deliverables, dan label
                    penawaran harga.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-[#C5A15A] mb-1">
                  B. Menjalankan Proyek Secara Lokal & Build Production
                </h4>
                <pre className="font-exif text-xs bg-[#171518] p-3.5 rounded-lg border border-white/10 overflow-x-auto">
{`# 1. Install dependencies
npm install

# 2. Jalankan server development lokal (Port 3000)
npm run dev

# 3. Buat build production (menghasilkan folder dist/)
npm run build

# 4. Pratinjau hasil build production
npm run preview`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold text-[#C5A15A] mb-1">
                  C. Panduan Publish ke Vercel (vercel.app) & GitHub Pages
                </h4>
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li>
                    <strong>Publish ke Vercel (vercel.app):</strong> Proyek ini
                    telah dilengkapi file{' '}
                    <code className="font-exif text-[#C5A15A]">
                      vercel.json
                    </code>
                    . Cukup buka{' '}
                    <code className="font-exif text-[#C5A15A]">
                      https://vercel.com/new
                    </code>
                    , pilih repository GitHub Anda, lalu klik{' '}
                    <strong>Deploy</strong> (Framework Preset: <em>Vite</em>,
                    Build Command: <code>npm run build</code>, Output Directory:{' '}
                    <code>dist</code>).
                  </li>
                  <li>
                    <strong>Alternatif via Vercel CLI:</strong> Jalankan{' '}
                    <code className="font-exif text-[#C5A15A]">
                      npx vercel --prod
                    </code>{' '}
                    di terminal untuk langsung mempublikasikan ke domain{' '}
                    <code>*.vercel.app</code>.
                  </li>
                  <li>
                    <strong>GitHub Pages:</strong> Buka menu{' '}
                    <em>Settings → Pages</em> pada repository GitHub, lalu pilih{' '}
                    <strong>GitHub Actions</strong> sebagai Source.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
