import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const AcademicTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, publications } = content;
  const sec = (t: string) => <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#1e3a5f', marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px solid #1e3a5f' }}>{t}</h2>;

  return (
    <div style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, padding: `${design.margins}mm`, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm' }}>
      <header style={{ marginBottom: '24px', textAlign: 'center', paddingBottom: '12px', borderBottom: '1px solid #333' }}>
        <h1 style={{ fontSize: `${design.headingSize + 10}px`, fontWeight: 700, margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontStyle: 'italic', marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4px 16px', marginTop: '8px', fontSize: `${design.fontSize - 1}px`, color: '#555' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {summary && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Research Interests / Summary')}<p style={{ whiteSpace: 'pre-line', fontStyle: 'italic' }}>{summary}</p></section>}

      {education.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          {sec('Education')}
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>, {edu.institution} ({edu.startDate}–{edu.endDate})
              {edu.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, fontStyle: 'italic' }}>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          {sec('Academic & Professional Experience')}
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><strong>{exp.position}</strong><span style={{ color: '#888', fontSize: `${design.fontSize - 1}px` }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span></div>
              <p style={{ fontStyle: 'italic', marginBottom: '4px' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
              {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px` }}>{exp.description}</p>}
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {publications && publications.length > 0 && (
        <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
          {sec('Publications')}
          {publications.map((p) => <div key={p.id} style={{ marginBottom: '6px' }}>{p.title}. <em>{p.publisher}</em>, {p.date}.{p.url && ` ${p.url}`}</div>)}
        </section>
      )}

      {projects.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Research Projects')}{projects.map((p) => <div key={p.id} style={{ marginBottom: '8px' }}><strong>{p.name}</strong> — {p.description}</div>)}</section>}

      {skills.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Skills & Expertise')}{skills.map((g) => <div key={g.id} style={{ marginBottom: '4px' }}><strong>{g.category}:</strong> {g.skills.join(', ')}</div>)}</section>}

      {certifications.length > 0 && <section style={{ marginBottom: `${design.sectionSpacing}px` }}>{sec('Certifications')}{certifications.map((c) => <div key={c.id}>{c.name} — {c.issuer} ({c.date})</div>)}</section>}

      {languages.length > 0 && <section>{sec('Languages')}{languages.map((l) => <span key={l.id} style={{ marginRight: '16px' }}>{l.language} ({l.proficiency})</span>)}</section>}
    </div>
  );
};
