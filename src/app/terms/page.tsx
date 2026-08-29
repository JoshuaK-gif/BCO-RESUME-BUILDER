'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function TermsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <img src="/BRIDGE.png" alt="Bridge Collective Opportunities" className="h-10 sm:h-12 md:h-16 w-auto" />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-[#f97316] leading-tight">Bridge Collective</span>
                <span className="text-xs sm:text-sm font-bold text-[#f97316] leading-tight">Opportunities</span>
              </div>
            </Link>
            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/templates" className="text-sm text-gray-600 hover:text-gray-900">Templates</Link>
              <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Log in</Link>
              <Link href="/signup">
                <Button className="bg-[#0f5e9e] hover:bg-[#0d4f85]">Create My CV</Button>
              </Link>
            </div>
            {/* Mobile hamburger */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-600">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
            <Link href="/templates" className="block text-sm text-gray-600 hover:text-gray-900 py-2" onClick={() => setMobileMenuOpen(false)}>Templates</Link>
            <Link href="/pricing" className="block text-sm text-gray-600 hover:text-gray-900 py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/login" className="block text-sm text-gray-600 hover:text-gray-900 py-2" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-[#0f5e9e] hover:bg-[#0d4f85]">Create My CV</Button>
            </Link>
          </div>
        )}
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: August 28, 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 sm:space-y-8">
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                By accessing or using the CV Builder platform (the &quot;Service&quot;) operated by Bridge Collective Opportunities (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                The Service provides an online CV/resume builder with professional templates, AI-powered writing assistance, ATS score analysis, and PDF export. You can create and edit CVs for free. A one-time payment of $1 per CV is required to download the finished PDF. Premium templates are available for $3.99 each.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">3. Account Registration</h2>
              <ul className="text-gray-600 leading-relaxed space-y-2 list-disc pl-5 text-sm sm:text-base">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the security of your account credentials</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
                <li>You must be at least 13 years old to use the Service</li>
                <li>One person may not maintain more than one account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">4. Payments and Refunds</h2>
              <div className="text-gray-600 leading-relaxed space-y-3 text-sm sm:text-base">
                <p><strong>CV Download Fee ($1):</strong> Each CV requires a one-time payment of $1 to download as a PDF. Once paid, you can re-download the same CV anytime without additional charges.</p>
                <p><strong>Premium Templates ($3.99):</strong> Premium templates require an additional one-time payment of $3.99 per template. This grants lifetime access to that template.</p>
                <p><strong>Payment Methods:</strong> Payments are processed securely through Stripe (credit/debit cards) and Flutterwave (mobile payments). We do not store your payment details.</p>
                <p><strong>Refunds:</strong> Due to the digital nature of the Service, refunds are generally not offered once a CV has been downloaded. If you experience a technical issue preventing download, please contact us and we will resolve it or issue a refund.</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">5. Your Content</h2>
              <div className="text-gray-600 leading-relaxed space-y-3 text-sm sm:text-base">
                <p><strong>Ownership:</strong> You retain full ownership of all content you create using the Service, including your CV/resume data, personal information, and any text you input.</p>
                <p><strong>License to Us:</strong> By using the Service, you grant us a limited, non-exclusive license to store, process, and display your content solely for the purpose of providing the Service to you.</p>
                <p><strong>AI-Generated Content:</strong> Content generated by AI features (writing suggestions, improvements) is provided as suggestions. You are responsible for reviewing and approving all content before including it in your CV.</p>
                <p><strong>No Claim on Templates:</strong> The CV templates and designs remain the intellectual property of Bridge Collective Opportunities. Your payment grants you a license to use the template for your personal CV, not ownership of the template design.</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">6. Acceptable Use</h2>
              <p className="text-gray-600 leading-relaxed mb-2 text-sm sm:text-base">You agree not to:</p>
              <ul className="text-gray-600 leading-relaxed space-y-2 list-disc pl-5 text-sm sm:text-base">
                <li>Use the Service for any unlawful purpose</li>
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Attempt to gain unauthorized access to other users&apos; accounts or data</li>
                <li>Reverse engineer, decompile, or attempt to extract the source code of the Service</li>
                <li>Use automated tools (bots, scrapers) to access the Service</li>
                <li>Resell, redistribute, or commercially exploit the templates or Service</li>
                <li>Interfere with or disrupt the Service or its infrastructure</li>
                <li>Use the Service to create content that is defamatory, harassing, or violates applicable laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">7. AI Features Disclaimer</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                AI-powered features (writing suggestions, ATS analysis, skill recommendations) are provided as tools to assist you. They are not a substitute for professional advice. AI-generated content may contain inaccuracies and should always be reviewed and edited by you before use. We do not guarantee the accuracy, completeness, or effectiveness of AI-generated suggestions.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">8. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                The Service, including its design, code, templates, logos, and documentation, is owned by Bridge Collective Opportunities and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Service or included templates without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">9. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                To the maximum extent permitted by law, Bridge Collective Opportunities shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, or goodwill, arising out of or related to your use of the Service. Our total liability shall not exceed the amount you paid to us in the 12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">10. Warranty Disclaimer</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or secure.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">11. Termination</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                We may suspend or terminate your access to the Service at any time, with or without cause, and with or without notice. You may also terminate your account at any time by contacting us. Upon termination, your right to use the Service ceases immediately. We will retain your data for up to 30 days after termination, after which it will be deleted. Any payments already made are non-refundable except as described in Section 4.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">12. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                We reserve the right to modify these Terms at any time. We will notify you of significant changes by posting the updated terms on this page and updating the &quot;Last updated&quot; date. Your continued use of the Service after changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">13. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Bridge Collective Opportunities operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">14. Contact</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="mt-3 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                <p><strong>Bridge Collective Opportunities</strong></p>
                <p>Email: bridgecollectiveopportunities@gmail.com</p>
                <p>Website: <a href="https://www.bridgecollectiveopport.org" className="text-[#0f5e9e] hover:underline">www.bridgecollectiveopport.org</a></p>
              </div>
            </section>
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Link href="/signup">
              <Button size="lg" className="bg-[#0f5e9e] hover:bg-[#0d4f85]">
                Create My CV <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 sm:py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <img src="/BRIDGE.png" alt="Bridge Collective Opportunities" className="h-8 sm:h-10 md:h-14 w-auto" />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-white leading-tight">Bridge Collective</span>
                <span className="text-xs sm:text-sm font-bold text-[#f97316] leading-tight">Opportunities</span>
              </div>
            </Link>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-400">
              <Link href="/pricing" className="hover:text-white transition-colors duration-300">Pricing</Link>
              <Link href="/templates" className="hover:text-white transition-colors duration-300">Templates</Link>
              <Link href="/privacy" className="hover:text-white transition-colors duration-300">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-300">Terms</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs sm:text-sm text-gray-500">
            © 2024 Bridge Collective Opportunities. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
