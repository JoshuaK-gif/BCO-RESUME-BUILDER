'use client';

import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';
import { ModernTemplate } from './ModernTemplate';
import { Modern2Template } from './Modern2Template';
import { Modern3Template } from './Modern3Template';
import { Modern4Template } from './Modern4Template';
import { Modern5Template } from './Modern5Template';
import { Modern6Template } from './Modern6Template';
import { Modern7Template } from './Modern7Template';
import { Modern8Template } from './Modern8Template';
import { Modern9Template } from './Modern9Template';
import { Modern10Template } from './Modern10Template';
import { Modern11Template } from './Modern11Template';
import { Modern12Template } from './Modern12Template';
import { Modern13Template } from './Modern13Template';
import { Modern14Template } from './Modern14Template';
import { Modern15Template } from './Modern15Template';
import { MinimalTemplate } from './MinimalTemplate';
import { Minimalist2Template } from './Minimalist2Template';
import { Minimalist3Template } from './Minimalist3Template';
import { Minimalist4Template } from './Minimalist4Template';
import { Minimalist5Template } from './Minimalist5Template';
import { Minimalist6Template } from './Minimalist6Template';
import { Minimalist7Template } from './Minimalist7Template';
import { Minimalist8Template } from './Minimalist8Template';
import { Minimalist9Template } from './Minimalist9Template';
import { Minimalist10Template } from './Minimalist10Template';
import { Minimalist11Template } from './Minimalist11Template';
import { Minimalist12Template } from './Minimalist12Template';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { Executive2Template } from './Executive2Template';
import { Executive3Template } from './Executive3Template';
import { Executive4Template } from './Executive4Template';
import { Executive5Template } from './Executive5Template';
import { Executive6Template } from './Executive6Template';
import { Executive7Template } from './Executive7Template';
import { Executive8Template } from './Executive8Template';
import { Executive9Template } from './Executive9Template';
import { Executive10Template } from './Executive10Template';
import { CorporateTemplate } from './CorporateTemplate';
import { Corporate2Template } from './Corporate2Template';
import { Corporate3Template } from './Corporate3Template';
import { GraduateTemplate } from './GraduateTemplate';
import { Graduate2Template } from './Graduate2Template';
import { Graduate3Template } from './Graduate3Template';
import { TechnologyTemplate } from './TechnologyTemplate';
import { Technology2Template } from './Technology2Template';
import { Technology3Template } from './Technology3Template';
import { FinanceTemplate } from './FinanceTemplate';
import { Finance2Template } from './Finance2Template';
import { Finance3Template } from './Finance3Template';
import { HealthcareTemplate } from './HealthcareTemplate';
import { Healthcare2Template } from './Healthcare2Template';
import { Healthcare3Template } from './Healthcare3Template';
import { AcademicTemplate } from './AcademicTemplate';
import { Academic2Template } from './Academic2Template';
import { CreativeTemplate } from './CreativeTemplate';
import { Creative2Template } from './Creative2Template';
import { Creative3Template } from './Creative3Template';
import { Creative4Template } from './Creative4Template';
import { ProfessionalTemplate } from './ProfessionalTemplate';
import { Professional2Template } from './Professional2Template';
import { Professional3Template } from './Professional3Template';
import { Professional4Template } from './Professional4Template';
import { Professional5Template } from './Professional5Template';
import { Professional6Template } from './Professional6Template';
import { Professional7Template } from './Professional7Template';
import { Professional8Template } from './Professional8Template';
import { Professional9Template } from './Professional9Template';
import { Professional10Template } from './Professional10Template';
import { Professional11Template } from './Professional11Template';
import { Professional12Template } from './Professional12Template';
import { ElegantTemplate } from './ElegantTemplate';
import { Elegant2Template } from './Elegant2Template';
import { ClassicTemplate } from './ClassicTemplate';
import { Classic2Template } from './Classic2Template';
import { BoldTemplate } from './BoldTemplate';
import { Bold2Template } from './Bold2Template';
import { CleanTemplate } from './CleanTemplate';
import { Clean2Template } from './Clean2Template';
import { TimelineTemplate } from './TimelineTemplate';
import { Timeline2Template } from './Timeline2Template';
import { TwoColumnTemplate } from './TwoColumnTemplate';
import { TwoColumn2Template } from './TwoColumn2Template';
import { SidebarTemplate } from './SidebarTemplate';
import { Sidebar2Template } from './Sidebar2Template';
import { MonochromeTemplate } from './MonochromeTemplate';
import { Monochrome2Template } from './Monochrome2Template';
import { AccentTemplate } from './AccentTemplate';
import { Accent2Template } from './Accent2Template';
import { GradientTemplate } from './GradientTemplate';
import { ATS2Template } from './ATS2Template';
import { ATS3Template } from './ATS3Template';
import { ATS4Template } from './ATS4Template';
import { Europass2Template } from './Europass2Template';
import { Combination2Template } from './Combination2Template';
import { Infographic2Template } from './Infographic2Template';
import { Industry2Template } from './Industry2Template';
import { PremiumInfographicTemplate } from './PremiumInfographicTemplate';
import { PremiumMagazineTemplate } from './PremiumMagazineTemplate';
import { PremiumExecutivePortraitTemplate } from './PremiumExecutivePortraitTemplate';
import { PremiumMultiColorTemplate } from './PremiumMultiColorTemplate';
import { PremiumModernDuoTemplate } from './PremiumModernDuoTemplate';

