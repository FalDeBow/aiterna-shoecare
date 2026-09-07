'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function PublicTrackPage({ params }: { params: Promise<{ nota: string }> }) {
  const resolvedParams = use(params);
  const notaParam = resolvedParams.nota;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('nota_id', notaParam)
        .single();

      if (data) setOrder(data);
      setLoading(false);
    };

    fetchOrder();
  }, [notaParam]);

  const steps = [
    { key: 'DITERIMA', label: '📥 Barang Diterima', desc: 'Barang sudah masuk workshop Aiterna' },
    { key: 'PROSES_CUCI', label: '🧼 Proses Treatment', desc: 'Pembersihan / perbaikan sedang dilakukan' },
    { key: 'PENGERINGAN', label: '💨 Pengeringan & Quality Check', desc: 'Pengeringan suhu terkontrol & inspeksi akhir' },
    { key: 'SIAP_DIAMBIL', label: '✅ Siap Diambil / Dikirim', desc: 'Barang sudah wangi & siap diambil di store' },
    { key: 'SELESAI', label: '🎉 Selesai', desc: 'Barang telah diterima kembali oleh pemilik' },
  ];

  const getStepIndex = (status: string) => steps.findIndex((s) => s.key === status);
  const currentStepIndex = order ? getStepIndex(order.status_rak) : 0;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-8 font-sans flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="text-center border-b border-zinc-800 pb-4">
          <Link href="/" className="inline-block mb-2">
            <div className="w-10 h-10 bg-yellow-400 rounded-full mx-auto flex items-center justify-center text-zinc-950 font-black text-lg">
              A
            </div>
          </Link>
          <h1 className="text-lg font-black text-white">AITERNA LIVE TRACKING</h1>
          <p className="text-xs text-yellow-400 font-mono font-bold">{notaParam}</p>
        </div>

        {loading ? (
          <p className="text-center text-xs text-zinc-500 py-8">Mencari data nota...</p>
        ) : !order ? (
          <div className="text-center py-8 space-y-3">
            <p className="text-xs text-rose-400 font-bold">Nota tidak ditemukan.</p>
            <p className="text-[11px] text-zinc-500">Pastikan nomor nota yang Anda ketik sudah benar.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Info Singkat */}
            <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80 space-y-1 text-xs">
              <p className="text-zinc-400">Pemilik: <span className="text-white font-bold">{order.customer_nama}</span></p>
              <p className="text-zinc-400">Barang: <span className="text-white font-bold">{order.item_brand}</span></p>
              <p className="text-zinc-400">Layanan: <span className="text-yellow-400 font-bold">{order.service_name}</span></p>
            </div>

            {/* Timeline Progress Status */}
            <div className="space-y-4 relative pl-4 border-l-2 border-zinc-800">
              {steps.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step.key} className="relative pl-4 space-y-0.5">
                    <div
                      className={`absolute -left-[21px] top-0.5 w-4 h-4 rounded-full border-2 ${
                        isCurrent
                          ? 'bg-yellow-400 border-yellow-300 animate-pulse'
                          : isPassed
                          ? 'bg-emerald-400 border-emerald-300'
                          : 'bg-zinc-900 border-zinc-700'
                      }`}
                    />
                    <h3 className={`text-xs font-bold ${isCurrent ? 'text-yellow-400' : isPassed ? 'text-white' : 'text-zinc-600'}`}>
                      {step.label}
                    </h3>
                    <p className="text-[10px] text-zinc-500 leading-tight">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-zinc-800 text-center">
          <Link href="/" className="text-xs font-bold text-yellow-400 hover:underline">
            ← Kembali ke Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
