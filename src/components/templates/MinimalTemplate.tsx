import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const MinimalTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{
      fontSize: `${design.headingSize - 2}px`, fontWeight: 600, color: '#111827',
      textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '12px',
      paddingBottom: '8px', borderBottom: '1.5px solid #e5e7eb',
      display: 'flex', alignItems: 'center', gap: '8px',
    }}>
      <span style={{
        width: '4px', height: '16px', background: design.accentColor,
        borderRadius: '2px', display: 'inline-block',
      }} />
      {children}
    </h2>
  );

  return (
    <div style={{
      fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight,
      color: '#1f2937', backgroundColor: '#fff', minHeight: '297mm',
    }}>
      {/* Header with photo circle */}
      <header style={{
        marginBottom: '28px', paddingBottom: '20px',
        borderBottom: '1.5px solid #e5e7eb',
        display: 'flex', gap: '20px', alignItems: 'center',
      }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: '#f3f4f6', border: '2px solid #e5e7eb',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '22px', fontWeight: 700, color: '#6b7280', flexShrink: 0,
        }}>
          {(personalInfo.fullName || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h1 style={{
            fontSize: `${design.headingSize + 10}px`, fontWeight: 700, margin: 0,
            color: '#111827', letterSpacing: '-0.01em', lineHeight: 1.1,
          }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.professionalTitle && (
            <p style={{
              color: '#6b7280', marginTop: '4px', fontSize: `${design.fontSize + 2}px`,
              fontWeight: 400, letterSpacing: '0.01em',
            }}>{personalInfo.professionalTitle}</p>
          )}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginTop: '12px',
            fontSize: `${design.fontSize - 1}px`, color: '#9ca3af',
          }}>
            {personalInfo.email && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: design.accentColor }}>✉</span> {personalInfo.email}</span>}
            {personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: design.accentColor }}>☎</span> {personalInfo.phone}</span>}
            {personalInfo.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: design.accentColor }}>📍</span> {personalInfo.location}</span>}
            {personalInfo.linkedin && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: design.accentColor }}>🔗</span> {personalInfo.linkedin}</span>}
            {personalInfo.github && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: design.accentColor }}>⚙</span> {personalInfo.github}</span>}
            {personalInfo.website && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: design.accentColor }}>🌐</span> {personalInfo.website}</span>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Summary</SectionTitle>
          <p style={{
            whiteSpace: 'pre-line', color: '#4b5563', fontSize: `${design.fontSize}px`,
            paddingLeft: '12px', borderLeft: `2px solid ${design.accentColor}30`,
          }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Experience</SectionTitle>
          {experience.map((exp, idx) => (
            <div key={exp.id} style={{
              marginBottom: idx < experience.length - 1 ? '18px' : '0',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontWeight: 600, fontSize: `${design.fontSize + 1}px`, color: '#111827', margin: 0 }}>
                  {exp.position}
                </h3>
                <span style={{ fontSize: `${design.fontSize - 1.5}px`, color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p style={{ color: '#6b7280', fontStyle: 'italic', marginBottom: '6px', fontSize: `${design.fontSize}px` }}>
                {exp.company}{exp.location ? `, ${exp.location}` : ''}
              </p>
              {exp.description && (
                <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#4b5563', marginBottom: '6px', whiteSpace: 'pre-line' }}>
                  {exp.description}
                </p>
              )}
              {exp.achievements.length > 0 && (
                <ul style={{
                  margin: 0, paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px`, color: '#374151',
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
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Education</SectionTitle>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <h3 style={{ fontWeight: 600, fontSize: `${design.fontSize + 1}px`, color: '#111827', margin: 0 }}>
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                </h3>
                <p style={{ color: '#6b7280', margin: '2px 0 0', fontSize: `${design.fontSize}px` }}>{edu.institution}</p>
              </div>
              <span style={{ color: '#9ca3af', fontSize: `${design.fontSize - 1.5}px` }}>
                {edu.startDate} – {edu.endDate}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Skills</SectionTitle>
          {skills.map((g) => (
            <div key={g.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: '#111827', fontSize: `${design.fontSize - 0.5}px`, marginRight: '4px' }}>{g.category}:</span>
                {g.skills.map((s, i) => (
                  <span key={i} style={{
                    fontSize: `${design.fontSize - 1}px`, color: '#4b5563',
                    background: '#f9fafb', padding: '2px 8px', borderRadius: '4px',
                    border: '1px solid #e5e7eb',
                  }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Projects</SectionTitle>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '12px' }}>
              <h3 style={{ fontWeight: 600, fontSize: `${design.fontSize}px`, color: '#111827', margin: 0 }}>
                {p.name}
                {p.link && <span style={{ color: '#9ca3af', fontSize: `${design.fontSize - 1}px`, fontWeight: 400, marginLeft: '8px' }}>{p.link}</span>}
              </h3>
              {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#4b5563', margin: '4px 0 0' }}>{p.description}</p>}
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
        <section style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((c) => (
            <div key={c.id} style={{ marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '6px', height: '6px', background: design.accentColor,
                borderRadius: '50%', flexShrink: 0,
              }} />
              <span style={{ fontWeight: 600, color: '#111827', fontSize: `${design.fontSize - 0.5}px` }}>{c.name}</span>
              <span style={{ color: '#6b7280', fontSize: `${design.fontSize - 1}px` }}> — {c.issuer}</span>
              {c.date && <span style={{ color: '#9ca3af', fontSize: `${design.fontSize - 1.5}px` }}>({c.date})</span>}
            </div>
          ))}
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section>
          <SectionTitle>Languages</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {languages.map((l) => (
              <span key={l.id} style={{
                fontSize: `${design.fontSize - 0.5}px`,
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <span style={{
                  width: '6px', height: '6px', background: design.accentColor,
                  borderRadius: '50%', display: 'inline-block',
                }} />
                <strong style={{ color: '#111827' }}>{l.language}</strong>
                <span style={{ color: '#9ca3af' }}>{l.proficiency}</span>
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
