import React from 'react';
import { 
  Package, 
  SearchX, 
  ClipboardCheck, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Plus, 
  ShieldCheck, 
  Clock, 
  KeyRound 
} from 'lucide-react';
import { AppHeader } from '../../components/AppHeader';
import { BottomNavigation } from '../../components/BottomNavigation';
import { StatusBadge } from '../../components/StatusBadge';
import { useApp } from '../../store/AppContext';

export const OfficerDashboard: React.FC = () => {
  const { 
    currentUser, 
    items, 
    claims, 
    foundReports, 
    navigateTo 
  } = useApp();

  const foundItemsCount = items.filter(i => i.type === 'FOUND').length;
  const lostItemsCount = items.filter(i => i.type === 'LOST').length;
  const pendingClaimsCount = claims.filter(
    c => ['CLAIM_SUBMITTED', 'STAGE_1_REVIEW', 'STAGE_2_REQUIRED'].includes(c.status)
  ).length;
  const completedCount = claims.filter(c => c.status === 'RETURNED').length + items.filter(i => i.status === 'RETURNED').length;

  // Urgent pending claims
  const urgentClaims = claims.filter(
    c => ['CLAIM_SUBMITTED', 'STAGE_1_REVIEW', 'STAGE_2_REQUIRED', 'READY_FOR_PICKUP'].includes(c.status)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24 max-w-md mx-auto relative shadow-xl">
      <AppHeader />

      <main className="p-4 space-y-4">
        {/* Welcome Card matching reference screen 16 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle flex items-center justify-between">
          <div className="space-y-1 max-w-[75%]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full inline-block">
              Petugas Resmi Kampus
            </span>
            <h2 className="font-extrabold text-base text-gray-900 tracking-tight">
              Selamat datang, {currentUser?.name || 'Petugas LAF'}
            </h2>
            <p className="text-xs text-gray-500 leading-snug">
              Kelola barang, verifikasi klaim, dan bantu civitas kampus UBL.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Found */}
          <div 
            onClick={() => navigateTo('officer-items')}
            className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-subtle hover:border-blue-300 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500">Barang Ditemukan</span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-gray-900">{foundItemsCount}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Tercatat di sistem</p>
          </div>

          {/* Lost */}
          <div 
            onClick={() => navigateTo('officer-items')}
            className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-subtle hover:border-red-300 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500">Barang Hilang</span>
              <div className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                <SearchX className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-gray-900">{lostItemsCount}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Laporan mahasiswa</p>
          </div>

          {/* Claims Pending */}
          <div 
            onClick={() => navigateTo('officer-claims')}
            className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-subtle hover:border-amber-300 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500">Klaim Diproses</span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <ClipboardCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-amber-600">{pendingClaimsCount}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Perlu verifikasi</p>
          </div>

          {/* Completed */}
          <div 
            onClick={() => navigateTo('officer-items')}
            className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-subtle hover:border-green-300 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500">Total Selesai</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-emerald-600">{completedCount || 52}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Berhasil kembali</p>
          </div>
        </div>

        {/* Quick Action: Tambah Barang Ditemukan */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white shadow-card flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm">Terbitkan Barang Resmi</h4>
            <p className="text-xs text-blue-100 mt-0.5">
              Input fisik barang temuan + data rahasia verifikasi internal.
            </p>
          </div>
          <button
            onClick={() => navigateTo('officer-add-item')}
            className="px-3.5 py-2 bg-white text-primary font-bold rounded-xl text-xs hover:bg-blue-50 transition-colors shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah</span>
          </button>
        </div>

        {/* Priority Section: Perlu Tindakan */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-gray-900 text-sm tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>Perlu Tindakan ({urgentClaims.length})</span>
            </h3>
            <button
              onClick={() => navigateTo('officer-claims')}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5"
            >
              Lihat antrean <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {urgentClaims.map((claim) => {
              const item = items.find(i => i.id === claim.itemId);
              const isStage1 = claim.status === 'CLAIM_SUBMITTED' || claim.status === 'STAGE_1_REVIEW';
              const isStage2 = claim.status === 'STAGE_2_REQUIRED' || claim.status === 'STAGE_1_PASSED';
              const isPickup = claim.status === 'READY_FOR_PICKUP';

              return (
                <div
                  key={claim.id}
                  onClick={() => {
                    if (isPickup) {
                      navigateTo('officer-pickup-confirmation', { claimId: claim.id });
                    } else if (isStage2) {
                      navigateTo('officer-stage2', { claimId: claim.id });
                    } else {
                      navigateTo('officer-stage1', { claimId: claim.id });
                    }
                  }}
                  className="bg-white rounded-2xl p-3.5 border border-gray-200/90 shadow-subtle hover:shadow-card hover:border-blue-300 transition-all cursor-pointer flex items-center gap-3.5 group text-left"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                    <img
                      src={item?.images[0] || 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=400&q=80'}
                      alt={item?.title || 'Barang'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="font-bold text-gray-900 text-xs truncate group-hover:text-primary transition-colors">
                        {item?.title || 'AirPods Pro'}
                      </h4>
                      <StatusBadge status={claim.status} size="sm" />
                    </div>

                    <p className="text-[11px] text-gray-500 truncate">
                      Pengaju: <span className="font-semibold text-gray-700">{claim.claimantName}</span>
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                        {claim.claimCode}
                      </span>
                      <span className="text-[10px] font-semibold text-primary group-hover:underline flex items-center gap-0.5">
                        {isPickup ? 'Konfirmasi Pengambilan' : isStage2 ? 'Mulai Tahap 2' : 'Verifikasi Tahap 1'}
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Incoming found item reports from students */}
        {foundReports.length > 0 && (
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Laporan Temuan Masuk ({foundReports.length})</span>
              </h4>
              <span className="text-[10px] bg-emerald-200 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Menunggu Fisik
              </span>
            </div>
            {foundReports.map(rep => (
              <div key={rep.id} className="bg-white rounded-xl p-2.5 border border-emerald-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-800">{rep.itemName} ({rep.category})</span>
                  <span className="text-[10px] text-gray-400">{rep.discoveryDate}</span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Pelapor: {rep.reporterName} • Lokasi: {rep.discoveryLocation}
                </p>
                <button
                  onClick={() => navigateTo('officer-add-item')}
                  className="mt-1 text-[11px] font-bold text-emerald-700 hover:underline"
                >
                  + Jadikan Listing Resmi Setelah Barang Diterima
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};
