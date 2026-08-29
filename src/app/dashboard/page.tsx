import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Clock, Download, Trash2, Copy } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import ResumeCard from '@/components/dashboard/ResumeCard';

export default async function DashboardPage() {
  let user = null;
  let resumes: any[] = [];
  let paidResumeIds = new Set<string>();

  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'http://localhost:54321';

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    user = authUser;

    if (user) {
      const { data: resumeData } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });
      resumes = resumeData || [];

      const { data: payments } = await supabase
        .from('payments')
        .select('resume_id')
        .eq('user_id', user.id)
        .eq('status', 'COMPLETED');
      paidResumeIds = new Set(payments?.map((p) => p.resume_id) || []);
    }
  } else {
    user = { email: 'dev@example.com', id: 'dev-user-id' } as any;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My CVs</h1>
          <p className="text-gray-500 mt-1">
            {resumes?.length || 0} CV{(resumes?.length || 0) !== 1 ? 's' : ''} created
          </p>
        </div>
        <Link href="/dashboard/create">
          <Button className="bg-[#0f5e9e] hover:bg-[#0d4f85]">
            <Plus className="h-4 w-4 mr-2" />
            Create New CV
          </Button>
        </Link>
      </div>

      {!resumes || resumes.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No CVs yet</h2>
          <p className="text-gray-500 mb-6">
            Create your first professional CV in minutes.
          </p>
          <Link href="/dashboard/create">
            <Button className="bg-[#0f5e9e] hover:bg-[#0d4f85]">
              <Plus className="h-4 w-4 mr-2" />
              Create CV
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              isPaid={paidResumeIds.has(resume.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
