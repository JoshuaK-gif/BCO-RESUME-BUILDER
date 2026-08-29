import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const ModernTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;
  const sectionOrder = design.sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages'];

  const SectionTitle = ({ children, icon }: { children: React.ReactNode; icon?: string }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '14px',
      paddingBottom: '8px',
      borderBottom: '2px solid #e8ecf1',
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        flexShrink: 0,
      }}>
        <span style={{ color: '#fff', fontWeight: 700 }}>{icon || '●'}</span>
      </div>
      <h2 style={{
        fontSize: `${design.headingSize - 1}px`,
        fontWeight: 700,
        color: '#1e293b',
        margin: 0,
        letterSpacing: '0.02em',
      }}>
        {children}
      </h2>
    </div>
  );

  const ContactBadge = ({ children, icon }: { children: React.ReactNode; icon: string }) => (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: `${design.fontSize - 1.5}px`,
      color: '#475569',
      backgroundColor: '#f1f5f9',
      padding: '3px 10px',
      borderRadius: '20px',
      border: '1px solid #e2e8f0',
    }}>
      <span style={{ fontSize: '10px' }}>{icon}</span>
      {children}
    </div>
  );

  return (
    <div style={{
      fontFamily: design.font,
      fontSize: `${design.fontSize}px`,
      lineHeight: design.lineHeight,
      color: '#334155',
      backgroundColor: '#fff',
      minHeight: '297mm',
    }}>
      {/* Header with gradient */}
      <div style={{
        background: `linear-gradient(135deg, ${design.accentColor} 0%, ${design.accentColor}dd 50%, ${design.accentColor}bb 100%)`,
        color: '#fff',
        padding: `${design.margins + 6}mm ${design.margins}mm ${design.margins + 4}mm`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '160px', height: '160px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20px', left: '30%',
          width: '100px', height: '100px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
        }} />
        <div style={{
          position: 'absolute', top: '20px', left: '-30px',
          width: '80px', height: '80px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />

        {/* Photo circle placeholder */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '80px', height: '80px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            border: '3px solid rgba(255,255,255,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            fontWeight: 700,
            flexShrink: 0,
          }}>
            {(personalInfo.fullName || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: `${design.nameSize || 28}px`,
              fontWeight: 800,
              margin: 0,
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.professionalTitle && (
              <p style={{
                fontSize: `${design.subtitleSize || 15}px`,
                opacity: 0.92,
                marginTop: '4px',
                fontWeight: 400,
                letterSpacing: '0.03em',
              }}>
                {personalInfo.professionalTitle}
              </p>
            )}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginTop: '14px',
            }}>
              {personalInfo.email && <ContactBadge icon="✉">{personalInfo.email}</ContactBadge>}
              {personalInfo.phone && <ContactBadge icon="☎">{personalInfo.phone}</ContactBadge>}
              {personalInfo.location && <ContactBadge icon="📍">{personalInfo.location}</ContactBadge>}
              {personalInfo.linkedin && <ContactBadge icon="🔗">{personalInfo.linkedin}</ContactBadge>}
              {personalInfo.github && <ContactBadge icon="⚙">{personalInfo.github}</ContactBadge>}
              {personalInfo.website && <ContactBadge icon="🌐">{personalInfo.website}</ContactBadge>}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: `${design.margins}mm` }}>
        {sectionOrder.map((sectionId) => {
          switch (sectionId) {
            case 'summary':
              return summary ? (
                <section key="summary" style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
                  <SectionTitle icon="★">Professional Summary</SectionTitle>
                  <div style={{
                    padding: '12px 16px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    borderLeft: `3px solid ${design.accentColor}`,
                    color: '#475569',
                    whiteSpace: 'pre-line',
                    fontSize: `${design.fontSize - 0.5}px`,
                  }}>
                    {summary}
                  </div>
                </section>
              ) : null;

            case 'experience':
              return experience.length > 0 ? (
                <section key="experience" style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
                  <SectionTitle icon="💼">Work Experience</SectionTitle>
                  {experience.map((exp, idx) => (
                    <div key={exp.id} style={{
                      marginBottom: idx < experience.length - 1 ? '16px' : '0',
                      paddingBottom: idx < experience.length - 1 ? '16px' : '0',
                      borderBottom: idx < experience.length - 1 ? '1px solid #f1f5f9' : 'none',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#0f172a', margin: 0 }}>
                            {exp.position}
                          </h3>
                          <p style={{ color: design.accentColor, fontWeight: 600, margin: '2px 0 0', fontSize: `${design.fontSize - 0.5}px` }}>
                            {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                          </p>
                        </div>
                        <span style={{
                          fontSize: `${design.fontSize - 2}px`,
                          color: '#64748b',
                          whiteSpace: 'nowrap',
                          marginLeft: '12px',
                          padding: '3px 10px',
                          background: `${design.accentColor}10`,
                          borderRadius: '12px',
                          fontWeight: 500,
                        }}>
                          {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      {exp.description && (
                        <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#64748b', margin: '6px 0', whiteSpace: 'pre-line' }}>
                          {exp.description}
                        </p>
                      )}
                      {exp.achievements.length > 0 && (
                        <ul style={{
                          margin: '6px 0 0',
                          paddingLeft: '0',
                          listStyle: 'none',
                          fontSize: `${design.fontSize - 0.5}px`,
                          color: '#334155',
                        }}>
                          {exp.achievements.map((ach, i) => ach && (
                            <li key={i} style={{
                              marginBottom: '4px',
                              lineHeight: 1.5,
                              paddingLeft: '18px',
                              position: 'relative',
                            }}>
                              <span style={{
                                position: 'absolute',
                                left: 0,
                                color: design.accentColor,
                                fontWeight: 700,
                              }}>→</span>
                              {ach}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </section>
              ) : null;

            case 'education':
              return education.length > 0 ? (
                <section key="education" style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
                  <SectionTitle icon="🎓">Education</SectionTitle>
                  {education.map((edu, idx) => (
                    <div key={edu.id} style={{
                      marginBottom: idx < education.length - 1 ? '12px' : '0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}>
                      <div>
                        <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#0f172a', margin: 0 }}>
                          {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                        </h3>
                        <p style={{ color: '#64748b', fontWeight: 500, margin: '2px 0 0', fontSize: `${design.fontSize - 0.5}px` }}>
                          {edu.institution}
                        </p>
                        {edu.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#94a3b8', marginTop: '4px' }}>{edu.description}</p>}
                      </div>
                      <span style={{
                        fontSize: `${design.fontSize - 2}px`,
                        color: '#64748b',
                        padding: '3px 10px',
                        background: `${design.accentColor}10`,
                        borderRadius: '12px',
                        fontWeight: 500,
                      }}>
                        {edu.startDate} – {edu.endDate}
                      </span>
                    </div>
                  ))}
                </section>
              ) : null;

            case 'skills':
              return skills.length > 0 ? (
                <section key="skills" style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
                  <SectionTitle icon="⚡">Skills</SectionTitle>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {skills.map((group) => (
                      <div key={group.id} style={{
                        padding: '12px 14px',
                        background: '#f8fafc',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                      }}>
                        <div style={{
                          fontWeight: 700,
                          color: design.accentColor,
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          fontSize: `${design.fontSize - 1.5}px`,
                        }}>
                          {group.category}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                          {group.skills.map((skill, i) => (
                            <span key={i} style={{
                              fontSize: `${design.fontSize - 1.5}px`,
                              color: '#fff',
                              background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`,
                              padding: '3px 10px',
                              borderRadius: '12px',
                              fontWeight: 500,
                            }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'projects':
              return projects.length > 0 ? (
                <section key="projects" style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
                  <SectionTitle icon="🚀">Projects</SectionTitle>
                  {projects.map((proj, idx) => (
                    <div key={proj.id} style={{
                      marginBottom: idx < projects.length - 1 ? '12px' : '0',
                      padding: '12px 14px',
                      background: '#f8fafc',
                      borderRadius: '10px',
                      borderLeft: `4px solid ${design.accentColor}`,
                    }}>
                      <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{proj.name}</h3>
                      {proj.link && <p style={{ fontSize: `${design.fontSize - 1}px`, color: design.accentColor, margin: '2px 0' }}>{proj.link}</p>}
                      {proj.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#64748b', margin: '4px 0 0' }}>{proj.description}</p>}
                      {proj.technologies.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                          {proj.technologies.map((t, i) => (
                            <span key={i} style={{
                              display: 'inline-block',
                              padding: '2px 8px',
                              background: `${design.accentColor}15`,
                              color: design.accentColor,
                              borderRadius: '8px',
                              fontSize: `${design.fontSize - 1.5}px`,
                              fontWeight: 600,
                            }}>{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </section>
              ) : null;

            case 'certifications':
              return certifications.length > 0 ? (
                <section key="certifications" style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
                  <SectionTitle icon="🏆">Certifications</SectionTitle>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {certifications.map((cert) => (
                      <div key={cert.id} style={{
                        padding: '10px 12px',
                        background: '#f8fafc',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}>
                        <div style={{
                          width: '28px', height: '28px',
                          background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`,
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          color: '#fff',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}>✓</div>
                        <div>
                          <span style={{ fontWeight: 700, fontSize: `${design.fontSize - 1}px`, color: '#0f172a' }}>{cert.name}</span>
                          <p style={{ color: '#94a3b8', fontSize: `${design.fontSize - 1.5}px`, margin: '1px 0 0' }}>
                            {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;

            case 'languages':
              return languages.length > 0 ? (
                <section key="languages">
                  <SectionTitle icon="🌍">Languages</SectionTitle>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {languages.map((lang) => (
                      <div key={lang.id} style={{
                        padding: '8px 16px',
                        background: `${design.accentColor}08`,
                        borderRadius: '24px',
                        border: `1.5px solid ${design.accentColor}30`,
                        fontSize: `${design.fontSize - 0.5}px`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}>
                        <span style={{
                          width: '8px', height: '8px',
                          background: design.accentColor,
                          borderRadius: '50%',
                          display: 'inline-block',
                        }} />
                        <strong style={{ color: '#0f172a' }}>{lang.language}</strong>
                        <span style={{ color: '#94a3b8', fontSize: `${design.fontSize - 1.5}px` }}>{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};
