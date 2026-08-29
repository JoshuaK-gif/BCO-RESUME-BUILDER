import { ResumeContent, DEFAULT_RESUME_CONTENT } from '@/types/resume';

/**
 * Parse plain text CV content into structured ResumeContent.
 * Handles common CV formats with section headers, bullet points, pipes, dashes, etc.
 */
export function parseCVText(text: string): ResumeContent {
  const result: ResumeContent = JSON.parse(JSON.stringify(DEFAULT_RESUME_CONTENT));
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  if (lines.length === 0) return result;

  // ── Try to extract personal info from the top lines ──
  extractPersonalInfo(lines, result);

  let currentSection = '';
  let buffer: string[] = [];

  const flushBuffer = () => {
    if (buffer.length === 0) return;
    const content = buffer.join('\n');
    processSection(currentSection, content, result);
    buffer = [];
  };

  const sectionMap: Record<string, string> = {
    'summary': 'summary',
    'professional summary': 'summary',
    'professional profile': 'summary',
    'about': 'summary',
    'about me': 'summary',
    'profile': 'summary',
    'objective': 'summary',
    'career objective': 'summary',
    'personal statement': 'summary',
    'career summary': 'summary',

    'experience': 'experience',
    'work experience': 'experience',
    'employment': 'experience',
    'employment history': 'experience',
    'work history': 'experience',
    'professional experience': 'experience',
    'career history': 'experience',
    'relevant experience': 'experience',

    'education': 'education',
    'educational background': 'education',
    'educational qualifications': 'education',
    'academic background': 'education',
    'academic qualifications': 'education',
    'qualifications': 'education',

    'skills': 'skills',
    'technical skills': 'skills',
    'core competencies': 'skills',
    'competencies': 'skills',
    'technologies': 'skills',
    'key skills': 'skills',
    'areas of expertise': 'skills',
    'tech stack': 'skills',

    'projects': 'projects',
    'portfolio': 'projects',
    'personal projects': 'projects',
    'key projects': 'projects',
    'notable projects': 'projects',

    'certifications': 'certifications',
    'certificates': 'certifications',
    'licenses': 'certifications',
    'professional certifications': 'certifications',

    'languages': 'languages',
    'language': 'languages',
    'foreign languages': 'languages',

    'awards': 'awards',
    'honors': 'awards',
    'achievements': 'awards',
    'awards and honors': 'awards',
    'recognitions': 'awards',

    'volunteer': 'volunteer',
    'volunteer experience': 'volunteer',
    'community service': 'volunteer',
    'volunteering': 'volunteer',

    'publications': 'publications',
    'research': 'publications',
    'papers': 'publications',
    'published works': 'publications',

    'references': 'references',
    'interests': 'interests',
    'hobbies': 'interests',
    'extracurricular': 'interests',
  };

  for (const line of lines) {
    const lower = line.toLowerCase().replace(/[:.]+$/, '').replace(/[^a-z\s]/g, '').trim();

    // Check if this line is a section header
    const matchedSection = sectionMap[lower];

    if (matchedSection) {
      flushBuffer();
      currentSection = matchedSection;
      continue;
    }

    // Also check if it's an ALL CAPS or Title Case line that looks like a header
    const isLikelyHeader =
      (line === line.toUpperCase() && line.length > 2 && line.length < 40 && /^[A-Z\s]+$/.test(line)) ||
      (/^[A-Z][A-Za-z\s&]+$/.test(line) && line.length < 35 && !/\d/.test(line) && lower.split(' ').length <= 4);

    if (isLikelyHeader && sectionMap[lower]) {
      flushBuffer();
      currentSection = sectionMap[lower];
      continue;
    }

    buffer.push(line);
  }
  flushBuffer();

  return result;
}

