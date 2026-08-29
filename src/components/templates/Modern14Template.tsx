import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Modern14Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      {/* Clean header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: `${design.sectionSpacing}px`, paddingBottom: '16px', borderBottom: `1px solid #e5e7eb` }}>
        <div>
          <h1 style={{ fontSize: `${design.headingSize + 14}px`, fontWeight: 800, margin: 0, color: '#111' }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, color: design.accentColor, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        </div>
        <div style={{ textAlign: 'right', fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
          {personalInfo.github && <div>{personalInfo.github}</div>}
        </div>
      </div>

      {summary && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <p style={{ whiteSpace: 'pre-line', color: '#374151', fontSize: `${design.fontSize + 0.5}px` }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#111', marginBottom: '12px', paddingBottom: '6px', borderBottom: `2px solid ${design.accentColor}` }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: `${design.fontSize + 1}px` }}>{exp.position}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#999' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ color: design.accentColor, fontWeight: 500, fontSize: `${design.fontSize}px` }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
              {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#374151', whiteSpace: 'pre-line' }}>{exp.description}</p>}
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i} style={{ marginBottom: '2px' }}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#111', marginBottom: '12px', paddingBottom: '6px', borderBottom: `2px solid ${design.accentColor}` }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: `${design.fontSize + 1}px` }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#999' }}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p style={{ color: '#555' }}>{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#111', marginBottom: '10px', paddingBottom: '6px', borderBottom: `2px solid ${design.accentColor}` }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((g) => g.skills.map((s, i) => (
              <span key={`${g.id}-${i}`} style={{ padding: '4px 12px', backgroundColor: `${design.accentColor}10`, color: design.accentColor, borderRadius: '4px', fontSize: `${design.fontSize - 1}px` }}>{s}</span>
            )))}
          </div>
        </section>
      )}

      <div style={{ display: 'flex', gap: '30px' }}>
        {projects.length > 0 && (
          <section style={{ flex: 1, marginBottom: `${design.sectionSpacing}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#111', marginBottom: '10px', paddingBottom: '6px', borderBottom: `2px solid ${design.accentColor}` }}>Projects</h2>
            {projects.map((p) => (
              <div key={p.id} style={{ marginBottom: '10px' }}>
                <strong>{p.name}</strong>
                {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px` }}>{p.description}</p>}
                {p.technologies.length > 0 && <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{p.technologies.join(', ')}</p>}
              </div>
            ))}
          </section>
        )}

        {languages.length > 0 && (
          <section style={{ flex: 1, marginBottom: `${design.sectionSpacing}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#111', marginBottom: '10px', paddingBottom: '6px', borderBottom: `2px solid ${design.accentColor}` }}>Languages</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {languages.map((l) => (
                <span key={l.id} style={{ padding: '4px 12px', border: `1px solid ${design.accentColor}`, borderRadius: '4px', fontSize: `${design.fontSize - 1}px` }}>
                  <strong>{l.language}</strong> ({l.proficiency})
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {certifications.length > 0 && (
        <section>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#111', marginBottom: '10px', paddingBottom: '6px', borderBottom: `2px solid ${design.accentColor}` }}>Certifications</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {certifications.map((c) => (
              <span key={c.id} style={{ fontSize: `${design.fontSize - 1}px` }}><strong>{c.name}</strong> — {c.issuer} ({c.date})</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
