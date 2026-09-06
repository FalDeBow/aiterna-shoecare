'use client';

import React, { useState } from 'react';

export default function MultiUserLoginPage() {
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Membersihkan cache router dan pindah halaman total
        window.location.replace(data.redirectUrl);
      } else {
        setErrorMsg(data.message || 'PIN Staf Tidak Dikenali!');
        setPin('');
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-2xl space-y-6 text-center">
        <div>
          <div className="w-12 h-12 bg-yellow-400 rounded-full mx-auto flex items-center justify-center text-zinc-950 font-black text-xl mb-3 shadow-lg shadow-yellow-400/20">
            A
          </div>
          <h1 className="text-xl font-black text-white tracking-wider">PORTAL STAF AITERNA</h1>
          <p className="text-xs text-zinc-400 mt-1">Masukkan PIN Akses Pengguna Anda</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••"
            className="w-full bg-zinc-950 border border-zinc-800 text-center text-3xl font-black p-3.5 rounded-2xl tracking-widest text-yellow-400 focus:outline-none focus:border-yellow-400"
            autoFocus
            disabled={loading}
          />

          {errorMsg && (
            <p className="text-xs text-rose-500 font-bold bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black py-3.5 rounded-2xl transition active:scale-95 uppercase tracking-wide text-xs disabled:opacity-50"
          >
            {loading ? 'MEMPROSES...' : 'MASUK PORTAL'}
          </button>
        </form>

        <div className="pt-2 border-t border-zinc-800 text-[10px] text-zinc-500 text-left space-y-1">
          <p className="font-bold text-zinc-400">Testing PIN Default:</p>
          <p>• Owner: <code className="text-yellow-400">9999</code> (Akses Penuh)</p>
          <p>• Kasir: <code className="text-yellow-400">1111</code> (Input POS & Orders)</p>
          <p>• Tim Ops: <code className="text-yellow-400">2222</code> (Hanya Orders/Rak)</p>
        </div>
      </div>
    </div>
  );
}
