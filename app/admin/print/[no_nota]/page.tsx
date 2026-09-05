'use client';

import React, { useEffect, useState, use } from 'react';
import { supabase } from '@/lib/supabase';

export default function PrintNotaPage({ params }: { params: Promise<{ no_nota: string }> }) {
  const resolvedParams = use(params);
  const noNota = resolvedParams.no_nota;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, customers(nama, no_wa), shoe_items(merek_warna, layanan, catatan)')
        .eq('no_nota', noNota)
        .single();

      if (!error && data) {
        setOrder(data);
      }
      setLoading(false);
    };

    if (noNota) fetchOrder();
  }, [noNota]);

  if (loading) {
    return <div className="p-4 text-center font-mono text-sm">Memuat struk...</div>;
  }

  if (!order) {
    return <div className="p-4 text-center font-mono text-sm">Nota tidak ditemukan.</div>;
  }

  const shoe = order.shoe_items?.[0];
  const tgl = new Date(order.created_at).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-mono text-black flex flex-col items-center">
      {/* Tombol Aksi saat di Layar */}
      <div className="print:hidden mb-4 flex gap-2">
        <button
          onClick={() => window.print()}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-sm transition shadow"
        >
          🖨️ Cetak / Simpan PDF
        </button>
        <button
          onClick={() => window.close()}
          className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-4 py-2 rounded-xl text-sm transition"
        >
          Tutup
        </button>
      </div>

      {/* Area Struk Thermal 58mm */}
      <div className="w-[280px] bg-white p-4 shadow-md rounded border border-slate-300 print:shadow-none print:border-none print:w-full print:p-0">
        {/* Header Toko */}
        <div className="text-center border-b border-black pb-2 mb-2">
          <h1 className="text-base font-black tracking-wider">AITERNA SHOECARE</h1>
          <p className="text-[10px]">Premium Sneaker & Leather Care</p>
          <p className="text-[10px] text-slate-600">{tgl}</p>
        </div>

        {/* Informasi Nota & Pelanggan */}
        <div className="text-[11px] space-y-1 border-b border-dashed border-black pb-2 mb-2">
          <div className="flex justify-between">
            <span>No. Nota:</span>
            <span className="font-bold">{order.no_nota}</span>
          </div>
          <div className="flex justify-between">
            <span>Pelanggan:</span>
            <span className="font-bold">{order.customers?.nama}</span>
          </div>
          <div className="flex justify-between">
            <span>No. WA:</span>
            <span>{order.customers?.no_wa}</span>
          </div>
          <div className="flex justify-between">
            <span>Tag Rak:</span>
            <span className="font-black text-xs">{order.tag_number}</span>
          </div>
        </div>

        {/* Detail Item */}
        <div className="text-[11px] space-y-1 border-b border-dashed border-black pb-2 mb-2">
          <div className="font-bold">{shoe?.merek_warna || 'Sepatu'}</div>
          <div className="flex justify-between text-[10px]">
            <span>Layanan: {shoe?.layanan}</span>
            <span>Rp {Number(order.total_biaya).toLocaleString('id-ID')}</span>
          </div>
          {shoe?.catatan && (
            <div className="text-[9px] italic text-slate-700">Ket: {shoe.catatan}</div>
          )}
        </div>

        {/* Total & Status Bayar */}
        <div className="text-[11px] space-y-1 border-b border-black pb-2 mb-2">
          <div className="flex justify-between font-bold text-xs">
            <span>TOTAL:</span>
            <span>Rp {Number(order.total_biaya).toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span>Status Bayar:</span>
            <span className="font-bold">
              {order.status_bayar === 'PAID'
                ? 'LUNAS'
                : order.status_bayar === 'DP'
                ? 'DP (UANG MUKA)'
                : 'BELUM LUNAS'}
            </span>
          </div>
        </div>

        {/* Syarat & Ketentuan Singkat */}
        <div className="text-[8px] text-center space-y-1 text-slate-700">
          <p>Terima kasih atas kepercayaan Anda!</p>
          <p>Pengambilan wajib menunjukkan nota/WA ini.</p>
          <p className="font-bold pt-1">https://aiterna.vercel.app</p>
        </div>
      </div>
    </div>
  );
}