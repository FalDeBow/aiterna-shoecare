'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AiternaHybridLandingPage() {
  const router = useRouter();

  // State Tracking Nota
  const [trackNota, setTrackNota] = useState('');

  // State Form Konsultasi & Pickup Service
  const [nama, setNama] = useState('');
  const [sepatu, setSepatu] = useState('');
  const [layanan, setLayanan] = useState('Deep Clean');
  const [isPickup, setIsPickup] = useState(false);
  const [alamat, setAlamat] = useState('');
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
      `Halo Aiterna_Shoe! Saya mau konsultasi/booking treatment:\n\n` +
      `• Nama: *${nama}*\n` +
      `• Sepatu/Tas: *${sepatu}*\n` +
      `• Layanan: *${layanan}*\n` +
      `• Layanan Ambil Antar: *${isPickup ? 'YA (Pickup & Delivery)' : 'Tidak (Antar Sendiri ke Store)'}*\n` +
      (isPickup && alamat ? `• Alamat Pickup: _${alamat}_\n` : '') +
      (catatan ? `• Catatan: _${catatan}_\n\n` : `\n`) +
      `Mohon info lokasi & estimasi penanganan. Terima kasih!`;

    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(pesan)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 font-sans selection:bg-yellow-400 selection:text-zinc-950">
      
      {/* Top Banner Kontras Gelap & Kuning */}
      <div className="bg-zinc-950 text-yellow-400 text-[11px] font-black py-2 px-4 text-center tracking-wider uppercase border-b border-yellow-400/30 flex justify-center items-center gap-2">
        <span>⚡ AITERNA SHOE & BAG RESTORATION</span>
        <span className="hidden sm:inline text-zinc-600">•</span>
        <span className="hidden sm:inline text-stone-300">LAUNDRY & REPAIR SINCE JULY 2019</span>
        <span className="text-zinc-600">•</span>
        <span className="bg-yellow-400 text-zinc-950 px-2 py-0.5 rounded text-[10px] font-black">#ZeroWaste Packaging</span>
      </div>

      {/* Navbar Premium Gelap (Aksen Kuning) */}
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 transition-all shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center p-1 shadow-lg shadow-yellow-400/20 border border-yellow-300 group-hover:scale-105 transition">
              <svg className="w-6 h-6 text-zinc-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 18h20" />
                <path d="M3 14c2-4 6-6 10-6s6 2 8 6" />
                <path d="M8 10V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-black tracking-wider text-white block leading-none">
                AITERNA_SHOE
              </span>
              <span className="text-[9px] text-yellow-400 tracking-widest font-black block mt-0.5 uppercase">
                SHINE AND CLEAN
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-zinc-300">
            <a href="#keunggulan" className="hover:text-yellow-400 transition">Mengapa Aiterna</a>
            <a href="#prioritas" className="hover:text-yellow-400 transition">Komitmen 3K</a>
            <a href="#layanan" className="hover:text-yellow-400 transition">Katalog Layanan</a>
            <Link href="/member" className="text-yellow-400 font-bold hover:text-yellow-300 transition flex items-center gap-1">
              ⭐ Membership
            </Link>
            <a href="#testimoni" className="hover:text-yellow-400 transition">Ulasan</a>
            <a href="#tracking" className="hover:text-yellow-400 transition">Cek Status Nota</a>
          </nav>

          <a
            href="#booking"
            className="bg-yellow-400 hover:bg-yellow-300 text-zinc-950 text-xs font-black px-4 py-2.5 rounded-xl transition shadow-lg shadow-yellow-400/20 uppercase tracking-wide border border-yellow-300"
          >
            Pickup / Booking WA
          </a>
        </div>
      </header>

      {/* Hero Section Bersih Dengan Kartu Tracking Gelap */}
      <section className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-yellow-200/40 via-zinc-100 to-zinc-100 border-b border-zinc-200">
        <div className="max-w-4xl mx-auto text-center space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950 text-xs font-bold text-yellow-400 shadow-md">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            Toko Reparasi & Laundry Sepatu Tas • Since July 2019
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-zinc-950 tracking-tight leading-none uppercase">
            GET YOUR SHOES’{' '}
            <span className="bg-zinc-950 text-yellow-400 px-3.5 py-1 rounded-xl inline-block rotate-[-1deg] shadow-lg">
              GLORY BACK
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-700 max-w-2xl mx-auto leading-relaxed font-medium">
            Kembalikan kejayaan dan kesegaran sepatu kesayanganmu. Layanan pencucian, restorasi warna, & repair dengan standar kualitas tinggi serta transparansi status pengerjaan.
          </p>

          {/* Dark Contrast Tracking Box */}
          <div id="tracking" className="pt-4 max-w-lg mx-auto">
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-3xl shadow-2xl space-y-2">
              <form onSubmit={handleTrackSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ketik No. Nota (Contoh: AIT-260906-123)"
                  value={trackNota}
                  onChange={(e) => setTrackNota(e.target.value)}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 uppercase font-mono"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-300 text-zinc-950 text-xs sm:text-sm font-black px-5 py-3 rounded-2xl transition whitespace-nowrap uppercase tracking-wide shadow-md"
                >
                  Cek Nota 🔍
                </button>
              </form>
              <p className="text-[11px] text-zinc-400 text-left px-1 font-medium">
                Ketik nomor nota transaksi untuk memantau status pengerjaan secara live.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Counter Bar Gelap */}
      <section className="bg-zinc-950 text-white border-b border-zinc-800 py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-yellow-400 font-mono block">12.500+</span>
            <span className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider block">Pasang Sepatu Selesai</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-yellow-400 font-mono block">2019</span>
            <span className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider block">Tahun Berdiri</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-yellow-400 font-mono block">100%</span>
            <span className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider block">Bahan Alami & Safe</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-yellow-400 font-mono block">#ZeroWaste</span>
            <span className="text-[11px] text-zinc-400 font-semibold uppercase tracking-wider block">Eco Reusable Bag</span>
          </div>
        </div>
      </section>

      {/* 4 Pilar Utama */}
      <section id="keunggulan" className="py-20 px-4 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-black text-amber-600 uppercase tracking-widest block">Mengapa Memilih Aiterna?</span>
          <h2 className="text-2xl sm:text-4xl font-black text-zinc-950 uppercase">Solusi Terbaik Untuk Sepatu & Tas Kesayangan</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-zinc-200 p-6 rounded-3xl space-y-3 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 text-yellow-400 flex items-center justify-center text-2xl font-bold">
              🏷️
            </div>
            <h3 className="text-base font-black text-zinc-900">Harga Terjangkau</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              Semua layanan kami memiliki harga yang ramah dan transparan, baik untuk pelajar, mahasiswa, maupun pekerja.
            </p>
          </div>

          <div className="bg-white border border-zinc-200 p-6 rounded-3xl space-y-3 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 text-yellow-400 flex items-center justify-center text-2xl font-bold">
              👨‍🔧
            </div>
            <h3 className="text-base font-black text-zinc-900">Teknisi Berpengalaman</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              Tim berpengalaman sejak 2019 yang dapat Anda percaya untuk menyelesaikan berbagai masalah kotoran & kerusakan sol.
            </p>
          </div>

          <div className="bg-white border border-zinc-200 p-6 rounded-3xl space-y-3 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 text-yellow-400 flex items-center justify-center text-2xl font-bold">
              🧪
            </div>
            <h3 className="text-base font-black text-zinc-900">Bahan Alami & Safe</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              Cairan pembersih khusus dari bahan alami yang aman untuk serat Suede, Leather, Canvas, Nubuck, maupun Knit.
            </p>
          </div>

          <div className="bg-white border border-zinc-200 p-6 rounded-3xl space-y-3 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 text-yellow-400 flex items-center justify-center text-2xl font-bold">
              🚚
            </div>
            <h3 className="text-base font-black text-zinc-900">Layanan Ambil Antar</h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-normal">
              Meningkatkan kenyamanan Anda dengan kurir pickup & delivery langsung ke rumah atau lokasi kantor.
            </p>
          </div>
        </div>
      </section>

      {/* Our Services (Kartu Gelap Dengan Teks Terang) */}
      <section id="layanan" className="py-20 px-4 bg-zinc-950 text-white border-y border-zinc-800">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block">Layanan Terstandarisasi</span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white">Our Services & Price List</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Fast Clean',
                price: 'Rp 35.000',
                desc: 'Pembersihan cepat area luar (upper & midsole). Cepat & praktis untuk pemakaian harian.',
                time: '1 Hari',
              },
              {
                title: 'Deep Clean',
                price: 'Rp 50.000',
                desc: 'Pembersihan total seluruh bagian: upper, insole, midsole, outsole, & tali sepatu.',
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
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between hover:border-yellow-400 transition relative group shadow-xl"
              >
                {item.badge && (
                  <span className="absolute -top-3 right-4 bg-yellow-400 text-zinc-950 text-[10px] font-black px-3 py-0.5 rounded-full shadow uppercase">
                    {item.badge}
                  </span>
                )}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition">{item.title}</h3>
                  <div className="text-2xl font-black text-yellow-400">{item.price}</div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">{item.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-zinc-800 text-[11px] text-zinc-500 font-medium">
                  Estimasi: {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimoni" className="py-20 px-4 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">Ulasan Pelanggan</span>
          <h2 className="text-2xl sm:text-4xl font-black text-zinc-950 uppercase">Apa Kata Mereka?</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              text: 'Sepatu yang bahan suede ku bersih banget, sumpah gak nyangka noda olinya bisa hilang total. Bakal langganan terus!',
              name: 'GINBY',
              role: 'Asisten Dokter',
            },
            {
              text: 'Service-nya makin top! Dari jaman order via WA sampai skrg ada website live tracking fast respon bgt. Hasil cuci sangat memuaskan.',
              name: 'STEPHANIE K',
              role: 'Dancer',
            },
            {
              text: 'Cuci sepatu paling cepet dan bersih. Karyawannya ramah banget, kalo ada service yg emang ga perlu pasti dikabari jujur.',
              name: 'ADITYAPUTRI',
              role: 'Event Decorator',
            },
          ].map((review, i) => (
            <div key={i} className="bg-white border border-zinc-200 p-6 rounded-3xl space-y-4 shadow-sm flex flex-col justify-between">
              <p className="text-xs text-zinc-600 italic leading-relaxed font-normal">
                "{review.text}"
              </p>
              <div className="pt-3 border-t border-zinc-100 flex justify-between items-center">
                <div>
                  <span className="text-xs font-black text-zinc-900 block">{review.name}</span>
                  <span className="text-[10px] text-amber-600 font-bold block">{review.role}</span>
                </div>
                <span className="text-xs">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form Booking Gelap Kontras */}
      <section id="booking" className="py-20 px-4 bg-zinc-200 border-t border-zinc-300">
        <div className="max-w-xl mx-auto bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-white">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-white uppercase">Konsultasi / Layanan Ambil Antar</h2>
            <p className="text-xs text-zinc-400 font-normal">Isi form di bawah ini untuk terhubung langsung dengan Customer Service via WhatsApp</p>
          </div>

          <form onSubmit={handleConsultSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Nama Lengkap</label>
              <input
                type="text"
                placeholder="Contoh: Bowo"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Merek Sepatu / Tas</label>
              <input
                type="text"
                placeholder="Contoh: Adidas Samba / Tas Leather"
                required
                value={sepatu}
                onChange={(e) => setSepatu(e.target.value)}
                className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Pilihan Treatment</label>
              <select
                value={layanan}
                onChange={(e) => setLayanan(e.target.value)}
                className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs sm:text-sm text-white focus:outline-none focus:border-yellow-400"
              >
                <option value="Fast Clean">Fast Clean (Rp 35.000)</option>
                <option value="Deep Clean">Deep Clean (Rp 50.000)</option>
                <option value="Unyellowing">Unyellowing (Rp 40.000)</option>
                <option value="Repaint & Repair">Repaint & Repair (Rp 120.000)</option>
              </select>
            </div>

            {/* Checkbox Pickup Service */}
            <div className="bg-zinc-900 p-3.5 rounded-2xl border border-zinc-800 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-white">
                <input
                  type="checkbox"
                  checked={isPickup}
                  onChange={(e) => setIsPickup(e.target.checked)}
                  className="w-4 h-4 accent-yellow-400 rounded"
                />
                🛵 Gunakan Layanan Ambil Antar (Pickup & Delivery)
              </label>

              {isPickup && (
                <div className="pt-2">
                  <input
                    type="text"
                    placeholder="Masukkan alamat lengkap penjemputan..."
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    className="w-full p-2.5 bg-zinc-950 border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Catatan Tambahan (Opsional)</label>
              <input
                type="text"
                placeholder="Misal: Ada noda oli / minta perbaiki lem sol"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black py-3.5 rounded-2xl transition active:scale-95 shadow-md text-xs sm:text-sm uppercase tracking-wide border border-yellow-300"
            >
              KIRIM PESAN VIA WHATSAPP
            </button>
          </form>
        </div>
      </section>

      {/* Footer Gelap */}
      <footer className="bg-zinc-950 text-white border-t border-zinc-800 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-zinc-400">
          <div className="space-y-3">
            <span className="text-base font-black tracking-wider text-white">AITERNA_SHOE</span>
            <p className="leading-relaxed font-normal">
              Toko Reparasi & Perawatan Sepatu dan Tas. Laundry, Reglue, Repaint & Unyellowing sejak Juli 2019.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white mb-2">Jam Operasional Workshop</h4>
            <p>Senin – Sabtu: 09:00 – 20:00 WIB</p>
            <p>Minggu: 10:00 – 17:00 WIB</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white mb-2">Workshop & Kontak</h4>
            <p>Jakarta East, Indonesia</p>
            <p>Instagram: @aiternal_shoe</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto pt-8 mt-8 border-t border-zinc-900 text-center text-[11px] text-zinc-600">
          <p>© {new Date().getFullYear()} Aiterna Shoe • Shine And Clean. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
