import React from 'react';
import { 
  ShieldCheck, 
  RotateCcw, 
  LogOut, 
  GraduationCap, 
  Building2, 
  Mail, 
  Phone, 
  Hash, 
  ClipboardCheck, 
  Package, 
  CheckCircle2 
} from 'lucide-react';
import { AppHeader } from '../../components/AppHeader';
import { BottomNavigation } from '../../components/BottomNavigation';
import { useApp } from '../../store/AppContext';
import { APP_CONFIG } from '../../constants';

export const OfficerProfile: React.FC = () => {
  const { 
    currentUser, 
    items, 
    claims, 
    switchRole, 
    resetDemoData, 
    logout 
  } = useApp();

  const foundCount = items.filter(i => i.type === 'FOUND').length;
  const returnedCount = items.filter(i => i.status === 'RETURNED').length;
  const pendingClaims = claims.filter(
    c => ['CLAIM_SUBMITTED', 'STAGE_1_REVIEW', 'STAGE_2_REQUIRED'].includes(c.status)
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24 max-w-md mx-auto relative shadow-xl">
      <AppHeader />

      <main className="p-4 space-y-4">
        {/* Officer Card */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-subtle flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-amber-100 shrink-0">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'}
              alt={currentUser?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
              <ShieldCheck className="w-3 h-3 text-amber-600" />
              <span>Petugas Resmi Kampus</span>
            </div>
            <h3 className="font-extrabold text-gray-900 text-base truncate">
              {currentUser?.name || 'Bpk. Hendra Gunawan'}
            </h3>
            <p className="text-xs text-gray-500 truncate flex items-center gap-1">
              <Hash className="w-3 h-3 text-gray-400" />
              NIP: {currentUser?.employeeId || 'UBL-ST-084'}
            </p>
            <p className="text-xs text-gray-500 truncate flex items-center gap-1">
              <Mail className="w-3 h-3 text-gray-400" />
              {currentUser?.email || 'petugas@budiluhur.ac.id'}
            </p>
          </div>
        </div>

        {/* Operational Scope */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-2 text-xs">
          <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px]">
            Unit Operasional & Lokasi
          </h4>
          <p className="text-gray-700">
            <strong>Pos Pelayanan:</strong> {APP_CONFIG.officeLocation}
          </p>
          <p className="text-gray-500">
            <strong>Jam Buka:</strong> {APP_CONFIG.officeHours}
          </p>
        </div>

        {/* Operational Statistics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-3 rounded-2xl border border-gray-200/80 text-center shadow-subtle">
            <span className="text-[10px] font-bold text-gray-400 uppercase block">Barang Aktif</span>
            <span className="text-lg font-black text-gray-900">{foundCount}</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-gray-200/80 text-center shadow-subtle">
            <span className="text-[10px] font-bold text-amber-600 uppercase block">Klaim Antre</span>
            <span className="text-lg font-black text-amber-600">{pendingClaims}</span>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-gray-200/80 text-center shadow-subtle">
            <span className="text-[10px] font-bold text-emerald-600 uppercase block">Dikembalikan</span>
            <span className="text-lg font-black text-emerald-600">{returnedCount || 12}</span>
          </div>
        </div>

        {/* Fast Switch & Demo Control Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Kontrol Prototype Demo
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
              Officer Active
            </span>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed">
            Beralih kembali ke mode Mahasiswa untuk menguji alur pengajuan klaim, pengecekan timeline status, dan kode pengambilan.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => switchRole('STUDENT')}
              className="py-2.5 px-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Mode Mahasiswa</span>
            </button>
            <button
              onClick={resetDemoData}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Data Demo</span>
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full py-3 bg-white hover:bg-red-50 text-red-600 font-bold rounded-2xl text-xs border border-red-100 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-subtle"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar dari Akun</span>
        </button>

        {/* Concept Notice */}
        <div className="text-center pt-2 text-[11px] text-gray-400">
          <p>{APP_CONFIG.conceptNotice}</p>
          <p className="mt-0.5 font-medium">{APP_CONFIG.tagline}</p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};
