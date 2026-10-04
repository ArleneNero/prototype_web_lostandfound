import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronRight 
} from 'lucide-react';
import { AppHeader } from '../../components/AppHeader';
import { BottomNavigation } from '../../components/BottomNavigation';
import { ItemCard } from '../../components/ItemCard';
import { CategoryShortcut } from '../../components/CategoryShortcut';
import { useApp } from '../../store/AppContext';
import { CATEGORIES } from '../../constants';

export const Home: React.FC = () => {
  const { 
    items, 
    navigateTo, 
    searchType, 
    setSearchType, 
    searchQuery, 
    setSearchQuery 
  } = useApp();

  const [activeChip, setActiveChip] = useState<'Semua' | 'Hilang' | 'Ditemukan'>(searchType || 'Semua');

  const handleChipClick = (type: 'Semua' | 'Hilang' | 'Ditemukan') => {
    setActiveChip(type);
    setSearchType(type);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('search-results');
  };

  // Filter items based on active chip
  const displayedItems = items
    .filter(item => {
      if (activeChip === 'Semua') return item.type === 'FOUND' || item.type === 'LOST';
      if (activeChip === 'Ditemukan') return item.type === 'FOUND';
      if (activeChip === 'Hilang') return item.type === 'LOST';
      return true;
    })
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24 max-w-md mx-auto relative shadow-xl">
      <AppHeader />

      <main className="px-4 pt-3.5 space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari barang, lokasi, atau deskripsi..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-subtle transition-all"
            />
          </div>
          <button
            type="button"
            onClick={() => navigateTo('filter')}
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary/50 shadow-subtle transition-colors shrink-0"
            aria-label="Filter"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </form>

        {/* Segment Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {(['Semua', 'Hilang', 'Ditemukan'] as const).map((chip) => {
            const isSelected = activeChip === chip;
            let chipStyles = 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50';

            if (isSelected) {
              if (chip === 'Semua') chipStyles = 'bg-primary text-white border-primary shadow-xs';
              if (chip === 'Hilang') chipStyles = 'bg-red-500 text-white border-red-500 shadow-xs';
              if (chip === 'Ditemukan') chipStyles = 'bg-emerald-600 text-white border-emerald-600 shadow-xs';
            }

            return (
              <button
                key={chip}
                onClick={() => handleChipClick(chip)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 cursor-pointer ${chipStyles}`}
              >
                {chip}
              </button>
            );
          })}
        </div>

        {/* Category Shortcut Grid */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-xs tracking-tight">Kategori</h3>
            <button
              onClick={() => navigateTo('search-results')}
              className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-0.5"
            >
              Semua Kategori <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <CategoryShortcut key={cat} category={cat} />
            ))}
          </div>
        </div>

        {/* Action Prompt Banner: AirPods Scenario Highlight for Stakeholders */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-3.5 text-white shadow-card flex items-center justify-between">
          <div className="space-y-0.5 max-w-[70%]">
            <div className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide">
              <span>🎯 Skenario Demo Utama</span>
            </div>
            <h4 className="font-bold text-xs">Uji Coba Klaim AirPods Pro</h4>
            <p className="text-[10px] text-blue-100 leading-tight">
              Buka barang AirPods Pro lalu ajukan klaim untuk mencoba verifikasi 2-tahap.
            </p>
          </div>
          <button
            onClick={() => navigateTo('item-detail', { itemId: 'item-airpods-pro' })}
            className="px-3 py-1.5 bg-white text-primary text-[11px] font-bold rounded-lg shadow-sm hover:bg-blue-50 transition-colors shrink-0"
          >
            Buka Barang
          </button>
        </div>

        {/* Section: Barang Ditemukan Terbaru */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-gray-900 text-sm tracking-tight">
              Barang Ditemukan Terbaru
            </h3>
            <button
              onClick={() => {
                setSearchType('Ditemukan');
                navigateTo('search-results');
              }}
              className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-0.5"
            >
              Lihat semua <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2-Column Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {displayedItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};
