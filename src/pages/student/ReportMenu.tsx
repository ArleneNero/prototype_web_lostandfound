import React from 'react';
import { X, SearchX, PlusCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../../store/AppContext';

export const ReportMenu: React.FC = () => {
  const { navigateTo, goBack } = useApp();

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col justify-between p-4 shadow-xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-base font-bold text-gray-900">Laporkan Barang</h2>
        <div className="w-9"></div>
      </div>

      {/* Two Large Cards */}
      <div className="flex-1 flex flex-col justify-center space-y-4 my-8">
        {/* Card 1: Barang Hilang */}
        <div
          onClick={() => navigateTo('lost-report-form')}
          className="bg-gradient-to-br from-red-50 to-rose-50/50 hover:from-red-100/70 hover:to-rose-100/50 border border-red-200/80 rounded-3xl p-6 shadow-sm cursor-pointer transition-all duration-200 group flex items-center justify-between"
        >
          <div className="space-y-2 max-w-[80%]">
            <div className="w-14 h-14 rounded-2xl bg-white text-red-600 shadow-sm flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <SearchX className="w-7 h-7 stroke-[2]" />
            </div>
            <h3 className="text-lg font-black text-gray-900 group-hover:text-red-600 transition-colors">
              Barang Hilang
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Laporkan barang berharga milikmu yang hilang atau tercecer di lingkungan kampus.
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white text-red-600 shadow-sm flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

        {/* Card 2: Barang Ditemukan */}
        <div
          onClick={() => navigateTo('found-report-form')}
          className="bg-gradient-to-br from-emerald-50 to-teal-50/50 hover:from-emerald-100/70 hover:to-teal-100/50 border border-emerald-200/80 rounded-3xl p-6 shadow-sm cursor-pointer transition-all duration-200 group flex items-center justify-between"
        >
          <div className="space-y-2 max-w-[80%]">
            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-600 shadow-sm flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <PlusCircle className="w-7 h-7 stroke-[2]" />
            </div>
            <h3 className="text-lg font-black text-gray-900 group-hover:text-emerald-600 transition-colors">
              Barang Ditemukan
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Laporkan barang yang kamu temukan dan serahkan ke pos petugas Lost & Found UBL.
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white text-emerald-600 shadow-sm flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="py-2 text-center text-[11px] text-gray-400">
        Layanan resmi Universitas Budi Luhur
      </div>
    </div>
  );
};
