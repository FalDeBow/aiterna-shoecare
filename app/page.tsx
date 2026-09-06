'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StorytellingLandingPage() {
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
      `• Sepatu: *${sepatu}*\n` +
      `• Treatment: *${layanan}*\n` +
      (catatan ? `• Catatan: _${catatan}_\n\n` : `\n`) +
      `Mohon info lokasi dan estimasi pengerjaan. Terima kasih!`;

    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(pesan)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0F0E0C] text-stone-200 font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Banner Promotion */}
      <div className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-600 text-black text-[11px] font-bold py-1.5 px-4 text-center tracking-wide">
        ✨ PROMO MEMBER BARU: Dapatkan Bonus 10 Poin Pertama Saat Mendaftar di Member Circle!
      </div>

      {/* Navbar Premium */}
      <header className="sticky top-0 z-50 bg-[#0F0E0C]/90 backdrop-blur-md border-b border-stone-800/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-black text-black text-sm shadow-lg shadow-amber-500/20">
              A
            </div>
            <div>
              <span className="text-lg font-black tracking-widest text-stone-100 block leading-none">
                AITERNA
              </span>
              <span className="text-[9px] text-amber-500/90 tracking-widest font-bold block mt-0.5">
                SHOECARE ATELIER
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-stone-400">
            <a href="#story" className="hover:text-amber-400 transition">Cerita Kami</a>
            <a href="#proses" className="hover:text-amber-400 transition">Proses Treatment</a>
            <a href="#layanan" className="hover:text-amber-400 transition">Katalog Layanan</a>
            <Link href="/member" className="text-amber-400 font-bold hover:text-amber-300 transition flex items-center gap-1">
              ⭐ Membership
            </Link>
            <a href="#tracking" className="hover:text-amber-400 transition">Cek Nota Live</a>
          </nav>

          <a
            href="#konsultasi"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs font-extrabold px-4 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/10"
          >
            Konsultasi Sepatu
          </a>
        </div>
      </header>

      {/* Bab 1: Hero Section (Emosi & Story) */}
      <section className="relative pt-16 pb-20 px-4 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 border border-amber-500/30 text-xs font-semibold text-amber-400 shadow-inner">
          <span>👟</span> Premium Footwear Restoration & Care
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-stone-100 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Setiap Sepatu Punya Cerita.{' '}
          <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent">
            Kami Merawat Kenangannya.
          </span>
        </h1>

        <p className="text-sm sm:text-lg text-stone-400 max-w-2xl mx-auto leading-relaxed font-light">
          Jangan biarkan noda, debu, dan oksidasi merusak sepatu favoritmu. Kami mengembalikan kesegaran sepatu kesayangan dengan metode *artisan care* dan transparansi *live tracking*.
        </p>

        {/* Live Tracking Quick Bar */}
        <div id="tracking" className="pt-6 max-w-xl mx-auto">
          <div className="bg-stone-900/90 border border-stone-800 p-3 rounded-2xl shadow-2xl space-y-2">
            <form onSubmit={handleTrackSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Ketik No. Nota (Contoh: AIT-260906-123)"
                value={trackNota}
                onChange={(e) => setTrackNota(e.target.value)}
                className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 uppercase font-mono"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-black px-5 py-3 rounded-xl transition whitespace-nowrap shadow-md"
              >
                Cek Progres 🔍
              </button>
            </form>
            <p className="text-[11px] text-stone-500 text-left px-1">
              💡 Pelanggan setia? Masukkan nomor nota transaksi untuk memantau pengerjaan secara langsung.
            </p>
          </div>
        </div>
      </section>

      {/* Bab 2: Storytelling Narrative / Mengapa Aiterna */}
      <section id="story" className="py-20 px-4 bg-stone-900/40 border-y border-stone-800/80">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold tracking-widest text-amber-500 uppercase block">
              Filosofi Perawatan
            </span>
            <h2 className="text-3xl font-bold text-stone-100 leading-tight">
              Lebih Dari Sekadar Membersihkan, Ini Restorasi Seni Footwear
            </h2>
            <p className="text-sm text-stone-400 leading-relaxed font-light">
              Sepatu buatan tangan, *leather boots*, hingga *limited sneakers* membutuhkan perlakuan khusus. Penggunaan sabun sembarangan bisa merusak struktur serat kain, membuat bahan kulit menjadi pecah, atau memudarkan warna aslinya.
            </p>
            <p className="text-sm text-stone-400 leading-relaxed font-light">
              Di **Aiterna Shoecare**, kami memadukan teknik pembersihan manual tingkat tinggi dengan cairan pembersih khusus ramah lingkungan yang disesuaikan dengan karakteristik bahan sepatu Anda.
            </p>
            <div className="pt-2 flex gap-6 text-xs text-stone-300 font-semibold">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-base">✓</span> Premium Cleaner
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-base">✓</span> Live Status
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-base">✓</span> Garansi Cuci
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-stone-900 p-5 rounded-2xl border border-stone-800 space-y-3">
              <div className="text-3xl">🧽</div>
              <h3 className="text-sm font-bold text-stone-200">Material Specific</h3>
              <p className="text-xs text-stone-400 font-light">Treatment terpisah untuk Suede, Canvas, Leather, Mesh, & Nubuck.</p>
            </div>
            <div className="bg-stone-900 p-5 rounded-2xl border border-stone-800 space-y-3 mt-6">
              <div className="text-3xl">☀️</div>
              <h3 className="text-sm font-bold text-stone-200">Anti-Oksidasi</h3>
              <p className="text-xs text-stone-400 font-light">Mencegah dan memulihkan midsole karet yang menguning.</p>
            </div>
            <div className="bg-stone-900 p-5 rounded-2xl border border-stone-800 space-y-3">
              <div className="text-3xl">📱</div>
              <h3 className="text-sm font-bold text-stone-200">Nota Digital</h3>
              <p className="text-xs text-stone-400 font-light">Pantau posisi rak dan status pengerjaan secara real-time via WA.</p>
            </div>
            <div className="bg-stone-900 p-5 rounded-2xl border border-stone-800 space-y-3 mt-6">
              <div className="text-3xl">⭐</div>
              <h3 className="text-sm font-bold text-stone-200">Aiterna Circle</h3>
              <p className="text-xs text-stone-400 font-light">Sistem poin otomatis yang memberikan diskon khusus di setiap perawatan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bab 3: Process Flow (4 Langkah Penanganan) */}
      <section id="proses" className="py-20 px-4 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-amber-500 uppercase block">Alur Pengerjaan</span>
          <h2 className="text-3xl font-bold text-stone-100">4 Langkah Standardisasi Perawatan</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Inspeksi & Diagnosa', desc: 'Pengecekan mendalam noda, kondisi outsole, serta identifikasi bahan sepatu.' },
            { step: '02', title: 'Deep Treatment', desc: 'Pembersihan mikro menggunakan cairan khusus dan sikat bulu kuda yang aman.' },
            { step: '03', title: 'Natural Drying', desc: 'Pengeringan suhu ruangan khusus tanpa paparan matahari langsung agar tidak merusak lem.' },
            { step: '04', title: 'Quality Control', desc: 'Pemberian deodorizer, tagging rak, dan pembaruan nota status siap diambil.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-stone-900/60 border border-stone-800/80 p-6 rounded-2xl relative space-y-3 hover:border-amber-500/40 transition">
              <span className="text-3xl font-black text-amber-500/30 font-mono">{item.step}</span>
              <h3 className="text-base font-bold text-stone-200">{item.title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bab 4: Katalog Layanan & Price List */}
      <section id="layanan" className="py-20 px-4 bg-stone-900/40 border-y border-stone-800/80">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold tracking-widest text-amber-500 uppercase block">Katalog Layanan</span>
            <h2 className="text-3xl font-bold text-stone-100">Pilihan Treatment Sesuai Kebutuhan</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Fast Clean',
                price: 'Rp 35.000',
                desc: 'Pembersihan cepat area luar (upper & midsole). Solusi praktis pemakaian harian.',
                time: '1 Hari',
              },
              {
                title: 'Deep Clean',
                price: 'Rp 50.000',
                desc: 'Pembersihan menyeluruh seluruh bagian: upper, insole, midsole, outsole, & tali sepatu.',
                time: '2-3 Hari',
                badge: 'Paling Laris',
              },
              {
                title: 'Unyellowing',
                price: 'Rp 40.000',
                desc: 'Treatment pemulihan warna menguning pada midsole akibat oksidasi karet/BOOST.',
                time: '2-3 Hari',
              },
              {
                title: 'Repaint & Recolor',
                price: 'Rp 120.000',
                desc: 'Pengecatan ulang warna pudar atau ganti warna baru dengan cat sintetis/leather.',
                time: '4-7 Hari',
              },
            ].map((card, i) => (
              <div key={i} className="bg-stone-900 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition relative group">
                {card.badge && (
                  <span className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                    {card.badge}
                  </span>
                )}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-stone-100 group-hover:text-amber-400 transition">{card.title}</h3>
                  <div className="text-2xl font-black text-amber-400">{card.price}</div>
                  <p className="text-xs text-stone-400 leading-relaxed font-light">{card.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-stone-800/80 text-[11px] text-stone-500 font-medium">
                  ⏱️ Estimasi: {card.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bab 5: Membership Teaser */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-center space-y-6">
        <div className="bg-gradient-to-br from-amber-500/10 via-stone-900 to-emerald-500/10 border border-amber-500/30 p-8 sm:p-12 rounded-3xl space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">Aiterna Rewards Circle</span>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-100">Kumpulkan Poin di Setiap Cuci Sepatu</h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto font-light leading-relaxed">
            Dapatkan bonus 10 poin pendaftaran pertama! Tukarkan poin perawatanmu dengan diskon spesial hingga gratis Fast Clean.
          </p>
          <div className="pt-2">
            <Link
              href="/member"
              className="inline-block bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs sm:text-sm font-black px-6 py-3.5 rounded-xl transition shadow-lg shadow-amber-500/10"
            >
              DAFTAR / CEK POIN MEMBER →
            </Link>
          </div>
        </div>
      </section>

      {/* Bab 6: Form Konsultasi & Booking WA */}
      <section id="konsultasi" className="py-20 px-4 bg-stone-900/40 border-t border-stone-800/80">
        <div className="max-w-xl mx-auto bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-stone-100">Konsultasi / Booking Treatment</h2>
            <p className="text-xs text-stone-400 font-light">Tanyakan kondisi sepatu atau buat janji penyerahan ke workshop</p>
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
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">Merek & Seri Sepatu</label>
              <input
                type="text"
                placeholder="Contoh: Adidas Samba / Nike Air Jordan"
                required
                value={sepatu}
                onChange={(e) => setSepatu(e.target.value)}
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">Pilihan Treatment</label>
              <select
                value={layanan}
                onChange={(e) => setLayanan(e.target.value)}
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 focus:outline-none focus:border-amber-500"
              >
                <option value="Fast Clean">Fast Clean (Rp 35.000)</option>
                <option value="Deep Clean">Deep Clean (Rp 50.000)</option>
                <option value="Unyellowing">Unyellowing (Rp 40.000)</option>
                <option value="Repaint & Recolor">Repaint & Recolor (Rp 120.000)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-stone-400 mb-1">Catatan Kondisi (Opsional)</label>
              <input
                type="text"
                placeholder="Misal: Sol samping menguning / ada noda lumpur"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full p-3 bg-stone-950 border border-stone-800 rounded-xl text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black py-3.5 rounded-xl transition active:scale-95 shadow-lg shadow-amber-500/10 text-xs sm:text-sm"
            >
              KIRIM PESAN KONSULTASI VIA WA
            </button>
          </form>
        </div>
      </section>

      {/* Footer Murni Publik */}
      <footer className="bg-stone-950 border-t border-stone-800/80 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-stone-400">
          <div className="space-y-3">
            <span className="text-base font-black tracking-widest text-stone-100">AITERNA SHOECARE</span>
            <p className="leading-relaxed font-light">
              Atelier perawatan dan restorasi sepatu profesional dengan sistem transparansi pengerjaan real-time.
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
            <p>WhatsApp: +62 812-3456-7890</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto pt-8 mt-8 border-t border-stone-900 text-center text-[11px] text-stone-600">
          <p>© {new Date().getFullYear()} Aiterna Shoecare Atelier. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
