import React from 'react';
import { ShieldCheck, MapPin, Clock, ArrowRight, Home, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { APP_CONFIG } from '../../constants';

export const FoundHandoffInstruction: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col justify-between p-6 shadow-xl">
      <div className="flex-1 flex flex-col items-center justify-center text-center my-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-600 mb-5 shadow-sm">
          <ShieldCheck className="w-10 h-10 stroke-[2.2]" />
        </div>

        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mb-2">
          Serahkan Barang ke Petugas
        </h2>
        <p className="text-xs text-gray-600 max-w-xs leading-relaxed mb-6">
          Untuk menjaga keamanan barang dan proses verifikasi kepemilikan, bawalah barang ke petugas Lost & Found UBL. Listing resmi akan diterbitkan setelah barang diterima petugas.
        </p>

        {/* Location & Instructions Card */}
        <div className="w-full max-w-xs bg-gray-50 border border-gray-200/90 rounded-2xl p-4 text-left space-y-3 shadow-subtle mb-4">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-gray-900">Lokasi Penyerahan:</h4>
              <p className="text-xs text-gray-600 mt-0.5 leading-snug">
                {APP_CONFIG.officeLocation}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 pt-2 border-t border-gray-100">
            <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-gray-900">Jam Operasional:</h4>
              <p className="text-xs text-gray-600 mt-0.5">
                {APP_CONFIG.officeHours}
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-[11px] text-blue-900 text-left max-w-xs space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            Keuntungan Sistem Perantara Resmi:
          </p>
          <p className="text-blue-800 leading-relaxed pl-5">
            Mencegah klaim palsu, melindungi privasi penemu & pemilik, serta memastikan barang sampai ke tangan yang berhak dengan aman.
          </p>
        </div>
      </div>

      <div className="space-y-2 pb-2">
        <button
          onClick={() => navigateTo('home')}
          className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>
    </div>
  );
};
