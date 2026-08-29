import puppeteer from 'puppeteer-core';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ResumeContent, DesignSettings } from '@/types/resume';

// Import all template components
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { Modern2Template } from '@/components/templates/Modern2Template';
import { Modern3Template } from '@/components/templates/Modern3Template';
import { Modern4Template } from '@/components/templates/Modern4Template';
import { Modern5Template } from '@/components/templates/Modern5Template';
import { Modern6Template } from '@/components/templates/Modern6Template';
import { Modern7Template } from '@/components/templates/Modern7Template';
import { Modern8Template } from '@/components/templates/Modern8Template';
import { Modern9Template } from '@/components/templates/Modern9Template';
import { Modern10Template } from '@/components/templates/Modern10Template';
import { Modern11Template } from '@/components/templates/Modern11Template';
import { Modern12Template } from '@/components/templates/Modern12Template';
import { Modern13Template } from '@/components/templates/Modern13Template';
import { Modern14Template } from '@/components/templates/Modern14Template';
import { Modern15Template } from '@/components/templates/Modern15Template';
import { MinimalTemplate } from '@/components/templates/MinimalTemplate';
import { Minimalist2Template } from '@/components/templates/Minimalist2Template';
import { Minimalist3Template } from '@/components/templates/Minimalist3Template';
import { Minimalist4Template } from '@/components/templates/Minimalist4Template';
import { Minimalist5Template } from '@/components/templates/Minimalist5Template';
import { Minimalist6Template } from '@/components/templates/Minimalist6Template';
import { Minimalist7Template } from '@/components/templates/Minimalist7Template';
import { Minimalist8Template } from '@/components/templates/Minimalist8Template';
import { Minimalist9Template } from '@/components/templates/Minimalist9Template';
import { Minimalist10Template } from '@/components/templates/Minimalist10Template';
import { Minimalist11Template } from '@/components/templates/Minimalist11Template';
import { Minimalist12Template } from '@/components/templates/Minimalist12Template';
import { ExecutiveTemplate } from '@/components/templates/ExecutiveTemplate';
import { Executive2Template } from '@/components/templates/Executive2Template';
import { Executive3Template } from '@/components/templates/Executive3Template';
import { Executive4Template } from '@/components/templates/Executive4Template';
import { Executive5Template } from '@/components/templates/Executive5Template';
import { Executive6Template } from '@/components/templates/Executive6Template';
import { Executive7Template } from '@/components/templates/Executive7Template';
import { Executive8Template } from '@/components/templates/Executive8Template';
import { Executive9Template } from '@/components/templates/Executive9Template';
import { Executive10Template } from '@/components/templates/Executive10Template';
import { CorporateTemplate } from '@/components/templates/CorporateTemplate';
import { Corporate2Template } from '@/components/templates/Corporate2Template';
import { Corporate3Template } from '@/components/templates/Corporate3Template';
import { GraduateTemplate } from '@/components/templates/GraduateTemplate';
import { Graduate2Template } from '@/components/templates/Graduate2Template';
import { Graduate3Template } from '@/components/templates/Graduate3Template';
import { TechnologyTemplate } from '@/components/templates/TechnologyTemplate';
import { Technology2Template } from '@/components/templates/Technology2Template';
import { Technology3Template } from '@/components/templates/Technology3Template';
import { FinanceTemplate } from '@/components/templates/FinanceTemplate';
import { Finance2Template } from '@/components/templates/Finance2Template';
import { Finance3Template } from '@/components/templates/Finance3Template';
import { HealthcareTemplate } from '@/components/templates/HealthcareTemplate';
import { Healthcare2Template } from '@/components/templates/Healthcare2Template';
import { Healthcare3Template } from '@/components/templates/Healthcare3Template';
import { AcademicTemplate } from '@/components/templates/AcademicTemplate';
import { Academic2Template } from '@/components/templates/Academic2Template';
import { CreativeTemplate } from '@/components/templates/CreativeTemplate';
import { Creative2Template } from '@/components/templates/Creative2Template';
import { Creative3Template } from '@/components/templates/Creative3Template';
import { Creative4Template } from '@/components/templates/Creative4Template';
import { ProfessionalTemplate } from '@/components/templates/ProfessionalTemplate';
import { Professional2Template } from '@/components/templates/Professional2Template';
import { Professional3Template } from '@/components/templates/Professional3Template';
import { Professional4Template } from '@/components/templates/Professional4Template';
import { Professional5Template } from '@/components/templates/Professional5Template';
import { Professional6Template } from '@/components/templates/Professional6Template';
import { Professional7Template } from '@/components/templates/Professional7Template';
import { Professional8Template } from '@/components/templates/Professional8Template';
import { Professional9Template } from '@/components/templates/Professional9Template';
import { Professional10Template } from '@/components/templates/Professional10Template';
import { Professional11Template } from '@/components/templates/Professional11Template';
import { Professional12Template } from '@/components/templates/Professional12Template';
import { ElegantTemplate } from '@/components/templates/ElegantTemplate';
import { Elegant2Template } from '@/components/templates/Elegant2Template';
import { ClassicTemplate } from '@/components/templates/ClassicTemplate';
import { Classic2Template } from '@/components/templates/Classic2Template';
import { BoldTemplate } from '@/components/templates/BoldTemplate';
import { Bold2Template } from '@/components/templates/Bold2Template';
import { CleanTemplate } from '@/components/templates/CleanTemplate';
import { Clean2Template } from '@/components/templates/Clean2Template';
import { TimelineTemplate } from '@/components/templates/TimelineTemplate';
import { Timeline2Template } from '@/components/templates/Timeline2Template';
import { TwoColumnTemplate } from '@/components/templates/TwoColumnTemplate';
import { TwoColumn2Template } from '@/components/templates/TwoColumn2Template';
import { SidebarTemplate } from '@/components/templates/SidebarTemplate';
import { Sidebar2Template } from '@/components/templates/Sidebar2Template';
import { MonochromeTemplate } from '@/components/templates/MonochromeTemplate';
import { Monochrome2Template } from '@/components/templates/Monochrome2Template';
import { AccentTemplate } from '@/components/templates/AccentTemplate';
import { Accent2Template } from '@/components/templates/Accent2Template';
import { GradientTemplate } from '@/components/templates/GradientTemplate';
import { ATS2Template } from '@/components/templates/ATS2Template';
import { ATS3Template } from '@/components/templates/ATS3Template';
import { ATS4Template } from '@/components/templates/ATS4Template';
import { Europass2Template } from '@/components/templates/Europass2Template';
import { Combination2Template } from '@/components/templates/Combination2Template';
import { Infographic2Template } from '@/components/templates/Infographic2Template';
import { Industry2Template } from '@/components/templates/Industry2Template';
import { PremiumInfographicTemplate } from '@/components/templates/PremiumInfographicTemplate';
import { PremiumMagazineTemplate } from '@/components/templates/PremiumMagazineTemplate';
import { PremiumExecutivePortraitTemplate } from '@/components/templates/PremiumExecutivePortraitTemplate';
import { PremiumMultiColorTemplate } from '@/components/templates/PremiumMultiColorTemplate';
import { PremiumModernDuoTemplate } from '@/components/templates/PremiumModernDuoTemplate';

