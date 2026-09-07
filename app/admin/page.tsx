'use client';

import React, { useState, useEffect } from 'react';
import { AITERNA_SERVICES, ServiceItem } from '@/lib/services-config';

export default function KasirPOSPage() {
  // Generasi No. Nota Otomatis
  const [notaId, setNotaId] = useState('');
  
  useEffect(() => {
    setNotaId(`AIT-${new Date().toISOString().slice(2,10).replace(/-/g,'')}-${Math.floor(100 + Math.random() * 900)}`);
  }, []);

  // State Form Kasir
  const [namaCustomer, setNamaCustomer] = useState('');
  const [noWa, setNoWa] = useState('');
  const [itemBrand, setItemBrand] = useState('');
  
  // State Layanan & Harga
  const [selectedServiceId, setSelectedServiceId] = useState<string>(AITERNA_SERVICES[0].id);
  const [harga, setHarga] = useState<number>(AITERNA_SERVICES[0].price);
  
  // State Pembayaran
  const [statusBayar, setStatusBayar] = useState<'LUNAS' | 'DP' | 'BELUM_BAYAR'>('LUNAS');
  const [metodeBayar, setMetodeBayar] = useState<'CASH' | 'QRIS' | 'TRANSFER' | 'DEBIT_CC'>('QRIS');
  const [nominalDiterima, setNominalDiterima] = useState<number>(AITERNA_SERVICES[0].price);
  const [catatan, setCatatan] = useState('');

  // State Modal Struk Pratinjau
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);

  // Auto-set harga saat pilih layanan
  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const found = AITERNA_SERVICES.find((s) => s.id === serviceId);
    if (found) {
      setHarga(found.price);
      setNominalDiterima(found.price);
    }
  };

  // Hitung Kembalian / Sisa Tagihan
  const totalTagihan = harga;
  const nominalBayarRiil = statusBayar === 'BELUM_BAYAR' ? 0 : nominalDiterima;
  const kembalian = statusBayar === 'LUNAS' && metodeBayar === 'CASH' ? Math.max(0, nominalDiterima - totalTagihan) : 0;
  const sisaPiutang = statusBayar === 'DP' ? Math.max(0, totalTagihan - nominalDiterima) : statusBayar === 'BELUM_BAYAR' ? totalTagihan : 0;

  const handleSubmitNota = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedService = AITERNA_SERVICES.find((s) => s.id === selectedServiceId);

    const orderData = {
      notaId,
      tgl: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      namaCustomer,
      noWa,
      itemBrand,
      serviceName: selectedService?.name || 'Treatment',
      hargaTotal: totalTagihan,
      statusBayar,
      metodeBayar,
      nominalDiterima: nominalBayarRiil,
      kembalian,
      sisaPiutang,
      catatan,
    };

    setLastOrder(orderData);
    setShowReceiptModal(true);
  };

  const handleKirimWA = () => {
    if (!lastOrder) return;

    // Bersihkan nomor WA
    let cleanWa = lastOrder.noWa.replace(/\D/g, '');
    if (cleanWa.startsWith('0')) cleanWa = '62' + cleanWa.slice(1);

    const teksPesan = 
      `*AITERNA SHOE & BAG CARE*\n` +
      `_Shine And Clean • Since July 2019_\n` +
      `----------------------------------------\n` +
      `🧾 *NOTA TRANSAKSI DIGITAL*\n` +
      `No. Nota : *${lastOrder.notaId}*\n` +
      `Tanggal  : ${lastOrder.tgl}\n\n` +
      `👤 *Data Pelanggan:*\n` +
      `• Nama  : ${lastOrder.namaCustomer}\n` +
      `• Barang: ${lastOrder.itemBrand}\n\n` +
      `🛠️ *Detail Treatment:*\n` +
      `• Layanan: *${lastOrder.serviceName}*\n` +
      `• Biaya   : Rp ${lastOrder.hargaTotal.toLocaleString('id-ID')}\n` +
      (lastOrder.catatan ? `• Catatan : _${lastOrder.catatan}_\n` : '') +
      `----------------------------------------\n` +
      `💳 *Pembayaran:*\n` +
      `• Status  : *${lastOrder.statusBayar}*\n` +
      `• Metode  : ${lastOrder.metodeBayar}\n` +
      `• Dibayar : Rp ${lastOrder.nominalDiterima.toLocaleString('id-ID')}\n` +
      (lastOrder.sisaPiutang > 0 ? `• Sisa DP : *Rp ${lastOrder.sisaPiutang.toLocaleString('id-ID')}*\n` : '') +
      (lastOrder.kembalian > 0 ? `• Kembalian: Rp ${lastOrder.kembalian.toLocaleString('id-ID')}\n` : '') +
      `----------------------------------------\n` +
      `🔍 *Cek Status Pengerjaan Live:*\n` +
      `Pantau progres barangmu di web:\n` +
      `https://aiterna-shoecare.vercel.app\n\n` +
      `_Terima kasih telah mempercayakan perawatan item kesayanganmu di Aiterna!_ 🙏`;

    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(teksPesan)}`, '_blank');
  };

  const handleResetForm = () => {
    setShowReceiptModal(false);
    setNotaId(`AIT-${new Date().toISOString().slice(2,10).replace(/-/g,'')}-${Math.floor(100 + Math.random() * 900)}`);
    setNamaCustomer('');
    setNoWa('');
    setItemBrand('');
    setCatatan('');
  };

  const categories = Array.from(new Set(AITERNA_SERVICES.map((s) => s.categoryLabel)));

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
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

      <form onSubmit={handleSubmitNota} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Data Pelanggan & Barang */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-xl">
          <h2 className="text-sm font-black text-yellow-400 uppercase tracking-wider">1. Data Pelanggan & Barang</h2>
          
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
            <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Merek & Detail Barang</label>
            <input
              type="text"
              required
              placeholder="Contoh: Adidas Samba Size 42 / Tas Leather L"
              value={itemBrand}
              onChange={(e) => setItemBrand(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Catatan Kondisi (Opsional)</label>
            <input
              type="text"
              placeholder="Misal: Noda oli di vamp / sol samping terkelupas"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white focus:outline-none focus:border-yellow-400"
            />
          </div>
        </div>

        {/* 2. Treatment & Metode Pembayaran */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-sm font-black text-yellow-400 uppercase tracking-wider">2. Layanan & Pembayaran</h2>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Pilih Treatment / Paket</label>
              <select
                value={selectedServiceId}
                onChange={(e) => handleServiceChange(e.target.value)}
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white focus:outline-none focus:border-yellow-400"
              >
                {categories.map((catLabel) => (
                  <optgroup key={catLabel} label={catLabel} className="bg-zinc-900 text-yellow-400 font-bold">
                    {AITERNA_SERVICES.filter((s) => s.categoryLabel === catLabel).map((service) => (
                      <option key={service.id} value={service.id} className="bg-zinc-950 text-white font-normal">
                        {service.name} — {service.displayPrice} {service.unit || ''}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Status Bayar</label>
                <select
                  value={statusBayar}
                  onChange={(e) => setStatusBayar(e.target.value as any)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="LUNAS">LUNAS</option>
                  <option value="DP">DP (Uang Muka)</option>
                  <option value="BELUM_BAYAR">BELUM BAYAR</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Metode Bayar</label>
                <select
                  value={metodeBayar}
                  onChange={(e) => setMetodeBayar(e.target.value as any)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-yellow-400 font-bold focus:outline-none focus:border-yellow-400"
                >
                  <option value="QRIS">📲 QRIS</option>
                  <option value="CASH">💵 CASH (Tunai)</option>
                  <option value="TRANSFER">🏦 TRANSFER BANK</option>
                  <option value="DEBIT_CC">💳 DEBIT / CREDIT CARD</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">Total Tagihan (Rp)</label>
                <input
                  type="number"
                  value={harga}
                  onChange={(e) => setHarga(Number(e.target.value))}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white font-bold focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  {statusBayar === 'DP' ? 'Nominal DP (Rp)' : 'Uang Diterima (Rp)'}
                </label>
                <input
                  type="number"
                  disabled={statusBayar === 'BELUM_BAYAR'}
                  value={nominalDiterima}
                  onChange={(e) => setNominalDiterima(Number(e.target.value))}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-yellow-400 font-bold focus:outline-none focus:border-yellow-400 disabled:opacity-30"
                />
              </div>
            </div>

            {/* Indicator Kembalian / Sisa DP */}
            {statusBayar === 'LUNAS' && metodeBayar === 'CASH' && kembalian > 0 && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl flex justify-between items-center text-xs">
                <span className="text-emerald-400 font-bold">Kembalian Kasir:</span>
                <span className="text-emerald-400 font-mono font-black text-sm">Rp {kembalian.toLocaleString('id-ID')}</span>
              </div>
            )}

            {statusBayar === 'DP' && sisaPiutang > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-2xl flex justify-between items-center text-xs">
                <span className="text-amber-400 font-bold">Sisa Tagihan (Pelunasan):</span>
                <span className="text-amber-400 font-mono font-black text-sm">Rp {sisaPiutang.toLocaleString('id-ID')}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black py-4 rounded-2xl transition active:scale-95 uppercase tracking-wide text-xs shadow-lg shadow-yellow-400/10 mt-4"
          >
            SIMPAN & GENERATE STRUK NOTA
          </button>
        </div>
      </form>

      {/* POP-UP MODAL STRUK NOTA DIGITAL */}
      {showReceiptModal && lastOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-3xl p-6 space-y-5 text-white shadow-2xl relative animate-in fade-in zoom-in duration-150">
            
            {/* Header Struk */}
            <div className="text-center space-y-1 border-b border-zinc-800 pb-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-full mx-auto flex items-center justify-center text-zinc-950 font-black text-base shadow-md mb-2">
                A
              </div>
              <h3 className="text-base font-black tracking-wider text-white">AITERNA SHOE & BAG CARE</h3>
              <p className="text-[10px] text-zinc-400 font-medium">Shine And Clean • Since July 2019</p>
            </div>

            {/* Detail Transaksi Struk */}
            <div className="space-y-2 text-xs font-mono bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80">
              <div className="flex justify-between text-yellow-400 font-bold">
                <span>NOTA: {lastOrder.notaId}</span>
              </div>
              <p className="text-[10px] text-zinc-500">{lastOrder.tgl}</p>

              <div className="border-t border-dashed border-zinc-800 my-2 pt-2 space-y-1 text-zinc-300">
                <p>Pelanggan: <span className="text-white font-bold">{lastOrder.namaCustomer}</span></p>
                <p>Item: {lastOrder.itemBrand}</p>
                <p>Treatment: <span className="text-yellow-400 font-bold">{lastOrder.serviceName}</span></p>
              </div>

              <div className="border-t border-dashed border-zinc-800 my-2 pt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Total Biaya</span>
                  <span>Rp {lastOrder.hargaTotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Metode</span>
                  <span>{lastOrder.metodeBayar}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Status</span>
                  <span className="font-bold text-white">{lastOrder.statusBayar}</span>
                </div>
                {lastOrder.sisaPiutang > 0 && (
                  <div className="flex justify-between text-amber-400 font-bold">
                    <span>Sisa DP</span>
                    <span>Rp {lastOrder.sisaPiutang.toLocaleString('id-ID')}</span>
                  </div>
                )}
                {lastOrder.kembalian > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Kembalian</span>
                    <span>Rp {lastOrder.kembalian.toLocaleString('id-ID')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tombol Aksi Struk */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleKirimWA}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black py-3 rounded-2xl transition text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                💬 KIRIM STRUK VIA WHATSAPP
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => window.print()}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 rounded-2xl transition text-xs border border-zinc-700"
                >
                  🖨️ Cetak Struk
                </button>
                <button
                  onClick={handleResetForm}
                  className="w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black py-2.5 rounded-2xl transition text-xs"
                >
                  ➕ Transaksi Baru
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
