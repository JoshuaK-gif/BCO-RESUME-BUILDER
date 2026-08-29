import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Modern11Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      {/* Card-style header */}
      <div style={{ backgroundColor: design.accentColor, color: '#fff', padding: '24px', borderRadius: '12px', marginBottom: `${design.sectionSpacing}px` }}>
        <h1 style={{ fontSize: `${design.headingSize + 14}px`, fontWeight: 800, margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, opacity: 0.9, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px', fontSize: `${design.fontSize - 1}px`, opacity: 0.9 }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </div>

      {summary && (
        <section style={{ marginBottom: `${design.sectionSpacing}px`, padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px' }}>Summary</h2>
          <p style={{ whiteSpace: 'pre-line', color: '#374151' }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '12px' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px', padding: '16px', backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: `${design.fontSize + 1}px` }}>{exp.position}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ color: design.accentColor, fontWeight: 500 }}>{exp.company}</p>
              {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#374151', whiteSpace: 'pre-line' }}>{exp.description}</p>}
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      <div style={{ display: 'flex', gap: '16px' }}>
        {education.length > 0 && (
          <section style={{ flex: 1, marginBottom: `${design.sectionSpacing}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>
                <p style={{ color: '#555', fontSize: `${design.fontSize - 1}px` }}>{edu.institution}</p>
                <p style={{ color: '#6b7280', fontSize: `${design.fontSize - 1}px` }}>{edu.startDate} – {edu.endDate}</p>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section style={{ flex: 1, marginBottom: `${design.sectionSpacing}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px' }}>Skills</h2>
            <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '8px' }}>
                  <div style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px` }}>{g.category}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {g.skills.map((s, i) => (
                      <span key={i} style={{ backgroundColor: `${design.accentColor}15`, color: design.accentColor, padding: '2px 8px', borderRadius: '12px', fontSize: `${design.fontSize - 2}px` }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {projects.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px' }}>Projects</h2>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '10px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <strong>{p.name}</strong>
              {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px` }}>{p.description}</p>}
              {p.technologies.length > 0 && <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{p.technologies.join(' · ')}</p>}
            </div>
          ))}
        </section>
      )}

      {languages.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px' }}>Languages</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {languages.map((l) => (
              <span key={l.id} style={{ padding: '8px 16px', backgroundColor: '#f8f9fa', borderRadius: '20px', fontSize: `${design.fontSize - 1}px` }}>
                <strong>{l.language}</strong> ({l.proficiency})
              </span>
            ))}
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px' }}>Certifications</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {certifications.map((c) => (
              <span key={c.id} style={{ padding: '8px 16px', border: `1px solid ${design.accentColor}`, borderRadius: '8px', fontSize: `${design.fontSize - 1}px` }}>
                <strong>{c.name}</strong> — {c.issuer}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
