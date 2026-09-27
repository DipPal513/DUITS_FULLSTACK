import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getSession, publicUser } from '@/lib/authServer';

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.id) {
      return NextResponse.json({ success: false, message: 'No token provided' }, { status: 401 });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at')
      .eq('id', session.id)
      .maybeSingle();

    if (error) {
      console.error('checkMe query error:', error);
      return NextResponse.json({ success: false, message: 'Failed to fetch user data' }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: publicUser(user) });
  } catch (err) {
    console.error('checkMe error:', err);
    return NextResponse.json({ success: false, message: 'Failed to fetch user data' }, { status: 500 });
  }
}
