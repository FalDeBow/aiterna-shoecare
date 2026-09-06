'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StaffAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [staffName, setStaffName] = useState('Staf');
  const [staffRole, setStaffRole] = useState('KASIR');

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const name = getCookie('aiterna_staff_name');
    const role = getCookie('aiterna_staff_role');

    if (name) setStaffName(decodeURIComponent(name));
    if (role) setStaffRole(role);
  }, []);

  const handleLogout = async () => {
    // Hapus cookie lokal browser
    document.cookie = 'aiterna_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'aiterna_staff_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'aiterna_staff_name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';

    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    } finally {
      // Paksa browser reload bersih ke login
      window.location.replace('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <header className="bg-zinc-900 border-b border-zinc-800 px-4 py-2.5 flex flex-wrap justify-between items-center text-xs gap-2">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse"></span>
          <div>
            <span className="font-black text-white block leading-tight">{staffName}</span>
            <span className="text-[10px] text-yellow-400 font-bold tracking-wider">ROLE: {staffRole}</span>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {staffRole !== 'OPS' && (
            <Link
              href="/admin"
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                pathname === '/admin' ? 'bg-yellow-400 text-zinc-950' : 'text-zinc-400 hover:text-white'
              }`}
            >
              + Kasir
            </Link>
          )}

          <Link
            href="/admin/orders"
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              pathname === '/admin/orders' ? 'bg-yellow-400 text-zinc-950' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Daftar Rak Pesanan
          </Link>

          {staffRole === 'OWNER' && (
            <Link
              href="/admin/reports"
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                pathname === '/admin/reports' ? 'bg-yellow-400 text-zinc-950' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Laporan Omzet
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="bg-zinc-800 hover:bg-rose-600/80 text-zinc-300 hover:text-white px-3 py-1.5 rounded-xl font-bold transition text-[11px] ml-2"
          >
            🚪 Keluar
          </button>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
