import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const PremiumInfographicTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1e293b', backgroundColor: '#f8fafc', minHeight: '297mm' }}>
      {/* Gradient header with photo */}
      <div style={{
        background: `linear-gradient(135deg, ${design.accentColor} 0%, ${design.accentColor}dd 50%, ${design.accentColor}bb 100%)`,
        color: '#fff', padding: `${design.margins + 5}mm ${design.margins}mm ${design.margins + 3}mm`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: '-15px', left: '25%', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)', border: '3px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', fontWeight: 700, flexShrink: 0,
          }}>
            {(personalInfo.fullName || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: `${design.nameSize + 4}px`, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.professionalTitle && <p style={{ fontSize: `${design.subtitleSize}px`, opacity: 0.9, marginTop: '4px', fontWeight: 400 }}>{personalInfo.professionalTitle}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
              {personalInfo.email && <span style={{ fontSize: `${design.fontSize - 1.5}px`, background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: '20px' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: `${design.fontSize - 1.5}px`, background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: '20px' }}>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: `${design.fontSize - 1.5}px`, background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: '20px' }}>📍 {personalInfo.location}</span>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: `${design.margins}mm`, display: 'flex', gap: '20px' }}>
        {/* Left: 2/3 width */}
        <div style={{ flex: 2 }}>
          {/* Summary with infographic style */}
          {summary && (
            <div style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#fff' }}>★</div>
                <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: '#1e293b', margin: 0 }}>About Me</h2>
              </div>
              <div style={{ padding: '12px 16px', background: '#fff', borderRadius: '10px', borderLeft: `4px solid ${design.accentColor}`, color: '#475569', whiteSpace: 'pre-line', fontSize: `${design.fontSize - 0.5}px`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>{summary}</div>
            </div>
          )}

          {/* Experience with timeline */}
          {experience.length > 0 && (
            <div style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#fff' }}>💼</div>
                <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: '#1e293b', margin: 0 }}>Experience</h2>
              </div>
              {experience.map((exp, idx) => (
                <div key={exp.id} style={{ display: 'flex', gap: '12px', marginBottom: idx < experience.length - 1 ? '4px' : '0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, flexShrink: 0, boxShadow: `0 0 0 3px ${design.accentColor}20` }} />
                    {idx < experience.length - 1 && <div style={{ width: '2px', flex: 1, background: `linear-gradient(180deg, ${design.accentColor}40, ${design.accentColor}10)`, marginLeft: '5px', marginTop: '4px' }} />}
                  </div>
                  <div style={{ flex: 1, paddingBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                      <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#64748b', padding: '3px 10px', background: `${design.accentColor}10`, borderRadius: '12px', fontWeight: 500, whiteSpace: 'nowrap', marginLeft: '10px' }}>
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p style={{ color: design.accentColor, fontWeight: 600, margin: '2px 0 6px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#64748b', marginBottom: '4px', whiteSpace: 'pre-line' }}>{exp.description}</p>}
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
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#fff' }}>🎓</div>
                <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: '#1e293b', margin: 0 }}>Education</h2>
              </div>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px', padding: '10px 14px', background: '#fff', borderRadius: '10px', borderLeft: `4px solid ${design.accentColor}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                    <p style={{ color: '#64748b', fontWeight: 500, margin: '2px 0 0', fontSize: `${design.fontSize - 0.5}px` }}>{edu.institution}</p>
                  </div>
                  <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#64748b', padding: '3px 10px', background: `${design.accentColor}10`, borderRadius: '12px' }}>{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right sidebar: 1/3 width */}
        <div style={{ width: '33%' }}>
          {/* Skills with visual bars */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '16px', padding: '14px', background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>⚡ Skills</h3>
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '14px' }}>
                  <div style={{ fontWeight: 700, fontSize: `${design.fontSize - 1.5}px`, color: '#0f172a', marginBottom: '8px' }}>{g.category}</div>
                  {g.skills.map((s, i) => (
                    <div key={i} style={{ marginBottom: '6px' }}>
                      <div style={{ fontSize: `${design.fontSize - 1.5}px`, color: '#475569', marginBottom: '3px' }}>{s}</div>
                      <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${70 + Math.random() * 30}%`, background: `linear-gradient(90deg, ${design.accentColor}, ${design.accentColor}cc)`, borderRadius: '3px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Languages with dots */}
          {languages.length > 0 && (
            <div style={{ marginBottom: '16px', padding: '14px', background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>🌍 Languages</h3>
              {languages.map((l) => (
                <div key={l.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', background: design.accentColor, borderRadius: '50%' }} />
                  <strong style={{ color: '#0f172a' }}>{l.language}</strong>
                  <span style={{ color: '#94a3b8', fontSize: `${design.fontSize - 1.5}px` }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div style={{ padding: '14px', background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>🏆 Certifications</h3>
              {certifications.map((c) => (
                <div key={c.id} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '18px', height: '18px', background: design.accentColor, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#fff', fontWeight: 700, flexShrink: 0 }}>✓</div>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px` }}>{c.name}</span>
                    <p style={{ color: '#94a3b8', fontSize: `${design.fontSize - 1.5}px`, margin: '1px 0 0' }}>{c.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div style={{ marginTop: '16px', padding: '14px', background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>🚀 Projects</h3>
              {projects.map((p) => (
                <div key={p.id} style={{ marginBottom: '8px' }}>
                  <h3 style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px`, color: '#0f172a', margin: 0 }}>{p.name}</h3>
                  {p.description && <p style={{ fontSize: `${design.fontSize - 1.5}px`, color: '#64748b', margin: '2px 0' }}>{p.description}</p>}
                  {p.technologies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '3px' }}>
                      {p.technologies.map((t, i) => (
                        <span key={i} style={{ padding: '1px 6px', background: `${design.accentColor}15`, color: design.accentColor, borderRadius: '4px', fontSize: `${design.fontSize - 2}px`, fontWeight: 600 }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
