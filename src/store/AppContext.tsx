import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  Item, 
  VerificationSecret, 
  Claim, 
  NotificationItem, 
  InitialFoundReport,
  Stage1Checklist,
  Stage2MethodItem
} from '../types';
import { 
  DEMO_STUDENT, 
  DEMO_OFFICER, 
  CAMPUS_LOCATIONS 
} from '../constants';
import { 
  INITIAL_ITEMS, 
  INITIAL_VERIFICATION_SECRETS, 
  INITIAL_CLAIMS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_FOUND_REPORTS 
} from '../data/mockData';

interface NavigationHistoryItem {
  screen: string;
  itemId?: string | null;
  claimId?: string | null;
}

interface AppContextType {
  currentUser: User | null;
  items: Item[];
  verificationSecrets: Record<string, VerificationSecret>;
  claims: Claim[];
  notifications: NotificationItem[];
  foundReports: InitialFoundReport[];
  bookmarks: string[];
  
  // Navigation & Screen State
  currentScreen: string;
  selectedItemId: string | null;
  selectedClaimId: string | null;
  activeClaimCode: string | null;
  lastCreatedReportId: string | null;
  
  // Search & Filter State
  searchQuery: string;
  searchType: 'Semua' | 'Hilang' | 'Ditemukan';
  searchCategory: string;
  searchLocation: string;
  searchDateFrom: string;
  searchDateTo: string;
  searchSort: 'Terbaru' | 'Terlama';
  
  // Toast
  toast: { message: string; type: 'success' | 'danger' | 'info' } | null;
  
  // Actions
  setCurrentUser: (user: User | null) => void;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  switchRole: (role: 'STUDENT' | 'OFFICER') => void;
  resetDemoData: () => void;
  
  navigateTo: (screen: string, params?: { itemId?: string; claimId?: string }) => void;
  goBack: () => void;
  
  toggleBookmark: (itemId: string) => void;
  isBookmarked: (itemId: string) => boolean;
  
  // Search actions
  setSearchQuery: (query: string) => void;
  setSearchType: (type: 'Semua' | 'Hilang' | 'Ditemukan') => void;
  setSearchCategory: (cat: string) => void;
  setSearchLocation: (loc: string) => void;
  setSearchDateFrom: (date: string) => void;
  setSearchDateTo: (date: string) => void;
  setSearchSort: (sort: 'Terbaru' | 'Terlama') => void;
  resetFilters: () => void;
  
  // Claim flows
  submitClaim: (data: {
    itemId: string;
    whyMine: string;
    lossLocation: string;
    lossTime: string;
    distinctiveFeature: string;
    additionalInfo?: string;
    evidence: any[];
  }) => string;
  
  passStage1: (claimId: string, checks: Stage1Checklist, notes: string) => void;
  failStage1: (claimId: string, reasonInternal: string, reasonStudent: string, notes: string) => void;
  passStage2: (claimId: string, methods: Stage2MethodItem[], notes: string) => void;
  failStage2: (claimId: string, reasonInternal: string, reasonStudent: string, notes: string) => void;
  confirmPickup: (claimId: string, officerName: string) => void;
  
  // Item management & reports
  addOfficialFoundItem: (item: Partial<Item>, secret: Partial<VerificationSecret>) => string;
  submitLostReport: (data: any) => string;
  submitFoundReport: (data: any) => string;
  
  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  showToast: (message: string, type?: 'success' | 'danger' | 'info') => void;
  hideToast: () => void;
}

