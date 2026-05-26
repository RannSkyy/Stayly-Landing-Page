export interface Stay {
  id: string;
  title: string;
  type: 'Villa' | 'Hotel' | 'Apartment' | 'Guesthouse';
  image: string;
  rating: number;
  reviewsCount: string;
  location: string;
  price: number;
  featured?: boolean;
  latitude: number; // For custom interactive map (relative % positions)
  longitude: number; // For custom interactive map (relative % positions)
  description: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discount: number;
  title: string;
  description: string;
}

export interface Attraction {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export const INITIAL_STAYS: Stay[] = [
  {
    id: 'stay-1',
    title: 'Villa de Villaonteonte',
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: '1.2k',
    location: 'Seminyak, Bali',
    price: 500,
    featured: true,
    latitude: 35,
    longitude: 42,
    description: 'A lavish luxury villa hidden in the dense coconut groves of Seminyak. Featuring a private 15-meter infinity pool, state-of-the-art kitchen, and full-time butler service.'
  },
  {
    id: 'stay-2',
    title: 'Hotel Mama Lemon',
    type: 'Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: '2.1k',
    location: 'Canggu, Bali',
    price: 200,
    featured: true,
    latitude: 28,
    longitude: 48,
    description: 'Perfect blend of chic coastal living and historical Balinese aesthetics. Located a short walking distance from the Canggu Surf Club, features a superb rooftop sunset bar.'
  },
  {
    id: 'stay-3',
    title: 'Serenity Villa',
    type: 'Villa',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: '1.1k',
    location: 'Ubud, Bali',
    price: 400,
    featured: true,
    latitude: 45,
    longitude: 32,
    description: 'An architectural structural masterpiece nestled atop the green valleys of Ubud. Rest, breathe, and gaze at the lush terraced rice fields from your temperature-regulated glass bedroom.'
  },
  {
    id: 'stay-4',
    title: 'Bali Bliss Bungalow',
    type: 'Guesthouse',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: '1.7k',
    location: 'Amed, Bali',
    price: 320,
    latitude: 78,
    longitude: 25,
    description: 'A rustic yet highly luxurious absolute beachside wooden bungalow. Fall asleep to the crashing sounds of calm waves and awake to direct views of Mount Agung rising in the background.'
  },
  {
    id: 'stay-5',
    title: 'Sunset Haven',
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: '1k',
    location: 'Jimbaran, Bali',
    price: 258,
    latitude: 58,
    longitude: 72,
    description: 'An expansive premium loft-style coastal apartment situated directly above the cliffs of Jimbaran Bay. Known for the absolute best unhindered views of Balis legendary daily sunsets.'
  },
  {
    id: 'stay-6',
    title: 'Golden Sands',
    type: 'Apartment',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: '5k',
    location: 'Lovina, Bali',
    price: 428,
    latitude: 22,
    longitude: 65,
    description: 'A highly luxurious waterfront residence apartment suite designed with neoclassical layouts and premium marble furnishings. Direct coastal channel access for wild dolphin observation.'
  },
  {
    id: 'stay-7',
    title: 'Tropical Oasis Resort',
    type: 'Hotel',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: '2.2k',
    location: 'Sanur, Bali',
    price: 1260,
    latitude: 82,
    longitude: 55,
    description: 'The absolute pinnacle of luxury tropical resorts. Boasts high-contrast geometric salt pools, lush internal palm gardens, 6 premium Michelin star dining locations, and private helicopter landing strip.'
  }
];

export const INITIAL_ATTRACTIONS: Attraction[] = [
  {
    id: 'attr-1',
    title: "The Vibes of Bali's Best Beach Clubs",
    description: 'Experience the premium luxury sunset lifestyle at Seminyak and Canggu seashore hubs.',
    image: '/src/assets/images/bali_beach_club_1779721664189.png',
    category: 'Nightlife & Premium Relaxation'
  },
  {
    id: 'attr-2',
    title: 'Ocean Adventure in Nusa Penida',
    description: 'Snorkel and discover towering coastal cliffs, hidden turquoise lagoons, and giant manta rays.',
    image: '/src/assets/images/nusa_penida_adventure_1779721682757.png',
    category: 'Adventure & Marine Tour'
  },
  {
    id: 'attr-3',
    title: 'Traditional Temple Heritage & Rituals',
    description: 'Tour structural temples like Tanah Lot and Uluwatu while experiencing fire dances.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    category: 'Art, Culture & History'
  }
];

export const MOCK_REVIEWS = [
  { id: 1, name: 'Siti Rahma', rating: 5, comment: 'Sangat suka dengan Villa de Villaonteonte! Pelayanan ramah, pemandangan luar biasa, dan kolam renang sangat bersih. Definisinya liburan tanpa batas!' },
  { id: 2, name: 'Budi Santoso', rating: 5, comment: 'Proses klaim diskon 30% berjalan lancar. Sangat membantu saat check-in stay di Hotel Mama Lemon. Terima kasih Stayly!' },
  { id: 3, name: 'Aditya Perkasa', rating: 4, comment: 'Layanan web responsif sekali dipesan langsung dapet voucher dan kontak email. Sukses selalu buat Stayly.' }
];
