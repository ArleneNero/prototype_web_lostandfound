import React from 'react';
import { Check, Copy, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../store/AppContext';

export const ClaimSuccess: React.FC = () => {
  const { 
    activeClaimCode, 
    selectedClaimId, 
    navigateTo, 
    showToast 
  } = useApp();

  const handleCopyCode = () => {
    if (activeClaimCode) {
      navigator.clipboard?.writeText(activeClaimCode);
      showToast('Nomor klaim disalin ke clipboard!', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col justify-between p-6 shadow-xl">
      {/* Top Bar */}
      <div>
        <button
          onClick={() => navigateTo('home')}
          className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-6">
        {/* Animated Check Icon */}
        <div className="relative mb-5">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm animate-bounce">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mb-2">
          Klaim Berhasil Diajukan!
        </h2>
        <p className="text-xs text-gray-500 max-w-xs leading-relaxed mb-6">
          Klaim kamu sedang menunggu verifikasi awal oleh petugas Lost & Found UBL.
        </p>

        {/* Claim Code Card */}
        <div className="w-full max-w-xs bg-gray-50 border border-gray-200/90 rounded-2xl p-4 shadow-subtle mb-4">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Nomor Klaim
          </span>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-black text-gray-900 tracking-wider">
              {activeClaimCode || 'LF-2026-0012'}
            </span>
            <button
              onClick={handleCopyCode}
              className="p-1 text-gray-400 hover:text-primary transition-colors cursor-pointer"
              title="Salin kode"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">
            Simpan nomor ini untuk referensi saat verifikasi ke petugas.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-blue-600 font-medium bg-blue-50/80 px-3 py-1.5 rounded-full border border-blue-100">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Kamu akan mendapatkan notifikasi setelah ada pembaruan.</span>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="space-y-2.5 pb-2">
        <button
          onClick={() => navigateTo('claim-detail', { claimId: selectedClaimId || 'clm-airpods-demo' })}
          className="w-full py-3 bg-primary hover:bg-primary-dark active:bg-primary-dark text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-blue-500/30 cursor-pointer"
        >
          Lihat Status Klaim
        </button>
        <button
          onClick={() => navigateTo('home')}
          className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl text-xs transition-colors border border-gray-200 cursor-pointer"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};
