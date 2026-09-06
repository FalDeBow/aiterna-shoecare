'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PublicLandingPage() {
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
      `Halo Aiterna Shoecare! Saya ingin konsultasi/booking perawatan sepatu:\n\n` +
      `• Nama: *${nama}*\n` +
      `• Merek/Seri Sepatu: *${sepatu}*\n` +
      `• Layanan yang Diberikan: *${layanan}*\n` +
      (catatan ? `• Catatan/Kondisi: _${catatan}_\n\n` : `\n`) +
      `Mohon informasi estimasi waktu pengerjaan dan lokasi toko. Terima kasih!`;

    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(pesan)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Navbar Publik */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-wider text-white">AITERNA</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/20">
              SHOECARE
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <a href="#layanan" className="hover:text-emerald-400 transition">Layanan & Harga</a>
            <a href="#tracking" className="hover:text-emerald-400 transition">Cek Status Nota</a>
            <a href="#portofolio" className="hover:text-emerald-400 transition">Portofolio</a>
            <a href="#konsultasi" className="hover:text-emerald-400 transition">Konsultasi WA</a>
            <a href="#lokasi" className="hover:text-emerald-400 transition">Lokasi Workshop</a>
          </nav>

          <a
            href="#konsultasi"
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-emerald-600/20"
          >
            Konsultasi Sekarang
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          Premium Sneaker Care & Live Order Tracking
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Rawat Sepatu Kesayangan Tampil Fresh & Bersih Seperti Baru
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Pembersihan mendalam menggunakan cairan ramah material khusus (Suede, Leather, Canvas, Mesh). Dilengkapi sistem pelacakan pengerjaan secara transparan.
        </p>

        {/* Cek Status Nota Widget */}
        <div id="tracking" className="pt-4 max-w-lg mx-auto">
          <form onSubmit={handleTrackSubmit} className="bg-slate-900 border border-slate-800 p-2.5 rounded-2xl shadow-xl flex gap-2">
            <input
              type="text"
              placeholder="Masukkan No. Nota (Contoh: AIT-260906-123)"
              value={trackNota}
              onChange={(e) => setTrackNota(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 uppercase"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition whitespace-nowrap"
            >
              Cek Status
            </button>
          </form>
          <p className="text-[11px] text-slate-500 mt-2">
            Sepatumu sedang dicuci? Masukkan nomor nota untuk memantau pengerjaan secara langsung.
          </p>
        </div>
      </section>

      {/* Pricing & Services */}
      <section id="layanan" className="py-16 px-4 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Layanan & Pricelist</h2>
            <p className="text-xs sm:text-sm text-slate-400">Pilihan perawatan lengkap yang disesuaikan dengan kondisi material sepatu</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Fast Clean',
                price: 'Rp 35.000',
                desc: 'Pembersihan bagian luar (upper & midsole). Solusi praktis untuk penggunaan harian.',
                time: '1 Hari',
              },
              {
                title: 'Deep Clean',
                price: 'Rp 50.000',
                desc: 'Pembersihan menyeluruh: upper, insole, midsole, outsole, hingga tali sepatu.',
                time: '2-3 Hari',
                badge: 'Favorit',
              },
              {
                title: 'Unyellowing',
                price: 'Rp 40.000',
                desc: 'Menghilangkan efek menguning pada midsole akibat oksidasi karet/BOOST.',
                time: '2-3 Hari',
              },
              {
                title: 'Repaint & Recolor',
                price: 'Rp 120.000',
                desc: 'Restorasi warna yang pudar atau ganti warna baru dengan cat khusus sintetis/leather.',
                time: '4-7 Hari',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-500/50 transition relative group"
              >
                {item.badge && (
                  <span className="absolute -top-3 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                    {item.badge}
                  </span>
                )}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition">{item.title}</h3>
                  <div className="text-2xl font-black text-emerald-400">{item.price}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-slate-500">
                  <span>⏱️ Estimasi {item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portofolio Showcase */}
      <section id="portofolio" className="py-16 px-4 max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Hasil Pengerjaan</h2>
          <p className="text-xs sm:text-sm text-slate-400">Bukti penanganan perawatan sepatu pelanggan Aiterna Shoecare</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { tag: 'Deep Clean', title: 'Sneakers Canvas & Mesh', desc: 'Noda membandel terangkat bersih tanpa merusak serat kain.' },
            { tag: 'Unyellowing', title: 'Midsole Rubber & Boost', desc: 'Kembali putih bersih bebas warna kuning oksidasi.' },
            { tag: 'Leather Treatment', title: 'Formal & Casual Leather', desc: 'Pembersihan plus pelembap khusus pencegah pecah-pecah.' },
          ].map((card, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="w-full h-32 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center text-slate-600 text-xs font-mono">
                [ Portofolio Photo #{i + 1} ]
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {card.tag}
              </span>
              <h3 className="text-sm font-bold text-white">{card.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form Konsultasi WhatsApp */}
      <section id="konsultasi" className="py-16 px-4 bg-slate-900/30 border-t border-slate-800/80">
        <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Konsultasi / Booking Layanan</h2>
            <p className="text-xs text-slate-400">Isi form di bawah ini untuk terhubung langsung dengan tim kami di WhatsApp</p>
          </div>

          <form onSubmit={handleConsultSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Nama</label>
              <input
                type="text"
                placeholder="Contoh: Bowo"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Merek & Seri Sepatu</label>
              <input
                type="text"
                placeholder="Contoh: Adidas Samba / Nike Air Force 1"
                required
                value={sepatu}
                onChange={(e) => setSepatu(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Pilihan Treatment</label>
              <select
                value={layanan}
                onChange={(e) => setLayanan(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Fast Clean">Fast Clean (Rp 35.000)</option>
                <option value="Deep Clean">Deep Clean (Rp 50.000)</option>
                <option value="Unyellowing">Unyellowing (Rp 40.000)</option>
                <option value="Repaint & Recolor">Repaint & Recolor (Rp 120.000)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Catatan Tambahan (Opsional)</label>
              <input
                type="text"
                placeholder="Misal: Ada noda oli di bagian sol samping"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 rounded-xl transition active:scale-95 shadow-lg shadow-emerald-600/20 text-xs sm:text-sm"
            >
              KIRIM PESAN VIA WHATSAPP
            </button>
          </form>
        </div>
      </section>

      {/* Footer Murni Publik */}
      <footer id="lokasi" className="bg-slate-900 border-t border-slate-800 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-slate-400">
          <div className="space-y-3">
            <span className="text-base font-black tracking-wider text-white">AITERNA SHOECARE</span>
            <p className="leading-relaxed">
              Layanan perawatan dan pencucian sepatu terpercaya dengan penanganan khusus serta transparansi pengerjaan.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white mb-2">Jam Operasional</h4>
            <p>Senin – Sabtu: 09:00 – 20:00 WIB</p>
            <p>Minggu: 10:00 – 17:00 WIB</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white mb-2">Lokasi Workshop</h4>
            <p>📍 Jakarta East, Indonesia</p>
            <p>WhatsApp: +62 812-3456-7890</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto pt-8 mt-8 border-t border-slate-800/80 text-center text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Aiterna Shoecare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
