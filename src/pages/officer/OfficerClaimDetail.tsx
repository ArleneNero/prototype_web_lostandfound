import React from 'react';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Hash, 
  MapPin, 
  Calendar, 
  FileText, 
  Image as ImageIcon, 
  Lock, 
  ShieldCheck, 
  ChevronRight, 
  AlertCircle 
} from 'lucide-react';
import { StatusBadge } from '../../components/StatusBadge';
import { OfficerOnlyBanner } from '../../components/OfficerOnlyBanner';
import { useApp } from '../../store/AppContext';

export const OfficerClaimDetail: React.FC = () => {
  const { 
    selectedClaimId, 
    claims, 
    items, 
    verificationSecrets, 
    goBack, 
    navigateTo 
  } = useApp();

  const claim = claims.find(c => c.id === selectedClaimId) || claims[0];
  const item = items.find(i => i.id === claim?.itemId);
  const secret = item ? verificationSecrets[item.id] : undefined;

  const isStage1 = claim?.status === 'CLAIM_SUBMITTED' || claim?.status === 'STAGE_1_REVIEW';
  const isStage2 = claim?.status === 'STAGE_2_REQUIRED' || claim?.status === 'STAGE_1_PASSED';
  const isReadyPickup = claim?.status === 'READY_FOR_PICKUP';
  const isReturned = claim?.status === 'RETURNED';
  const isRejected = claim?.status === 'REJECTED';

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24 max-w-md mx-auto relative shadow-xl">
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
            <h2 className="text-base font-bold text-gray-900">Detail Klaim</h2>
            <p className="text-[10px] text-gray-500 font-mono">{claim?.claimCode}</p>
          </div>
        </div>

        <StatusBadge status={claim?.status || 'STAGE_1_REVIEW'} size="sm" />
      </div>

      <main className="p-4 space-y-4">
        {/* Section: Informasi Barang */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Informasi Barang
          </h3>

          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
              <img
                src={item?.images[0] || 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=400&q=80'}
                alt={item?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-extrabold text-sm text-gray-900 truncate">
                {item?.title || 'AirPods Pro'}
              </h4>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="truncate">{item?.location}</span>
              </p>
              <p className="text-[11px] text-gray-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-400 shrink-0" />
                <span>Ditemukan: {item?.date}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Section: Informasi Pengaju (Claimant) */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Informasi Pengaju
          </h3>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-100 shrink-0">
              <img
                src={claim?.claimantAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                alt={claim?.claimantName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-extrabold text-sm text-gray-900 truncate">
                {claim?.claimantName}
              </h4>
              <p className="text-xs text-gray-600 truncate flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-gray-400" />
                NIM: {claim?.claimantNim}
              </p>
              <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                {claim?.claimantEmail}
              </p>
              <p className="text-[11px] text-primary font-medium mt-0.5">
                {claim?.claimantDept}
              </p>
            </div>
          </div>
        </div>

        {/* Section: Jawaban Pengaju Klaim */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-3.5">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">
            Jawaban Pengaju Klaim
          </h3>

          <div>
            <span className="text-[11px] font-bold text-gray-500 block mb-0.5">
              1. Mengapa yakin barang ini milikmu?
            </span>
            <p className="text-xs text-gray-900 bg-gray-50 p-2.5 rounded-xl border border-gray-100 leading-relaxed">
              {claim?.whyMine}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-bold text-gray-500 block mb-0.5">
              2. Di mana lokasi kehilangan?
            </span>
            <p className="text-xs text-gray-900 bg-gray-50 p-2.5 rounded-xl border border-gray-100 font-medium">
              {claim?.lossLocation}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-bold text-gray-500 block mb-0.5">
              3. Waktu terakhir kali memiliki?
            </span>
            <p className="text-xs text-gray-900 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              {claim?.lossTime}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-bold text-primary block mb-0.5">
              4. Ciri khusus yang dilaporkan pengaju:
            </span>
            <p className="text-xs text-gray-900 bg-blue-50/60 p-2.5 rounded-xl border border-blue-100 font-semibold leading-relaxed">
              "{claim?.distinctiveFeature}"
            </p>
          </div>

          {claim?.additionalInfo && (
            <div>
              <span className="text-[11px] font-bold text-gray-500 block mb-0.5">
                5. Keterangan tambahan:
              </span>
              <p className="text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                {claim?.additionalInfo}
              </p>
            </div>
          )}
        </div>

        {/* Section: Bukti Pendukung */}
        {claim?.evidence && claim.evidence.length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Lampiran Bukti Pendukung ({claim.evidence.length})
            </h3>
            <div className="space-y-2">
              {claim.evidence.map(ev => (
                <div key={ev.id} className="p-2.5 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    {ev.type === 'pdf' ? (
                      <FileText className="w-4 h-4 text-red-500 shrink-0" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-primary shrink-0" />
                    )}
                    <span className="font-semibold text-gray-800 truncate">{ev.name}</span>
                    <span className="text-[10px] text-gray-400 shrink-0">({ev.size})</span>
                  </div>
                  <span className="text-[10px] bg-blue-100 text-primary font-bold px-2 py-0.5 rounded">
                    Terlampir
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Data Rahasia Verifikasi Petugas */}
        <div className="space-y-2">
          <OfficerOnlyBanner />

          {secret && (
            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 text-xs space-y-2.5">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold uppercase tracking-wider border-b border-amber-200 pb-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Kunci Data Rahasia untuk Dicocokkan</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase block">Titik Tepat Penemuan:</span>
                <p className="text-gray-900 font-semibold">{secret.exactDiscoveryLocation}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase block">Ciri Fisik Unik Rahasia:</span>
                <p className="text-gray-900 font-semibold">{secret.distinctiveMarks}</p>
              </div>
              {secret.accessories && (
                <div>
                  <span className="text-[10px] font-bold text-amber-800 uppercase block">Aksesori Menempel:</span>
                  <p className="text-gray-900 font-semibold">{secret.accessories}</p>
                </div>
              )}
              {secret.serialFragment && (
                <div>
                  <span className="text-[10px] font-bold text-amber-800 uppercase block">Fragmen Serial:</span>
                  <p className="font-mono text-gray-900 font-bold">{secret.serialFragment}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rejection notice if already rejected */}
        {isRejected && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 space-y-1">
            <span className="font-bold block uppercase tracking-wider">Klaim Ini Telah Ditolak</span>
            <p>Alasan internal: {claim.rejectionReasonInternal || 'Tidak lolos kriteria verifikasi'}</p>
          </div>
        )}

        {/* Action Button */}
        {isStage1 && (
          <button
            onClick={() => navigateTo('officer-stage1', { claimId: claim.id })}
            className="w-full py-3.5 bg-primary hover:bg-primary-dark active:bg-primary-dark text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Mulai Verifikasi Tahap 1 (Pengetahuan)</span>
          </button>
        )}

        {isStage2 && (
          <button
            onClick={() => navigateTo('officer-stage2', { claimId: claim.id })}
            className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-amber-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Lanjutkan Verifikasi Kepemilikan Tahap 2</span>
          </button>
        )}

        {isReadyPickup && (
          <button
            onClick={() => navigateTo('officer-pickup-confirmation', { claimId: claim.id })}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Proses Serah Terima & Konfirmasi Pengambilan</span>
          </button>
        )}

        {isReturned && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-xs text-emerald-800 font-bold">
            ✓ Barang telah selesai diserahkan kepada pemilik yang sah.
          </div>
        )}
      </main>
    </div>
  );
};
