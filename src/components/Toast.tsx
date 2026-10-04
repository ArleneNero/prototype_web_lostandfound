import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../store/AppContext';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const bgStyles = 
    toast.type === 'success' ? 'bg-emerald-600 text-white' :
    toast.type === 'danger' ? 'bg-red-600 text-white' :
    'bg-slate-900 text-white';

  const Icon = 
    toast.type === 'success' ? CheckCircle2 :
    toast.type === 'danger' ? AlertCircle :
    Info;

  return (
    <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] transition-all animate-bounce">
      <div className={`px-4 py-3 rounded-xl shadow-float flex items-center gap-3 ${bgStyles}`}>
        <Icon className="w-5 h-5 shrink-0" />
        <p className="text-xs font-medium leading-snug flex-1">
          {toast.message}
        </p>
      </div>
    </div>
  );
};
