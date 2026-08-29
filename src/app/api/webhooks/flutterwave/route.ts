import { NextRequest, NextResponse } from 'next/server';
import { handleFlutterwaveWebhook } from '@/services/payments/flutterwave';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get('verif-hash') || '';

    const result = await handleFlutterwaveWebhook(body, signature);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Flutterwave webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
