'use client';

import React, { useState, useEffect } from 'react';

// Kamu bisa mengubah PIN default di sini
const ADMIN_PIN = '1234';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [inputPin, setInputPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Cek status login di session browser
    const savedAuth = sessionStorage.getItem('aiterna_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPin === ADMIN_PIN) {
      sessionStorage.setItem('aiterna_admin_auth', 'true');
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('PIN salah! Silakan coba lagi.');
      setInputPin('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('aiterna_admin_auth');
    setIsAuthenticated(false);
    setInputPin('');
  };

  // Tampilan saat memuat status
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center text-sm">
        Memeriksa hak akses...
      </div>
    );
  }

  // Tampilan Form Input PIN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-center space-y-5">
          <div>
            <h1 className="text-xl font-black text-white tracking-wider">AITERNA POS</h1>
            <p className="text-xs text-slate-400 mt-1">Masukkan PIN Kasir untuk Mengakses</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              maxLength={6}
              placeholder="----"
              value={inputPin}
              onChange={(e) => setInputPin(e.target.value)}
              className="w-full text-center tracking-widest text-2xl font-bold bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500"
              autoFocus
            />

            {errorMsg && <p className="text-xs text-rose-500 font-semibold">{errorMsg}</p>}

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 rounded-xl transition active:scale-95"
            >
              MASUK APLIKASI
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Tampilan Halaman Admin jika PIN Benar
  return (
    <div className="relative">
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-2 flex justify-between items-center text-xs">
        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Akses Kasir Aktif
        </span>
        <button
          onClick={handleLogout}
          className="bg-slate-800 hover:bg-rose-600/80 text-slate-300 hover:text-white px-3 py-1 rounded-lg font-semibold transition"
        >
          🔒 Kunci Layar
        </button>
      </div>
      {children}
    </div>
  );
}