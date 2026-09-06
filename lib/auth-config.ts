export type StaffRole = 'OWNER' | 'KASIR' | 'OPS';

export interface StaffUser {
  id: string;
  nama: string;
  pin: string;
  role: StaffRole;
}

// Daftar Staf Sementara (Aman tanpa Supabase)
export const STAFF_LIST: StaffUser[] = [
  { id: '1', nama: 'Owner / Mas Bowo', pin: '9999', role: 'OWNER' },
  { id: '2', nama: 'Kasir Toko', pin: '1111', role: 'KASIR' },
  { id: '3', nama: 'Tim Workshop', pin: '2222', role: 'OPS' },
];

// Hak Akses Rute Berdasarkan Role
export const ROLE_PERMISSIONS: Record<StaffRole, string[]> = {
  OWNER: ['/admin', '/admin/orders', '/admin/reports', '/admin/print'],
  KASIR: ['/admin', '/admin/orders', '/admin/print'],
  OPS:   ['/admin/orders', '/admin/print'],
};
