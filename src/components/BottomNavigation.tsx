import React from 'react';
import { 
  Home, 
  Search, 
  Bell, 
  User, 
  Package, 
  ClipboardCheck, 
  LayoutDashboard,
  Plus 
} from 'lucide-react';
import { useApp } from '../store/AppContext';

export const BottomNavigation: React.FC = () => {
  const { 
    currentUser, 
    currentScreen, 
    navigateTo, 
    notifications, 
    claims 
  } = useApp();

  const isOfficer = currentUser?.role === 'OFFICER';

  const unreadNotifs = notifications.filter(
    n => !n.isRead && (n.roleTarget === 'ALL' || n.roleTarget === (currentUser?.role || 'STUDENT'))
  ).length;

  const pendingClaims = claims.filter(
    c => c.status === 'CLAIM_SUBMITTED' || c.status === 'STAGE_1_REVIEW' || c.status === 'STAGE_2_REQUIRED'
  ).length;

  if (isOfficer) {
    const tabs = [
      {
        id: 'officer-dashboard',
        label: 'Beranda',
        icon: LayoutDashboard,
        active: currentScreen === 'officer-dashboard',
      },
      {
        id: 'officer-items',
        label: 'Data Barang',
        icon: Package,
        active: currentScreen === 'officer-items',
      },
      {
        id: 'officer-claims',
        label: 'Klaim',
        icon: ClipboardCheck,
        active: currentScreen === 'officer-claims' || currentScreen === 'officer-claim-detail' || currentScreen === 'officer-stage1' || currentScreen === 'officer-stage2' || currentScreen === 'officer-pickup-confirmation',
        badge: pendingClaims > 0 ? pendingClaims : undefined,
      },
      {
        id: 'officer-profile',
        label: 'Profil',
        icon: User,
        active: currentScreen === 'officer-profile',
      },
    ];

    return (
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200/80 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] max-w-md mx-auto">
        <div className="grid grid-cols-5 h-16 items-center px-1">
          {/* Beranda */}
          <button
            onClick={() => navigateTo('officer-dashboard')}
            className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
              currentScreen === 'officer-dashboard' ? 'text-primary font-bold' : 'text-gray-400 hover:text-gray-600 font-medium'
            }`}
          >
            <LayoutDashboard className={`w-5 h-5 ${currentScreen === 'officer-dashboard' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
            <span className="text-[11px] leading-none">Beranda</span>
            {currentScreen === 'officer-dashboard' && (
              <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"></span>
            )}
          </button>

          {/* Data Barang */}
          <button
            onClick={() => navigateTo('officer-items')}
            className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
              currentScreen === 'officer-items' ? 'text-primary font-bold' : 'text-gray-400 hover:text-gray-600 font-medium'
            }`}
          >
            <Package className={`w-5 h-5 ${currentScreen === 'officer-items' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
            <span className="text-[11px] leading-none">Barang</span>
            {currentScreen === 'officer-items' && (
              <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"></span>
            )}
          </button>

          {/* Center Plus Button (Tambah Barang Resmi) */}
          <div className="flex flex-col items-center justify-center relative -top-3">
            <button
              onClick={() => navigateTo('officer-add-item')}
              className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-white shadow-lg shadow-amber-500/35 border-4 border-white flex items-center justify-center transition-all cursor-pointer group"
              aria-label="Tambah Barang"
              title="Tambah Barang Temuan Resmi"
            >
              <Plus className="w-6 h-6 stroke-[2.5] group-hover:rotate-90 transition-transform duration-200" />
            </button>
            <span className="text-[10px] font-bold text-gray-500 mt-0.5">Tambah</span>
          </div>

          {/* Klaim */}
          <button
            onClick={() => navigateTo('officer-claims')}
            className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
              ['officer-claims', 'officer-claim-detail', 'officer-stage1', 'officer-stage2', 'officer-pickup-confirmation'].includes(currentScreen)
                ? 'text-primary font-bold'
                : 'text-gray-400 hover:text-gray-600 font-medium'
            }`}
          >
            <div className="relative">
              <ClipboardCheck className={`w-5 h-5 ${['officer-claims', 'officer-claim-detail', 'officer-stage1', 'officer-stage2', 'officer-pickup-confirmation'].includes(currentScreen) ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              {pendingClaims > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {pendingClaims}
                </span>
              )}
            </div>
            <span className="text-[11px] leading-none">Klaim</span>
          </button>

          {/* Profil */}
          <button
            onClick={() => navigateTo('officer-profile')}
            className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
              currentScreen === 'officer-profile' ? 'text-primary font-bold' : 'text-gray-400 hover:text-gray-600 font-medium'
            }`}
          >
            <User className={`w-5 h-5 ${currentScreen === 'officer-profile' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
            <span className="text-[11px] leading-none">Profil</span>
            {currentScreen === 'officer-profile' && (
              <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"></span>
            )}
          </button>
        </div>
      </nav>
    );
  }

  // Student Bottom Nav with 5 columns (Center + Button)
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200/80 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] max-w-md mx-auto">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {/* 1. Beranda */}
        <button
          onClick={() => navigateTo('home')}
          className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
            currentScreen === 'home' ? 'text-primary font-bold' : 'text-gray-400 hover:text-gray-600 font-medium'
          }`}
        >
          <Home className={`w-5 h-5 ${currentScreen === 'home' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
          <span className="text-[11px] leading-none">Beranda</span>
          {currentScreen === 'home' && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"></span>
          )}
        </button>

        {/* 2. Cari Barang */}
        <button
          onClick={() => navigateTo('search-results')}
          className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
            currentScreen === 'search' || currentScreen === 'search-results' || currentScreen === 'filter'
              ? 'text-primary font-bold'
              : 'text-gray-400 hover:text-gray-600 font-medium'
          }`}
        >
          <Search className={`w-5 h-5 ${currentScreen === 'search' || currentScreen === 'search-results' || currentScreen === 'filter' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
          <span className="text-[11px] leading-none">Cari</span>
          {(currentScreen === 'search' || currentScreen === 'search-results' || currentScreen === 'filter') && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"></span>
          )}
        </button>

        {/* 3. Center Elevated Plus Button for Reporting */}
        <div className="flex flex-col items-center justify-center relative -top-3">
          <button
            onClick={() => navigateTo('report-menu')}
            className={`w-12 h-12 rounded-full active:scale-95 text-white shadow-lg border-4 border-white flex items-center justify-center transition-all cursor-pointer group ${
              currentScreen === 'report-menu' || currentScreen === 'lost-report-form' || currentScreen === 'found-report-form'
                ? 'bg-primary-dark shadow-blue-600/40 ring-2 ring-primary'
                : 'bg-primary hover:bg-primary-dark shadow-blue-500/35'
            }`}
            aria-label="Laporkan Barang"
            title="Laporkan Barang Hilang atau Ditemukan"
          >
            <Plus className="w-6 h-6 stroke-[2.5] group-hover:rotate-90 transition-transform duration-200" />
          </button>
          <span className={`text-[10px] mt-0.5 ${
            currentScreen === 'report-menu' || currentScreen === 'lost-report-form' || currentScreen === 'found-report-form'
              ? 'font-bold text-primary'
              : 'font-semibold text-gray-500'
          }`}>
            Lapor
          </span>
        </div>

        {/* 4. Notifikasi */}
        <button
          onClick={() => navigateTo('notifications')}
          className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
            currentScreen === 'notifications' ? 'text-primary font-bold' : 'text-gray-400 hover:text-gray-600 font-medium'
          }`}
        >
          <div className="relative">
            <Bell className={`w-5 h-5 ${currentScreen === 'notifications' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
            {unreadNotifs > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadNotifs}
              </span>
            )}
          </div>
          <span className="text-[11px] leading-none">Notifikasi</span>
          {currentScreen === 'notifications' && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"></span>
          )}
        </button>

        {/* 5. Profil */}
        <button
          onClick={() => navigateTo('profile')}
          className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
            currentScreen === 'profile' || currentScreen === 'claim-status'
              ? 'text-primary font-bold'
              : 'text-gray-400 hover:text-gray-600 font-medium'
          }`}
        >
          <User className={`w-5 h-5 ${currentScreen === 'profile' || currentScreen === 'claim-status' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
          <span className="text-[11px] leading-none">Profil</span>
          {(currentScreen === 'profile' || currentScreen === 'claim-status') && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary"></span>
          )}
        </button>
      </div>
    </nav>
  );
};
