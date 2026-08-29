'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useResumeEditor } from '@/hooks/use-resume-editor';
import { ResumePreview } from '@/components/templates/ResumePreview';
import { InteractivePreview } from './InteractivePreview';
import { Button } from '@/components/ui/button';
import { cn, generateId } from '@/lib/utils';
import { ResumeContent, Experience, Education, SkillGroup, Project, Certification, Language, Award, VolunteerExperience, Publication, CustomSection } from '@/types/resume';
import { isPremiumTemplate } from '@/lib/template-pricing';
import {
  Save, Download, Loader2, Plus, Trash2, ChevronDown, ChevronUp,
  GripVertical, Eye, Sparkles, FileText, Palette, Settings,
  Undo2, Redo2, Copy, X, Wand2, Target, Linkedin, CheckCircle,
  ClipboardPaste, Upload
} from 'lucide-react';

interface ResumeEditorProps {
  resume: any;
  initialMode?: string;
}

export default function ResumeEditor({ resume, initialMode }: ResumeEditorProps) {
  const { content, design, isSaving, updateContent, updateDesign, undo, redo, canUndo, canRedo } = useResumeEditor(resume);
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [showPreview, setShowPreview] = useState(true);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [aiLoading, setAiLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAiWizard, setShowAiWizard] = useState(false);
  const router = useRouter();

  // Mobile detection - only for tab toggle, not layout
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleDownload = async () => {
    setShowDownloadModal(true);
  };

  const handleAiAction = async (type: string, text?: string) => {
    setAiLoading(true);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          text,
          resumeData: type === 'generate-summary' || type === 'analyze-ats' || type === 'match-job'
            ? content
            : undefined,
        }),
      });

      const data = await response.json();
      if (data.result) {
        return data.result;
      }
    } catch (error) {
      console.error('AI action failed:', error);
    } finally {
      setAiLoading(false);
    }
    return null;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 z-30 flex items-center justify-between px-3 py-2 md:px-4 md:h-14">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium whitespace-nowrap"
          >
            ← <span className="hidden sm:inline">Dashboard</span>
          </button>
          <div className="h-5 w-px bg-gray-200 hidden sm:block" />
          <input
            className="text-sm font-semibold text-gray-900 bg-transparent border-none outline-none focus:ring-0 max-w-[120px] md:max-w-[200px] truncate"
            value={resume.title}
            placeholder="Resume title"
          />
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          {isSaving && (
            <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
              <Loader2 className="h-3 w-3 animate-spin" />
              Saving...
            </div>
          )}
          {!isSaving && (
            <span className="hidden sm:inline text-xs text-green-600">Saved</span>
          )}
          <Button variant="ghost" size="sm" onClick={undo} disabled={!canUndo} className="hidden sm:inline-flex">
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={redo} disabled={!canRedo} className="hidden sm:inline-flex">
            <Redo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/templates')}
            className="hidden md:inline-flex"
          >
            <Palette className="h-4 w-4 mr-1" />
            Templates
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowPasteModal(true)} className="hidden sm:inline-flex">
            <ClipboardPaste className="h-4 w-4 mr-1" />
            <span className="hidden md:inline">Paste CV</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowUploadModal(true)} className="hidden sm:inline-flex">
            <Upload className="h-4 w-4 mr-1" />
            <span className="hidden md:inline">Upload</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowAiWizard(true)} className="hidden sm:inline-flex text-amber-600 hover:text-amber-700">
            <Wand2 className="h-4 w-4 mr-1" />
            <span className="hidden md:inline">AI Build</span>
          </Button>
          {mounted && isMobile && (
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setActiveTab('edit')}
                className={cn('px-2 py-1 rounded-md text-xs font-medium transition-colors', activeTab === 'edit' ? 'bg-white shadow text-gray-900' : 'text-gray-500')}
              >
                Edit
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={cn('px-2 py-1 rounded-md text-xs font-medium transition-colors', activeTab === 'preview' ? 'bg-white shadow text-gray-900' : 'text-gray-500')}
              >
                Preview
              </button>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/preview/${resume.id}`)}
            className="hidden md:inline-flex"
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
          <Button size="sm" className="bg-[#0f5e9e] hover:bg-[#0d4f85] px-2 md:px-3" onClick={handleDownload}>
            <Download className="h-4 w-4 md:mr-1" />
            <span className="hidden md:inline">Download</span>
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={cn(
        'flex-1 flex overflow-hidden',
        mounted && isMobile && activeTab === 'preview' ? 'hidden' : ''
      )}>
        {/* Section Nav - Hidden on mobile, shown on lg+ */}
        <div className="hidden lg:block w-48 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-3 space-y-1">
            {sectionNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                  activeSection === item.id
                    ? 'bg-[#0f5e9e]/10 text-[#0f5e9e] font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Mobile section selector */}
          {mounted && isMobile && (
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-3 py-2">
              <select
                value={activeSection}
                onChange={(e) => setActiveSection(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
              >
                {sectionNavItems.map((item) => (
                  <option key={item.id} value={item.id}>{item.label}</option>
                ))}
              </select>
            </div>
          )}

          <div className="p-3 md:p-6">

          {activeSection === 'personal' && (
            <PersonalInfoSection content={content} updateContent={updateContent} />
          )}
          {activeSection === 'summary' && (
            <SummarySection content={content} updateContent={updateContent} onAiAction={handleAiAction} aiLoading={aiLoading} />
          )}
          {activeSection === 'experience' && (
            <ExperienceSection content={content} updateContent={updateContent} onAiAction={handleAiAction} aiLoading={aiLoading} />
          )}
          {activeSection === 'education' && (
            <EducationSection content={content} updateContent={updateContent} />
          )}
          {activeSection === 'skills' && (
            <SkillsSection content={content} updateContent={updateContent} onAiAction={handleAiAction} aiLoading={aiLoading} />
          )}
          {activeSection === 'projects' && (
            <ProjectsSection content={content} updateContent={updateContent} />
          )}
          {activeSection === 'certifications' && (
            <CertificationsSection content={content} updateContent={updateContent} />
          )}
          {activeSection === 'languages' && (
            <LanguagesSection content={content} updateContent={updateContent} />
          )}
          {activeSection === 'awards' && (
            <AwardsSection content={content} updateContent={updateContent} />
          )}
          {activeSection === 'volunteer' && (
            <VolunteerSection content={content} updateContent={updateContent} />
          )}
          {activeSection === 'publications' && (
            <PublicationsSection content={content} updateContent={updateContent} />
          )}
          {activeSection === 'cover-letter' && (
            <CoverLetterSection content={content} onAiAction={handleAiAction} aiLoading={aiLoading} />
          )}
          {activeSection === 'custom' && (
            <CustomSections content={content} updateContent={updateContent} />
          )}
          {activeSection === 'design' && (             <DesignSection design={design} updateDesign={updateDesign} templateId={resume.template_id} />
          )}
          </div>
        </div>

        {/* Preview Panel - Desktop (inside flex) */}
        {!mounted || !isMobile ? (
          <div className="border-l border-gray-300 overflow-hidden w-[45%]">
            <InteractivePreview
              content={content}
              design={design}
              updateContent={updateContent}
              updateDesign={updateDesign}
            >
              <ResumePreview content={content} design={design} templateId={resume.template_id} />
            </InteractivePreview>
          </div>
        ) : null}
      </div>

      {/* Preview Panel - Mobile (overlay, outside flex) */}
      {mounted && isMobile && activeTab === 'preview' && (
        <div className="fixed inset-0 z-50 bg-gray-200 pt-12">
          <div className="absolute top-0 left-0 right-0 h-12 bg-white border-b flex items-center justify-between px-4 z-50">
            <span className="font-medium text-sm">Preview</span>
            <button onClick={() => setActiveTab('edit')} className="text-gray-500 p-1">
              <X className="h-5 w-5" />
            </button>
          </div>
          <InteractivePreview
            content={content}
            design={design}
            updateContent={updateContent}
            updateDesign={updateDesign}
          >
            <ResumePreview content={content} design={design} templateId={resume.template_id} />
          </InteractivePreview>
        </div>
      )}

      {/* Download Modal */}
      {showDownloadModal && (
        <DownloadModal
          resumeId={resume.id}
          resumeTitle={resume.title}
          onClose={() => setShowDownloadModal(false)}
        />
      )}
      {showPasteModal && (
        <PasteCVModal
          onClose={() => setShowPasteModal(false)}
          onParse={(data) => {
            updateContent(data);
            setShowPasteModal(false);
          }}
        />
      )}
      {showUploadModal && (
        <UploadCVModal
          onClose={() => setShowUploadModal(false)}
          onParse={(data) => {
            updateContent(data);
            setShowUploadModal(false);
          }}
        />
      )}
      {showAiWizard && (
        <AiWizardModal
          onClose={() => setShowAiWizard(false)}
          onComplete={(data) => {
            updateContent(data);
            setShowAiWizard(false);
          }}
          content={content}
          onAiAction={handleAiAction}
        />
      )}
    </div>
  );
}

// ==========================================
// SECTION NAV
// ==========================================
const sectionNavItems = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'languages', label: 'Languages' },
  { id: 'awards', label: 'Awards' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'publications', label: 'Publications' },
  { id: 'cover-letter', label: 'Cover Letter' },
  { id: 'custom', label: 'Custom' },
  { id: 'design', label: 'Design' },
];

// ==========================================
// DOWNLOAD MODAL
// ==========================================
function DownloadModal({ resumeId, resumeTitle, onClose }: { resumeId: string; resumeTitle: string; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<'stripe' | 'flutterwave'>('stripe');

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId, provider }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.link) {
        window.location.href = data.link;
      } else if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      alert('Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Download CV</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">Your CV is ready. Download your professionally formatted CV for a one-time payment of $1.</p>
          <ul className="space-y-2">
            {['Professional PDF', 'ATS-friendly format', 'No watermark', 'High-quality export', 'Re-download anytime'].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-3">Select payment method:</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setProvider('stripe')}
              className={cn(
                'p-3 border rounded-lg text-center transition-colors',
                provider === 'stripe' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <div className="font-medium text-gray-900">Credit Card</div>
              <div className="text-xs text-gray-500">Powered by Stripe</div>
            </button>
            <button
              onClick={() => setProvider('flutterwave')}
              className={cn(
                'p-3 border rounded-lg text-center transition-colors',
                provider === 'flutterwave' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <div className="font-medium text-gray-900">Mobile Payment</div>
              <div className="text-xs text-gray-500">Powered by Flutterwave</div>
            </button>
          </div>
        </div>

        <Button
          onClick={handleDownload}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
          ) : (
            <Download className="h-5 w-5 mr-2" />
          )}
          Pay $1 & Download
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          No subscription. No recurring charges. Just $1 for this CV.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// SECTION COMPONENTS
// ==========================================

function PersonalInfoSection({ content, updateContent }: { content: ResumeContent; updateContent: (c: Partial<ResumeContent>) => void }) {
  const info = content.personalInfo;
  const update = (field: string, value: string) => {
    updateContent({ personalInfo: { ...info, [field]: value } });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Personal Information" subtitle="Your contact details and basic info" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Full Name" value={info.fullName} onChange={(v) => update('fullName', v)} placeholder="John Doe" />
        <InputField label="Professional Title" value={info.professionalTitle} onChange={(v) => update('professionalTitle', v)} placeholder="Software Engineer" />
        <InputField label="Email" value={info.email} onChange={(v) => update('email', v)} placeholder="john@example.com" type="email" />
        <InputField label="Phone" value={info.phone} onChange={(v) => update('phone', v)} placeholder="+1 (555) 123-4567" />
        <InputField label="Location" value={info.location} onChange={(v) => update('location', v)} placeholder="New York, NY" />
        <InputField label="Website" value={info.website} onChange={(v) => update('website', v)} placeholder="https://johndoe.com" />
        <InputField label="LinkedIn" value={info.linkedin} onChange={(v) => update('linkedin', v)} placeholder="linkedin.com/in/johndoe" />
        <InputField label="GitHub" value={info.github} onChange={(v) => update('github', v)} placeholder="github.com/johndoe" />
        <InputField label="Portfolio" value={info.portfolio} onChange={(v) => update('portfolio', v)} placeholder="Portfolio URL" />
      </div>
    </div>
  );
}

function SummarySection({ content, updateContent, onAiAction, aiLoading }: { content: ResumeContent; updateContent: (c: Partial<ResumeContent>) => void; onAiAction: (type: string, text?: string) => Promise<any>; aiLoading: boolean }) {
  const [aiResult, setAiResult] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    const result = await onAiAction('generate-summary', content.summary);
    if (result) {
      setAiResult(result);
    }
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Professional Summary" subtitle="A brief overview of your professional background" />
      
      {/* AI Actions */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerateSummary}
          disabled={aiLoading}
        >
          {aiLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          Generate with AI
        </Button>
        {content.summary && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const result = await onAiAction('improve-bullet', content.summary);
                if (result) setAiResult(result);
              }}
              disabled={aiLoading}
            >
              <Wand2 className="h-4 w-4 mr-2" />
              Improve
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const result = await onAiAction('analyze-ats');
                if (result) {
                  alert(`ATS Score: ${result.score}/100\n\nStrengths:\n${result.strengths.join('\n')}\n\nRecommendations:\n${result.recommendations.join('\n')}`);
                }
              }}
              disabled={aiLoading}
            >
              <Target className="h-4 w-4 mr-2" />
              ATS Check
            </Button>
          </>
        )}
      </div>

      {/* AI Result Preview */}
      {aiResult && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">AI Suggestion</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  updateContent({ summary: aiResult });
                  setAiResult(null);
                }}
              >
                Accept
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setAiResult(null)}
              >
                Dismiss
              </Button>
            </div>
          </div>
          <p className="text-sm text-blue-900 whitespace-pre-line">{aiResult}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
        <textarea
          value={content.summary}
          onChange={(e) => updateContent({ summary: e.target.value })}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
          placeholder="Experienced software engineer with 5+ years of expertise in building scalable web applications..."
        />
        <p className="text-xs text-gray-500 mt-1">Tip: Keep it to 2-4 sentences. Focus on your key strengths and career objectives.</p>
      </div>
    </div>
  );
}

function ExperienceSection({ content, updateContent, onAiAction, aiLoading }: { content: ResumeContent; updateContent: (c: Partial<ResumeContent>) => void; onAiAction: (type: string, text?: string) => Promise<any>; aiLoading: boolean }) {
  const experiences = content.experience;

  const addExperience = () => {
    const newExp: Experience = {
      id: generateId(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
    };
    updateContent({ experience: [...experiences, newExp] });
  };

  const updateExp = (idx: number, field: string, value: any) => {
    const updated = [...experiences];
    (updated[idx] as any)[field] = value;
    updateContent({ experience: updated });
  };

  const removeExp = (idx: number) => {
    updateContent({ experience: experiences.filter((_, i) => i !== idx) });
  };

  const addAchievement = (idx: number) => {
    const updated = [...experiences];
    updated[idx] = { ...updated[idx], achievements: [...updated[idx].achievements, ''] };
    updateContent({ experience: updated });
  };

  const updateAchievement = (expIdx: number, achIdx: number, value: string) => {
    const updated = [...experiences];
    const achievements = [...updated[expIdx].achievements];
    achievements[achIdx] = value;
    updated[expIdx] = { ...updated[expIdx], achievements };
    updateContent({ experience: updated });
  };

  const removeAchievement = (expIdx: number, achIdx: number) => {
    const updated = [...experiences];
    updated[expIdx] = {
      ...updated[expIdx],
      achievements: updated[expIdx].achievements.filter((_, i) => i !== achIdx),
    };
    updateContent({ experience: updated });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Work Experience" subtitle="Your professional work history" />
      {experiences.map((exp, idx) => (
        <div key={exp.id} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Experience {idx + 1}</h3>
            <button onClick={() => removeExp(idx)} className="text-red-500 hover:text-red-600 text-sm">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Position" value={exp.position} onChange={(v) => updateExp(idx, 'position', v)} placeholder="Software Engineer" />
            <InputField label="Company" value={exp.company} onChange={(v) => updateExp(idx, 'company', v)} placeholder="Google" />
            <InputField label="Location" value={exp.location} onChange={(v) => updateExp(idx, 'location', v)} placeholder="Mountain View, CA" />
            <div className="grid grid-cols-2 gap-2">
              <InputField label="Start Date" value={exp.startDate} onChange={(v) => updateExp(idx, 'startDate', v)} placeholder="2022-01" type="month" />
              <InputField label="End Date" value={exp.endDate} onChange={(v) => updateExp(idx, 'endDate', v)} placeholder="2024-01" type="month" disabled={exp.current} />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) => updateExp(idx, 'current', e.target.checked)}
              className="rounded border-gray-300"
            />
            I currently work here
          </label>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  const result = await onAiAction('improve-experience', exp.description);
                  if (result) updateExp(idx, 'description', result);
                }}
                disabled={aiLoading || !exp.description}
                className="text-xs"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Improve with AI
              </Button>
            </div>
            <textarea
              value={exp.description}
              onChange={(e) => updateExp(idx, 'description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Describe your role and responsibilities..."
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Achievements</label>
              <button onClick={() => addAchievement(idx)} className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>
            {exp.achievements.map((ach, achIdx) => (
              <div key={achIdx} className="flex gap-2 mb-2">
                <input
                  value={ach}
                  onChange={(e) => updateAchievement(idx, achIdx, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Increased sales by 25% through..."
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    const result = await onAiAction('improve-bullet', ach);
                    if (result) updateAchievement(idx, achIdx, result);
                  }}
                  disabled={aiLoading || !ach}
                >
                  <Sparkles className="h-3 w-3" />
                </Button>
                <button onClick={() => removeAchievement(idx, achIdx)} className="text-red-400 hover:text-red-600">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addExperience} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
}

function EducationSection({ content, updateContent }: { content: ResumeContent; updateContent: (c: Partial<ResumeContent>) => void }) {
  const education = content.education;

  const addEducation = () => {
    const newEdu: Education = {
      id: generateId(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    updateContent({ education: [...education, newEdu] });
  };

  const updateEdu = (idx: number, field: string, value: string) => {
    const updated = [...education];
    (updated[idx] as any)[field] = value;
    updateContent({ education: updated });
  };

  const removeEdu = (idx: number) => {
    updateContent({ education: education.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Education" subtitle="Your educational background" />
      {education.map((edu, idx) => (
        <div key={edu.id} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Education {idx + 1}</h3>
            <button onClick={() => removeEdu(idx)} className="text-red-500 hover:text-red-600 text-sm">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Institution" value={edu.institution} onChange={(v) => updateEdu(idx, 'institution', v)} placeholder="MIT" />
            <InputField label="Degree" value={edu.degree} onChange={(v) => updateEdu(idx, 'degree', v)} placeholder="Bachelor of Science" />
            <InputField label="Field of Study" value={edu.field} onChange={(v) => updateEdu(idx, 'field', v)} placeholder="Computer Science" />
            <div className="grid grid-cols-2 gap-2">
              <InputField label="Start Date" value={edu.startDate} onChange={(v) => updateEdu(idx, 'startDate', v)} placeholder="2018-09" type="month" />
              <InputField label="End Date" value={edu.endDate} onChange={(v) => updateEdu(idx, 'endDate', v)} placeholder="2022-05" type="month" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <textarea
              value={edu.description}
              onChange={(e) => updateEdu(idx, 'description', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Relevant coursework, achievements..."
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addEducation} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}

function SkillsSection({ content, updateContent, onAiAction, aiLoading }: { content: ResumeContent; updateContent: (c: Partial<ResumeContent>) => void; onAiAction: (type: string, text?: string) => Promise<any>; aiLoading: boolean }) {
  const skills = content.skills;

  const addGroup = () => {
    const newGroup: SkillGroup = { id: generateId(), category: '', skills: [] };
    updateContent({ skills: [...skills, newGroup] });
  };

  const updateGroup = (idx: number, field: string, value: any) => {
    const updated = [...skills];
    (updated[idx] as any)[field] = value;
    updateContent({ skills: updated });
  };

  const removeGroup = (idx: number) => {
    updateContent({ skills: skills.filter((_, i) => i !== idx) });
  };

  const updateSkillsList = (idx: number, skillsStr: string) => {
    const updated = [...skills];
    updated[idx] = { ...updated[idx], skills: skillsStr.split(',').map((s) => s.trim()).filter(Boolean) };
    updateContent({ skills: updated });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Skills" subtitle="Your technical and professional skills" />
      
      <Button
        variant="outline"
        size="sm"
        onClick={async () => {
          const experienceText = content.experience.map(e => `${e.position}: ${e.description}`).join('\n');
          const result = await onAiAction('suggest-skills', experienceText);
          if (result && Array.isArray(result)) {
            const newGroup: SkillGroup = {
              id: generateId(),
              category: 'Suggested Skills',
              skills: result,
            };
            updateContent({ skills: [...skills, newGroup] });
          }
        }}
        disabled={aiLoading}
      >
        <Sparkles className="h-4 w-4 mr-2" />
        Suggest Skills with AI
      </Button>

      {skills.map((group, idx) => (
        <div key={group.id} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <input
              value={group.category}
              onChange={(e) => updateGroup(idx, 'category', e.target.value)}
              className="font-medium text-gray-900 bg-transparent border-none outline-none"
              placeholder="Category name (e.g. Technical Skills)"
            />
            <button onClick={() => removeGroup(idx)} className="text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Skills (comma separated)</label>
            <input
              value={group.skills.join(', ')}
              onChange={(e) => updateSkillsList(idx, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="React, TypeScript, Node.js, PostgreSQL"
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addGroup} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Skill Group
      </Button>
    </div>
  );
}

function ProjectsSection({ content, updateContent }: { content: ResumeContent; updateContent: (c: Partial<ResumeContent>) => void }) {
  const projects = content.projects;

  const addProject = () => {
    const newProject: Project = { id: generateId(), name: '', description: '', link: '', technologies: [] };
    updateContent({ projects: [...projects, newProject] });
  };

  const updateProject = (idx: number, field: string, value: any) => {
    const updated = [...projects];
    (updated[idx] as any)[field] = value;
    updateContent({ projects: updated });
  };

  const removeProject = (idx: number) => {
    updateContent({ projects: projects.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Projects" subtitle="Notable projects you've worked on" />
      {projects.map((project, idx) => (
        <div key={project.id} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Project {idx + 1}</h3>
            <button onClick={() => removeProject(idx)} className="text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Name" value={project.name} onChange={(v) => updateProject(idx, 'name', v)} placeholder="Project Name" />
            <InputField label="Link" value={project.link} onChange={(v) => updateProject(idx, 'link', v)} placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={project.description}
              onChange={(e) => updateProject(idx, 'description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Describe the project..."
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Technologies (comma separated)</label>
            <input
              value={project.technologies.join(', ')}
              onChange={(e) => updateProject(idx, 'technologies', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="React, Node.js, PostgreSQL"
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addProject} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}

function CertificationsSection({ content, updateContent }: { content: ResumeContent; updateContent: (c: Partial<ResumeContent>) => void }) {
  const certs = content.certifications;

  const addCert = () => {
    const newCert: Certification = { id: generateId(), name: '', issuer: '', date: '' };
    updateContent({ certifications: [...certs, newCert] });
  };

  const updateCert = (idx: number, field: string, value: string) => {
    const updated = [...certs];
    (updated[idx] as any)[field] = value;
    updateContent({ certifications: updated });
  };

  const removeCert = (idx: number) => {
    updateContent({ certifications: certs.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Certifications" subtitle="Professional certifications and licenses" />
      {certs.map((cert, idx) => (
        <div key={cert.id} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Certification {idx + 1}</h3>
            <button onClick={() => removeCert(idx)} className="text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField label="Name" value={cert.name} onChange={(v) => updateCert(idx, 'name', v)} placeholder="AWS Solutions Architect" />
            <InputField label="Issuer" value={cert.issuer} onChange={(v) => updateCert(idx, 'issuer', v)} placeholder="Amazon Web Services" />
            <InputField label="Date" value={cert.date} onChange={(v) => updateCert(idx, 'date', v)} placeholder="2024-01" type="month" />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addCert} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Certification
      </Button>
    </div>
  );
}

function LanguagesSection({ content, updateContent }: { content: ResumeContent; updateContent: (c: Partial<ResumeContent>) => void }) {
  const languages = content.languages;

  const addLanguage = () => {
    const newLang: Language = { id: generateId(), language: '', proficiency: 'Professional' };
    updateContent({ languages: [...languages, newLang] });
  };

  const updateLang = (idx: number, field: string, value: string) => {
    const updated = [...languages];
    (updated[idx] as any)[field] = value;
    updateContent({ languages: updated });
  };

  const removeLang = (idx: number) => {
    updateContent({ languages: languages.filter((_, i) => i !== idx) });
  };

  const proficiencyLevels = ['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic'];

  return (
    <div className="space-y-6">
      <SectionHeader title="Languages" subtitle="Languages you speak" />
      {languages.map((lang, idx) => (
        <div key={lang.id} className="bg-white border border-gray-200 rounded-xl p-5 flex items-end gap-4">
          <div className="flex-1">
            <InputField label="Language" value={lang.language} onChange={(v) => updateLang(idx, 'language', v)} placeholder="English" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency</label>
            <select
              value={lang.proficiency}
              onChange={(e) => updateLang(idx, 'proficiency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {proficiencyLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <button onClick={() => removeLang(idx)} className="text-red-500 hover:text-red-600 pb-2">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <Button variant="outline" onClick={addLanguage} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Language
      </Button>
    </div>
  );
}

function AwardsSection({ content, updateContent }: { content: ResumeContent; updateContent: (c: Partial<ResumeContent>) => void }) {
  const awards = content.awards;

  const addAward = () => {
    const newAward: Award = { id: generateId(), name: '', issuer: '', date: '', description: '' };
    updateContent({ awards: [...awards, newAward] });
  };

  const updateAward = (idx: number, field: string, value: string) => {
    const updated = [...awards];
    (updated[idx] as any)[field] = value;
    updateContent({ awards: updated });
  };

  const removeAward = (idx: number) => {
    updateContent({ awards: awards.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Awards" subtitle="Awards and honors you've received" />
      {awards.map((award, idx) => (
        <div key={award.id} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Award {idx + 1}</h3>
            <button onClick={() => removeAward(idx)} className="text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Name" value={award.name} onChange={(v) => updateAward(idx, 'name', v)} placeholder="Award Name" />
            <InputField label="Issuer" value={award.issuer} onChange={(v) => updateAward(idx, 'issuer', v)} placeholder="Issuing Organization" />
            <InputField label="Date" value={award.date} onChange={(v) => updateAward(idx, 'date', v)} placeholder="2024-01" type="month" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <textarea
              value={award.description || ''}
              onChange={(e) => updateAward(idx, 'description', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Brief description of the award..."
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addAward} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Award
      </Button>
    </div>
  );
}

function VolunteerSection({ content, updateContent }: { content: ResumeContent; updateContent: (c: Partial<ResumeContent>) => void }) {
  const volunteer = content.volunteerExperience;

  const addVolunteer = () => {
    const newVol: VolunteerExperience = {
      id: generateId(),
      organization: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    updateContent({ volunteerExperience: [...volunteer, newVol] });
  };

  const updateVol = (idx: number, field: string, value: string) => {
    const updated = [...volunteer];
    (updated[idx] as any)[field] = value;
    updateContent({ volunteerExperience: updated });
  };

  const removeVol = (idx: number) => {
    updateContent({ volunteerExperience: volunteer.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Volunteer Experience" subtitle="Community involvement and volunteer work" />
      {volunteer.map((vol, idx) => (
        <div key={vol.id} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Volunteer {idx + 1}</h3>
            <button onClick={() => removeVol(idx)} className="text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Organization" value={vol.organization} onChange={(v) => updateVol(idx, 'organization', v)} placeholder="Organization Name" />
            <InputField label="Role" value={vol.role} onChange={(v) => updateVol(idx, 'role', v)} placeholder="Volunteer Role" />
            <InputField label="Location" value={vol.location} onChange={(v) => updateVol(idx, 'location', v)} placeholder="Location" />
            <div className="grid grid-cols-2 gap-2">
              <InputField label="Start Date" value={vol.startDate} onChange={(v) => updateVol(idx, 'startDate', v)} placeholder="2022-01" type="month" />
              <InputField label="End Date" value={vol.endDate} onChange={(v) => updateVol(idx, 'endDate', v)} placeholder="2024-01" type="month" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={vol.description}
              onChange={(e) => updateVol(idx, 'description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Describe your volunteer work..."
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addVolunteer} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Volunteer Experience
      </Button>
    </div>
  );
}

function CoverLetterSection({ content, onAiAction, aiLoading }: { content: ResumeContent; onAiAction: (type: string, text?: string) => Promise<any>; aiLoading: boolean }) {
  const [letter, setLetter] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const result = await onAiAction('generate-cover-letter', JSON.stringify(content));
      if (result) setLetter(result);
    } catch (e) {
      console.error('Cover letter generation failed:', e);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letter);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Cover Letter" subtitle="Generate a tailored cover letter for your job applications" />
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={handleGenerate} disabled={generating || aiLoading}>
          {generating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          Generate with AI
        </Button>
        {letter && (
          <Button variant="outline" size="sm" onClick={handleCopy}>
            Copy to Clipboard
          </Button>
        )}
      </div>
      {letter && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">Generated Cover Letter</span>
            <button onClick={() => setLetter('')} className="text-xs text-blue-600 hover:text-blue-800">Clear</button>
          </div>
          <textarea
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            rows={16}
            className="w-full px-4 py-3 border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-white"
          />
        </div>
      )}
      {!letter && !generating && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">Click &quot;Generate with AI&quot; to create a cover letter based on your CV content.</p>
          <p className="text-xs text-gray-400 mt-1">You can edit the generated letter before copying it.</p>
        </div>
      )}
    </div>
  );
}

function PublicationsSection({ content, updateContent }: { content: ResumeContent; updateContent: (c: Partial<ResumeContent>) => void }) {
  const publications = content.publications;

  const addPublication = () => {
    const newPub: Publication = { id: generateId(), title: '', publisher: '', date: '', url: '', description: '' };
    updateContent({ publications: [...publications, newPub] });
  };

  const updatePub = (idx: number, field: string, value: string) => {
    const updated = [...publications];
    (updated[idx] as any)[field] = value;
    updateContent({ publications: updated });
  };

  const removePub = (idx: number) => {
    updateContent({ publications: publications.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Publications" subtitle="Published works and articles" />
      {publications.map((pub, idx) => (
        <div key={pub.id} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">Publication {idx + 1}</h3>
            <button onClick={() => removePub(idx)} className="text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Title" value={pub.title} onChange={(v) => updatePub(idx, 'title', v)} placeholder="Publication Title" />
            <InputField label="Publisher" value={pub.publisher} onChange={(v) => updatePub(idx, 'publisher', v)} placeholder="Publisher Name" />
            <InputField label="Date" value={pub.date} onChange={(v) => updatePub(idx, 'date', v)} placeholder="2024-01" type="month" />
            <InputField label="URL" value={pub.url || ''} onChange={(v) => updatePub(idx, 'url', v)} placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <textarea
              value={pub.description || ''}
              onChange={(e) => updatePub(idx, 'description', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Brief description..."
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addPublication} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Publication
      </Button>
    </div>
  );
}

function CustomSections({ content, updateContent }: { content: ResumeContent; updateContent: (c: Partial<ResumeContent>) => void }) {
  const customSections = content.customSections;

  const addSection = () => {
    const newSection: CustomSection = { id: generateId(), title: '', content: '' };
    updateContent({ customSections: [...customSections, newSection] });
  };

  const updateSection = (idx: number, field: string, value: string) => {
    const updated = [...customSections];
    (updated[idx] as any)[field] = value;
    updateContent({ customSections: updated });
  };

  const removeSection = (idx: number) => {
    updateContent({ customSections: customSections.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Custom Sections" subtitle="Add any additional sections" />
      {customSections.map((section, idx) => (
        <div key={section.id} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <input
              value={section.title}
              onChange={(e) => updateSection(idx, 'title', e.target.value)}
              className="font-medium text-gray-900 bg-transparent border-none outline-none"
              placeholder="Section title"
            />
            <button onClick={() => removeSection(idx)} className="text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={section.content}
              onChange={(e) => updateSection(idx, 'content', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Enter content..."
            />
          </div>
        </div>
      ))}
      <Button variant="outline" onClick={addSection} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Custom Section
      </Button>
    </div>
  );
}

function DesignSection({ design, updateDesign, templateId }: { design: any; updateDesign: (d: any) => void; templateId?: string }) {
  const isPremium = isPremiumTemplate(templateId || '');
  const [customColor, setCustomColor] = useState(design.accentColor || '#1e40af');

  const fonts = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
    'Raleway', 'Merriweather', 'Georgia', 'Arial', 'Helvetica',
    'Times New Roman', 'Garamond', 'Bookman', 'Calibri', 'Cambria',
    'Palatino', 'Trebuchet MS', 'Verdana', 'Courier New',
  ];
  const colors = ['#1e40af', '#166534', '#991b1b', '#854d0e', '#581c87', '#0f766e', '#9a3412', '#1e293b', '#0c4a6e', '#1e3a5f'];

  const sectionOptions = [
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'languages', label: 'Languages' },
  ];

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...design.sectionOrder];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newOrder.length) return;
    [newOrder[index], newOrder[swapIndex]] = [newOrder[swapIndex], newOrder[index]];
    updateDesign({ sectionOrder: newOrder });
  };

  return (
    <div className="space-y-6">
      <SectionHeader title="Design Settings" subtitle="Customize the look and feel of your CV" />

      {/* Typography */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Typography</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
          <select
            value={design.font}
            onChange={(e) => updateDesign({ font: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            {fonts.map((f) => (
              <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Body Font Size: {design.fontSize}px</label>
          <input
            type="range"
            min={8}
            max={16}
            step={0.5}
            value={design.fontSize}
            onChange={(e) => updateDesign({ fontSize: parseFloat(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name Font Size: {design.nameSize || 28}px</label>
          <input
            type="range"
            min={18}
            max={40}
            step={1}
            value={design.nameSize || 28}
            onChange={(e) => updateDesign({ nameSize: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle Font Size: {design.subtitleSize || 16}px</label>
          <input
            type="range"
            min={10}
            max={24}
            step={1}
            value={design.subtitleSize || 16}
            onChange={(e) => updateDesign({ subtitleSize: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Heading Size: {design.headingSize}px</label>
          <input
            type="range"
            min={10}
            max={20}
            step={1}
            value={design.headingSize}
            onChange={(e) => updateDesign({ headingSize: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Line Height: {design.lineHeight}</label>
          <input
            type="range"
            min={1.2}
            max={2.0}
            step={0.1}
            value={design.lineHeight}
            onChange={(e) => updateDesign({ lineHeight: parseFloat(e.target.value) })}
            className="w-full"
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={design.boldHeadings !== false}
              onChange={(e) => updateDesign({ boldHeadings: e.target.checked })}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Bold Headings</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={design.uppercaseHeadings !== false}
              onChange={(e) => updateDesign({ uppercaseHeadings: e.target.checked })}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Uppercase Headings</span>
          </label>
        </div>
      </div>

      {/* Layout */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Layout</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Margins: {design.margins}mm</label>
          <input
            type="range"
            min={10}
            max={30}
            step={2}
            value={design.margins}
            onChange={(e) => updateDesign({ margins: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Spacing: {design.sectionSpacing}px</label>
          <input
            type="range"
            min={8}
            max={30}
            step={2}
            value={design.sectionSpacing}
            onChange={(e) => updateDesign({ sectionSpacing: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>

      {/* Colors */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Colors</h3>
          {!isPremium && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Premium to customize</span>
          )}
          {isPremium && (
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">★ Premium</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => updateDesign({ accentColor: color })}
                className={cn(
                  'w-8 h-8 rounded-full border-2 transition-all',
                  design.accentColor === color ? 'border-gray-900 scale-110' : 'border-transparent'
                )}
                style={{ backgroundColor: color }}
              />
            ))}
            {isPremium && (
              <div className="flex items-center gap-2 ml-2">
                <div className="relative">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      updateDesign({ accentColor: e.target.value });
                    }}
                    className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 cursor-pointer appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-full [&::-webkit-color-swatch]:border-none"
                  />
                </div>
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCustomColor(val);
                    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
                      updateDesign({ accentColor: val });
                    }
                  }}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="#000000"
                />
              </div>
            )}
          </div>
        </div>

        {!isPremium && (
          <p className="text-xs text-gray-400 mt-1">Upgrade to a premium template to use any color.</p>
        )}
      </div>

      {/* Section Order */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
        <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Section Order</h3>
        <p className="text-xs text-gray-500">Drag or use arrows to reorder sections on your CV</p>

        <div className="space-y-2">
          {(design.sectionOrder || sectionOptions.map(s => s.id)).map((sectionId: string, index: number) => {
            const section = sectionOptions.find(s => s.id === sectionId);
            return (
              <div key={sectionId} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-gray-400 text-sm w-5 text-center">{index + 1}</span>
                <span className="flex-1 text-sm font-medium text-gray-700">{section?.label || sectionId}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => moveSection(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveSection(index, 'down')}
                    disabled={index === (design.sectionOrder || []).length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SHARED COMPONENTS
// ==========================================

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:text-gray-400"
      />
    </div>
  );
}

// ==========================================
// PASTE CV MODAL
// ==========================================
function PasteCVModal({ onClose, onParse }: { onClose: () => void; onParse: (data: any) => void }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleParse = async () => {
    setLoading(true);
    try {
      const { parseCVText } = await import('@/lib/cv-parser');
      const parsed = parseCVText(text);
      onParse(parsed);
    } catch (e) {
      alert('Failed to parse CV content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Paste CV Content</h2>
            <p className="text-sm text-gray-500 mt-1">Paste your existing CV and we'll structure it for you</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none font-mono"
          placeholder={`Paste your CV content here...\n\nExample format:\n\nJohn Doe\nSoftware Engineer\n\nSummary\nExperienced developer with 5 years of...\n\nExperience\nSenior Developer | Google | 2022-Present\n- Led team of 5 engineers\n- Improved performance by 40%\n\nEducation\nBS Computer Science | MIT | 2018-2022\n\nSkills\nReact, TypeScript, Node.js, Python`}
        />
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleParse} disabled={!text.trim() || loading} className="bg-[#0f5e9e] hover:bg-[#0d4f85]">
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Parse & Import
          </Button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// UPLOAD CV MODAL
// ==========================================
function UploadCVModal({ onClose, onParse }: { onClose: () => void; onParse: (data: any) => void }) {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'parsing' | 'preview' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setError('');
    setFileName(file.name);
    setStatus('uploading');
    setLoading(true);

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File is too large. Maximum size is 10MB.');
      setStatus('error');
      setLoading(false);
      return;
    }

    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'docx', 'txt', 'text'].includes(ext || '')) {
      setError('Unsupported format. Please upload a PDF, DOCX, or TXT file.');
      setStatus('error');
      setLoading(false);
      return;
    }

    try {
      // All file types parsed client-side
      const { parseCVFile } = await import('@/lib/cv-file-parser');
      const content = await parseCVFile(file);

      setText(content);
      setStatus('parsing');

      // Brief delay to show parsing animation
      await new Promise(r => setTimeout(r, 400));
      setStatus('preview');
    } catch (err: any) {
      setError(err.message || 'Failed to read file. Please try again or use the Paste option.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleParse = async () => {
    setLoading(true);
    try {
      setStatus('parsing');
      const { parseCVText } = await import('@/lib/cv-parser');
      const parsed = parseCVText(text);
      onParse(parsed);
    } catch (e) {
      alert('Failed to parse CV content.');
      setStatus('preview');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText('');
    setFileName('');
    setError('');
    setStatus('idle');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Upload Existing CV</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Upload your CV to auto-fill your information</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1"><X className="h-5 w-5" /></button>
        </div>

        {/* Supported formats */}
        <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
          <span>Supported:</span>
          {['PDF', 'DOCX', 'TXT'].map(fmt => (
            <span key={fmt} className="px-2 py-0.5 bg-gray-100 rounded-full font-medium text-gray-600">{fmt}</span>
          ))}
          <span className="text-gray-400">• Max 10MB</span>
        </div>

        {/* Drop zone / Upload area */}
        {(status === 'idle' || status === 'error') && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'border-2 border-dashed rounded-xl p-6 sm:p-10 text-center cursor-pointer transition-all duration-200',
              dragging
                ? 'border-[#0f5e9e] bg-[#0f5e9e]/5 scale-[1.02]'
                : error
                  ? 'border-red-300 bg-red-50 hover:border-red-400'
                  : 'border-gray-300 hover:border-[#0f5e9e] hover:bg-gray-50'
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,.text"
              onChange={handleInputChange}
              className="hidden"
            />
            <div
              className={dragging ? 'scale-105 -translate-y-1 transition-transform duration-200' : 'transition-transform duration-200'}
            >
              <div className={cn(
                'w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4',
                error ? 'bg-red-100' : dragging ? 'bg-[#0f5e9e]/10' : 'bg-gray-100'
              )}>
                <Upload className={cn('h-7 w-7', error ? 'text-red-500' : dragging ? 'text-[#0f5e9e]' : 'text-gray-400')} />
              </div>
              {error ? (
                <>
                  <p className="text-sm font-medium text-red-600 mb-1">{error}</p>
                  <p className="text-xs text-gray-500">Click to try a different file</p>
                </>
              ) : dragging ? (
                <p className="text-sm font-medium text-[#0f5e9e]">Drop your file here</p>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-700 mb-1">Drag & drop your CV here</p>
                  <p className="text-xs text-gray-500">or click to browse files</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Uploading state */}
        {status === 'uploading' && (
          <div className="border-2 border-[#0f5e9e]/30 bg-[#0f5e9e]/5 rounded-xl p-8 text-center">
            <div className="animate-spin">
              <Loader2 className="h-10 w-10 text-[#0f5e9e] mx-auto" />
            </div>
            <p className="text-sm font-medium text-gray-700 mt-4">Uploading {fileName}...</p>
            <p className="text-xs text-gray-500 mt-1">Reading file content</p>
          </div>
        )}

        {/* Parsing state */}
        {status === 'parsing' && (
          <div className="border-2 border-purple-300 bg-purple-50 rounded-xl p-8 text-center">
            <div className="animate-pulse">
              <Sparkles className="h-10 w-10 text-purple-500 mx-auto" />
            </div>
            <p className="text-sm font-medium text-gray-700 mt-4">Analyzing your CV...</p>
            <p className="text-xs text-gray-500 mt-1">Extracting sections and structuring data</p>
          </div>
        )}

        {/* Preview */}
        {status === 'preview' && text && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">
                Extracted from <span className="text-[#0f5e9e]">{fileName}</span>
              </p>
              <button onClick={handleReset} className="text-xs text-gray-500 hover:text-gray-700 underline">Upload different file</button>
            </div>
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 max-h-40 overflow-auto text-xs text-gray-600 font-mono whitespace-pre-wrap leading-relaxed">
              {text.substring(0, 1000)}{text.length > 1000 ? '\n...\n[truncated]' : ''}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {text.split('\n').filter(l => l.trim()).length} lines • {' '}
              {text.length.toLocaleString()} characters • {' '}
              Ready to import
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
          <Button variant="outline" onClick={onClose} size="sm">Cancel</Button>
          {status === 'preview' && text && (
            <Button onClick={handleParse} disabled={loading} className="bg-[#0f5e9e] hover:bg-[#0d4f85]" size="sm">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
              Import & Continue
            </Button>
          )}
          {(status === 'idle' || status === 'error') && (
            <Button onClick={() => fileInputRef.current?.click()} variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Browse Files
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// AI WIZARD MODAL
// ==========================================
function AiWizardModal({ onClose, onComplete, content, onAiAction }: { onClose: () => void; onComplete: (data: any) => void; content: ResumeContent; onAiAction: (type: string, text?: string) => Promise<any> }) {
  const [step, setStep] = useState(0);
  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const steps = [
    { title: 'What role are you targeting?', description: 'e.g. Software Engineer, Marketing Manager' },
    { title: 'Describe your experience', description: 'What have you done? What are your key achievements?' },
    { title: 'What are your top skills?', description: 'e.g. React, Python, Project Management' },
  ];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const summary = await onAiAction('generate-summary', JSON.stringify({ jobTitle, experience, skills }));
      const skillResult = await onAiAction('suggest-skills', experience);
      onComplete({
        ...content,
        personalInfo: { ...content.personalInfo, professionalTitle: jobTitle },
        summary: summary || content.summary,
        skills: skillResult && Array.isArray(skillResult)
          ? [{ id: generateId(), category: 'Skills', skills: skillResult }]
          : content.skills,
      });
    } catch (e) {
      alert('AI generation failed. You can edit manually.');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" /> Build with AI
            </h2>
            <p className="text-sm text-gray-500 mt-1">Step {step + 1} of {steps.length}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100 rounded-full mb-6">
          <div className="h-full bg-[#0f5e9e] rounded-full transition-all duration-300" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-1">{steps[step].title}</h3>
          <p className="text-sm text-gray-500">{steps[step].description}</p>
        </div>
        {step === 0 && (
          <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="e.g. Software Engineer" autoFocus />
        )}
        {step === 1 && (
          <textarea value={experience} onChange={(e) => setExperience(e.target.value)} rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" placeholder="I worked at Google for 3 years building user-facing products..." autoFocus />
        )}
        {step === 2 && (
          <textarea value={skills} onChange={(e) => setSkills(e.target.value)} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" placeholder="React, TypeScript, Node.js, Python, SQL" autoFocus />
        )}
        <div className="flex justify-between mt-6">
          {step > 0 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
          ) : <div />}
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)} className="bg-[#0f5e9e] hover:bg-[#0d4f85]" disabled={step === 0 && !jobTitle.trim()}>Next</Button>
          ) : (
            <Button onClick={handleGenerate} disabled={loading} className="bg-[#0f5e9e] hover:bg-[#0d4f85]">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
              Generate CV
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

