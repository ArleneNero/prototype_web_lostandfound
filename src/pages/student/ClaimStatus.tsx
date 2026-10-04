import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  ChevronRight, 
  KeyRound, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Copy,
  ShieldAlert
} from 'lucide-react';
import { AppHeader } from '../../components/AppHeader';
import { BottomNavigation } from '../../components/BottomNavigation';
import { StatusBadge } from '../../components/StatusBadge';
import { Timeline } from '../../components/Timeline';
import { useApp } from '../../store/AppContext';
import { APP_CONFIG } from '../../constants';

export const ClaimStatus: React.FC = () => {
  const { 
    claims, 
    items, 
    selectedClaimId, 
    navigateTo, 
    goBack, 
    currentUser, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'Semua' | 'Diproses' | 'Disetujui' | 'Ditolak'>('Semua');

  // Filter student claims
  const userClaims = claims.filter(c => c.claimantId === (currentUser?.id || 'usr_mhs_001'));
  
  // Tab filter
  const filteredClaims = userClaims.filter(c => {
    if (activeTab === 'Semua') return true;
    if (activeTab === 'Diproses') {
      return ['CLAIM_SUBMITTED', 'STAGE_1_REVIEW', 'STAGE_1_PASSED', 'STAGE_2_REQUIRED'].includes(c.status);
    }
    if (activeTab === 'Disetujui') {
      return ['STAGE_2_PASSED', 'APPROVED', 'READY_FOR_PICKUP', 'RETURNED'].includes(c.status);
    }
    if (activeTab === 'Ditolak') {
      return c.status === 'REJECTED';
    }
    return true;
  });

  const activeClaim = claims.find(c => c.id === selectedClaimId) || userClaims[0] || claims[0];
  const activeItem = items.find(i => i.id === activeClaim?.itemId);

  const handleCopyPickupCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast('Kode pengambilan disalin!', 'info');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24 max-w-md mx-auto relative shadow-xl">
      <AppHeader title="Status Klaim (Mahasiswa)" showBack onBack={goBack} />

      <main className="p-4 space-y-4">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {(['Semua', 'Diproses', 'Disetujui', 'Ditolak'] as const).map((tab) => {
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

        {filteredClaims.length > 0 ? (
          filteredClaims.map((claim) => {
            const item = items.find(i => i.id === claim.itemId);
            const isReadyForPickup = claim.status === 'READY_FOR_PICKUP';
            const isStage2Required = claim.status === 'STAGE_2_REQUIRED' || claim.status === 'STAGE_1_PASSED';
            const isReturned = claim.status === 'RETURNED';
            const isRejected = claim.status === 'REJECTED';

            return (
              <div 
                key={claim.id}
                className="bg-white rounded-2xl border border-gray-200/90 shadow-subtle p-4 space-y-4"
              >
                {/* Header Row */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                    <img
                      src={item?.images[0] || 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=400&q=80'}
                      alt={item?.title || 'Barang'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h4 className="font-bold text-gray-900 text-sm truncate">
                        {item?.title || 'AirPods Pro'}
                      </h4>
                      <StatusBadge status={claim.status} size="sm" />
                    </div>
                    <p className="text-[11px] font-semibold text-gray-400">
                      No. Klaim: <span className="text-gray-700">{claim.claimCode}</span>
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Diajukan: {new Date(claim.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* STAGE 2 ACTION REQUIRED BANNER */}
                {isStage2Required && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Verifikasi Awal Berhasil!</span>
                    </div>
                    <p className="text-xs text-amber-900 leading-relaxed">
                      Klaimmu lolos verifikasi tahap 1. Petugas memerlukan <strong>verifikasi kepemilikan tahap kedua secara langsung</strong>.
                    </p>
                    <div className="pt-1 text-[11px] text-amber-900/90 space-y-1">
                      <p>📍 <strong>Lokasi:</strong> {APP_CONFIG.officeLocation}</p>
                      <p>⏰ <strong>Jam Layanan:</strong> {APP_CONFIG.officeHours}</p>
                      <p>📋 <strong>Bawa:</strong> KTM Budi Luhur & Bukti Kepemilikan (Kotak / Invoice / Akses Perangkat)</p>
                    </div>
                  </div>
                )}

                {/* READY FOR PICKUP BANNER */}
                {isReadyForPickup && (
                  <div className="bg-blue-50/90 border border-blue-200 rounded-2xl p-4 text-center space-y-3">
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-blue-800 uppercase tracking-wide">
                      <KeyRound className="w-4 h-4 text-primary" />
                      <span>Barang Siap Diambil!</span>
                    </div>

                    <div className="bg-white rounded-xl py-3 px-4 border border-blue-200 shadow-sm max-w-[200px] mx-auto">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-bold">
                        Kode Pengambilan
                      </span>
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="text-2xl font-black text-gray-900 tracking-widest">
                          {claim.pickupCode}
                        </span>
                        <button
                          onClick={() => handleCopyPickupCode(claim.pickupCode || '')}
                          className="text-gray-400 hover:text-primary p-1"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed max-w-xs mx-auto">
                      Tunjukkan kode ini beserta <strong>KTM Budi Luhur</strong> kepada petugas di ruang Lost & Found untuk serah terima fisik barang.
                    </p>
                  </div>
                )}

                {/* RETURNED / FINISHED BANNER */}
                {isReturned && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <h5 className="font-bold text-xs text-emerald-800">
                        Barang Telah Berhasil Dikembalikan!
                      </h5>
                      <p className="text-[11px] text-emerald-700 leading-tight mt-0.5">
                        Diserahkan oleh {claim.pickupOfficerName || 'Petugas Lost & Found UBL'}. Status klaim selesai.
                      </p>
                    </div>
                  </div>
                )}

                {/* REJECTED BANNER */}
                {isRejected && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 space-y-1.5">
                    <div className="flex items-center gap-2 text-red-700 font-bold text-xs">
                      <ShieldAlert className="w-4 h-4 text-red-600" />
                      <span>Klaim Belum Dapat Diverifikasi</span>
                    </div>
                    <p className="text-xs text-red-700 leading-relaxed">
                      {claim.rejectionReasonStudent || 'Informasi atau bukti yang diberikan belum cukup untuk memastikan kepemilikan barang.'}
                    </p>
                    <p className="text-[10px] text-red-500 italic">
                      Silakan hubungi petugas Lost & Found jika memerlukan penjelasan alur verifikasi lebih lanjut.
                    </p>
                  </div>
                )}

                {/* Verification Timeline */}
                <div className="pt-2 border-t border-gray-100">
                  <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Alur Verifikasi Dua Tahap
                  </h5>
                  <Timeline
                    status={claim.status}
                    createdAt={claim.createdAt}
                    updatedAt={claim.updatedAt}
                    pickupCode={claim.pickupCode}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-16 text-center space-y-3 bg-white rounded-2xl border border-gray-200/80 p-6">
            <Clock className="w-12 h-12 text-gray-300 mx-auto" />
            <h4 className="font-bold text-gray-800 text-sm">Belum Ada Riwayat Klaim</h4>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Anda belum memiliki klaim barang pada kategori status ini.
            </p>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};
