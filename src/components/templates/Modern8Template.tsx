import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Modern8Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  const CardSection = ({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: '16px', padding: '16px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff' }}>{icon}</div>
        <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: '#1e293b', margin: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1e293b', backgroundColor: '#f1f5f9', minHeight: '297mm' }}>
      {/* Gradient header */}
      <div style={{
        background: `linear-gradient(135deg, ${design.accentColor} 0%, ${design.accentColor}dd 50%, ${design.accentColor}bb 100%)`,
        color: '#fff', padding: `${design.margins + 5}mm ${design.margins}mm ${design.margins + 3}mm`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', bottom: '-20px', left: '30%', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

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
              {personalInfo.email && <span style={{ fontSize: `${design.fontSize - 1.5}px`, background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>✉ {personalInfo.email}</span>}
              {personalInfo.phone && <span style={{ fontSize: `${design.fontSize - 1.5}px`, background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>☎ {personalInfo.phone}</span>}
              {personalInfo.location && <span style={{ fontSize: `${design.fontSize - 1.5}px`, background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>📍 {personalInfo.location}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Card-based body */}
      <div style={{ padding: `${design.margins}mm`, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        <div>
          {summary && (
            <CardSection title="About Me" icon="★">
              <p style={{ whiteSpace: 'pre-line', color: '#475569', fontSize: `${design.fontSize - 0.5}px` }}>{summary}</p>
            </CardSection>
          )}

          {experience.length > 0 && (
            <CardSection title="Experience" icon="💼">
              {experience.map((exp, idx) => (
                <div key={exp.id} style={{ marginBottom: idx < experience.length - 1 ? '14px' : '0', paddingBottom: idx < experience.length - 1 ? '14px' : '0', borderBottom: idx < experience.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                      <p style={{ color: design.accentColor, fontWeight: 600, margin: '2px 0 0', fontSize: `${design.fontSize - 0.5}px` }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    </div>
                    <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#64748b', padding: '3px 10px', background: `${design.accentColor}10`, borderRadius: '12px', fontWeight: 500, whiteSpace: 'nowrap', marginLeft: '12px' }}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#64748b', margin: '6px 0', whiteSpace: 'pre-line' }}>{exp.description}</p>}
                  {exp.achievements.length > 0 && (
                    <ul style={{ margin: '6px 0 0', paddingLeft: '0', listStyle: 'none', fontSize: `${design.fontSize - 0.5}px`, color: '#334155' }}>
                      {exp.achievements.map((a, i) => a && (
                        <li key={i} style={{ marginBottom: '4px', lineHeight: 1.5, paddingLeft: '18px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: design.accentColor, fontWeight: 700 }}>→</span>{a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </CardSection>
          )}

          {projects.length > 0 && (
            <CardSection title="Projects" icon="🚀">
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
            </CardSection>
          )}
        </div>

        <div>
          {/* Skills */}
          {skills.length > 0 && (
            <CardSection title="Skills" icon="⚡">
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: `${design.fontSize - 1.5}px`, color: design.accentColor, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{g.category}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {g.skills.map((s, i) => (
                      <span key={i} style={{ fontSize: `${design.fontSize - 1.5}px`, color: '#fff', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, padding: '3px 10px', borderRadius: '10px', fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </CardSection>
          )}

          {/* Education */}
          {education.length > 0 && (
            <CardSection title="Education" icon="🎓">
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '10px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                  <p style={{ color: '#64748b', fontWeight: 500, margin: '2px 0', fontSize: `${design.fontSize - 0.5}px` }}>{edu.institution}</p>
                  <p style={{ fontSize: `${design.fontSize - 2}px`, color: '#94a3b8' }}>{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </CardSection>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <CardSection title="Languages" icon="🌍">
              {languages.map((l) => (
                <div key={l.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', background: design.accentColor, borderRadius: '50%' }} />
                  <strong style={{ color: '#0f172a' }}>{l.language}</strong>
                  <span style={{ color: '#94a3b8' }}>{l.proficiency}</span>
                </div>
              ))}
            </CardSection>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <CardSection title="Certifications" icon="🏆">
              {certifications.map((c) => (
                <div key={c.id} style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '20px', height: '20px', background: design.accentColor, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#fff', fontWeight: 700, flexShrink: 0 }}>✓</div>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px` }}>{c.name}</span>
                    <p style={{ color: '#94a3b8', fontSize: `${design.fontSize - 1.5}px`, margin: '1px 0 0' }}>{c.issuer}</p>
                  </div>
                </div>
              ))}
            </CardSection>
          )}
        </div>
      </div>
    </div>
  );
};
