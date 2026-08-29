import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const ProfessionalTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{
      fontSize: `${design.headingSize}px`,
      fontWeight: 700,
      color: '#1e293b',
      marginBottom: '12px',
      paddingBottom: '8px',
      borderBottom: `2px solid ${design.accentColor}`,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      <span style={{
        width: '6px',
        height: '6px',
        backgroundColor: design.accentColor,
        borderRadius: '50%',
        display: 'inline-block',
      }} />
      {children}
    </h2>
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
      {/* Header */}
      <header style={{
        marginBottom: '28px',
        paddingBottom: '20px',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{
              fontSize: `${design.headingSize + 12}px`,
              fontWeight: 700,
              margin: 0,
              color: '#0f172a',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.professionalTitle && (
              <p style={{
                color: design.accentColor,
                fontSize: `${design.fontSize + 3}px`,
                marginTop: '6px',
                fontWeight: 500,
              }}>
                {personalInfo.professionalTitle}
              </p>
            )}
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px 16px',
          marginTop: '14px',
          fontSize: `${design.fontSize - 1}px`,
          color: '#64748b',
          padding: '10px 0',
          borderTop: '1px solid #e2e8f0',
        }}>
          {personalInfo.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: design.accentColor, fontWeight: 600 }}>✉</span> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: design.accentColor, fontWeight: 600 }}>☎</span> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: design.accentColor, fontWeight: 600 }}>📍</span> {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: design.accentColor, fontWeight: 600 }}>in</span> {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.github && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: design.accentColor, fontWeight: 600 }}>⌨</span> {personalInfo.github}
            </span>
          )}
          {personalInfo.website && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: design.accentColor, fontWeight: 600 }}>🔗</span> {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Professional Summary</SectionTitle>
          <p style={{ whiteSpace: 'pre-line', color: '#475569' }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Work Experience</SectionTitle>
          {experience.map((exp, idx) => (
            <div key={exp.id} style={{
              marginBottom: idx < experience.length - 1 ? '18px' : '0',
              paddingBottom: idx < experience.length - 1 ? '18px' : '0',
              borderBottom: idx < experience.length - 1 ? '1px solid #f1f5f9' : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#0f172a', margin: 0 }}>
                  {exp.position}
                </h3>
                <span style={{
                  fontSize: `${design.fontSize - 1}px`,
                  color: '#94a3b8',
                  whiteSpace: 'nowrap',
                  marginLeft: '12px',
                  padding: '2px 8px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0',
                }}>
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p style={{
                color: design.accentColor,
                fontWeight: 600,
                marginBottom: '6px',
                fontSize: `${design.fontSize}px`,
              }}>
                {exp.company}{exp.location ? ` · ${exp.location}` : ''}
              </p>
              {exp.description && (
                <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#475569', marginBottom: '6px', whiteSpace: 'pre-line' }}>
                  {exp.description}
                </p>
              )}
              {exp.achievements.length > 0 && (
                <ul style={{
                  margin: '4px 0 0',
                  paddingLeft: '18px',
                  fontSize: `${design.fontSize - 0.5}px`,
                  color: '#334155',
                }}>
                  {exp.achievements.map((ach, i) => ach && (
                    <li key={i} style={{ marginBottom: '3px', lineHeight: 1.5 }}>{ach}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Education</SectionTitle>
          {education.map((edu, idx) => (
            <div key={edu.id} style={{ marginBottom: idx < education.length - 1 ? '12px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#0f172a', margin: 0 }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </h3>
                  <p style={{ color: '#475569', fontWeight: 500, margin: '2px 0 0' }}>{edu.institution}</p>
                </div>
                <span style={{
                  fontSize: `${design.fontSize - 1}px`,
                  color: '#94a3b8',
                  padding: '2px 8px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0',
                }}>
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              {edu.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#64748b', marginTop: '4px' }}>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Skills</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {skills.map((g) => (
              <div key={g.id} style={{
                padding: '10px 12px',
                backgroundColor: '#f8fafc',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{
                  fontWeight: 700,
                  fontSize: `${design.fontSize - 0.5}px`,
                  color: design.accentColor,
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {g.category}
                </div>
                <div style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#475569', lineHeight: 1.6 }}>
                  {g.skills.join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Projects</SectionTitle>
          {projects.map((p, idx) => (
            <div key={p.id} style={{
              marginBottom: idx < projects.length - 1 ? '12px' : '0',
              padding: '10px 12px',
              backgroundColor: '#f8fafc',
              borderRadius: '6px',
              borderLeft: `3px solid ${design.accentColor}`,
            }}>
              <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{p.name}</h3>
              {p.link && <p style={{ fontSize: `${design.fontSize - 1}px`, color: design.accentColor, margin: '2px 0' }}>{p.link}</p>}
              {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#475569', margin: '4px 0 0' }}>{p.description}</p>}
              {p.technologies.length > 0 && (
                <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#64748b', margin: '4px 0 0' }}>
                  {p.technologies.map((t, i) => (
                    <span key={i} style={{
                      display: 'inline-block',
                      padding: '1px 6px',
                      backgroundColor: `${design.accentColor}12`,
                      color: design.accentColor,
                      borderRadius: '3px',
                      marginRight: '4px',
                    }}>{t}</span>
                  ))}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Certifications</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            {certifications.map((c) => (
              <div key={c.id} style={{
                padding: '8px 10px',
                backgroundColor: '#f8fafc',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
              }}>
                <span style={{ fontWeight: 700, fontSize: `${design.fontSize - 0.5}px`, color: '#0f172a' }}>{c.name}</span>
                <span style={{ color: '#64748b', fontSize: `${design.fontSize - 1}px` }}> — {c.issuer}</span>
                {c.date && <span style={{ color: '#94a3b8', fontSize: `${design.fontSize - 1}px` }}> ({c.date})</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section>
          <SectionTitle>Languages</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {languages.map((l) => (
              <div key={l.id} style={{
                padding: '6px 14px',
                backgroundColor: '#f8fafc',
                borderRadius: '20px',
                border: `1px solid ${design.accentColor}25`,
                fontSize: `${design.fontSize - 0.5}px`,
              }}>
                <strong style={{ color: '#0f172a' }}>{l.language}</strong>
                <span style={{ color: '#64748b', marginLeft: '4px' }}>{l.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
