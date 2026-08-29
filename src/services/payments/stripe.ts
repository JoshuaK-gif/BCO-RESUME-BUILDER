import Stripe from 'stripe';
import { createClient } from '@/lib/supabase-server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export interface PaymentResult {
  sessionId?: string;
  url?: string;
  error?: string;
}

export async function createStripeCheckout({
  userId,
  resumeId,
  resumeVersionId,
  email,
  priceCents = 100,
  priceLabel = 'Professional CV Download',
}: {
  userId: string;
  resumeId: string;
  resumeVersionId?: string;
  email: string;
  priceCents?: number;
  priceLabel?: string;
}): Promise<PaymentResult> {
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: priceLabel,
              description: 'One-time payment for this specific CV version.',
            },
            unit_amount: priceCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/resumes/${resumeId}/download?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/editor/${resumeId}`,
      customer_email: email,
      metadata: {
        userId,
        resumeId,
        resumeVersionId: resumeVersionId || '',
      },
      payment_intent_data: {
        metadata: {
          userId,
          resumeId,
          resumeVersionId: resumeVersionId || '',
        },
      },
    });

    // Create pending payment record
    await supabase.from('payments').insert({
      user_id: userId,
      resume_id: resumeId,
      resume_version_id: resumeVersionId || null,
      provider: 'stripe',
      provider_transaction_id: session.payment_intent as string,
      amount: priceCents / 100,
      currency: 'USD',
      status: 'PENDING',
      payment_type: 'cv_download',
    });

    return { sessionId: session.id, url: session.url || undefined };
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return { error: 'Failed to create checkout session' };
  }
}

export async function verifyStripeSession(sessionId: string): Promise<{
  verified: boolean;
  paymentId?: string;
  resumeId?: string;
  userId?: string;
  error?: string;
}> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
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
      .eq('provider_transaction_id', session.payment_intent as string)
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
    console.error('Stripe verification error:', error);
    return { verified: false, error: 'Failed to verify payment' };
  }
}

export async function handleStripeWebhook(
  event: Stripe.Event
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;

        // Update payment status
        await supabase
          .from('payments')
          .update({
            status: 'COMPLETED',
            completed_at: new Date().toISOString(),
          })
          .eq('provider_transaction_id', session.payment_intent as string)
          .eq('status', 'PENDING');

        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        await supabase
          .from('payments')
          .update({ status: 'FAILED' })
          .eq('provider_transaction_id', paymentIntent.id)
          .eq('status', 'PENDING');

        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;

        await supabase
          .from('payments')
          .update({
            status: 'REFUNDED',
            refunded_at: new Date().toISOString(),
          })
          .eq('provider_transaction_id', charge.payment_intent as string);

        break;
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return { success: false, error: 'Webhook handling failed' };
  }
}
