import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Cek apakah user sedang mencoba mengakses rute internal /admin
  if (path.startsWith('/admin')) {
    // Pengecualian: izinkan akses ke halaman login admin
    if (path === '/admin/login') {
      return NextResponse.next();
    }

    // Cek cookie otentikasi admin
    const authCookie = request.cookies.get('aiterna_admin_token');

    // Jika cookie tidak ada / tidak valid, lempar balik ke Landing Page Utama
    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
