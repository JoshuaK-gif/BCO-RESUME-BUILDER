import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const ExecutiveTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{
      fontSize: `${design.headingSize}px`,
      fontWeight: 700,
      color: '#1a1a2e',
      marginBottom: '14px',
      paddingBottom: '8px',
      borderBottom: `2px solid ${design.accentColor}`,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    }}>
      {children}
    </h2>
  );

  return (
    <div style={{
      fontFamily: design.font,
      fontSize: `${design.fontSize}px`,
      lineHeight: design.lineHeight,
      color: '#2d2d2d',
      backgroundColor: '#fff',
      minHeight: '297mm',
    }}>
      {/* Header */}
      <header style={{
        textAlign: 'center',
        marginBottom: '28px',
        paddingBottom: '24px',
        borderBottom: `3px double ${design.accentColor}`,
      }}>
        <h1 style={{
          fontSize: `${design.headingSize + 16}px`,
          fontWeight: 800,
          color: '#1a1a2e',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          margin: 0,
          lineHeight: 1.1,
        }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.professionalTitle && (
          <p style={{
            fontSize: `${design.fontSize + 4}px`,
            color: design.accentColor,
            marginTop: '8px',
            fontWeight: 500,
            letterSpacing: '0.06em',
          }}>
            {personalInfo.professionalTitle}
          </p>
        )}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '6px 20px',
          marginTop: '16px',
          fontSize: `${design.fontSize - 1}px`,
          color: '#555',
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
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Executive Summary</SectionTitle>
          <p style={{ whiteSpace: 'pre-line', textAlign: 'justify', color: '#3d3d3d' }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Professional Experience</SectionTitle>
          {experience.map((exp, idx) => (
            <div key={exp.id} style={{
              marginBottom: idx < experience.length - 1 ? '20px' : '0',
              paddingLeft: '16px',
              borderLeft: `3px solid ${design.accentColor}40`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#1a1a2e', margin: 0 }}>
                  {exp.position}
                </h3>
                <span style={{
                  fontSize: `${design.fontSize - 1}px`,
                  color: '#888',
                  whiteSpace: 'nowrap',
                  marginLeft: '12px',
                }}>
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p style={{ color: design.accentColor, fontWeight: 600, marginBottom: '6px', fontSize: `${design.fontSize}px` }}>
                {exp.company}{exp.location ? ` | ${exp.location}` : ''}
              </p>
              {exp.description && (
                <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#444', marginBottom: '6px', whiteSpace: 'pre-line' }}>
                  {exp.description}
                </p>
              )}
              {exp.achievements.length > 0 && (
                <ul style={{
                  margin: '4px 0 0',
                  paddingLeft: '18px',
                  fontSize: `${design.fontSize - 0.5}px`,
                  color: '#3d3d3d',
                }}>
                  {exp.achievements.map((a, i) => a && (
                    <li key={i} style={{ marginBottom: '3px', lineHeight: 1.5 }}>{a}</li>
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
                  <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#1a1a2e', margin: 0 }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </h3>
                  <p style={{ color: '#555', fontWeight: 500, margin: '2px 0 0' }}>{edu.institution}</p>
                </div>
                <span style={{ color: '#888', fontSize: `${design.fontSize - 1}px` }}>
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              {edu.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#666', marginTop: '4px' }}>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Core Competencies */}
      {skills.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Core Competencies</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
            {skills.map((g) => (
              <div key={g.id} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontWeight: 700, color: '#1a1a2e', fontSize: `${design.fontSize - 0.5}px` }}>{g.category}</span>
                <span style={{ color: '#555', fontSize: `${design.fontSize - 0.5}px` }}>{g.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Key Projects</SectionTitle>
          {projects.map((p, idx) => (
            <div key={p.id} style={{ marginBottom: idx < projects.length - 1 ? '10px' : '0' }}>
              <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#1a1a2e', margin: 0 }}>{p.name}</h3>
              {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#444', margin: '2px 0' }}>{p.description}</p>}
              {p.technologies.length > 0 && (
                <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#888', margin: '2px 0 0' }}>
                  Technologies: {p.technologies.join(', ')}
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
          {certifications.map((c) => (
            <div key={c.id} style={{ marginBottom: '6px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: `${design.fontSize - 0.5}px` }}>{c.name}</span>
              <span style={{ color: '#888', fontSize: `${design.fontSize - 1}px` }}>— {c.issuer} ({c.date})</span>
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section>
          <SectionTitle>Languages</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {languages.map((l) => (
              <span key={l.id} style={{ fontSize: `${design.fontSize - 0.5}px` }}>
                <strong style={{ color: '#1a1a2e' }}>{l.language}</strong>
                <span style={{ color: '#888', marginLeft: '4px' }}>({l.proficiency})</span>
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
