import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Combination2Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 2 }}>
          <h1 style={{ fontSize: `${design.headingSize + 14}px`, fontWeight: 700, margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, color: design.accentColor, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        </div>
        <div style={{ flex: 1, textAlign: 'right', fontSize: `${design.fontSize - 1}px`, color: '#666' }}>
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div>
          {summary && <section style={{ marginBottom: '16px' }}><h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px' }}>Summary</h2><p style={{ whiteSpace: 'pre-line', color: '#374151', fontSize: `${design.fontSize - 0.5}px` }}>{summary}</p></section>}

          {experience.length > 0 && (
            <section style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px' }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '10px' }}>
                  <strong style={{ fontWeight: 700, fontSize: `${design.fontSize}px` }}>{exp.position}</strong>
                  <p style={{ color: '#666', fontSize: `${design.fontSize - 1}px`, margin: '2px 0' }}>{exp.company} · {exp.startDate} – {exp.current ? 'Present' : exp.endDate}</p>
                  {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '16px', fontSize: `${design.fontSize - 1}px` }}>{exp.achievements.slice(0, 3).map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '8px' }}>
                  <strong style={{ fontSize: `${design.fontSize}px` }}>{edu.degree}</strong>
                  <p style={{ color: '#666', fontSize: `${design.fontSize - 1}px`, margin: '2px 0' }}>{edu.institution} · {edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        <div>
          {skills.length > 0 && (
            <section style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px' }}>Skills</h2>
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: `${design.fontSize - 1}px`, marginBottom: '4px' }}>{g.category}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {g.skills.map((s, i) => (
                      <span key={`${g.id}-${i}`} style={{ padding: '2px 8px', backgroundColor: `${design.accentColor}15`, fontSize: `${design.fontSize - 1}px`, borderRadius: '4px' }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {languages.length > 0 && (
            <section style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px' }}>Languages</h2>
              {languages.map((l) => <div key={l.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '4px' }}>{l.language} ({l.proficiency})</div>)}
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px' }}>Certifications</h2>
              {certifications.map((c) => <div key={c.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '4px' }}><strong>{c.name}</strong></div>)}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
