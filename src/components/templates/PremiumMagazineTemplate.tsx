import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const PremiumMagazineTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1e293b', backgroundColor: '#fff', minHeight: '297mm' }}>
      {/* Magazine-style header */}
      <div style={{ padding: `${design.margins + 4}mm ${design.margins}mm ${design.margins + 2}mm`, borderBottom: `4px solid ${design.accentColor}` }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{
            width: '90px', height: '90px', borderRadius: '12px', flexShrink: 0,
            background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '30px', fontWeight: 700, color: '#fff',
            boxShadow: `0 4px 15px ${design.accentColor}30`,
          }}>
            {(personalInfo.fullName || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: `${design.nameSize + 6}px`, fontWeight: 900, margin: 0, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#0f172a' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.professionalTitle && (
              <p style={{ fontSize: `${design.subtitleSize + 2}px`, color: design.accentColor, marginTop: '4px', fontWeight: 600, letterSpacing: '0.02em' }}>
                {personalInfo.professionalTitle}
              </p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', marginTop: '10px', fontSize: `${design.fontSize - 1}px`, color: '#64748b' }}>
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Magazine body: 3-column grid */}
      <div style={{ padding: `${design.margins}mm`, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        {/* Column 1: Summary + Experience */}
        <div>
          {summary && (
            <div style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
              <div style={{ background: `${design.accentColor}10`, padding: '14px', borderRadius: '10px', borderLeft: `4px solid ${design.accentColor}` }}>
                <p style={{ whiteSpace: 'pre-line', color: '#475569', fontSize: `${design.fontSize - 0.5}px`, fontStyle: 'italic', lineHeight: 1.6 }}>{summary}</p>
              </div>
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 800, color: '#0f172a', marginBottom: '12px', paddingBottom: '6px', borderBottom: `3px solid ${design.accentColor}`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Experience</h2>
              {experience.map((exp, idx) => (
                <div key={exp.id} style={{ marginBottom: idx < experience.length - 1 ? '14px' : '0' }}>
                  <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                  <p style={{ color: design.accentColor, fontWeight: 600, fontSize: `${design.fontSize - 1}px`, margin: '2px 0' }}>{exp.company}</p>
                  <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#94a3b8' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  {exp.achievements.length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: '0', listStyle: 'none', fontSize: `${design.fontSize - 1}px`, color: '#334155' }}>
                      {exp.achievements.map((a, i) => a && (
                        <li key={i} style={{ marginBottom: '2px', lineHeight: 1.4, paddingLeft: '14px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: design.accentColor }}>•</span>{a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column 2: Education + Skills */}
        <div>
          {education.length > 0 && (
            <div style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 800, color: '#0f172a', marginBottom: '12px', paddingBottom: '6px', borderBottom: `3px solid ${design.accentColor}`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '12px', padding: '10px', background: '#f8fafc', borderRadius: '8px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                  <p style={{ color: '#64748b', fontSize: `${design.fontSize - 1}px`, margin: '2px 0' }}>{edu.institution}</p>
                  <p style={{ fontSize: `${design.fontSize - 2}px`, color: '#94a3b8' }}>{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 800, color: '#0f172a', marginBottom: '12px', paddingBottom: '6px', borderBottom: `3px solid ${design.accentColor}`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Skills</h2>
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: `${design.fontSize - 1.5}px`, color: design.accentColor, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{g.category}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {g.skills.map((s, i) => (
                      <span key={i} style={{ padding: '3px 10px', background: `${design.accentColor}12`, color: design.accentColor, borderRadius: '6px', fontSize: `${design.fontSize - 1.5}px`, fontWeight: 600 }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {projects.length > 0 && (
            <div style={{ marginTop: `${design.sectionSpacing + 4}px` }}>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 800, color: '#0f172a', marginBottom: '12px', paddingBottom: '6px', borderBottom: `3px solid ${design.accentColor}`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Projects</h2>
              {projects.map((p) => (
                <div key={p.id} style={{ marginBottom: '10px', padding: '10px', background: '#f8fafc', borderRadius: '8px', borderLeft: `3px solid ${design.accentColor}` }}>
                  <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize - 0.5}px`, color: '#0f172a', margin: 0 }}>{p.name}</h3>
                  {p.description && <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#64748b', margin: '2px 0' }}>{p.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column 3: Certifications + Languages */}
        <div>
          {certifications.length > 0 && (
            <div style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 800, color: '#0f172a', marginBottom: '12px', paddingBottom: '6px', borderBottom: `3px solid ${design.accentColor}`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Certifications</h2>
              {certifications.map((c) => (
                <div key={c.id} style={{ marginBottom: '10px', padding: '10px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '24px', height: '24px', background: design.accentColor, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff', fontWeight: 700, flexShrink: 0 }}>✓</div>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: `${design.fontSize - 1}px`, color: '#0f172a' }}>{c.name}</span>
                    <p style={{ color: '#94a3b8', fontSize: `${design.fontSize - 2}px`, margin: '1px 0 0' }}>{c.issuer}{c.date ? ` · ${c.date}` : ''}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 800, color: '#0f172a', marginBottom: '12px', paddingBottom: '6px', borderBottom: `3px solid ${design.accentColor}`, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Languages</h2>
              {languages.map((l) => (
                <div key={l.id} style={{ marginBottom: '8px', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', background: design.accentColor, borderRadius: '50%', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#0f172a' }}>{l.language}</strong>
                    <span style={{ fontSize: `${design.fontSize - 1.5}px`, color: '#94a3b8', marginLeft: '6px' }}>{l.proficiency}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
