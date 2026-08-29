// Premium template IDs — matches the templates defined in src/app/templates/page.tsx
const PREMIUM_TEMPLATE_IDS = new Set([
  // Modern
  'modern-6', 'modern-8', 'modern-10', 'modern-13', 'modern-15',
  // Minimal
  'minimal-5', 'minimal-10',
  // Executive
  'executive-2', 'executive-5', 'executive-8', 'executive-9', 'executive-10',
  // Corporate
  'corporate-2',
  // Graduate
  'graduate-2',
  // Technology
  'technology-2', 'technology-3',
  // Finance
  'finance-2',
  // Healthcare
  'healthcare-2',
  // Academic
  'academic-2',
  // Creative
  'creative-1', 'creative-2', 'creative-3', 'creative-4',
  // Professional
  'professional-5', 'professional-11',
  // Other
  'elegant-2', 'classic-2', 'bold-2', 'clean-2',
  'timeline-1', 'timeline-2', 'two-column-2', 'sidebar-2',
  'monochrome-2', 'accent-2', 'gradient-1', 'gradient-2',
  'ats-3', 'europass-2', 'combination-2', 'infographic-2',  'industry-2',
  // Premium-only exclusive templates
  'premium-infographic',
  'premium-magazine',
  'premium-executive-portrait',
  'premium-multicolor',
  'premium-modern-duo',
]);

const FREE_PRICE_USD = 1.0;
const PREMIUM_PRICE_USD = 3.99;

export function isPremiumTemplate(templateId: string): boolean {
  return PREMIUM_TEMPLATE_IDS.has(templateId);
}

export function getPriceForTemplate(templateId: string): { amount: number; cents: number; currency: string; label: string } {
  const premium = isPremiumTemplate(templateId);
  return {
    amount: premium ? PREMIUM_PRICE_USD : FREE_PRICE_USD,
    cents: premium ? 399 : 100,
    currency: 'usd',
    label: premium ? 'Premium CV Download' : 'Professional CV Download',
  };
}
