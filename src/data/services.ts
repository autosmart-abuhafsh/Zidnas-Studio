import { PlateTheme } from '../utils/editorialPlateGenerator';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  categoryKey: string;
  shortDescription: string;
  editorialApproach: string;
  deliverables: string[];
  priceLabel: string;
  theme: PlateTheme;
  aspect: 'portrait' | 'landscape';
  imageUrl?: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'service-wedding',
    number: '01',
    title: 'Wedding Photography',
    categoryKey: 'Wedding Photography',
    shortDescription:
      'Mengabadikan momen pernikahan dengan pendekatan dokumenter dan editorial yang merangkum prosesi sakral maupun emosi hangat keluarga.',
    editorialApproach:
      'Dari persiapan rias pengantin, prosesi akad atau pemberkatan, upacara adat panggih, hingga resepsi malam—setiap momen direkam dengan warna yang matang dan komposisi berkelas.',
    deliverables: [
      'Liputan prosesi sakral & resepsi dengan kurasi warna khas studio',
      'Potret pasangan & keluarga dengan penataan cahaya terarah',
      'Galeri digital resolusi tinggi & opsi cetak album fine-art',
    ],
    priceLabel: 'Hubungi kami untuk penawaran',
    theme: 'kebaya-wedding',
    aspect: 'portrait',
    imageUrl: '',
  },
  {
    id: 'service-prewedding',
    number: '02',
    title: 'Prewedding Photography',
    categoryKey: 'Prewedding Photography',
    shortDescription:
      'Sesi foto pasangan dengan konsep artistik dan lokasi yang sesuai dengan karakter cerita mereka, baik di studio maupun lanskap alam Malang Raya.',
    editorialApproach:
      'Dirancang layaknya cerita pendek visual. Kami membantu merancang moodboard, pemilihan palet kebaya atau busana modern, hingga waktu pencahayaan terbaik (golden hour).',
    deliverables: [
      'Diskusi konsep kreatif, moodboard & rekomendasi lokasi di Malang/Batu/Bromo',
      'Direksi pose yang rileks, mengalir, dan jauh dari kesan kaku',
      'File hasil color-grading editorial siap cetak & undangan digital',
    ],
    priceLabel: 'Hubungi kami untuk penawaran',
    theme: 'bromo-prewedding',
    aspect: 'landscape',
    imageUrl: '',
  },
  {
    id: 'service-portrait',
    number: '03',
    title: 'Portrait & Personal Branding',
    categoryKey: 'Portrait & Personal Branding',
    shortDescription:
      'Fotografi individu, profesional, model, dan personal branding dengan karakter pencahayaan studio maupun on-location yang kuat.',
    editorialApproach:
      'Menonjolkan keunikan karakter, wibawa profesional, maupun pesona busana wastra Nusantara melalui tata cahaya presisi dan komposisi minimalis.',
    deliverables: [
      'Sesi potret eksklusif dengan beberapa skema pencahayaan',
      'Retouching detail kulit dan tekstur kain secara natural',
      'Format gambar optimal untuk portofolio, publikasi, dan profil profesional',
    ],
    priceLabel: 'Hubungi kami untuk penawaran',
    theme: 'velvet-portrait',
    aspect: 'portrait',
    imageUrl: '',
  },
  {
    id: 'service-family',
    number: '04',
    title: 'Family & Graduation',
    categoryKey: 'Family & Graduation',
    shortDescription:
      'Mengabadikan kebersamaan keluarga lintas generasi serta pencapaian akademik dalam bingkai visual yang hangat dan berwibawa.',
    editorialApproach:
      'Kami menciptakan suasana pemotretan yang nyaman bagi seluruh anggota keluarga agar senyum, interaksi, dan kebanggaan momen wisuda terekam secara tulus.',
    deliverables: [
      'Potret formasi keluarga, wisudawan, dan interaksi candid yang hangat',
      'Panduan keselarasan warna busana (kebaya, batik, atau formal)',
      'Hasil foto resolusi tinggi yang siap dibingkai di ruang keluarga',
    ],
    priceLabel: 'Hubungi kami untuk penawaran',
    theme: 'heritage-family',
    aspect: 'landscape',
    imageUrl: '',
  },
  {
    id: 'service-product',
    number: '05',
    title: 'Product & Commercial',
    categoryKey: 'Product & Commercial',
    shortDescription:
      'Fotografi produk untuk katalog, marketplace, kampanye pemasaran, kuliner, kriya, dan kebutuhan identitas visual bisnis.',
    editorialApproach:
      'Menggabungkan ketajaman optik makro, penataan properti artistik, dan reproduksi warna akurat untuk meningkatkan nilai jual produk Anda.',
    deliverables: [
      'Foto katalog bersih maupun konsep tematik editorial',
      'Kontrol pantulan cahaya khusus untuk perhiasan, kain, dan kemasan',
      'Lisensi penggunaan komersial sesuai kebutuhan kampanye brand',
    ],
    priceLabel: 'Hubungi kami untuk penawaran',
    theme: 'artisan-product',
    aspect: 'portrait',
    imageUrl: '',
  },
  {
    id: 'service-event',
    number: '06',
    title: 'Event & Cultural Photography',
    categoryKey: 'Event & Cultural Photography',
    shortDescription:
      'Dokumentasi acara resmi, kegiatan perusahaan, pameran seni, dan pergelaran kebudayaan dengan kepekaan jurnalistik serta artistik.',
    editorialApproach:
      'Menangkap atmosfer ruang, emosi penonton, detail tata panggung, dan momen-momen kunci yang membangun narasi utuh dari acara Anda.',
    deliverables: [
      'Dokumentasi momen utama, suasana acara, dan detail dekorasi',
      'Seleksi foto cepat untuk kebutuhan publikasi media atau rilis acara',
      'Arsip dokumentasi terstruktur dengan kualitas warna konsisten',
    ],
    priceLabel: 'Hubungi kami untuk penawaran',
    theme: 'cultural-stage',
    aspect: 'landscape',
    imageUrl: '',
  },
];
