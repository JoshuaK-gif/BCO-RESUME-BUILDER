'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, Send, ArrowRight, CheckCircle, Loader2, Menu, X } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

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
        {/* Mobile menu */}
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Have a question, suggestion, or need help? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Send us a message</h2>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 sm:p-8 text-center">
                  <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Message sent!</h3>
                  <p className="text-gray-600 text-sm">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input required type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#0f5e9e] focus:border-transparent outline-none" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input required type="email" className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#0f5e9e] focus:border-transparent outline-none" placeholder="you@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#0f5e9e] focus:border-transparent outline-none">
                      <option>General Question</option>
                      <option>Payment Issue</option>
                      <option>Technical Problem</option>
                      <option>Feature Request</option>
                      <option>Account Issue</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea required rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#0f5e9e] focus:border-transparent outline-none resize-none" placeholder="How can we help you?" />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full bg-[#0f5e9e] hover:bg-[#0d4f85]" size="lg">
                    {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Send className="h-5 w-5 mr-2" />}
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info & FAQ */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Get in touch</h2>
              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#0f5e9e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#0f5e9e]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">Email</h3>
                    <p className="text-sm text-gray-600 break-all sm:break-normal">bridgecollectiveopportunities@gmail.com</p>
                    <p className="text-xs text-gray-400 mt-1">We reply within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#0f5e9e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-[#0f5e9e]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Live Chat</h3>
                    <p className="text-sm text-gray-600">Available Mon-Fri, 9am-5pm</p>
                    <p className="text-xs text-gray-400 mt-1">Response within minutes</p>
                  </div>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Quick answers</h2>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { q: 'How do I download my CV?', a: 'Click Download in the editor, pay $1, and your PDF is ready instantly.' },
                  { q: 'Can I edit after downloading?', a: 'Yes! Your CV stays in your dashboard. Edit anytime and re-download for free.' },
                  { q: 'How does the AI work?', a: 'Click the AI buttons in the editor to get writing suggestions, skill recommendations, and ATS analysis.' },
                  { q: 'Is my data secure?', a: 'Yes. We use encryption and never share your data. See our Privacy Policy.' },
                ].map((faq) => (
                  <div key={faq.q} className="bg-gray-50 rounded-xl p-3 sm:p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{faq.q}</h3>
                    <p className="text-sm text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
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
