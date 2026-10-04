import React from 'react';
import { ItemStatus, ClaimStatus } from '../types';

interface StatusBadgeProps {
  status: ItemStatus | ClaimStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  switch (status) {
    case 'FOUND':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Ditemukan
        </span>
      );
    case 'LOST':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-red-50 text-red-600 border border-red-200/80 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          Hilang
        </span>
      );
    case 'CLAIMED_PENDING':
    case 'STAGE_1_REVIEW':
    case 'STAGE_1_PASSED':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          Dalam Verifikasi
        </span>
      );
    case 'STAGE_2_REQUIRED':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300 font-semibold ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
          Perlu Tahap 2
        </span>
      );
    case 'STAGE_2_PASSED':
    case 'APPROVED':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Disetujui
        </span>
      );
    case 'READY_FOR_PICKUP':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-300 font-semibold ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
          Siap Diambil
        </span>
      );
    case 'RETURNED':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
          Selesai (Dikembalikan)
        </span>
      );
    case 'REJECTED':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 ${sizeClasses}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
          Ditolak
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 ${sizeClasses}`}>
          {status}
        </span>
      );
  }
};
