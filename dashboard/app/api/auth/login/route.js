import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { TOKEN_NAME, cookieOptions, publicUser, signAuthToken } from '@/lib/authServer';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 400 });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, password, role, created_at')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      console.error('Login query error:', error);
      return NextResponse.json({ success: false, message: 'Login failed' }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 400 });
    }

    const token = signAuthToken({ id: user.id, role: user.role });
    const cookieStore = await cookies();
    cookieStore.set(TOKEN_NAME, token, cookieOptions());

    return NextResponse.json({
      success: true,
      user: publicUser(user),
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ success: false, message: 'Login failed' }, { status: 500 });
  }
}
