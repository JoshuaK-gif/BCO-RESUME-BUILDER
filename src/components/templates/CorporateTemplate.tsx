import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const CorporateTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;
  const section = (title: string) => <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#fff', backgroundColor: design.accentColor, padding: '6px 12px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h2>;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#333', backgroundColor: '#fff', minHeight: '297mm' }}>
      {/* Full-width header */}
      <div style={{ backgroundColor: design.accentColor, padding: `${design.margins}mm ${design.margins}mm ${design.margins - 5}mm`, color: '#fff' }}>
        <h1 style={{ fontSize: `${design.headingSize + 12}px`, fontWeight: 800, margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, opacity: 0.9, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginTop: '10px', fontSize: `${design.fontSize - 1}px`, opacity: 0.85 }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      <div style={{ padding: `${design.margins}mm` }}>
        {summary && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{section('Summary')}<p style={{ whiteSpace: 'pre-line' }}>{summary}</p></section>}

        {experience.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            {section('Experience')}
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{exp.position}</strong><span style={{ color: '#888', fontSize: `${design.fontSize - 1}px` }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span></div>
                <p style={{ color: design.accentColor, fontWeight: 600, marginBottom: '4px' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px` }}>{exp.description}</p>}
                {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            {section('Education')}
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
            {section('Skills')}
            {skills.map((g) => <div key={g.id} style={{ marginBottom: '4px' }}><strong>{g.category}:</strong> {g.skills.join(' | ')}</div>)}
          </section>
        )}

        {projects.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            {section('Projects')}
            {projects.map((p) => <div key={p.id} style={{ marginBottom: '8px' }}><strong>{p.name}</strong> — {p.description}</div>)}
          </section>
        )}

        {certifications.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            {section('Certifications')}
            {certifications.map((c) => <div key={c.id}>{c.name} — {c.issuer} ({c.date})</div>)}
          </section>
        )}

        {languages.length > 0 && (
          <section>
            {section('Languages')}
            {languages.map((l) => <span key={l.id} style={{ marginRight: '16px' }}>{l.language} ({l.proficiency})</span>)}
          </section>
        )}
      </div>
    </div>
  );
};
