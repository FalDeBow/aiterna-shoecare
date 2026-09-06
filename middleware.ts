import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROLE_PERMISSIONS, StaffRole } from './lib/auth-config';

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith('/admin')) {
    // Pengecualian rute login
    if (path === '/admin/login') {
      return NextResponse.next();
    }

    const tokenCookie = request.cookies.get('aiterna_admin_token');
    const roleCookie = request.cookies.get('aiterna_staff_role')?.value as StaffRole;

    // 1. Cek Apakah Sudah Login
    if (!tokenCookie || tokenCookie.value !== 'authenticated' || !roleCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // 2. Cek Hak Akses Role
    const allowedRoutes = ROLE_PERMISSIONS[roleCookie] || [];
    const isAllowed = allowedRoutes.some((route) => path === route || path.startsWith(`${route}/`));

    if (!isAllowed) {
      // Jika Tim Ops / Kasir mencoba buka laporan omzet, lempar ke daftar pesanan
      return NextResponse.redirect(new URL('/admin/orders', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
