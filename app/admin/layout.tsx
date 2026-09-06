'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StaffAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login' || pathname === '/admin/login/';

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [staffName, setStaffName] = useState('');
  const [staffRole, setStaffRole] = useState('');

  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const token = getCookie('aiterna_admin_token');
    const name = getCookie('aiterna_staff_name');
    const role = getCookie('aiterna_staff_role');

    if (token === 'authenticated') {
      setIsLoggedIn(true);
      if (name) setStaffName(decodeURIComponent(name));
      if (role) setStaffRole(role);
    } else {
      setIsLoggedIn(false);
    }
  }, [pathname]);

  const handleLogout = () => {
    // Hapus seluruh cookie auth
    document.cookie = 'aiterna_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    document.cookie = 'aiterna_staff_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
    document.cookie = 'aiterna_staff_name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';

    // Hard refresh ke halaman login
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Top Header Navigation */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex flex-wrap justify-between items-center text-xs gap-3 sticky top-0 z-50 shadow-lg">
        {/* User Identity / Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-zinc-950 font-black text-sm shadow-md border border-yellow-300">
            A
          </div>
          <div>
            <span className="font-black text-white block leading-tight">
              {isLoggedIn && staffName ? staffName : 'AITERNA PORTAL'}
            </span>
            <span className="text-[10px] text-yellow-400 font-bold tracking-wider uppercase">
              {isLoggedIn && staffRole ? `ROLE: ${staffRole}` : 'STAFF MANAGEMENT'}
            </span>
          </div>
        </div>

        {/* Dynamic Nav Links */}
        <nav className="flex items-center gap-2">
          {/* Menu hanya muncul jika SUDAH LOGIN dan BUKAN di Halaman Login */}
          {isLoggedIn && !isLoginPage && (
            <>
              {staffRole !== 'OPS' && (
                <Link
                  href="/admin"
                  className={`px-3.5 py-2 rounded-xl font-extrabold transition ${
                    pathname === '/admin' ? 'bg-yellow-400 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  + Kasir
                </Link>
              )}

              <Link
                href="/admin/orders"
                className={`px-3.5 py-2 rounded-xl font-extrabold transition ${
                  pathname === '/admin/orders' ? 'bg-yellow-400 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                Daftar Rak Pesanan
              </Link>

              {staffRole === 'OWNER' && (
                <Link
                  href="/admin/reports"
                  className={`px-3.5 py-2 rounded-xl font-extrabold transition ${
                    pathname === '/admin/reports' ? 'bg-yellow-400 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  Laporan Omzet
                </Link>
              )}
            </>
          )}

          {/* Tombol Login / Logout Dinamis */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-zinc-800 hover:bg-rose-600 text-zinc-300 hover:text-white px-3.5 py-2 rounded-xl font-black transition text-[11px] ml-2 border border-zinc-700/50"
            >
              🚪 Keluar
            </button>
          ) : (
            !isLoginPage && (
              <Link
                href="/admin/login"
                className="bg-yellow-400 hover:bg-yellow-300 text-zinc-950 px-4 py-2 rounded-xl font-black transition text-[11px] uppercase tracking-wider shadow-md"
              >
                🔑 Masuk PIN
              </Link>
            )
          )}
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
