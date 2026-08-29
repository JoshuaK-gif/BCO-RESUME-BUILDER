import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const ClassicTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;
  const sec = (t: string) => <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#000', textTransform: 'uppercase', marginBottom: '6px', paddingBottom: '2px', borderBottom: '1px solid #000', letterSpacing: '0.05em' }}>{t}</h2>;

  return (
    <div style={{ fontFamily: '"Times New Roman", Georgia, serif', fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, padding: `${design.margins}mm`, color: '#000', backgroundColor: '#fff', minHeight: '297mm' }}>
      <header style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: `${design.headingSize + 12}px`, fontWeight: 700, margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 1}px`, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4px 12px', marginTop: '8px', fontSize: `${design.fontSize - 1}px` }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      {summary && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Objective')}<p style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          {sec('Experience')}
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <strong>{exp.position}</strong>, {exp.company}{exp.location ? `, ${exp.location}` : ''} <span style={{ float: 'right' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, marginTop: '4px' }}>{exp.description}</p>}
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '20px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          {sec('Education')}
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>, {edu.institution} <span style={{ float: 'right' }}>{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Skills')}{skills.map((g) => <div key={g.id} style={{ marginBottom: '4px' }}><strong>{g.category}:</strong> {g.skills.join(', ')}</div>)}</section>}
      {projects.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Projects')}{projects.map((p) => <div key={p.id} style={{ marginBottom: '6px' }}><strong>{p.name}</strong> — {p.description}</div>)}</section>}
      {certifications.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Certifications')}{certifications.map((c) => <div key={c.id}>{c.name} — {c.issuer} ({c.date})</div>)}</section>}
      {languages.length > 0 && <section>{sec('Languages')}{languages.map((l) => <span key={l.id} style={{ marginRight: '16px' }}>{l.language} ({l.proficiency})</span>)}</section>}
    </div>
  );
};
