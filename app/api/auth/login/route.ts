import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { STAFF_LIST } from '@/lib/auth-config';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const foundStaff = STAFF_LIST.find((s) => s.pin === pin);

    if (!foundStaff) {
      return NextResponse.json({ success: false, message: 'PIN Staf Tidak Dikenali!' }, { status: 401 });
    }

    const cookieStore = await cookies();
    const maxAge = 60 * 60 * 24; // 1 Hari

    // Set cookie yang bisa dibaca baik oleh Server Middleware maupun Client JS
    cookieStore.set('aiterna_admin_token', 'authenticated', {
      path: '/',
      maxAge,
      httpOnly: false,
      sameSite: 'lax',
    });

    cookieStore.set('aiterna_staff_role', foundStaff.role, {
      path: '/',
      maxAge,
      httpOnly: false,
      sameSite: 'lax',
    });

    cookieStore.set('aiterna_staff_name', foundStaff.nama, {
      path: '/',
      maxAge,
      httpOnly: false,
      sameSite: 'lax',
    });

    const redirectUrl = foundStaff.role === 'OPS' ? '/admin/orders' : '/admin';
    return NextResponse.json({ success: true, redirectUrl });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan server.' }, { status: 500 });
  }
}
