import React, { useState } from 'react';
import { ArrowLeft, ShieldAlert, PlusCircle } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { CATEGORIES } from '../../constants';
import { ItemCategory } from '../../types';
import { ImageUploadArea } from '../../components/ImageUploadArea';

export const FoundItemReport: React.FC = () => {
  const { goBack, navigateTo, submitFoundReport } = useApp();

  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState<ItemCategory>('Lainnya');
  const [discoveryLocation, setDiscoveryLocation] = useState('');
  const [discoveryDate, setDiscoveryDate] = useState('2026-10-04');
  const [discoveryTime, setDiscoveryTime] = useState('11:30');
  const [description, setDescription] = useState('');
  const [reporterPhone, setReporterPhone] = useState('0812-9876-5432');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!itemName.trim()) {
      setError('Nama barang temuan wajib diisi');
      return;
    }
    if (!discoveryLocation.trim()) {
      setError('Lokasi ditemukan wajib diisi');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      submitFoundReport({
        itemName,
        category,
        discoveryLocation,
        discoveryDate,
        discoveryTime,
        description,
        reporterPhone,
        images: photos,
      });

      navigateTo('found-handoff-instruction');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24 max-w-md mx-auto relative shadow-xl">
      <div className="sticky top-0 z-20 bg-white px-4 py-3 border-b border-gray-100 shadow-subtle flex items-center gap-3">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-bold text-gray-900">Laporkan Barang Ditemukan</h2>
          <p className="text-[11px] text-gray-500">Langkah Awal Sebelum Penyerahan</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Notice Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-900 flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px]">
            Terima kasih atas itikad baikmu! Untuk menjaga keamanan dan keaslian verifikasi, barang fisik perlu diserahkan ke petugas kampus sebelum listing resmi dipublikasikan.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Real Image Upload Component (Kamera & Galeri) */}
        <ImageUploadArea
          photos={photos}
          onChange={setPhotos}
          label="Foto Barang Ditemukan"
        />

        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Nama barang yang ditemukan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Contoh: Payung Lipat Biru / Flashdisk SanDisk"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ItemCategory)}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none transition-all cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Lokasi tepat ditemukan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={discoveryLocation}
              onChange={(e) => setDiscoveryLocation(e.target.value)}
              placeholder="Contoh: Kantin Budi Luhur dekat Gazebo"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Tanggal ditemukan
              </label>
              <input
                type="date"
                value={discoveryDate}
                onChange={(e) => setDiscoveryDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Jam ditemukan
              </label>
              <input
                type="time"
                value={discoveryTime}
                onChange={(e) => setDiscoveryTime(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Nomor WhatsApp Pelapor
            </label>
            <input
              type="tel"
              value={reporterPhone}
              onChange={(e) => setReporterPhone(e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Keterangan singkat
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Kondisi barang saat ditemukan atau catatan tambahan..."
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <>
              <PlusCircle className="w-4 h-4" />
              <span>Lanjut ke Petunjuk Penyerahan</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
