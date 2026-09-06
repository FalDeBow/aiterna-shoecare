'use client';

import React, { useState } from 'react';

export default function KasirPOSPage() {
  // Generasi No. Nota Otomatis
  const [notaId] = useState(`AIT-${new Date().toISOString().slice(2,10).replace(/-/g,'')}-${Math.floor(100 + Math.random() * 900)}`);
  
  // State Form Kasir
  const [namaCustomer, setNamaCustomer] = useState('');
  const [noWa, setNoWa] = useState('');
  const [sepatu, setSepatu] = useState('');
  const [layanan, setLayanan] = useState('Deep Clean');
  const [harga, setHarga] = useState(50000);
  const [statusBayar, setStatusBayar] = useState('LUNAS');
  const [nominalDP, setNominalDP] = useState(0);
  const [catatan, setCatatan] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Auto-set harga berdasarkan treatment
  const handleLayananChange = (val: string) => {
    setLayanan(val);
    if (val === 'Fast Clean') setHarga(35000);
    else if (val === 'Deep Clean') setHarga(50000);
    else if (val === 'Unyellowing') setHarga(40000);
    else if (val === 'Repaint & Repair') setHarga(120000);
  };

  const handleSubmitNota = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(`Nota ${notaId} Berhasil Dibuat!`);

    // Reset Form untuk transaksi berikutnya
    setTimeout(() => {
      setSuccessMsg('');
      setNamaCustomer('');
      setNoWa('');
      setSepatu('');
      setCatatan('');
    }, 3000);
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl">
        <div>
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block">Point of Sale</span>
          <h1 className="text-2xl font-black text-white">INPUT TRANSAKSI KASIR</h1>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-2xl text-right">
          <span className="text-[10px] text-zinc-500 font-bold block">NO. NOTA OTO</span>
          <span className="text-sm font-mono font-black text-yellow-400">{notaId}</span>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl text-xs font-bold text-center">
          ✅ {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmitNota} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Pelanggan & Barang */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <h2 className="text-sm font-black text-yellow-400 uppercase tracking-wider">1. Data Pelanggan & Sepatu</h2>
          
          <div>
            <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Nama Pelanggan</label>
            <input
              type="text"
              required
              placeholder="Contoh: Mas Bowo"
              value={namaCustomer}
              onChange={(e) => setNamaCustomer(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">No. WhatsApp</label>
            <input
              type="tel"
              required
              placeholder="Contoh: 081234567890"
              value={noWa}
              onChange={(e) => setNoWa(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Merek & Seri Sepatu/Tas</label>
            <input
              type="text"
              required
              placeholder="Contoh: Adidas Samba Size 42"
              value={sepatu}
              onChange={(e) => setSepatu(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white focus:outline-none focus:border-yellow-400"
            />
          </div>
        </div>

        {/* Detail Layanan & Pembayaran */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-sm font-black text-yellow-400 uppercase tracking-wider">2. Treatment & Pembayaran</h2>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Pilihan Treatment</label>
              <select
                value={layanan}
                onChange={(e) => handleLayananChange(e.target.value)}
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white focus:outline-none focus:border-yellow-400"
              >
                <option value="Fast Clean">Fast Clean (Rp 35.000)</option>
                <option value="Deep Clean">Deep Clean (Rp 50.000)</option>
                <option value="Unyellowing">Unyellowing (Rp 40.000)</option>
                <option value="Repaint & Repair">Repaint & Repair (Rp 120.000)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Status Bayar</label>
                <select
                  value={statusBayar}
                  onChange={(e) => setStatusBayar(e.target.value)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="LUNAS">LUNAS</option>
                  <option value="DP">DP (Uang Muka)</option>
                  <option value="BELUM_BAYAR">BELUM BAYAR</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Total Tagihan</label>
                <input
                  type="number"
                  value={harga}
                  onChange={(e) => setHarga(Number(e.target.value))}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-yellow-400 font-bold focus:outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            {statusBayar === 'DP' && (
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Nominal DP (Rp)</label>
                <input
                  type="number"
                  placeholder="Masukkan nominal DP..."
                  value={nominalDP}
                  onChange={(e) => setNominalDP(Number(e.target.value))}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white focus:outline-none focus:border-yellow-400"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Catatan Kondisi (Opsional)</label>
              <input
                type="text"
                placeholder="Misal: Sol samping menguning / noda oli"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black py-4 rounded-2xl transition active:scale-95 uppercase tracking-wide text-xs shadow-lg shadow-yellow-400/10 mt-4"
          >
            SIMPAN & CETAK NOTA TRANSAKSI
          </button>
        </div>
      </form>
    </div>
  );
}
