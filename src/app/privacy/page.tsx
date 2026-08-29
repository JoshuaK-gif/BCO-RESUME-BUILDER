'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, Menu, X } from 'lucide-react';

export default function PrivacyPage() {
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: August 28, 2026</p>

          <div className="prose prose-gray max-w-none space-y-6 sm:space-y-8">
            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Welcome to CV Builder by Bridge Collective Opportunities. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our CV builder service.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
              <div className="text-gray-600 leading-relaxed space-y-3 text-sm sm:text-base">
                <p><strong>Account Information:</strong> When you create an account, we collect your name, email address, and password.</p>
                <p><strong>CV Data:</strong> We store the CV/resume content you create, including personal information, work experience, education, skills, and other sections.</p>
                <p><strong>Payment Information:</strong> We process payments through Stripe and Flutterwave. We do not store your credit card or payment details on our servers.</p>
                <p><strong>Usage Data:</strong> We collect anonymous usage data such as pages visited, features used, and time spent on the service to improve our platform.</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <ul className="text-gray-600 leading-relaxed space-y-2 list-disc pl-5 text-sm sm:text-base">
                <li>To provide and maintain the CV builder service</li>
                <li>To process payments and deliver downloaded CVs</li>
                <li>To send you account-related communications</li>
                <li>To improve our service and develop new features</li>
                <li>To detect and prevent fraud or abuse</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">4. AI Features</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Our AI-powered features process your CV content to provide writing suggestions, ATS analysis, and skill recommendations. AI processing may be handled by third-party AI providers (e.g., OpenAI). Your CV content is sent to these providers only when you actively use AI features, and is not used to train their models.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">5. Data Sharing</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                We do not sell your personal information. We only share data with:
              </p>
              <ul className="text-gray-600 leading-relaxed space-y-2 list-disc pl-5 text-sm sm:text-base">
                <li><strong>Payment processors</strong> (Stripe, Flutterwave) to process your transactions</li>
                <li><strong>AI providers</strong> (when you use AI features) to generate suggestions</li>
                <li><strong>Hosting providers</strong> to maintain the service infrastructure</li>
                <li><strong>Analytics tools</strong> for anonymous usage data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">6. Data Security</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                We implement industry-standard security measures including SSL encryption, secure server infrastructure, and regular security audits. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">7. Data Retention</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                We retain your account and CV data for as long as your account is active. If you delete your account, we will remove your personal data within 30 days. Anonymous usage data may be retained indefinitely for analytics purposes.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">8. Your Rights</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                You have the right to access, update, or delete your personal information at any time. You can download your CV data from the dashboard. To request a complete data export or deletion, please contact us at bridgecollectiveopportunities@gmail.com.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">9. Cookies</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                We use essential cookies to maintain your session and authentication. We do not use tracking cookies or third-party advertising cookies. You can control cookie settings in your browser.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">10. Children&apos;s Privacy</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">11. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                We may update this privacy policy from time to time. We will notify you of significant changes by posting the updated policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">12. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                If you have any questions about this Privacy Policy, please contact us:
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
              <Link href="/contact" className="hover:text-white transition-colors duration-300">Contact</Link>
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
