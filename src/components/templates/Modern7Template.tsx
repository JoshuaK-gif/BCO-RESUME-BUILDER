import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Modern7Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      {/* Header with underline */}
      <div style={{ textAlign: 'center', paddingBottom: '16px', borderBottom: `3px double ${design.accentColor}`, marginBottom: `${design.sectionSpacing}px` }}>
        <h1 style={{ fontSize: `${design.headingSize + 16}px`, fontWeight: 300, margin: 0, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, color: design.accentColor, marginTop: '4px', letterSpacing: '0.05em' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px', fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {summary && (
        <section style={{ marginBottom: `${design.sectionSpacing}px`, textAlign: 'center' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 300, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>Profile</h2>
          <p style={{ whiteSpace: 'pre-line', color: '#374151', maxWidth: '85%', margin: '0 auto' }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 300, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px', textAlign: 'center' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: `${design.fontSize + 1}px`, fontWeight: 600 }}>{exp.position}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ color: design.accentColor, fontStyle: 'italic' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
              {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#374151', whiteSpace: 'pre-line' }}>{exp.description}</p>}
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 300, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px', textAlign: 'center' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px', textAlign: 'center' }}>
              <strong style={{ fontSize: `${design.fontSize + 1}px` }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>
              <p style={{ color: '#555' }}>{edu.institution}</p>
              <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{edu.startDate} – {edu.endDate}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 300, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px', textAlign: 'center' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
            {skills.map((g) => g.skills.map((s, i) => (
              <span key={`${g.id}-${i}`} style={{ border: `1px solid ${design.accentColor}`, padding: '4px 14px', borderRadius: '20px', fontSize: `${design.fontSize - 1}px`, color: design.accentColor }}>{s}</span>
            )))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 300, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px', textAlign: 'center' }}>Projects</h2>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '10px', textAlign: 'center' }}>
              <strong>{p.name}</strong>
              {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px` }}>{p.description}</p>}
              {p.technologies.length > 0 && <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{p.technologies.join(' · ')}</p>}
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 300, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px', textAlign: 'center' }}>Certifications</h2>
          {certifications.map((c) => <div key={c.id} style={{ marginBottom: '6px', textAlign: 'center' }}><strong>{c.name}</strong> — {c.issuer} ({c.date})</div>)}
        </section>
      )}

      {languages.length > 0 && (
        <section>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 300, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px', textAlign: 'center' }}>Languages</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            {languages.map((l) => <span key={l.id} style={{ fontSize: `${design.fontSize - 1}px` }}><strong>{l.language}</strong> ({l.proficiency})</span>)}
          </div>
        </section>
      )}
    </div>
  );
};
