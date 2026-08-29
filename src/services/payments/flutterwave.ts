import { createClient } from '@/lib/supabase-server';

const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY!;
const FLUTTERWAVE_BASE_URL = 'https://api.flutterwave.com/v3';

export interface FlutterwavePaymentResult {
  link?: string;
  transactionId?: string;
  error?: string;
}

export async function createFlutterwavePayment({
  userId,
  resumeId,
  resumeVersionId,
  email,
  name,
  amount = 1,
  priceLabel = 'Professional CV Download',
}: {
  userId: string;
  resumeId: string;
  resumeVersionId?: string;
  email: string;
  name: string;
  amount?: number;
  priceLabel?: string;
}): Promise<FlutterwavePaymentResult> {
  try {
    // Check if already purchased
    const supabase = await createClient();
    const { data: existingPayment } = await supabase
      .from('payments')
      .select('id')
      .eq('user_id', userId)
      .eq('resume_id', resumeId)
      .eq('status', 'COMPLETED')
      .single();

    if (existingPayment) {
      return { error: 'This CV has already been purchased' };
    }

    const txRef = `cv_${resumeId}_${Date.now()}`;

    const response = await fetch(`${FLUTTERWAVE_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tx_ref: txRef,
        amount,
        currency: 'USD',
        redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/resumes/${resumeId}/download`,
        customer: {
          email,
          name,
        },
        customizations: {
          title: priceLabel,
          description: 'One-time payment for this specific CV version.',
        },
        meta: {
          userId,
          resumeId,
          resumeVersionId: resumeVersionId || '',
        },
      }),
    });

    const data = await response.json();

    if (data.status !== 'success') {
      return { error: data.message || 'Failed to create payment' };
    }

    // Create pending payment record
    await supabase.from('payments').insert({
      user_id: userId,
      resume_id: resumeId,
      resume_version_id: resumeVersionId || null,
      provider: 'flutterwave',
      provider_transaction_id: data.data.id.toString(),
      amount,
      currency: 'USD',
      status: 'PENDING',
      payment_type: 'cv_download',
    });

    return {
      link: data.data.link,
      transactionId: data.data.id.toString(),
    };
  } catch (error) {
    console.error('Flutterwave payment error:', error);
    return { error: 'Failed to create payment' };
  }
}

export async function verifyFlutterwaveTransaction(
  transactionId: string
): Promise<{
  verified: boolean;
  paymentId?: string;
  resumeId?: string;
  userId?: string;
  error?: string;
}> {
  try {
    const response = await fetch(
      `${FLUTTERWAVE_BASE_URL}/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (data.status !== 'success' || data.data.status !== 'successful') {
      return { verified: false, error: 'Payment not completed' };
    }

    const supabase = await createClient();

    // Update payment record
    const { data: payment } = await supabase
      .from('payments')
      .update({
        status: 'COMPLETED',
        completed_at: new Date().toISOString(),
      })
      .eq('provider_transaction_id', transactionId)
      .eq('status', 'PENDING')
      .select('id, resume_id, user_id')
      .single();

    if (!payment) {
      return { verified: false, error: 'Payment record not found' };
    }

    return {
      verified: true,
      paymentId: payment.id,
      resumeId: payment.resume_id,
      userId: payment.user_id,
    };
  } catch (error) {
    console.error('Flutterwave verification error:', error);
    return { verified: false, error: 'Failed to verify payment' };
  }
}

export async function handleFlutterwaveWebhook(
  payload: any,
  signature: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Verify webhook signature
    const hash = require('crypto')
      .createHmac('sha256', process.env.FLUTTERWAVE_WEBHOOK_SECRET!)
      .update(JSON.stringify(payload))
      .digest('hex');

    if (hash !== signature) {
      return { success: false, error: 'Invalid signature' };
    }

    const supabase = await createClient();
    const { event, data } = payload;

    switch (event) {
      case 'charge.completed': {
        await supabase
          .from('payments')
          .update({
            status: 'COMPLETED',
            completed_at: new Date().toISOString(),
          })
          .eq('provider_transaction_id', data.id.toString())
          .eq('status', 'PENDING');

        break;
      }

      case 'charge.failed': {
        await supabase
          .from('payments')
          .update({ status: 'FAILED' })
          .eq('provider_transaction_id', data.id.toString())
          .eq('status', 'PENDING');

        break;
      }

      case 'refund.completed': {
        await supabase
          .from('payments')
          .update({
            status: 'REFUNDED',
            refunded_at: new Date().toISOString(),
          })
          .eq('provider_transaction_id', data.id.toString());

        break;
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Flutterwave webhook error:', error);
    return { success: false, error: 'Webhook handling failed' };
  }
}
