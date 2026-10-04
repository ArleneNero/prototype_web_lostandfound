import React, { useState } from 'react';
import { ShieldCheck, Search, Users, ArrowRight } from 'lucide-react';
import { useApp } from '../../store/AppContext';

export const Onboarding: React.FC = () => {
  const { navigateTo } = useApp();
  const [step, setStep] = useState<number>(1);

  const slides = [
    {
      step: 1,
      title: 'Temukan kembali barangmu, bantu orang lain menemukannya.',
      desc: 'Platform Lost & Found resmi terpusat untuk seluruh civitas akademika Universitas Budi Luhur.',
      icon: Users,
      badgeColor: 'bg-blue-50 text-primary',
      btnText: 'Mulai',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80',
    },
    {
      step: 2,
      title: 'Laporkan atau cari barang dengan mudah',
      desc: 'Posting barang hilang, temuan, atau telusuri barang yang baru saja diamankan oleh petugas di seluruh area kampus.',
      icon: Search,
      badgeColor: 'bg-emerald-50 text-emerald-600',
      btnText: 'Selanjutnya',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=700&q=80',
    },
    {
      step: 3,
      title: 'Aman dan Terverifikasi',
      desc: 'Dikelola secara resmi oleh petugas kampus dengan verifikasi kepemilikan dua tahap yang melindungi privasimu.',
      icon: ShieldCheck,
      badgeColor: 'bg-indigo-50 text-indigo-600',
      btnText: 'Mulai Sekarang',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=80',
    },
  ];

  const currentSlide = slides[step - 1];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigateTo('login');
    }
  };

  const handleSkip = () => {
    navigateTo('login');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <span className="font-extrabold text-base text-gray-900 tracking-tight">
            UBL <span className="text-primary font-bold">LostnFound</span>
          </span>
        </div>
        <button
          onClick={handleSkip}
          className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors"
        >
          Lewati
        </button>
      </div>

      {/* Main Illustration & Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-6">
        <div className="relative w-64 h-64 mb-6 rounded-3xl overflow-hidden shadow-card border border-gray-100">
          <img
            src={currentSlide.image}
            alt="Onboarding"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end justify-center pb-4">
            <div className={`p-3 rounded-2xl bg-white shadow-float ${currentSlide.badgeColor}`}>
              <currentSlide.icon className="w-6 h-6 stroke-[2]" />
            </div>
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight leading-snug mb-3 max-w-xs">
          {currentSlide.title}
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
          {currentSlide.desc}
        </p>

        {/* Indicators */}
        <div className="flex items-center gap-2 mt-6">
          {slides.map((s) => (
            <button
              key={s.step}
              onClick={() => setStep(s.step)}
              className={`h-2 rounded-full transition-all duration-300 ${
                s.step === step ? 'w-6 bg-primary' : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 pb-4">
        <button
          onClick={handleNext}
          className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm transition-colors shadow-sm shadow-blue-500/25 flex items-center justify-center gap-2"
        >
          <span>{currentSlide.btnText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={handleSkip}
          className="w-full py-2.5 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors text-center"
        >
          Lewati ke Masuk Akun
        </button>
      </div>
    </div>
  );
};
