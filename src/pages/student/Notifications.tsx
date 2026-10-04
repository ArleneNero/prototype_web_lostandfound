import React from 'react';
import { 
  CheckCheck, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Search, 
  BellOff, 
  Clock, 
  ChevronRight 
} from 'lucide-react';
import { AppHeader } from '../../components/AppHeader';
import { BottomNavigation } from '../../components/BottomNavigation';
import { useApp } from '../../store/AppContext';
import { NotificationItem } from '../../types';

export const Notifications: React.FC = () => {
  const { 
    notifications, 
    currentUser, 
    markNotificationRead, 
    markAllNotificationsRead, 
    navigateTo, 
    goBack 
  } = useApp();

  const isOfficer = currentUser?.role === 'OFFICER';

  // Filter notifications for current user/role
  const userNotifs = notifications.filter(
    n => n.roleTarget === 'ALL' || n.roleTarget === (isOfficer ? 'OFFICER' : 'STUDENT')
  );

  const groups: Array<'Hari ini' | 'Kemarin' | 'Sebelumnya'> = ['Hari ini', 'Kemarin', 'Sebelumnya'];

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'success':
        return (
          <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case 'danger':
        return (
          <div className="w-9 h-9 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
            <AlertCircle className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case 'warning':
        return (
          <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Clock className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 rounded-full bg-blue-50 text-primary flex items-center justify-center shrink-0 border border-blue-100">
            <Info className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
    }
  };

  const handleNotifClick = (notif: NotificationItem) => {
    markNotificationRead(notif.id);
    if (notif.actionScreen) {
      if (notif.actionScreen === 'claim-detail' && notif.actionId) {
        navigateTo('claim-status');
      } else if (notif.actionScreen === 'officer-claim-detail' && notif.actionId) {
        navigateTo('officer-claim-detail', { claimId: notif.actionId });
      } else {
        navigateTo(notif.actionScreen);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24 max-w-md mx-auto relative shadow-xl">
      <AppHeader
        title="Notifikasi"
        showBack={true}
        onBack={goBack}
        rightAction={
          <button
            onClick={markAllNotificationsRead}
            className="text-xs font-semibold text-primary hover:text-primary-dark p-1 flex items-center gap-1"
            title="Tandai semua dibaca"
          >
            <CheckCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Tandai Dibaca</span>
          </button>
        }
      />

      <main className="p-4 space-y-5">
        {userNotifs.length > 0 ? (
          groups.map((group) => {
            const groupItems = userNotifs.filter(n => n.dateGroup === group);
            if (groupItems.length === 0) return null;

            return (
              <div key={group} className="space-y-2">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
                  {group}
                </h3>

                <div className="space-y-2">
                  {groupItems.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => handleNotifClick(notif)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-left ${
                        notif.isRead
                          ? 'bg-white border-gray-200/80 shadow-subtle hover:bg-gray-50'
                          : 'bg-white border-blue-200 shadow-sm ring-1 ring-blue-500/10'
                      }`}
                    >
                      {getIcon(notif.type)}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <h4 className="font-bold text-gray-900 text-xs truncate">
                            {notif.title}
                          </h4>
                          <span className="text-[10px] text-gray-400 shrink-0">
                            {notif.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-600 leading-relaxed">
                          {notif.message}
                        </p>
                      </div>

                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5"></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center space-y-3 bg-white rounded-2xl border border-gray-200/80 p-6">
            <BellOff className="w-12 h-12 text-gray-300 mx-auto" />
            <h4 className="font-bold text-gray-800 text-sm">Belum Ada Notifikasi</h4>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Notifikasi status verifikasi dan temuan barang baru akan muncul di sini.
            </p>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};
