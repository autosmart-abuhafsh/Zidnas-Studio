import { PlateTheme } from '../utils/editorialPlateGenerator';

export type PortfolioCategory =
  | 'All'
  | 'Wedding'
  | 'Prewedding'
  | 'Portrait'
  | 'Family'
  | 'Graduation'
  | 'Product'
  | 'Commercial'
  | 'Event'
  | 'Culture & Heritage';

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'All'>;
  location: string;
  description: string;
  exif: string;
  featured?: boolean;
  gridSpan:
    | 'featured-wide'
    | 'tall-editorial'
    | 'standard-editorial'
    | 'cinematic-split';
  aspect: 'portrait' | 'landscape' | 'square' | 'wide';
  theme: PlateTheme;
  /**
   * Isi dengan URL gambar/path aset asli fotografer (misal: './photos/wedding-01.jpg').
   * Jika dikosongkan, website menampilkan pelat karya visual demo beresolusi tinggi.
   */
  imageUrl?: string;
  isDemoArtwork: boolean;
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  'All',
  'Wedding',
  'Prewedding',
  'Portrait',
  'Family',
  'Graduation',
  'Product',
  'Commercial',
  'Event',
  'Culture & Heritage',
];

export function mapCategoryToServiceTitle(category: string): string {
  switch (category) {
    case 'Wedding':
      return 'Wedding Photography';
    case 'Prewedding':
      return 'Prewedding Photography';
    case 'Portrait':
      return 'Portrait & Personal Branding';
    case 'Family':
    case 'Graduation':
      return 'Family & Graduation';
    case 'Product':
    case 'Commercial':
      return 'Product & Commercial';
    case 'Event':
    case 'Culture & Heritage':
      return 'Event & Cultural Photography';
    default:
      return 'Wedding Photography';
  }
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'work-01',
    title: 'Kidung Asmara dalam Balutan Beludru Maroon',
    category: 'Wedding',
    location: 'Kawasan Heritage Ijen, Kota Malang',
    description:
      'Studi potret pernikahan adat Jawa kontemporer yang menonjolkan keanggunan kebaya kutubaru beludru merah marun, sulaman benang emas, dan tata cahaya chiaroscuro yang hangat.',
    exif: '85mm · f/1.4 · 1/250s · ISO 160',
    featured: true,
    gridSpan: 'featured-wide',
    aspect: 'landscape',
    theme: 'kebaya-wedding',
    imageUrl: '',
    isDemoArtwork: true,
  },
  {
    id: 'work-02',
    title: 'Senandung Kabut Pagi di Kaldera Tengger',
    category: 'Prewedding',
    location: 'Taman Nasional Bromo Tengger Semeru, Malang Raya',
    description:
      'Sesi prewedding sinematik saat matahari terbit menyinari kabut dataran tinggi, memadukan siluet pasangan berbusana Jawa klasik dengan lanskap vulkanik yang megah.',
    exif: '35mm · f/2.0 · 1/500s · ISO 100',
    featured: true,
    gridSpan: 'tall-editorial',
    aspect: 'portrait',
    theme: 'bromo-prewedding',
    imageUrl: '',
    isDemoArtwork: true,
  },
  {
    id: 'work-03',
    title: 'Elegansi Ketenangan — Fine Art Kebaya Portrait',
    category: 'Portrait',
    location: 'Studio Galeri Malang',
    description:
      'Potret karakter personal dengan pencahayaan satu arah yang lembut, memperlihatkan harmoni antara sanggul tradisional, tusuk konde emas, dan ekspresi mata yang tenang.',
    exif: '90mm · f/2.0 · 1/160s · ISO 100',
    gridSpan: 'standard-editorial',
    aspect: 'portrait',
    theme: 'velvet-portrait',
    imageUrl: '',
    isDemoArtwork: true,
  },
  {
    id: 'work-04',
    title: 'Filosofi Kawung & Serat Benang Emas',
    category: 'Culture & Heritage',
    location: 'Klojen, Kota Malang',
    description:
      'Eksplorasi visual jarak dekat terhadap tekstur kain batik tulis dan bordir kebaya klasik sebagai penghormatan atas ketekunan para perajin kriya Jawa.',
    exif: '100mm Macro · f/4.0 · 1/125s · ISO 100',
    gridSpan: 'standard-editorial',
    aspect: 'square',
    theme: 'batik-macro',
    imageUrl: '',
    isDemoArtwork: true,
  },
  {
    id: 'work-05',
    title: 'Lintas Generasi dalam Ruang Hangat',
    category: 'Family',
    location: 'Kediaman Keluarga, Malang',
    description:
      'Potret kebersamaan tiga generasi dalam nuansa warna tanah, cokelat batik, dan krem gading yang dirancang untuk dipajang sebagai pusaka visual keluarga.',
    exif: '50mm · f/2.8 · 1/200s · ISO 200',
    gridSpan: 'cinematic-split',
    aspect: 'landscape',
    theme: 'heritage-family',
    imageUrl: '',
    isDemoArtwork: true,
  },
  {
    id: 'work-06',
    title: 'Langkah Baru dalam Balutan Tradisi',
    category: 'Graduation',
    location: 'Kawasan Kampus & Studio Malang',
    description:
      'Mengabadikan pencapaian akademik melalui pendekatan portrait editorial yang anggun, menggabungkan kebaya wisuda berdetail emas dengan komposisi arsitektural.',
    exif: '85mm · f/1.8 · 1/320s · ISO 125',
    gridSpan: 'standard-editorial',
    aspect: 'portrait',
    theme: 'graduation-editorial',
    imageUrl: '',
    isDemoArtwork: true,
  },
  {
    id: 'work-07',
    title: 'Kriya Perhiasan & Wewangian Nusantara',
    category: 'Product',
    location: 'Commercial Still-Life Studio, Malang',
    description:
      'Fotografi produk still-life untuk koleksi perhiasan kuningan berlapis emas dan parfum lokal dengan permainan pantulan cahaya spekular di atas permukaan batu alam.',
    exif: '90mm Tilt-Shift · f/8.0 · 1/160s · ISO 64',
    gridSpan: 'standard-editorial',
    aspect: 'square',
    theme: 'artisan-product',
    imageUrl: '',
    isDemoArtwork: true,
  },
  {
    id: 'work-08',
    title: 'Arsitektur & Ruang Hospitality Heritage',
    category: 'Commercial',
    location: 'Boutique Heritage Space, Kota Malang',
    description:
      'Visual kampanye komersial yang menonjolkan perpaduan desain interior kolonial-Jawa, pencahayaan sore hari, dan atmosfer ruang yang mengundang.',
    exif: '24mm · f/5.6 · 1/60s · ISO 160',
    gridSpan: 'cinematic-split',
    aspect: 'landscape',
    theme: 'architecture-commercial',
    imageUrl: '',
    isDemoArtwork: true,
  },
  {
    id: 'work-09',
    title: 'Malam Pergelaran Seni & Budaya Jawa Timur',
    category: 'Event',
    location: 'Gedung Kesenian & Pendopo Malang',
    description:
      'Dokumentasi panggung pertunjukan tari klasik dan malam apresiasi budaya dengan tangkapan gerak selendang serta sorot lampu panggung yang dramatis.',
    exif: '70-200mm · f/2.8 · 1/400s · ISO 640',
    gridSpan: 'standard-editorial',
    aspect: 'landscape',
    theme: 'cultural-stage',
    imageUrl: '',
    isDemoArtwork: true,
  },
  {
    id: 'work-10',
    title: 'Prosesi Sakral Panggih & Sungkeman',
    category: 'Wedding',
    location: 'Pendopo Agung, Malang',
    description:
      'Momen hening penuh haru ketika kedua mempelai memohon doa restu, diabadikan dengan pencahayaan alami yang menjaga kesakralan suasana.',
    exif: '50mm · f/1.4 · 1/320s · ISO 250',
    gridSpan: 'standard-editorial',
    aspect: 'portrait',
    theme: 'kebaya-wedding',
    imageUrl: '',
    isDemoArtwork: true,
  },
  {
    id: 'work-11',
    title: 'Senja Keemasan di Kebun Pinus Batu',
    category: 'Prewedding',
    location: 'Hutan Pinus & Lereng Arjuno, Kota Batu',
    description:
      'Permainan berkas cahaya matahari sore yang menembus pepohonan pinus, membingkai interaksi hangat pasangan dalam balutan busana Jawa kasual-elegan.',
    exif: '85mm · f/1.4 · 1/640s · ISO 100',
    gridSpan: 'standard-editorial',
    aspect: 'landscape',
    theme: 'bromo-prewedding',
    imageUrl: '',
    isDemoArtwork: true,
  },
  {
    id: 'work-12',
    title: 'Wibawa & Karakter — Executive Editorial Portrait',
    category: 'Portrait',
    location: 'Studio Galeri Malang',
    description:
      'Potret personal branding profesional dengan latar tekstur gelap dan kontrol bayangan presisi untuk kebutuhan profil eksekutif serta publikasi.',
    exif: '85mm · f/2.8 · 1/200s · ISO 100',
    gridSpan: 'standard-editorial',
    aspect: 'portrait',
    theme: 'velvet-portrait',
    imageUrl: '',
    isDemoArtwork: true,
  },
];
