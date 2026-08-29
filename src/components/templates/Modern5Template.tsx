import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Modern5Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm' }}>
      {/* Dark Header */}
      <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: `${design.margins * 1.5}mm ${design.margins}mm` }}>
        <h1 style={{ fontSize: `${design.headingSize + 14}px`, fontWeight: 800, margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 3}px`, color: design.accentColor, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px', fontSize: `${design.fontSize - 1}px`, color: '#999' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      <div style={{ padding: `${design.margins}mm` }}>
        {summary && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#1a1a1a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '20px', height: '3px', backgroundColor: design.accentColor, display: 'inline-block' }} />
              Summary
            </h2>
            <p style={{ whiteSpace: 'pre-line', color: '#374151' }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#1a1a1a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '20px', height: '3px', backgroundColor: design.accentColor, display: 'inline-block' }} />
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #eee' }}>
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

        <div style={{ display: 'flex', gap: '30px' }}>
          <div style={{ flex: 1 }}>
            {education.length > 0 && (
              <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
                <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#1a1a1a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '20px', height: '3px', backgroundColor: design.accentColor, display: 'inline-block' }} />
                  Education
                </h2>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '10px' }}>
                    <strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>
                    <p style={{ color: '#555', fontSize: `${design.fontSize - 1}px` }}>{edu.institution}</p>
                    <p style={{ color: '#6b7280', fontSize: `${design.fontSize - 1}px` }}>{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </section>
            )}

            {projects.length > 0 && (
              <section>
                <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#1a1a1a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '20px', height: '3px', backgroundColor: design.accentColor, display: 'inline-block' }} />
                  Projects
                </h2>
                {projects.map((p) => (
                  <div key={p.id} style={{ marginBottom: '10px' }}>
                    <strong>{p.name}</strong>
                    {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px` }}>{p.description}</p>}
                    {p.technologies.length > 0 && <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{p.technologies.join(', ')}</p>}
                  </div>
                ))}
              </section>
            )}
          </div>

          <div style={{ flex: 1 }}>
            {skills.length > 0 && (
              <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
                <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#1a1a1a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '20px', height: '3px', backgroundColor: design.accentColor, display: 'inline-block' }} />
                  Skills
                </h2>
                {skills.map((g) => (
                  <div key={g.id} style={{ marginBottom: '8px' }}>
                    <div style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px` }}>{g.category}</div>
                    <div style={{ fontSize: `${design.fontSize - 1}px`, color: '#555' }}>{g.skills.join(', ')}</div>
                  </div>
                ))}
              </section>
            )}

            {languages.length > 0 && (
              <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
                <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#1a1a1a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '20px', height: '3px', backgroundColor: design.accentColor, display: 'inline-block' }} />
                  Languages
                </h2>
                {languages.map((l) => <div key={l.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '4px' }}>{l.language} ({l.proficiency})</div>)}
              </section>
            )}

            {certifications.length > 0 && (
              <section>
                <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#1a1a1a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '20px', height: '3px', backgroundColor: design.accentColor, display: 'inline-block' }} />
                  Certifications
                </h2>
                {certifications.map((c) => <div key={c.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '6px' }}><strong>{c.name}</strong><br/>{c.issuer}</div>)}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
