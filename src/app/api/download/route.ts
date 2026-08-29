import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import {
  checkPurchaseStatus,
  createExport,
  generateDownloadToken,
  incrementDownloadCount,
} from '@/services/download/download-service';
import { buildResumeHTML, generatePDF } from '@/services/pdf/pdf-service';
import { ResumeContent, DesignSettings } from '@/types/resume';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'http://localhost:54321';

    if (!user && isSupabaseConfigured) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user?.id || 'dev-user-id';
    const { resumeId, format = 'pdf' } = await request.json();

    if (!resumeId) {
      return NextResponse.json({ error: 'Resume ID is required' }, { status: 400 });
    }

    let resumeData: any = null;
    let paymentId = '';
    let finalExportId = '';

    // Verify resume ownership
    if (isSupabaseConfigured) {
      const { data: resume } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', resumeId)
        .eq('user_id', userId)
        .single();

      if (!resume) {
        return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
      }
      resumeData = resume;
    }

    // Check purchase status
    if (isSupabaseConfigured) {
      const { purchased, paymentId: pid, exportId } = await checkPurchaseStatus(userId, resumeId);

      if (!purchased || !pid) {
        return NextResponse.json({ error: 'CV not purchased. Please complete payment first.' }, { status: 402 });
      }

      paymentId = pid;
      finalExportId = exportId || await createExport({ userId, resumeId, paymentId, format }) || '';

      if (!finalExportId) {
        return NextResponse.json({ error: 'Failed to create export record' }, { status: 500 });
      }
    }

    // Build HTML from actual template
    const content: ResumeContent = resumeData?.content || { personalInfo: { fullName: '', professionalTitle: '', email: '', phone: '', location: '', website: '', linkedin: '', github: '', portfolio: '' }, summary: '', experience: [], education: [], skills: [], projects: [], certifications: [], languages: [], awards: [], volunteerExperience: [], publications: [], references: '', interests: [], customSections: [] };
    const design: DesignSettings = resumeData?.design_settings || { font: 'Inter', fontSize: 11, headingSize: 14, accentColor: '#1e40af', lineHeight: 1.5, margins: 15, sectionSpacing: 12, layout: 'classic', sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'], nameSize: 28, subtitleSize: 16, boldHeadings: true, uppercaseHeadings: true };
    const templateId = resumeData?.template_id || 'modern-1';

    const html = await buildResumeHTML(content, design, templateId);
    const pdfBuffer = await generatePDF(html);

    // Increment download count
    if (finalExportId) {
      await incrementDownloadCount(finalExportId);
    }

    // Generate download token
    const token = await generateDownloadToken({ userId, resumeId, paymentId, exportId: finalExportId });

    // Store token
    if (finalExportId && user) {
      await supabase.from('download_tokens').insert({
        user_id: userId,
        export_id: finalExportId,
        token,
        expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      });
    }

    const title = resumeData?.title || 'resume';

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${title}.pdf"`,
        'X-Download-Token': token,
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Failed to generate download' }, { status: 500 });
  }
}
