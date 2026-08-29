import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { verifyStripeSession } from '@/services/payments/stripe';
import { verifyFlutterwaveTransaction } from '@/services/payments/flutterwave';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'http://localhost:54321';

    if (!user && isSupabaseConfigured) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sessionId, transactionId, provider } = await request.json();

    if (provider === 'stripe' && sessionId) {
      const result = await verifyStripeSession(sessionId);
      return NextResponse.json(result);
    }

    if (provider === 'flutterwave' && transactionId) {
      const result = await verifyFlutterwaveTransaction(transactionId);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}
