export type SectionType =
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'awards'
  | 'volunteerExperience'
  | 'publications'
  | 'references'
  | 'interests'
  | 'custom';

export type CVSection = {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
  customSectionId?: string;
};

export const DEFAULT_SECTIONS: CVSection[] = [
  { id: 'summary', type: 'summary', title: 'Professional Summary', visible: true },
  { id: 'experience', type: 'experience', title: 'Work Experience', visible: true },
  { id: 'education', type: 'education', title: 'Education', visible: true },
  { id: 'skills', type: 'skills', title: 'Skills', visible: true },
  { id: 'projects', type: 'projects', title: 'Projects', visible: false },
  { id: 'certifications', type: 'certifications', title: 'Certifications', visible: false },
  { id: 'languages', type: 'languages', title: 'Languages', visible: false },
  { id: 'awards', type: 'awards', title: 'Awards', visible: false },
  { id: 'volunteerExperience', type: 'volunteerExperience', title: 'Volunteer Experience', visible: false },
  { id: 'publications', type: 'publications', title: 'Publications', visible: false },
  { id: 'references', type: 'references', title: 'References', visible: false },
  { id: 'interests', type: 'interests', title: 'Interests', visible: false },
];

export type TemplateInfo = {
  id: string;
  name: string;
  category: string;
  thumbnailColor: string;
  description: string;
};

export const TEMPLATE_CATEGORIES = [
  'Modern',
  'Minimal',
  'Executive',
  'Corporate',
  'Graduate',
  'Technology',
  'Finance',
  'Healthcare',
  'Academic',
  'Creative',
] as const;

export const FONTS = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Source Sans Pro',
  'Nunito',
  'Poppins',
  'Raleway',
  'Work Sans',
  'Merriweather',
  'Playfair Display',
  'Georgia',
  'Times New Roman',
  'Arial',
] as const;

export const ACCENT_COLORS = [
  '#1e40af', // Blue
  '#166534', // Green
  '#991b1b', // Red
  '#854d0e', // Yellow
  '#581c87', // Purple
  '#0f766e', // Teal
  '#9a3412', // Orange
  '#1e293b', // Dark Gray
  '#0c4a6e', // Sky
  '#701a75', // Fuchsia
  '#7c2d12', // Brown
  '#1e3a5f', // Navy
];
