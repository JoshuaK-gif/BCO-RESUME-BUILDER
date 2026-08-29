import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const BoldTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  const SectionTitle = ({ title, icon }: { title: string; icon?: string }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px',
      paddingBottom: '8px', borderBottom: `3px solid ${design.accentColor}`,
    }}>
      <div style={{
        width: '30px', height: '30px', borderRadius: '6px',
        background: design.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '13px', color: '#fff', fontWeight: 700, flexShrink: 0,
      }}>{icon || '●'}</div>
      <h2 style={{
        fontSize: `${design.headingSize + 1}px`, fontWeight: 900, color: '#0f172a',
        margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em',
      }}>{title}</h2>
    </div>
  );

  return (
    <div style={{
      fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight,
      color: '#1e293b', backgroundColor: '#fff', minHeight: '297mm',
    }}>
      {/* Bold header with geometric accents */}
      <div style={{
        background: design.accentColor, color: '#fff',
        padding: `${design.margins + 5}mm ${design.margins}mm`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Geometric shapes */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '100%', background: 'rgba(255,255,255,0.06)', clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }} />
        <div style={{ position: 'absolute', bottom: '-20px', left: '20%', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Photo + name */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '16px',
              background: 'rgba(255,255,255,0.15)',
              border: '3px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '26px', fontWeight: 800, flexShrink: 0,
            }}>
              {(personalInfo.fullName || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 style={{
                fontSize: `${design.nameSize + 4}px`, fontWeight: 900, margin: 0,
                letterSpacing: '-0.01em', lineHeight: 1.1,
                textTransform: 'uppercase',
              }}>
                {personalInfo.fullName || 'Your Name'}
              </h1>
              {personalInfo.professionalTitle && (
                <p style={{
                  fontSize: `${design.fontSize + 3}px`, opacity: 0.9, marginTop: '4px',
                  fontWeight: 300, letterSpacing: '0.06em',
                }}>{personalInfo.professionalTitle}</p>
              )}
            </div>
          </div>

          {/* Contact badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '18px' }}>
            {personalInfo.email && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: `${design.fontSize - 1}px`, background: 'rgba(255,255,255,0.15)',
                padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)',
              }}>✉ {personalInfo.email}</span>
            )}
            {personalInfo.phone && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: `${design.fontSize - 1}px`, background: 'rgba(255,255,255,0.15)',
                padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)',
              }}>☎ {personalInfo.phone}</span>
            )}
            {personalInfo.location && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: `${design.fontSize - 1}px`, background: 'rgba(255,255,255,0.15)',
                padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)',
              }}>📍 {personalInfo.location}</span>
            )}
            {personalInfo.linkedin && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: `${design.fontSize - 1}px`, background: 'rgba(255,255,255,0.15)',
                padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)',
              }}>🔗 {personalInfo.linkedin}</span>
            )}
            {personalInfo.github && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: `${design.fontSize - 1}px`, background: 'rgba(255,255,255,0.15)',
                padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)',
              }}>⚙ {personalInfo.github}</span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: `${design.margins}mm` }}>
        {summary && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            <SectionTitle title="About" icon="★" />
            <div style={{
              padding: '12px 16px', background: '#f8fafc', borderRadius: '8px',
              borderLeft: `4px solid ${design.accentColor}`, color: '#475569',
              whiteSpace: 'pre-line', fontSize: `${design.fontSize}px`,
            }}>{summary}</div>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            <SectionTitle title="Experience" icon="💼" />
            {experience.map((exp, idx) => (
              <div key={exp.id} style={{
                marginBottom: idx < experience.length - 1 ? '18px' : '0',
                paddingBottom: idx < experience.length - 1 ? '18px' : '0',
                borderBottom: idx < experience.length - 1 ? '1px solid #e2e8f0' : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, margin: 0, color: '#0f172a' }}>{exp.position}</h3>
                  <span style={{
                    fontSize: `${design.fontSize - 1}px`, color: '#64748b', whiteSpace: 'nowrap', marginLeft: '12px',
                    padding: '3px 10px', background: `${design.accentColor}10`, borderRadius: '12px', fontWeight: 500,
                  }}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <p style={{ color: design.accentColor, fontWeight: 600, fontSize: `${design.fontSize}px`, margin: '2px 0 6px' }}>
                    {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                  </p>
                </div>
                {exp.description && <p style={{ fontSize: `${design.fontSize}px`, color: '#475569', whiteSpace: 'pre-line', marginBottom: '6px' }}>{exp.description}</p>}
                {exp.achievements.length > 0 && (
                  <ul style={{ margin: '4px 0 0', paddingLeft: '0', listStyle: 'none', fontSize: `${design.fontSize}px`, color: '#334155' }}>
                    {exp.achievements.map((a, i) => a && (
                      <li key={i} style={{ marginBottom: '3px', lineHeight: 1.5, paddingLeft: '18px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: design.accentColor, fontWeight: 700 }}>▸</span>{a}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            <SectionTitle title="Education" icon="🎓" />
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#0f172a', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                  <p style={{ color: '#64748b', margin: '2px 0 0', fontSize: `${design.fontSize}px` }}>{edu.institution}</p>
                </div>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#94a3b8', padding: '3px 10px', background: `${design.accentColor}08`, borderRadius: '12px' }}>
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            <SectionTitle title="Skills" icon="⚡" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {skills.map((g) => (
                <div key={g.id} style={{ padding: '10px 12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: 700, fontSize: `${design.fontSize - 1}px`, color: design.accentColor, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{g.category}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {g.skills.map((s, i) => (
                      <span key={i} style={{ fontSize: `${design.fontSize - 1}px`, color: '#fff', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, padding: '3px 10px', borderRadius: '10px', fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            <SectionTitle title="Projects" icon="🚀" />
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px', padding: '12px', background: '#f8fafc', borderRadius: '8px', borderLeft: `4px solid ${design.accentColor}` }}>
                <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#0f172a', margin: 0 }}>{proj.name}</h3>
                {proj.description && <p style={{ fontSize: `${design.fontSize}px`, color: '#475569', margin: '4px 0' }}>{proj.description}</p>}
                {proj.technologies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {proj.technologies.map((t, i) => (
                      <span key={i} style={{ padding: '2px 8px', background: `${design.accentColor}15`, color: design.accentColor, borderRadius: '6px', fontSize: `${design.fontSize - 1}px`, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            <SectionTitle title="Certifications" icon="🏆" />
            {certifications.map((c) => (
              <div key={c.id} style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '22px', height: '22px', background: design.accentColor, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff', fontWeight: 700, flexShrink: 0 }}>✓</div>
                <span style={{ fontWeight: 600, fontSize: `${design.fontSize}px` }}>{c.name}</span>
                <span style={{ color: '#94a3b8', fontSize: `${design.fontSize - 1}px` }}>— {c.issuer}{c.date ? ` (${c.date})` : ''}</span>
              </div>
            ))}
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <SectionTitle title="Languages" icon="🌍" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {languages.map((l) => (
                <span key={l.id} style={{
                  padding: '6px 14px', background: `${design.accentColor}08`,
                  borderRadius: '20px', border: `1.5px solid ${design.accentColor}25`,
                  fontSize: `${design.fontSize - 0.5}px`,
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <span style={{ width: '8px', height: '8px', background: design.accentColor, borderRadius: '50%' }} />
                  <strong style={{ color: '#0f172a' }}>{l.language}</strong>
                  <span style={{ color: '#94a3b8', fontSize: `${design.fontSize - 1.5}px` }}>{l.proficiency}</span>
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
