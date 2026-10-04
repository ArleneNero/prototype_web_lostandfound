import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../store/AppContext';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useApp();

  if (!toast) return null;

  const bgStyles = 
    toast.type === 'success' ? 'bg-emerald-600 text-white shadow-emerald-900/25 border-emerald-500/30' :
    toast.type === 'danger' ? 'bg-red-600 text-white shadow-red-900/25 border-red-500/30' :
    'bg-slate-900 text-white shadow-slate-950/40 border-slate-700/50';

  const Icon = 
    toast.type === 'success' ? CheckCircle2 :
    toast.type === 'danger' ? AlertCircle :
    Info;

  return (
    <div className="absolute top-14 left-3 right-3 z-50 pointer-events-none transition-all duration-300">
      <div 
        className={`px-3.5 py-2.5 rounded-2xl shadow-xl border flex items-center gap-3 ${bgStyles} pointer-events-auto backdrop-blur-md transition-transform duration-200`}
        role="alert"
      >
        <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <p className="text-xs font-semibold leading-snug flex-1">
          {toast.message}
        </p>
        {hideToast && (
          <button 
            onClick={hideToast}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-colors shrink-0"
            aria-label="Tutup notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