function extractPersonalInfo(lines: string[], result: ResumeContent) {
  const info = result.personalInfo;
  const topLines = lines.slice(0, 8);

  // First non-section line is usually the name
  if (!info.fullName && topLines.length > 0) {
    info.fullName = topLines[0].replace(/[^a-zA-ZÀ-ÿ\s'-.]/g, '').trim();
  }

  // Look for email
  for (const line of topLines) {
    const emailMatch = line.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
    if (emailMatch) {
      info.email = emailMatch[0];
      break;
    }
  }

  // Look for phone
  for (const line of topLines) {
    const phoneMatch = line.match(/[\+]?[\d\s\-().]{7,20}/);
    if (phoneMatch && phoneMatch[0].replace(/\D/g, '').length >= 7) {
      info.phone = phoneMatch[0].trim();
      break;
    }
  }

  // Look for LinkedIn
  for (const line of topLines) {
    const linkedinMatch = line.match(/linkedin\.com\/in\/[\w-]+/i);
    if (linkedinMatch) {
      info.linkedin = linkedinMatch[0];
      break;
    }
  }

  // Look for location (City, State pattern or similar)
  for (const line of topLines) {
    if (line === info.fullName || line === info.email || line === info.phone) continue;
    const locMatch = line.match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+)*),\s*([A-Z]{2}|[A-Z][a-z]+)/);
    if (locMatch) {
      info.location = locMatch[0];
      break;
    }
  }

  // Look for professional title (usually line 2 if it's short and descriptive)
  if (topLines.length > 1) {
    const titleLine = topLines[1];
    if (
      titleLine !== info.email &&
      titleLine !== info.phone &&
      titleLine.length < 60 &&
      !titleLine.includes('@') &&
      !/^\d/.test(titleLine) &&
      !/^(Summary|Experience|Education|Skills|Contact|Phone|Email)/i.test(titleLine)
    ) {
      info.professionalTitle = titleLine.replace(/[|•·]/g, '').trim();
    }
  }
}

function processSection(section: string, content: string, result: ResumeContent) {
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

  switch (section) {
    case 'summary':
      result.summary = lines.join(' ');
      break;

    case 'experience':
      parseExperience(lines, result);
      break;

    case 'education':
      parseEducation(lines, result);
      break;

    case 'skills':
      parseSkills(lines, result);
      break;

    case 'projects':
      parseProjects(lines, result);
      break;

    case 'certifications':
      parseCertifications(lines, result);
      break;

    case 'languages':
      parseLanguages(lines, result);
      break;

    case 'awards':
      parseAwards(lines, result);
      break;

    case 'publications':
      parsePublications(lines, result);
      break;
  }
}

function parseExperience(lines: string[], result: ResumeContent) {
  let current: any = null;
  const achievements: string[] = [];

  for (const line of lines) {
    const isBullet = /^[•\-*▸→●◦▪]\s*/.test(line);
    const cleanLine = line.replace(/^[•\-*▸→●◦▪]\s*/, '');

    // Check if this line looks like a job title header (has date or pipe separator)
    const hasDate = /\b(20\d{2}|19\d{2})\b/.test(line) || /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\b/i.test(line);
    const hasPipe = line.includes('|');
    const hasDash = /\s[-–—]\s/.test(line);

    if ((hasDate || hasPipe || hasDash) && !isBullet && line.length < 120) {
      if (current) {
        current.achievements = [...achievements];
        result.experience.push(current);
        achievements.length = 0;
      }

      // Try to extract position and company
      let parts: string[];
      if (hasPipe) {
        parts = line.split('|').map(s => s.trim());
      } else if (hasDash) {
        parts = line.split(/\s[-–—]\s/).map(s => s.trim());
      } else {
        parts = line.split(/[-–|]/).map(s => s.trim());
      }

      current = {
        id: generateId(),
        position: parts[0] || '',
        company: parts[1] || '',
        location: parts[2] || '',
        startDate: extractStartDate(line),
        endDate: extractEndDate(line),
        current: /present|current/i.test(line),
        description: '',
        achievements: [],
      };
    } else if (isBullet || cleanLine !== line) {
      achievements.push(cleanLine);
    } else if (current && !current.description) {
      current.description = line;
    } else if (current) {
      achievements.push(line);
    } else if (!current && line.length > 10) {
      // Sometimes there's no clear header, just start a generic entry
      current = {
        id: generateId(),
        position: '',
        company: line.replace(/[-–|,]/g, '').trim().substring(0, 80),
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: [],
      };
    }
  }

  if (current) {
    current.achievements = achievements;
    result.experience.push(current);
  }
}

