import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, CheckCircle, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CVBuilder</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/templates" className="text-sm text-gray-600 hover:text-gray-900">Templates</Link>
              <Link href="/pricing" className="text-sm font-medium text-gray-900">Pricing</Link>
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Log in</Link>
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700">Create My CV</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional CV. Just $1 to download.</h1>
            <p className="text-lg text-gray-600">
              Create as many CVs as you want. Pay only for the CVs you choose to download.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Templates Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="text-sm font-medium text-gray-500 mb-2">FREE TEMPLATES</div>
                <div className="text-5xl font-bold text-gray-900 mb-2">$1</div>
                <div className="text-gray-500">per CV · one-time payment</div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Unlimited CV creation',
                  'Unlimited CV editing',
                  '80+ free templates included',
                  'AI writing assistance',
                  'ATS score checker',
                  'Job description matching',
                  'Professional PDF export',
                  'Re-download anytime',
                  'No subscription required',
                  'No recurring billing',
                  'No hidden fees',
                  'Secure payment',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/signup">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  Create My CV <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Premium Templates Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg border border-amber-200 p-8 relative">
              <div className="absolute top-4 right-4">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  PREMIUM
                </span>
              </div>
              <div className="text-center mb-8">
                <div className="text-sm font-medium text-amber-600 mb-2">PREMIUM TEMPLATES</div>
                <div className="text-5xl font-bold text-gray-900 mb-2">$3.99</div>
                <div className="text-gray-500">per template · lifetime access</div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Everything in Free plan',
                  '20+ premium templates',
                  'Exclusive designs',
                  'Priority support',
                  'Commercial license',
                  'Future updates included',
                  'Custom branding options',
                  'Advanced typography',
                  'Premium color palettes',
                  'Animated elements',
                  'Priority customer support',
                  'Lifetime access',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/signup">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white" size="lg">
                  Get Premium <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">How pricing works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Create your CV</h3>
                <p className="text-sm text-gray-600">Build your professional CV using our templates and AI tools. Completely free.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Download for $1</h3>
                <p className="text-sm text-gray-600">When you're ready, pay just $1 to download your professionally formatted CV.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Re-download free</h3>
                <p className="text-sm text-gray-600">Already paid for a CV? Download it again anytime without paying again.</p>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="mt-16 bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Pricing examples</h2>
            <div className="space-y-4 max-w-lg mx-auto">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Create 5 CVs, download 2</span>
                  <span className="font-bold text-gray-900">$2</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Create 10 CVs, download all 10</span>
                  <span className="font-bold text-gray-900">$10</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Create 1 CV, re-download 5 times</span>
                  <span className="font-bold text-gray-900">$1</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently asked questions</h2>
            <div className="space-y-6 max-w-2xl mx-auto">
              {[
                {
                  q: 'Is there a subscription?',
                  a: 'No. There are no subscriptions, no monthly plans, and no recurring charges. You pay exactly $1 for each CV you download, or $3.99 for premium templates.',
                },
                {
                  q: 'Can I create multiple CVs?',
                  a: 'Yes! You can create unlimited CVs for free. You only pay when you choose to download a specific CV.',
                },
                {
                  q: 'What if I need to download the same CV again?',
                  a: "If you've already paid for a CV, you can download it again anytime without paying again.",
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards through Stripe, and mobile payments through Flutterwave.',
                },
                {
                  q: 'Are the templates really free?',
                  a: 'Yes! Over 80 templates are completely free to use. We also offer 20+ premium templates for $3.99 each with exclusive designs and features.',
                },
                {
                  q: 'What are premium templates?',
                  a: 'Premium templates are exclusive, high-quality designs created by professional designers. They include advanced typography, custom branding options, and priority support.',
                },
                {
                  q: 'Can I upgrade from free to premium?',
                  a: 'Absolutely! You can start with free templates and upgrade to premium templates at any time. Your existing CVs will work with any template.',
                },
              ].map((faq) => (
                <div key={faq.q} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
            <p className="text-gray-600 mb-6">Create your professional CV in minutes.</p>
            <Link href="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Create My CV <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
