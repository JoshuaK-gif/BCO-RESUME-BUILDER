import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const PremiumMultiColorTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  // Derive secondary colors from the accent
  const secondary = design.accentColor + '18';
  const tertiary = design.accentColor + '08';

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1e293b', backgroundColor: '#fff', minHeight: '297mm' }}>
      {/* Multi-gradient header */}
      <div style={{
        background: `linear-gradient(135deg, ${design.accentColor} 0%, ${design.accentColor}ee 40%, ${design.accentColor}cc 70%, ${design.accentColor}aa 100%)`,
        color: '#fff', padding: `${design.margins + 6}mm ${design.margins}mm ${design.margins + 4}mm`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: '-20px', left: '20%', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', top: '30px', left: '-30px', width: '70px', height: '70px', borderRadius: '14px', background: 'rgba(255,255,255,0.04)', transform: 'rotate(45deg)' }} />

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '85px', height: '85px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)', border: '3px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '30px', fontWeight: 700, flexShrink: 0,
          }}>
            {(personalInfo.fullName || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: `${design.nameSize + 6}px`, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.professionalTitle && <p style={{ fontSize: `${design.subtitleSize + 1}px`, opacity: 0.9, marginTop: '4px', fontWeight: 400 }}>{personalInfo.professionalTitle}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
              {personalInfo.email && <span style={{ fontSize: `${design.fontSize - 1.5}px`, background: 'rgba(255,255,255,0.18)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: `${design.fontSize - 1.5}px`, background: 'rgba(255,255,255,0.18)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: `${design.fontSize - 1.5}px`, background: 'rgba(255,255,255,0.18)', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>📍 {personalInfo.location}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Body with colored sections */}
      <div style={{ padding: `${design.margins}mm` }}>
        {/* Summary - colored block */}
        {summary && (
          <div style={{ marginBottom: `${design.sectionSpacing + 4}px`, padding: '16px 20px', background: secondary, borderRadius: '12px', borderLeft: `5px solid ${design.accentColor}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px' }}>★</span>
              <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, margin: 0 }}>Professional Summary</h2>
            </div>
            <p style={{ whiteSpace: 'pre-line', color: '#334155', fontSize: `${design.fontSize}px` }}>{summary}</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Left column */}
          <div>
            {/* Experience */}
            {experience.length > 0 && (
              <div style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#fff' }}>💼</div>
                  <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#0f172a', margin: 0 }}>Experience</h2>
                </div>
                {experience.map((exp, idx) => (
                  <div key={exp.id} style={{ marginBottom: idx < experience.length - 1 ? '16px' : '0', paddingBottom: idx < experience.length - 1 ? '16px' : '0', borderBottom: idx < experience.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                      <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#64748b', padding: '3px 10px', background: `${design.accentColor}10`, borderRadius: '12px', fontWeight: 500, whiteSpace: 'nowrap', marginLeft: '10px' }}>
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p style={{ color: design.accentColor, fontWeight: 600, margin: '2px 0 6px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    {exp.achievements.length > 0 && (
                      <ul style={{ margin: '4px 0 0', paddingLeft: '0', listStyle: 'none', fontSize: `${design.fontSize - 0.5}px`, color: '#334155' }}>
                        {exp.achievements.map((a, i) => a && (
                          <li key={i} style={{ marginBottom: '3px', lineHeight: 1.5, paddingLeft: '16px', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 0, color: design.accentColor, fontWeight: 700 }}>→</span>{a}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#fff' }}>🎓</div>
                  <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#0f172a', margin: 0 }}>Education</h2>
                </div>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '12px', padding: '10px 14px', background: tertiary, borderRadius: '10px', borderLeft: `3px solid ${design.accentColor}` }}>
                    <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                    <p style={{ color: '#64748b', fontWeight: 500, margin: '2px 0', fontSize: `${design.fontSize - 0.5}px` }}>{edu.institution}</p>
                    <p style={{ fontSize: `${design.fontSize - 2}px`, color: '#94a3b8' }}>{edu.startDate} – {edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column */}
          <div>
            {/* Skills */}
            {skills.length > 0 && (
              <div style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#fff' }}>⚡</div>
                  <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#0f172a', margin: 0 }}>Skills</h2>
                </div>
                {skills.map((g) => (
                  <div key={g.id} style={{ marginBottom: '14px', padding: '12px 14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 700, fontSize: `${design.fontSize - 1}px`, color: design.accentColor, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{g.category}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {g.skills.map((s, i) => (
                        <span key={i} style={{ fontSize: `${design.fontSize - 1.5}px`, color: '#fff', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, padding: '4px 12px', borderRadius: '14px', fontWeight: 500 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#fff' }}>🚀</div>
                  <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#0f172a', margin: 0 }}>Projects</h2>
                </div>
                {projects.map((p) => (
                  <div key={p.id} style={{ marginBottom: '10px', padding: '12px', background: '#f8fafc', borderRadius: '10px', borderLeft: `4px solid ${design.accentColor}` }}>
                    <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{p.name}</h3>
                    {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#64748b', margin: '4px 0' }}>{p.description}</p>}
                    {p.technologies.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                        {p.technologies.map((t, i) => (
                          <span key={i} style={{ padding: '2px 8px', background: `${design.accentColor}15`, color: design.accentColor, borderRadius: '8px', fontSize: `${design.fontSize - 1.5}px`, fontWeight: 600 }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Certifications + Languages */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {certifications.length > 0 && (
                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>🏆 Certs</h3>
                  {certifications.map((c) => (
                    <div key={c.id} style={{ marginBottom: '6px', fontSize: `${design.fontSize - 1.5}px` }}>
                      <div style={{ fontWeight: 600 }}>✓ {c.name}</div>
                      <div style={{ color: '#94a3b8' }}>{c.issuer}</div>
                    </div>
                  ))}
                </div>
              )}
              {languages.length > 0 && (
                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>🌍 Languages</h3>
                  {languages.map((l) => (
                    <div key={l.id} style={{ fontSize: `${design.fontSize - 1.5}px`, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '5px', height: '5px', background: design.accentColor, borderRadius: '50%' }} />
                      <strong>{l.language}</strong> <span style={{ color: '#94a3b8' }}>{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
