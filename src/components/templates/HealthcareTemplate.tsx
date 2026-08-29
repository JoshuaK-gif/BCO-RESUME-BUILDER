import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const HealthcareTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;
  const sec = (t: string) => <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#0369a1', marginBottom: '8px', paddingBottom: '4px', borderBottom: '2px solid #0369a1' }}>{t}</h2>;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, padding: `${design.margins}mm`, color: '#1e293b', backgroundColor: '#fff', minHeight: '297mm' }}>
      <header style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '3px solid #0369a1' }}>
        <h1 style={{ fontSize: `${design.headingSize + 10}px`, fontWeight: 700, margin: 0, color: '#0c4a6e' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ color: '#0369a1', fontSize: `${design.fontSize + 2}px`, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginTop: '10px', fontSize: `${design.fontSize - 1}px`, color: '#64748b' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      {summary && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Professional Summary')}<p style={{ whiteSpace: 'pre-line' }}>{summary}</p></section>}

      {certifications.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Licenses & Certifications')}{certifications.map((c) => <div key={c.id} style={{ marginBottom: '4px' }}><strong>{c.name}</strong> — {c.issuer} ({c.date})</div>)}</section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          {sec('Clinical Experience')}
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{exp.position}</strong><span style={{ color: '#94a3b8', fontSize: `${design.fontSize - 1}px` }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span></div>
              <p style={{ color: '#0369a1', fontWeight: 500, marginBottom: '4px' }}>{exp.company}{exp.location ? ` | ${exp.location}` : ''}</p>
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
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong><span style={{ color: '#94a3b8', fontSize: `${design.fontSize - 1}px` }}>{edu.startDate} – {edu.endDate}</span></div>
              <p style={{ color: '#64748b' }}>{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          {sec('Clinical Skills')}
          {skills.map((g) => <div key={g.id} style={{ marginBottom: '4px' }}><strong>{g.category}:</strong> {g.skills.join(', ')}</div>)}
        </section>
      )}

      {projects.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Research & Projects')}{projects.map((p) => <div key={p.id} style={{ marginBottom: '8px' }}><strong>{p.name}</strong> — {p.description}</div>)}</section>}
      {languages.length > 0 && <section>{sec('Languages')}{languages.map((l) => <span key={l.id} style={{ marginRight: '16px' }}>{l.language} ({l.proficiency})</span>)}</section>}
    </div>
  );
};
