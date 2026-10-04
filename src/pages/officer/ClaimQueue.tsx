import React, { useState } from 'react';
import { Search, ClipboardList, ChevronRight, User } from 'lucide-react';
import { AppHeader } from '../../components/AppHeader';
import { BottomNavigation } from '../../components/BottomNavigation';
import { StatusBadge } from '../../components/StatusBadge';
import { useApp } from '../../store/AppContext';
import { Claim } from '../../types';

export const ClaimQueue: React.FC = () => {
  const { claims, items, navigateTo, goBack } = useApp();
  const [activeTab, setActiveTab] = useState<'Semua' | 'Tahap 1' | 'Tahap 2' | 'Disetujui' | 'Ditolak'>('Semua');
  const [search, setSearch] = useState('');

  const filtered = claims.filter(c => {
    if (activeTab === 'Tahap 1') {
      if (!['CLAIM_SUBMITTED', 'STAGE_1_REVIEW'].includes(c.status)) return false;
    }
    if (activeTab === 'Tahap 2') {
      if (!['STAGE_1_PASSED', 'STAGE_2_REQUIRED'].includes(c.status)) return false;
    }
    if (activeTab === 'Disetujui') {
      if (!['STAGE_2_PASSED', 'APPROVED', 'READY_FOR_PICKUP', 'RETURNED'].includes(c.status)) return false;
    }
    if (activeTab === 'Ditolak') {
      if (c.status !== 'REJECTED') return false;
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      const item = items.find(i => i.id === c.itemId);
      return c.claimCode.toLowerCase().includes(q) ||
             c.claimantName.toLowerCase().includes(q) ||
             (item && item.title.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24 max-w-md mx-auto relative shadow-xl">
      <AppHeader
        title="Daftar Klaim"
        showBack={true}
        onBack={() => navigateTo('officer-dashboard')}
      />

      <main className="p-4 space-y-3.5">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari kode klaim, nama pengaju, atau barang..."
            className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-subtle"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {(['Semua', 'Tahap 1', 'Tahap 2', 'Disetujui', 'Ditolak'] as const).map((tab) => {
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

        {/* Claim Cards List */}
        <div className="space-y-2.5">
          {filtered.length > 0 ? (
            filtered.map((claim) => {
              const item = items.find(i => i.id === claim.itemId);

              return (
                <div
                  key={claim.id}
                  onClick={() => navigateTo('officer-claim-detail', { claimId: claim.id })}
                  className="bg-white rounded-2xl p-3.5 border border-gray-200/90 shadow-subtle hover:border-blue-300 hover:shadow-card transition-all cursor-pointer flex items-center gap-3.5 group text-left"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                    <img
                      src={item?.images[0] || 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=400&q=80'}
                      alt={item?.title || 'Item'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h4 className="font-bold text-gray-900 text-xs truncate group-hover:text-primary transition-colors">
                        {item?.title || 'Barang'}
                      </h4>
                      <StatusBadge status={claim.status} size="sm" />
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                      <span className="font-mono font-bold text-gray-800">{claim.claimCode}</span>
                      <span>•</span>
                      <span className="truncate">{claim.claimantName}</span>
                    </div>

                    <p className="text-[10px] text-gray-400 mt-1">
                      Diajukan: {new Date(claim.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors shrink-0" />
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center space-y-2 bg-white rounded-2xl border border-gray-200 p-6">
              <ClipboardList className="w-12 h-12 text-gray-300 mx-auto" />
              <p className="text-xs font-bold text-gray-700">Tidak ada klaim dalam antrean ini</p>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};
