import React, { useState } from 'react';
import { Menu, X, Globe, ChevronDown, User, LogIn, Compass, Home, Gift, PhoneCall, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  userEmail?: string;
  onOpenContact: () => void;
}

export default function Header({ userEmail = 'user@stayly.com', onOpenContact }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [lang, setLang] = useState<'EN' | 'ID'>('EN');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);

  const toggleLang = () => {
    setLang(prev => (prev === 'EN' ? 'ID' : 'EN'));
    setIsLangDropdownOpen(false);
  };

  const handleLoginToggle = () => {
    setIsLoggedIn(prev => !prev);
    setShowLoginToast(true);
    setTimeout(() => setShowLoginToast(false), 3000);
  };

  const navLinks = [
    { name: lang === 'EN' ? 'Destinations' : 'Destinasi', href: '#destinations', icon: Compass },
    { name: lang === 'EN' ? 'Accommodations' : 'Akomodasi', href: '#accommodations', icon: Home },
    { name: lang === 'EN' ? 'Special Offers' : 'Promo Khusus', href: '#offers', icon: Gift },
    { name: lang === 'EN' ? 'Contact Us' : 'Hubungi Kami', href: '#contact', icon: PhoneCall },
    { name: lang === 'EN' ? 'About Us' : 'Tentang Kami', href: '#about', icon: Info },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-sky-450 text-white shadow-md shadow-blue-200 transition-transform group-hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6h6m-6 4h6m-6 4h3m-3 4h6" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Stay<span className="text-blue-600">ly</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors py-1.5 border-b-2 border-transparent hover:border-blue-600"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right utility buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 border border-gray-100 transition-all cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5 text-gray-500" />
                <span>{lang === 'EN' ? 'ENG 🇬🇧' : 'IND 🇮🇩'}</span>
                <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-32 rounded-xl bg-white p-1 shadow-xl border border-gray-100 z-50 origin-top-right"
                  >
                    <button
                      onClick={toggleLang}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50"
                    >
                      <span>{lang === 'EN' ? 'Indonesian' : 'English'}</span>
                      <span className="text-sm">{lang === 'EN' ? '🇮🇩' : '🇬🇧'}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Login / Profile button */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full pl-2 pr-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                  <div className="h-5 w-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                    {userEmail[0].toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">{userEmail}</span>
                </div>
                <button
                  onClick={handleLoginToggle}
                  className="rounded-full p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                  title="Logout"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginToggle}
                className="flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-xs font-bold shadow-md shadow-blue-200 hover:shadow-lg transition-all cursor-pointer"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>{lang === 'EN' ? 'Login' : 'Masuk'}</span>
              </button>
            )}
          </div>

          {/* Mobile menu triggers */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Quick Lang toggle */}
            <button
              onClick={() => setLang(l => (l === 'EN' ? 'ID' : 'EN'))}
              className="flex items-center justify-center h-8 px-2.5 rounded-lg border border-gray-100 text-xs font-semibold text-gray-700 bg-gray-50"
            >
              {lang === 'EN' ? '🇬🇧 EN' : '🇮🇩 ID'}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 focus:outline-none transition-all"
            >
              {isMobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black/40 md:hidden"
            />

            {/* Side drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-40 w-72 bg-white max-w-xs shadow-2xl p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <span className="text-lg font-bold text-gray-900">
                  Stay<span className="text-blue-600">ly</span> Menu
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation list */}
              <div className="flex-1 py-6 space-y-4">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    >
                      <IconComponent className="h-4 w-4 text-gray-400" />
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </div>

              {/* Drawer Footer Login state */}
              <div className="pt-6 border-t border-gray-100 space-y-3">
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-blue-50/70 border border-blue-50 text-blue-800">
                      <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        {userEmail[0].toUpperCase()}
                      </div>
                      <div className="text-xs truncate">
                        <p className="font-semibold">Logged in as:</p>
                        <p className="opacity-80 font-mono text-[10px]">{userEmail}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLoginToggle();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 text-red-600 py-2.5 text-xs font-bold hover:bg-red-50 transition-all"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleLoginToggle();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-white py-2.5 text-xs font-bold hover:bg-blue-700 transition-all"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>{lang === 'EN' ? 'Login' : 'Masuk'}</span>
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Elegant toast notification */}
      <AnimatePresence>
        {showLoginToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-gray-900 px-4 py-3 text-white shadow-2xl"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white font-bold">✓</div>
            <div className="text-xs">
              <p className="font-bold">
                {isLoggedIn 
                  ? (lang === 'EN' ? 'Signed in successfully!' : 'Berhasil masuk akun!')
                  : (lang === 'EN' ? 'Logged out safely.' : 'Berhasil keluar akun.')}
              </p>
              <p className="text-gray-400 text-[10px] mt-0.5">
                {isLoggedIn ? `Welcome back, ${userEmail}` : 'Thank you for visiting stayly.'}
              </p>
            </div>
            <button onClick={() => setShowLoginToast(false)} className="text-gray-400 hover:text-white ml-2">
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
