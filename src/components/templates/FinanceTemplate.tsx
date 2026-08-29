import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const FinanceTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;
  const sec = (t: string) => <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#1a1a2e', marginBottom: '8px', paddingBottom: '4px', borderBottom: '2px solid #1a1a2e' }}>{t}</h2>;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, padding: `${design.margins}mm`, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm' }}>
      <header style={{ marginBottom: '24px', textAlign: 'center', paddingBottom: '16px', borderBottom: '1px solid #ccc' }}>
        <h1 style={{ fontSize: `${design.headingSize + 12}px`, fontWeight: 700, margin: 0, color: '#1a1a2e' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, color: '#555', marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4px 16px', marginTop: '10px', fontSize: `${design.fontSize - 1}px`, color: '#666' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {summary && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Professional Summary')}<p style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          {sec('Professional Experience')}
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{exp.position}</strong><span style={{ color: '#888', fontSize: `${design.fontSize - 1}px` }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span></div>
              <p style={{ color: '#555', fontStyle: 'italic', marginBottom: '4px' }}>{exp.company}{exp.location ? ` | ${exp.location}` : ''}</p>
              {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px` }}>{exp.description}</p>}
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          {sec('Education')}
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong><span style={{ color: '#888', fontSize: `${design.fontSize - 1}px` }}>{edu.startDate} – {edu.endDate}</span></div>
              <p style={{ color: '#555' }}>{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          {sec('Competencies')}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 24px' }}>
            {skills.map((g) => <div key={g.id}><strong>{g.category}:</strong> {g.skills.join(', ')}</div>)}
          </div>
        </section>
      )}

      {certifications.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Certifications & Licenses')}{certifications.map((c) => <div key={c.id}>{c.name} — {c.issuer} ({c.date})</div>)}</section>}

      {languages.length > 0 && <section>{sec('Languages')}{languages.map((l) => <span key={l.id} style={{ marginRight: '16px' }}>{l.language} ({l.proficiency})</span>)}</section>}
    </div>
  );
};
