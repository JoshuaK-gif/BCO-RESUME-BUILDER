import { NextResponse } from 'next/server';

export async function POST() {
  // Bypass auth when Supabase is not configured
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'http://localhost:54321';

  if (isSupabaseConfigured) {
    const { createClient } = await import('@/lib/supabase-server');
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
}
