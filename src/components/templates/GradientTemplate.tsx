import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const GradientTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  const SectionTitle = ({ title, icon }: { title: string; icon?: string }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px',
      paddingBottom: '8px',
      background: `linear-gradient(90deg, ${design.accentColor}15 0%, transparent 100%)`,
      borderRadius: '4px', paddingLeft: '10px',
    }}>
      <div style={{
        width: '26px', height: '26px', borderRadius: '6px',
        background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '11px', color: '#fff', flexShrink: 0,
      }}>{icon || '●'}</div>
      <h2 style={{
        fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: design.accentColor,
        margin: 0, letterSpacing: '0.02em',
      }}>{title}</h2>
    </div>
  );

  return (
    <div style={{
      fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight,
      color: '#334155', backgroundColor: '#fff', minHeight: '297mm',
    }}>
      {/* Gradient Header with photo circle */}
      <div style={{
        background: `linear-gradient(135deg, ${design.accentColor} 0%, ${design.accentColor}dd 50%, ${design.accentColor}bb 100%)`,
        color: '#fff', padding: `${design.margins + 6}mm ${design.margins}mm ${design.margins + 4}mm`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative shapes */}
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: '-30px', left: '25%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', top: '30px', left: '-40px', width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', transform: 'rotate(45deg)' }} />

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '85px', height: '85px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: '3px solid rgba(255,255,255,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', fontWeight: 700, flexShrink: 0,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}>
            {(personalInfo.fullName || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: `${design.nameSize + 4}px`, fontWeight: 800, margin: 0,
              letterSpacing: '-0.01em', lineHeight: 1.1,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.professionalTitle && (
              <p style={{
                fontSize: `${design.subtitleSize}px`, opacity: 0.92, marginTop: '4px',
                fontWeight: 400, letterSpacing: '0.03em',
              }}>{personalInfo.professionalTitle}</p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
              {personalInfo.email && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: `${design.fontSize - 1.5}px`,
                  background: 'rgba(255,255,255,0.15)', padding: '3px 10px',
                  borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)',
                }}>✉ {personalInfo.email}</span>
              )}
              {personalInfo.phone && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: `${design.fontSize - 1.5}px`,
                  background: 'rgba(255,255,255,0.15)', padding: '3px 10px',
                  borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)',
                }}>☎ {personalInfo.phone}</span>
              )}
              {personalInfo.location && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: `${design.fontSize - 1.5}px`,
                  background: 'rgba(255,255,255,0.15)', padding: '3px 10px',
                  borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)',
                }}>📍 {personalInfo.location}</span>
              )}
              {personalInfo.linkedin && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: `${design.fontSize - 1.5}px`,
                  background: 'rgba(255,255,255,0.15)', padding: '3px 10px',
                  borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)',
                }}>🔗 {personalInfo.linkedin}</span>
              )}
              {personalInfo.github && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: `${design.fontSize - 1.5}px`,
                  background: 'rgba(255,255,255,0.15)', padding: '3px 10px',
                  borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)',
                }}>⚙ {personalInfo.github}</span>
              )}
              {personalInfo.website && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: `${design.fontSize - 1.5}px`,
                  background: 'rgba(255,255,255,0.15)', padding: '3px 10px',
                  borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)',
                }}>🌐 {personalInfo.website}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: `${design.margins}mm` }}>
        {summary && (
          <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
            <SectionTitle title="Professional Summary" icon="★" />
            <div style={{
              padding: '12px 16px', background: '#f8fafc', borderRadius: '8px',
              borderLeft: `3px solid ${design.accentColor}`, color: '#475569',
              whiteSpace: 'pre-line', fontSize: `${design.fontSize - 0.5}px`,
            }}>{summary}</div>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
            <SectionTitle title="Work Experience" icon="💼" />
            {experience.map((exp, idx) => (
              <div key={exp.id} style={{
                marginBottom: idx < experience.length - 1 ? '16px' : '0',
                paddingBottom: idx < experience.length - 1 ? '16px' : '0',
                borderBottom: idx < experience.length - 1 ? '1px solid #f1f5f9' : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                    <p style={{ color: design.accentColor, fontWeight: 600, margin: '2px 0 0', fontSize: `${design.fontSize - 0.5}px` }}>
                      {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                    </p>
                  </div>
                  <span style={{
                    fontSize: `${design.fontSize - 2}px`, color: '#64748b', whiteSpace: 'nowrap', marginLeft: '12px',
                    padding: '3px 10px', background: `${design.accentColor}10`, borderRadius: '12px', fontWeight: 500,
                  }}>
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
          </section>
        )}

        {skills.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
            <SectionTitle title="Skills" icon="⚡" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map((group) =>
                group.skills.map((skill, i) => (
                  <span key={`${group.id}-${i}`} style={{
                    background: `linear-gradient(135deg, ${design.accentColor}15, ${design.accentColor}08)`,
                    color: design.accentColor,
                    padding: '5px 14px', borderRadius: '20px',
                    fontSize: `${design.fontSize - 1}px`, fontWeight: 600,
                    border: `1px solid ${design.accentColor}20`,
                  }}>{skill}</span>
                ))
              )}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
            <SectionTitle title="Education" icon="🎓" />
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#0f172a', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                  <p style={{ color: '#64748b', fontWeight: 500, margin: '2px 0 0', fontSize: `${design.fontSize - 0.5}px` }}>{edu.institution}</p>
                </div>
                <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#64748b', padding: '3px 10px', background: `${design.accentColor}10`, borderRadius: '12px', fontWeight: 500 }}>
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
            <SectionTitle title="Projects" icon="🚀" />
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px', padding: '12px 14px', background: '#f8fafc', borderRadius: '8px', borderLeft: `4px solid ${design.accentColor}` }}>
                <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{proj.name}</h3>
                {proj.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#64748b', margin: '4px 0' }}>{proj.description}</p>}
                {proj.technologies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {proj.technologies.map((t, i) => (
                      <span key={i} style={{ padding: '2px 8px', background: `${design.accentColor}15`, color: design.accentColor, borderRadius: '8px', fontSize: `${design.fontSize - 1.5}px`, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
            <SectionTitle title="Certifications" icon="🏆" />
            {certifications.map((c) => (
              <div key={c.id} style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '22px', height: '22px',
                  background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`,
                  borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '10px', color: '#fff', fontWeight: 700, flexShrink: 0,
                }}>✓</div>
                <span style={{ fontWeight: 600, fontSize: `${design.fontSize - 0.5}px`, color: '#0f172a' }}>{c.name}</span>
                <span style={{ color: '#94a3b8', fontSize: `${design.fontSize - 1.5}px` }}>— {c.issuer}{c.date ? ` (${c.date})` : ''}</span>
              </div>
            ))}
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <SectionTitle title="Languages" icon="🌍" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {languages.map((lang) => (
                <span key={lang.id} style={{
                  padding: '6px 14px',
                  background: `${design.accentColor}08`,
                  borderRadius: '20px', border: `1.5px solid ${design.accentColor}25`,
                  fontSize: `${design.fontSize - 0.5}px`,
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <span style={{ width: '8px', height: '8px', background: design.accentColor, borderRadius: '50%' }} />
                  <strong style={{ color: '#0f172a' }}>{lang.language}</strong>
                  <span style={{ color: '#94a3b8', fontSize: `${design.fontSize - 1.5}px` }}>{lang.proficiency}</span>
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
