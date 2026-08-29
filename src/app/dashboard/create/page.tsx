'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { DEFAULT_RESUME_CONTENT, DEFAULT_DESIGN_SETTINGS } from '@/types/resume';
import { generateId } from '@/lib/utils';
import {
  FileText,
  Upload,
  Sparkles,
  ClipboardPaste,
  ArrowRight,
  Loader2,
} from 'lucide-react';

const creationMethods = [
  {
    id: 'scratch',
    title: 'Start from scratch',
    description: 'Begin with a blank CV and build it your way',
    icon: FileText,
  },
  {
    id: 'ai',
    title: 'Build with AI',
    description: 'Answer a few questions and let AI help build your CV',
    icon: Sparkles,
  },
  {
    id: 'upload',
    title: 'Upload existing CV',
    description: 'Import your current CV from PDF, DOCX, or TXT',
    icon: Upload,
  },
  {
    id: 'paste',
    title: 'Paste CV content',
    description: 'Paste your existing CV content and we\'ll structure it',
    icon: ClipboardPaste,
  },
];

export default function CreateCVPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');

  // Auto-create resume if template is specified
  useEffect(() => {
    if (templateId && !loading) {
      handleCreateWithTemplate(templateId);
    }
  }, [templateId]);

  const handleCreateWithTemplate = async (template: string) => {
    setLoading(true);
    const supabase = createClient();

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'http://localhost:54321';

    if (!isSupabaseConfigured) {
      const mockId = generateId();
      router.push(`/editor/${mockId}?template=${template}`);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/login?template=${template}`);
      return;
    }

    const defaultContent = {
      ...DEFAULT_RESUME_CONTENT,
      personalInfo: {
        ...DEFAULT_RESUME_CONTENT.personalInfo,
        fullName: user.user_metadata?.full_name || '',
        email: user.email || '',
      },
    };

    const { data: resume, error } = await supabase
      .from('resumes')
      .insert({
        user_id: user.id,
        title: 'Untitled Resume',
        content: defaultContent,
        template_id: template,
        design_settings: DEFAULT_DESIGN_SETTINGS,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating resume:', error);
      setLoading(false);
      return;
    }

    router.push(`/editor/${resume.id}`);
  };

  const handleCreate = async (method: string) => {
    setLoading(true);
    const supabase = createClient();

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'http://localhost:54321';

    if (!isSupabaseConfigured) {
      const mockId = generateId();
      const templateParam = templateId ? `?template=${templateId}` : '';
      router.push(`/editor/${mockId}${templateParam}`);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    const defaultContent = {
      ...DEFAULT_RESUME_CONTENT,
      personalInfo: {
        ...DEFAULT_RESUME_CONTENT.personalInfo,
        fullName: user.user_metadata?.full_name || '',
        email: user.email || '',
      },
    };

    const { data: resume, error } = await supabase
      .from('resumes')
      .insert({
        user_id: user.id,
        title: 'Untitled Resume',
        content: defaultContent,
        template_id: templateId || 'modern-1',
        design_settings: DEFAULT_DESIGN_SETTINGS,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating resume:', error);
      setLoading(false);
      return;
    }

    if (method === 'ai') {
      router.push(`/editor/${resume.id}?mode=ai`);
    } else if (method === 'upload') {
      router.push(`/editor/${resume.id}?mode=upload`);
    } else if (method === 'paste') {
      router.push(`/editor/${resume.id}?mode=paste`);
    } else {
      router.push(`/editor/${resume.id}`);
    }
  };

  // Show loading when auto-creating with template
  if (templateId && loading) {
    return (
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900">Creating your resume...</h2>
        <p className="text-gray-500 mt-2">Setting up your template</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Create a new CV</h1>
        <p className="text-gray-500 mt-2">
          {templateId
            ? 'Choose how you\'d like to start with this template'
            : 'Choose how you\'d like to start building your professional CV'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {creationMethods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => handleCreate(method.id)}
              disabled={loading}
              className="text-left p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group disabled:opacity-50"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                ) : (
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                )}
              </div>
              <h3 className="font-semibold text-gray-900 mt-4 mb-1">{method.title}</h3>
              <p className="text-sm text-gray-500">{method.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
