import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Star, CreditCard, Compass, ChevronRight, Sparkles, Send, Shield, Info, ArrowRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Subcomponents import
import Header from './components/Header';
import DashboardCategories from './components/DashboardCategories';
import BookingModal from './components/BookingModal';
import InteractiveMap from './components/InteractiveMap';
import ContactForm from './components/ContactForm';
import ScrollReveal from './components/ScrollReveal';

// Types and mock data
import { INITIAL_STAYS, INITIAL_ATTRACTIONS, MOCK_REVIEWS, Stay, Attraction } from './types';

export default function App() {
  // Global States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All'); // 'All', 'Villa', 'Hotel', etc.
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isPromoClaimed, setIsPromoClaimed] = useState(false);
  const [showPromoToast, setShowPromoToast] = useState(false);
  const [hoveredStayId, setHoveredStayId] = useState<string | null>(null);
  const [likedStayIds, setLikedStayIds] = useState<string[]>([]);

  // Search input specifically for the middle discovery bar
  const [filterSearch, setFilterSearch] = useState('');

  // Handle category triggers from both dashboard icons and middle tabs
  const handleSelectCategory = (categoryId: string) => {
    if (categoryId === 'voucher-promo') {
      // scroll straight down to promo coupon section
      document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' });
    } else if (categoryId === 'attractions-promo') {
      document.getElementById('discover')?.scrollIntoView({ behavior: 'smooth' });
    } else if (categoryId === 'big-deal-promo') {
      // Apply budget filter: stays <= $400
      setActiveCategory('BIG DEAL');
    } else {
      setActiveCategory(categoryId);
    }
  };

  // Like Toggle Function
  const toggleLikeStay = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedStayIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Filter Stays dynamically based on Search and Selected Tab Categories
  const filteredStays = useMemo(() => {
    return INITIAL_STAYS.filter(stay => {
      // Search matching location, type, or title
      const matchesSearch = 
        stay.title.toLowerCase().includes(filterSearch.toLowerCase()) || 
        stay.location.toLowerCase().includes(filterSearch.toLowerCase()) || 
        stay.type.toLowerCase().includes(filterSearch.toLowerCase());

      // Category matching
      if (activeCategory === 'All') return matchesSearch;
      if (activeCategory === 'BIG DEAL') {
        // limit stays to those less than or equal to $400
        return matchesSearch && stay.price <= 400;
      }
      return matchesSearch && stay.type === activeCategory;
    });
  }, [filterSearch, activeCategory]);

  const handleClaimPromo = () => {
    setIsPromoClaimed(true);
    setShowPromoToast(true);
    setTimeout(() => {
      setShowPromoToast(false);
    }, 4500);
  };

  const handleBookNow = (stay: Stay) => {
    setSelectedStay(stay);
    setIsBookingModalOpen(true);
  };

  const userEmail = 'rionxee@gmail.com';

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-gray-900 font-sans selection:bg-blue-500 selection:text-white pb-0">
      
      {/* 1. Header Navigation Bar */}
      <Header 
        userEmail={userEmail} 
        onOpenContact={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
      />

      {/* 2. Hero Component Area */}
      <section className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28">
        
        {/* Curved gradient backdrop representing Bali travel luxury */}
        <div className="absolute inset-x-0 top-0 -z-30 h-[520px] w-full bg-gradient-to-b from-blue-50/70 via-indigo-50/40 to-white" />
        
        {/* Circle mesh backdrop decorations */}
        <div className="absolute top-20 left-12 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl -z-20" />
        <div className="absolute top-40 right-16 h-80 w-80 rounded-full bg-emerald-100/20 blur-3xl -z-20" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-600 border border-blue-100/50"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Satu Platform untuk Seluruh Liburan Anda</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl"
            >
              Enjoy your journey <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
                without limits
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto"
            >
              Find accommodations and exciting experiences. Temukan vila premium, hotel resort, dan paket tour terbaik dalam hitungan detik.
            </motion.p>
          </div>

          {/* Overlapping Search Banner Section strictly matching visual reference */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mx-auto max-w-2xl mt-11"
          >
            <div className="rounded-3xl bg-white p-3.5 shadow-premium border border-gray-100/60 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full pl-3 flex items-center gap-2">
                <Search className="h-5 w-5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Stays to Bali... (Cari Seminyak, Canggu, Ubud, dll)"
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                  className="w-full text-sm font-medium text-gray-900 placeholder:text-gray-400 bg-transparent py-2.5 focus:outline-none focus:ring-0"
                />
              </div>

              {/* Quick Preset Location Search pills inside the bar */}
              <div className="hidden lg:flex items-center gap-1.5 mr-2 shrink-0">
                <button 
                  onClick={() => setFilterSearch('Seminyak')} 
                  className="text-[10px] font-bold px-2 px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 hover:text-blue-600 cursor-pointer"
                >
                  Seminyak
                </button>
                <button 
                  onClick={() => setFilterSearch('Ubud')} 
                  className="text-[10px] font-bold px-2 px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 hover:text-blue-600 cursor-pointer"
                >
                  Ubud
                </button>
              </div>

              <button
                onClick={() => {
                  document.getElementById('accommodations')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto h-11 px-7 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black tracking-wide shadow-md shadow-blue-250 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Search</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. Horizontal Multi-Category Dashboard strictly matching reference layout */}
      <ScrollReveal delay={0.1}>
        <DashboardCategories 
          activeCategory={activeCategory} 
          onSelectCategory={handleSelectCategory} 
        />
      </ScrollReveal>

      {/* 4. Middle Section Listing Discover Container */}
      <main id="accommodations" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">
        
        {/* Core title headers matching Reference Image */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">Top-Rated Getaways</span>
            <h2 className="text-2xl sm:text-3.5xl font-extrabold text-gray-900 mt-1 max-w-xl leading-snug">
              Discover the most-loved stays handpicked just for you!
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400">Total Filtered:</span>
            <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
              {filteredStays.length} Stays Available
            </span>
          </div>
        </div>

        {/* Dynamic Search / Custom Tab Filter Row exactly like mockup elements */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
            
            {/* Minimal left side search inside filter bar */}
            <div className="relative w-full sm:w-72">
              <span className="absolute left-3.5 top-2.5 text-gray-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                placeholder="Cari lokasi spesifik..."
                className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-4 text-xs font-medium text-gray-900 focus:outline-none focus:border-blue-500"
              />
              {filterSearch && (
                <button 
                  onClick={() => setFilterSearch('')} 
                  className="absolute right-3 top-2 text-xs font-bold text-gray-400 hover:text-gray-900"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Right side tab selectors matching: All, Villa, Apartment, Guesthouse, Hotel */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              
              {/* Filter custom action button */}
              <button
                onClick={() => {
                  setFilterSearch('');
                  setActiveCategory('All');
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 text-blue-700 px-3 py-1.5 text-xs font-bold hover:bg-blue-100/65 cursor-pointer"
              >
                <SlidersHorizontal className="h-3 w-3" />
                <span>Reset Filter</span>
              </button>

              {['All', 'Villa', 'Hotel', 'Apartment', 'Guesthouse'].map((type) => {
                const isActive = activeCategory === type;
                return (
                  <button
                    key={type}
                    onClick={() => setActiveCategory(type)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gray-900 text-white font-extrabold shadow-sm'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100/80 hover:text-gray-900'
                    }`}
                  >
                    {type === 'All' ? 'Lihat Semua' : type}
                  </button>
                );
              })}
            </div>

          </div>
        </ScrollReveal>

        {/* 5. Special Offers coupons grid (matching layout banners on reference image) */}
        <section id="offers">
          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              
              {/* Promo Gift Card 1 */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-650 p-6 sm:p-8 text-white shadow-lg border border-blue-400/20 flex flex-col justify-between group">
                <div className="absolute top-0 right-0 h-32 w-32 bg-white/5 rounded-bl-[100px]" />
                <div className="space-y-4 max-w-md">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                    <span>% Promo Akhir Pekan</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">Get 30% Off!</h3>
                  <p className="text-xs sm:text-sm text-blue-50 opacity-90 leading-relaxed">
                    Enjoy a 30% discount on your next stay in Bali, Seminyak. Don't miss out — limited time offer!
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-semibold bg-white/10 px-2.5 py-1 rounded-lg">Kupon: STAY30</span>
                  <button
                    onClick={handleClaimPromo}
                    disabled={isPromoClaimed}
                    className="rounded-2xl bg-white hover:bg-blue-50 text-blue-600 font-extrabold text-xs px-6 py-2.5 shadow-md shadow-white/5 transition-all cursor-pointer shrink-0 disabled:bg-white/80"
                  >
                    {isPromoClaimed ? '✓ Terklaim' : 'Claim'}
                  </button>
                </div>
              </div>

              {/* Promo Gift Card 2 */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-650 p-6 sm:p-8 text-white shadow-lg border border-emerald-400/20 flex flex-col justify-between group">
                <div className="absolute top-0 right-0 h-32 w-32 bg-white/5 rounded-bl-[100px]" />
                <div className="space-y-4 max-w-md">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                    <span>★ Hot Deals</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight">Get 30% Off for Hotel!</h3>
                  <p className="text-xs sm:text-sm text-emerald-50 opacity-90 leading-relaxed">
                    Enjoy a 30% discount on your next luxury resort hotel stay in Bali. Treat yourself to world-class service.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-semibold bg-white/10 px-2.5 py-1 rounded-lg">Kupon: HOTEL30</span>
                  <button
                    onClick={handleClaimPromo}
                    disabled={isPromoClaimed}
                    className="rounded-2xl bg-white hover:bg-emerald-50 text-emerald-600 font-extrabold text-xs px-6 py-2.5 shadow-md shadow-white/5 transition-all cursor-pointer shrink-0 disabled:bg-white/80"
                  >
                    {isPromoClaimed ? '✓ Terklaim' : 'Claim'}
                  </button>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </section>

        {/* 6. Accommodations Listing Grid */}
        <section className="space-y-8">
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredStays.length > 0 ? (
                filteredStays.map((stay, idx) => {
                  const isHovered = stay.id === hoveredStayId;
                  const isLiked = likedStayIds.includes(stay.id);

                  return (
                    <motion.div
                      key={stay.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05, duration: 0.5 }}
                      className="group flex flex-col overflow-hidden rounded-3xl border border-gray-150 bg-white shadow-premium shadow-hover"
                      onMouseEnter={() => setHoveredStayId(stay.id)}
                      onMouseLeave={() => setHoveredStayId(null)}
                    >
                      {/* Image Preview Container with badges indicators */}
                      <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
                        <img
                          src={stay.image}
                          alt={stay.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* Upper left Type badge */}
                        <span className="absolute top-3 left-3 rounded-xl bg-white/90 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-widest text-blue-600 px-3 py-1 border border-blue-50 shadow-sm">
                          {stay.type}
                        </span>

                        {/* Upper Right Quick Like heart */}
                        <button
                          onClick={(e) => toggleLikeStay(stay.id, e)}
                          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm text-gray-500 hover:text-red-500 hover:scale-105 transition-all cursor-pointer"
                        >
                          <Heart className={`h-4.5 w-4.5 ${isLiked ? 'text-red-500 fill-red-500' : ''}`} />
                        </button>

                        {/* Price Tag directly floating for emphasis */}
                        <div className="absolute bottom-3 right-3 rounded-full bg-gray-950/80 backdrop-blur-sm text-white px-2.5 py-1 text-[11px] font-mono font-bold">
                          ${stay.price}/Night
                        </div>
                      </div>

                      {/* Info & Billing description */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
                        <div className="space-y-1.5">
                          {/* Rating and Reviews representation */}
                          <div className="flex items-center gap-1">
                            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-xs font-bold text-gray-800">{stay.rating}</span>
                            <span className="text-[10px] text-gray-400 font-medium">({stay.reviewsCount} Reviews)</span>
                          </div>

                          {/* Dynamic Property titles */}
                          <h4 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                            {stay.title}
                          </h4>
                          
                          {/* Location line */}
                          <p className="text-[11px] text-gray-500">{stay.location}</p>
                        </div>

                        {/* Starting fees and Book Button */}
                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                          <div>
                            <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">Mulai Dari</span>
                            <span className="text-xs font-black text-gray-900 font-mono">${stay.price}<span className="text-[9px] text-gray-400 font-normal font-sans">/Malam</span></span>
                          </div>
                          
                          <button
                            onClick={() => handleBookNow(stay)}
                            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-4 py-2 transition-all cursor-pointer shadow-sm"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-4 py-16 text-center space-y-3 bg-gray-50 rounded-3xl p-6 border border-dashed border-gray-200">
                  <span className="text-3xl">🏜️</span>
                  <h4 className="text-sm font-bold text-gray-800">Akomodasi Tidak Ditemukan</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">Kami tidak dapat menemukan properti untuk kata kunci "{filterSearch}" di kategori "{activeCategory}". Coba bersihkan filter pencarian.</p>
                  <button
                    onClick={() => {
                      setFilterSearch('');
                      setActiveCategory('All');
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow"
                  >
                    Reset Filter Pencarian
                  </button>
                </div>
              )}
            </div>
          </AnimatePresence>
        </section>

        {/* 7. Maps Landmarks Area (strictly matching visual placement on layout) */}
        <section id="destinations" className="space-y-4 pt-10">
          <div className="text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Peta Jangkauan</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">Eksplorasi Bali Melalui Peta Interaktif</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">Lihat lokasi properti kami yang tersebar di wilayah pesisir Seminyak, peternakan kopi Ubud, tebing curam Nusa Penida, hingga habitat lumba-lumba Lovina.</p>
          </div>

          <ScrollReveal delay={0.1}>
            <InteractiveMap 
              stays={INITIAL_STAYS} 
              onSelectStay={handleBookNow} 
              hoveredStayId={hoveredStayId} 
            />
          </ScrollReveal>
        </section>

        {/* 8. Attractions explorer section ("Every Traveler" matching footer-mid in reference image) */}
        <section id="discover" className="space-y-6 pt-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Travel Inspirations</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">Saran Liburan Berdasarkan Ketertarikan</h3>
            </div>
            
            <a href="#contact" className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5">
              <span>Konsultasi Rencana Perjalanan Gratis</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_ATTRACTIONS.map((attr, index) => (
              <ScrollReveal key={attr.id} delay={index * 0.1}>
                <div className="group relative overflow-hidden rounded-3xl h-64 shadow-premium shadow-hover transition-all">
                  
                  {/* Backdrop Overlay Image */}
                  <div className="absolute inset-0 bg-gray-900/50 group-hover:bg-gray-900/40 transition-colors z-10" />
                  <img
                    src={attr.image}
                    alt={attr.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info blocks */}
                  <div className="absolute inset-x-0 bottom-0 p-5 z-20 text-white space-y-2 text-left">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-white/20 text-[9px] font-extrabold uppercase tracking-widest backdrop-blur-md">
                      {attr.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold tracking-tight">
                      {attr.title}
                    </h4>
                    <p className="text-[10px] text-white/85 line-clamp-2">
                      {attr.description}
                    </p>
                    
                    <button 
                      onClick={() => alert(`Informasi Rinci tentang '${attr.title}' dapat diakses setelah melakukan registrasi akun.`)}
                      className="text-[10px] font-semibold text-blue-300 group-hover:text-white flex items-center gap-1 pt-1 underline shrink-0 cursor-pointer"
                    >
                      <span>Explore</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* 9. Testimonial Reviews & Frequently Asked Questions */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10">
          
          {/* Left Area: Dynamic review sliders */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Testimoni Terbaik</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">Apa Kata Mereka Tentang Kami?</h3>
            </div>

            <div className="space-y-4 text-left">
              {MOCK_REVIEWS.map((review) => (
                <div key={review.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-800">{review.name}</span>
                    <div className="flex text-amber-500">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-650 text-gray-500 font-medium leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Area: Minimalist Travel Insurance & Security Badges */}
          <div className="bg-blue-50/50 rounded-3xl border border-blue-105 border-blue-100 p-6.5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Garansi & Keamanan</span>
              <h3 className="text-xl font-extrabold text-gray-900 mt-1">Mengapa Memesan Melalui Stayly?</h3>
              
              <ul className="mt-5 space-y-3.5 text-xs text-gray-700 font-medium text-left">
                <li className="flex gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0">✓</div>
                  <p><span className="font-extrabold text-gray-900">Garansi Harga Terbaik</span> — Jika Anda menemukan tarif yang lebih murah di platform lain, kami akan menyamakannya.</p>
                </li>
                <li className="flex gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0">✓</div>
                  <p><span className="font-extrabold text-gray-900">Pembatalan Fleksibel</span> — Batalkan gratis tanpa potongan biaya administrasi hingga 24 jam sebelum kedatangan.</p>
                </li>
                <li className="flex gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0">✓</div>
                  <p><span className="font-extrabold text-gray-900">Perjanjian Terverifikasi</span> — Seluruh inventori properti diperiksa secara fisik secara berkala oleh tim Stayly local.</p>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-blue-100 flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600 shrink-0" />
              <div className="text-left text-[11px] text-gray-500 font-medium">
                Asuransi perjalanan didukung oleh <span className="font-bold text-gray-700">StaylyCare™ Security Policy</span>. Dilindungi hukum perlindungan konsumen nasional.
              </div>
            </div>
          </div>

        </section>

        {/* 10. Contact Us & Consultation anchor Section */}
        <section id="contact" className="pt-10 scroll-mt-24">
          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Context side */}
              <div className="lg:col-span-4 text-left space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Free Consultation</span>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight mt-1">Mari Wujudkan Liburan Impian Anda!</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  Tidak memiliki waktu luang untuk mengatur agenda dan mencari properti terbaik? Serahkan kepada Travel Planner ahli kami. Isi kontak form di samping dan dapatkan rekomendasi terbaik.
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <h5 className="text-xs font-bold text-gray-700">Rapat & Event Khusus?</h5>
                  <p className="text-[11px] text-gray-500">Kami juga menangani penyewaan seluruh resort untuk konferensi perusahaan, gala dinner pernikahan, hingga retret komunitas.</p>
                </div>
              </div>

              {/* Form side */}
              <div className="lg:col-span-8">
                <ContactForm />
              </div>

            </div>
          </ScrollReveal>
        </section>

      </main>

      {/* 11. Footer section area strictly structured and tidy */}
      <footer id="about" className="bg-[#111827] text-gray-400 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-800 pb-12">
            
            {/* Branding Column */}
            <div className="space-y-4 text-left">
              <a href="#" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">S</div>
                <span className="text-lg font-extrabold text-white tracking-tight">Stayly</span>
              </a>
              <p className="text-xs text-gray-500 leading-relaxed">
                Platform reservasi akomodasi premium terkemuka di Bali dan sekitarnya. Kenyamanan tanpa batas, pelayanan kelas dunia terjamin.
              </p>
            </div>

            {/* Destinations Links */}
            <div className="text-left">
              <h5 className="text-xs font-black uppercase text-white tracking-widest mb-4">Destinasi Populer</h5>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li><button onClick={() => setFilterSearch('Seminyak')} className="hover:text-blue-500 cursor-pointer block">Coastal Life Seminyak</button></li>
                <li><button onClick={() => setFilterSearch('Ubud')} className="hover:text-blue-500 cursor-pointer block">Green Terraced Ubud</button></li>
                <li><button onClick={() => setFilterSearch('Amed')} className="hover:text-blue-500 cursor-pointer block">Beachside Sunset Amed</button></li>
                <li><button onClick={() => setFilterSearch('Sanur')} className="hover:text-blue-500 cursor-pointer block">Premium Island Sanur</button></li>
              </ul>
            </div>

            {/* Company Infos Links */}
            <div className="text-left">
              <h5 className="text-xs font-black uppercase text-white tracking-widest mb-4">Informasi Stayly</h5>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#accommodations" className="hover:text-blue-500">Cari Akomodasi</a></li>
                <li><a href="#offers" className="hover:text-blue-500">Katalog Promo Khusus</a></li>
                <li><a href="#contact" className="hover:text-blue-500">Karir & Kemitraan Owner</a></li>
                <li><a href="#contact" className="hover:text-blue-500">Pusat Bantuan Support</a></li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="text-left space-y-3">
              <h5 className="text-xs font-black uppercase text-white tracking-widest">Langganan Newsletter</h5>
              <p className="text-xs text-gray-500">Dapatkan notifikasi diskon flash stay 50% setiap bulan ke email Anda.</p>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                alert('Terima kasih! Alamat email Anda berhasil terdaftar ke newsletter Stayly.');
              }} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  className="bg-gray-850 hover:bg-gray-800 focus:bg-gray-800 rounded-xl px-2.5 py-1.5 text-xs font-medium text-white placeholder-gray-500 focus:outline-none border border-gray-800 flex-1"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-colors"
                >
                  Daftar
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Bar Footer info */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <p className="font-medium">© 2026 Stayly Booking Platform Inc. Seluruh Hak Cipta Dilindungi.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-400">Syarat Penggunaan</a>
              <a href="#" className="hover:text-gray-400">Kebijakan Privasi</a>
              <a href="#" className="hover:text-gray-400">Keamanan Data</a>
            </div>
          </div>

        </div>
      </footer>

      {/* 12. Floating Claimable Coupon Code Toast Notification */}
      <AnimatePresence>
        {showPromoToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 left-6 z-50 rounded-2xl bg-emerald-600 p-4 text-white shadow-2xl max-w-sm border border-emerald-500"
          >
            <div className="flex gap-3">
              <div className="h-9 w-9 bg-white/20 rounded-xl flex items-center justify-center font-bold shrink-0">🎁</div>
              <div className="text-left text-xs">
                <p className="font-black">Berhasil Mengklaim Promo!</p>
                <p className="opacity-95 leading-normal mt-0.5">Kupon <span className="font-mono font-black underline">SAVESTAY30</span> dengan diskon 30% telah ditautkan ke gawai Anda dan akan otomatis diterapkan pada transaksi kamar selanjutnya.</p>
                <button
                  onClick={() => {
                    document.getElementById('accommodations')?.scrollIntoView({ behavior: 'smooth' });
                    setShowPromoToast(false);
                  }}
                  className="mt-2 inline-block font-extrabold text-[10px] bg-white text-emerald-700 px-3 py-1.5 rounded-lg active:scale-95 transition-all text-center cursor-pointer"
                >
                  Pilih Hotel & Gunakan Sekarang →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Form Overlay Modal wrapper */}
      <BookingModal
        stay={selectedStay}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        claimedPromotion={isPromoClaimed}
      />

    </div>
  );
}
