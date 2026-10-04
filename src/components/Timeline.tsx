import React from 'react';
import { Check, Clock, AlertCircle, X, KeyRound, CheckCircle2 } from 'lucide-react';
import { ClaimStatus } from '../types';

interface TimelineProps {
  status: ClaimStatus;
  createdAt: string;
  updatedAt?: string;
  pickupCode?: string;
}

interface StepItem {
  key: string;
  title: string;
  description: string;
  date?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ status, createdAt, updatedAt, pickupCode }) => {
  const steps: StepItem[] = [
    {
      key: 'SUBMITTED',
      title: 'Klaim Diajukan',
      description: 'Pengajuan klaim berhasil dicatat ke sistem.',
      date: createdAt ? new Date(createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '29 Sep 2026 14:10',
    },
    {
      key: 'STAGE_1',
      title: 'Verifikasi Tahap 1 (Pengetahuan)',
      description: 'Petugas mencocokkan ciri khusus & lokasi rahasia.',
      date: status !== 'CLAIM_SUBMITTED' ? (updatedAt ? new Date(updatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '30 Sep 2026') : undefined,
    },
    {
      key: 'STAGE_2',
      title: 'Verifikasi Tahap 2 (Bukti Kepemilikan)',
      description: 'Verifikasi penguasaan perangkat / nota / ciri tersembunyi.',
    },
    {
      key: 'APPROVED',
      title: 'Disetujui & Kode Pengambilan',
      description: pickupCode ? `Kode Verifikasi Pengambilan: ${pickupCode}` : 'Menunggu persetujuan final petugas.',
    },
    {
      key: 'RETURNED',
      title: 'Barang Telah Diserahkan (Selesai)',
      description: 'Serah terima fisik selesai di ruang Lost & Found UBL.',
    },
  ];

  // Helper to determine step state
  const getStepState = (stepIndex: number): 'completed' | 'current' | 'pending' | 'rejected' => {
    if (status === 'REJECTED') {
      if (stepIndex === 0) return 'completed';
      if (stepIndex === 1) return 'rejected';
      return 'pending';
    }

    switch (status) {
      case 'CLAIM_SUBMITTED':
        if (stepIndex === 0) return 'completed';
        if (stepIndex === 1) return 'current';
        return 'pending';
      case 'STAGE_1_REVIEW':
        if (stepIndex === 0) return 'completed';
        if (stepIndex === 1) return 'current';
        return 'pending';
      case 'STAGE_1_PASSED':
      case 'STAGE_2_REQUIRED':
        if (stepIndex <= 1) return 'completed';
        if (stepIndex === 2) return 'current';
        return 'pending';
      case 'STAGE_2_PASSED':
      case 'APPROVED':
        if (stepIndex <= 2) return 'completed';
        if (stepIndex === 3) return 'completed';
        if (stepIndex === 4) return 'current';
        return 'pending';
      case 'READY_FOR_PICKUP':
        if (stepIndex <= 3) return 'completed';
        if (stepIndex === 4) return 'current';
        return 'pending';
      case 'RETURNED':
        return 'completed';
      default:
        return 'pending';
    }
  };

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
      {steps.map((step, idx) => {
        const state = getStepState(idx);

        let iconNode = (
          <div className="w-5 h-5 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          </div>
        );

        if (state === 'completed') {
          iconNode = (
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm shadow-emerald-500/30">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          );
        } else if (state === 'current') {
          iconNode = (
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-sm shadow-blue-500/40 animate-pulse">
              <Clock className="w-3.5 h-3.5" />
            </div>
          );
        } else if (state === 'rejected') {
          iconNode = (
            <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-sm shadow-red-500/30">
              <X className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          );
        }

        return (
          <div key={step.key} className="relative flex items-start gap-3">
            <div className="absolute -left-6 -translate-x-1/2 top-0.5 z-10 bg-[#F7F9FC] py-0.5">
              {iconNode}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className={`text-xs font-bold ${
                  state === 'completed' ? 'text-gray-900' :
                  state === 'current' ? 'text-primary font-extrabold' :
                  state === 'rejected' ? 'text-red-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </h4>
                {step.date && (
                  <span className="text-[10px] text-gray-400 font-normal shrink-0">
                    {step.date}
                  </span>
                )}
              </div>
              <p className={`text-[11px] mt-0.5 leading-relaxed ${
                state === 'completed' || state === 'current' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
