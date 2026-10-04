import React from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowLeft, 
  ArrowUpDown, 
  PackageOpen, 
  RotateCcw 
} from 'lucide-react';
import { AppHeader } from '../../components/AppHeader';
import { BottomNavigation } from '../../components/BottomNavigation';
import { ItemListRow } from '../../components/ItemListRow';
import { useApp } from '../../store/AppContext';

export const SearchResults: React.FC = () => {
  const { 
    items, 
    searchQuery, 
    setSearchQuery, 
    searchType, 
    setSearchType,
    searchCategory, 
    searchLocation, 
    searchSort, 
    setSearchSort, 
    resetFilters,
    navigateTo, 
    goBack 
  } = useApp();

  // Filter items logic
  const filtered = items.filter(item => {
    // Keyword match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchLoc = item.location.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchLoc && !matchCat) return false;
    }

    // Type filter
    if (searchType === 'Ditemukan' && item.type !== 'FOUND') return false;
    if (searchType === 'Hilang' && item.type !== 'LOST') return false;

    // Category filter
    if (searchCategory && item.category !== searchCategory) return false;

    // Location filter
    if (searchLocation && !item.location.includes(searchLocation)) return false;

    return true;
  });

  // Sort logic
  const sorted = [...filtered].sort((a, b) => {
    if (searchSort === 'Terlama') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24 max-w-md mx-auto relative shadow-xl">
      {/* Top Search Header */}
      <div className="sticky top-0 z-20 bg-white px-4 py-3 border-b border-gray-100 shadow-subtle space-y-3">
        <div className="flex items-center gap-2">
          <button
            onClick={goBack}
            className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200 shrink-0"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama barang..."
              className="w-full pl-10 pr-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          <button
            onClick={() => navigateTo('filter')}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors shrink-0 ${
              searchCategory || searchLocation || searchType !== 'Semua'
                ? 'bg-blue-50 border-primary text-primary'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
            aria-label="Buka Filter"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5">
          {(['Semua', 'Hilang', 'Ditemukan'] as const).map((chip) => {
            const isSelected = searchType === chip;
            return (
              <button
                key={chip}
                onClick={() => setSearchType(chip)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? chip === 'Semua' ? 'bg-primary text-white border-primary shadow-xs'
                    : chip === 'Hilang' ? 'bg-red-500 text-white border-red-500 shadow-xs'
                    : 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {chip}
              </button>
            );
          })}

          {searchCategory && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-primary border border-blue-200 flex items-center gap-1 shrink-0">
              {searchCategory}
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 space-y-3">
        {/* Results Counter & Sorting */}
        <div className="flex items-center justify-between text-xs text-gray-500 pb-1">
          <span className="font-semibold text-gray-700">
            {sorted.length} hasil ditemukan
          </span>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={searchSort}
              onChange={(e) => setSearchSort(e.target.value as 'Terbaru' | 'Terlama')}
              className="bg-transparent text-gray-700 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="Terbaru">Terbaru</option>
              <option value="Terlama">Terlama</option>
            </select>
          </div>
        </div>

        {/* Items List */}
        {sorted.length > 0 ? (
          <div className="space-y-2.5">
            {sorted.map((item) => (
              <ItemListRow key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-3 bg-white rounded-2xl border border-gray-200/80 p-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
              <PackageOpen className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-gray-800 text-sm">Tidak ada barang yang cocok</h4>
            <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
              Coba sesuaikan kata kunci pencarian, ubah filter kategori, atau reset semua filter.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 text-primary font-bold text-xs rounded-xl hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Semua Filter</span>
            </button>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};
