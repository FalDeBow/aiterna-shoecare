'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    // Hapus cookie dan session otentikasi admin
    document.cookie = 'aiterna_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    sessionStorage.removeItem('aiterna_admin_auth');
    
    // Kembalikan ke halaman utama publik
    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header Top Bar Khusus Admin Internal */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex justify-between items-center text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold text-white tracking-wider">AITERNA POS INTERNAL</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-slate-800 hover:bg-rose-600/80 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg font-semibold transition text-[11px]"
        >
          🚪 Keluar Sesi Kasir
        </button>
      </div>
      {children}
    </div>
  );
}
