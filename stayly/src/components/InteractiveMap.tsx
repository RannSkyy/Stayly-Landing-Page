import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Stay } from '../types';

interface InteractiveMapProps {
  stays: Stay[];
  onSelectStay: (stay: Stay) => void;
  hoveredStayId: string | null;
}

export default function InteractiveMap({ stays, onSelectStay, hoveredStayId }: InteractiveMapProps) {
  const [activePinId, setActivePinId] = useState<string | null>(null);

  // Find the currently hovered or active stay
  const highlightedId = hoveredStayId || activePinId;
  const selectedStay = stays.find(s => s.id === highlightedId);

  return (
    <div className="relative rounded-3xl bg-sky-50 overflow-hidden border border-blue-100 shadow-premium h-[420px] md:h-[480px] w-full mt-6 group/map">
      
      {/* Decorative SVG Map Background representing Bali's modern topography and coastlines */}
      <svg className="absolute inset-0 w-full h-full text-slate-200" viewBox="0 0 800 500" preserveAspectRatio="none">
        {/* Ocean Background Gradient */}
        <defs>
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0f9ff" />
            <stop offset="50%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#bae6fd" />
          </linearGradient>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(14, 165, 233, 0.05)" strokeWidth="1" />
          </pattern>
        </defs>
        
        {/* Fill with ocean */}
        <rect width="800" height="500" fill="url(#oceanGrad)" />
        <rect width="800" height="500" fill="url(#grid)" />

        {/* Topography coast contour lines */}
        <path d="M-100,50 C100,60 150,20 250,50 C350,80 380,180 480,160 C580,140 650,250 720,280 C790,310 900,320 950,450 L950,550 L-100,550 Z" fill="#ffffff" stroke="#e0e8f0" strokeWidth="2" />
        <path d="M-100,80 C80,90 130,50 230,80 C310,110 350,210 450,190 C550,170 610,290 690,320 C770,350 850,380 910,480" fill="none" stroke="#bae6fd" strokeWidth="1" strokeDasharray="5,5" />
        
        {/* Green/Yellow mountain clusters representing Bali volcanoes (Agung, Batur) */}
        <path d="M 420,110 Q 460,30 500,110 Z" fill="#f1f5f9" opacity="0.8" stroke="#cbd5e1" strokeWidth="1.5" />
        <path d="M 440,110 Q 465,55 490,110 Z" fill="#e2e8f0" opacity="0.9" />
        <path d="M 120,240 Q 150,180 180,240 Z" fill="#f1f5f9" opacity="0.8" stroke="#cbd5e1" strokeWidth="1" />

        {/* Soft highway / transit routes network */}
        <path d="M -50,380 Q 200,300 350,390 T 700,420 T 900,350" fill="none" stroke="#f1f5f9" strokeWidth="8" strokeLinecap="round" />
        <path d="M -50,380 Q 200,300 350,390 T 700,420 T 900,350" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" />
        
        <path d="M 350,390 Q 420,250 480,160" fill="none" stroke="#f1f5f9" strokeWidth="5" strokeLinecap="round" />
        <path d="M 350,390 Q 420,250 480,160" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4,4" />

        {/* Coral reef areas */}
        <circle cx="680" cy="180" r="35" fill="none" stroke="#e0f2fe" strokeWidth="4" strokeDasharray="4,8" />
        <circle cx="250" cy="420" r="28" fill="none" stroke="#e0f2fe" strokeWidth="4" strokeDasharray="2,6" />
      </svg>

      {/* Floating Compass Card */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-blue-50 shadow-lg flex items-center gap-3 z-10 select-none">
        <div className="h-8 w-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center animate-spin-slow">
          <Compass className="h-4.5 w-4.5" />
        </div>
        <div className="text-left">
          <h5 className="text-[11px] font-black text-gray-900 tracking-wide uppercase">Interactive Stay Explorer</h5>
          <p className="text-[9px] text-gray-500 font-medium">Klik pin properti untuk memesan instan</p>
        </div>
      </div>

      {/* Floating Stays Legend Widget */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl px-3 py-1.5 border border-blue-50 shadow-lg z-10">
        <span className="text-[10px] font-bold text-gray-600 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
          Aktif: {stays.length} Lokasi Unggulan
        </span>
      </div>

      {/* Dynamic Interactive Stays Pinpoints */}
      {stays.map((stay) => {
        const isHoveredOrActive = stay.id === highlightedId;
        
        return (
          <div
            key={stay.id}
            style={{
              position: 'absolute',
              top: `${stay.latitude}%`,
              left: `${stay.longitude}%`,
              transform: 'translate(-50%, -100%)',
            }}
            className="z-20 cursor-pointer"
            onClick={() => {
              setActivePinId(stay.id);
              onSelectStay(stay);
            }}
            onMouseEnter={() => setActivePinId(stay.id)}
            onMouseLeave={() => setActivePinId(null)}
          >
            <div className="flex flex-col items-center">
              
              {/* Tooltip Pricing Tag / Micro-Preview */}
              <motion.div
                animate={{
                  scale: isHoveredOrActive ? 1.05 : 0.9,
                  y: isHoveredOrActive ? -2 : 0,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 shadow-lg border transition-all ${
                  isHoveredOrActive
                    ? 'bg-blue-600 text-white border-blue-700 font-extrabold z-30'
                    : 'bg-white text-gray-900 border-gray-150 font-bold hover:border-blue-500'
                }`}
              >
                {/* Stay Micro Thumbnail */}
                <img
                  src={stay.image}
                  alt={stay.title}
                  className="h-4 w-4 rounded-full object-cover border border-white"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[10px] tracking-tight font-mono">${stay.price}</span>
              </motion.div>

              {/* Pin Base Pointer */}
              <div className="relative -mt-1.5 flex flex-col items-center">
                {/* Visual pulse circles */}
                {isHoveredOrActive && (
                  <span className="absolute h-5 w-5 rounded-full bg-blue-500/30 animate-ping" />
                )}
                
                {/* Real pin indicator drop */}
                <MapPin className={`h-6.5 w-6.5 drop-shadow-md transition-colors ${
                  isHoveredOrActive ? 'text-blue-600' : 'text-blue-500/80 hover:text-blue-600'
                }`} fill={isHoveredOrActive ? 'rgba(59, 130, 246, 0.4)' : 'transparent'} />
              </div>

            </div>
          </div>
        );
      })}

      {/* Slide-over details drawer for the pinned stay */}
      <AnimatePresence>
        {selectedStay && (
          <motion.div
            initial={{ opacity: 0, x: -50, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -30, y: 10 }}
            className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-blue-50 shadow-2xl z-30 flex items-center gap-3.5"
          >
            {/* Aspect Ratio Preview */}
            <div className="relative h-18 w-24 shrink-0 overflow-hidden rounded-xl border border-gray-100">
              <img
                src={selectedStay.image}
                alt={selectedStay.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-1 left-1 bg-blue-600 text-white font-extrabold text-[8px] px-1 rounded uppercase tracking-wider">
                {selectedStay.type}
              </span>
            </div>

            {/* Stay Description and Direct Trigger */}
            <div className="text-left min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-500 font-bold text-[10px] flex items-center">★ {selectedStay.rating}</span>
                <span className="text-[9px] text-gray-400">({selectedStay.reviewsCount})</span>
              </div>
              <h4 className="text-xs font-bold text-gray-900 truncate mt-0.5">{selectedStay.title}</h4>
              <p className="text-[10px] text-gray-500 truncate">{selectedStay.location}</p>
              
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-black text-blue-600 font-mono">${selectedStay.price}<span className="text-[9px] text-gray-400 font-sans font-normal">/Night</span></span>
                <button
                  onClick={() => onSelectStay(selectedStay)}
                  className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-extrabold px-3 py-1.5 transition-colors cursor-pointer"
                >
                  Pesan Instan
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
