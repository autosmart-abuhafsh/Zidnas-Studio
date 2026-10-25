import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Check,
  Copy,
  ExternalLink,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { servicesData } from '../data/services';

interface BookingSectionProps {
  preselectedService?: string;
  preselectedConceptNote?: string;
}

interface BookingFormState {
  fullName: string;
  whatsapp: string;
  email: string;
  serviceType: string;
  sessionDate: string;
  location: string;
  budgetRange: string;
  conceptNotes: string;
}

interface FormErrors {
  fullName?: string;
  whatsapp?: string;
  email?: string;
  serviceType?: string;
  sessionDate?: string;
  location?: string;
  conceptNotes?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  preselectedService,
  preselectedConceptNote,
}) => {
  const [formData, setFormData] = useState<BookingFormState>({
    fullName: '',
    whatsapp: '',
    email: '',
    serviceType: servicesData[0].title,
    sessionDate: '',
    location: 'Kota Malang',
    budgetRange: siteConfig.budgetRanges[0],
    conceptNotes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [preparedMessage, setPreparedMessage] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        serviceType: preselectedService,
        conceptNotes: preselectedConceptNote
          ? `Tertarik dengan referensi karya: "${preselectedConceptNote}". `
          : prev.conceptNotes,
      }));
      setErrors((prev) => ({ ...prev, serviceType: undefined }));
    }
  }, [preselectedService, preselectedConceptNote]);

  const updateField = <K extends keyof BookingFormState>(
    field: K,
    value: BookingFormState[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Mohon isi nama lengkap Anda (minimal 2 karakter).';
    }

    const cleanedPhone = formData.whatsapp.replace(/[\s\-+()]/g, '');
    if (!cleanedPhone || !/^\d{9,15}$/.test(cleanedPhone)) {
      newErrors.whatsapp =
        'Mohon masukkan nomor WhatsApp aktif yang valid (9–15 digit angka).';
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = 'Format alamat email tidak valid.';
    }

    if (!formData.serviceType.trim()) {
      newErrors.serviceType = 'Mohon pilih jenis layanan fotografi.';
    }

    if (!formData.sessionDate.trim()) {
      newErrors.sessionDate = 'Mohon pilih tanggal rencana sesi pemotretan.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Mohon cantumkan rencana lokasi pemotretan.';
    }

    if (
      !formData.conceptNotes.trim() ||
      formData.conceptNotes.trim().length < 10
    ) {
      newErrors.conceptNotes =
        'Mohon ceritakan sedikit konsep atau kebutuhan foto Anda (minimal 10 karakter).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildFormattedMessage = (): string => {
    const contactSuffix = formData.email.trim()
      ? ` (WA: ${formData.whatsapp.trim()}, Email: ${formData.email.trim()})`
      : ` (WA: ${formData.whatsapp.trim()})`;

    return [
      "Assalamu'alaikum, saya ingin konsultasi sesi fotografi.",
      '',
      `Nama: ${formData.fullName.trim()}${contactSuffix}`,
      `Jenis layanan: ${formData.serviceType}`,
      `Tanggal rencana: ${formData.sessionDate}`,
      `Lokasi: ${formData.location.trim()}`,
      `Rentang anggaran: ${formData.budgetRange || 'Belum ditentukan'}`,
      `Konsep atau catatan: ${formData.conceptNotes.trim()}`,
      '',
      'Mohon informasi lebih lanjut mengenai ketersediaan jadwal dan paket layanan. Terima kasih.',
    ].join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCopied(false);

    if (!validateForm()) {
      setPreparedMessage(null);
      setWhatsappUrl(null);
      return;
    }

    const messageText = buildFormattedMessage();
    setPreparedMessage(messageText);

    const targetNumber = siteConfig.contact.whatsappNumber.replace(/\D/g, '');
    if (targetNumber) {
      const encoded = encodeURIComponent(messageText);
      const url = `https://wa.me/${targetNumber}?text=${encoded}`;
      setWhatsappUrl(url);
    } else {
      setWhatsappUrl(null);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      whatsapp: '',
      email: '',
      serviceType: servicesData[0].title,
      sessionDate: '',
      location: 'Kota Malang',
      budgetRange: siteConfig.budgetRanges[0],
      conceptNotes: '',
    });
    setErrors({});
    setPreparedMessage(null);
    setWhatsappUrl(null);
    setCopied(false);
  };

  const handleCopyMessage = async () => {
    if (!preparedMessage) return;
    try {
      await navigator.clipboard.writeText(preparedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const directWaHref = siteConfig.contact.whatsappNumber
    ? `https://wa.me/${siteConfig.contact.whatsappNumber.replace(
        /\D/g,
        ''
      )}?text=${encodeURIComponent(
        "Assalamu'alaikum, saya ingin bertanya mengenai layanan Jasa Foto & Sewa Kebaya di ZIDNAS STUDIO Malang."
      )}`
    : '#contact';

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 bg-[#171518] text-[#F7F0E5] border-t border-[#C5A15A]/20"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Contact Info & Studio Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A15A] mb-3">
                08. BOOKING & CONSULTATION
              </p>
              <h2
                className="font-editorial text-3xl sm:text-5xl font-normal text-[#F7F0E5] leading-[1.12] mb-4"
                style={{ textWrap: 'balance' }}
              >
                Let&apos;s Create Something{' '}
                <span className="italic text-[#C5A15A]">Timeless.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#F7F0E5]/80 leading-relaxed">
                Ceritakan momen yang ingin Anda abadikan. Mari rancang sesi
                fotografi yang sesuai dengan kebutuhan dan karakter Anda.
              </p>
            </div>

            {/* Direct Contact Details */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1F1B1F] border border-[#C5A15A]/30 space-y-5">
              <div className="flex items-start gap-3.5">
                <MessageSquare className="w-5 h-5 text-[#C5A15A] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#F7F0E5]/60 mb-0.5">
                    WhatsApp Konsultasi
                  </p>
                  <p className="text-sm font-medium text-[#F7F0E5]">
                    {siteConfig.contact.whatsappDisplay}
                  </p>
                  <a
                    href={directWaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#C5A15A] hover:underline mt-1"
                  >
                    <span>Chat Langsung via WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-white/10">
                <Mail className="w-5 h-5 text-[#C5A15A] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#F7F0E5]/60 mb-0.5">
                    Email Bisnis
                  </p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm font-medium text-[#F7F0E5] hover:text-[#C5A15A] transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-white/10">
                <MapPin className="w-5 h-5 text-[#C5A15A] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#F7F0E5]/60 mb-0.5">
                    Basis Studio & Area Layanan
                  </p>
                  <p className="text-sm text-[#F7F0E5] mb-1">
                    {siteConfig.contact.studioAddress}
                  </p>
                  <p className="text-xs text-[#F7F0E5]/70">
                    Melayani: {siteConfig.brand.serviceAreas.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-4 border-t border-white/10">
                <Clock className="w-5 h-5 text-[#C5A15A] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#F7F0E5]/60 mb-0.5">
                    Jam Operasional Konsultasi
                  </p>
                  <p className="text-xs sm:text-sm text-[#F7F0E5]/85">
                    {siteConfig.contact.operationalHours}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Structured Booking Form */}
          <div className="lg:col-span-7 bg-[#1F1B1F] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nama Lengkap */}
                <div>
                  <label
                    htmlFor="booking-fullname"
                    className="block text-xs font-medium text-[#F7F0E5]/90 mb-2"
                  >
                    Nama Lengkap <span className="text-[#C5A15A]">*</span>
                  </label>
                  <input
                    id="booking-fullname"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Contoh: Raras Pramudita"
                    className="w-full px-4 py-3 text-sm bg-[#171518] border border-white/15 rounded-lg text-[#F7F0E5] placeholder:text-[#F7F0E5]/35 focus:outline-none focus:border-[#C5A15A] transition-colors"
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-[#E5989B] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Nomor WhatsApp */}
                <div>
                  <label
                    htmlFor="booking-whatsapp"
                    className="block text-xs font-medium text-[#F7F0E5]/90 mb-2"
                  >
                    Nomor WhatsApp Aktif <span className="text-[#C5A15A]">*</span>
                  </label>
                  <input
                    id="booking-whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full px-4 py-3 text-sm bg-[#171518] border border-white/15 rounded-lg text-[#F7F0E5] placeholder:text-[#F7F0E5]/35 focus:outline-none focus:border-[#C5A15A] transition-colors"
                  />
                  {errors.whatsapp && (
                    <p className="mt-1.5 text-xs text-[#E5989B] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.whatsapp}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email Opsional */}
                <div>
                  <label
                    htmlFor="booking-email"
                    className="block text-xs font-medium text-[#F7F0E5]/90 mb-2"
                  >
                    Email <span className="text-[#F7F0E5]/45">(Opsional)</span>
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 text-sm bg-[#171518] border border-white/15 rounded-lg text-[#F7F0E5] placeholder:text-[#F7F0E5]/35 focus:outline-none focus:border-[#C5A15A] transition-colors"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-[#E5989B] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Jenis Layanan Fotografi */}
                <div>
                  <label
                    htmlFor="booking-service"
                    className="block text-xs font-medium text-[#F7F0E5]/90 mb-2"
                  >
                    Jenis Layanan Fotografi{' '}
                    <span className="text-[#C5A15A]">*</span>
                  </label>
                  <select
                    id="booking-service"
                    value={formData.serviceType}
                    onChange={(e) => updateField('serviceType', e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-[#171518] border border-white/15 rounded-lg text-[#F7F0E5] focus:outline-none focus:border-[#C5A15A] transition-colors"
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Tanggal Rencana Sesi */}
                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-xs font-medium text-[#F7F0E5]/90 mb-2"
                  >
                    Tanggal Rencana Sesi <span className="text-[#C5A15A]">*</span>
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={formData.sessionDate}
                    onChange={(e) => updateField('sessionDate', e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-[#171518] border border-white/15 rounded-lg text-[#F7F0E5] focus:outline-none focus:border-[#C5A15A] transition-colors"
                  />
                  {errors.sessionDate && (
                    <p className="mt-1.5 text-xs text-[#E5989B] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.sessionDate}</span>
                    </p>
                  )}
                </div>

                {/* Lokasi Pemotretan */}
                <div>
                  <label
                    htmlFor="booking-location"
                    className="block text-xs font-medium text-[#F7F0E5]/90 mb-2"
                  >
                    Lokasi Pemotretan <span className="text-[#C5A15A]">*</span>
                  </label>
                  <input
                    id="booking-location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="Contoh: Kota Malang / Bromo / Studio"
                    className="w-full px-4 py-3 text-sm bg-[#171518] border border-white/15 rounded-lg text-[#F7F0E5] placeholder:text-[#F7F0E5]/35 focus:outline-none focus:border-[#C5A15A] transition-colors"
                  />
                  {errors.location && (
                    <p className="mt-1.5 text-xs text-[#E5989B] flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.location}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Rentang Anggaran Opsional */}
              <div>
                <label
                  htmlFor="booking-budget"
                  className="block text-xs font-medium text-[#F7F0E5]/90 mb-2"
                >
                  Kategori Kebutuhan / Rentang Anggaran{' '}
                  <span className="text-[#F7F0E5]/45">(Opsional)</span>
                </label>
                <select
                  id="booking-budget"
                  value={formData.budgetRange}
                  onChange={(e) => updateField('budgetRange', e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-[#171518] border border-white/15 rounded-lg text-[#F7F0E5] focus:outline-none focus:border-[#C5A15A] transition-colors"
                >
                  {siteConfig.budgetRanges.map((range, i) => (
                    <option key={i} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              {/* Catatan atau Konsep Foto */}
              <div>
                <label
                  htmlFor="booking-notes"
                  className="block text-xs font-medium text-[#F7F0E5]/90 mb-2"
                >
                  Catatan atau Konsep Foto{' '}
                  <span className="text-[#C5A15A]">*</span>
                </label>
                <textarea
                  id="booking-notes"
                  rows={4}
                  value={formData.conceptNotes}
                  onChange={(e) => updateField('conceptNotes', e.target.value)}
                  placeholder="Ceritakan tema busana (misal: kebaya klasik maroon/ivory), jumlah anggota, atau suasana foto yang Anda harapkan..."
                  className="w-full px-4 py-3 text-sm bg-[#171518] border border-white/15 rounded-lg text-[#F7F0E5] placeholder:text-[#F7F0E5]/35 focus:outline-none focus:border-[#C5A15A] transition-colors"
                />
                {errors.conceptNotes && (
                  <p className="mt-1.5 text-xs text-[#E5989B] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.conceptNotes}</span>
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 text-sm font-medium bg-[#651B32] text-[#F7F0E5] border border-[#C5A15A]/60 rounded-lg hover:bg-[#7A223D] transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                >
                  <MessageSquare className="w-4 h-4 text-[#C5A15A]" />
                  <span>Siapkan Pesan Konsultasi WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset Formulir"
                  className="py-3.5 px-4 text-xs font-medium bg-[#171518] text-[#F7F0E5]/75 border border-white/15 rounded-lg hover:border-[#C5A15A] hover:text-[#F7F0E5] transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            </form>

            {/* Formatted WhatsApp Message Preview & Action Box */}
            {preparedMessage && (
              <div className="mt-8 p-6 rounded-xl bg-[#171518] border border-[#C5A15A]/50 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold tracking-wider text-[#C5A15A]">
                    FORMAT PESAN WHATSAPP SIAP DIKIRIM
                  </p>
                  <span className="text-[11px] text-[#F7F0E5]/65">
                    Tervalidasi · Siap diteruskan ke WhatsApp
                  </span>
                </div>

                <pre className="text-xs text-[#F7F0E5]/90 font-sans whitespace-pre-wrap bg-[#1F1B1F] p-4 rounded-lg border border-white/10 leading-relaxed">
                  {preparedMessage}
                </pre>

                {whatsappUrl ? (
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium bg-[#651B32] text-[#F7F0E5] border border-[#C5A15A] rounded-lg hover:bg-[#7D223F] transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Buka & Kirim via WhatsApp Sekarang</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-medium bg-[#1F1B1F] text-[#F7F0E5] border border-white/15 rounded-lg hover:border-[#C5A15A] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-[#C5A15A]" />
                          <span>Pesan Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#C5A15A]" />
                          <span>Salin Teks Pesan</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-[#35251F]/60 border border-[#C5A15A]/40 text-xs text-[#F7F0E5]/85">
                    Nomor WhatsApp tujuan belum dikonfigurasi. Silakan atur
                    properti{' '}
                    <code className="font-exif text-[#C5A15A]">
                      contact.whatsappNumber
                    </code>{' '}
                    pada file{' '}
                    <code className="font-exif text-[#C5A15A]">
                      src/data/siteConfig.ts
                    </code>{' '}
                    atau gunakan tombol Salin Teks Pesan di atas.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
