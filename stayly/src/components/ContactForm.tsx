import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquareCode, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Booking & Reservasi',
    message: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subjects = [
    'Booking & Reservasi',
    'Klaim Kode Voucher',
    'Kemitraan Vila & Hotel',
    'Keluhan & Saran'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name.trim()) {
      setErrorMsg('Nama lengkap wajib diisi');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Alamat email tidak valid');
      return;
    }
    if (!message.trim() || message.length < 10) {
      setErrorMsg('Pesan minimal harus memuat 10 karakter');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    // Simulate sending message to cloud/express API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset state
      setFormData({
        name: '',
        email: '',
        subject: 'Booking & Reservasi',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 shadow-premium relative overflow-hidden">
      
      {/* Absolute design accents */}
      <div className="absolute top-0 right-0 h-40 w-40 bg-blue-50/50 rounded-bl-[100px] -z-10" />
      
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Pelayanan 24/7</span>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Kirimkan Pesan Anda</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">Punya pertanyaan seputar reservasi, kendala pembayaran, atau ingin mendaftarkan vila Anda? Tim support Stayly siap merespon dalam waktu 15 menit.</p>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-100 p-3 text-xs font-semibold text-red-655 text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Contoh: Rion Santoso"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium text-gray-950 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Alamat Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="nama@perusahaan.com"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium text-gray-950 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Kategori Pertanyaan</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:outline-none focus:border-blue-500"
                >
                  {subjects.map(subj => (
                    <option key={subj} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Pesan Detail</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Deskripsikan kebutuhan perjalanan Anda secara detail..."
                  className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-medium text-gray-950 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-gray-900 hover:bg-black disabled:bg-gray-450 text-white font-bold rounded-2xl text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Mengirimkan Pesan...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Kirim Pesan Sekarang</span>
                  </>
                )}
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100 text-left">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email Support</p>
                  <p className="text-xs font-bold text-gray-700 truncate">support@stayly.com</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Hotline</p>
                  <p className="text-xs font-bold text-gray-700 truncate">+62 21 8092 5110</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Kantor Pusat</p>
                  <p className="text-xs font-bold text-gray-700 truncate">Kuta, Bali, Indonesia</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Submission success message */
          <motion.div
            key="contact-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-12 text-center space-y-5 flex flex-col items-center justify-center"
          >
            <div className="rounded-full bg-emerald-100 p-4 text-emerald-600 shadow-inner">
              <CheckCircle2 className="h-10 w-10 animate-pulse" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xl font-bold text-gray-900">Pesan Berhasil Terkirim!</h4>
              <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">Kami mengkonfirmasi penerimaan informasi Anda. Tiket penanganan support baru telah diterbitkan. Silakan cek inbox email dalam 15 menit ke depan.</p>
            </div>

            <button
              onClick={() => setIsSuccess(false)}
              className="px-6 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-all cursor-pointer"
            >
              Kirim Pesan Lainnya
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
