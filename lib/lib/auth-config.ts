export type StaffRole = 'OWNER' | 'KASIR' | 'OPS';

export interface StaffUser {
  id: string;
  nama: string;
  pin: string;
  role: StaffRole;
}

// Daftar Staf Sementara (Nanti di rumah bisa disambungkan ke Supabase)
export const STAFF_LIST: StaffUser[] = [
  { id: '1', nama: 'Owner / Mas Bowo', pin: '9999', role: 'OWNER' },
  { id: '2', nama: 'Kasir Toko', pin: '1111', role: 'KASIR' },
  { id: '3', nama: 'Tim Workshop', pin: '2222', role: 'OPS' },
];

// Peta Akses Rute Berdasarkan Role
export const ROLE_PERMISSIONS: Record<StaffRole, string[]> = {
  OWNER: ['/admin', '/admin/orders', '/admin/reports', '/admin/print'], // Akses Penuh
  KASIR: ['/admin', '/admin/orders', '/admin/print'],                   // Tanpa Laporan Omzet
  OPS:   ['/admin/orders', '/admin/print'],                            // Khusus Antrean Rak
};
