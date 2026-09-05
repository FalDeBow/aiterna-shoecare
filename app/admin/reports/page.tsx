'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ReportsPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<'today' | 'month' | 'all'>('month');

  const fetchReports = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*, customers(nama), shoe_items(layanan)');

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Filter berdasarkan periode waktu
  const now = new Date();
  const filteredOrders = orders.filter((o) => {
    const orderDate = new Date(o.created_at);
    if (range === 'today') {
      return (
        orderDate.getDate() === now.getDate() &&
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear()
      );
    }
    if (range === 'month') {
      return (
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear()
      );
    }
    return true;
  });

  // Kalkulasi Keuangan
  const totalOmzet = filteredOrders.reduce(
    (acc, curr) => acc + (Number(curr.total_biaya) || 0),
    0
  );
  const totalPaid = filteredOrders
    .filter((o) => o.status_bayar === 'PAID')
    .reduce((acc, curr) => acc + (Number(curr.total_biaya) || 0), 0);
  const totalDP = filteredOrders
    .filter((o) => o.status_bayar === 'DP')
    .reduce((acc, curr) => acc + (Number(curr.total_biaya) || 0), 0);
  const totalUnpaid = filteredOrders
    .filter((o) => o.status_bayar === 'UNPAID')
    .reduce((acc, curr) => acc + (Number(curr.total_biaya) || 0), 0);

  // Status Pengerjaan
  const countSelesai = filteredOrders.filter((o) => o.status === 'SELESAI').length;
  const countProses = filteredOrders.filter((o) => o.status !== 'SELESAI').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-5">
        
        {/* Navigation Bar Top */}
        <div className="bg-slate-900 p-2 flex rounded-2xl border border-slate-800 text-xs font-bold gap-1">
          <Link
            href="/admin"
            className="flex-1 py-2.5 text-center text-slate-400 hover:text-white transition"
          >
            + Kasir
          </Link>
          <Link
            href="/admin/orders"
            className="flex-1 py-2.5 text-center text-slate-400 hover:text-white transition"
          >
            Daftar Pesanan
          </Link>
          <Link
            href="/admin/reports"
            className="flex-1 py-2.5 text-center bg-emerald-600 text-white rounded-xl shadow transition"
          >
            Laporan Omzet
          </Link>
        </div>

        {/* Header & Range Selector */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-3">
          <div>
            <h1 className="text-lg font-bold text-white">Ringkasan Keuangan</h1>
            <p className="text-xs text-slate-400">Pantau performa bisnis Aiterna Shoecare</p>
          </div>

          <div className="flex gap-2">
            {[
              { id: 'today', label: 'Hari Ini' },
              { id: 'month', label: 'Bulan Ini' },
              { id: 'all', label: 'Semua' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setRange(btn.id as any)}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition ${
                  range === btn.id
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Cards Omzet */}
        {loading ? (
          <p className="text-center py-10 text-slate-500 animate-pulse text-sm">
            Kalkulasi laporan data...
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs font-semibold text-slate-400">TOTAL OMZET (PENDAPATAN)</span>
                <p className="text-3xl font-black text-emerald-400">
                  Rp {totalOmzet.toLocaleString('id-ID')}
                </p>
                <p className="text-xs text-slate-500 pt-1">
                  Dari total <strong className="text-white">{filteredOrders.length}</strong> transaksi pasang sepatu.
                </p>
              </div>

              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-semibold text-slate-400">STATUS PEMBAYARAN</span>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lunas (PAID):</span>
                    <strong className="text-emerald-400">Rp {totalPaid.toLocaleString('id-ID')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Uang Muka (DP):</span>
                    <strong className="text-amber-400">Rp {totalDP.toLocaleString('id-ID')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Belum Bayar (UNPAID):</span>
                    <strong className="text-rose-400">Rp {totalUnpaid.toLocaleString('id-ID')}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistik Pengerjaan */}
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
              <h2 className="text-sm font-bold text-white">Status Pengerjaan Sepatu</h2>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-2xl font-black text-amber-400">{countProses}</span>
                  <span className="block text-xs text-slate-400 mt-1">Dalam Proses / Rak</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-2xl font-black text-emerald-400">{countSelesai}</span>
                  <span className="block text-xs text-slate-400 mt-1">Selesai / Diambil</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}