interface ResumePreviewProps {
  content: ResumeContent;
  design: DesignSettings;
  templateId: string;
}

const templateMap: Record<string, React.ComponentType<{ content: ResumeContent; design: DesignSettings }>> = {
  // Modern
  'modern-1': ModernTemplate,
  'modern-2': Modern2Template,
  'modern-3': Modern3Template,
  'modern-4': Modern4Template,
  'modern-5': Modern5Template,
  'modern-6': Modern6Template,
  'modern-7': Modern7Template,
  'modern-8': Modern8Template,
  'modern-9': Modern9Template,
  'modern-10': Modern10Template,
  'modern-11': Modern11Template,
  'modern-12': Modern12Template,
  'modern-13': Modern13Template,
  'modern-14': Modern14Template,
  'modern-15': Modern15Template,
  // Minimalist
  'minimal-1': MinimalTemplate,
  'minimal-2': Minimalist2Template,
  'minimal-3': Minimalist3Template,
  'minimal-4': Minimalist4Template,
  'minimal-5': Minimalist5Template,
  'minimal-6': Minimalist6Template,
  'minimal-7': Minimalist7Template,
  'minimal-8': Minimalist8Template,
  'minimal-9': Minimalist9Template,
  'minimal-10': Minimalist10Template,
  'minimal-11': Minimalist11Template,
  'minimal-12': Minimalist12Template,
  // Executive
  'executive-1': ExecutiveTemplate,
  'executive-2': Executive2Template,
  'executive-3': Executive3Template,
  'executive-4': Executive4Template,
  'executive-5': Executive5Template,
  'executive-6': Executive6Template,
  'executive-7': Executive7Template,
  'executive-8': Executive8Template,
  'executive-9': Executive9Template,
  'executive-10': Executive10Template,
  // Corporate
  'corporate-1': CorporateTemplate,
  'corporate-2': Corporate2Template,
  'corporate-3': Corporate3Template,
  // Graduate
  'graduate-1': GraduateTemplate,
  'graduate-2': Graduate2Template,
  'graduate-3': Graduate3Template,
  // Technology
  'technology-1': TechnologyTemplate,
  'technology-2': Technology2Template,
  'technology-3': Technology3Template,
  // Finance
  'finance-1': FinanceTemplate,
  'finance-2': Finance2Template,
  'finance-3': Finance3Template,
  // Healthcare
  'healthcare-1': HealthcareTemplate,
  'healthcare-2': Healthcare2Template,
  'healthcare-3': Healthcare3Template,
  // Academic
  'academic-1': AcademicTemplate,
  'academic-2': Academic2Template,
  // Creative
  'creative-1': CreativeTemplate,
  'creative-2': Creative2Template,
  'creative-3': Creative3Template,
  'creative-4': Creative4Template,
  // Professional
  'professional-1': ProfessionalTemplate,
  'professional-2': Professional2Template,
  'professional-3': Professional3Template,
  'professional-4': Professional4Template,
  'professional-5': Professional5Template,
  'professional-6': Professional6Template,
  'professional-7': Professional7Template,
  'professional-8': Professional8Template,
  'professional-9': Professional9Template,
  'professional-10': Professional10Template,
  'professional-11': Professional11Template,
  'professional-12': Professional12Template,
  // Other
  'elegant-1': ElegantTemplate,
  'elegant-2': Elegant2Template,
  'classic-1': ClassicTemplate,
  'classic-2': Classic2Template,
  'bold-1': BoldTemplate,
  'bold-2': Bold2Template,
  'clean-1': CleanTemplate,
  'clean-2': Clean2Template,
  'timeline-1': TimelineTemplate,
  'timeline-2': Timeline2Template,
  'two-column-1': TwoColumnTemplate,
  'two-column-2': TwoColumn2Template,
  'sidebar-1': SidebarTemplate,
  'sidebar-2': Sidebar2Template,
  'monochrome-1': MonochromeTemplate,
  'monochrome-2': Monochrome2Template,
  'accent-1': AccentTemplate,
  'accent-2': Accent2Template,
  'gradient-1': GradientTemplate,
  'gradient-2': GradientTemplate,
  'ats-2': ATS2Template,
  'ats-3': ATS3Template,
  'ats-4': ATS4Template,
  'europass-2': Europass2Template,
  'combination-2': Combination2Template,
  'infographic-2': Infographic2Template,
  'industry-2': Industry2Template,
  // Premium-only exclusive templates
  'premium-infographic': PremiumInfographicTemplate,
  'premium-magazine': PremiumMagazineTemplate,
  'premium-executive-portrait': PremiumExecutivePortraitTemplate,
  'premium-multicolor': PremiumMultiColorTemplate,
  'premium-modern-duo': PremiumModernDuoTemplate,
};

export function ResumePreview({ content, design, templateId }: ResumePreviewProps) {
  const TemplateComponent = templateMap[templateId] || ModernTemplate;

  return (
    <div className="resume-preview" style={{ fontFamily: design.font }}>
      <TemplateComponent content={content} design={design} />
    </div>
  );
}
