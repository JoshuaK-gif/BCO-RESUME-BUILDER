'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase-client';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Pencil, Download, Copy, Trash2, Eye, MoreHorizontal, CheckCircle } from 'lucide-react';

interface ResumeCardProps {
  resume: any;
  isPaid: boolean;
}

export default function ResumeCard({ resume, isPaid }: ResumeCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDuplicate = async () => {
    const supabase = createClient();

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'http://localhost:54321';

    if (!isSupabaseConfigured) {
      router.refresh();
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from('resumes').insert({
      user_id: user.id,
      title: `${resume.title} (Copy)`,
      content: resume.content,
      template_id: resume.template_id,
      design_settings: resume.design_settings,
    });

    if (!error) {
      router.refresh();
    }
    setShowMenu(false);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this CV?')) return;
    setDeleting(true);
    const supabase = createClient();
    await supabase.from('resumes').delete().eq('id', resume.id);
    router.refresh();
  };

  const content = resume.content || {};
  const personalInfo = content.personalInfo || {};

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Preview thumbnail */}
      <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 p-4 relative">
        <div className="bg-white rounded shadow-sm p-3 h-full overflow-hidden text-xs">
          <div className="font-bold text-gray-900 mb-1 text-sm">
            {personalInfo.fullName || 'Your Name'}
          </div>
          <div className="text-gray-500 mb-2 text-[10px]">
            {personalInfo.professionalTitle || 'Professional Title'}
          </div>
          <div className="space-y-1">
            <div className="h-1.5 bg-gray-200 rounded w-full" />
            <div className="h-1.5 bg-gray-200 rounded w-4/5" />
            <div className="h-1.5 bg-gray-200 rounded w-full" />
            <div className="h-1.5 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
        {isPaid && (
          <div className="absolute top-3 right-3 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Purchased
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">{resume.title}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Edited {formatDate(resume.updated_at)}
        </p>
        {resume.ats_score > 0 && (
          <div className="flex items-center gap-1 mt-2">
            <div className="text-xs text-gray-500">ATS Score:</div>
            <div className={`text-xs font-semibold ${
              resume.ats_score >= 80 ? 'text-green-600' :
              resume.ats_score >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {resume.ats_score}/100
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex items-center gap-2">
        <Link href={`/editor/${resume.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            <Pencil className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </Link>
        <Link href={`/preview/${resume.id}`} target="_blank">
          <Button variant="ghost" size="sm">
            <Eye className="h-3 w-3" />
          </Button>
        </Link>
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MoreHorizontal className="h-3 w-3" />
          </Button>
          {showMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 bottom-full mb-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 min-w-[160px]">
                <button
                  onClick={handleDuplicate}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Copy className="h-3 w-3" />
                  Duplicate
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="h-3 w-3" />
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
