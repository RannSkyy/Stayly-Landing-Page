import { Home, Building, Hotel as HotelIcon, Landmark, Ticket, Flame, CalendarCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface CategoryItem {
  name: string;
  id: string;
  icon: any;
  color: string;
}

export const CATEGORIES: CategoryItem[] = [
  { name: 'Villa', id: 'Villa', icon: Home, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { name: 'Hotel', id: 'Hotel', icon: HotelIcon, color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { name: 'Apartment', id: 'Apartment', icon: Building, color: 'bg-purple-50 text-purple-600 border-purple-100' },
  { name: 'Guesthouse', id: 'Guesthouse', icon: Landmark, color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { name: 'Voucher', id: 'voucher-promo', icon: Ticket, color: 'bg-rose-50 text-rose-600 border-rose-100' },
  { name: 'BIG DEAL', id: 'big-deal-promo', icon: Flame, color: 'bg-orange-50 text-orange-600 border-orange-100 animate-pulse' },
  { name: 'To Do', id: 'attractions-promo', icon: CalendarCheck, color: 'bg-sky-50 text-sky-600 border-sky-100' }
];

interface DashboardCategoriesProps {
  activeCategory: string;
  onSelectCategory: (catId: string) => void;
}

export default function DashboardCategories({ activeCategory, onSelectCategory }: DashboardCategoriesProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-gray-150 p-6 shadow-premium">
        
        {/* Responsive Grid layout for categories dashboard */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-6 sm:gap-4 md:gap-8 justify-items-center">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="flex flex-col items-center gap-2 group/cat cursor-pointer focus:outline-none"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              >
                {/* Rounded Icon Backdrop representing standard reference layout details */}
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center border transition-all ${cat.color} ${
                  isSelected 
                    ? 'ring-3 ring-blue-500 scale-105 shadow-md shadow-blue-100' 
                    : 'group-hover/cat:scale-105 group-hover/cat:shadow-md'
                }`}>
                  <Icon className="h-6 w-6 stroke-[2]" />
                </div>
                
                {/* Category label typography matching display font */}
                <span className={`text-[11px] sm:text-xs font-bold transition-colors ${
                  isSelected ? 'text-blue-600' : 'text-gray-500 group-hover/cat:text-gray-900'
                }`}>
                  {cat.name}
                </span>
              </motion.button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
