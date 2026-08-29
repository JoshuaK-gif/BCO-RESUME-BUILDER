import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const CleanTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;
  const sec = (t: string) => <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px' }}>{t}</h2>;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, padding: `${design.margins + 4}mm`, color: '#333', backgroundColor: '#fff', minHeight: '297mm' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: `${design.headingSize + 8}px`, fontWeight: 300, margin: 0, letterSpacing: '0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ color: '#888', marginTop: '4px', fontWeight: 300 }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginTop: '12px', fontSize: `${design.fontSize - 1}px`, color: '#999' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {summary && <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>{sec('Summary')}<p style={{ whiteSpace: 'pre-line', color: '#555' }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
          {sec('Experience')}
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{exp.position}</strong><span style={{ color: '#bbb', fontSize: `${design.fontSize - 1}px` }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span></div>
              <p style={{ color: '#777', marginBottom: '4px' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
              {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#555' }}>{exp.description}</p>}
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px`, color: '#555' }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
          {sec('Education')}
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong><span style={{ color: '#bbb', fontSize: `${design.fontSize - 1}px` }}>{edu.startDate} – {edu.endDate}</span></div>
              <p style={{ color: '#777' }}>{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>{sec('Skills')}{skills.map((g) => <div key={g.id} style={{ marginBottom: '4px', color: '#555' }}><span style={{ color: '#999' }}>{g.category}:</span> {g.skills.join(', ')}</div>)}</section>}
      {projects.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>{sec('Projects')}{projects.map((p) => <div key={p.id} style={{ marginBottom: '8px' }}><strong>{p.name}</strong> — {p.description}</div>)}</section>}
      {certifications.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>{sec('Certifications')}{certifications.map((c) => <div key={c.id}>{c.name} — {c.issuer} ({c.date})</div>)}</section>}
      {languages.length > 0 && <section>{sec('Languages')}{languages.map((l) => <span key={l.id} style={{ marginRight: '16px' }}>{l.language} ({l.proficiency})</span>)}</section>}
    </div>
  );
};
