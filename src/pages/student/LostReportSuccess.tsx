import React from 'react';
import { Check, ArrowLeft, Home, Search } from 'lucide-react';
import { useApp } from '../../store/AppContext';

export const LostReportSuccess: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col justify-between p-6 shadow-xl">
      <div>
        <button
          onClick={() => navigateTo('home')}
          className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center my-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center text-emerald-600 mb-5 shadow-sm animate-bounce">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>

        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mb-2">
          Laporan Berhasil Dikirim!
        </h2>
        <p className="text-xs text-gray-500 max-w-xs leading-relaxed mb-6">
          Laporan kehilanganmu telah tersimpan di sistem UBL LostnFound. Petugas akan mencocokkan setiap ada barang temuan baru yang diserahkan.
        </p>

        <div className="w-full max-w-xs bg-blue-50/70 border border-blue-100 rounded-2xl p-4 text-left space-y-2">
          <h4 className="text-xs font-bold text-blue-900">
            Langkah Selanjutnya:
          </h4>
          <ul className="text-[11px] text-blue-800 space-y-1.5 list-disc pl-4">
            <li>Pantau tab <strong>Cari Barang</strong> secara berkala.</li>
            <li>Aktifkan notifikasi untuk mendapatkan kabar jika ada barang serupa.</li>
            <li>Kamu juga bisa mendatangi ruang Lost & Found di Gedung 1 Lantai Dasar.</li>
          </ul>
        </div>
      </div>

      <div className="space-y-2.5 pb-2">
        <button
          onClick={() => navigateTo('home')}
          className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
        <button
          onClick={() => navigateTo('search-results')}
          className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl text-xs transition-colors border border-gray-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>Telusuri Barang Ditemukan</span>
        </button>
      </div>
    </div>
  );
};
