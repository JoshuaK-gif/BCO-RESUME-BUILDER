import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Modern9Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      {/* Minimal Header */}
      <div style={{ marginBottom: `${design.sectionSpacing * 1.5}px` }}>
        <h1 style={{ fontSize: `${design.headingSize + 14}px`, fontWeight: 800, margin: 0, color: '#111' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, color: '#666', marginTop: '2px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ marginTop: '12px', fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span> · {personalInfo.phone}</span>}
          {personalInfo.location && <span> · {personalInfo.location}</span>}
          {personalInfo.linkedin && <span> · {personalInfo.linkedin}</span>}
          {personalInfo.github && <span> · {personalInfo.github}</span>}
        </div>
      </div>

      {/* Thin divider */}
      <div style={{ height: '1px', backgroundColor: '#e5e7eb', marginBottom: `${design.sectionSpacing}px` }} />

      {summary && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 600, color: '#111', marginBottom: '8px' }}>About</h2>
          <p style={{ whiteSpace: 'pre-line', color: '#374151' }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 600, color: '#111', marginBottom: '10px' }}>Work</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: `${design.fontSize + 1}px` }}>{exp.position}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#999' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ color: design.accentColor, fontWeight: 500, fontSize: `${design.fontSize}px` }}>{exp.company}</p>
              {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#374151', whiteSpace: 'pre-line' }}>{exp.description}</p>}
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 600, color: '#111', marginBottom: '10px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#999' }}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p style={{ color: '#666' }}>{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      <div style={{ display: 'flex', gap: '30px' }}>
        {skills.length > 0 && (
          <section style={{ flex: 1, marginBottom: `${design.sectionSpacing}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 600, color: '#111', marginBottom: '10px' }}>Skills</h2>
            {skills.map((g) => (
              <div key={g.id} style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px` }}>{g.category}: </span>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#555' }}>{g.skills.join(', ')}</span>
              </div>
            ))}
          </section>
        )}

        {languages.length > 0 && (
          <section style={{ flex: 1, marginBottom: `${design.sectionSpacing}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 600, color: '#111', marginBottom: '10px' }}>Languages</h2>
            {languages.map((l) => <div key={l.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '4px' }}><strong>{l.language}</strong> ({l.proficiency})</div>)}
          </section>
        )}
      </div>

      {projects.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 600, color: '#111', marginBottom: '10px' }}>Projects</h2>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '10px' }}>
              <strong>{p.name}</strong>
              {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px` }}>{p.description}</p>}
              {p.technologies.length > 0 && <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#999' }}>{p.technologies.join(', ')}</p>}
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 600, color: '#111', marginBottom: '10px' }}>Certifications</h2>
          {certifications.map((c) => <div key={c.id} style={{ marginBottom: '6px' }}><strong>{c.name}</strong> — {c.issuer} ({c.date})</div>)}
        </section>
      )}
    </div>
  );
};
