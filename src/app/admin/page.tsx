import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import { Users, FileText, DollarSign, Download, TrendingUp, CreditCard, BarChart3 } from 'lucide-react';

export default async function AdminDashboard() {
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'http://localhost:54321';

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500">Overview of your CV Builder platform</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-gray-500">Admin dashboard requires Supabase to be configured.</p>
          </div>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: adminUser } = await supabase.from('admin_users').select('id').eq('id', user.id).single();
  if (!adminUser) redirect('/dashboard');

  const [
    { count: totalUsers },
    { count: totalResumes },
    { count: totalPayments },
    { data: recentPayments },
    { data: revenueData },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('resumes').select('*', { count: 'exact', head: true }),
    supabase.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'COMPLETED'),
    supabase.from('payments').select('*, profiles(full_name, email)').eq('status', 'COMPLETED').order('created_at', { ascending: false }).limit(10),
    supabase.from('payments').select('amount').eq('status', 'COMPLETED'),
  ]);

  const totalRevenue = revenueData?.reduce((sum: number, p: any) => sum + (p.amount || 0), 0) || 0;
  const conversionRate = totalResumes && totalPayments ? ((totalPayments / totalResumes) * 100).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Overview of your CV Builder platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Users" value={totalUsers || 0} icon={Users} color="blue" />
          <StatCard title="Total CVs" value={totalResumes || 0} icon={FileText} color="green" />
          <StatCard title="Total Revenue" value={formatCurrency(totalRevenue)} icon={DollarSign} color="purple" />
          <StatCard title="Downloads" value={totalPayments || 0} icon={Download} color="orange" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-gray-600">Conversion Rate</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{conversionRate}%</div>
            <p className="text-xs text-gray-500 mt-1">CVs downloaded / CVs created</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-600">Avg Revenue/User</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalUsers ? totalRevenue / totalUsers : 0)}</div>
            <p className="text-xs text-gray-500 mt-1">Revenue per registered user</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-600">Revenue/CV</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalPayments ? totalRevenue / totalPayments : 0)}</div>
            <p className="text-xs text-gray-500 mt-1">Average revenue per download</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Recent Payments</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments?.map((payment: any) => (
                  <tr key={payment.id} className="border-b border-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{payment.profiles?.full_name || 'Unknown'}</div>
                      <div className="text-xs text-gray-500">{payment.profiles?.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(payment.amount)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 capitalize">{payment.provider}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">{payment.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: any; icon: any; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}
