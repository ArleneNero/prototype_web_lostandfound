import React, { useRef } from 'react';
import { Camera, Image as ImageIcon, Upload, X } from 'lucide-react';
import { useApp } from '../store/AppContext';

interface ImageUploadAreaProps {
  photos: string[];
  onChange: (photos: string[]) => void;
  label?: string;
  maxPhotos?: number;
}

export const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({
  photos,
  onChange,
  label = 'Foto Barang',
  maxPhotos = 5,
}) => {
  const { showToast } = useApp();
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const remainingSlots = maxPhotos - photos.length;
    if (remainingSlots <= 0) {
      showToast(`Maksimal ${maxPhotos} foto yang dapat diunggah.`, 'info');
      return;
    }

    const selectedFiles = Array.from(files).slice(0, remainingSlots);

    selectedFiles.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        showToast('File harus berupa gambar (JPG, PNG, WebP)', 'danger');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showToast('Ukuran foto maksimal 5MB per file', 'danger');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange([...photos, event.target.result as string]);
          showToast('Foto berhasil ditambahkan!', 'success');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    e.target.value = ''; // Reset input
  };

  const handleRemovePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-3">
      {/* Label without "(Opsional)" */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-gray-700">
          {label}
        </label>
        <span className="text-[10px] text-gray-400">
          {photos.length}/{maxPhotos} foto
        </span>
      </div>

      {/* Hidden Native File Inputs */}
      <input
        type="file"
        ref={galleryInputRef}
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Upload Actions */}
      <div className="grid grid-cols-2 gap-2">
        {/* Camera Option */}
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          disabled={photos.length >= maxPhotos}
          className="py-3 px-3 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 active:scale-[0.98] text-primary flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Camera className="w-5 h-5 stroke-[2]" />
          <span className="text-xs font-bold">Buka Kamera</span>
        </button>

        {/* Gallery Option */}
        <button
          type="button"
          onClick={() => galleryInputRef.current?.click()}
          disabled={photos.length >= maxPhotos}
          className="py-3 px-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 active:scale-[0.98] text-gray-700 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ImageIcon className="w-5 h-5 stroke-[2] text-gray-600" />
          <span className="text-xs font-bold">Pilih Galeri</span>
        </button>
      </div>

      {/* Drag/Dropzone area */}
      <div
        onClick={() => galleryInputRef.current?.click()}
        className="border-2 border-dashed border-gray-200 hover:border-primary bg-gray-50/50 hover:bg-blue-50/20 rounded-xl p-3 text-center cursor-pointer transition-colors"
      >
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-500">
          <Upload className="w-4 h-4 text-gray-400" />
          <span>Atau drag & drop file / klik untuk memilih</span>
        </div>
      </div>

      {/* Photo Previews */}
      {photos.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar">
          {photos.map((src, i) => (
            <div
              key={i}
              className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200 shadow-xs"
            >
              <img
                src={src}
                alt={`Foto ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemovePhoto(i);
                }}
                className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] shadow-sm cursor-pointer"
                title="Hapus foto"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
