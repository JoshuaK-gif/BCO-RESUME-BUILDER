import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Creative2Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm' }}>
      <div style={{ background: `linear-gradient(135deg, ${design.accentColor} 0%, ${design.accentColor}88 50%, ${design.accentColor}44 100%)`, color: '#fff', padding: `${design.margins * 1.5}mm ${design.margins}mm` }}>
        <h1 style={{ fontSize: `${design.headingSize + 18}px`, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 4}px`, opacity: 0.9, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px', fontSize: `${design.fontSize - 1}px`, opacity: 0.9 }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      <div style={{ padding: `${design.margins}mm`, display: 'flex', gap: '24px' }}>
        <div style={{ flex: 2 }}>
          {summary && <section style={{ marginBottom: `${design.sectionSpacing}px` }}><h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px' }}>About Me</h2><p style={{ whiteSpace: 'pre-line', color: '#374151' }}>{summary}</p></section>}

          {experience.length > 0 && (
            <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
              <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px' }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: `${design.fontSize + 1}px` }}>{exp.position}</strong>
                    <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ color: design.accentColor, fontWeight: 500 }}>{exp.company}</p>
                  {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px' }}>Projects</h2>
              {projects.map((p) => (
                <div key={p.id} style={{ marginBottom: '10px' }}>
                  <strong>{p.name}</strong>
                  {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px` }}>{p.description}</p>}
                  {p.technologies.length > 0 && <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{p.technologies.join(' · ')}</p>}
                </div>
              ))}
            </section>
          )}
        </div>

        <div style={{ flex: 1, backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
          {skills.length > 0 && (
            <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Skills</h2>
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '8px' }}>
                  <div style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px` }}>{g.category}</div>
                  {g.skills.map((s, i) => (
                    <div key={i} style={{ fontSize: `${design.fontSize - 1}px`, color: '#555' }}>• {s}</div>
                  ))}
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '8px' }}>
                  <strong style={{ fontSize: `${design.fontSize - 1}px` }}>{edu.degree}</strong>
                  <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#555' }}>{edu.institution}</p>
                </div>
              ))}
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Languages</h2>
              {languages.map((l) => <div key={l.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '4px' }}>{l.language} ({l.proficiency})</div>)}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
