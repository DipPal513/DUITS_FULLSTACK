import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { publicUser } from '@/lib/authServer';

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Name, email and password are required' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ success: false, message: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const { data: existing, error: existingError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingError) {
      console.error('Register lookup error:', existingError);
      return NextResponse.json({ success: false, message: 'Registration failed' }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ success: false, message: 'Email already registered' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{
        name,
        email,
        password: hashedPassword,
        role: role === 'ADMIN' || role === 'EDITOR' ? 'PENDING' : (role || 'PENDING'),
      }])
      .select('id, name, email, role, created_at')
      .single();

    if (error) {
      console.error('Register insert error:', error);
      return NextResponse.json({ success: false, message: error.message || 'Registration failed' }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: publicUser(newUser) }, { status: 201 });
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ success: false, message: 'Registration failed' }, { status: 500 });
  }
}
