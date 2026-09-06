import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Hapus Seluruh Cookie secara Paksa dari Server
  response.cookies.set('aiterna_admin_token', '', { path: '/', maxAge: 0 });
  response.cookies.set('aiterna_staff_role', '', { path: '/', maxAge: 0 });
  response.cookies.set('aiterna_staff_name', '', { path: '/', maxAge: 0 });

  return response;
}
