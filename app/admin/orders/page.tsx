'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function OrderListPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*, customers(nama, no_wa), shoe_items(merek_warna, layanan, catatan)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    if (!error) fetchOrders();
  };

  const handleUpdateBayar = async (orderId: string, newStatusBayar: string) => {
    const { error } = await supabase.from('orders').update({ status_bayar: newStatusBayar }).eq('id', orderId);
    if (!error) fetchOrders();
  };

  const handleResendWA = (order: any) => {
    const custNama = order.customers?.nama || 'Pelanggan';
    const custWa = order.customers?.no_wa || '';
    const shoe = order.shoe_items?.[0];

    const pesan =
      `Halo Kak ${custNama}! Berikut update pesanan perawatan sepatu kamu di *Aiterna Shoecare*:\n\n` +
      `• No. Nota: *${order.no_nota}*\n` +
      `• Tag Rak: *${order.tag_number}*\n` +
      `• Sepatu: *${shoe?.merek_warna || '-'}*\n` +
      `• Status Pengerjaan: *${order.status}*\n` +
      `• Status Bayar: *${order.status_bayar}*\n\n` +
      `Pantau progres secara live di sini:\n` +
      `https://aiterna.vercel.app/track/${order.no_nota}`;

    const waUrl = `https://wa.me/${custWa.replace(/^0/, '62')}?text=${encodeURIComponent(pesan)}`;
    window.open(waUrl, '_blank');
  };

  // Filter Data Berdasarkan Pencarian
  const filteredOrders = orders.filter((o) => {
    const term = search.toLowerCase();
    const nama = o.customers?.nama?.toLowerCase() || '';
    const nota = o.no_nota?.toLowerCase() || '';
    const tag = o.tag_number?.toLowerCase() || '';
    return nama.includes(term) || nota.includes(term) || tag.includes(term);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-5">
        
        {/* Navigation Bar Top */}
        <div className="bg-slate-900 p-2 flex rounded-2xl border border-slate-800 text-xs font-bold">
          <Link
            href="/admin"
            className="flex-1 py-2.5 text-center text-slate-400 hover:text-white transition"
          >
            + Kasir Baru
          </Link>
          <Link
            href="/admin/orders"
            className="flex-1 py-2.5 text-center bg-emerald-600 text-white rounded-xl shadow transition"
          >
            Daftar Pesanan ({orders.length})
          </Link>
        </div>

        {/* Input Search Bar */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex gap-3">
          <input
            type="text"
            placeholder="Cari Nama Pelanggan, No. Nota, atau Tag Rak..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* List Cards */}
        {loading ? (
          <p className="text-center py-10 text-slate-500 animate-pulse text-sm">
            Memuat data transaksi...
          </p>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">Pesanan tidak ditemukan.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((item) => {
              const shoe = item.shoe_items?.[0];
              return (
                <div
                  key={item.id}
                  className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition"
                >
                  <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {item.no_nota}
                      </span>
                      <h2 className="text-lg font-bold text-white">
                        {item.customers?.nama}{' '}
                        <span className="text-xs font-normal text-slate-400">
                          ({item.customers?.no_wa})
                        </span>
                      </h2>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500 block">TAG RAK</span>
                      <span className="font-black text-amber-400 text-base">
                        {item.tag_number}
                      </span>
                    </div>
                  </div>

                  {/* Detail Sepatu */}
                  {shoe && (
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 text-sm space-y-1">
                      <p>
                        <span className="text-slate-500">Sepatu:</span>{' '}
                        <strong className="text-slate-200">{shoe.merek_warna}</strong>
                      </p>
                      <p>
                        <span className="text-slate-500">Layanan:</span>{' '}
                        <span className="text-emerald-400 font-semibold">{shoe.layanan}</span>
                      </p>
                      {shoe.catatan && (
                        <p className="text-xs text-slate-400 pt-1 italic">
                          Catatan: {shoe.catatan}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Controls Selector & Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1 font-semibold">
                        Status Pengerjaan:
                      </label>
                      <select
                        value={item.status || 'DITERIMA'}
                        onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
                      >
                        <option value="DITERIMA">DITERIMA</option>
                        <option value="DIPROSES">DIPROSES</option>
                        <option value="PENGERINGAN">PENGERINGAN</option>
                        <option value="SIAP_DIAMBIL">SIAP DIAMBIL</option>
                        <option value="SELESAI">SELESAI</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1 font-semibold">
                        Pembayaran (Rp {Number(item.total_biaya).toLocaleString('id-ID')}):
                      </label>
                      <select
                        value={item.status_bayar || 'UNPAID'}
                        onChange={(e) => handleUpdateBayar(item.id, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-amber-400 font-bold focus:outline-none focus:border-emerald-500"
                      >
                        <option value="PAID">PAID (Lunas)</option>
                        <option value="DP">DP (Uang Muka)</option>
                        <option value="UNPAID">UNPAID (Belum Bayar)</option>
                      </select>
                    </div>
                  </div>

                  {/* Action Quick Links */}
                  <div className="flex gap-2 pt-2 border-t border-slate-800/60">
                    <button
                      onClick={() => handleResendWA(item)}
                      className="flex-1 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold transition"
                    >
                      💬 Kirim WA
                    </button>
                    <a
                      href={`/admin/print/${item.no_nota}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2 text-center bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition"
                    >
                      🖨️ Cetak Struk
                    </a>
                    <a
                      href={`/track/${item.no_nota}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2 text-center bg-slate-800/50 hover:bg-slate-700 text-slate-400 rounded-xl text-xs font-bold transition"
                    >
                      🔗 Tracking
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}