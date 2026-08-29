import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { createStripeCheckout } from '@/services/payments/stripe';
import { createFlutterwavePayment } from '@/services/payments/flutterwave';
import { getPriceForTemplate } from '@/lib/template-pricing';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'http://localhost:54321';

    if (!user && isSupabaseConfigured) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user?.id || 'dev-user-id';
    const userEmail = user?.email || 'dev@example.com';

    const { resumeId, resumeVersionId, provider } = await request.json();

    if (!resumeId || !provider) {
      return NextResponse.json(
        { error: 'Resume ID and provider are required' },
        { status: 400 }
      );
    }

    // Fetch resume to get template_id and determine price
    let templateId = 'modern-1'; // default fallback
    if (isSupabaseConfigured) {
      const { data: resume } = await supabase
        .from('resumes')
        .select('id, title, template_id')
        .eq('id', resumeId)
        .eq('user_id', userId)
        .single();

      if (!resume) {
        return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
      }

      templateId = resume.template_id || 'modern-1';

      // Check if already paid
      const { data: existingPayment } = await supabase
        .from('payments')
        .select('id')
        .eq('user_id', userId)
        .eq('resume_id', resumeId)
        .eq('status', 'COMPLETED')
        .single();

      if (existingPayment) {
        return NextResponse.json({ error: 'This CV has already been purchased' }, { status: 400 });
      }
    }

    const pricing = getPriceForTemplate(templateId);

    let result;

    switch (provider) {
      case 'stripe':
        result = await createStripeCheckout({
          userId,
          resumeId,
          resumeVersionId,
          email: userEmail,
          priceCents: pricing.cents,
          priceLabel: pricing.label,
        });
        break;

      case 'flutterwave':
        result = await createFlutterwavePayment({
          userId,
          resumeId,
          resumeVersionId,
          email: userEmail,
          name: user?.user_metadata?.full_name || userEmail,
          amount: pricing.amount,
          priceLabel: pricing.label,
        });
        break;

      default:
        return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
    }

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ ...result, pricing });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
