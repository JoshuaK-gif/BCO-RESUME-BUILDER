import { ResumeContent } from '@/types/resume';

export interface AIService {
  improveBulletPoint(bullet: string): Promise<string>;
  generateSummary(data: SummaryInput): Promise<string>;
  improveExperience(description: string): Promise<string>;
  analyzeATS(resume: ResumeContent, jobDescription?: string): Promise<ATSResult>;
  matchJob(resume: ResumeContent, jobDescription: string): Promise<JobMatchResult>;
  suggestSkills(experience: string, industry?: string): Promise<string[]>;
  generateCoverLetter(data: CoverLetterInput): Promise<string>;
  optimizeLinkedIn(data: LinkedInInput): Promise<LinkedInResult>;
}

export interface SummaryInput {
  jobTitle: string;
  experience: string;
  skills: string[];
  industry: string;
  careerObjective?: string;
}

export interface ATSResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  missingKeywords: string[];
  formattingIssues: string[];
  recommendations: string[];
}

export interface JobMatchResult {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  missingKeywords: string[];
  weakAreas: string[];
  recommendations: string[];
}

export interface CoverLetterInput {
  jobTitle: string;
  company: string;
  jobDescription: string;
  resumeContent: ResumeContent;
  tone?: 'professional' | 'confident' | 'enthusiastic';
}

export interface LinkedInInput {
  jobTitle: string;
  industry: string;
  experience: string;
  skills: string[];
}

export interface LinkedInResult {
  headline: string;
  about: string;
  experienceWording: string[];
  skillSuggestions: string[];
}

