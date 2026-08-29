import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const CreativeTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  const SidebarSection = ({ title, icon, children }: { title: string; icon?: string; children?: React.ReactNode }) => (
    <div style={{ marginBottom: '22px' }}>
      <h3 style={{
        fontSize: `${design.fontSize - 1}px`, fontWeight: 700, marginBottom: '10px',
        textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fff',
        paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.25)',
        display: 'flex', alignItems: 'center', gap: '6px',
      }}>
        <span style={{ fontSize: '12px' }}>{icon || '●'}</span> {title}
      </h3>
      {children}
    </div>
  );

  const MainSection = ({ title, icon }: { title: string; icon?: string }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px',
    }}>
      <div style={{
        width: '28px', height: '28px', borderRadius: '6px',
        background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '12px', color: '#fff', flexShrink: 0,
      }}>{icon || '●'}</div>
      <h2 style={{
        fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: design.accentColor,
        margin: 0, letterSpacing: '0.02em', paddingBottom: '6px',
        borderBottom: `2px solid ${design.accentColor}20`,
        flex: 1,
      }}>{title}</h2>
    </div>
  );

  return (
    <div style={{
      fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight,
      color: '#333', backgroundColor: '#fff', minHeight: '297mm',
    }}>
      <div style={{ display: 'flex', minHeight: '297mm' }}>
        {/* Sidebar with vibrant gradient */}
        <div style={{
          width: '34%',
          background: `linear-gradient(160deg, ${design.accentColor} 0%, ${design.accentColor}ee 60%, ${design.accentColor}dd 100%)`,
          color: '#fff', padding: `${design.margins + 2}mm ${design.margins}mm`,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative elements */}
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', bottom: '60px', left: '-25px', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', top: '40%', right: '10px', width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', transform: 'rotate(45deg)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Photo circle */}
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              border: '3px solid rgba(255,255,255,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', fontSize: '32px', fontWeight: 700,
            }}>
              {(personalInfo.fullName || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>

            {/* Name & Title */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <h1 style={{ fontSize: `${design.headingSize + 4}px`, fontWeight: 800, margin: 0, lineHeight: 1.15, wordBreak: 'break-word' }}>
                {personalInfo.fullName || 'Your Name'}
              </h1>
              {personalInfo.professionalTitle && (
                <p style={{ fontSize: `${design.fontSize}px`, opacity: 0.9, marginTop: '6px', fontWeight: 400 }}>
                  {personalInfo.professionalTitle}
                </p>
              )}
            </div>

            {/* Contact */}
            <SidebarSection title="Contact" icon="✉">
              <div style={{ fontSize: `${design.fontSize - 1}px`, lineHeight: 2.2 }}>
                {personalInfo.email && <div style={{ wordBreak: 'break-all', opacity: 0.9 }}>✉ {personalInfo.email}</div>}
                {personalInfo.phone && <div style={{ opacity: 0.9 }}>☎ {personalInfo.phone}</div>}
                {personalInfo.location && <div style={{ opacity: 0.9 }}>📍 {personalInfo.location}</div>}
                {personalInfo.linkedin && <div style={{ wordBreak: 'break-all', opacity: 0.9 }}>🔗 {personalInfo.linkedin}</div>}
                {personalInfo.github && <div style={{ wordBreak: 'break-all', opacity: 0.9 }}>⚙ {personalInfo.github}</div>}
                {personalInfo.website && <div style={{ wordBreak: 'break-all', opacity: 0.9 }}>🌐 {personalInfo.website}</div>}
              </div>
            </SidebarSection>

            {/* Skills with dots */}
            {skills.length > 0 && (
              <SidebarSection title="Skills" icon="⚡">
                {skills.map((g) => (
                  <div key={g.id} style={{ marginBottom: '14px' }}>
                    <div style={{ fontWeight: 700, fontSize: `${design.fontSize - 1}px`, marginBottom: '6px', opacity: 0.95 }}>{g.category}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {g.skills.map((s, i) => (
                        <span key={i} style={{
                          fontSize: `${design.fontSize - 1.5}px`, opacity: 0.9,
                          background: 'rgba(255,255,255,0.15)',
                          padding: '3px 10px', borderRadius: '12px',
                          border: '1px solid rgba(255,255,255,0.2)',
                        }}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </SidebarSection>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <SidebarSection title="Languages" icon="🌍">
                {languages.map((l) => (
                  <div key={l.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '4px', opacity: 0.85 }}>
                    <span style={{ width: '6px', height: '6px', background: 'rgba(255,255,255,0.6)', borderRadius: '50%', display: 'inline-block', marginRight: '6px' }} />
                    {l.language} — {l.proficiency}
                  </div>
                ))}
              </SidebarSection>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <SidebarSection title="Certifications" icon="🏆">
                {certifications.map((c) => (
                  <div key={c.id} style={{ fontSize: `${design.fontSize - 1.5}px`, marginBottom: '8px', opacity: 0.85 }}>
                    <div style={{ fontWeight: 600 }}>✓ {c.name}</div>
                    <div style={{ opacity: 0.8, marginLeft: '14px' }}>{c.issuer} · {c.date}</div>
                  </div>
                ))}
              </SidebarSection>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: `${design.margins + 2}mm ${design.margins}mm` }}>
          {summary && (
            <div style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
              <MainSection title="About Me" icon="★" />
              <div style={{
                padding: '12px 16px', background: '#f8fafc', borderRadius: '8px',
                borderLeft: `3px solid ${design.accentColor}`, color: '#475569',
                whiteSpace: 'pre-line', fontSize: `${design.fontSize - 0.5}px`,
              }}>{summary}</div>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
              <MainSection title="Experience" icon="💼" />
              {experience.map((exp, idx) => (
                <div key={exp.id} style={{
                  marginBottom: idx < experience.length - 1 ? '16px' : '0',
                  paddingLeft: '14px', borderLeft: `3px solid ${design.accentColor}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#1a1a1a', margin: 0 }}>{exp.position}</h3>
                    <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#888', whiteSpace: 'nowrap', marginLeft: '10px', padding: '2px 8px', background: `${design.accentColor}08`, borderRadius: '8px' }}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p style={{ color: design.accentColor, fontWeight: 600, fontSize: `${design.fontSize - 0.5}px`, margin: '2px 0 6px' }}>
                    {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                  </p>
                  {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#444', marginBottom: '6px', whiteSpace: 'pre-line' }}>{exp.description}</p>}
                  {exp.achievements.length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: '0', listStyle: 'none', fontSize: `${design.fontSize - 0.5}px`, color: '#333' }}>
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

          {projects.length > 0 && (
            <div style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
              <MainSection title="Projects" icon="🚀" />
              {projects.map((p) => (
                <div key={p.id} style={{ marginBottom: '10px', paddingLeft: '14px', borderLeft: `3px solid ${design.accentColor}` }}>
                  <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#1a1a1a', margin: 0 }}>{p.name}</h3>
                  {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#444', margin: '4px 0' }}>{p.description}</p>}
                  {p.technologies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                      {p.technologies.map((t, i) => (
                        <span key={i} style={{ padding: '2px 8px', background: `${design.accentColor}12`, color: design.accentColor, borderRadius: '6px', fontSize: `${design.fontSize - 1.5}px`, fontWeight: 600 }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <MainSection title="Education" icon="🎓" />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#1a1a1a', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                    <p style={{ color: '#555', fontWeight: 500, margin: '2px 0 0', fontSize: `${design.fontSize - 0.5}px` }}>{edu.institution}</p>
                  </div>
                  <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#888', padding: '2px 8px', background: `${design.accentColor}08`, borderRadius: '8px' }}>
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
