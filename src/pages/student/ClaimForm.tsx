import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  X, 
  ShieldCheck, 
  CheckSquare, 
  Info 
} from 'lucide-react';
import { useApp } from '../../store/AppContext';

export const ClaimForm: React.FC = () => {
  const { 
    selectedItemId, 
    items, 
    goBack, 
    navigateTo, 
    submitClaim, 
    showToast 
  } = useApp();

  const item = items.find(i => i.id === selectedItemId) || items[0];

  // Default pre-fills matching the AirPods demo flow
  const isAirPods = item.id.includes('airpods');

  const [whyMine, setWhyMine] = useState(
    isAirPods 
      ? 'Saya kehilangan AirPods Pro saat mengikuti praktikum Algoritma di Gedung E lantai 2 kemarin siang.' 
      : ''
  );
  const [lossLocation, setLossLocation] = useState(
    isAirPods 
      ? 'Gedung E Lantai 2, dekat ruang E-304' 
      : item.location
  );
  const [lossTime, setLossTime] = useState(
    isAirPods 
      ? '29 September 2026, sekitar jam 13.15 WIB' 
      : '04 Oktober 2026, jam 10:00 WIB'
  );
  const [distinctiveFeature, setDistinctiveFeature] = useState(
    isAirPods 
      ? 'Memakai casing silikon transparan, ada goresan kecil di sisi kanan bawah case, dan ada ring gantungan perak.' 
      : ''
  );
  const [additionalInfo, setAdditionalInfo] = useState(
    isAirPods 
      ? 'Saya memiliki screenshot Apple Find My iPhone yang mendeteksi lokasi terakhir perangkat di lingkungan kampus UBL.' 
      : ''
  );

  const [evidenceList, setEvidenceList] = useState<Array<{ id: string; name: string; type: 'image' | 'pdf'; size: string }>>([
    {
      id: 'ev-demo-1',
      name: 'Screenshot_Apple_FindMy.png',
      type: 'image',
      size: '1.4 MB'
    },
    {
      id: 'ev-demo-2',
      name: 'Invoice_iBox_Pembelian.pdf',
      type: 'pdf',
      size: '420 KB'
    }
  ]);

  const [acknowledged, setAcknowledged] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAddFakeEvidence = () => {
    const dummyNames = ['Foto_Kotak_Kemasan.jpg', 'Kuitansi_Pembelian.pdf', 'Bukti_Serial_Number.png'];
    const randomName = dummyNames[Math.floor(Math.random() * dummyNames.length)];
    const newEv = {
      id: `ev-${Date.now()}`,
      name: randomName,
      type: randomName.endsWith('.pdf') ? ('pdf' as const) : ('image' as const),
      size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`
    };
    setEvidenceList(prev => [...prev, newEv]);
    showToast(`Dokumen ${randomName} berhasil dilampirkan`, 'info');
  };

  const handleRemoveEvidence = (id: string) => {
    setEvidenceList(prev => prev.filter(e => e.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!whyMine.trim()) {
      setError('Harap jelaskan alasan mengapa barang ini milikmu.');
      return;
    }
    if (!lossLocation.trim()) {
      setError('Lokasi kehilangan wajib diisi.');
      return;
    }
    if (!distinctiveFeature.trim()) {
      setError('Sebutkan ciri khusus yang dapat diverifikasi petugas.');
      return;
    }
    if (!acknowledged) {
      setError('Anda harus menyetujui pernyataan verifikasi kepemilikan.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const code = submitClaim({
        itemId: item.id,
        whyMine,
        lossLocation,
        lossTime,
        distinctiveFeature,
        additionalInfo,
        evidence: evidenceList,
      });

      navigateTo('claim-success');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24 max-w-md mx-auto relative shadow-xl">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white px-4 py-3 border-b border-gray-100 shadow-subtle flex items-center gap-3">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-sm font-bold text-gray-900">Ajukan Klaim Barang</h2>
          <p className="text-[11px] text-gray-500">Target: {item.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-xs text-blue-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px]">
            Isi informasi seakurat mungkin. Jawabanmu akan dibandingkan langsung oleh petugas dengan data rahasia barang yang tidak ditampilkan ke publik.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Section 1: Informasi Klaim */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-3.5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Informasi Klaim
            </h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Mengapa kamu yakin barang ini milikmu? <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              value={whyMine}
              onChange={(e) => setWhyMine(e.target.value)}
              placeholder="Jelaskan secara detail situasi saat kamu kehilangan barang..."
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Di mana kamu kehilangan barang ini? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={lossLocation}
              onChange={(e) => setLossLocation(e.target.value)}
              placeholder="Contoh: Gedung E, Lantai 2 (dekat ruang E-304)"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Kapan terakhir kali kamu memilikinya? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={lossTime}
              onChange={(e) => setLossTime(e.target.value)}
              placeholder="Contoh: 29 September 2026, 13:15 WIB"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Sebutkan ciri khusus yang tidak terlihat di foto <span className="text-red-500">*</span>
            </label>
            <p className="text-[10px] text-gray-400 mb-1">
              Contoh: goresan khusus, stiker, casing terpasang, isi rahasia, atau nomor seri.
            </p>
            <textarea
              rows={2}
              value={distinctiveFeature}
              onChange={(e) => setDistinctiveFeature(e.target.value)}
              placeholder="Contoh: casing silikon transparan, ada baret di sisi kanan..."
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Informasi Tambahan (Opsional)
            </label>
            <input
              type="text"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Bukti kepemilikan lain yang kamu miliki..."
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        {/* Section 2: Bukti Pendukung */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-3">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <span className="w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Bukti Pendukung (Opsional)
            </h3>
          </div>

          {/* Fake Upload Area */}
          <div 
            onClick={handleAddFakeEvidence}
            className="border-2 border-dashed border-gray-200 hover:border-primary bg-gray-50/70 hover:bg-blue-50/30 rounded-xl p-4 text-center cursor-pointer transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-blue-50 text-primary flex items-center justify-center mx-auto mb-1.5">
              <Upload className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-gray-800">
              Klik untuk upload foto / dokumen bukti
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Foto lama barang, struk iBox/toko, screenshot akun/FindMy (Maks. 5MB)
            </p>
          </div>

          {/* Evidence List */}
          {evidenceList.length > 0 && (
            <div className="space-y-2 pt-1">
              {evidenceList.map((ev) => (
                <div key={ev.id} className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs">
                  <div className="flex items-center gap-2 truncate">
                    {ev.type === 'pdf' ? (
                      <FileText className="w-4 h-4 text-red-500 shrink-0" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-primary shrink-0" />
                    )}
                    <span className="font-medium text-gray-800 truncate">{ev.name}</span>
                    <span className="text-[10px] text-gray-400 shrink-0">({ev.size})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveEvidence(ev.id)}
                    className="text-gray-400 hover:text-red-500 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Pernyataan & Checkbox */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-primary rounded border-gray-300 focus:ring-primary shrink-0 cursor-pointer"
            />
            <span className="text-[11px] text-gray-600 leading-snug">
              Saya memahami bahwa mengajukan klaim tidak otomatis membuktikan kepemilikan dan saya mungkin diminta melakukan verifikasi lanjutan secara langsung di ruang Lost & Found UBL.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-primary hover:bg-primary-dark active:bg-primary-dark text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Kirim Klaim</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
