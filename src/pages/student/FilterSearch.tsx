import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../../constants';

export const FilterSearch: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    searchType, 
    setSearchType,
    searchCategory, 
    setSearchCategory,
    searchLocation, 
    setSearchLocation,
    searchDateFrom, 
    setSearchDateFrom,
    searchDateTo, 
    setSearchDateTo,
    resetFilters,
    navigateTo,
    goBack 
  } = useApp();

  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [localType, setLocalType] = useState(searchType);
  const [localCategory, setLocalCategory] = useState(searchCategory);
  const [localLocation, setLocalLocation] = useState(searchLocation);
  const [localFrom, setLocalFrom] = useState(searchDateFrom);
  const [localTo, setLocalTo] = useState(searchDateTo);

  const handleApply = () => {
    setSearchQuery(localQuery);
    setSearchType(localType);
    setSearchCategory(localCategory);
    setSearchLocation(localLocation);
    setSearchDateFrom(localFrom);
    setSearchDateTo(localTo);
    navigateTo('search-results');
  };

  const handleReset = () => {
    setLocalQuery('');
    setLocalType('Semua');
    setLocalCategory('');
    setLocalLocation('');
    setLocalFrom('');
    setLocalTo('');
    resetFilters();
  };

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col justify-between shadow-xl">
      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-white px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-base font-bold text-gray-900">Filter</h2>
        <button
          onClick={handleReset}
          className="text-xs font-bold text-primary hover:text-primary-dark transition-colors px-2 py-1"
        >
          Reset
        </button>
      </div>

      {/* Filter Body */}
      <div className="p-4 space-y-5 flex-1 overflow-y-auto">
        {/* Search keyword input */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Kata Kunci
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Cari barang..."
              className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Jenis Laporan */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2">
            Jenis Laporan
          </label>
          <div className="flex items-center gap-2">
            {(['Semua', 'Hilang', 'Ditemukan'] as const).map((type) => {
              const isSelected = localType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setLocalType(type)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    isSelected
                      ? type === 'Semua' ? 'bg-primary text-white border-primary shadow-xs'
                      : type === 'Hilang' ? 'bg-red-500 text-white border-red-500 shadow-xs'
                      : 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-2">
            Kategori
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setLocalCategory('')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                localCategory === ''
                  ? 'bg-primary text-white border-primary'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              Semua Kategori
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setLocalCategory(cat === localCategory ? '' : cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  localCategory === cat
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lokasi */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Lokasi Kampus
          </label>
          <select
            value={localLocation}
            onChange={(e) => setLocalLocation(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
          >
            {CAMPUS_LOCATIONS.map((loc) => (
              <option key={loc} value={loc === 'Semua Lokasi' ? '' : loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Rentang Tanggal */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Rentang Tanggal
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="block text-[10px] text-gray-500 mb-1">Dari tanggal:</span>
              <input
                type="date"
                value={localFrom}
                onChange={(e) => setLocalFrom(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-primary outline-none"
              />
            </div>
            <div>
              <span className="block text-[10px] text-gray-500 mb-1">Sampai tanggal:</span>
              <input
                type="date"
                value={localTo}
                onChange={(e) => setLocalTo(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-primary outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Apply Button */}
      <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0">
        <button
          onClick={handleApply}
          className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-blue-500/30 cursor-pointer"
        >
          Terapkan Filter
        </button>
      </div>
    </div>
  );
};
