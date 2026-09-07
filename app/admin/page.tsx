'use client';

import React, { useState, useEffect } from 'react';
import { AITERNA_SERVICES } from '@/lib/services-config';
import { supabase } from '@/lib/supabase';

export default function KasirPOSPage() {
  const [notaId, setNotaId] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setNotaId(`AIT-${new Date().toISOString().slice(2,10).replace(/-/g,'')}-${Math.floor(100 + Math.random() * 900)}`);
  }, []);

  // Form State
  const [namaCustomer, setNamaCustomer] = useState('');
  const [noWa, setNoWa] = useState('');
  const [itemBrand, setItemBrand] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(AITERNA_SERVICES[0].id);
  const [harga, setHarga] = useState<number>(AITERNA_SERVICES[0].price);
  const [statusBayar, setStatusBayar] = useState<'LUNAS' | 'DP' | 'BELUM_BAYAR'>('LUNAS');
  const [metodeBayar, setMetodeBayar] = useState<'CASH' | 'QRIS' | 'TRANSFER' | 'DEBIT_CC'>('QRIS');
  const [nominalDiterima, setNominalDiterima] = useState<number>(AITERNA_SERVICES[0].price);
  const [catatan, setCatatan] = useState('');

  // Modal State
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);

  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const found = AITERNA_SERVICES.find((s) => s.id === serviceId);
    if (found) {
      setHarga(found.price);
      setNominalDiterima(found.price);
    }
  };

  const totalTagihan = harga;
  const nominalBayarRiil = statusBayar === 'BELUM_BAYAR' ? 0 : nominalDiterima;
  const kembalian = statusBayar === 'LUNAS' && metodeBayar === 'CASH' ? Math.max(0, nominalDiterima - totalTagihan) : 0;
  const sisaPiutang = statusBayar === 'DP' ? Math.max(0, totalTagihan - nominalDiterima) : statusBayar === 'BELUM_BAYAR' ? totalTagihan : 0;

  const handleSubmitNota = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const selectedService = AITERNA_SERVICES.find((s) => s.id === selectedServiceId);
    let cleanWa = noWa.replace(/\D/g, '');
    if (cleanWa.startsWith('0')) cleanWa = '62' + cleanWa.slice(1);

    const orderData = {
      nota_id: notaId,
      customer_nama: namaCustomer,
      customer_wa: cleanWa,
      item_brand: itemBrand,
      service_name: selectedService?.name || 'Treatment',
      harga_total: totalTagihan,
      status_bayar: statusBayar,
      metode_bayar: metodeBayar,
      nominal_diterima: nominalBayarRiil,
      kembalian,
      sisa_piutang: sisaPiutang,
      catatan,
      status_rak: 'DITERIMA',
    };

    try {
      // 1. Simpan Transaksi Nota ke Supabase
      const { error: orderErr } = await supabase.from('orders').insert([orderData]);
      if (orderErr) throw new Error(`Error Orders: ${orderErr.message}`);

      // 2. Cari Data Pelanggan menggunakan maybeSingle (supaya pelanggan baru tidak melempar error)
      const { data: existingCust, error: custSearchErr } = await supabase
        .from('customers')
        .select('*')
        .eq('no_wa', cleanWa)
        .maybeSingle();

      if (custSearchErr) throw new Error(`Error Cari Pelanggan: ${custSearchErr.message}`);

      // 3. Update atau Insert Pelanggan
      if (existingCust) {
        const { error: custUpdateErr } = await supabase
          .from('customers')
          .update({
            nama: namaCustomer,
            total_transaksi: (existingCust.total_transaksi || 1) + 1,
          })
          .eq('no_wa', cleanWa);
        if (custUpdateErr) throw new Error(`Error Update Pelanggan: ${custUpdateErr.message}`);
      } else {
        const { error: custInsertErr } = await supabase.from('customers').insert([
          { nama: namaCustomer, no_wa: cleanWa, total_transaksi: 1 },
        ]);
        if (custInsertErr) throw new Error(`Error Tambah Pelanggan: ${custInsertErr.message}`);
      }

      setLastOrder({
        ...orderData,
        tgl: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      });
      setShowReceiptModal(true);
    } catch (err: any) {
      console.error('Detail Error Supabase:', err);
      alert(`Gagal menyimpan transaksi: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKirimWA = () => {
    if (!lastOrder) return;
    const teksPesan = 
      `*AITERNA SHOE & BAG CARE*\n` +
      `_Shine And Clean • Since July 2019_\n` +
      `----------------------------------------\n` +
      `🧾 *NOTA TRANSAKSI DIGITAL*\n` +
      `No. Nota : *${lastOrder.nota_id}*\n` +
      `Tanggal  : ${lastOrder.tgl}\n\n` +
      `👤 *Data Pelanggan:*\n` +
      `• Nama  : ${lastOrder.customer_nama}\n` +
      `• Barang: ${lastOrder.item_brand}\n\n` +
      `🛠️ *Detail Treatment:*\n` +
      `• Layanan: *${lastOrder.service_name}*\n` +
      `• Biaya   : Rp ${lastOrder.harga_total.toLocaleString('id-ID')}\n` +
      (lastOrder.catatan ? `• Catatan : _${lastOrder.catatan}_\n` : '') +
      `----------------------------------------\n` +
      `💳 *Pembayaran:*\n` +
      `• Status  : *${lastOrder.status_bayar}*\n` +
      `• Metode  : ${lastOrder.metode_bayar}\n` +
      `• Dibayar : Rp ${lastOrder.nominal_diterima.toLocaleString('id-ID')}\n` +
      (lastOrder.sisa_piutang > 0 ? `• Sisa DP : *Rp ${lastOrder.sisa_piutang.toLocaleString('id-ID')}*\n` : '') +
      (lastOrder.kembalian > 0 ? `• Kembalian: Rp ${lastOrder.kembalian.toLocaleString('id-ID')}\n` : '') +
      `----------------------------------------\n` +
      `🔍 *Cek Status Pengerjaan Live:*\n` +
      `https://aiterna-shoecare.vercel.app/track/${lastOrder.nota_id}\n\n` +
      `_Terima kasih telah mempercayakan perawatan item kesayanganmu di Aiterna!_ 🙏`;

    window.open(`https://wa.me/${lastOrder.customer_wa}?text=${encodeURIComponent(teksPesan)}`, '_blank');
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
              placeholder="Misal: Noda oli di vamp / sol terkelupas"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white focus:outline-none focus:border-yellow-400"
            />
          </div>
        </div>

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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black py-4 rounded-2xl transition active:scale-95 uppercase tracking-wide text-xs shadow-lg shadow-yellow-400/10 mt-4 disabled:opacity-50"
          >
            {loading ? 'MENYIMPAN KE DATABASE...' : 'SIMPAN & GENERATE STRUK NOTA'}
          </button>
        </div>
      </form>

      {/* Pop-up Modal Struk Nota Digital */}
      {showReceiptModal && lastOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-3xl p-6 space-y-5 text-white shadow-2xl relative">
            <div className="text-center space-y-1 border-b border-zinc-800 pb-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-full mx-auto flex items-center justify-center text-zinc-950 font-black text-base shadow-md mb-2">
                A
              </div>
              <h3 className="text-base font-black tracking-wider text-white">AITERNA SHOE & BAG CARE</h3>
              <p className="text-[10px] text-zinc-400 font-medium">Shine And Clean • Since July 2019</p>
            </div>

            <div className="space-y-2 text-xs font-mono bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80">
              <div className="flex justify-between text-yellow-400 font-bold">
                <span>NOTA: {lastOrder.nota_id}</span>
              </div>
              <p className="text-[10px] text-zinc-500">{lastOrder.tgl}</p>

              <div className="border-t border-dashed border-zinc-800 my-2 pt-2 space-y-1 text-zinc-300">
                <p>Pelanggan: <span className="text-white font-bold">{lastOrder.customer_nama}</span></p>
                <p>Item: {lastOrder.item_brand}</p>
                <p>Treatment: <span className="text-yellow-400 font-bold">{lastOrder.service_name}</span></p>
              </div>

              <div className="border-t border-dashed border-zinc-800 my-2 pt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Total Biaya</span>
                  <span>Rp {lastOrder.harga_total.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Metode</span>
                  <span>{lastOrder.metode_bayar}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Status</span>
                  <span className="font-bold text-white">{lastOrder.status_bayar}</span>
                </div>
              </div>
            </div>

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
