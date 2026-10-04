import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  KeyRound, 
  ShieldCheck, 
  Copy, 
  UserCheck, 
  PackageCheck, 
  CheckCircle2 
} from 'lucide-react';
import { Modal } from '../../components/Modal';
import { useApp } from '../../store/AppContext';

export const PickupConfirmation: React.FC = () => {
  const { 
    selectedClaimId, 
    claims, 
    items, 
    confirmPickup, 
    currentUser, 
    goBack, 
    navigateTo, 
    showToast 
  } = useApp();

  const claim = claims.find(c => c.id === selectedClaimId) || claims[0];
  const item = items.find(i => i.id === claim?.itemId);

  const [inputCode, setInputCode] = useState(claim?.pickupCode || '7K4P9');
  const [checkCode, setCheckCode] = useState(true);
  const [checkId, setCheckId] = useState(true);
  const [checkClaimant, setCheckClaimant] = useState(true);
  const [checkPhysicalHandover, setCheckPhysicalHandover] = useState(true);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const allChecked = checkCode && checkId && checkClaimant && checkPhysicalHandover;

  const handleExecutePickup = () => {
    confirmPickup(claim.id, currentUser?.name || 'Bpk. Hendra Gunawan');
    setShowConfirmModal(false);
    navigateTo('officer-items');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24 max-w-md mx-auto relative shadow-xl">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white px-4 py-3 border-b border-gray-100 shadow-subtle flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-bold text-gray-900">Konfirmasi Pengambilan</h2>
            <p className="text-[11px] text-gray-500 font-mono">{claim?.claimCode}</p>
          </div>
        </div>

        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
          Siap Diambil
        </span>
      </div>

      <main className="p-4 space-y-4 text-center">
        {/* Visual Header matching reference screen 22 */}
        <div className="w-20 h-20 rounded-full bg-blue-50 border-4 border-blue-100 flex items-center justify-center text-primary mx-auto shadow-sm">
          <PackageCheck className="w-10 h-10 stroke-[2.2]" />
        </div>

        <div>
          <h3 className="text-lg font-black text-gray-900">
            Serah Terima Barang Fisik
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto mt-0.5">
            Cocokkan kode pengambilan dari layar mahasiswa sebelum menyerahkan barang fisik.
          </p>
        </div>

        {/* Claim & Claimant Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase">Penerima Sah:</span>
            <span className="text-xs font-bold text-primary">{claim?.claimantNim}</span>
          </div>
          <h4 className="text-sm font-extrabold text-gray-900">{claim?.claimantName}</h4>
          <p className="text-xs text-gray-500">{claim?.claimantDept} • {claim?.claimantEmail}</p>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500">Barang yang diserahkan:</span>
            <span className="font-bold text-gray-800">{item?.title}</span>
          </div>
        </div>

        {/* Prominent Pickup Code Display */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-center space-y-2">
          <span className="text-[11px] font-bold text-blue-800 uppercase tracking-widest block">
            Kode Pengambilan Terdaftar
          </span>
          <div className="flex items-center justify-center gap-2">
            <div className="bg-white px-6 py-2.5 rounded-xl border border-blue-300 shadow-sm">
              <span className="text-2xl font-black text-gray-900 tracking-[0.3em] font-mono">
                {claim?.pickupCode || '7K4P9'}
              </span>
            </div>
          </div>
          <p className="text-[10px] text-blue-700">
            Pastikan kode yang ditunjukkan mahasiswa sama persis dengan kode di atas.
          </p>
        </div>

        {/* Mandatory Handover Checklist */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle text-left space-y-3">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            Checklist Serah Terima Fisik
          </h4>

          <div className="space-y-2.5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkCode}
                onChange={(e) => setCheckCode(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary shrink-0"
              />
              <span className="text-xs text-gray-800 font-medium">
                Kode pengambilan cocok dengan perangkat mahasiswa
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkId}
                onChange={(e) => setCheckId(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary shrink-0"
              />
              <span className="text-xs text-gray-800 font-medium">
                Identitas mahasiswa (KTM Budi Luhur) telah diperiksa
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkClaimant}
                onChange={(e) => setCheckClaimant(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary shrink-0"
              />
              <span className="text-xs text-gray-800 font-medium">
                Pengambil cocok dengan pemegang klaim yang telah disetujui
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={checkPhysicalHandover}
                onChange={(e) => setCheckPhysicalHandover(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary shrink-0"
              />
              <span className="text-xs text-gray-800 font-medium">
                Barang fisik telah diserahkan langsung ke tangan mahasiswa
              </span>
            </label>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          disabled={!allChecked}
          onClick={() => setShowConfirmModal(true)}
          className="w-full py-3.5 bg-primary hover:bg-primary-dark active:bg-primary-dark text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Tandai Sudah Diambil (Selesai)</span>
        </button>
      </main>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Konfirmasi Penyerahan Barang"
        footer={
          <>
            <button
              onClick={() => setShowConfirmModal(false)}
              className="px-3 py-1.5 text-xs text-gray-600 font-semibold hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={handleExecutePickup}
              className="px-4 py-2 text-xs bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 cursor-pointer shadow-sm"
            >
              Ya, Serahkan Barang
            </button>
          </>
        }
      >
        <div className="space-y-2 text-left">
          <p className="text-xs text-gray-800 leading-relaxed font-semibold">
            Pastikan barang telah benar-benar diserahkan kepada pemilik yang terverifikasi.
          </p>
          <p className="text-[11px] text-gray-500">
            Tindakan ini akan mengubah status klaim dan status barang menjadi <strong>RETURNED (Selesai)</strong>, mencatat audit petugas, serta mengirimkan notifikasi konfirmasi ke akun mahasiswa.
          </p>
        </div>
      </Modal>
    </div>
  );
};
