import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldAlert, Plus, CheckCircle2, Lock } from 'lucide-react';
import { OfficerOnlyBanner } from '../../components/OfficerOnlyBanner';
import { useApp } from '../../store/AppContext';

export const HiddenVerificationForm: React.FC = () => {
  const { goBack, navigateTo, addOfficialFoundItem, showToast } = useApp();

  const [itemDraft, setItemDraft] = useState<any>(null);

  const [exactLocation, setExactLocation] = useState('Ditemukan tepat di bawah meja baris ke-3 dekat pintu ruang kelas E-304');
  const [distinctiveMarks, setDistinctiveMarks] = useState('Goresan kecil halus di sudut kanan bawah case penutup');
  const [accessory, setAccessory] = useState('Terpasang casing silikon bening transparan dengan ring gantungan kecil');
  const [serialFragment, setSerialFragment] = useState('Nomor seri berakhiran ...H7K9');
  const [concealedContents, setConcealedContents] = useState('');
  const [privateNotes, setPrivateNotes] = useState('Diserahkan oleh cleaning service (Pak Joko) pada pukul 13.50 WIB.');
  const [customFields, setCustomFields] = useState<Array<{ label: string; value: string }>>([]);

  useEffect(() => {
    const saved = sessionStorage.getItem('ubl_item_draft');
    if (saved) {
      try {
        setItemDraft(JSON.parse(saved));
      } catch (e) { /* ignore */ }
    }
  }, []);

  const handleAddCustomField = () => {
    setCustomFields(prev => [...prev, { label: 'Ciri Khusus Tambahan', value: '' }]);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    const finalDraft = itemDraft || {
      title: 'AirPods Pro Baru',
      category: 'Elektronik',
      location: 'Gedung E, Lantai 2',
      date: '04 Okt 2026',
      time: '14:00 WIB',
      description: 'AirPods Pro warna putih dalam charging case.',
      images: ['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=400&q=80'],
      storageLocation: 'Lemari Khusus A - Rak 2',
      condition: 'Baik',
    };

    const newId = addOfficialFoundItem(finalDraft, {
      exactDiscoveryLocation: exactLocation,
      distinctiveMarks: distinctiveMarks,
      accessories: accessory,
      serialFragment: serialFragment,
      concealedContents: concealedContents,
      privateNotes: privateNotes,
    });

    sessionStorage.removeItem('ubl_item_draft');
    navigateTo('officer-items');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24 max-w-md mx-auto relative shadow-xl">
      <div className="sticky top-0 z-20 bg-white px-4 py-3 border-b border-gray-100 shadow-subtle flex items-center gap-3">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-bold text-gray-900">Data Verifikasi Internal</h2>
          <p className="text-[11px] text-gray-500">Tahap 2: Kunci Rahasia Verifikasi</p>
        </div>
      </div>

      <form onSubmit={handlePublish} className="p-4 space-y-4">
        {/* Warning Banner */}
        <OfficerOnlyBanner customText="Informasi pada halaman ini adalah KUNCI RAHASIA yang akan dicocokkan saat mahasiswa mengajukan klaim. Jangan pernah dibagikan kepada publik." />

        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-3.5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
            <Lock className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Kunci Jawaban Verifikasi Tahap 1
            </h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Titik spesifik lokasi penemuan *
            </label>
            <p className="text-[10px] text-gray-400 mb-1">
              Hanya diketahui oleh penemu dan pemilik sebenarnya.
            </p>
            <textarea
              rows={2}
              value={exactLocation}
              onChange={(e) => setExactLocation(e.target.value)}
              placeholder="Contoh: Di bawah meja baris ke-3 dekat pintu kelas E-304"
              className="w-full px-3 py-2 bg-amber-50/40 border border-amber-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-amber-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Ciri fisik unik / cacat / goresan *
            </label>
            <textarea
              rows={2}
              value={distinctiveMarks}
              onChange={(e) => setDistinctiveMarks(e.target.value)}
              placeholder="Contoh: Goresan halus di sisi kanan bawah, stiker kecil pudar"
              className="w-full px-3 py-2 bg-amber-50/40 border border-amber-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-amber-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Aksesori / Casing yang menempel
            </label>
            <input
              type="text"
              value={accessory}
              onChange={(e) => setAccessory(e.target.value)}
              placeholder="Contoh: Casing silikon transparan, gantungan tali biru"
              className="w-full px-3.5 py-2.5 bg-amber-50/40 border border-amber-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Fragmen nomor seri (Serial Fragment)
            </label>
            <input
              type="text"
              value={serialFragment}
              onChange={(e) => setSerialFragment(e.target.value)}
              placeholder="Contoh: ...H7K9 (Catat 4 digit terakhir)"
              className="w-full px-3.5 py-2.5 bg-amber-50/40 border border-amber-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Isi tersembunyi (Khusus Dompet / Tas)
            </label>
            <input
              type="text"
              value={concealedContents}
              onChange={(e) => setConcealedContents(e.target.value)}
              placeholder="Contoh: Ada kartu ATM BCA Flazz, kunci kontak di kantong dalam"
              className="w-full px-3.5 py-2.5 bg-amber-50/40 border border-amber-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Catatan intake internal petugas
            </label>
            <textarea
              rows={2}
              value={privateNotes}
              onChange={(e) => setPrivateNotes(e.target.value)}
              placeholder="Siapa yang menyerahkan, jam penyerahan, dan observasi petugas..."
              className="w-full px-3 py-2 bg-amber-50/40 border border-amber-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-amber-500 outline-none"
            />
          </div>

          {/* Dynamic custom fields */}
          {customFields.map((cf, idx) => (
            <div key={idx} className="space-y-1">
              <input
                type="text"
                value={cf.label}
                onChange={(e) => {
                  const updated = [...customFields];
                  updated[idx].label = e.target.value;
                  setCustomFields(updated);
                }}
                className="text-[11px] font-bold text-gray-700 bg-transparent outline-none w-full"
              />
              <input
                type="text"
                value={cf.value}
                onChange={(e) => {
                  const updated = [...customFields];
                  updated[idx].value = e.target.value;
                  setCustomFields(updated);
                }}
                placeholder="Nilai rahasia..."
                className="w-full px-3 py-2 bg-amber-50/40 border border-amber-200 rounded-xl text-xs text-gray-900 outline-none"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddCustomField}
            className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl text-xs border border-gray-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Tambah Ciri Verifikasi</span>
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Simpan & Terbitkan Listing Resmi</span>
        </button>
      </form>
    </div>
  );
};