export class OpenAIProvider implements AIService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl?: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl || 'https://api.openai.com/v1';
  }

  private async chat(systemPrompt: string, userContent: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || 'AI service error');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async improveBulletPoint(bullet: string): Promise<string> {
    const systemPrompt = `You are a professional resume writer. Improve the following bullet point to be more impactful and result-oriented.
Rules:
- Use strong action verbs
- Quantify results when possible (but do NOT invent numbers)
- Keep it concise (1-2 lines)
- Do not fabricate information
- If measurable achievements are missing, suggest the user add them
- Return ONLY the improved bullet point, no explanations`;

    return this.chat(systemPrompt, bullet);
  }

  async generateSummary(data: SummaryInput): Promise<string> {
    const systemPrompt = `You are a professional resume writer. Generate a compelling professional summary based on the provided information.
Rules:
- 2-4 sentences maximum
- Highlight key strengths and experience
- Include relevant skills
- Match the industry tone
- Do NOT fabricate experience or skills
- Return ONLY the summary text, no explanations`;

    const userContent = `Job Title: ${data.jobTitle}
Experience: ${data.experience}
Skills: ${data.skills.join(', ')}
Industry: ${data.industry}
Career Objective: ${data.careerObjective || 'Not specified'}`;

    return this.chat(systemPrompt, userContent);
  }

  async improveExperience(description: string): Promise<string> {
    const systemPrompt = `You are a professional resume writer. Improve the following work experience description to be more impactful.
Rules:
- Use strong action verbs
- Focus on achievements and impact
- Quantify results when possible (but do NOT invent numbers)
- Keep professional tone
- Do NOT fabricate employers, job titles, dates, or responsibilities
- If measurable achievements are missing, tell the user to add them
- Return ONLY the improved description, no explanations`;

    return this.chat(systemPrompt, description);
  }

  async analyzeATS(resume: ResumeContent, jobDescription?: string): Promise<ATSResult> {
    const systemPrompt = `You are an ATS (Applicant Tracking System) expert. Analyze the resume and provide a comprehensive ATS analysis.

Return a JSON object with this exact structure:
{
  "score": number (0-100),
  "strengths": ["strength1", "strength2"],
  "weaknesses": ["weakness1", "weakness2"],
  "missingKeywords": ["keyword1", "keyword2"],
  "formattingIssues": ["issue1", "issue2"],
  "recommendations": ["recommendation1", "recommendation2"]
}

Scoring criteria:
- Keyword relevance (30%)
- Skills match (25%)
- Experience quality (20%)
- Formatting (15%)
- Readability (10%)

Rules:
- Be specific and actionable
- Focus on real ATS optimization
- Consider industry standards
- Return ONLY the JSON object, no explanations`;

    const resumeText = this.resumeToText(resume);
    const userContent = jobDescription
      ? `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}`
      : `Resume:\n${resumeText}`;

    const result = await this.chat(systemPrompt, userContent);
    return JSON.parse(result);
  }

  async matchJob(resume: ResumeContent, jobDescription: string): Promise<JobMatchResult> {
    const systemPrompt = `You are a career matching expert. Analyze how well the resume matches the job description.

Return a JSON object with this exact structure:
{
  "matchScore": number (0-100),
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "missingKeywords": ["keyword1", "keyword2"],
  "weakAreas": ["area1", "area2"],
  "recommendations": ["recommendation1", "recommendation2"]
}

Rules:
- Be specific about matched and missing skills
- Provide actionable recommendations
- Consider both hard and soft skills
- Return ONLY the JSON object, no explanations`;

    const resumeText = this.resumeToText(resume);
    const userContent = `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}`;

    const result = await this.chat(systemPrompt, userContent);
    return JSON.parse(result);
  }

  async suggestSkills(experience: string, industry?: string): Promise<string[]> {
    const systemPrompt = `You are a career expert. Suggest relevant skills based on the provided experience and industry.
Rules:
- Return 10-15 relevant skills
- Include both technical and soft skills
- Consider industry standards
- Be specific (e.g., "React" instead of "JavaScript frameworks")
- Return a JSON array of strings, no explanations`;

    const userContent = industry
      ? `Experience: ${experience}\nIndustry: ${industry}`
      : `Experience: ${experience}`;

    const result = await this.chat(systemPrompt, userContent);
    return JSON.parse(result);
  }

  async generateCoverLetter(data: CoverLetterInput): Promise<string> {
    const systemPrompt = `You are a professional cover letter writer. Generate a compelling cover letter based on the resume and job details.
Rules:
- 3-4 paragraphs maximum
- Professional tone (adjust based on tone parameter)
- Highlight relevant experience and skills
- Show enthusiasm for the role
- Do NOT fabricate experience or skills
- Personalize for the company and role
- Return ONLY the cover letter text, no explanations`;

    const userContent = `Job Title: ${data.jobTitle}
Company: ${data.company}
Job Description: ${data.jobDescription}
Tone: ${data.tone || 'professional'}

Resume Summary: ${data.resumeContent.summary}
Key Skills: ${data.resumeContent.skills.map(s => s.skills.join(', ')).join(', ')}
Experience: ${data.resumeContent.experience.map(e => `${e.position} at ${e.company}: ${e.description}`).join('\n')}`;

    return this.chat(systemPrompt, userContent);
  }

  async optimizeLinkedIn(data: LinkedInInput): Promise<LinkedInResult> {
    const systemPrompt = `You are a LinkedIn optimization expert. Generate LinkedIn profile content based on the provided information.

Return a JSON object with this exact structure:
{
  "headline": "professional headline (max 220 chars)",
  "about": "about section (2-3 paragraphs)",
  "experienceWording": ["improved experience 1", "improved experience 2"],
  "skillSuggestions": ["skill1", "skill2", "skill3"]
}

Rules:
- Make headline catchy and keyword-rich
- About section should tell a story
- Experience wording should be impactful
- Skills should be relevant and searchable
- Return ONLY the JSON object, no explanations`;

    const userContent = `Job Title: ${data.jobTitle}
Industry: ${data.industry}
Experience: ${data.experience}
Skills: ${data.skills.join(', ')}`;

    const result = await this.chat(systemPrompt, userContent);
    return JSON.parse(result);
  }

  private resumeToText(resume: ResumeContent): string {
    const lines: string[] = [];

    // Personal Info
    if (resume.personalInfo.fullName) lines.push(`Name: ${resume.personalInfo.fullName}`);
    if (resume.personalInfo.professionalTitle) lines.push(`Title: ${resume.personalInfo.professionalTitle}`);
    if (resume.personalInfo.email) lines.push(`Email: ${resume.personalInfo.email}`);

    // Summary
    if (resume.summary) lines.push(`\nSummary: ${resume.summary}`);

    // Experience
    if (resume.experience.length > 0) {
      lines.push('\nExperience:');
      resume.experience.forEach(exp => {
        lines.push(`${exp.position} at ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate})`);
        if (exp.description) lines.push(`  ${exp.description}`);
        exp.achievements.forEach(ach => {
          if (ach) lines.push(`  - ${ach}`);
        });
      });
    }

    // Education
    if (resume.education.length > 0) {
      lines.push('\nEducation:');
      resume.education.forEach(edu => {
        lines.push(`${edu.degree} in ${edu.field} from ${edu.institution} (${edu.startDate} - ${edu.endDate})`);
      });
    }

    // Skills
    if (resume.skills.length > 0) {
      lines.push('\nSkills:');
      resume.skills.forEach(group => {
        lines.push(`${group.category}: ${group.skills.join(', ')}`);
      });
    }

    // Projects
    if (resume.projects.length > 0) {
      lines.push('\nProjects:');
      resume.projects.forEach(proj => {
        lines.push(`${proj.name}: ${proj.description}`);
      });
    }

    return lines.join('\n');
  }
}

export function createAIService(): AIService {
  const apiKey = process.env.AI_API_KEY;
  const baseUrl = process.env.AI_BASE_URL;

  if (!apiKey) {
    throw new Error('AI_API_KEY is not configured');
  }

  return new OpenAIProvider(apiKey, baseUrl);
}