const templateMap: Record<string, React.ComponentType<{ content: ResumeContent; design: DesignSettings }>> = {
  'modern-1': ModernTemplate, 'modern-2': Modern2Template, 'modern-3': Modern3Template,
  'modern-4': Modern4Template, 'modern-5': Modern5Template, 'modern-6': Modern6Template,
  'modern-7': Modern7Template, 'modern-8': Modern8Template, 'modern-9': Modern9Template,
  'modern-10': Modern10Template, 'modern-11': Modern11Template, 'modern-12': Modern12Template,
  'modern-13': Modern13Template, 'modern-14': Modern14Template, 'modern-15': Modern15Template,
  'minimal-1': MinimalTemplate, 'minimal-2': Minimalist2Template, 'minimal-3': Minimalist3Template,
  'minimal-4': Minimalist4Template, 'minimal-5': Minimalist5Template, 'minimal-6': Minimalist6Template,
  'minimal-7': Minimalist7Template, 'minimal-8': Minimalist8Template, 'minimal-9': Minimalist9Template,
  'minimal-10': Minimalist10Template, 'minimal-11': Minimalist11Template, 'minimal-12': Minimalist12Template,
  'executive-1': ExecutiveTemplate, 'executive-2': Executive2Template, 'executive-3': Executive3Template,
  'executive-4': Executive4Template, 'executive-5': Executive5Template, 'executive-6': Executive6Template,
  'executive-7': Executive7Template, 'executive-8': Executive8Template, 'executive-9': Executive9Template,
  'executive-10': Executive10Template,
  'corporate-1': CorporateTemplate, 'corporate-2': Corporate2Template, 'corporate-3': Corporate3Template,
  'graduate-1': GraduateTemplate, 'graduate-2': Graduate2Template, 'graduate-3': Graduate3Template,
  'technology-1': TechnologyTemplate, 'technology-2': Technology2Template, 'technology-3': Technology3Template,
  'finance-1': FinanceTemplate, 'finance-2': Finance2Template, 'finance-3': Finance3Template,
  'healthcare-1': HealthcareTemplate, 'healthcare-2': Healthcare2Template, 'healthcare-3': Healthcare3Template,
  'academic-1': AcademicTemplate, 'academic-2': Academic2Template,
  'creative-1': CreativeTemplate, 'creative-2': Creative2Template, 'creative-3': Creative3Template,
  'creative-4': Creative4Template,
  'professional-1': ProfessionalTemplate, 'professional-2': Professional2Template, 'professional-3': Professional3Template,
  'professional-4': Professional4Template, 'professional-5': Professional5Template, 'professional-6': Professional6Template,
  'professional-7': Professional7Template, 'professional-8': Professional8Template, 'professional-9': Professional9Template,
  'professional-10': Professional10Template, 'professional-11': Professional11Template, 'professional-12': Professional12Template,
  'elegant-1': ElegantTemplate, 'elegant-2': Elegant2Template,
  'classic-1': ClassicTemplate, 'classic-2': Classic2Template,
  'bold-1': BoldTemplate, 'bold-2': Bold2Template,
  'clean-1': CleanTemplate, 'clean-2': Clean2Template,
  'timeline-1': TimelineTemplate, 'timeline-2': Timeline2Template,
  'two-column-1': TwoColumnTemplate, 'two-column-2': TwoColumn2Template,
  'sidebar-1': SidebarTemplate, 'sidebar-2': Sidebar2Template,
  'monochrome-1': MonochromeTemplate, 'monochrome-2': Monochrome2Template,
  'accent-1': AccentTemplate, 'accent-2': Accent2Template,
  'gradient-1': GradientTemplate, 'gradient-2': GradientTemplate,
  'ats-2': ATS2Template, 'ats-3': ATS3Template, 'ats-4': ATS4Template,
  'europass-2': Europass2Template, 'combination-2': Combination2Template,
  'infographic-2': Infographic2Template, 'industry-2': Industry2Template,
  'premium-infographic': PremiumInfographicTemplate, 'premium-magazine': PremiumMagazineTemplate,
  'premium-executive-portrait': PremiumExecutivePortraitTemplate,
  'premium-multicolor': PremiumMultiColorTemplate, 'premium-modern-duo': PremiumModernDuoTemplate,
};

function renderTemplateToHTML(content: ResumeContent, design: DesignSettings, templateId: string): string {
  const TemplateComponent = templateMap[templateId] || ModernTemplate;
  const html = renderToString(
    React.createElement(TemplateComponent, { content, design })
  );
  return html;
}

export async function generatePDF(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
      preferCSSPageSize: true,
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

export function buildResumeHTML(content: ResumeContent, design: DesignSettings, templateId: string): string {
  const rendered = renderTemplateToHTML(content, design, templateId);
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;700&family=Georgia&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: ${design.font || 'Inter'}, sans-serif; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .resume-preview { width: 210mm; min-height: 297mm; }
    @page { size: A4; margin: 0; }
  </style>
</head>
<body>
  ${rendered}
</body>
</html>`;
}
