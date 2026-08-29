import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const ElegantTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  const SectionTitle = ({ title }: { title: string }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px',
      paddingBottom: '8px',
    }}>
      <span style={{ width: '30px', height: '1px', background: '#d1d5db' }} />
      <h2 style={{
        fontSize: `${design.headingSize - 1}px`, fontWeight: 400,
        color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.15em',
        margin: 0, whiteSpace: 'nowrap',
      }}>{title}</h2>
      <span style={{ flex: 1, height: '1px', background: '#d1d5db' }} />
    </div>
  );

  return (
    <div style={{
      fontFamily: '"Playfair Display", Georgia, serif',
      fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight,
      color: '#2d2d2d', backgroundColor: '#fff', minHeight: '297mm',
      padding: `${design.margins}mm`,
    }}>
      {/* Header with photo */}
      <header style={{
        marginBottom: '28px', textAlign: 'center', paddingBottom: '20px',
        borderBottom: '1px solid #e5e7eb',
      }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: '#f8f9fa', border: '2px solid #e5e7eb',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 14px', fontSize: '24px', fontWeight: 400,
          color: design.accentColor,
        }}>
          {(personalInfo.fullName || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <h1 style={{
          fontSize: `${design.headingSize + 14}px`, fontWeight: 400, margin: 0,
          letterSpacing: '0.08em', color: '#111827',
        }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.professionalTitle && (
          <p style={{
            fontSize: `${design.fontSize + 2}px`, color: design.accentColor,
            marginTop: '6px', fontStyle: 'italic',
          }}>{personalInfo.professionalTitle}</p>
        )}
        <div style={{
          display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4px 20px',
          marginTop: '14px', fontSize: `${design.fontSize - 1}px`, color: '#9ca3af',
        }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <SectionTitle title="Summary" />
          <p style={{
            whiteSpace: 'pre-line', fontStyle: 'italic', textAlign: 'center',
            color: '#555', fontSize: `${design.fontSize}px`,
            maxWidth: '80%', margin: '0 auto', lineHeight: 1.7,
          }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <SectionTitle title="Experience" />
          {experience.map((exp, idx) => (
            <div key={exp.id} style={{
              marginBottom: idx < experience.length - 1 ? '18px' : '0',
              paddingBottom: idx < experience.length - 1 ? '18px' : '0',
              borderBottom: idx < experience.length - 1 ? '1px solid #f3f4f6' : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: `${design.fontSize + 1}px`, color: '#111827' }}>{exp.position}</strong>
                <span style={{
                  color: '#9ca3af', fontSize: `${design.fontSize - 1}px`,
                  fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '12px',
                }}>
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p style={{
                color: design.accentColor, fontStyle: 'italic', marginBottom: '6px',
                fontSize: `${design.fontSize}px`,
              }}>
                {exp.company}{exp.location ? `, ${exp.location}` : ''}
              </p>
              {exp.description && (
                <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#555', marginBottom: '6px', whiteSpace: 'pre-line' }}>
                  {exp.description}
                </p>
              )}
              {exp.achievements.length > 0 && (
                <ul style={{
                  margin: '4px 0 0', paddingLeft: '18px',
                  fontSize: `${design.fontSize - 0.5}px`, color: '#374151',
                }}>
                  {exp.achievements.map((a, i) => a && (
                    <li key={i} style={{ marginBottom: '2px', lineHeight: 1.5 }}>{a}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <SectionTitle title="Education" />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <strong style={{ fontSize: `${design.fontSize + 1}px`, color: '#111827' }}>
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                </strong>, <em style={{ color: '#6b7280' }}>{edu.institution}</em>
              </div>
              <span style={{ color: '#9ca3af', fontSize: `${design.fontSize - 1}px`, fontStyle: 'italic' }}>
                {edu.startDate} – {edu.endDate}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <SectionTitle title="Skills" />
          {skills.map((g) => (
            <div key={g.id} style={{ marginBottom: '8px' }}>
              <em style={{ color: design.accentColor, fontWeight: 600, fontSize: `${design.fontSize - 0.5}px` }}>{g.category}:</em>
              <span style={{ marginLeft: '6px', fontSize: `${design.fontSize - 0.5}px` }}>{g.skills.join(', ')}</span>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <SectionTitle title="Projects" />
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '12px' }}>
              <strong style={{ fontSize: `${design.fontSize}px` }}>{p.name}</strong>
              {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#555', margin: '4px 0' }}>{p.description}</p>}
              {p.technologies.length > 0 && (
                <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#9ca3af', margin: '4px 0 0' }}>
                  {p.technologies.join(' · ')}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <SectionTitle title="Certifications" />
          {certifications.map((c) => (
            <div key={c.id} style={{ marginBottom: '4px', fontSize: `${design.fontSize - 0.5}px` }}>
              <strong>{c.name}</strong> — {c.issuer}{c.date ? ` (${c.date})` : ''}
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section>
          <SectionTitle title="Languages" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: `${design.fontSize - 0.5}px` }}>
            {languages.map((l) => (
              <span key={l.id}>
                <em style={{ color: '#111827' }}>{l.language}</em>
                <span style={{ color: '#9ca3af', marginLeft: '4px' }}>({l.proficiency})</span>
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
