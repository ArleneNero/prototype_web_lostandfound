import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface OfficerOnlyBannerProps {
  customText?: string;
}

export const OfficerOnlyBanner: React.FC<OfficerOnlyBannerProps> = ({ customText }) => {
  return (
    <div className="bg-amber-50 border border-amber-200/90 rounded-xl p-3 text-amber-900 shadow-sm flex items-start gap-2.5">
      <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      <div className="text-xs">
        <h5 className="font-bold text-amber-800 uppercase tracking-wider text-[11px] mb-0.5">
          Data Verifikasi Internal — Hanya Petugas
        </h5>
        <p className="text-amber-700 leading-relaxed">
          {customText || 'Informasi pada bagian ini tidak boleh ditampilkan kepada pengaju klaim untuk mencegah percobaan tebakan (trial-and-error).'}
        </p>
      </div>
    </div>
  );
};
