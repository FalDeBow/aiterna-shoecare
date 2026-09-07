'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function RakPesananPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status_rak: newStatus })
      .eq('id', id);

    if (!error) {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status_rak: newStatus } : o))
      );
    } else {
      alert('Gagal memperbarui status rak di database.');
    }
  };

  const filteredOrders = orders.filter((o) =>
    filterStatus === 'ALL' ? true : o.status_rak === filterStatus
  );

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl">
        <div>
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest block">Operational Dashboard</span>
          <h1 className="text-2xl font-black text-white">DAFTAR RAK WORKSHOP</h1>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
          {['ALL', 'DITERIMA', 'PROSES_CUCI', 'PENGERINGAN', 'SIAP_DIAMBIL', 'SELESAI'].map((st) => (
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

      {loading ? (
        <p className="text-center text-xs text-zinc-500 py-12">Memuat antrean rak dari Supabase...</p>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900 border border-zinc-800 rounded-3xl">
          <p className="text-xs text-zinc-400">Belum ada pesanan di rak ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOrders.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between hover:border-zinc-700 transition"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs font-black text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-lg border border-yellow-400/20">
                    {item.nota_id}
                  </span>
                  <span
                    className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                      item.status_bayar === 'LUNAS'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {item.status_bayar}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">{item.customer_nama}</h3>
                  <p className="text-xs text-zinc-400 font-mono">📱 {item.customer_wa}</p>
                </div>

                <div className="bg-zinc-950 border border-zinc-800/80 p-3 rounded-2xl space-y-1">
                  <p className="text-xs text-zinc-200 font-semibold">{item.item_brand}</p>
                  <p className="text-[11px] text-yellow-400 font-bold">Treatment: {item.service_name}</p>
                  {item.catatan && <p className="text-[10px] text-zinc-400 italic">"{item.catatan}"</p>}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                <label className="block text-[10px] font-bold text-zinc-500 uppercase">Ubah Status Rak:</label>
                <select
                  value={item.status_rak}
                  onChange={(e) => updateStatus(item.id, e.target.value)}
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
      )}
    </div>
  );
}
