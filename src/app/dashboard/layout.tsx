import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { FileText, LogOut } from 'lucide-react';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let user = null;

  // Bypass auth when Supabase is not configured
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'http://localhost:54321';

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    user = authUser;
  } else {
    user = { email: 'dev@example.com', id: 'dev-user-id' } as any;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center gap-3">
              <img 
                src="/BRIDGE.png" 
                alt="Bridge Collective Opportunities" 
                className="h-14 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#f97316] leading-tight">Bridge Collective</span>
                <span className="text-sm font-bold text-[#f97316] leading-tight">Opportunities</span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{user?.email}</span>
              <form action="/api/auth/signout" method="post">
                <button
                  type="submit"
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
