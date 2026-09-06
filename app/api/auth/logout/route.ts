import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  // Hapus bersih seluruh cookie dari Server
  cookieStore.delete({ name: 'aiterna_admin_token', path: '/' });
  cookieStore.delete({ name: 'aiterna_staff_role', path: '/' });
  cookieStore.delete({ name: 'aiterna_staff_name', path: '/' });

  return NextResponse.json({ success: true });
}
