import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Users, CheckCircle, Percent, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Stay } from '../types';

interface BookingModalProps {
  stay: Stay | null;
  isOpen: boolean;
  onClose: () => void;
  claimedPromotion: boolean; // Pre-applied promo check
}

export default function BookingModal({ stay, isOpen, onClose, claimedPromotion }: BookingModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('2026-06-01');
  const [checkOut, setCheckOut] = useState('2026-06-05');
  const [guests, setGuests] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  
  // Dynamic stays nights calculations
  const getNights = () => {
    try {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return isNaN(diffDays) ? 1 : diffDays;
    } catch {
      return 1;
    }
  };

  const nights = getNights();

  useEffect(() => {
    if (isOpen) {
      // Pre-apply discount if they claimed a 30% coupon beforehand
      if (claimedPromotion) {
        setCoupon('SAVESTAY30');
        setDiscountApplied(true);
      } else {
        setCoupon('');
        setDiscountApplied(false);
      }
      setIsSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen, claimedPromotion]);

  if (!stay) return null;

  // Cost estimates
  const basePricePerNight = stay.price;
  const subtotal = basePricePerNight * nights;
  const discountRate = discountApplied ? 0.30 : 0.0;
  const discountAmount = subtotal * discountRate;
  const serviceFee = 25; // fixed service charge
  const localTax = Math.round((subtotal - discountAmount) * 0.1); // 10% tourist tax
  const totalCost = subtotal - discountAmount + serviceFee + localTax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === 'SAVESTAY30' || coupon.trim().toUpperCase() === 'STAY30' || coupon.trim().toUpperCase() === 'HOTEL30') {
      setDiscountApplied(true);
    } else {
      alert('Kode promo tidak valid. Coba gunakan SAVESTAY30 atau STAY30');
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Harap lengkapi seluruh field kontak terlebih dahulu');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Generate secure booking ticket number
      const randomTicket = 'STY-' + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(randomTicket);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl z-10 flex flex-col md:max-h-[85vh]"
          >
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4.5 bg-gray-50/50">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Secure Direct Booking</span>
                <h3 className="text-lg font-bold text-gray-900 mt-0.5">Reservasi Akomodasi</h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {!isSuccess ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Left Column: Form Info */}
                  <form onSubmit={handleSubmitBooking} className="md:col-span-7 space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 mb-3">1. Detail Tamu & Kontak</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">Nama Lengkap (Sesuai Identitas)</label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-2.5 text-gray-400"><User className="h-4 w-4" /></span>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="e.g. Rion Perkasa"
                              className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-10 pr-4 text-xs font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Email Aktif</label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="alamat@email.com"
                              className="w-full rounded-xl border border-gray-200 bg-white py-2 px-3.5 text-xs font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">No. WhatsApp</label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+62 812..."
                              className="w-full rounded-xl border border-gray-200 bg-white py-2 px-3.5 text-xs font-medium text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2 mb-3 mt-4">2. Durasi Menginap & Tamu</h4>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Check-In</label>
                            <div className="relative">
                              <span className="absolute left-3 top-2.5 text-gray-400"><Calendar className="h-4 w-4" /></span>
                              <input
                                type="date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-xs font-semibold text-gray-900 focus:outline-none"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Check-Out</label>
                            <div className="relative">
                              <span className="absolute left-3 top-2.5 text-gray-400"><Calendar className="h-4 w-4" /></span>
                              <input
                                type="date"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-xs font-semibold text-gray-900 focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Tamu Dewasa</label>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setGuests(m => Math.max(1, m - 1))}
                                className="h-8 w-8 rounded-lg border border-gray-200 bg-gray-55 font-bold hover:bg-gray-100 active:scale-95 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="text-sm font-bold text-gray-800 w-8 text-center">{guests}</span>
                              <button
                                type="button"
                                onClick={() => setGuests(m => Math.min(6, m + 1))}
                                className="h-8 w-8 rounded-lg border border-gray-200 bg-gray-55 font-bold hover:bg-gray-100 active:scale-95 cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Anak-Anak</label>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setChildrenCount(m => Math.max(0, m - 1))}
                                className="h-8 w-8 rounded-lg border border-gray-200 bg-gray-55 font-bold hover:bg-gray-100 active:scale-95 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="text-sm font-bold text-gray-800 w-8 text-center">{childrenCount}</span>
                              <button
                                type="button"
                                onClick={() => setChildrenCount(m => Math.min(4, m + 1))}
                                className="h-8 w-8 rounded-lg border border-gray-200 bg-gray-55 font-bold hover:bg-gray-100 active:scale-95 cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-2xl text-xs sm:text-sm tracking-wide shadow-lg shadow-blue-150 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Memproses Transaksi...</span>
                        </>
                      ) : (
                        <span>Bayar & Amankan Kamar Sekarang</span>
                      )}
                    </button>
                  </form>

                  {/* Right Column: Order Details Summary */}
                  <div className="md:col-span-5 bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col justify-between">
                    <div>
                      {/* Stay Mini-Preview Card */}
                      <div className="rounded-xl overflow-hidden bg-white shadow-sm border border-slate-150 p-2.5 flex items-center gap-3">
                        <img
                          src={stay.image}
                          alt={stay.title}
                          className="h-14 w-18 object-cover rounded-lg"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <span className="inline-block px-1.5 py-0.5 rounded bg-blue-50 text-[9px] font-extrabold uppercase tracking-wide text-blue-600">{stay.type}</span>
                          <h5 className="text-xs font-bold text-gray-900 truncate mt-0.5">{stay.title}</h5>
                          <p className="text-[10px] text-gray-500 truncate">{stay.location}</p>
                        </div>
                      </div>

                      {/* Line Items Billing */}
                      <div className="mt-5 space-y-2 text-xs">
                        <h5 className="font-bold text-gray-900 border-b border-slate-200 pb-1.5">Rincian Pembayaran</h5>
                        
                        <div className="flex justify-between text-gray-600">
                          <span>Tarif per Malam ({stay.type})</span>
                          <span>${basePricePerNight}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Durasi Sewa</span>
                          <span>{nights} Malam</span>
                        </div>
                        <div className="flex justify-between text-gray-600 font-medium">
                          <span>Subtotal Akomodasi</span>
                          <span>${subtotal}</span>
                        </div>

                        {discountApplied && (
                          <div className="flex justify-between text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded">
                            <span className="flex items-center gap-1"><Percent className="h-3 w-3" /> Kupon STAY30 (30%)</span>
                            <span>-${discountAmount}</span>
                          </div>
                        )}

                        <div className="flex justify-between text-gray-600">
                          <span>Biaya Layanan Web</span>
                          <span>${serviceFee}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Pajak Turis (10%)</span>
                          <span>${localTax}</span>
                        </div>

                        <div className="border-t border-slate-200 pt-3 flex justify-between text-sm font-extrabold text-blue-600">
                          <span>Total Pembayaran</span>
                          <span>${totalCost}</span>
                        </div>
                      </div>
                    </div>

                    {/* Coupon Enter Form */}
                    <div className="mt-4 pt-4 border-t border-dashed border-slate-200 space-y-3">
                      {!discountApplied ? (
                        <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
                          <input
                            type="text"
                            placeholder="Kode Kupon (e.g. STAY30)"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-medium uppercase placeholder-slate-400 focus:outline-none focus:border-blue-500 flex-1"
                          />
                          <button
                            type="submit"
                            className="bg-gray-900 hover:bg-black text-white px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer shrink-0"
                          >
                            Terapkan
                          </button>
                        </form>
                      ) : (
                        <div className="flex items-center justify-between text-[11px] font-bold text-emerald-700 bg-emerald-100/60 border border-emerald-200 rounded-xl px-3 py-2">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle className="h-3.5 w-3.5" />
                            Diskon 30% Diaktifkan!
                          </span>
                          <button
                            onClick={() => setDiscountApplied(false)}
                            className="text-emerald-950 hover:underline hover:text-red-650 font-bold"
                          >
                            Hapus
                          </button>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-[10px] text-gray-400 bg-white border border-slate-100 rounded-lg p-2">
                        <ShieldCheck className="h-5 w-5 text-blue-500 shrink-0" />
                        <span>Pembatalkan gratis hingga 24 jam sebelum kedatangan. Jaminan harga terendah.</span>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                /* Success booking display states */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-4 text-center space-y-6 flex flex-col items-center justify-center"
                >
                  <div className="relative">
                    <div className="absolute inset-0 animate-ping rounded-full bg-emerald-100 opacity-75"></div>
                    <div className="relative rounded-full bg-emerald-500 p-4 text-white shadow-lg shadow-emerald-200">
                      <CheckCircle className="h-12 w-12" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">Booking Selesai Ditransaksikan</span>
                    <h4 className="text-2xl font-bold text-gray-900 pt-1">Terima Kasih, {name}!</h4>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">Voucher konfirmasi untuk menginap di <span className="font-semibold text-gray-800">{stay.title}</span> ({stay.location}) telah dikirim langsung ke alamat email anda ({email}).</p>
                  </div>

                  {/* Summary receipt card */}
                  <div className="w-full max-w-sm border border-gray-100 rounded-2xl bg-slate-50/70 p-4 font-sans text-xs text-left space-y-3 shadow-sm">
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-400">Kode Transaksi</span>
                      <span className="font-mono font-bold text-gray-900">{bookingRef}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Akomodasi</span>
                      <span className="font-bold text-blue-600">{stay.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Jadwal</span>
                      <span className="font-semibold">{checkIn} s/d {checkOut} ({nights} Malam)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Jumlah Tamu</span>
                      <span className="font-semibold">{guests} Dewasa, {childrenCount} Anak</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-2 font-black text-gray-900">
                      <span>Total Biaya</span>
                      <span>${totalCost}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-sm cursor-pointer transition-all"
                    >
                      Kembali ke Beranda
                    </button>
                    <button
                      onClick={() => {
                        window.print();
                      }}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm cursor-pointer hover:bg-blue-700 transition-all"
                    >
                      Unduh Tiket PDF
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
