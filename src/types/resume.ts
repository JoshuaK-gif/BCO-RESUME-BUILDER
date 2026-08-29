export type ResumeContent = {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: SkillGroup[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  awards: Award[];
  volunteerExperience: VolunteerExperience[];
  publications: Publication[];
  references: string;
  interests: string[];
  customSections: CustomSection[];
};

export type PersonalInfo = {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  portfolio: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  gpa?: string;
};

export type SkillGroup = {
  id: string;
  category: string;
  skills: string[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  link: string;
  technologies: string[];
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
};

export type Language = {
  id: string;
  language: string;
  proficiency: string;
};

export type Award = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string;
};

export type VolunteerExperience = {
  id: string;
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Publication = {
  id: string;
  title: string;
  publisher: string;
  date: string;
  url?: string;
  description?: string;
};

export type CustomSection = {
  id: string;
  title: string;
  content: string;
};

export type DesignSettings = {
  font: string;
  fontSize: number;
  headingSize: number;
  accentColor: string;
  lineHeight: number;
  margins: number;
  sectionSpacing: number;
  layout: 'classic' | 'modern' | 'sidebar';
  sectionOrder: string[];
  nameSize: number;
  subtitleSize: number;
  boldHeadings: boolean;
  uppercaseHeadings: boolean;
};

export type Resume = {
  id: string;
  user_id: string;
  title: string;
  content: ResumeContent;
  template_id: string;
  design_settings: DesignSettings;
  ats_score: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};

export const DEFAULT_RESUME_CONTENT: ResumeContent = {
  personalInfo: {
    fullName: '',
    professionalTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    portfolio: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  awards: [],
  volunteerExperience: [],
  publications: [],
  references: '',
  interests: [],
  customSections: [],
};

export const DEFAULT_DESIGN_SETTINGS: DesignSettings = {
  font: 'Inter',
  fontSize: 11,
  headingSize: 14,
  accentColor: '#1e40af',
  lineHeight: 1.5,
  margins: 20,
  sectionSpacing: 12,
  layout: 'classic',
  sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'],
  nameSize: 28,
  subtitleSize: 16,
  boldHeadings: true,
  uppercaseHeadings: true,
};
