import { createClient } from '@/lib/supabase-server';
import jwt from 'jsonwebtoken';

const DOWNLOAD_TOKEN_SECRET = process.env.DOWNLOAD_TOKEN_SECRET || 'cv-builder-download-secret';

export interface DownloadTokenPayload {
  userId: string;
  resumeId: string;
  paymentId: string;
  exportId: string;
}

export async function generateDownloadToken({
  userId,
  resumeId,
  paymentId,
  exportId,
}: DownloadTokenPayload): Promise<string> {
  return jwt.sign(
    { userId, resumeId, paymentId, exportId },
    DOWNLOAD_TOKEN_SECRET,
    { expiresIn: '1h' }
  );
}

export async function verifyDownloadToken(
  token: string
): Promise<DownloadTokenPayload | null> {
  try {
    const payload = jwt.verify(token, DOWNLOAD_TOKEN_SECRET) as DownloadTokenPayload;

    const supabase = await createClient();

    // Check if token was already used
    const { data: tokenRecord } = await supabase
      .from('download_tokens')
      .select('id, used')
      .eq('token', token)
      .single();

    if (tokenRecord?.used) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function markTokenUsed(token: string): Promise<void> {
  const supabase = await createClient();
  await supabase
    .from('download_tokens')
    .update({ used: true })
    .eq('token', token);
}

export async function checkPurchaseStatus(
  userId: string,
  resumeId: string
): Promise<{ purchased: boolean; paymentId?: string; exportId?: string }> {
  const supabase = await createClient();

  // Check for completed payment
  const { data: payment } = await supabase
    .from('payments')
    .select('id')
    .eq('user_id', userId)
    .eq('resume_id', resumeId)
    .eq('status', 'COMPLETED')
    .single();

  if (!payment) {
    return { purchased: false };
  }

  // Check for existing export
  const { data: existingExport } = await supabase
    .from('cv_exports')
    .select('id')
    .eq('user_id', userId)
    .eq('resume_id', resumeId)
    .eq('payment_id', payment.id)
    .single();

  return {
    purchased: true,
    paymentId: payment.id,
    exportId: existingExport?.id,
  };
}

export async function createExport({
  userId,
  resumeId,
  paymentId,
  format,
}: {
  userId: string;
  resumeId: string;
  paymentId: string;
  format: 'pdf' | 'docx';
}) {
  const supabase = await createClient();

  // Check if export already exists
  const { data: existingExport } = await supabase
    .from('cv_exports')
    .select('id')
    .eq('user_id', userId)
    .eq('resume_id', resumeId)
    .eq('payment_id', paymentId)
    .eq('format', format)
    .single();

  if (existingExport) {
    return existingExport.id;
  }

  // Create new export
  const { data: newExport } = await supabase
    .from('cv_exports')
    .insert({
      user_id: userId,
      resume_id: resumeId,
      payment_id: paymentId,
      format,
      status: 'pending',
      download_count: 0,
    })
    .select('id')
    .single();

  return newExport?.id;
}

export async function incrementDownloadCount(exportId: string): Promise<void> {
  const supabase = await createClient();

  const { data: currentExport } = await supabase
    .from('cv_exports')
    .select('download_count')
    .eq('id', exportId)
    .single();

  await supabase
    .from('cv_exports')
    .update({
      download_count: (currentExport?.download_count || 0) + 1,
      first_downloaded_at: currentExport?.download_count === 0
        ? new Date().toISOString()
        : undefined,
      last_downloaded_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', exportId);
}