const STORAGE_KEY_USER = 'ubl_user_v1';
const STORAGE_KEY_ITEMS = 'ubl_items_v1';
const STORAGE_KEY_SECRETS = 'ubl_secrets_v1';
const STORAGE_KEY_CLAIMS = 'ubl_claims_v1';
const STORAGE_KEY_NOTIFS = 'ubl_notifs_v1';
const STORAGE_KEY_FOUND_REPS = 'ubl_found_reps_v1';
const STORAGE_KEY_BOOKMARKS = 'ubl_bookmarks_v1';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage state with fallbacks to initial mock data
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEMO_STUDENT;
  });

  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_ITEMS;
  });

  const [verificationSecrets, setVerificationSecrets] = useState<Record<string, VerificationSecret>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SECRETS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_VERIFICATION_SECRETS;
  });

  const [claims, setClaims] = useState<Claim[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CLAIMS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_CLAIMS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_NOTIFS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [foundReports, setFoundReports] = useState<InitialFoundReport[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_FOUND_REPS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_FOUND_REPORTS;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return ['item-airpods-pro'];
  });

  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [navHistory, setNavHistory] = useState<NavigationHistoryItem[]>([{ screen: 'home' }]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>('item-airpods-pro');
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>('clm-airpods-demo');
  const [activeClaimCode, setActiveClaimCode] = useState<string | null>('LF-2026-0012');
  const [lastCreatedReportId, setLastCreatedReportId] = useState<string | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<'Semua' | 'Hilang' | 'Ditemukan'>('Semua');
  const [searchCategory, setSearchCategory] = useState<string>('');
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [searchDateFrom, setSearchDateFrom] = useState<string>('');
  const [searchDateTo, setSearchDateTo] = useState<string>('');
  const [searchSort, setSearchSort] = useState<'Terbaru' | 'Terlama'>('Terbaru');

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'danger' | 'info' } | null>(null);

  // Sync to local storage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SECRETS, JSON.stringify(verificationSecrets));
  }, [verificationSecrets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CLAIMS, JSON.stringify(claims));
  }, [claims]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FOUND_REPS, JSON.stringify(foundReports));
  }, [foundReports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const showToast = (message: string, type: 'success' | 'danger' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const hideToast = () => {
    setToast(null);
  };

  const navigateTo = (screen: string, params?: { itemId?: string; claimId?: string }) => {
    if (params?.itemId) setSelectedItemId(params.itemId);
    if (params?.claimId) setSelectedClaimId(params.claimId);
    
    setNavHistory(prev => [...prev, { screen, itemId: params?.itemId, claimId: params?.claimId }]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (navHistory.length > 1) {
      const newHistory = [...navHistory];
      newHistory.pop(); // remove current
      const prev = newHistory[newHistory.length - 1];
      setNavHistory(newHistory);
      setCurrentScreen(prev.screen);
      if (prev.itemId !== undefined) setSelectedItemId(prev.itemId || null);
      if (prev.claimId !== undefined) setSelectedClaimId(prev.claimId || null);
    } else {
      // Default to role home
      const defaultScreen = currentUser?.role === 'OFFICER' ? 'officer-dashboard' : 'home';
      setCurrentScreen(defaultScreen);
      setNavHistory([{ screen: defaultScreen }]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = (email: string, pass: string): boolean => {
    const trimmed = email.toLowerCase().trim();
    if (trimmed.includes('petugas') || trimmed === 'petugas@budiluhur.ac.id') {
      setCurrentUser(DEMO_OFFICER);
      navigateTo('officer-dashboard');
      showToast('Berhasil masuk sebagai Petugas Lost & Found', 'success');
      return true;
    } else {
      setCurrentUser(DEMO_STUDENT);
      navigateTo('home');
      showToast('Berhasil masuk sebagai Mahasiswa UBL', 'success');
      return true;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    navigateTo('login');
    showToast('Telah keluar dari akun', 'info');
  };

  const switchRole = (role: 'STUDENT' | 'OFFICER') => {
    if (role === 'OFFICER') {
      setCurrentUser(DEMO_OFFICER);
      setCurrentScreen('officer-dashboard');
      setNavHistory([{ screen: 'officer-dashboard' }]);
      showToast('Beralih ke mode Petugas Kampus', 'info');
    } else {
      setCurrentUser(DEMO_STUDENT);
      setCurrentScreen('home');
      setNavHistory([{ screen: 'home' }]);
      showToast('Beralih ke mode Mahasiswa', 'info');
    }
  };

  const resetDemoData = () => {
    localStorage.clear();
    setItems(INITIAL_ITEMS);
    setVerificationSecrets(INITIAL_VERIFICATION_SECRETS);
    setClaims(INITIAL_CLAIMS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setFoundReports(INITIAL_FOUND_REPORTS);
    setBookmarks(['item-airpods-pro']);
    setCurrentUser(DEMO_STUDENT);
    setSelectedItemId('item-airpods-pro');
    setSelectedClaimId('clm-airpods-demo');
    setActiveClaimCode('LF-2026-0012');
    setCurrentScreen('home');
    setNavHistory([{ screen: 'home' }]);
    showToast('Data demo berhasil direset ke kondisi awal!', 'success');
  };

  const toggleBookmark = (itemId: string) => {
    setBookmarks(prev => {
      const exists = prev.includes(itemId);
      const next = exists ? prev.filter(id => id !== itemId) : [...prev, itemId];
      showToast(exists ? 'Dihapus dari simpanan' : 'Disimpan ke bookmark', 'info');
      return next;
    });
  };

  const isBookmarked = (itemId: string) => bookmarks.includes(itemId);

  const resetFilters = () => {
    setSearchQuery('');
    setSearchType('Semua');
    setSearchCategory('');
    setSearchLocation('');
    setSearchDateFrom('');
    setSearchDateTo('');
    setSearchSort('Terbaru');
  };

  // Submit Claim
  const submitClaim = (data: {
    itemId: string;
    whyMine: string;
    lossLocation: string;
    lossTime: string;
    distinctiveFeature: string;
    additionalInfo?: string;
    evidence: any[];
  }): string => {
    const claimCodeNumber = Math.floor(1000 + Math.random() * 9000);
    const code = `LF-2026-${claimCodeNumber}`;
    const claimId = `clm-${Date.now()}`;

    const newClaim: Claim = {
      id: claimId,
      claimCode: code,
      itemId: data.itemId,
      claimantId: currentUser?.id || 'usr_mhs_001',
      claimantName: currentUser?.name || 'Nero',
      claimantEmail: currentUser?.email || 'mahasiswa@budiluhur.ac.id',
      claimantNim: currentUser?.nim || '2411500123',
      claimantAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      claimantDept: currentUser?.department || 'Teknik Informatika (2024)',
      whyMine: data.whyMine,
      lossLocation: data.lossLocation,
      lossTime: data.lossTime,
      distinctiveFeature: data.distinctiveFeature,
      additionalInfo: data.additionalInfo || '',
      evidence: data.evidence.length > 0 ? data.evidence : [
        {
          id: 'ev-auto',
          name: 'Dokumen_Pendukung.pdf',
          type: 'pdf',
          size: '350 KB'
        }
      ],
      status: 'CLAIM_SUBMITTED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setClaims(prev => [newClaim, ...prev]);
    setActiveClaimCode(code);
    setSelectedClaimId(claimId);

    // Update item status to CLAIMED_PENDING
    setItems(prev => prev.map(item => item.id === data.itemId ? { ...item, status: 'CLAIMED_PENDING' } : item));

    // Add notification for officer
    const officerNotif: NotificationItem = {
      id: `notif-${Date.now()}-off`,
      roleTarget: 'OFFICER',
      title: 'Klaim Baru Masuk',
      message: `${currentUser?.name || 'Mahasiswa'} mengajukan klaim untuk barang (${code}).`,
      type: 'warning',
      timestamp: 'Baru saja',
      dateGroup: 'Hari ini',
      isRead: false,
      actionScreen: 'officer-claim-detail',
      actionId: claimId,
    };

    // Add notification for student
    const studentNotif: NotificationItem = {
      id: `notif-${Date.now()}-stu`,
      roleTarget: 'STUDENT',
      title: 'Klaim Berhasil Diajukan',
      message: `Klaim nomor ${code} sedang menunggu verifikasi awal oleh petugas.`,
      type: 'info',
      timestamp: 'Baru saja',
      dateGroup: 'Hari ini',
      isRead: false,
      actionScreen: 'claim-detail',
      actionId: claimId,
    };

    setNotifications(prev => [officerNotif, studentNotif, ...prev]);

    return code;
  };

  // Stage 1 Pass
  const passStage1 = (claimId: string, checks: Stage1Checklist, notes: string) => {
    setClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        return {
          ...c,
          status: 'STAGE_2_REQUIRED',
          stage1Checklist: checks,
          stage1Notes: notes,
          stage2Methods: [
            {
              id: 'm1',
              name: 'Buka/Kontrol Perangkat',
              result: 'NOT_APPLICABLE',
              notes: '',
            },
            {
              id: 'm2',
              name: 'Cocokkan Serial Number',
              result: 'NOT_APPLICABLE',
              notes: '',
            },
            {
              id: 'm3',
              name: 'Device/Account Association',
              result: 'NOT_APPLICABLE',
              notes: '',
            }
          ],
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    // Notification to student: Stage 2 required
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      roleTarget: 'STUDENT',
      title: 'Verifikasi Awal Berhasil',
      message: 'Klaim Anda lolos verifikasi tahap 1. Petugas memerlukan verifikasi kepemilikan tahap 2 secara langsung di ruang Lost & Found.',
      type: 'info',
      timestamp: 'Baru saja',
      dateGroup: 'Hari ini',
      isRead: false,
      actionScreen: 'claim-detail',
      actionId: claimId,
    };
    setNotifications(prev => [notif, ...prev]);
    showToast('Tahap 1 Lolos! Status berlanjut ke Tahap 2 (Verifikasi Kepemilikan).', 'success');
  };

  // Stage 1 Fail / Reject
  const failStage1 = (claimId: string, reasonInternal: string, reasonStudent: string, notes: string) => {
    setClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        return {
          ...c,
          status: 'REJECTED',
          rejectionReasonInternal: reasonInternal,
          rejectionReasonStudent: reasonStudent || 'Informasi atau bukti yang diberikan belum cukup untuk memastikan kepemilikan barang.',
          stage1Notes: notes,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      roleTarget: 'STUDENT',
      title: 'Klaim Belum Dapat Diverifikasi',
      message: 'Informasi atau bukti yang diberikan belum cukup untuk memastikan kepemilikan barang.',
      type: 'danger',
      timestamp: 'Baru saja',
      dateGroup: 'Hari ini',
      isRead: false,
      actionScreen: 'claim-detail',
      actionId: claimId,
    };
    setNotifications(prev => [notif, ...prev]);
    showToast('Klaim telah ditolak dengan catatan internal.', 'danger');
  };

  // Stage 2 Pass & Generate Pickup Code
  const passStage2 = (claimId: string, methods: Stage2MethodItem[], notes: string) => {
    // generate pickup code (e.g. 7K4P9)
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        return {
          ...c,
          status: 'READY_FOR_PICKUP',
          stage2Methods: methods,
          stage2Notes: notes,
          pickupCode: code,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    // Update item status to READY_FOR_PICKUP
    const currentClaim = claims.find(c => c.id === claimId);
    if (currentClaim) {
      setItems(prev => prev.map(item => item.id === currentClaim.itemId ? { ...item, status: 'READY_FOR_PICKUP' } : item));
    }

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      roleTarget: 'STUDENT',
      title: 'Barang Siap Diambil!',
      message: `Kepemilikan terverifikasi. Kode pengambilan Anda: ${code}. Silakan ambil barang di ruang Lost & Found.`,
      type: 'success',
      timestamp: 'Baru saja',
      dateGroup: 'Hari ini',
      isRead: false,
      actionScreen: 'claim-detail',
      actionId: claimId,
    };
    setNotifications(prev => [notif, ...prev]);
    showToast(`Kepemilikan Terverifikasi! Kode pengambilan: ${code}`, 'success');
  };

  // Stage 2 Fail / Reject
  const failStage2 = (claimId: string, reasonInternal: string, reasonStudent: string, notes: string) => {
    setClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        return {
          ...c,
          status: 'REJECTED',
          rejectionReasonInternal: reasonInternal,
          rejectionReasonStudent: reasonStudent || 'Verifikasi kepemilikan tahap kedua belum berhasil memenuhi kriteria bukti.',
          stage2Notes: notes,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      roleTarget: 'STUDENT',
      title: 'Klaim Tidak Memenuhi Verifikasi Tahap 2',
      message: 'Informasi atau bukti kepemilikan yang diberikan belum dapat membuktikan penguasaan barang.',
      type: 'danger',
      timestamp: 'Baru saja',
      dateGroup: 'Hari ini',
      isRead: false,
      actionScreen: 'claim-detail',
      actionId: claimId,
    };
    setNotifications(prev => [notif, ...prev]);
    showToast('Klaim ditolak pada Verifikasi Tahap 2.', 'danger');
  };

  // Confirm Pickup (RETURNED)
  const confirmPickup = (claimId: string, officerName: string) => {
    const claim = claims.find(c => c.id === claimId);
    if (!claim) return;

    setClaims(prev => prev.map(c => {
      if (c.id === claimId) {
        return {
          ...c,
          status: 'RETURNED',
          pickupConfirmedAt: new Date().toISOString(),
          pickupOfficerName: officerName || 'Petugas Lost & Found UBL',
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    }));

    // Update item status to RETURNED
    setItems(prev => prev.map(item => item.id === claim.itemId ? { ...item, status: 'RETURNED' } : item));

    // Notification to student
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      roleTarget: 'STUDENT',
      title: 'Barang Telah Diserahkan (Selesai)',
      message: `Barang dengan kode ${claim.claimCode} telah berhasil diserahkan kepada Anda. Terima kasih telah menggunakan UBL LostnFound.`,
      type: 'success',
      timestamp: 'Baru saja',
      dateGroup: 'Hari ini',
      isRead: false,
      actionScreen: 'claim-detail',
      actionId: claimId,
    };
    setNotifications(prev => [notif, ...prev]);
    showToast('Penyerahan barang berhasil dikonfirmasi! Status item menjadi RETURNED.', 'success');
  };

  // Add Official Found Item (Officer)
  const addOfficialFoundItem = (itemData: Partial<Item>, secretData: Partial<VerificationSecret>): string => {
    const newId = `item-found-${Date.now()}`;
    const itemCode = `UBL-F-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newItem: Item = {
      id: newId,
      itemCode,
      type: 'FOUND',
      title: itemData.title || 'Barang Ditemukan',
      category: itemData.category || 'Lainnya',
      location: itemData.location || 'Gedung 1 (Rektorat / Layanan)',
      date: itemData.date || '04 Okt 2026',
      time: itemData.time || '10:00 WIB',
      description: itemData.description || '',
      images: itemData.images && itemData.images.length > 0 ? itemData.images : [
        'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80'
      ],
      status: 'FOUND',
      postedBy: 'Petugas Lost & Found UBL',
      handledByOfficerId: currentUser?.id || 'usr_ptg_001',
      storageLocation: itemData.storageLocation || 'Rak Penyimpanan Utama',
      condition: itemData.condition || 'Baik',
      createdAt: new Date().toISOString(),
    };

    const newSecret: VerificationSecret = {
      id: `sec-${Date.now()}`,
      itemId: newId,
      exactDiscoveryLocation: secretData.exactDiscoveryLocation || 'Titik spesifik tersimpan',
      distinctiveMarks: secretData.distinctiveMarks || 'Ciri khusus tersimpan',
      concealedContents: secretData.concealedContents || '',
      accessories: secretData.accessories || '',
      serialFragment: secretData.serialFragment || '',
      privateNotes: secretData.privateNotes || '',
    };

    setItems(prev => [newItem, ...prev]);
    setVerificationSecrets(prev => ({ ...prev, [newId]: newSecret }));
    showToast(`Barang resmi berhasil diterbitkan: ${itemCode}`, 'success');
    return newId;
  };

  // Submit Lost Report (Student)
  const submitLostReport = (data: any): string => {
    const newId = `item-lost-${Date.now()}`;
    const code = `UBL-L-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newItem: Item = {
      id: newId,
      itemCode: code,
      type: 'LOST',
      title: data.title || 'Barang Hilang',
      category: data.category || 'Lainnya',
      location: data.location || 'Area Kampus UBL',
      date: data.date || '04 Okt 2026',
      time: data.time || '12:00 WIB',
      description: data.description || '',
      images: data.images && data.images.length > 0 ? data.images : [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
      ],
      status: 'LOST',
      postedBy: `${currentUser?.name || 'Mahasiswa'} (NIM: ${currentUser?.nim || '2411500123'})`,
      createdAt: new Date().toISOString(),
    };

    setItems(prev => [newItem, ...prev]);
    setLastCreatedReportId(newId);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      roleTarget: 'STUDENT',
      title: 'Laporan Barang Hilang Berhasil',
      message: `Laporan Anda untuk "${newItem.title}" telah dicatat. Sistem akan mencocokkan jika ada barang serupa ditemukan.`,
      type: 'success',
      timestamp: 'Baru saja',
      dateGroup: 'Hari ini',
      isRead: false,
    };
    setNotifications(prev => [notif, ...prev]);

    showToast('Laporan barang hilang berhasil dikirim!', 'success');
    return newId;
  };

  // Submit Found Report (Student initial report with handoff)
  const submitFoundReport = (data: any): string => {
    const reportId = `rep-${Date.now()}`;
    const newReport: InitialFoundReport = {
      id: reportId,
      reporterName: currentUser?.name || data.reporterName || 'Mahasiswa UBL',
      reporterEmail: currentUser?.email || data.reporterEmail || 'mahasiswa@budiluhur.ac.id',
      reporterPhone: data.reporterPhone || '0812-0000-1111',
      itemName: data.itemName || 'Barang Ditemukan',
      category: data.category || 'Lainnya',
      discoveryLocation: data.discoveryLocation || 'Kampus Budi Luhur',
      discoveryDate: data.discoveryDate || '04 Okt 2026',
      discoveryTime: data.discoveryTime || '10:00',
      description: data.description || '',
      images: data.images || [],
      status: 'PENDING_HANDOFF',
      createdAt: new Date().toISOString(),
    };

    setFoundReports(prev => [newReport, ...prev]);
    setLastCreatedReportId(reportId);

    // Notification to officer about incoming handoff
    const officerNotif: NotificationItem = {
      id: `notif-${Date.now()}-h`,
      roleTarget: 'OFFICER',
      title: 'Laporan Temuan Masuk (Menunggu Penyerahan)',
      message: `${newReport.reporterName} melaporkan menemukan ${newReport.itemName} dan sedang menuju ruang Lost & Found.`,
      type: 'info',
      timestamp: 'Baru saja',
      dateGroup: 'Hari ini',
      isRead: false,
      actionScreen: 'officer-items',
    };
    setNotifications(prev => [officerNotif, ...prev]);

    return reportId;
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('Semua notifikasi telah ditandai sudah dibaca', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        items,
        verificationSecrets,
        claims,
        notifications,
        foundReports,
        bookmarks,
        currentScreen,
        selectedItemId,
        selectedClaimId,
        activeClaimCode,
        lastCreatedReportId,
        searchQuery,
        searchType,
        searchCategory,
        searchLocation,
        searchDateFrom,
        searchDateTo,
        searchSort,
        toast,
        setCurrentUser,
        login,
        logout,
        switchRole,
        resetDemoData,
        navigateTo,
        goBack,
        toggleBookmark,
        isBookmarked,
        setSearchQuery,
        setSearchType,
        setSearchCategory,
        setSearchLocation,
        setSearchDateFrom,
        setSearchDateTo,
        setSearchSort,
        resetFilters,
        submitClaim,
        passStage1,
        failStage1,
        passStage2,
        failStage2,
        confirmPickup,
        addOfficialFoundItem,
        submitLostReport,
        submitFoundReport,
        markNotificationRead,
        markAllNotificationsRead,
        showToast,
        hideToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
