import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const AccentTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;
  const sec = (t: string) => <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#1f2937', marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${design.accentColor}` }}>{t}</h2>;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1f2937', backgroundColor: '#fff', minHeight: '297mm', display: 'flex' }}>
      {/* Thin accent bar */}
      <div style={{ width: '6mm', backgroundColor: design.accentColor, flexShrink: 0 }} />

      <div style={{ flex: 1, padding: `${design.margins}mm` }}>
        <header style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <h1 style={{ fontSize: `${design.headingSize + 10}px`, fontWeight: 700, margin: 0, color: '#111827' }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.professionalTitle && <p style={{ color: design.accentColor, fontSize: `${design.fontSize + 2}px`, marginTop: '4px', fontWeight: 500 }}>{personalInfo.professionalTitle}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginTop: '10px', fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </header>

        {summary && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Professional Summary')}<p style={{ whiteSpace: 'pre-line' }}>{summary}</p></section>}

        {experience.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            {sec('Work Experience')}
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px', paddingLeft: '12px', borderLeft: `3px solid ${design.accentColor}20` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{exp.position}</strong><span style={{ color: '#9ca3af', fontSize: `${design.fontSize - 1}px` }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span></div>
                <p style={{ color: design.accentColor, fontWeight: 500, marginBottom: '4px' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
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
              <div key={edu.id} style={{ marginBottom: '10px', paddingLeft: '12px', borderLeft: `3px solid ${design.accentColor}20` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong><span style={{ color: '#9ca3af', fontSize: `${design.fontSize - 1}px` }}>{edu.startDate} – {edu.endDate}</span></div>
                <p style={{ color: '#6b7280' }}>{edu.institution}</p>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Skills')}{skills.map((g) => <div key={g.id} style={{ marginBottom: '4px' }}><strong>{g.category}:</strong> {g.skills.join(', ')}</div>)}</section>}
        {projects.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Projects')}{projects.map((p) => <div key={p.id} style={{ marginBottom: '8px', paddingLeft: '12px', borderLeft: `3px solid ${design.accentColor}20` }}><strong>{p.name}</strong> — {p.description}</div>)}</section>}
        {certifications.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Certifications')}{certifications.map((c) => <div key={c.id}>{c.name} — {c.issuer} ({c.date})</div>)}</section>}
        {languages.length > 0 && <section>{sec('Languages')}{languages.map((l) => <span key={l.id} style={{ marginRight: '16px' }}>{l.language} ({l.proficiency})</span>)}</section>}
      </div>
    </div>
  );
};
