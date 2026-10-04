import React from 'react';
import { 
  Laptop, 
  Briefcase, 
  Wallet, 
  Key, 
  BookOpen, 
  CreditCard,
  Grid 
} from 'lucide-react';
import { ItemCategory } from '../types';
import { useApp } from '../store/AppContext';

interface CategoryShortcutProps {
  category: ItemCategory;
  isActive?: boolean;
  onClick?: () => void;
}

const CATEGORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Elektronik: Laptop,
  Tas: Briefcase,
  Dompet: Wallet,
  Kunci: Key,
  KTM: CreditCard,
  Buku: BookOpen,
  Lainnya: Grid,
  Aksesoris: Grid,
  Pakaian: Grid,
};

export const CategoryShortcut: React.FC<CategoryShortcutProps> = ({ 
  category, 
  isActive = false, 
  onClick 
}) => {
  const { navigateTo, setSearchCategory } = useApp();
  const Icon = CATEGORY_ICONS[category] || Grid;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setSearchCategory(category);
      navigateTo('search-results');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center gap-1.5 group cursor-pointer"
    >
      <div 
        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 border ${
          isActive 
            ? 'bg-primary text-white border-primary shadow-sm shadow-blue-500/30' 
            : 'bg-white text-gray-700 border-gray-200/90 shadow-subtle group-hover:border-primary/50 group-hover:bg-blue-50/50'
        }`}
      >
        <Icon className={`w-6 h-6 transition-transform group-hover:scale-110 ${isActive ? 'stroke-[2.2px]' : 'stroke-[1.8px]'}`} />
      </div>
      <span className={`text-xs text-center line-clamp-1 transition-colors ${
        isActive ? 'font-bold text-primary' : 'font-medium text-gray-700 group-hover:text-primary'
      }`}>
        {category}
      </span>
    </button>
  );
};
