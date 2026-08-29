import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Technology2Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      <div style={{ display: 'flex', gap: '30px' }}>
        <div style={{ flex: 2 }}>
          <h1 style={{ fontSize: `${design.headingSize + 12}px`, fontWeight: 700, margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, color: design.accentColor, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px', fontSize: `${design.fontSize - 1}px`, color: '#666' }}>
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.github && <span>{personalInfo.github}</span>}
          </div>

          {summary && <section style={{ marginTop: '20px', marginBottom: `${design.sectionSpacing}px` }}><h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px' }}>About</h2><p style={{ whiteSpace: 'pre-line', color: '#374151' }}>{summary}</p></section>}

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
                  {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#374151', whiteSpace: 'pre-line' }}>{exp.description}</p>}
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

        <div style={{ flex: 1, borderLeft: `1px solid #e5e7eb`, paddingLeft: '20px' }}>
          {skills.length > 0 && (
            <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Technical Skills</h2>
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '8px' }}>
                  <div style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px` }}>{g.category}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {g.skills.map((s, i) => (
                      <span key={i} style={{ padding: '2px 8px', backgroundColor: `${design.accentColor}15`, color: design.accentColor, borderRadius: '4px', fontSize: `${design.fontSize - 2}px` }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '8px' }}>
                  <strong style={{ fontSize: `${design.fontSize}px` }}>{edu.degree}</strong>
                  <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#555' }}>{edu.institution}</p>
                  <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Certifications</h2>
              {certifications.map((c) => <div key={c.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '6px' }}><strong>{c.name}</strong><br/>{c.issuer}</div>)}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
