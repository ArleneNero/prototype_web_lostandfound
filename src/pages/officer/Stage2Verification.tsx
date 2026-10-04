import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Check, 
  X, 
  Smartphone, 
  Barcode, 
  Receipt, 
  FolderLock, 
  Image as ImageIcon, 
  FileQuestion, 
  KeyRound, 
  HelpCircle 
} from 'lucide-react';
import { OfficerOnlyBanner } from '../../components/OfficerOnlyBanner';
import { Modal } from '../../components/Modal';
import { useApp } from '../../store/AppContext';
import { Stage2MethodItem, Stage2MethodType } from '../../types';

export const Stage2Verification: React.FC = () => {
  const { 
    selectedClaimId, 
    claims, 
    items, 
    passStage2, 
    failStage2, 
    goBack, 
    navigateTo 
  } = useApp();

  const claim = claims.find(c => c.id === selectedClaimId) || claims[0];
  const item = items.find(i => i.id === claim?.itemId);

  const [methods, setMethods] = useState<Stage2MethodItem[]>([
    {
      id: 'm1',
      name: 'Device/Account Association',
      result: 'PASS',
      notes: 'Mahasiswa menunjukkan perangkat AirPods terhubung dengan Apple ID miliknya saat berada di hadapan petugas.',
    },
    {
      id: 'm2',
      name: 'Cocokkan Serial Number',
      result: 'PASS',
      notes: 'Serial number fisik cocok dengan invoice pembelian iBox (akhiran ...H7K9).',
    },
    {
      id: 'm3',
      name: 'Buka/Kontrol Perangkat',
      result: 'NOT_APPLICABLE',
      notes: '',
    },
    {
      id: 'm4',
      name: 'Bukti Pembelian',
      result: 'PASS',
      notes: 'Invoice digital resmi dilampirkan.',
    },
    {
      id: 'm5',
      name: 'Cocokkan Isi Tersembunyi',
      result: 'NOT_APPLICABLE',
      notes: '',
    },
    {
      id: 'm6',
      name: 'Foto Kepemilikan',
      result: 'NOT_APPLICABLE',
      notes: '',
    },
  ]);

  const [officerNotes, setOfficerNotes] = useState(
    'Pengaju datang langsung ke ruang Lost & Found Gedung 1 dan mampu membuktikan kontrol perangkat serta memperlihatkan invoice resmi.'
  );

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReasonInternal, setRejectReasonInternal] = useState('Pengaju gagal membuktikan kontrol perangkat dan tidak dapat menunjukkan serial number yang cocok.');
  const [rejectReasonStudent, setRejectReasonStudent] = useState('Verifikasi kepemilikan tahap kedua belum berhasil memenuhi kriteria bukti.');

  const handleResultChange = (id: string, result: 'PASS' | 'FAIL' | 'NOT_APPLICABLE') => {
    setMethods(prev => prev.map(m => m.id === id ? { ...m, result } : m));
  };

  const handleMethodNotesChange = (id: string, notes: string) => {
    setMethods(prev => prev.map(m => m.id === id ? { ...m, notes } : m));
  };

  const handleApproveOwnership = () => {
    passStage2(claim.id, methods, officerNotes);
    navigateTo('officer-claim-detail', { claimId: claim.id });
  };

  const handleConfirmReject = () => {
    failStage2(claim.id, rejectReasonInternal, rejectReasonStudent, officerNotes);
    setShowRejectModal(false);
    navigateTo('officer-claim-detail', { claimId: claim.id });
  };

  const getMethodIcon = (name: Stage2MethodType) => {
    switch (name) {
      case 'Buka/Kontrol Perangkat':
        return <Smartphone className="w-4 h-4 text-primary" />;
      case 'Cocokkan Serial Number':
        return <Barcode className="w-4 h-4 text-indigo-600" />;
      case 'Bukti Pembelian':
        return <Receipt className="w-4 h-4 text-emerald-600" />;
      case 'Device/Account Association':
        return <ShieldCheck className="w-4 h-4 text-blue-600" />;
      case 'Cocokkan Isi Tersembunyi':
        return <FolderLock className="w-4 h-4 text-amber-600" />;
      case 'Foto Kepemilikan':
        return <ImageIcon className="w-4 h-4 text-pink-600" />;
      default:
        return <FileQuestion className="w-4 h-4 text-gray-500" />;
    }
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
            <h2 className="text-base font-bold text-gray-900">Verifikasi Tahap 2</h2>
            <p className="text-[11px] text-gray-500">Ownership / Control Verification</p>
          </div>
        </div>

        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
          Tahap 2
        </span>
      </div>

      <main className="p-4 space-y-4">
        {/* Claimant and Item Header */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Pengaju Klaim</span>
            <h4 className="font-extrabold text-sm text-gray-900">{claim?.claimantName}</h4>
            <p className="text-xs text-gray-500">{claim?.claimantDept} • {claim?.claimantNim}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-gray-400 uppercase">Barang</span>
            <h4 className="font-bold text-xs text-gray-800 truncate max-w-[140px]">{item?.title}</h4>
            <p className="text-[10px] font-mono text-gray-500">{claim?.claimCode}</p>
          </div>
        </div>

        {/* Identity Check Notice */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-900 flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px]">
            <strong>Pemeriksaan Tatap Muka:</strong> Pastikan pengaju menunjukkan Kartu Tanda Mahasiswa (KTM) Budi Luhur asli sebelum melakukan pengujian pembuktian kepemilikan independen.
          </p>
        </div>

        {/* Selectable Stage 2 Methods */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Metode Pembuktian Independen
            </h3>
            <span className="text-[10px] text-gray-400">Pilih & nilai yang sesuai</span>
          </div>

          <div className="space-y-3">
            {methods.map((m) => {
              return (
                <div key={m.id} className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-subtle space-y-2.5 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
                        {getMethodIcon(m.name)}
                      </div>
                      <h4 className="font-bold text-xs text-gray-900">{m.name}</h4>
                    </div>
                  </div>

                  {/* Radio selector: PASS / FAIL / NOT_APPLICABLE */}
                  <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                    <button
                      type="button"
                      onClick={() => handleResultChange(m.id, 'PASS')}
                      className={`py-1 px-2 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                        m.result === 'PASS'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      ✓ Terbukti (Pass)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleResultChange(m.id, 'FAIL')}
                      className={`py-1 px-2 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                        m.result === 'FAIL'
                          ? 'bg-red-600 text-white border-red-600 shadow-xs'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      ✕ Gagal (Fail)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleResultChange(m.id, 'NOT_APPLICABLE')}
                      className={`py-1 px-2 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                        m.result === 'NOT_APPLICABLE'
                          ? 'bg-gray-500 text-white border-gray-500 shadow-xs'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      Tidak Berlaku
                    </button>
                  </div>

                  {m.result !== 'NOT_APPLICABLE' && (
                    <input
                      type="text"
                      value={m.notes}
                      onChange={(e) => handleMethodNotesChange(m.id, e.target.value)}
                      placeholder="Catatan pengujian metode ini..."
                      className="w-full px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-800 outline-none"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Officer Final Notes */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-2">
          <label className="block text-xs font-bold text-gray-700">
            Catatan Akhir Verifikasi Petugas
          </label>
          <textarea
            rows={2}
            value={officerNotes}
            onChange={(e) => setOfficerNotes(e.target.value)}
            placeholder="Observasi akhir sebelum menyetujui kepemilikan..."
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowRejectModal(true)}
            className="py-3 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-red-600/20 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Tolak Klaim</span>
          </button>

          <button
            type="button"
            onClick={handleApproveOwnership}
            className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-emerald-600/30 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Setujui Kepemilikan</span>
          </button>
        </div>
      </main>

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Tolak Klaim (Tahap 2)"
        footer={
          <>
            <button
              onClick={() => setShowRejectModal(false)}
              className="px-3 py-1.5 text-xs text-gray-600 font-semibold hover:bg-gray-100 rounded-lg"
            >
              Batal
            </button>
            <button
              onClick={handleConfirmReject}
              className="px-4 py-1.5 text-xs bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
            >
              Konfirmasi Tolak
            </button>
          </>
        }
      >
        <div className="space-y-3 text-left">
          <p className="text-xs text-red-600 font-medium">
            Klaim ini akan ditandai Ditolak dan mahasiswa akan diberitahu tanpa membocorkan rincian teknis internal.
          </p>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Catatan Internal:
            </label>
            <textarea
              rows={2}
              value={rejectReasonInternal}
              onChange={(e) => setRejectReasonInternal(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
