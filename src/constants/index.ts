import { User, ItemCategory, ClaimStatus } from '../types';

export const APP_CONFIG = {
  name: 'UBL LostnFound',
  subtitle: 'Lost & Found Universitas Budi Luhur',
  tagline: 'Hilang. Temukan. Kembali.',
  conceptNotice: 'Prototype Konsep — Universitas Budi Luhur',
  institution: 'Universitas Budi Luhur',
  officeLocation: 'Ruang Layanan Kemahasiswaan & Lost and Found, Gedung 1 Lantai Dasar',
  officeHours: 'Senin - Jumat: 08.00 - 16.00 WIB',
};

export const DEMO_STUDENT: User = {
  id: 'usr_mhs_001',
  name: 'Nero',
  email: 'mahasiswa@budiluhur.ac.id',
  nim: '2411500123',
  role: 'STUDENT',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  department: 'Teknik Informatika (2024)',
  phone: '0812-9876-5432',
};

export const DEMO_OFFICER: User = {
  id: 'usr_ptg_001',
  name: 'Bpk. Hendra Gunawan',
  email: 'petugas@budiluhur.ac.id',
  employeeId: 'UBL-ST-084',
  role: 'OFFICER',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
  department: 'Petugas Resmi Lost & Found UBL',
  phone: '0813-1234-5678',
};

export const CATEGORIES: ItemCategory[] = [
  'Elektronik',
  'Tas',
  'Dompet',
  'Kunci',
  'KTM',
  'Aksesoris',
  'Buku',
  'Pakaian',
  'Lainnya',
];

export const CAMPUS_LOCATIONS = [
  'Semua Lokasi',
  'Gedung 1 (Rektorat / Layanan)',
  'Gedung 2 (Fakultas TI)',
  'Gedung 3 (Fakultas Ekonomi)',
  'Gedung 4 (Fakultas Komunikasi)',
  'Gedung E, Lantai 2',
  'Gedung G, Lantai 2',
  'Perpustakaan Pusat UBL',
  'Kantin Budi Luhur',
  'Area Parkir Timur (Motor)',
  'Area Parkir Barat (Mobil)',
  'Laboratorium Komputer',
  'Masjid Baitul Ilmi UBL',
  'Lapangan Basket / Olahraga',
];

export const CLAIM_STATUS_MAP: Record<ClaimStatus, { label: string; bg: string; text: string; border: string }> = {
  CLAIM_SUBMITTED: {
    label: 'Klaim Diajukan',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
  },
  STAGE_1_REVIEW: {
    label: 'Tahap 1: Verifikasi Pengetahuan',
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-200',
  },
  STAGE_1_PASSED: {
    label: 'Tahap 1 Lolos',
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    border: 'border-indigo-200',
  },
  STAGE_2_REQUIRED: {
    label: 'Tahap 2: Verifikasi Kepemilikan',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-300',
  },
  STAGE_2_PASSED: {
    label: 'Tahap 2 Lolos',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
  },
  APPROVED: {
    label: 'Disetujui',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  READY_FOR_PICKUP: {
    label: 'Siap Diambil',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-300',
  },
  RETURNED: {
    label: 'Selesai / Dikembalikan',
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
  },
  REJECTED: {
    label: 'Ditolak',
    bg: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200',
  },
  CANCELLED: {
    label: 'Dibatalkan',
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    border: 'border-gray-200',
  },
};
