import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { CATEGORIES } from '../../constants';
import { ItemCategory } from '../../types';
import { ImageUploadArea } from '../../components/ImageUploadArea';

export const AddFoundItem: React.FC = () => {
  const { goBack, navigateTo, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('Elektronik');
  const [location, setLocation] = useState('Gedung E, Lantai 2');
  const [date, setDate] = useState('2026-10-04');
  const [time, setTime] = useState('14:00');
  const [description, setDescription] = useState('');
  const [storageLocation, setStorageLocation] = useState('Lemari Khusus A - Rak 2 (Elektronik)');
  const [condition, setCondition] = useState('Baik, normal');
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Nama barang wajib diisi');
      return;
    }
    if (!location.trim()) {
      setError('Lokasi ditemukan wajib diisi');
      return;
    }

    // Save temporary draft to sessionStorage
    sessionStorage.setItem('ubl_item_draft', JSON.stringify({
      title,
      category,
      location,
      date: new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: `${time} WIB`,
      description,
      storageLocation,
      condition,
      images: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=400&q=80'],
    }));

    navigateTo('officer-hidden-verification');
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
          <h2 className="text-base font-bold text-gray-900">Tambah Barang Ditemukan</h2>
          <p className="text-[11px] text-gray-500">Tahap 1: Data Publik & Penerimaan Fisik</p>
        </div>
      </div>

      <form onSubmit={handleNext} className="p-4 space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Real Image Upload Component (Kamera & Galeri) */}
        <ImageUploadArea
          photos={photos}
          onChange={setPhotos}
          label="Foto Publik Barang"
        />

        {/* Section 1: Informasi Publik */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-3.5">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            1. Informasi Publik
          </h3>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Nama barang *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: AirPods Pro / Dompet Kulit"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Kategori *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ItemCategory)}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none cursor-pointer"
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
              Lokasi umum ditemukan *
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Contoh: Gedung E, Lantai 2"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none"
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Jam ditemukan
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Deskripsi publik
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi umum yang aman ditampilkan kepada publik..."
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none"
            />
          </div>
        </div>

        {/* Section 2: Internal Intake */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-3.5">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            2. Internal Intake (Penyimpanan Fisik)
          </h3>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Petugas penerima
            </label>
            <input
              type="text"
              readOnly
              value={`${currentUser?.name || 'Petugas'} (${currentUser?.employeeId || 'UBL-ST-084'})`}
              className="w-full px-3.5 py-2 bg-gray-100 border border-gray-200 rounded-xl text-xs text-gray-600 outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Lokasi rak / brankas penyimpanan fisik *
            </label>
            <input
              type="text"
              value={storageLocation}
              onChange={(e) => setStorageLocation(e.target.value)}
              placeholder="Contoh: Lemari Khusus A - Rak 2 / Brankas B1"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Kondisi fisik saat diterima
            </label>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Contoh: Berfungsi normal, sedikit baret halus di sisi samping"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary outline-none"
            />
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="submit"
          className="w-full py-3.5 bg-primary hover:bg-primary-dark active:bg-primary-dark text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Lanjut ke Data Verifikasi Internal</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
