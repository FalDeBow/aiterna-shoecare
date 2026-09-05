'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function TrackingPage() {
  const params = useParams();
  const noNota = params?.no_nota as string;

  const [order, setOrder] = useState<any>(null);
  const [shoeItem, setShoeItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!noNota) return;

      // Ambil data order berdasarkan no_nota
      const { data: orderData } = await supabase
        .from('orders')
        .select('*, customers(nama)')
        .eq('no_nota', noNota)
        .single();

      if (orderData) {
        setOrder(orderData);
        // Ambil detail sepatu
        const { data: itemData } = await supabase
          .from('shoe_items')
          .select('*')
          .eq('order_id', orderData.id)
          .single();

        setShoeItem(itemData);
      }
      setLoading(false);
    }

    fetchOrder();
  }, [noNota]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <p className="animate-pulse font-medium">Memuat data pengerjaan...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="text-center bg-slate-800 p-6 rounded-2xl max-w-sm w-full border border-slate-700">
          <h2 className="text-xl font-bold mb-2">Nota Tidak Ditemukan</h2>
          <p className="text-slate-400 text-sm">
            Pastikan nomor nota yang kamu masukkan sudah benar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 font-sans">
      <div className="max-w-md mx-auto bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 my-6">
        {/* Header Branding */}
        <div className="bg-black p-5 text-center border-b border-slate-800">
          <h1 className="text-2xl font-black tracking-wider text-white">AITERNA</h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">
            Shoecare & Restoration
          </p>
        </div>

        {/* Content Status */}
        <div className="p-6 space-y-6">
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50">
            <p className="text-xs text-slate-400 uppercase font-semibold">Nomor Nota</p>
            <p className="text-lg font-mono font-bold text-white">{order.no_nota}</p>
            <p className="text-sm text-slate-300 mt-1">
              Pelanggan: <span className="font-semibold">{order.customers?.nama}</span>
            </p>
          </div>

          {/* Status Badge */}
          <div className="text-center py-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Status Pengerjaan Saat Ini
            </span>
            <span className="inline-block bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-extrabold text-sm px-4 py-2 rounded-full uppercase tracking-wide">
              {order.status || 'DITERIMA'}
            </span>
          </div>

          {/* Detail Sepatu */}
          {shoeItem && (
            <div className="border-t border-slate-800 pt-4 space-y-2">
              <h3 className="text-xs font-semibold text-slate-400 uppercase">
                Detail Perawatan
              </h3>
              <div className="bg-slate-800/30 p-3 rounded-lg text-sm space-y-1">
                <p>
                  <span className="text-slate-400">Sepatu:</span> {shoeItem.merek_warna}
                </p>
                <p>
                  <span className="text-slate-400">Layanan:</span> {shoeItem.layanan}
                </p>
                <p>
                  <span className="text-slate-400">Tag Rak:</span> {order.tag_number}
                </p>
              </div>
            </div>
          )}

          {/* Info Pembayaran */}
          <div className="flex justify-between items-center bg-slate-800/40 p-4 rounded-xl text-sm border border-slate-800">
            <span className="text-slate-400">Status Bayar:</span>
            <span className="font-bold text-emerald-400 uppercase">
              {order.status_bayar} (Rp {Number(order.total_biaya).toLocaleString('id-ID')})
            </span>
          </div>
        </div>

        <div className="bg-slate-950 p-4 text-center border-t border-slate-900 text-xs text-slate-500">
          Aiterna Shoecare • Terima Kasih atas Kepercayaan Anda
        </div>
      </div>
    </div>
  );
}