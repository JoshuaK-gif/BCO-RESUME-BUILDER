import { createClient } from '@/lib/supabase-server';
import { redirect, notFound } from 'next/navigation';
import ResumeEditor from '@/components/editor/ResumeEditor';
import { DEFAULT_RESUME_CONTENT, DEFAULT_DESIGN_SETTINGS } from '@/types/resume';

export default async function EditorPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ template?: string; mode?: string }>;
}) {
  const { id } = await params;
  const { template: templateId, mode } = await searchParams;

  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'http://localhost:54321';

  if (!isSupabaseConfigured) {
    const mockResume = {
      id,
      title: 'Untitled Resume',
      content: DEFAULT_RESUME_CONTENT,
      template_id: templateId || 'modern-1',
      design_settings: DEFAULT_DESIGN_SETTINGS,
      updated_at: new Date().toISOString(),
    };
    return <ResumeEditor resume={mockResume as any} initialMode={mode} />;
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: resume } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (!resume) notFound();

  // If template param is provided and different from current, update the resume
  if (templateId && resume.template_id !== templateId) {
    await supabase
      .from('resumes')
      .update({ template_id: templateId })
      .eq('id', id);

    resume.template_id = templateId;
  }

  return <ResumeEditor resume={resume} initialMode={mode} />;
}
