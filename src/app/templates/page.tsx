'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, Crown } from 'lucide-react';
import { ResumePreview } from '@/components/templates/ResumePreview';
import { ResumeContent, DesignSettings } from '@/types/resume';

const sampleContent: ResumeContent = {
  personalInfo: {
    fullName: 'John Doe',
    professionalTitle: 'Software Engineer',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: '',
    linkedin: '',
    github: '',
    portfolio: '',
  },
  summary: 'Experienced software engineer with 5+ years of expertise in building scalable web applications using React, TypeScript, and Node.js.',
  experience: [
    {
      id: '1',
      position: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      startDate: '2021-01',
      endDate: '',
      current: true,
      description: 'Leading development of customer-facing products.',
      achievements: [
        'Led a team of 5 engineers to deliver a new product feature',
        'Improved application performance by 40% through optimization',
      ],
    },
    {
      id: '2',
      position: 'Software Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      startDate: '2019-03',
      endDate: '2020-12',
      current: false,
      description: 'Full-stack development of web applications.',
      achievements: [
        'Built RESTful APIs serving 10K+ daily active users',
        'Implemented CI/CD pipeline reducing deploy time by 60%',
      ],
    },
  ],
  education: [
    {
      id: '1',
      institution: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2015-09',
      endDate: '2019-05',
      description: '',
    },
  ],
  skills: [
    { id: '1', category: 'Technical', skills: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL'] },
    { id: '2', category: 'Tools', skills: ['Git', 'Docker', 'AWS', 'CI/CD'] },
  ],
  projects: [],
  certifications: [{ id: '1', name: 'AWS Solutions Architect', issuer: 'Amazon', date: '2023-06' }],
  languages: [{ id: '1', language: 'English', proficiency: 'Native' }],
  awards: [],
  volunteerExperience: [],
  publications: [],
  references: '',
  interests: [],
  customSections: [],
};

const defaultDesign: DesignSettings = {
  font: 'Inter',
  fontSize: 12,
  lineHeight: 1.5,
  margins: 15,
  sectionSpacing: 14,
  accentColor: '#1e40af',
  headingSize: 16,
  layout: 'classic',
  sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'],
  nameSize: 30,
  subtitleSize: 16,
  boldHeadings: true,
  uppercaseHeadings: true,
};

const templates = [
  // Modern
  { id: 'modern-1', name: 'Modern', category: 'Modern', description: 'Clean contemporary design', premium: false },
  { id: 'modern-2', name: 'Modern Split', category: 'Modern', description: 'Split header layout', premium: false },
  { id: 'modern-3', name: 'Modern Centered', category: 'Modern', description: 'Centered header design', premium: false },
  { id: 'modern-4', name: 'Modern Accent Bar', category: 'Modern', description: 'Left accent bar style', premium: false },
  { id: 'modern-5', name: 'Modern Dark', category: 'Modern', description: 'Dark header with sections', premium: false },
  { id: 'modern-6', name: 'Modern Profile', category: 'Modern', description: 'Profile circle sidebar', premium: true },
  { id: 'modern-7', name: 'Modern Elegant', category: 'Modern', description: 'Lightweight elegant style', premium: false },
  { id: 'modern-8', name: 'Modern Cards', category: 'Modern', description: 'Card-based sidebar', premium: true },
  { id: 'modern-9', name: 'Modern Clean', category: 'Modern', description: 'Ultra clean minimal', premium: false },
  { id: 'modern-10', name: 'Modern Dual', category: 'Modern', description: 'Two-column with avatar', premium: true },
  { id: 'modern-11', name: 'Modern Rounded', category: 'Modern', description: 'Rounded card design', premium: false },
  { id: 'modern-12', name: 'Modern Numbered', category: 'Modern', description: 'Numbered sections', premium: false },
  { id: 'modern-13', name: 'Modern Gradient', category: 'Modern', description: 'Gradient sidebar layout', premium: true },
  { id: 'modern-14', name: 'Modern Simple', category: 'Modern', description: 'Simple professional', premium: false },
  { id: 'modern-15', name: 'Modern Sidebar', category: 'Modern', description: 'Dark sidebar design', premium: true },
  // Minimalist
  { id: 'minimal-1', name: 'Minimal', category: 'Minimal', description: 'Simple elegant layout', premium: false },
  { id: 'minimal-2', name: 'Minimal Thin', category: 'Minimal', description: 'Thin weight typography', premium: false },
  { id: 'minimal-3', name: 'Minimal Center', category: 'Minimal', description: 'Centered minimal', premium: false },
  { id: 'minimal-4', name: 'Minimal Labeled', category: 'Minimal', description: 'Labeled sections', premium: false },
  { id: 'minimal-5', name: 'Minimal Timeline', category: 'Minimal', description: 'Timeline style dates', premium: true },
  { id: 'minimal-6', name: 'Minimal Space', category: 'Minimal', description: 'Spacious layout', premium: false },
  { id: 'minimal-7', name: 'Minimal Headers', category: 'Minimal', description: 'Simple headers', premium: false },
  { id: 'minimal-8', name: 'Minimal Right', category: 'Minimal', description: 'Right-aligned header', premium: false },
  { id: 'minimal-9', name: 'Minimal Uppercase', category: 'Minimal', description: 'Uppercase labels', premium: false },
  { id: 'minimal-10', name: 'Minimal Flex', category: 'Minimal', description: 'Flexible layout', premium: true },
  { id: 'minimal-11', name: 'Minimal Dots', category: 'Minimal', description: 'Dot separators', premium: false },
  { id: 'minimal-12', name: 'Minimal Sections', category: 'Minimal', description: 'Section-based', premium: false },
  // Executive
  { id: 'executive-1', name: 'Executive', category: 'Executive', description: 'Professional senior roles', premium: false },
  { id: 'executive-2', name: 'Executive Dark', category: 'Executive', description: 'Dark header executive', premium: true },
  { id: 'executive-3', name: 'Executive Classic', category: 'Executive', description: 'Classic executive style', premium: false },
  { id: 'executive-4', name: 'Executive Minimal', category: 'Executive', description: 'Minimal executive', premium: false },
  { id: 'executive-5', name: 'Executive Bold', category: 'Executive', description: 'Bold executive', premium: true },
  { id: 'executive-6', name: 'Executive Clean', category: 'Executive', description: 'Clean executive', premium: false },
  { id: 'executive-7', name: 'Executive Right', category: 'Executive', description: 'Right contact executive', premium: false },
  { id: 'executive-8', name: 'Executive Accent', category: 'Executive', description: 'Accent executive', premium: true },
  { id: 'executive-9', name: 'Executive Avatar', category: 'Executive', description: 'Avatar executive', premium: true },
  { id: 'executive-10', name: 'Executive Grid', category: 'Executive', description: 'Grid layout executive', premium: true },
  // Professional
  { id: 'professional-1', name: 'Professional', category: 'Professional', description: 'Classic professional', premium: false },
  { id: 'professional-2', name: 'Pro Accent', category: 'Professional', description: 'Accent color borders', premium: false },
  { id: 'professional-3', name: 'Pro Centered', category: 'Professional', description: 'Centered header', premium: false },
  { id: 'professional-4', name: 'Pro Split', category: 'Professional', description: 'Split layout', premium: false },
  { id: 'professional-5', name: 'Pro Flex', category: 'Professional', description: 'Flexible professional', premium: true },
  { id: 'professional-6', name: 'Pro Double', category: 'Professional', description: 'Double border style', premium: false },
  { id: 'professional-7', name: 'Pro Gray', category: 'Professional', description: 'Gray background header', premium: false },
  { id: 'professional-8', name: 'Pro Border', category: 'Professional', description: 'Border accent style', premium: false },
  { id: 'professional-9', name: 'Pro Thin', category: 'Professional', description: 'Thin line design', premium: false },
  { id: 'professional-10', name: 'Pro Left', category: 'Professional', description: 'Left accent border', premium: false },
  { id: 'professional-11', name: 'Pro Color', category: 'Professional', description: 'Color header block', premium: true },
  { id: 'professional-12', name: 'Pro Clean', category: 'Professional', description: 'Clean professional', premium: false },
  // Creative
  { id: 'creative-1', name: 'Creative', category: 'Creative', description: 'Bold creative design', premium: true },
  { id: 'creative-2', name: 'Creative Gradient', category: 'Creative', description: 'Gradient creative', premium: true },
  { id: 'creative-3', name: 'Creative Modern', category: 'Creative', description: 'Modern creative', premium: true },
  { id: 'creative-4', name: 'Creative Sidebar', category: 'Creative', description: 'Sidebar creative', premium: true },
  // Corporate
  { id: 'corporate-1', name: 'Corporate', category: 'Corporate', description: 'Traditional business', premium: false },
  { id: 'corporate-2', name: 'Corporate Pro', category: 'Corporate', description: 'Professional corporate', premium: true },
  { id: 'corporate-3', name: 'Corporate Classic', category: 'Corporate', description: 'Classic corporate', premium: false },
  // Technology
  { id: 'technology-1', name: 'Technology', category: 'Technology', description: 'Tech professional', premium: false },
  { id: 'technology-2', name: 'Tech Skills', category: 'Technology', description: 'Skills-focused tech', premium: true },
  { id: 'technology-3', name: 'Tech Modern', category: 'Technology', description: 'Modern tech', premium: true },
  // Industry
  { id: 'graduate-1', name: 'Graduate', category: 'Graduate', description: 'New graduates', premium: false },
  { id: 'graduate-2', name: 'Graduate Pro', category: 'Graduate', description: 'Graduate with GPA', premium: true },
  { id: 'graduate-3', name: 'Graduate Modern', category: 'Graduate', description: 'Modern graduate', premium: false },
  { id: 'finance-1', name: 'Finance', category: 'Finance', description: 'Financial industry', premium: false },
  { id: 'finance-2', name: 'Finance Pro', category: 'Finance', description: 'Finance professional', premium: true },
  { id: 'finance-3', name: 'Finance Classic', category: 'Finance', description: 'Classic finance', premium: false },
  { id: 'healthcare-1', name: 'Healthcare', category: 'Healthcare', description: 'Medical professionals', premium: false },
  { id: 'healthcare-2', name: 'Healthcare Pro', category: 'Healthcare', description: 'Clinical experience', premium: true },
  { id: 'healthcare-3', name: 'Healthcare Modern', category: 'Healthcare', description: 'Modern healthcare', premium: false },
  { id: 'academic-1', name: 'Academic', category: 'Academic', description: 'Academic positions', premium: false },
  { id: 'academic-2', name: 'Academic Pro', category: 'Academic', description: 'Research focused', premium: true },
  // Other
  { id: 'elegant-1', name: 'Elegant', category: 'Elegant', description: 'Refined sophisticated', premium: false },
  { id: 'elegant-2', name: 'Elegant Classic', category: 'Elegant', description: 'Classic elegant', premium: true },
  { id: 'classic-1', name: 'Classic', category: 'Classic', description: 'Timeless design', premium: false },
  { id: 'classic-2', name: 'Classic Formal', category: 'Classic', description: 'Formal classic', premium: true },
  { id: 'bold-1', name: 'Bold', category: 'Bold', description: 'Strong impression', premium: false },
  { id: 'bold-2', name: 'Bold Color', category: 'Bold', description: 'Bold colored skills', premium: true },
  { id: 'clean-1', name: 'Clean', category: 'Clean', description: 'Uncluttered clear', premium: false },
  { id: 'clean-2', name: 'Clean Simple', category: 'Clean', description: 'Simple clean', premium: false },
  { id: 'timeline-1', name: 'Timeline', category: 'Timeline', description: 'Visual career timeline', premium: true },
  { id: 'timeline-2', name: 'Timeline Pro', category: 'Timeline', description: 'Timeline with dots', premium: true },
  { id: 'two-column-1', name: 'Two Column', category: 'Two Column', description: 'Space-efficient layout', premium: false },
  { id: 'two-column-2', name: 'Two Column Pro', category: 'Two Column', description: 'Two column with sidebar', premium: true },
  { id: 'sidebar-1', name: 'Sidebar', category: 'Sidebar', description: 'Side panel design', premium: false },
  { id: 'sidebar-2', name: 'Sidebar Color', category: 'Sidebar', description: 'Colored sidebar', premium: true },
  { id: 'monochrome-1', name: 'Monochrome', category: 'Monochrome', description: 'Black and white', premium: false },
  { id: 'monochrome-2', name: 'Monochrome Bold', category: 'Monochrome', description: 'Bold monochrome', premium: true },
  { id: 'accent-1', name: 'Accent', category: 'Accent', description: 'Color accent highlights', premium: false },
  { id: 'accent-2', name: 'Accent Bar', category: 'Accent', description: 'Accent bar border', premium: true },
  { id: 'gradient-1', name: 'Gradient', category: 'Modern', description: 'Gradient header badges', premium: true },
  { id: 'ats-2', name: 'ATS Clean', category: 'ATS', description: 'ATS-friendly clean', premium: false },
  { id: 'ats-3', name: 'ATS Pro', category: 'ATS', description: 'ATS-friendly pro', premium: true },
  { id: 'ats-4', name: 'ATS Simple', category: 'ATS', description: 'Simple ATS format', premium: false },
  { id: 'europass-2', name: 'Europass', category: 'Europass', description: 'EU standard format', premium: true },
  { id: 'combination-2', name: 'Combination', category: 'Combination', description: 'Hybrid format', premium: true },
  { id: 'infographic-2', name: 'Infographic', category: 'Infographic', description: 'Visual infographic', premium: true },
  { id: 'industry-2', name: 'Industry', category: 'Industry', description: 'Industry-focused', premium: true },
  // Premium-only exclusive templates
  { id: 'premium-infographic', name: 'Infographic Pro', category: 'Premium', description: 'Visual data-driven design', premium: true },
  { id: 'premium-magazine', name: 'Magazine', category: 'Premium', description: 'Editorial 3-column layout', premium: true },
  { id: 'premium-executive-portrait', name: 'Executive Portrait', category: 'Premium', description: 'Elegant serif executive', premium: true },
  { id: 'premium-multicolor', name: 'Multi-Color', category: 'Premium', description: 'Vibrant gradient sections', premium: true },
  { id: 'premium-modern-duo', name: 'Modern Duo', category: 'Premium', description: 'Two-tone split layout', premium: true },
];

const categories = ['All', 'Premium', 'Modern', 'Minimal', 'Executive', 'Professional', 'Creative', 'Corporate', 'Technology', 'Graduate', 'Finance', 'Healthcare', 'Academic', 'Elegant', 'Classic', 'Bold', 'Clean', 'Timeline', 'Two Column', 'Sidebar', 'Monochrome', 'Accent', 'ATS', 'Europass', 'Combination', 'Infographic', 'Industry'];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-white">
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
              <Link href="/templates" className="text-sm font-medium text-gray-900">Templates</Link>
              <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Log in</Link>
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700">Create My CV</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional CV Templates</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from {templates.length}+ ATS-friendly templates designed by professionals. 
              80+ templates are free to use, with 20+ premium designs available for $3.99 each.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 relative hover:-translate-y-1"
              >
                {template.premium && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      PREMIUM
                    </span>
                  </div>
                )}
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden border-b border-gray-100">
                  <div className="absolute inset-0 origin-top-left" style={{ transform: 'scale(0.48)', transformOrigin: 'top left', width: '208%', height: '208%' }}>
                    <ResumePreview content={sampleContent} design={defaultDesign} templateId={template.id} />
                  </div>
                  {template.premium && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <span className="text-white text-sm font-semibold bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full">Premium Template</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 text-base">{template.name}</h3>
                    {template.premium && (
                      <span className="text-amber-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    {template.premium ? (
                      <Link
                        href={`/dashboard/create?template=${template.id}`}
                        className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-amber-700"
                      >
                        Unlock premium <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    ) : (
                      <Link
                        href={`/dashboard/create?template=${template.id}`}
                        className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Use template <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    )}
                    {template.premium && (
                      <span className="text-sm font-bold text-gray-400">$3.99</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to build your CV?</h2>
            <p className="text-gray-600 mb-6">
              Start with 80+ free templates. Upgrade to premium for exclusive designs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Get Started Free <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-amber-500 text-amber-600 hover:bg-amber-50">
                  <Crown className="h-5 w-5 mr-2" />
                  View Premium Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
