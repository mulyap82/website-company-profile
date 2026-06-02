export interface MenuItem {
  id: string;
  name: string;
  category: 'all' | 'nasi-box' | 'snack-box' | 'tumpeng' | 'bolen' | 'brownies';
  description: string;
  price: number;
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  message: string;
  name: string;
  role: string;
  avatar: string;
}

export const menuItems: MenuItem[] = [
  // NASI BOX
  {
    id: 'nasi-box-paket-1',
    name: 'Nasi Box - Paket 1',
    category: 'nasi-box',
    description: 'Nasi Ayam / lele bakar / goreng, Sayur 1 macam Atau sambel + lalaban',
    price: 16000,
    image: '/src/assets/images/nasi_box_premium_1780046604005.png'
  },
  {
    id: 'nasi-box-paket-2',
    name: 'Nasi Box - Paket 2',
    category: 'nasi-box',
    description: 'Nasi Ayam bakar / goreng, Sambel lalab, Sayur 1 macam, Buah / krupuk',
    price: 18000,
    image: '/src/assets/images/nasi_box_premium_1780046604005.png'
  },
  {
    id: 'nasi-box-paket-3',
    name: 'Nasi Box - Paket 3',
    category: 'nasi-box',
    description: 'Nasi Ayam bakar / goreng, Sambel lalab, 2 macam sayur, krupuk + buah',
    price: 20000,
    image: '/src/assets/images/nasi_box_premium_1780046604005.png'
  },
  {
    id: 'nasi-box-paket-4',
    name: 'Nasi Box - Paket 4',
    category: 'nasi-box',
    description: 'Nasi Rendang daging / ayam kampung, Sambel goreng kentang, capcay, Krupuk, Buah, Alat mkn',
    price: 30000,
    image: '/src/assets/images/nasi_box_premium_1780046604005.png'
  },
  
  // SNACK BOX
  {
    id: 'snack-box-paket-1',
    name: 'Snack Box - Paket 1',
    category: 'snack-box',
    description: 'Bolu, Puding / arem²',
    price: 5500,
    image: '/src/assets/images/snack_box_premium_1780047171046.png'
  },
  {
    id: 'snack-box-paket-2',
    name: 'Snack Box - Paket 2',
    category: 'snack-box',
    description: 'Bolu, Risol mayo, Kacang',
    price: 7500,
    image: '/src/assets/images/snack_box_premium_1780047171046.png'
  },
  {
    id: 'snack-box-paket-3',
    name: 'Snack Box - Paket 3',
    category: 'snack-box',
    description: 'Arem² / puding, Risol mayo / martabak, Bolen',
    price: 8500,
    image: '/src/assets/images/snack_box_premium_1780047171046.png'
  },
  {
    id: 'snack-box-paket-4',
    name: 'Snack Box - Paket 4',
    category: 'snack-box',
    description: 'Bolen / sus premium, Arem², Risol mayo / martabak, Kacang / permen / puding',
    price: 10000,
    image: '/src/assets/images/snack_box_premium_1780047171046.png'
  },

  // TUMPENG
  {
    id: 'tumpeng-1',
    name: 'Tumpeng 1 (7-10 org)',
    category: 'tumpeng',
    description: 'Nasi kuning, Ayam goreng, Telor balado, Mie goreng, Orek tempe',
    price: 150000,
    image: '/src/assets/images/tumpeng_premium_1780047606685.png'
  },
  {
    id: 'tumpeng-2',
    name: 'Tumpeng 2 (15-20 org)',
    category: 'tumpeng',
    description: 'Nasi kuning, Ayam goreng, Telor balado, Mie goreng, Orek tempe, Pekedel kentang, Krupuk',
    price: 300000,
    image: '/src/assets/images/tumpeng_premium_1780047606685.png'
  },

  // BOLEN
  {
    id: 'bolen-6',
    name: 'Bolen Isi 6',
    category: 'bolen',
    description: 'Bolen Pisang isi Coklat / Keju isi 6',
    price: 20000,
    image: '/src/assets/images/pisang_bolen_premium_1780047705173.png'
  },
  {
    id: 'bolen-6-mix',
    name: 'Bolen Isi 6 (Mix)',
    category: 'bolen',
    description: 'Bolen Pisang mix isi coklat keju isi 6',
    price: 23000,
    image: '/src/assets/images/pisang_bolen_premium_1780047705173.png'
  },
  {
    id: 'bolen-8',
    name: 'Bolen Isi 8',
    category: 'bolen',
    description: 'Bolen Pisang isi Coklat / Keju isi 8',
    price: 27000,
    image: '/src/assets/images/pisang_bolen_premium_1780047705173.png'
  },
  {
    id: 'bolen-8-mix',
    name: 'Bolen Isi 8 (Mix)',
    category: 'bolen',
    description: 'Bolen Pisang mix isi coklat keju isi 8',
    price: 30000,
    image: '/src/assets/images/pisang_bolen_premium_1780047705173.png'
  },

  // FUDGY BROWNIES
  {
    id: 'brownies-20x20',
    name: 'Fudgy Brownies (20 x 20)',
    category: 'brownies',
    description: 'Fudgy brownies ukuran 20x20 cm',
    price: 65000,
    image: '/src/assets/images/fudgy_brownies_premium_1780047856744.png'
  },
  {
    id: 'brownies-10x20',
    name: 'Fudgy Brownies (10 x 20)',
    category: 'brownies',
    description: 'Fudgy brownies ukuran 10x20 cm',
    price: 35000,
    image: '/src/assets/images/fudgy_brownies_premium_1780047856744.png'
  }
];

