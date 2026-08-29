import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const TimelineTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  const TimelineDot = ({ color = design.accentColor, size = 14 }: { color?: string; size?: number }) => (
    <div style={{ width: `${size}px`, height: `${size}px`, borderRadius: '50%', background: `linear-gradient(135deg, ${color}, ${color}cc)`, flexShrink: 0, boxShadow: `0 0 0 3px ${color}20` }} />
  );

  const TimelineLine = () => (
    <div style={{ width: '2px', flex: 1, background: `linear-gradient(180deg, ${design.accentColor}40, ${design.accentColor}10)`, marginLeft: '6px', marginTop: '4px' }} />
  );

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1e293b', backgroundColor: '#fff', minHeight: '297mm' }}>
      {/* Header with photo */}
      <div style={{
        background: `linear-gradient(135deg, ${design.accentColor} 0%, ${design.accentColor}dd 50%, ${design.accentColor}bb 100%)`,
        color: '#fff', padding: `${design.margins + 5}mm ${design.margins}mm`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
              {personalInfo.email && <span style={{ fontSize: `${design.fontSize - 1.5}px`, background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: '20px' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: `${design.fontSize - 1.5}px`, background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: '20px' }}>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: `${design.fontSize - 1.5}px`, background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: '20px' }}>📍 {personalInfo.location}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: `${design.margins}mm`, display: 'flex', gap: '30px' }}>
        {/* Left: timeline content */}
        <div style={{ flex: 2 }}>
          {/* Summary */}
          {summary && (
            <div style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff' }}>★</div>
                <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: '#1e293b', margin: 0 }}>About Me</h2>
              </div>
              <div style={{ padding: '12px 16px', background: '#f8fafc', borderRadius: '8px', borderLeft: `3px solid ${design.accentColor}`, color: '#475569', whiteSpace: 'pre-line', fontSize: `${design.fontSize - 0.5}px` }}>{summary}</div>
            </div>
          )}

          {/* Experience Timeline */}
          {experience.length > 0 && (
            <div style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff' }}>💼</div>
                <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: '#1e293b', margin: 0 }}>Experience</h2>
              </div>
              {experience.map((exp, idx) => (
                <div key={exp.id} style={{ display: 'flex', gap: '14px', marginBottom: idx < experience.length - 1 ? '4px' : '0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TimelineDot />
                    {idx < experience.length - 1 && <TimelineLine />}
                  </div>
                  <div style={{ flex: 1, paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                      <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#64748b', padding: '3px 10px', background: `${design.accentColor}10`, borderRadius: '12px', fontWeight: 500, whiteSpace: 'nowrap', marginLeft: '12px' }}>
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p style={{ color: design.accentColor, fontWeight: 600, margin: '2px 0 6px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#64748b', marginBottom: '6px', whiteSpace: 'pre-line' }}>{exp.description}</p>}
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

          {/* Education Timeline */}
          {education.length > 0 && (
            <div style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff' }}>🎓</div>
                <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: '#1e293b', margin: 0 }}>Education</h2>
              </div>
              {education.map((edu, idx) => (
                <div key={edu.id} style={{ display: 'flex', gap: '14px', marginBottom: idx < education.length - 1 ? '4px' : '0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TimelineDot color="#94a3b8" />
                    {idx < education.length - 1 && <TimelineLine />}
                  </div>
                  <div style={{ flex: 1, paddingBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                      <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#94a3b8' }}>{edu.startDate} – {edu.endDate}</span>
                    </div>
                    <p style={{ color: '#64748b', fontWeight: 500, margin: '2px 0 0', fontSize: `${design.fontSize - 0.5}px` }}>{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects Timeline */}
          {projects.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff' }}>🚀</div>
                <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: '#1e293b', margin: 0 }}>Projects</h2>
              </div>
              {projects.map((p) => (
                <div key={p.id} style={{ marginBottom: '10px', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px', borderLeft: `4px solid ${design.accentColor}` }}>
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
        </div>

        {/* Right sidebar */}
        <div style={{ width: '28%' }}>
          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '20px', padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Skills</h3>
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: `${design.fontSize - 1.5}px`, color: '#0f172a', marginBottom: '6px' }}>{g.category}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {g.skills.map((s, i) => (
                      <span key={i} style={{ fontSize: `${design.fontSize - 1.5}px`, color: '#fff', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, padding: '3px 10px', borderRadius: '10px', fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div style={{ marginBottom: '20px', padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Languages</h3>
              {languages.map((l) => (
                <div key={l.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', background: design.accentColor, borderRadius: '50%' }} />
                  <strong style={{ color: '#0f172a' }}>{l.language}</strong>
                  <span style={{ color: '#94a3b8' }}>{l.proficiency}</span>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Certifications</h3>
              {certifications.map((c) => (
                <div key={c.id} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '20px', height: '20px', background: design.accentColor, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#fff', fontWeight: 700, flexShrink: 0 }}>✓</div>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px` }}>{c.name}</span>
                    <p style={{ color: '#94a3b8', fontSize: `${design.fontSize - 1.5}px`, margin: '1px 0 0' }}>{c.issuer}</p>
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
