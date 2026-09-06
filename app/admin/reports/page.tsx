'use client';

import React, { useState } from 'react';

export default function AdvanceLaporanOmzetPage() {
  const [periode, setPeriode] = useState<'TODAY' | 'THIS_WEEK' | 'THIS_MONTH'>('THIS_MONTH');

  // Dummy Dataset Analitik Advance
  const metrics = {
    TODAY: {
      totalOmzet: 425000,
      totalPasang: 8,
      piutangDP: 50000,
      aov: 53125,
      fastClean: 3,
      deepClean: 4,
      repaint: 1,
      qris: 280000,
      cash: 145000,
    },
    THIS_WEEK: {
      totalOmzet: 2850000,
      totalPasang: 52,
      piutangDP: 180000,
      aov: 54807,
      fastClean: 18,
      deepClean: 26,
      repaint: 8,
      qris: 1900000,
      cash: 950000,
    },
    THIS_MONTH: {
      totalOmzet: 12450000,
      totalPasang: 230,
      piutangDP: 420000,
      aov: 54130,
      fastClean: 80,
      deepClean: 115,
      repaint: 35,
      qris: 8200000,
      cash: 4250000,
    },
  };

  const current = metrics[periode];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header Bar & Period Filter */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl">
        <div>
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block">Executive Financial Dashboard</span>
          <h1 className="text-2xl font-black text-white">LAPORAN OMZET & ANALITIK</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-zinc-950 p-1 rounded-2xl border border-zinc-800 flex gap-1">
            {(['TODAY', 'THIS_WEEK', 'THIS_MONTH'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriode(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  periode === p
                    ? 'bg-yellow-400 text-zinc-950 shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {p === 'TODAY' ? 'Hari Ini' : p === 'THIS_WEEK' ? 'Minggu Ini' : 'Bulan Ini'}
              </button>
            ))}
          </div>

          <button
            onClick={handlePrint}
            className="bg-zinc-800 hover:bg-zinc-700 text-white p-2.5 rounded-2xl border border-zinc-700 transition text-xs font-bold"
            title="Cetak Laporan"
          >
            🖨️ Cetak
          </button>
        </div>
      </div>

      {/* KPI Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-2 shadow-xl">
          <span className="text-xs font-bold text-zinc-400 uppercase">Total Omzet Bersih</span>
          <div className="text-2xl font-black text-yellow-400 font-mono">
            Rp {current.totalOmzet.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold block">▲ 12% dari periode sebelumnya</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-2 shadow-xl">
          <span className="text-xs font-bold text-zinc-400 uppercase">Total Sepatu Dikerjakan</span>
          <div className="text-2xl font-black text-white font-mono">
            {current.totalPasang} <span className="text-xs text-zinc-500 font-normal">Pasang</span>
          </div>
          <span className="text-[10px] text-zinc-400 font-semibold block">Estimasi selesai tepat waktu</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-2 shadow-xl">
          <span className="text-xs font-bold text-zinc-400 uppercase">Piutang / Sisa DP</span>
          <div className="text-2xl font-black text-amber-400 font-mono">
            Rp {current.piutangDP.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-amber-500/80 font-semibold block">Belum pelunasan di kasir</span>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-2 shadow-xl">
          <span className="text-xs font-bold text-zinc-400 uppercase">Rata-Rata Nota (AOV)</span>
          <div className="text-2xl font-black text-white font-mono">
            Rp {current.aov.toLocaleString('id-ID')}
          </div>
          <span className="text-[10px] text-zinc-400 font-semibold block">Per transaksi pelanggan</span>
        </div>
      </div>

      {/* Analytics Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Treatment Distribution */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <h2 className="text-sm font-black text-yellow-400 uppercase tracking-wider">Performa Treatment</h2>
          
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Deep Clean (Rp 50k)</span>
                <span className="text-yellow-400">{current.deepClean} pasang</span>
              </div>
              <div className="w-full bg-zinc-950 h-2.5 rounded-full overflow-hidden border border-zinc-800">
                <div className="bg-yellow-400 h-full rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Fast Clean (Rp 35k)</span>
                <span className="text-yellow-400">{current.fastClean} pasang</span>
              </div>
              <div className="w-full bg-zinc-950 h-2.5 rounded-full overflow-hidden border border-zinc-800">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Repaint & Repair (Rp 120k)</span>
                <span className="text-yellow-400">{current.repaint} pasang</span>
              </div>
              <div className="w-full bg-zinc-950 h-2.5 rounded-full overflow-hidden border border-zinc-800">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Breakdown */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-black text-yellow-400 uppercase tracking-wider mb-4">Metode Pembayaran</h2>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-500 font-bold uppercase block">QRIS / Transfer</span>
                <span className="text-lg font-mono font-black text-emerald-400">
                  Rp {current.qris.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-1">
                <span className="text-[10px] text-zinc-500 font-bold uppercase block">Uang Tunai (Cash)</span>
                <span className="text-lg font-mono font-black text-yellow-400">
                  Rp {current.cash.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-zinc-500 text-center font-medium pt-2">
            💡 Semua transaksi di atas terekam otomatis dari POS Kasir Toko Aiterna.
          </p>
        </div>
      </div>
    </div>
  );
}
