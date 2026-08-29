import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Modern3Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm' }}>
      {/* Top Bar */}
      <div style={{ backgroundColor: design.accentColor, height: '8px' }} />
      
      {/* Header */}
      <div style={{ padding: `${design.margins}mm`, textAlign: 'center', borderBottom: `1px solid ${design.accentColor}30` }}>
        <h1 style={{ fontSize: `${design.headingSize + 14}px`, fontWeight: 800, color: design.accentColor, margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, color: '#6b7280', marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px', fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
        </div>
      </div>

      <div style={{ padding: `${design.margins}mm` }}>
        {summary && (
          <section style={{ marginBottom: `${design.sectionSpacing}px`, textAlign: 'center' }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Professional Summary</h2>
            <p style={{ whiteSpace: 'pre-line', color: '#374151', maxWidth: '80%', margin: '0 auto' }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', borderBottom: `2px solid ${design.accentColor}`, paddingBottom: '6px' }}>Work Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: `${design.fontSize + 1}px` }}>{exp.position}</strong>
                  <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ color: design.accentColor, fontWeight: 500 }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#374151', whiteSpace: 'pre-line' }}>{exp.description}</p>}
                {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i} style={{ marginBottom: '2px' }}>{a}</li>)}</ul>}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', borderBottom: `2px solid ${design.accentColor}`, paddingBottom: '6px' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>
                  <p style={{ color: '#555' }}>{edu.institution}</p>
                </div>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </section>
        )}

        <div style={{ display: 'flex', gap: '30px' }}>
          {skills.length > 0 && (
            <section style={{ flex: 1, marginBottom: `${design.sectionSpacing}px` }}>
              <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', borderBottom: `2px solid ${design.accentColor}`, paddingBottom: '6px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map((g) => g.skills.map((s, i) => (
                  <span key={`${g.id}-${i}`} style={{ backgroundColor: `${design.accentColor}15`, color: design.accentColor, padding: '3px 10px', borderRadius: '4px', fontSize: `${design.fontSize - 1}px` }}>{s}</span>
                )))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section style={{ flex: 1, marginBottom: `${design.sectionSpacing}px` }}>
              <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', borderBottom: `2px solid ${design.accentColor}`, paddingBottom: '6px' }}>Languages</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {languages.map((l) => <span key={l.id} style={{ fontSize: `${design.fontSize - 1}px` }}><strong>{l.language}</strong> ({l.proficiency})</span>)}
              </div>
            </section>
          )}
        </div>

        {projects.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', borderBottom: `2px solid ${design.accentColor}`, paddingBottom: '6px' }}>Projects</h2>
            {projects.map((p) => (
              <div key={p.id} style={{ marginBottom: '10px' }}>
                <strong>{p.name}</strong>
                {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px` }}>{p.description}</p>}
                {p.technologies.length > 0 && <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>Tech: {p.technologies.join(', ')}</p>}
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', borderBottom: `2px solid ${design.accentColor}`, paddingBottom: '6px' }}>Certifications</h2>
            {certifications.map((c) => <div key={c.id} style={{ marginBottom: '6px' }}><strong>{c.name}</strong> — {c.issuer} ({c.date})</div>)}
          </section>
        )}
      </div>

      {/* Bottom Bar */}
      <div style={{ backgroundColor: design.accentColor, height: '8px', marginTop: 'auto' }} />
    </div>
  );
};
