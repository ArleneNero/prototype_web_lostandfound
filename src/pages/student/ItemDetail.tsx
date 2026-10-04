import React from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Info, 
  Share2, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { StatusBadge } from '../../components/StatusBadge';
import { useApp } from '../../store/AppContext';

export const ItemDetail: React.FC = () => {
  const { 
    selectedItemId, 
    items, 
    goBack, 
    navigateTo, 
    toggleBookmark, 
    isBookmarked,
    showToast,
    claims,
    currentUser
  } = useApp();

  const item = items.find(i => i.id === selectedItemId) || items[0];
  const bookmarked = isBookmarked(item.id);

  // Check if current user already has an active claim on this item
  const existingClaim = claims.find(
    c => c.itemId === item.id && c.claimantId === (currentUser?.id || 'usr_mhs_001')
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan informasi barang disalin ke clipboard!', 'info');
  };

  const handleClaim = () => {
    if (existingClaim) {
      navigateTo('claim-detail', { claimId: existingClaim.id });
    } else {
      navigateTo('claim-form', { itemId: item.id });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-24 max-w-md mx-auto relative shadow-xl">
      {/* Top Image Hero with Overlays */}
      <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden">
        <img
          src={item.images[0] || 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80'}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>

        {/* Top floating nav buttons */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <button
            onClick={goBack}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-800 hover:bg-white transition-colors shadow-subtle cursor-pointer"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-800 hover:bg-white transition-colors shadow-subtle cursor-pointer"
              aria-label="Bagikan"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleBookmark(item.id)}
              className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-colors shadow-subtle cursor-pointer ${
                bookmarked ? 'bg-primary text-white' : 'bg-white/90 text-gray-800 hover:bg-white'
              }`}
              aria-label="Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom indicator badge */}
        <div className="absolute bottom-3 left-4 z-10">
          <StatusBadge status={item.status} />
        </div>
      </div>

      {/* Main Details Body */}
      <div className="p-4 space-y-4">
        {/* Title & Category */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                {item.category} • Kode: {item.itemCode}
              </span>
              <h1 className="text-xl font-extrabold text-gray-900 tracking-tight mt-0.5">
                {item.title}
              </h1>
            </div>
          </div>

          {/* Location & Date */}
          <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-gray-800">{item.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center shrink-0">
                <Calendar className="w-3.5 h-3.5" />
              </div>
              <span>{item.date} {item.time && `• ${item.time}`}</span>
            </div>
          </div>
        </div>

        {/* Public Description */}
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-subtle space-y-2">
          <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">
            Deskripsi Publik
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Security Privacy Notice */}
        <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-bold text-[11px] text-blue-950 uppercase tracking-wide">
              Perlindungan Privasi & Verifikasi
            </h5>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Untuk keamanan, sebagian detail fisik barang tidak ditampilkan secara publik dan hanya digunakan dalam verifikasi kepemilikan oleh petugas Lost & Found UBL.
            </p>
          </div>
        </div>

        {/* Managed by Campus Officer Block */}
        <div className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-subtle flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-gray-900 truncate">
              Dikelola oleh Petugas Lost & Found UBL
            </h4>
            <p className="text-[11px] text-gray-500 truncate">
              {item.postedBy} • Layanan Resmi Kampus
            </p>
          </div>
        </div>

        {/* Existing Claim Banner if student already claimed */}
        {existingClaim && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Anda sudah mengajukan klaim ({existingClaim.claimCode})</span>
            </div>
            <button
              onClick={() => navigateTo('claim-detail', { claimId: existingClaim.id })}
              className="text-xs font-bold text-primary hover:underline"
            >
              Lihat Status
            </button>
          </div>
        )}
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200/90 p-4 max-w-md mx-auto shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleBookmark(item.id)}
            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors shrink-0 ${
              bookmarked ? 'bg-primary text-white border-primary' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
            aria-label="Bookmark"
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleClaim}
            className="flex-1 py-3 px-4 bg-primary hover:bg-primary-dark active:bg-primary-dark text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{existingClaim ? 'Lihat Progress Klaim' : 'Ajukan Klaim Barang'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
