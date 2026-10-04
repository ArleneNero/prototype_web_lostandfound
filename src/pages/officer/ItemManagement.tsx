import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Package, ChevronRight } from 'lucide-react';
import { AppHeader } from '../../components/AppHeader';
import { BottomNavigation } from '../../components/BottomNavigation';
import { StatusBadge } from '../../components/StatusBadge';
import { useApp } from '../../store/AppContext';
import { Item } from '../../types';

export const ItemManagement: React.FC = () => {
  const { items, navigateTo, goBack } = useApp();
  const [activeTab, setActiveTab] = useState<'Semua' | 'Ditemukan' | 'Hilang' | 'Dikembalikan'>('Semua');
  const [search, setSearch] = useState('');

  const filtered = items.filter(item => {
    if (activeTab === 'Ditemukan' && item.type !== 'FOUND') return false;
    if (activeTab === 'Hilang' && item.type !== 'LOST') return false;
    if (activeTab === 'Dikembalikan' && item.status !== 'RETURNED') return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.location.toLowerCase().includes(q) || item.itemCode.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24 max-w-md mx-auto relative shadow-xl">
      {/* Top Header */}
      <AppHeader
        title="Data Barang"
        showBack={true}
        onBack={() => navigateTo('officer-dashboard')}
        rightAction={
          <button
            onClick={() => navigateTo('officer-add-item')}
            className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm shadow-blue-500/30 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>
        }
      />

      <main className="p-4 space-y-3.5">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari kode barang, nama, atau lokasi..."
            className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-subtle"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {(['Semua', 'Ditemukan', 'Hilang', 'Dikembalikan'] as const).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Items List */}
        <div className="space-y-2.5">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => navigateTo('officer-item-detail', { itemId: item.id })}
                className="bg-white rounded-2xl p-3.5 border border-gray-200/90 shadow-subtle hover:border-blue-300 hover:shadow-card transition-all cursor-pointer flex items-center gap-3.5 group text-left"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                  <img
                    src={item.images[0] || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=400&q=80'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      {item.itemCode}
                    </span>
                    <StatusBadge status={item.status} size="sm" />
                  </div>

                  <h4 className="font-bold text-gray-900 text-xs truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-gray-500 truncate mt-0.5">
                    {item.location}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {item.date}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors shrink-0" />
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-2 bg-white rounded-2xl border border-gray-200 p-6">
              <Package className="w-12 h-12 text-gray-300 mx-auto" />
              <p className="text-xs font-bold text-gray-700">Tidak ada data barang ditemukan</p>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};
