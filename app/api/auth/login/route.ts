import { NextResponse } from 'next/server';
import { STAFF_LIST } from '@/lib/auth-config';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const foundStaff = STAFF_LIST.find((s) => s.pin === pin);

    if (!foundStaff) {
      return NextResponse.json({ success: false, message: 'PIN Staf Tidak Dikenali!' }, { status: 401 });
    }

    const redirectUrl = foundStaff.role === 'OPS' ? '/admin/orders' : '/admin';
    const response = NextResponse.json({ success: true, redirectUrl });

    // Set Cookie via HTTP Header (Diuji Langsung dari Server)
    response.cookies.set('aiterna_admin_token', 'authenticated', {
      path: '/',
      maxAge: 86400,
      sameSite: 'lax',
    });

    response.cookies.set('aiterna_staff_role', foundStaff.role, {
      path: '/',
      maxAge: 86400,
      sameSite: 'lax',
    });

    response.cookies.set('aiterna_staff_name', foundStaff.nama, {
      path: '/',
      maxAge: 86400,
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
