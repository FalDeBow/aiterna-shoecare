import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROLE_PERMISSIONS, StaffRole } from '@/lib/auth-config';

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith('/admin')) {
    const tokenCookie = request.cookies.get('aiterna_admin_token');
    const roleCookie = request.cookies.get('aiterna_staff_role')?.value as StaffRole;

    const isLoggedIn = tokenCookie?.value === 'authenticated' && !!roleCookie;

    // Jika mengakses halaman login tetapi SUDAH LOGIN -> Lempar masuk ke dashboard
    if (path === '/admin/login') {
      if (isLoggedIn) {
        const defaultPath = roleCookie === 'OPS' ? '/admin/orders' : '/admin';
        return NextResponse.redirect(new URL(defaultPath, request.url));
      }
      return NextResponse.next();
    }

    // Jika BELUM LOGIN -> Lempar ke halaman login
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Cek Hak Akses Role
    const allowedRoutes = ROLE_PERMISSIONS[roleCookie] || [];
    const isAllowed = allowedRoutes.some((route) => path === route || path.startsWith(`${route}/`));

    if (!isAllowed) {
      return NextResponse.redirect(new URL('/admin/orders', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
