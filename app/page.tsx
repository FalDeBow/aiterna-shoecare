'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AiternaAestheticLandingPage() {
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
    <div className="min-h-screen bg-[#0A0A0A] text-stone-200 font-sans selection:bg-yellow-400 selection:text-black">
      {/* Top Credibility Banner */}
      <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-stone-950 text-[11px] font-black py-1.5 px-4 text-center tracking-widest uppercase shadow-md">
        ⚡ AITERNA SHOE & BAG RESTORATION — CRAFTSMANSHIP SINCE JULY 2019
      </div>

      {/* Navbar Brand */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-stone-800/80">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center p-1 shadow-lg shadow-yellow-400/20 border border-yellow-300 group-hover:scale-105 transition">
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
            <a href="#story" className="hover:text-yellow-400 transition">Cerita Sejak 2019</a>
            <a href="#layanan" className="hover:text-yellow-400 transition">Layanan & Harga</a>
            <Link href="/member" className="text-yellow-400 font-bold hover:text-yellow-300 transition flex items-center gap-1">
              ⭐ Membership
            </Link>
            <a href="#tracking" className="hover:text-yellow-400 transition">Cek Status Nota</a>
          </nav>

          <a
            href="#konsultasi"
            className="bg-yellow-400 hover:bg-yellow-300 text-stone-950 text-xs font-black px-4 py-2.5 rounded-xl transition shadow-lg shadow-yellow-400/20 uppercase tracking-wide"
          >
            Konsultasi WA
          </a>
        </div>
      </header>

      {/* Hero Section dengan Ambient Dark Photography */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden border-b border-stone-800">
        {/* Background Image Estetik Sepatu Restorasi */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 filter brightness-75"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop')`,
          }}
        />
        {/* Dark Overlay Gradient (Layer Pembungkus Teks) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/60" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-7 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 border border-yellow-400/40 text-xs font-bold text-yellow-400 backdrop-blur-md shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
            Restorasi & Maintenance Sepatu • Established 2019
          </div>

          <h1 className="text-4xl sm:text-7xl font-black text-stone-100 tracking-tight leading-none uppercase drop-shadow-lg">
            KEEP YOUR KICKS{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500">
              SHINE AND CLEAN
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-light drop-shadow">
            Seni merawat dan mengembalikan estetika sepatu & tas kesayanganmu. Berdiri sejak Juli 2019 dengan dedikasi tinggi pada detail dan teknik pencucian ramah material.
          </p>

          {/* Interactive Live Tracking Box */}
          <div id="tracking" className="pt-4 max-w-lg mx-auto">
            <div className="bg-stone-900/90 border border-stone-700/80 p-3.5 rounded-2xl shadow-2xl backdrop-blur-md space-y-2">
              <form onSubmit={handleTrackSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ketik No. Nota (Contoh: AIT-260906-123)"
                  value={trackNota}
                  onChange={(e) => setTrackNota(e.target.value)}
                  className="flex-1 bg-stone-950/90 border border-stone-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-yellow-400 uppercase font-mono"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-300 text-stone-950 text-xs sm:text-sm font-black px-5 py-3 rounded-xl transition whitespace-nowrap shadow-md uppercase tracking-wide"
                >
                  Cek Nota 🔍
                </button>
              </form>
              <p className="text-[11px] text-stone-400 text-left px-1 font-medium">
                Pantau progres pengerjaan sepatu di rak kami secara langsung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Storytelling Section: Craftsmen Story Since 2019 */}
      <section id="story" className="relative py-24 px-4 overflow-hidden border-b border-stone-800">
        {/* Latar Belakang Foto Kerajinan Kulit / Sepatu */}
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-15"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop')`,
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-widest">
              Established July 2019
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-100 leading-tight uppercase">
              Perjalanan 7+ Tahun Merawat Kepercayaan Pelanggan
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed font-light">
              Bermula di bulan Juli 2019 dari gairah pada dunia *sneaker culture* dan perawatan barang berbahan khusus, **Aiterna Shoe** berkembang menjadi atelier perawatan sepatu & tas terpercaya di Jakarta East.
            </p>
            <p className="text-sm text-stone-300 leading-relaxed font-light">
              Setiap pasang sepatu ditangani secara manual (*hand-wash artisan treatment*), menggunakan formula pembersih ramah serat kain, serta teknik pengeringan suhu alami untuk mencegah kerusakan sol.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-800 text-center">
              <div>
                <span className="text-2xl font-black text-yellow-400 block">3.900+</span>
                <span className="text-[10px] text-stone-400 uppercase font-semibold">Pelanggan Setia</span>
              </div>
              <div>
                <span className="text-2xl font-black text-yellow-400 block">700+</span>
                <span className="text-[10px] text-stone-400 uppercase font-semibold">Ulasan Positif</span>
              </div>
              <div>
                <span className="text-2xl font-black text-yellow-400 block">2019</span>
                <span className="text-[10px] text-stone-400 uppercase font-semibold">Tahun Berdiri</span>
              </div>
            </div>
          </div>

          {/* Frame Foto Craftsmanship Estetik */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-stone-800 shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1000&auto=format&fit=crop" 
              alt="Artisan Shoe Care Process"
              className="w-full h-96 object-cover filter brightness-90 group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 space-y-1">
              <span className="text-xs font-mono text-yellow-400 font-bold block">#AiternaCraftsmanship</span>
              <p className="text-xs text-stone-200 font-light">
                Perlakuan presisi untuk bahan Canvas, Leather, Suede, Nubuck, hingga Knit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Pricelist Section */}
      <section id="layanan" className="py-24 px-4 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block">Layanan Terstandarisasi</span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-100 uppercase">Katalog Treatment & Price List</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: 'Fast Clean',
              price: 'Rp 35.000',
              desc: 'Pembersihan cepat bagian luar (upper & midsole). Ideal untuk penggunaan rutin harian.',
              time: '1 Hari',
            },
            {
              title: 'Deep Clean',
              price: 'Rp 50.000',
              desc: 'Pembersihan total di seluruh bagian: upper, insole, midsole, outsole, & tali sepatu.',
              time: '2-3 Hari',
              badge: 'Paling Laris',
            },
            {
              title: 'Unyellowing',
              price: 'Rp 40.000',
              desc: 'Treatment khusus memulihkan warna menguning akibat oksidasi pada midsole karet/BOOST.',
              time: '2-3 Hari',
            },
            {
              title: 'Repaint & Repair',
              price: 'Rp 120.000',
              desc: 'Restorasi cat warna pudar, pergantian warna baru, serta perbaikan lem/jahitan sol.',
              time: '4-7 Hari',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:border-yellow-400/50 transition relative group backdrop-blur-sm"
            >
              {item.badge && (
                <span className="absolute -top-3 right-4 bg-yellow-400 text-stone-950 text-[10px] font-black px-3 py-0.5 rounded-full shadow-lg">
                  {item.badge}
                </span>
              )}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-stone-100 group-hover:text-yellow-400 transition">{item.title}</h3>
                <div className="text-2xl font-black text-yellow-400">{item.price}</div>
                <p className="text-xs text-stone-400 leading-relaxed font-light">{item.desc}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-800/80 text-[11px] text-stone-500 font-medium">
                ⏱️ Estimasi: {item.time}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation & Booking Form */}
      <section id="konsultasi" className="py-20 px-4 bg-stone-900/40 border-t border-stone-800">
        <div className="max-w-xl mx-auto bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-stone-100 uppercase">Konsultasi / Booking Treatment</h2>
            <p className="text-xs text-stone-400 font-light">Hubungi tim kami via WhatsApp untuk penyerahan sepatu atau tas ke workshop</p>
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
                placeholder="Contoh: Adidas Samba / Tas Leather"
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
                placeholder="Misal: Sol menguning / noda oli di kain"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-black py-3.5 rounded-xl transition active:scale-95 shadow-lg shadow-yellow-400/20 text-xs sm:text-sm uppercase tracking-wide"
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
            <p className="leading-relaxed font-light">
              Toko Reparasi & Perawatan Sepatu dan Tas. Laundry, Reglue, Repaint & Unyellowing sejak Juli 2019.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-200 mb-2">Jam Operasional</h4>
            <p>Senin – Sabtu: 09:00 – 20:00 WIB</p>
            <p>Minggu: 10:00 – 17:00 WIB</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-200 mb-2">Lokasi & Sosial Media</h4>
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
