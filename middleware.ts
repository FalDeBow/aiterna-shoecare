import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROLE_PERMISSIONS, StaffRole } from '@/lib/auth-config';

export default function middleware(request: NextRequest) {
  let path = request.nextUrl.pathname;
  if (path.endsWith('/') && path.length > 1) {
    path = path.slice(0, -1);
  }

  if (path.startsWith('/admin')) {
    const token = request.cookies.get('aiterna_admin_token')?.value;
    const role = request.cookies.get('aiterna_staff_role')?.value as StaffRole;

    const isLoggedIn = token === 'authenticated' && !!role;

    // Jika user mengakses halaman /admin/login tapi SUDAH LOGIN
    if (path === '/admin/login') {
      if (isLoggedIn) {
        const target = role === 'OPS' ? '/admin/orders' : '/admin';
        return NextResponse.redirect(new URL(target, request.url));
      }
      return NextResponse.next();
    }

    // Jika BELUM LOGIN dan mencoba masuk rute /admin
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Cek Hak Akses per Role
    const allowed = ROLE_PERMISSIONS[role] || [];
    const isAllowed = allowed.some((r) => path === r || path.startsWith(`${r}/`));

    if (!isAllowed) {
      return NextResponse.redirect(new URL('/admin/orders', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