function parseEducation(lines: string[], result: ResumeContent) {
  let current: any = null;

  for (const line of lines) {
    const isBullet = /^[•\-*▸→●◦▪]\s*/.test(line);
    const hasDate = /\b(20\d{2}|19\d{2})\b/.test(line);
    const hasPipe = line.includes('|');

    if ((hasDate || hasPipe) && !isBullet && line.length < 120) {
      if (current) result.education.push(current);

      let parts: string[];
      if (hasPipe) {
        parts = line.split('|').map(s => s.trim());
      } else {
        parts = line.split(/[-–|]/).map(s => s.trim());
      }

      current = {
        id: generateId(),
        degree: parts[0] || '',
        field: parts.length > 2 ? parts[1] : '',
        institution: parts.length > 2 ? parts[2] || parts[1] : parts[1] || '',
        startDate: extractStartDate(line),
        endDate: extractEndDate(line),
        description: '',
      };
    } else if (current) {
      current.description = current.description ? current.description + ' ' + line : line;
    }
  }

  if (current) result.education.push(current);
}

function parseSkills(lines: string[], result: ResumeContent) {
  // Check if skills are comma/pipe separated or line-separated
  const allText = lines.join('\n');
  const hasSeparators = /[,;|•·]/.test(allText);

  const allSkills: string[] = [];
  for (const line of lines) {
    if (hasSeparators) {
      const skills = line.split(/[,;|•·]/).map(s => s.trim()).filter(s => s.length > 0 && s.length < 50);
      allSkills.push(...skills);
    } else {
      const trimmed = line.replace(/^[•\-*▸→●◦▪]\s*/, '').trim();
      if (trimmed.length > 0 && trimmed.length < 50) {
        allSkills.push(trimmed);
      }
    }
  }

  if (allSkills.length > 0) {
    result.skills.push({
      id: generateId(),
      category: 'Skills',
      skills: allSkills,
    });
  }
}

function parseProjects(lines: string[], result: ResumeContent) {
  let current: any = null;

  for (const line of lines) {
    const isBullet = /^[•\-*▸→●◦▪]\s*/.test(line);

    if (!isBullet && line.length < 80) {
      if (current) result.projects.push(current);
      current = {
        id: generateId(),
        name: line.split(/[-–|]/)[0].trim(),
        description: '',
        link: '',
        technologies: [],
      };
    } else if (current) {
      const clean = line.replace(/^[•\-*▸→●◦▪]\s*/, '');
      if (current.description && (clean.includes(',') || clean.includes('|'))) {
        current.technologies = clean.split(/[,;|]/).map(s => s.trim()).filter(Boolean);
      } else {
        current.description = current.description ? current.description + ' ' + clean : clean;
      }
    }
  }

  if (current) result.projects.push(current);
}

function parseCertifications(lines: string[], result: ResumeContent) {
  for (const line of lines) {
    const clean = line.replace(/^[•\-*▸→●◦▪]\s*/, '');
    const parts = clean.split(/[-–|,]/).map(s => s.trim());
    if (parts[0]) {
      result.certifications.push({
        id: generateId(),
        name: parts[0],
        issuer: parts[1] || '',
        date: parts[2] || '',
      });
    }
  }
}

function parseLanguages(lines: string[], result: ResumeContent) {
  for (const line of lines) {
    const clean = line.replace(/^[•\-*▸→●◦▪]\s*/, '');
    const parts = clean.split(/[-–|(]/).map(s => s.trim());
    if (parts[0]) {
      result.languages.push({
        id: generateId(),
        language: parts[0],
        proficiency: parts[1] || 'Professional',
      });
    }
  }
}

function parseAwards(lines: string[], result: ResumeContent) {
  for (const line of lines) {
    const clean = line.replace(/^[•\-*▸→●◦▪]\s*/, '');
    const parts = clean.split(/[-–|]/).map(s => s.trim());
    if (parts[0]) {
      result.awards.push({
        id: generateId(),
        name: parts[0],
        issuer: parts[1] || '',
        date: parts[2] || '',
        description: '',
      });
    }
  }
}

function parsePublications(lines: string[], result: ResumeContent) {
  for (const line of lines) {
    const clean = line.replace(/^[•\-*▸→●◦▪]\s*/, '');
    const parts = clean.split(/[-–|]/).map(s => s.trim());
    if (parts[0]) {
      result.publications.push({
        id: generateId(),
        title: parts[0],
        publisher: parts[1] || '',
        date: parts[2] || '',
        url: '',
        description: '',
      });
    }
  }
}

function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).slice(2, 8);
}

function extractStartDate(text: string): string {
  const match = text.match(/(20\d{2}|19\d{2})/);
  return match ? match[1] : '';
}

function extractEndDate(text: string): string {
  const matches = text.match(/(20\d{2}|19\d{2})/g);
  if (matches && matches.length >= 2) return matches[1];
  if (/present|current/i.test(text)) return '';
  return matches ? matches[0] : '';
}
