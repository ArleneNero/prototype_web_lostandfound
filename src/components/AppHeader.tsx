import React from 'react';
import { 
  Bell, 
  ArrowLeft, 
  RotateCcw, 
  ShieldCheck, 
  GraduationCap 
} from 'lucide-react';
import { useApp } from '../store/AppContext';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  title, 
  showBack = false, 
  onBack,
  rightAction 
}) => {
  const { 
    currentUser, 
    notifications, 
    navigateTo, 
    goBack, 
    switchRole, 
    resetDemoData,
    currentScreen 
  } = useApp();

  const unreadCount = notifications.filter(
    n => !n.isRead && (n.roleTarget === 'ALL' || n.roleTarget === (currentUser?.role || 'STUDENT'))
  ).length;

  const isOfficer = currentUser?.role === 'OFFICER';

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-subtle">
      {/* Demo helper banner on top for easy stakeholder testing */}
      <div className="bg-slate-900 text-white px-3 py-1 text-[11px] flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Prototype Konsep UBL</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Quick role toggle button */}
          <button
            onClick={() => switchRole(isOfficer ? 'STUDENT' : 'OFFICER')}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 transition-all ${
              isOfficer 
                ? 'bg-amber-500 text-white hover:bg-amber-600' 
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
            title="Klik untuk beralih mode demo seketika"
          >
            {isOfficer ? <ShieldCheck className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
            <span>Mode: {isOfficer ? 'Petugas' : 'Mahasiswa'} (Ganti)</span>
          </button>
          
          <button
            onClick={resetDemoData}
            className="text-gray-300 hover:text-white flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-800 text-[10px]"
            title="Kembalikan data ke awal"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 py-3 flex items-center justify-between">
        {showBack ? (
          <div className="flex items-center gap-3">
            <button
              onClick={onBack || goBack}
              className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
              aria-label="Kembali"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-base font-bold text-gray-900 tracking-tight line-clamp-1">
              {title || 'Kembali'}
            </h1>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigateTo(isOfficer ? 'officer-dashboard' : 'home')}>
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-gray-900">
                  UBL <span className="text-primary font-bold">LostnFound</span>
                </span>
                {isOfficer && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    Petugas
                  </span>
                )}
              </div>
              <p className="text-[10px] text-gray-500 font-medium leading-none">
                {isOfficer ? 'Panel Operasional Resmi' : 'Hilang. Temukan. Kembali.'}
              </p>
            </div>
          </div>
        )}

        {/* Right side items */}
        <div className="flex items-center gap-2">
          {rightAction ? (
            rightAction
          ) : (
            <>
              {/* Notification icon */}
              <button
                onClick={() => navigateTo('notifications')}
                className="w-9 h-9 rounded-full relative flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Notifikasi"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Avatar */}
              <button
                onClick={() => navigateTo(isOfficer ? 'officer-profile' : 'profile')}
                className="w-9 h-9 rounded-full ring-2 ring-primary/20 overflow-hidden hover:opacity-90 transition-opacity"
                aria-label="Profil"
              >
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                  alt={currentUser?.name || 'User'}
                  className="w-full h-full object-cover"
                />
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
