import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const TwoColumnTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;
  const sec = (t: string) => <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', paddingBottom: '4px', borderBottom: `1px solid ${design.accentColor}30` }}>{t}</h2>;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#333', backgroundColor: '#fff', minHeight: '297mm' }}>
      {/* Header */}
      <div style={{ padding: `${design.margins}mm ${design.margins}mm ${design.margins - 4}mm`, paddingBottom: '16px', borderBottom: `3px solid ${design.accentColor}` }}>
        <h1 style={{ fontSize: `${design.headingSize + 10}px`, fontWeight: 700, margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ color: design.accentColor, marginTop: '4px', fontSize: `${design.fontSize + 2}px` }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginTop: '8px', fontSize: `${design.fontSize - 1}px`, color: '#888' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      {/* Two columns */}
      <div style={{ display: 'flex', padding: `${design.margins}mm`, gap: '24px' }}>
        {/* Left column - wider */}
        <div style={{ flex: 3 }}>
          {summary && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Summary')}<p style={{ whiteSpace: 'pre-line', fontSize: `${design.fontSize - 0.5}px` }}>{summary}</p></section>}

          {experience.length > 0 && (
            <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
              {sec('Experience')}
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '12px' }}>
                  <strong>{exp.position}</strong>
                  <span style={{ color: '#999', fontSize: `${design.fontSize - 1}px`, marginLeft: '8px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  <p style={{ color: '#666', fontSize: `${design.fontSize - 0.5}px`, marginBottom: '2px' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px` }}>{exp.description}</p>}
                  {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '16px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
              {sec('Projects')}
              {projects.map((p) => (
                <div key={p.id} style={{ marginBottom: '8px' }}><strong>{p.name}</strong> — {p.description}{p.technologies.length > 0 && <span style={{ color: '#888', fontSize: `${design.fontSize - 1}px` }}> [{p.technologies.join(', ')}]</span>}</div>
              ))}
            </section>
          )}
        </div>

        {/* Right column - sidebar */}
        <div style={{ flex: 2 }}>
          {education.length > 0 && (
            <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
              {sec('Education')}
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <strong style={{ fontSize: `${design.fontSize}px` }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>
                  <p style={{ color: '#666', fontSize: `${design.fontSize - 0.5}px` }}>{edu.institution}</p>
                  <p style={{ color: '#999', fontSize: `${design.fontSize - 1}px` }}>{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
              {sec('Skills')}
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '8px' }}>
                  <strong style={{ fontSize: `${design.fontSize - 0.5}px`, color: design.accentColor }}>{g.category}</strong>
                  <div style={{ fontSize: `${design.fontSize - 0.5}px` }}>{g.skills.join(', ')}</div>
                </div>
              ))}
            </section>
          )}

          {certifications.length > 0 && (
            <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
              {sec('Certifications')}
              {certifications.map((c) => (
                <div key={c.id} style={{ marginBottom: '4px', fontSize: `${design.fontSize - 0.5}px` }}>{c.name}<br/>{c.issuer} ({c.date})</div>
              ))}
            </section>
          )}

          {languages.length > 0 && (
            <section>
              {sec('Languages')}
              {languages.map((l) => <div key={l.id} style={{ fontSize: `${design.fontSize - 0.5}px`, marginBottom: '2px' }}>{l.language} ({l.proficiency})</div>)}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
