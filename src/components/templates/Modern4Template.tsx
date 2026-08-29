import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Modern4Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  const SectionTitle = ({ title }: { title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
      <div style={{ width: '4px', height: '24px', backgroundColor: design.accentColor, borderRadius: '2px' }} />
      <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>{title}</h2>
    </div>
  );

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      {/* Header with accent left border */}
      <div style={{ borderLeft: `4px solid ${design.accentColor}`, paddingLeft: '20px', marginBottom: `${design.sectionSpacing * 1.5}px` }}>
        <h1 style={{ fontSize: `${design.headingSize + 12}px`, fontWeight: 800, margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 3}px`, color: design.accentColor, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '10px', fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      {summary && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <SectionTitle title="Professional Summary" />
          <p style={{ whiteSpace: 'pre-line', color: '#374151', paddingLeft: '14px' }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <SectionTitle title="Work Experience" />
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px', paddingLeft: '14px', borderLeft: `2px solid ${design.accentColor}30` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: `${design.fontSize + 1}px` }}>{exp.position}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ color: design.accentColor, fontWeight: 500, fontSize: `${design.fontSize}px` }}>{exp.company}</p>
              {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#374151', whiteSpace: 'pre-line' }}>{exp.description}</p>}
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <SectionTitle title="Education" />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px', paddingLeft: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p style={{ color: '#555' }}>{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <SectionTitle title="Skills" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingLeft: '14px' }}>
            {skills.map((g) => g.skills.map((s, i) => (
              <span key={`${g.id}-${i}`} style={{ border: `1px solid ${design.accentColor}`, color: design.accentColor, padding: '4px 12px', borderRadius: '20px', fontSize: `${design.fontSize - 1}px` }}>{s}</span>
            )))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <SectionTitle title="Projects" />
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '10px', paddingLeft: '14px' }}>
              <strong>{p.name}</strong>
              {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px` }}>{p.description}</p>}
              {p.technologies.length > 0 && <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{p.technologies.join(' · ')}</p>}
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          <SectionTitle title="Certifications" />
          {certifications.map((c) => <div key={c.id} style={{ marginBottom: '6px', paddingLeft: '14px' }}><strong>{c.name}</strong> — {c.issuer} ({c.date})</div>)}
        </section>
      )}

      {languages.length > 0 && (
        <section>
          <SectionTitle title="Languages" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingLeft: '14px' }}>
            {languages.map((l) => <span key={l.id} style={{ fontSize: `${design.fontSize - 1}px` }}><strong>{l.language}</strong> ({l.proficiency})</span>)}
          </div>
        </section>
      )}
    </div>
  );
};
