import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const TechnologyTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;
  const sec = (title: string) => <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px', paddingBottom: '4px', borderBottom: `2px solid ${design.accentColor}` }}>{title}</h2>;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, padding: `${design.margins}mm`, color: '#222', backgroundColor: '#fff', minHeight: '297mm' }}>
      <header style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '2px solid #e5e7eb' }}>
        <h1 style={{ fontSize: `${design.headingSize + 10}px`, fontWeight: 800, margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ color: design.accentColor, fontSize: `${design.fontSize + 3}px`, marginTop: '4px', fontWeight: 500 }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginTop: '10px', fontSize: `${design.fontSize - 1}px`, color: '#666' }}>
          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.github && <span>GitHub: {personalInfo.github}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>🌐 {personalInfo.website}</span>}
        </div>
      </header>

      {summary && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('About')}<p style={{ whiteSpace: 'pre-line' }}>{summary}</p></section>}

      {/* Skills first for tech */}
      {skills.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          {sec('Technical Skills')}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px' }}>
            {skills.map((g) => (
              <div key={g.id}>
                <strong style={{ color: design.accentColor }}>{g.category}:</strong>
                <span style={{ marginLeft: '4px' }}>{g.skills.join(' · ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          {sec('Experience')}
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{exp.position}</strong><span style={{ color: '#888', fontSize: `${design.fontSize - 1}px` }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span></div>
              <p style={{ color: '#555', marginBottom: '4px' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
              {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px` }}>{exp.description}</p>}
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          {sec('Projects')}
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{p.name}</strong>{p.link && <span style={{ color: design.accentColor, fontSize: `${design.fontSize - 1}px` }}>{p.link}</span>}</div>
              {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px` }}>{p.description}</p>}
              {p.technologies.length > 0 && <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#888' }}>Stack: {p.technologies.join(', ')}</p>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          {sec('Education')}
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong><span style={{ color: '#888', fontSize: `${design.fontSize - 1}px` }}>{edu.startDate} – {edu.endDate}</span></div>
              <p style={{ color: '#555' }}>{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Certifications')}{certifications.map((c) => <div key={c.id}>{c.name} — {c.issuer} ({c.date})</div>)}</section>}

      {languages.length > 0 && <section>{sec('Languages')}{languages.map((l) => <span key={l.id} style={{ marginRight: '16px' }}>{l.language} ({l.proficiency})</span>)}</section>}
    </div>
  );
};
