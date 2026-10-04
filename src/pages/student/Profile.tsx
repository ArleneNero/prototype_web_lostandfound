import React from 'react';
import { 
  User, 
  ShieldCheck, 
  RotateCcw, 
  LogOut, 
  Bookmark, 
  ClipboardList, 
  FileText, 
  ChevronRight, 
  Mail, 
  Hash, 
  GraduationCap 
} from 'lucide-react';
import { AppHeader } from '../../components/AppHeader';
import { BottomNavigation } from '../../components/BottomNavigation';
import { useApp } from '../../store/AppContext';
import { APP_CONFIG } from '../../constants';

export const Profile: React.FC = () => {
  const { 
    currentUser, 
    claims, 
    bookmarks, 
    navigateTo, 
    switchRole, 
    resetDemoData, 
    logout 
  } = useApp();

  const userClaims = claims.filter(c => c.claimantId === (currentUser?.id || 'usr_mhs_001'));
  const activeClaimsCount = userClaims.filter(
    c => !['RETURNED', 'REJECTED', 'CANCELLED'].includes(c.status)
  ).length;

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24 max-w-md mx-auto relative shadow-xl">
      <AppHeader />

      <main className="p-4 space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-subtle flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-blue-50 shrink-0">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
              alt={currentUser?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1 bg-blue-50 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
              <GraduationCap className="w-3 h-3" />
              <span>Mahasiswa Aktif UBL</span>
            </div>
            <h3 className="font-extrabold text-gray-900 text-base truncate">
              {currentUser?.name || 'Nero'}
            </h3>
            <p className="text-xs text-gray-500 truncate flex items-center gap-1">
              <Hash className="w-3 h-3 text-gray-400" />
              NIM: {currentUser?.nim || '2411500123'}
            </p>
            <p className="text-xs text-gray-500 truncate flex items-center gap-1">
              <Mail className="w-3 h-3 text-gray-400" />
              {currentUser?.email || 'mahasiswa@budiluhur.ac.id'}
            </p>
          </div>
        </div>

        {/* Quick Menu */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-subtle overflow-hidden">
          <button
            onClick={() => navigateTo('claim-status')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Status Klaim Saya</h4>
                <p className="text-[11px] text-gray-500">Lihat progres verifikasi dua tahap</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeClaimsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                  {activeClaimsCount} aktif
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </button>

          <button
            onClick={() => navigateTo('search-results')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Barang Tersimpan</h4>
                <p className="text-[11px] text-gray-500">Daftar bookmark barang</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-semibold">{bookmarks.length}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </button>

          <button
            onClick={() => navigateTo('report-menu')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Buat Laporan Baru</h4>
                <p className="text-[11px] text-gray-500">Lapor barang hilang atau temuan</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Demo Fast Role Switcher Box for Stakeholders */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Kontrol Prototype Demo
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
              Ready
            </span>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed">
            Ingin memeriksa antrean klaim atau melakukan verifikasi dua tahap sebagai petugas? Beralihlah ke mode Petugas sekarang.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => switchRole('OFFICER')}
              className="py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Mode Petugas</span>
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
