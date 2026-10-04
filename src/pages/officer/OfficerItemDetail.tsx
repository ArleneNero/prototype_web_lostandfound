import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Lock, 
  ShieldCheck, 
  ClipboardList, 
  ChevronRight, 
  Archive, 
  Warehouse 
} from 'lucide-react';
import { StatusBadge } from '../../components/StatusBadge';
import { OfficerOnlyBanner } from '../../components/OfficerOnlyBanner';
import { useApp } from '../../store/AppContext';

export const OfficerItemDetail: React.FC = () => {
  const { 
    selectedItemId, 
    items, 
    verificationSecrets, 
    claims, 
    goBack, 
    navigateTo 
  } = useApp();

  const item = items.find(i => i.id === selectedItemId) || items[0];
  const secret = verificationSecrets[item.id];
  const itemClaims = claims.filter(c => c.itemId === item.id);

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
            <h2 className="text-base font-bold text-gray-900 truncate max-w-[200px]">{item.title}</h2>
            <p className="text-[10px] text-gray-500 font-mono">{item.itemCode}</p>
          </div>
        </div>

        <StatusBadge status={item.status} size="sm" />
      </div>

      <main className="p-4 space-y-4">
        {/* Thumbnail & Basics */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle flex gap-4">
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
            <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
              {item.category}
            </span>
            <h3 className="font-extrabold text-gray-900 text-sm">{item.title}</h3>
            <p className="text-[11px] text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
              <span className="truncate">{item.location}</span>
            </p>
            <p className="text-[11px] text-gray-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gray-400 shrink-0" />
              <span>{item.date}</span>
            </p>
          </div>
        </div>

        {/* Physical Storage Details */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-2">
          <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <Warehouse className="w-4 h-4 text-primary" />
            <span>Penyimpanan Fisik</span>
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="p-2.5 bg-gray-50 rounded-xl">
              <span className="text-[10px] text-gray-400 uppercase font-semibold block">Lokasi Rak/Brankas:</span>
              <span className="font-bold text-gray-800">{item.storageLocation || 'Rak Penyimpanan Utama'}</span>
            </div>
            <div className="p-2.5 bg-gray-50 rounded-xl">
              <span className="text-[10px] text-gray-400 uppercase font-semibold block">Kondisi:</span>
              <span className="font-bold text-gray-800">{item.condition || 'Baik'}</span>
            </div>
          </div>
        </div>

        {/* Hidden Verification Secrets (Officer Only!) */}
        <div className="space-y-2">
          <OfficerOnlyBanner />

          {secret ? (
            <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 space-y-3 text-xs">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase tracking-wider border-b border-amber-200/80 pb-2">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Kunci Rahasia Verifikasi (Tersimpan)</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-amber-700 uppercase block">Titik Penemuan Tepat:</span>
                <p className="text-gray-900 font-medium mt-0.5">{secret.exactDiscoveryLocation}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-amber-700 uppercase block">Ciri Fisik Unik / Cacat:</span>
                <p className="text-gray-900 font-medium mt-0.5">{secret.distinctiveMarks}</p>
              </div>

              {secret.accessories && (
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase block">Aksesori Menempel:</span>
                  <p className="text-gray-900 font-medium mt-0.5">{secret.accessories}</p>
                </div>
              )}

              {secret.serialFragment && (
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase block">Fragmen Serial:</span>
                  <p className="text-gray-900 font-mono font-bold mt-0.5">{secret.serialFragment}</p>
                </div>
              )}

              {secret.concealedContents && (
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase block">Isi Tersembunyi:</span>
                  <p className="text-gray-900 font-medium mt-0.5">{secret.concealedContents}</p>
                </div>
              )}

              {secret.privateNotes && (
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase block">Catatan Petugas:</span>
                  <p className="text-gray-700 italic mt-0.5">{secret.privateNotes}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-500 text-center">
              Belum ada data rahasia tambahan untuk item ini.
            </div>
          )}
        </div>

        {/* Associated Claims for this item */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4 text-primary" />
              <span>Pengajuan Klaim Terkait ({itemClaims.length})</span>
            </h4>
          </div>

          {itemClaims.length > 0 ? (
            <div className="space-y-2">
              {itemClaims.map(claim => (
                <div
                  key={claim.id}
                  onClick={() => navigateTo('officer-claim-detail', { claimId: claim.id })}
                  className="p-3 bg-gray-50 hover:bg-blue-50/50 border border-gray-200 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-gray-900">{claim.claimantName}</span>
                      <StatusBadge status={claim.status} size="sm" />
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">{claim.claimCode}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 text-center py-3">
              Belum ada mahasiswa yang mengajukan klaim untuk barang ini.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};
