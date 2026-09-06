'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AiternaLandingPage() {
  const router = useRouter();

  // State Tracking Nota
  const [trackNota, setTrackNota] = useState('');

  // State Form Konsultasi
  const [nama, setNama] = useState('');
  const [sepatu, setSepatu] = useState('');
  const [layanan, setLayanan] = useState('Deep Clean');
  const [catatan, setCatatan] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackNota.trim()) {
      router.push(`/track/${trackNota.trim().toUpperCase()}`);
    }
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pesan =
      `Halo Aiterna Shoe! Saya mau konsultasi/booking perawatan:\n\n` +
      `• Nama: *${nama}*\n` +
      `• Sepatu/Tas: *${sepatu}*\n` +
      `• Treatment: *${layanan}*\n` +
      (catatan ? `• Catatan: _${catatan}_\n\n` : `\n`) +
      `Mohon info lokasi dan estimasi pengerjaan. Terima kasih!`;

    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(pesan)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-stone-200 font-sans selection:bg-yellow-400 selection:text-black">
      {/* Top Banner Credibility */}
      <div className="bg-yellow-400 text-stone-950 text-[11px] font-black py-1.5 px-4 text-center tracking-wider uppercase">
        ⚡ AITERNA SHOE & BAG CARE — LAUNDRY & REPAIR SINCE JULY 2019
      </div>

      {/* Navbar Brand */}
      <header className="sticky top-0 z-50 bg-[#0C0C0C]/90 backdrop-blur-md border-b border-stone-800/80">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
          
          {/* Logo Brand dari Identitas Asli */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center p-1 shadow-lg shadow-yellow-400/20 border border-yellow-300">
              <svg className="w-6 h-6 text-stone-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 18h20" />
                <path d="M3 14c2-4 6-6 10-6s6 2 8 6" />
                <path d="M8 10V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-black tracking-wider text-stone-100 block leading-none">
                AITERNA_SHOE
              </span>
              <span className="text-[9px] text-yellow-400 tracking-widest font-black block mt-0.5 uppercase">
                SHINE AND CLEAN
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-stone-400">
            <a href="#tentang" className="hover:text-yellow-400 transition">Tentang Kami</a>
            <a href="#layanan" className="hover:text-yellow-400 transition">Layanan & Harga</a>
            <Link href="/member" className="text-yellow-400 font-bold hover:text-yellow-300 transition flex items-center gap-1">
              ⭐ Membership
            </Link>
            <a href="#tracking" className="hover:text-yellow-400 transition">Cek Status Nota</a>
          </nav>

          <a
            href="#konsultasi"
            className="bg-yellow-400 hover:bg-yellow-300 text-stone-950 text-xs font-black px-4 py-2.5 rounded-xl transition shadow-lg shadow-yellow-400/10 uppercase tracking-wide"
          >
            Konsultasi WA
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-14 pb-20 px-4 max-w-5xl mx-auto text-center space-y-7">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 border border-yellow-400/30 text-xs font-bold text-yellow-400">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          Toko Reparasi & Perawatan Sepatu • Sejak Juli 2019
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-stone-100 tracking-tight leading-none max-w-4xl mx-auto uppercase">
          KEEP YOUR KICKS{' '}
          <span className="text-yellow-400 underline decoration-yellow-400/40 decoration-4 underline-offset-8">
            SHINE AND CLEAN
          </span>
        </h1>

        <p className="text-sm sm:text-base text-stone-400 max-w-2xl mx-auto leading-relaxed font-normal">
          Jasa laundry, restorasi, dan repair sepatu & tas terpercaya di Jakarta East. Penanganan profesional untuk sneakers, leather boots, hingga tas kesayanganmu.
        </p>

        {/* Live Tracking Widget */}
        <div id="tracking" className="pt-4 max-w-lg mx-auto">
          <div className="bg-stone-900 border border-stone-800 p-3 rounded-2xl shadow-2xl space-y-2">
            <form onSubmit={handleTrackSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Nomor Nota (Contoh: AIT-260906-123)"
                value={trackNota}
                onChange={(e) => setTrackNota(e.target.value)}
                className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-yellow-400 uppercase font-mono"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-stone-950 text-xs sm:text-sm font-black px-5 py-3 rounded-xl transition whitespace-nowrap shadow-md"
              >
                Cek Progres
              </button>
            </form>
            <p className="text-[11px] text-stone-500 text-left px-1">
              🔍 Ketik nomor nota untuk cek status pengerjaan sepatumu secara live.
            </p>
          </div>
        </div>
      </section>

      {/* Profile & Credibility */}
      <section id="tentang" className="py-16 px-4 bg-stone-900/40 border-y border-stone-800/80">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 flex items-center justify-center text-xl font-bold">
              👟
            </div>
            <h3 className="text-base font-bold text-stone-100">Laundry Sepatu & Tas</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Pembersihan mendalam untuk berbagai jenis bahan: Suede, Canvas, Leather, Nubuck, & Mesh.
            </p>
          </div>

          <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 flex items-center justify-center text-xl font-bold">
              🛠️
            </div>
            <h3 className="text-base font-bold text-stone-100">Repair & Restorasi</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Penanganan sol lepas (re-glue), jahit sol, unyellowing, hingga repaint warna yang pudar.
            </p>
          </div>

          <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 flex items-center justify-center text-xl font-bold">
              📜
            </div>
            <h3 className="text-base font-bold text-stone-100">Pengalaman Sejak 2019</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Ribuan pasang sepatu telah kami tangani dengan standar kualitas pengerjaan dan garansi kepuasan.
            </p>
          </div>
        </div>
      </section>

      {/* Pricelist Section */}
      <section id="layanan" className="py-20 px-4 max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block">Katalog Treatment</span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-100">Layanan & Price List</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Fast Clean',
              price: 'Rp 35.000',
              desc: 'Pembersihan area luar (upper & midsole). Cepat & praktis untuk sepatu harian.',
              time: '1 Hari',
            },
            {
              title: 'Deep Clean',
              price: 'Rp 50.000',
              desc: 'Pembersihan total: upper, insole, midsole, outsole, & tali sepatu.',
              time: '2-3 Hari',
              badge: 'Paling Populer',
            },
            {
              title: 'Unyellowing',
              price: 'Rp 40.000',
              desc: 'Menghilangkan efek kuning oksidasi pada midsole karet/BOOST.',
              time: '2-3 Hari',
            },
            {
              title: 'Repaint & Repair',
              price: 'Rp 120.000',
              desc: 'Restorasi warna, repaint, serta perbaikan lem/jahitan sol.',
              time: '4-7 Hari',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between hover:border-yellow-400/50 transition relative group"
            >
              {item.badge && (
                <span className="absolute -top-3 right-4 bg-yellow-400 text-stone-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">
                  {item.badge}
                </span>
              )}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-stone-100 group-hover:text-yellow-400 transition">{item.title}</h3>
                <div className="text-2xl font-black text-yellow-400">{item.price}</div>
                <p className="text-xs text-stone-400 leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-800 text-[11px] text-stone-500 font-medium">
                ⏱️ Estimasi: {item.time}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form Konsultasi & Booking WA */}
      <section id="konsultasi" className="py-16 px-4 bg-stone-900/30 border-t border-stone-800">
        <div className="max-w-xl mx-auto bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-stone-100">Konsultasi / Booking Treatment</h2>
            <p className="text-xs text-stone-400">Hubungi kami via WhatsApp untuk penyerahan sepatu & tas ke toko</p>
          </div>

          <form onSubmit={handleConsultSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">Nama Pemilik</label>
              <input
                type="text"
                placeholder="Contoh: Bowo"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">Merek Sepatu / Tas</label>
              <input
                type="text"
                placeholder="Contoh: Adidas Samba / Tas Canvas"
                required
                value={sepatu}
                onChange={(e) => setSepatu(e.target.value)}
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">Pilihan Treatment</label>
              <select
                value={layanan}
                onChange={(e) => setLayanan(e.target.value)}
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 focus:outline-none focus:border-yellow-400"
              >
                <option value="Fast Clean">Fast Clean (Rp 35.000)</option>
                <option value="Deep Clean">Deep Clean (Rp 50.000)</option>
                <option value="Unyellowing">Unyellowing (Rp 40.000)</option>
                <option value="Repaint & Repair">Repaint & Repair (Rp 120.000)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">Catatan Kondisi (Opsional)</label>
              <input
                type="text"
                placeholder="Misal: Sol samping menguning / perlu jahit ulang"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-black py-3.5 rounded-xl transition active:scale-95 shadow-lg shadow-yellow-400/10 text-xs sm:text-sm uppercase tracking-wide"
            >
              KIRIM PESAN VIA WHATSAPP
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-stone-800 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-stone-400">
          <div className="space-y-3">
            <span className="text-base font-black tracking-wider text-stone-100">AITERNA_SHOE</span>
            <p className="leading-relaxed">
              Toko Reparasi & Perawatan Sepatu dan Tas. Laundry, Reglue, Repaint & Unyellowing sejak Juli 2019.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-200 mb-2">Jam Operasional</h4>
            <p>Senin – Sabtu: 09:00 – 20:00 WIB</p>
            <p>Minggu: 10:00 – 17:00 WIB</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-200 mb-2">Lokasi & Kontak</h4>
            <p>📍 Jakarta East, Indonesia</p>
            <p>Instagram: @aiternal_shoe</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto pt-8 mt-8 border-t border-stone-900 text-center text-[11px] text-stone-600">
          <p>© {new Date().getFullYear()} Aiterna Shoe • Shine And Clean. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
