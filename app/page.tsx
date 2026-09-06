'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AiternaTRGlassLandingPage() {
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
    <div className="min-h-screen bg-[#080808] text-stone-200 font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* Top Banner Credibility & Eco Commitment */}
      <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-stone-950 text-[11px] font-black py-1.5 px-4 text-center tracking-wider uppercase shadow-md flex justify-center items-center gap-2">
        <span>⚡ AITERNA SHOE & BAG RESTORATION</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">LAUNDRY & REPAIR SINCE JULY 2019</span>
        <span>•</span>
        <span className="bg-stone-950 text-yellow-400 px-2 py-0.5 rounded text-[10px] font-bold">#ZeroWaste Packaging</span>
      </div>

      {/* Navbar TR-Glass (Glassmorphism) */}
      <header className="sticky top-0 z-50 bg-[#080808]/75 backdrop-blur-xl border-b border-stone-800/80 transition-all">
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
            className="bg-yellow-400 hover:bg-yellow-300 text-stone-950 text-xs font-black px-4 py-2.5 rounded-xl transition shadow-lg shadow-yellow-400/20 uppercase tracking-wide"
          >
            Pickup / Booking WA
          </a>
        </div>
      </header>

      {/* Hero Section dengan Ambient Dark Photography & TR-Glass Card */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden border-b border-stone-800/80">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-50 opacity-40 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-[#080808]/40" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-7 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/80 border border-yellow-400/30 text-xs font-bold text-yellow-400 backdrop-blur-md shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
            Toko Reparasi & Laundry Sepatu Tas • Since July 2019
          </div>

          <h1 className="text-4xl sm:text-7xl font-black text-stone-100 tracking-tight leading-none uppercase drop-shadow-xl">
            GET YOUR SHOES’{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500">
              GLORY BACK
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-light">
            Kembalikan kejayaan dan kesegaran sepatu kesayanganmu. Layanan pencucian, restorasi warna, & repair dengan standar kualitas tinggi serta transparansi *live tracking*.
          </p>

          {/* TR-Glass Live Tracking Box */}
          <div id="tracking" className="pt-4 max-w-lg mx-auto">
            <div className="bg-stone-900/60 border border-stone-700/70 p-4 rounded-3xl shadow-2xl backdrop-blur-xl space-y-2">
              <form onSubmit={handleTrackSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ketik No. Nota (Contoh: AIT-260906-123)"
                  value={trackNota}
                  onChange={(e) => setTrackNota(e.target.value)}
                  className="flex-1 bg-stone-950/80 border border-stone-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-yellow-400 uppercase font-mono"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-300 text-stone-950 text-xs sm:text-sm font-black px-5 py-3 rounded-2xl transition whitespace-nowrap shadow-md uppercase tracking-wide"
                >
                  Cek Nota 🔍
                </button>
              </form>
              <p className="text-[11px] text-stone-400 text-left px-1 font-medium">
                Ketik nomor nota transaksi untuk memantau status pengerjaan secara real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Counter Bar (Adopted & Adapted) */}
      <section className="bg-stone-900/60 border-b border-stone-800/80 py-8 px-4 backdrop-blur-md">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-yellow-400 font-mono block">12.500+</span>
            <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider block">Pasang Sepatu Selesai</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-yellow-400 font-mono block">2019</span>
            <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider block">Tahun Berdiri</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-yellow-400 font-mono block">100%</span>
            <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider block">Bahan Alami & Safe</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-yellow-400 font-mono block">#ZeroWaste</span>
            <span className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider block">Eco Reusable Bag</span>
          </div>
        </div>
      </section>

      {/* Why Choose Us - 4 Pilar Utama (Adopted & TR-Glass Styled) */}
      <section id="keunggulan" className="py-20 px-4 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block">Mengapa Memilih Aiterna?</span>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-100 uppercase">Solusi Terbaik Untuk Sepatu & Tas Kesayangan</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-stone-900/50 border border-stone-800/80 p-6 rounded-3xl space-y-3 backdrop-blur-md hover:border-yellow-400/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 flex items-center justify-center text-2xl font-bold">
              🏷️
            </div>
            <h3 className="text-base font-bold text-stone-100">Harga Terjangkau</h3>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Semua layanan kami memiliki harga yang ramah dan transparan, baik untuk pelajar, mahasiswa, maupun pekerja.
            </p>
          </div>

          <div className="bg-stone-900/50 border border-stone-800/80 p-6 rounded-3xl space-y-3 backdrop-blur-md hover:border-yellow-400/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 flex items-center justify-center text-2xl font-bold">
              👨‍🔧
            </div>
            <h3 className="text-base font-bold text-stone-100">Teknisi Berpengalaman</h3>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Tim berpengalaman sejak 2019 yang dapat Anda percaya untuk menyelesaikan berbagai masalah kotoran & kerusakan sol.
            </p>
          </div>

          <div className="bg-stone-900/50 border border-stone-800/80 p-6 rounded-3xl space-y-3 backdrop-blur-md hover:border-yellow-400/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 flex items-center justify-center text-2xl font-bold">
              🧪
            </div>
            <h3 className="text-base font-bold text-stone-100">Bahan Alami & Safe</h3>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Cairan pembersih khusus dari bahan alami yang aman untuk serat Suede, Leather, Canvas, Nubuck, maupun Knit.
            </p>
          </div>

          <div className="bg-stone-900/50 border border-stone-800/80 p-6 rounded-3xl space-y-3 backdrop-blur-md hover:border-yellow-400/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 flex items-center justify-center text-2xl font-bold">
              🚚
            </div>
            <h3 className="text-base font-bold text-stone-100">Layanan Ambil Antar</h3>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Meningkatkan kenyamanan Anda dengan kurir pickup & delivery langsung ke rumah atau lokasi kantor.
            </p>
          </div>
        </div>
      </section>

      {/* Komitmen 3K Section (Kualitas, Kepuasan, Komunikasi) */}
      <section id="prioritas" className="py-20 px-4 bg-stone-900/30 border-y border-stone-800/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block">Komitmen Layanan</span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-100 uppercase">Prioritas Utama Kami</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-950/80 border border-stone-800 p-8 rounded-3xl space-y-3 relative overflow-hidden group">
              <span className="text-5xl font-black text-yellow-400/10 font-mono absolute top-4 right-4 group-hover:text-yellow-400/20 transition">01</span>
              <h3 className="text-xl font-bold text-stone-100">KUALITAS</h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Kualitas pengerjaan adalah standar baku di toko kami. Setiap detail jahitan, noda membandel, dan kesegaran insole kami perhatikan dengan teliti.
              </p>
            </div>

            <div className="bg-stone-950/80 border border-stone-800 p-8 rounded-3xl space-y-3 relative overflow-hidden group">
              <span className="text-5xl font-black text-yellow-400/10 font-mono absolute top-4 right-4 group-hover:text-yellow-400/20 transition">02</span>
              <h3 className="text-xl font-bold text-stone-100">KEPUASAN</h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Kepuasan pelanggan menjadi tolok ukur keberhasilan kami. Jika hasil cuci kurang maksimal, kami siap memberikan garansi cuci ulang tanpa biaya.
              </p>
            </div>

            <div className="bg-stone-950/80 border border-stone-800 p-8 rounded-3xl space-y-3 relative overflow-hidden group">
              <span className="text-5xl font-black text-yellow-400/10 font-mono absolute top-4 right-4 group-hover:text-yellow-400/20 transition">03</span>
              <h3 className="text-xl font-bold text-stone-100">KOMUNIKASI</h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                Tim Customer Care kami aktif memberikan update pengerjaan via WhatsApp dan live tracking. Jika ada service yang tidak diperlukan, pasti kami kabari secara terbuka.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Pricelist Section */}
      <section id="layanan" className="py-24 px-4 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block">Layanan Terstandarisasi</span>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-100 uppercase">Our Services & Price List</h2>
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
              className="bg-stone-900/60 border border-stone-800/80 rounded-3xl p-6 flex flex-col justify-between hover:border-yellow-400/50 transition relative group backdrop-blur-md"
            >
              {item.badge && (
                <span className="absolute -top-3 right-4 bg-yellow-400 text-stone-950 text-[10px] font-black px-3 py-0.5 rounded-full shadow-lg uppercase">
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

      {/* Testimonial Wall Grid (Adopted & TR-Glass Styled) */}
      <section id="testimoni" className="py-20 px-4 bg-stone-900/20 border-t border-stone-800/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block">Ulasan Pelanggan</span>
            <h2 className="text-2xl sm:text-4xl font-black text-stone-100 uppercase">Apa Kata Mereka?</h2>
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
              {
                text: 'Habis treatment repaint boost di Aiterna Shoe jadi mantap sepatuku! Kelihatan wangi & seperti baru keluar dari toko.',
                name: 'AFFINDI M',
                role: 'Entrepreneur',
              },
              {
                text: 'Layanan pickup amannya sangat membantu kegiatan ku yg super padat. Tinggal minta ambil via WA, sepatu balik udah wangi.',
                name: 'ALICIA',
                role: 'Makeup Artist',
              },
              {
                text: 'Sangat mengapresiasi gerakan #ZeroWaste nya! Paper bag dan laundry bag-nya berkualitas & bisa dipakai ulang.',
                name: 'LINTANG',
                role: 'Sneaker Enthusiast',
              },
            ].map((review, i) => (
              <div key={i} className="bg-stone-900/50 border border-stone-800/80 p-6 rounded-3xl space-y-4 backdrop-blur-md flex flex-col justify-between">
                <p className="text-xs text-stone-300 italic leading-relaxed font-light">
                  "{review.text}"
                </p>
                <div className="pt-3 border-t border-stone-800/80 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-stone-100 block">{review.name}</span>
                    <span className="text-[10px] text-yellow-400 font-medium block">{review.role}</span>
                  </div>
                  <span className="text-xs">⭐⭐⭐⭐⭐</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Booking & Pickup Form */}
      <section id="booking" className="py-20 px-4 max-w-xl mx-auto">
        <div className="bg-stone-900/80 border border-stone-700/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-stone-100 uppercase">Konsultasi / Layanan Ambil Antar</h2>
            <p className="text-xs text-stone-400 font-light">Isi form di bawah ini untuk terhubung langsung dengan Customer Service via WhatsApp</p>
          </div>

          <form onSubmit={handleConsultSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">Nama Lengkap</label>
              <input
                type="text"
                placeholder="Contoh: Bowo"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-2xl text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-yellow-400"
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
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-2xl text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">Pilihan Treatment</label>
              <select
                value={layanan}
                onChange={(e) => setLayanan(e.target.value)}
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-2xl text-xs sm:text-sm text-stone-100 focus:outline-none focus:border-yellow-400"
              >
                <option value="Fast Clean">Fast Clean (Rp 35.000)</option>
                <option value="Deep Clean">Deep Clean (Rp 50.000)</option>
                <option value="Unyellowing">Unyellowing (Rp 40.000)</option>
                <option value="Repaint & Repair">Repaint & Repair (Rp 120.000)</option>
              </select>
            </div>

            {/* Checkbox Pickup Service */}
            <div className="bg-stone-950 p-3.5 rounded-2xl border border-stone-800 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-stone-200">
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
                    className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-yellow-400"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">Catatan Tambahan (Opsional)</label>
              <input
                type="text"
                placeholder="Misal: Ada noda oli / minta perbaiki lem sol"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-2xl text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-stone-950 font-black py-3.5 rounded-2xl transition active:scale-95 shadow-lg shadow-yellow-400/20 text-xs sm:text-sm uppercase tracking-wide"
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
            <h4 className="text-sm font-bold text-stone-200 mb-2">Jam Operasional Workshop</h4>
            <p>Senin – Sabtu: 09:00 – 20:00 WIB</p>
            <p>Minggu: 10:00 – 17:00 WIB</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-stone-200 mb-2">Workshop & Kontak</h4>
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
