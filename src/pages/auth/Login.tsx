import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, GraduationCap } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { DEMO_STUDENT, DEMO_OFFICER } from '../../constants';

export const Login: React.FC = () => {
  const { login, navigateTo } = useApp();
  const [email, setEmail] = useState('mahasiswa@budiluhur.ac.id');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email kampus wajib diisi');
      return;
    }
    if (!password) {
      setError('Kata sandi wajib diisi');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const ok = login(email, password);
      if (!ok) {
        setError('Email atau password tidak sesuai.');
      }
    }, 400);
  };

  const handleFillDemo = (type: 'student' | 'officer') => {
    if (type === 'student') {
      setEmail(DEMO_STUDENT.email);
      setPassword('demo123');
    } else {
      setEmail(DEMO_OFFICER.email);
      setPassword('demo123');
    }
    setError('');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-6">
      <div className="max-w-sm w-full mx-auto">
        {/* Top Logo */}
        <div className="flex flex-col items-center pt-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-md shadow-blue-500/30 mb-3">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Masuk ke akunmu
          </h2>
          <p className="text-xs text-gray-500 mt-1 text-center">
            Gunakan email kampus untuk mengakses <span className="font-semibold text-gray-700">UBL LostnFound</span>.
          </p>
        </div>

        {/* Quick Demo Selector */}
        <div className="mb-5 p-2.5 bg-blue-50/70 border border-blue-100 rounded-xl">
          <p className="text-[11px] font-bold text-primary mb-1.5 uppercase tracking-wider">
            Pilihan Akun Demo Instan:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo('student')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                email.includes('mahasiswa')
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : 'bg-white text-gray-700 border-blue-200 hover:bg-blue-100/50'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Mahasiswa</span>
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('officer')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                email.includes('petugas')
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-white text-gray-700 border-amber-200 hover:bg-amber-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Petugas LAF</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
              {error}
            </div>
          )}

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
                placeholder="nama@budiluhur.ac.id"
                className="w-full pl-10 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me & forgot password */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-primary border-gray-300 focus:ring-primary"
              />
              <span>Ingat saya</span>
            </label>
            <button
              type="button"
              onClick={() => navigateTo('forgot-password')}
              className="text-primary hover:text-primary-dark font-medium"
            >
              Lupa password?
            </button>
          </div>

          {/* Primary CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-primary hover:bg-primary-dark active:bg-primary-dark text-white font-bold rounded-xl text-sm transition-all shadow-sm shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer mt-2"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-gray-400 font-medium">atau</span>
          </div>
        </div>

        {/* Google Kampus Button */}
        <button
          type="button"
          onClick={() => {
            login(DEMO_STUDENT.email, 'demo123');
          }}
          className="w-full py-2.5 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-2.5 transition-colors shadow-subtle cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span>Masuk dengan Google Kampus</span>
        </button>
      </div>

      {/* Footer */}
      <div className="pt-6 pb-2 text-center text-xs text-gray-500">
        Belum punya akun?{' '}
        <button
          onClick={() => navigateTo('register')}
          className="text-primary font-bold hover:underline"
        >
          Daftar sekarang
        </button>
      </div>
    </div>
  );
};
