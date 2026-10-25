import { PlateTheme } from '../utils/editorialPlateGenerator';

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  sessionType: string;
  location: string;
  isDemoPlaceholder: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BtsItem {
  id: string;
  title: string;
  stage: string;
  description: string;
  equipmentNote: string;
  theme: PlateTheme;
  aspect: 'portrait' | 'landscape' | 'square';
  imageUrl?: string;
}

export const siteConfig = {
  brand: {
    name: 'ZIDNAS STUDIO — JASA FOTO & SEWA KEBAYA',
    shortName: 'ZIDNAS STUDIO',
    monogram: 'ZS',
    taglineEn: 'Every Frame Holds a Story. Every Story Holds a Soul.',
    taglineId: 'Jasa Foto & Sewa Kebaya · Merangkai Cerita, Mengabadikan Rasa.',
    location: 'Malang, Jawa Timur, Indonesia',
    serviceAreas: [
      'Kota Malang',
      'Kota Batu',
      'Taman Nasional Bromo Tengger Semeru',
      'Surabaya',
      'Seluruh Jawa Timur & Bali (By Request)',
    ],
    isDemoConfig: true,
  },

  hero: {
    kicker: 'ZIDNAS STUDIO · JASA FOTO & SEWA KEBAYA MALANG',
    title: 'Memories, Framed in Elegance.',
    subtitle:
      'Layanan jasa fotografi profesional dan sewa kebaya eksklusif untuk pernikahan, prewedding, wisuda, portrait, keluarga, dan produk di Malang.',
    primaryCta: 'Jelajahi Karya Kami',
    secondaryCta: 'Diskusikan Proyek',
  },

  contact: {
    // Ubah nomor WhatsApp bisnis dengan format kode negara tanpa tanda + (contoh: '6281234567890')
    whatsappNumber: '6281234567890',
    whatsappDisplay: '+62 812-3456-7890 (Konfigurasi Demo)',
    email: 'studio@zidnasstudio.id',
    studioAddress:
      'Kawasan Heritage Ijen Boulevard, Klojen, Kota Malang, Jawa Timur',
    operationalHours: 'Senin – Sabtu · 09.00 – 18.00 WIB (Sesi Berdasarkan Janji Temu)',
    socials: {
      instagram: 'https://instagram.com',
      behance: 'https://behance.net',
      pinterest: 'https://pinterest.com',
    },
  },

  about: {
    heading: 'Photography with Purpose and Feeling.',
    subheading: 'Perpaduan Keanggunan Kebaya Jawa dan Pendekatan Fotografi Editorial Modern',
    photographerName: 'ZIDNAS STUDIO & Tim Kreatif (Profil Demo — Dapat Diedit)',
    role: 'Principal Photographer & Kebaya Styling Director',
    operatingSince: 'Konfigurasi Tahun Berdiri (Contoh: 2019)',
    specialization:
      'Jasa Fotografi Profesional, Sewa Kebaya Eksklusif, Wedding, Prewedding & Portrait',
    imageUrl: '', // Kosongkan untuk memakai pelat visual default atau isi URL foto tim
    storyParagraphs: [
      'Berangkat dari kecintaan terhadap permainan cahaya alami dan kekayaan estetika busana adat Jawa, ZIDNAS STUDIO hadir di Kota Malang menyediakan layanan terpadu Jasa Foto & Sewa Kebaya untuk menghadirkan karya visual yang tenang, matang, dan bernyawa.',
      'Kami memandang setiap sesi pemotretan bukan sekadar rutinitas dokumentasi, melainkan kolaborasi artistik. Dari kurasi koleksi kebaya beludru bersulam benang emas hingga tatapan hangat di antara anggota keluarga, kami berfokus pada komposisi yang tak lekang oleh waktu.',
    ],
    philosophyPillars: [
      {
        number: '01',
        title: 'Cahaya & Kedalaman Ruang',
        description:
          'Mengolah pencahayaan terarah yang menonjolkan dimensi wajah, tekstur kain kebaya, dan atmosfer lokasi secara sinematik.',
      },
      {
        number: '02',
        title: 'Keanggunan Kontemporer',
        description:
          'Menghadirkan identitas visual Nusantara yang bersih, modern, dan relevan dengan standar majalah fotografi editorial.',
      },
      {
        number: '03',
        title: 'Pendekatan Personal',
        description:
          'Membangun suasana sesi foto yang rileks dan terarah agar ekspresi emosional terekam secara jujur tanpa terlihat kaku.',
      },
    ],
  },

  editorialSection: {
    kicker: 'THE ART OF CAPTURING MOMENTS',
    title: 'Bukan Sekadar Foto. Sebuah Cerita.',
    body: 'Kami percaya bahwa foto terbaik tidak hanya menangkap apa yang terlihat, tetapi juga menyimpan perasaan di balik sebuah momen. Melalui permainan cahaya, komposisi, dan pendekatan yang personal, setiap sesi dirancang menjadi pengalaman yang berkesan.',
    studies: [
      {
        id: 'study-velvet',
        label: 'Tekstur Kebaya & Sulaman Emas',
        caption:
          'Pencahayaan miring (directional side-lighting) untuk menjaga detail serat beludru maroon dan kilau payet emas tetap berdimensi.',
        exif: '90mm Macro · f/2.8 · ISO 100',
        theme: 'batik-macro' as PlateTheme,
      },
      {
        id: 'study-portrait',
        label: 'Chiaroscuro & Emosi Wajah',
        caption:
          'Kontras bayangan lembut yang membingkai ekspresi tenang, menghadirkan keteduhan potret klasik.',
        exif: '85mm Prime · f/1.4 · ISO 160',
        theme: 'velvet-portrait' as PlateTheme,
      },
      {
        id: 'study-landscape',
        label: 'Atmosfer Alam Malang & Bromo',
        caption:
          'Memadukan kabut pagi dataran tinggi Jawa Timur dengan siluet busana adat yang anggun.',
        exif: '35mm Editorial · f/2.0 · ISO 200',
        theme: 'bromo-prewedding' as PlateTheme,
      },
    ],
  },

  scrollStory: {
    kicker: 'SIGNATURE EXPERIENCE · FROM MOMENT TO MEMORY',
    title: 'Perjalanan Visual dari Sekilas Tatapan Menjadi Warisan Abadi',
    chapters: [
      {
        step: '01',
        phase: 'THE FLEETING GLANCE',
        title: 'Hening Sebelum Kamera Menyapa',
        narrative:
          'Di dalam ruang bercahaya redup, setiap cerita dimulai dari ketenangan. Kami membaca karakter cahaya, garis wajah, dan suasana hati sebelum rana pertama ditekan.',
        bgHex: '#171518',
        textHex: '#F7F0E5',
        accentHex: '#C5A15A',
        theme: 'camera-craft' as PlateTheme,
        caption: 'Tahap 01 · Observasi Cahaya & Mood di Studio Malang',
      },
      {
        step: '02',
        phase: 'THE VELVET & SOUL',
        title: 'Keanggunan dalam Balutan Kebaya Maroon',
        narrative:
          'Warna merah marun kebaya dan sulaman emas menyatu dengan gestur yang jujur. Setiap lipatan kain dan sentuhan tangan memiliki ritme visualnya sendiri.',
        bgHex: '#651B32',
        textHex: '#F7F0E5',
        accentHex: '#C5A15A',
        theme: 'kebaya-wedding' as PlateTheme,
        caption: 'Tahap 02 · Harmoni Tekstur Busana Adat & Ekspresi Emosional',
      },
      {
        step: '03',
        phase: 'HERITAGE & FILIGREE',
        title: 'Detail Kecil yang Menyimpan Makna',
        narrative:
          'Dari motif batik kawung yang sarat filosofi hingga cincin pernikahan yang berkilau lembut—detail mikro mengikat keseluruhan narasi visual Anda.',
        bgHex: '#35251F',
        textHex: '#F7F0E5',
        accentHex: '#C5A15A',
        theme: 'batik-macro' as PlateTheme,
        caption: 'Tahap 03 · Dokumentasi Detail Artistik & Simbol Budaya',
      },
      {
        step: '04',
        phase: 'TIMELESS EXHIBITION',
        title: 'Terbingkai Abadi di Galeri Kenangan',
        narrative:
          'Ketika seluruh elemen berpadu pada latar gading yang bersih, momen sesaat bertransformasi menjadi karya fotografi yang siap diwariskan lintas generasi.',
        bgHex: '#F7F0E5',
        textHex: '#171518',
        accentHex: '#651B32',
        theme: 'velvet-portrait' as PlateTheme,
        caption: 'Tahap 04 · Kurasi Akhir & Penyajian Setara Galeri Editorial',
      },
    ],
  },

  behindTheScenes: [
    {
      id: 'bts-1',
      title: 'Penataan Cahaya & Moodboard Sesi',
      stage: '01 · Pra-Pemotretan',
      description:
        'Setiap sesi diawali dengan diskusi konsep, pemilihan palet warna busana, dan pengujian skema pencahayaan agar selaras dengan karakter klien.',
      equipmentNote: 'Medium Format Digital · Softbox Octa 120cm · Golden Reflector',
      theme: 'lighting-bts',
      aspect: 'portrait',
    },
    {
      id: 'bts-2',
      title: 'Presisi Lensa & Detail Busana Adat',
      stage: '02 · Eksekusi Artistik',
      description:
        'Perhatian khusus diberikan pada kerapian sanggul, jatuhnya kain jarik batik, serta sudut pengambilan gambar yang menonjolkan siluet terbaik.',
      equipmentNote: 'Prime Lens 50mm & 85mm f/1.2 · Tethering Monitor Kalibrasi',
      theme: 'camera-craft',
      aspect: 'landscape',
    },
    {
      id: 'bts-3',
      title: 'Direksi Pose yang Hangat & Natural',
      stage: '03 · Interaksi Klien',
      description:
        'Tidak perlu khawatir jika belum terbiasa di depan kamera. Tim kami memandu gestur secara santai melalui percakapan yang mengalir.',
      equipmentNote: 'Pendekatan Dokumenter & Editorial · Malang & Batu',
      theme: 'direction-bts',
      aspect: 'portrait',
    },
  ] as BtsItem[],

  testimonials: [
    {
      id: 'testi-1',
      quote:
        'Contoh kutipan testimoni klien: Pengalaman sesi foto prewedding dengan konsep kebaya klasik terasa sangat tenang dan terarah. Pencahayaannya membuat detail kain tampak begitu hidup.',
      clientName: 'Contoh Klien A (Placeholder Demo)',
      sessionType: 'Prewedding Heritage Session',
      location: 'Kota Malang',
      isDemoPlaceholder: true,
    },
    {
      id: 'testi-2',
      quote:
        'Contoh kutipan testimoni klien: Tim sangat sabar mengarahkan keluarga besar kami. Hasil warna fotonya hangat, elegan, dan tidak berlebihan.',
      clientName: 'Contoh Klien B (Placeholder Demo)',
      sessionType: 'Family & Graduation Portrait',
      location: 'Ijen Boulevard, Malang',
      isDemoPlaceholder: true,
    },
    {
      id: 'testi-3',
      quote:
        'Contoh kutipan testimoni klien: Dokumentasi katalog koleksi kain dan perhiasan kami terlihat jauh lebih berkelas untuk kebutuhan peluncuran brand.',
      clientName: 'Contoh Brand C (Placeholder Demo)',
      sessionType: 'Product & Commercial Editorial',
      location: 'Studio Malang',
      isDemoPlaceholder: true,
    },
  ] as TestimonialItem[],

  faqs: [
    {
      id: 'faq-1',
      question: 'Bagaimana cara melakukan booking sesi fotografi?',
      answer:
        'Anda dapat mengisi formulir konsultasi pada bagian Booking di website ini. Setelah formulir tervalidasi, sistem akan menyiapkan ringkasan pesan terformat yang langsung dapat Anda kirimkan ke WhatsApp resmi kami untuk pengecekan jadwal dan diskusi konsep.',
    },
    {
      id: 'faq-2',
      question: 'Apakah sesi foto dapat dilakukan di luar Kota Malang?',
      answer:
        'Ya, selain melayani pemotretan di Kota Malang dan Kota Batu, kami juga melayani sesi pemotretan di kawasan Bromo, Surabaya, hingga luar kota sesuai kesepakatan jadwal dan akomodasi perjalanan.',
    },
    {
      id: 'faq-3',
      question: 'Apakah pelanggan dapat mengajukan konsep atau referensi foto sendiri?',
      answer:
        'Tentu. Kami sangat terbuka terhadap referensi visual, moodboard, maupun cerita personal yang ingin Anda wujudkan. Tim kami akan membantu menyelaraskan konsep tersebut dengan pencahayaan dan lokasi yang tepat.',
    },
    {
      id: 'faq-4',
      question: 'Berapa lama proses kurasi dan editing foto?',
      answer:
        'Durasi pengerjaan pasca-produksi (seleksi, color grading editorial, dan retouching halus) menyesuaikan dengan jenis layanan serta jumlah foto yang disepakati pada saat pemesanan paket.',
    },
    {
      id: 'faq-5',
      question: 'Bagaimana cara memperoleh detail paket dan penawaran harga?',
      answer:
        'Karena setiap proyek memiliki kebutuhan durasi, lokasi, dan output yang berbeda, silakan hubungi kami melalui formulir konsultasi atau tombol WhatsApp untuk mendapatkan katalog penawaran terbaru yang sesuai dengan kebutuhan Anda.',
    },
  ] as FaqItem[],

  budgetRanges: [
    'Belum ditentukan (Ingin konsultasi paket terlebih dahulu)',
    'Sesi Personal / Portrait / Wisuda',
    'Sesi Prewedding / Couple Editorial',
    'Dokumentasi Pernikahan (Wedding Day)',
    'Fotografi Produk / Kampanye Komersial Brand',
    'Kebutuhan Kustom / Multi-Hari',
  ],
};
