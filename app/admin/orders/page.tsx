'use client';

import React, { useState } from 'react';

interface OrderItem {
  id: string;
  nota: string;
  customer: string;
  wa: string;
  sepatu: string;
  treatment: string;
  status: 'DITERIMA' | 'PROSES_CUCI' | 'PENGERINGAN' | 'SIAP_DIAMBIL' | 'SELESAI';
  pembayaran: 'LUNAS' | 'DP' | 'BELUM_BAYAR';
  tgl: string;
}

export default function RakPesananPage() {
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: '1',
      nota: 'AIT-260906-881',
      customer: 'Mas Bowo',
      wa: '081234567890',
      sepatu: 'Adidas Samba Black (42)',
      treatment: 'Deep Clean',
      status: 'PROSES_CUCI',
      pembayaran: 'LUNAS',
      tgl: '2026-09-06',
    },
    {
      id: '2',
      nota: 'AIT-260906-412',
      customer: 'Dr. Ginby',
      wa: '081987654321',
      sepatu: 'Nike Air Jordan Suede',
      treatment: 'Repaint & Repair',
      status: 'PENGERINGAN',
      pembayaran: 'DP',
      tgl: '2026-09-05',
    },
    {
      id: '3',
      nota: 'AIT-260906-105',
      customer: 'Mbok Memes',
      wa: '081311223344',
      sepatu: 'Vans Old Skool White',
      treatment: 'Unyellowing',
      status: 'SIAP_DIAMBIL',
      pembayaran: 'LUNAS',
      tgl: '2026-09-04',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const updateStatus = (id: string, newStatus: OrderItem['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const filteredOrders = orders.filter((o) =>
    filterStatus === 'ALL' ? true : o.status === filterStatus
  );

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl">
        <div>
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block">Operational Dashboard</span>
          <h1 className="text-2xl font-black text-white">DAFTAR RAK WORKSHOP</h1>
        </div>
        
        {/* Filter Status Quick Tab */}
        <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
          {['ALL', 'DITERIMA', 'PROSES_CUCI', 'PENGERINGAN', 'SIAP_DIAMBIL'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                filterStatus === st
                  ? 'bg-yellow-400 text-zinc-950 shadow-md'
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-white'
              }`}
            >
              {st === 'ALL' ? 'Semua Rak' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Rak Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOrders.map((item) => (
          <div
            key={item.id}
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between hover:border-zinc-700 transition"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs font-black text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-lg border border-yellow-400/20">
                  {item.nota}
                </span>
                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                    item.pembayaran === 'LUNAS'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {item.pembayaran}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{item.customer}</h3>
                <p className="text-xs text-zinc-400 font-mono">📱 {item.wa}</p>
              </div>

              <div className="bg-zinc-950 border border-zinc-800/80 p-3 rounded-2xl space-y-1">
                <p className="text-xs text-zinc-200 font-semibold">{item.sepatu}</p>
                <p className="text-[11px] text-yellow-400 font-bold">Treatment: {item.treatment}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800/80 space-y-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase">Ubah Status Rak:</label>
              <select
                value={item.status}
                onChange={(e) => updateStatus(item.id, e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 text-xs font-bold text-white rounded-xl p-2.5 focus:outline-none focus:border-yellow-400"
              >
                <option value="DITERIMA">📥 DITERIMA (Baru Masuk)</option>
                <option value="PROSES_CUCI">🧼 PROSES CUCI / REPAIR</option>
                <option value="PENGERINGAN">💨 PENGERINGAN / DETAILING</option>
                <option value="SIAP_DIAMBIL">✅ SIAP DIAMBIL</option>
                <option value="SELESAI">🎉 SELESAI / SUDAH DIAMBIL</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
