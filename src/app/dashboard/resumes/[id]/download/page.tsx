'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DownloadPage({ params }: { params: Promise<{ id: string }> }) {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleDownload = async () => {
      const { id } = await params;
      const sessionId = searchParams.get('session_id');
      const transactionId = searchParams.get('transaction_id');

      try {
        // For Stripe, verify the session
        if (sessionId) {
          const response = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, provider: 'stripe' }),
          });

          const data = await response.json();
          if (!data.verified) {
            setStatus('error');
            setError(data.error || 'Payment verification failed');
            return;
          }
        }

        // For Flutterwave, verify the transaction
        if (transactionId) {
          const response = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transactionId, provider: 'flutterwave' }),
          });

          const data = await response.json();
          if (!data.verified) {
            setStatus('error');
            setError(data.error || 'Payment verification failed');
            return;
          }
        }

        setStatus('success');
      } catch (err) {
        setStatus('error');
        setError('Failed to verify payment');
      }
    };

    handleDownload();
  }, [params, searchParams]);

  const handleDownloadPDF = async () => {
    const { id } = await params;
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId: id, format: 'pdf' }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      alert('Failed to download PDF');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Confirming payment...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✕</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your CV is ready to download. You can re-download this CV anytime from your dashboard.
        </p>
        <div className="space-y-3">
          <Button onClick={handleDownloadPDF} className="w-full bg-blue-600 hover:bg-blue-700">
            <Download className="h-5 w-5 mr-2" />
            Download PDF
          </Button>
          <Link href="/dashboard">
            <Button variant="outline" className="w-full">
              Back to Dashboard <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
