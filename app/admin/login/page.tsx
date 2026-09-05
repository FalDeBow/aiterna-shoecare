'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      // Set cookie otentikasi berlaku selama 1 hari
      document.cookie = 'aiterna_admin_token=authenticated; path=/; max-age=86400';
      router.push('/admin');
    } else {
      setError('PIN Salah!');
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-sm space-y-4 text-center">
        <h1 className="text-lg font-bold">AITERNA POS - MASUK</h1>
        <input
          type="password"
          maxLength={6}
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN KASIR"
          className="w-full bg-slate-950 border border-slate-800 text-center text-2xl p-3 rounded-xl tracking-widest focus:outline-none focus:border-emerald-500"
          autoFocus
        />
        {error && <p className="text-xs text-rose-500 font-semibold">{error}</p>}
        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold py-3 rounded-xl transition">
          MASUK
        </button>
      </form>
    </div>
  );
}