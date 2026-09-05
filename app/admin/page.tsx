'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminPOS() {
  const [nama, setNama] = useState('');
  const [noWa, setNoWa] = useState('');
  const [merek, setMerek] = useState('');
  const [tag, setTag] = useState('Tag #01');
  const [layanan, setLayanan] = useState('Deep Clean');
  const [harga, setHarga] = useState(50000);
  const [statusBayar, setStatusBayar] = useState('PAID');
  const [catatan, setCatatan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Cek Pelanggan
      const { data: existingCust } = await supabase
        .from('customers')
        .select('id')
        .eq('no_wa', noWa)
        .maybeSingle();

      let customerId = existingCust?.id;

      if (!customerId) {
        const { data: newCust, error: createCustErr } = await supabase
          .from('customers')
          .insert([{ nama, no_wa: noWa }])
          .select('id')
          .single();

        if (createCustErr || !newCust) {
          throw new Error(createCustErr?.message || 'Gagal membuat pelanggan');
        }
        customerId = newCust.id;
      }

      // 2. Buat No. Nota Otomatis
      const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
      const randomNum = Math.floor(100 + Math.random() * 900);
      const noNota = `AIT-${dateStr}-${randomNum}`;

      // 3. Simpan Pesanan (Orders)
      const { data: order, error: orderErr } = await supabase
        .from('orders')
        .insert([
          {
            no_nota: noNota,
            customer_id: customerId,
            tag_number: tag,
            total_biaya: harga,
            status: 'DITERIMA',
            status_bayar: statusBayar,
          },
        ])
        .select('id')
        .single();

      if (orderErr || !order) {
        throw new Error(orderErr?.message || 'Gagal menyimpan pesanan');
      }

      // 4. Simpan Detail Sepatu
      const { error: itemErr } = await supabase.from('shoe_items').insert([
        {
          order_id: order.id,
          merek_warna: merek,
          layanan: layanan,
          catatan: catatan,
        },
      ]);

      if (itemErr) throw itemErr;

      // 5. Format Draf Pesan WA
      const statusBayarLabel =
        statusBayar === 'PAID' ? 'LUNAS' : statusBayar === 'DP' ? 'DP (UANG MUKA)' : 'BELUM LUNAS';

      const pesan =
        `Halo Kak ${nama}! Terima kasih telah merawat sepatu di *Aiterna Shoecare*.\n\n` +
        `📋 *NOTA TRANSAKSI*\n` +
        `• No. Nota: *${noNota}*\n` +
        `• Tag Rak: *${tag}*\n` +
        `• Sepatu: *${merek}*\n` +
        `• Layanan: *${layanan}*\n` +
        `• Total Biaya: Rp ${harga.toLocaleString('id-ID')}\n` +
        `• Status Bayar: *${statusBayarLabel}*\n` +
        (catatan ? `• Catatan: _${catatan}_\n\n` : `\n`) +
        `Pantau status pengerjaan sepatumu secara langsung di sini:\n` +
        `https://aiterna.vercel.app/track/${noNota}`;

      const waUrl = `https://wa.me/${noWa.replace(/^0/, '62')}?text=${encodeURIComponent(pesan)}`;
      window.open(waUrl, '_blank');

      alert(`Transaksi ${noNota} Berhasil Disimpan!`);

      // Reset Form
      setNama('');
      setNoWa('');
      setMerek('');
      setCatatan('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan';
      alert('Gagal: ' + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 font-sans">
      <div className="max-w-md mx-auto bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
        
        {/* Navigation Bar Header */}
        <div className="bg-slate-950 p-2 flex border-b border-slate-800 text-xs font-bold">
          <Link
            href="/admin"
            className="flex-1 py-2.5 text-center bg-emerald-600 text-white rounded-xl shadow transition"
          >
            + Kasir Baru
          </Link>
          <Link
            href="/admin/orders"
            className="flex-1 py-2.5 text-center text-slate-400 hover:text-white transition"
          >
            Daftar Pesanan
          </Link>
        </div>

        {/* Branding Header */}
        <div className="p-4 text-center border-b border-slate-800/60 bg-gradient-to-b from-slate-900 to-slate-950">
          <h1 className="text-xl font-black tracking-wider text-white">AITERNA POS</h1>
          <p className="text-xs text-slate-400">Input Transaksi & Nota Digital</p>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Nama Pelanggan
            </label>
            <input
              type="text"
              placeholder="Contoh: Budi Santoso"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full p-3 bg-slate-800/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              No. WhatsApp
            </label>
            <input
              type="number"
              placeholder="081234567890"
              required
              value={noWa}
              onChange={(e) => setNoWa(e.target.value)}
              className="w-full p-3 bg-slate-800/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Merek & Warna Sepatu
            </label>
            <input
              type="text"
              placeholder="Nike Air Jordan - Putih"
              required
              value={merek}
              onChange={(e) => setMerek(e.target.value)}
              className="w-full p-3 bg-slate-800/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Tag Rak
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full p-3 bg-slate-800/80 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              >
                <option>Tag #01</option>
                <option>Tag #02</option>
                <option>Tag #03</option>
                <option>Tag #04</option>
                <option>Tag #05</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Layanan
              </label>
              <select
                value={layanan}
                onChange={(e) => {
                  setLayanan(e.target.value);
                  if (e.target.value === 'Fast Clean') setHarga(35000);
                  if (e.target.value === 'Deep Clean') setHarga(50000);
                  if (e.target.value === 'Unyellowing') setHarga(40000);
                  if (e.target.value === 'Repaint') setHarga(120000);
                }}
                className="w-full p-3 bg-slate-800/80 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Fast Clean">Fast Clean (35rb)</option>
                <option value="Deep Clean">Deep Clean (50rb)</option>
                <option value="Unyellowing">Unyellowing (40rb)</option>
                <option value="Repaint">Repaint (120rb)</option>
              </select>
            </div>
          </div>

          {/* Status Bayar Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Status Pembayaran
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'PAID', label: 'LUNAS' },
                { id: 'DP', label: 'DP' },
                { id: 'UNPAID', label: 'BELUM BAYAR' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setStatusBayar(item.id)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition ${
                    statusBayar === item.id
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Catatan Kondisi (Opsional)
            </label>
            <input
              type="text"
              placeholder="Misal: Outsole menguning, ada noda oli"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full p-3 bg-slate-800/80 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
            />
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
            <span className="text-sm font-medium text-slate-400">Total Biaya:</span>
            <span className="text-2xl font-black text-emerald-400">
              Rp {harga.toLocaleString('id-ID')}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-xl font-extrabold tracking-wide transition active:scale-95 disabled:bg-slate-700"
          >
            {loading ? 'MENYIMPAN...' : 'SIMPAN & KIRIM NOTA WA'}
          </button>
        </form>
      </div>
    </div>
  );
}