export const services: ServiceItem[] = [
  {
    id: 'katering',
    title: 'Katering',
    description: 'Layanan catering profesional dengan hidangan berkualitas untuk mendukung kelancaran berbagai acara Anda.',
    image: '/src/assets/images/nasi_box_premium_1780046604005.png'
  },
  {
    id: 'ulang-tahun',
    title: 'Ulang tahun',
    description: 'Rayakan momen ulang tahun dengan sajian lezat dan pelayanan terbaik yang membuat hari spesial semakin berkesan.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'pernikahan',
    title: 'Pernikahan',
    description: 'Hadirkan pengalaman pernikahan yang tak terlupakan dengan hidangan istimewa dan layanan yang elegan.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'acara-lainnya',
    title: 'Acara Lainnya',
    description: 'Mendukung berbagai jenis acara dengan pilihan menu fleksibel dan pelayanan yang dapat disesuaikan dengan kebutuhan.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600&auto=format&fit=crop'
  }
];

export const testimonials: TestimonialItem[] = [
  {
    id: 'tirta',
    quote: 'Makanan nya Enak',
    message: 'Makanannya enak banget dan porsinya pas. Saya pesan untuk acara kantor, semuanya puas. Pasti order lagi!',
    name: 'Dr Tirta',
    role: 'Rumah Sakit Orthopaedi Purwokerto',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=120&auto=format&fit=crop'
  },
  {
    id: 'gembul',
    quote: 'Mantap Banget',
    message: 'Snack box-nya rapi dan rasanya lezat. Cocok banget untuk acara keluarga, praktis dan tidak mengecewakan.',
    name: 'Guru Gembul',
    role: 'SDIT Al Irsyad Al Islamiyyah Purwokerto',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop'
  },
  {
    id: 'jannah',
    quote: 'Pelayanannya Terbaik',
    message: 'Pelayanannya cepat dan profesional. Catering dari Dapure Cakra benar-benar membantu acara saya jadi lebih lancar.',
    name: 'Muhammad Jannah (Bigmo)',
    role: 'Mahasiswa Universitas Jendral Soedirman',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop'
  }
];
