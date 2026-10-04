import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../store/AppContext';

export const ForgotPassword: React.FC = () => {
  const { navigateTo } = useApp();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-6">
      <div className="max-w-sm w-full mx-auto">
        <button
          onClick={() => navigateTo('login')}
          className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight mb-2">
          Atur Ulang Kata Sandi
        </h2>
        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
          Masukkan email kampus UBL yang terdaftar. Kami akan mengirimkan tautan untuk mengatur ulang kata sandimu.
        </p>

        {isSubmitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-gray-900 text-sm">Tautan Terkirim!</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Instruksi pengaturan ulang kata sandi telah dikirim ke <strong>{email}</strong>.
            </p>
            <button
              onClick={() => navigateTo('login')}
              className="mt-2 w-full py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-colors"
            >
              Kembali ke Masuk
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Email Kampus
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mahasiswa@budiluhur.ac.id"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-blue-500/30 cursor-pointer"
            >
              Kirim Tautan Reset
            </button>
          </form>
        )}
      </div>

      <div className="py-4 text-center text-xs text-gray-500">
        Ingat kata sandi?{' '}
        <button
          onClick={() => navigateTo('login')}
          className="text-primary font-bold hover:underline"
        >
          Masuk
        </button>
      </div>
    </div>
  );
};
