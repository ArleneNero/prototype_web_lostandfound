import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  X, 
  HelpCircle, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle 
} from 'lucide-react';
import { OfficerOnlyBanner } from '../../components/OfficerOnlyBanner';
import { Modal } from '../../components/Modal';
import { useApp } from '../../store/AppContext';
import { CheckVerificationState, Stage1Checklist } from '../../types';

export const Stage1Verification: React.FC = () => {
  const { 
    selectedClaimId, 
    claims, 
    items, 
    verificationSecrets, 
    passStage1, 
    failStage1, 
    goBack, 
    navigateTo 
  } = useApp();

  const claim = claims.find(c => c.id === selectedClaimId) || claims[0];
  const item = items.find(i => i.id === claim?.itemId);
  const secret = item ? verificationSecrets[item.id] : undefined;

  // 6 checklist criteria
  const [checks, setChecks] = useState<Stage1Checklist>({
    campusAccountValid: 'SESUAI',
    lossLocationValid: 'SESUAI',
    lossTimeValid: 'SESUAI',
    distinctiveFeatureValid: 'SESUAI',
    narrativeConsistent: 'SESUAI',
    evidenceConsidered: 'SESUAI',
  });

  const [officerNotes, setOfficerNotes] = useState(
    'Ciri goresan pada case transparan cocok dengan catatan intake petugas di bawah kursi E-304.'
  );

  // Reject modal state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReasonInternal, setRejectReasonInternal] = useState('Ciri khusus yang disebutkan tidak sesuai dengan fisik barang yang diamankan.');
  const [rejectReasonStudent, setRejectReasonStudent] = useState('Informasi atau bukti yang diberikan belum cukup untuk memastikan kepemilikan barang.');

  const handleCheckChange = (key: keyof Stage1Checklist, val: CheckVerificationState) => {
    setChecks(prev => ({ ...prev, [key]: val }));
  };

  const handlePass = () => {
    passStage1(claim.id, checks, officerNotes);
    navigateTo('officer-claim-detail', { claimId: claim.id });
  };

  const handleConfirmReject = () => {
    failStage1(claim.id, rejectReasonInternal, rejectReasonStudent, officerNotes);
    setShowRejectModal(false);
    navigateTo('officer-claim-detail', { claimId: claim.id });
  };

  const checklistItems: Array<{ key: keyof Stage1Checklist; title: string; hint: string }> = [
    {
      key: 'campusAccountValid',
      title: 'Identitas Akun Kampus Valid',
      hint: `NIM ${claim?.claimantNim} terdaftar sebagai mahasiswa aktif UBL`,
    },
    {
      key: 'lossLocationValid',
      title: 'Lokasi Kehilangan Masuk Akal & Sesuai',
      hint: `Pengaju: "${claim?.lossLocation}" vs Rahasia: "${secret?.exactDiscoveryLocation || item?.location}"`,
    },
    {
      key: 'lossTimeValid',
      title: 'Perkiraan Waktu & Kronologi Masuk Akal',
      hint: `Waktu lapor: ${claim?.lossTime}`,
    },
    {
      key: 'distinctiveFeatureValid',
      title: 'Ciri Khusus Rahasia Cocok',
      hint: `Pengaju: "${claim?.distinctiveFeature}" vs Rahasia: "${secret?.distinctiveMarks || 'Goresan/stiker khusus'}"`,
    },
    {
      key: 'narrativeConsistent',
      title: 'Narasi Klaim Konsisten',
      hint: 'Alur kronologis tidak bertentangan dengan fakta lapangan',
    },
    {
      key: 'evidenceConsidered',
      title: 'Bukti Pendukung Terlampir Relevan',
      hint: `${claim?.evidence?.length || 0} lampiran bukti pendukung diperiksa`,
    },
  ];

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
            <h2 className="text-base font-bold text-gray-900">Verifikasi Tahap 1</h2>
            <p className="text-[11px] text-gray-500">Knowledge Verification</p>
          </div>
        </div>

        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          Dalam Verifikasi
        </span>
      </div>

      <main className="p-4 space-y-4">
        <OfficerOnlyBanner />

        {/* Claim and Item Header Card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-gray-900">{claim?.claimantName}</span>
            <span className="font-mono text-gray-500">{claim?.claimCode}</span>
          </div>
          <p className="text-xs text-gray-600">
            Target Barang: <strong>{item?.title}</strong> ({item?.itemCode})
          </p>
        </div>

        {/* Comparison Snippet */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3.5 space-y-2 text-xs">
          <h4 className="font-bold text-amber-900 uppercase tracking-wide text-[10px]">
            Perbandingan Ciri Fisik:
          </h4>
          <div className="space-y-1.5">
            <div className="bg-white/80 p-2 rounded-lg border border-amber-200/60">
              <span className="text-[10px] font-bold text-gray-500 block">Klaim Mahasiswa:</span>
              <p className="font-semibold text-gray-800">"{claim?.distinctiveFeature}"</p>
            </div>
            <div className="bg-amber-100/70 p-2 rounded-lg border border-amber-300">
              <span className="text-[10px] font-bold text-amber-800 block">Kunci Rahasia Petugas:</span>
              <p className="font-bold text-amber-950">"{secret?.distinctiveMarks}"</p>
            </div>
          </div>
        </div>

        {/* Checklist Verifikasi */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-4">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            Checklist Evaluasi Pengetahuan
          </h3>

          <div className="space-y-3.5">
            {checklistItems.map((item) => {
              const currentValue = checks[item.key];

              return (
                <div key={item.key} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-2 text-left">
                  <div>
                    <h5 className="font-bold text-xs text-gray-900">{item.title}</h5>
                    <p className="text-[10px] text-gray-500 leading-tight mt-0.5">{item.hint}</p>
                  </div>

                  {/* 3 Radio options */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1">
                    {(['SESUAI', 'TIDAK_SESUAI', 'TIDAK_DAPAT_DIVERIFIKASI'] as const).map((opt) => {
                      const isSelected = currentValue === opt;
                      let label = 'Sesuai';
                      let activeStyle = 'bg-emerald-600 text-white border-emerald-600';
                      if (opt === 'TIDAK_SESUAI') {
                        label = 'Tidak Sesuai';
                        activeStyle = 'bg-red-600 text-white border-red-600';
                      }
                      if (opt === 'TIDAK_DAPAT_DIVERIFIKASI') {
                        label = 'Ragu / N/A';
                        activeStyle = 'bg-amber-600 text-white border-amber-600';
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleCheckChange(item.key, opt)}
                          className={`py-1.5 px-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer text-center ${
                            isSelected
                              ? `${activeStyle} shadow-xs`
                              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Catatan Internal Petugas (Wajib jika menolak)
            </label>
            <textarea
              rows={2}
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
              placeholder="Berikan alasan atau observasi petugas..."
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none"
            />
          </div>
        </div>

        {/* Notice: Passing Stage 1 moves to Stage 2 */}
        <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-[11px] text-blue-900 space-y-1">
          <p className="font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            Aturan Bisnis Tahap 1:
          </p>
          <p className="text-blue-800 leading-relaxed">
            Menyetujui Tahap 1 <strong>TIDAK langsung menyerahkan barang</strong>. Status akan beralih ke <strong>Tahap 2 (Verifikasi Kepemilikan)</strong> untuk pembuktian independen di ruang Lost & Found.
          </p>
        </div>

        {/* Action Buttons matching reference screen 21 */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowRejectModal(true)}
            className="py-3 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-red-600/20 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Tidak Lolos (Tolak)</span>
          </button>

          <button
            type="button"
            onClick={handlePass}
            className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-emerald-600/30 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Lolos Tahap 1</span>
          </button>
        </div>
      </main>

      {/* Reject Modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Tolak Klaim (Tahap 1)"
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
          <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl text-[11px] text-red-800">
            <strong>Aturan Privasi Penolakan:</strong> Jawaban rahasia tidak akan dibocorkan kepada mahasiswa agar tidak memicu tebakan berulang.
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Alasan Internal Petugas:
            </label>
            <textarea
              rows={2}
              value={rejectReasonInternal}
              onChange={(e) => setRejectReasonInternal(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Pesan yang Ditampilkan ke Mahasiswa:
            </label>
            <textarea
              rows={2}
              value={rejectReasonStudent}
              onChange={(e) => setRejectReasonStudent(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
