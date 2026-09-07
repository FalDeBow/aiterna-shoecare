export interface ServiceItem {
  id: string;
  category: 'SHOES' | 'PAKET_HEMAT' | 'BAG' | 'ACCESSORIES' | 'KOPER';
  categoryLabel: string;
  name: string;
  price: number;
  displayPrice: string;
  unit?: string;
  note?: string;
}

export const AITERNA_SERVICES: ServiceItem[] = [
  // --- SHOES TREATMENT ---
  { id: 's-deep', category: 'SHOES', categoryLabel: 'Shoes Treatment', name: 'Deep Clean', price: 55000, displayPrice: 'Rp 55.000' },
  { id: 's-suede', category: 'SHOES', categoryLabel: 'Shoes Treatment', name: 'Suede Treatment', price: 60000, displayPrice: 'Rp 60.000' },
  { id: 's-flat', category: 'SHOES', categoryLabel: 'Shoes Treatment', name: 'Flat Shoes', price: 45000, displayPrice: 'Rp 45.000' },
  { id: 's-kids', category: 'SHOES', categoryLabel: 'Shoes Treatment', name: 'Kids Shoes', price: 45000, displayPrice: 'Rp 45.000' },
  { id: 's-boots', category: 'SHOES', categoryLabel: 'Shoes Treatment', name: 'Boots', price: 65000, displayPrice: 'Rp 65.000' },
  { id: 's-whitening', category: 'SHOES', categoryLabel: 'Shoes Treatment', name: 'Whitening', price: 75000, displayPrice: 'Rp 75.000' },
  { id: 's-express', category: 'SHOES', categoryLabel: 'Shoes Treatment', name: 'Express Clean', price: 80000, displayPrice: 'Rp 80.000' },
  { id: 's-unyellow', category: 'SHOES', categoryLabel: 'Shoes Treatment', name: 'Unyellowing', price: 60000, displayPrice: 'Rp 60.000' },
  { id: 's-sandals', category: 'SHOES', categoryLabel: 'Shoes Treatment', name: 'Sandals', price: 30000, displayPrice: 'Rp 30.000' },

  // --- PAKET HEMAT ---
  { id: 'p-3pairs', category: 'PAKET_HEMAT', categoryLabel: 'Paket Hemat', name: 'Paket 3 Pairs', price: 150000, displayPrice: 'Rp 150.000' },
  { id: 'p-4pairs', category: 'PAKET_HEMAT', categoryLabel: 'Paket Hemat', name: 'Paket 4 Pairs', price: 180000, displayPrice: 'Rp 180.000' },
  { id: 'p-5pairs', category: 'PAKET_HEMAT', categoryLabel: 'Paket Hemat', name: 'Paket 5 Pairs', price: 220000, displayPrice: 'Rp 220.000' },
  { id: 'p-10up', category: 'PAKET_HEMAT', categoryLabel: 'Paket Hemat', name: 'Paket 10 Pairs Up (per Pasang)', price: 40000, displayPrice: 'Rp 40.000', unit: '/pair' },

  // --- BAG CARE ---
  { id: 'b-75l', category: 'BAG', categoryLabel: 'Bag Care', name: 'Bag 75L Up (L)', price: 100000, displayPrice: 'Rp 100.000' },
  { id: 'b-35l70l', category: 'BAG', categoryLabel: 'Bag Care', name: 'Bag 35L – 70L (M)', price: 70000, displayPrice: 'Rp 70.000' },
  { id: 'b-under35l', category: 'BAG', categoryLabel: 'Bag Care', name: 'Bag Under 35L (S)', price: 50000, displayPrice: 'Rp 50.000' },
  { id: 'b-women-l', category: 'BAG', categoryLabel: 'Bag Care', name: 'Women Bag (L)', price: 100000, displayPrice: 'Rp 100.000' },
  { id: 'b-canvas', category: 'BAG', categoryLabel: 'Bag Care', name: 'Canvas Bag', price: 100000, displayPrice: 'Rp 100.000' },
  { id: 'b-women-m', category: 'BAG', categoryLabel: 'Bag Care', name: 'Women Bag (M)', price: 70000, displayPrice: 'Rp 70.000' },
  { id: 'b-clutch', category: 'BAG', categoryLabel: 'Bag Care', name: 'Clutch (S)', price: 50000, displayPrice: 'Rp 50.000' },

  // --- WALLET & HAT ---
  { id: 'a-wallet', category: 'ACCESSORIES', categoryLabel: 'Wallet & Hat', name: 'Wallet (Dompet)', price: 30000, displayPrice: 'Rp 30.000' },
  { id: 'a-hat', category: 'ACCESSORIES', categoryLabel: 'Wallet & Hat', name: 'Hat (Topi)', price: 30000, displayPrice: 'Rp 30.000' },

  // --- KOPER ---
  { id: 'k-32l', category: 'KOPER', categoryLabel: 'Koper Care', name: 'Koper 32 Up (L)', price: 150000, displayPrice: 'Rp 150.000' },
  { id: 'k-cabin', category: 'KOPER', categoryLabel: 'Koper Care', name: 'Koper Cabin (M)', price: 100000, displayPrice: 'Rp 100.000' },
];
