import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Modern12Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm' }}>
      {/* Header with geometric accent */}
      <div style={{ position: 'relative', padding: `${design.margins * 1.5}mm ${design.margins}mm`, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', backgroundColor: `${design.accentColor}10`, borderRadius: '0 0 0 100%' }} />
        <div style={{ position: 'absolute', top: '40px', right: '60px', width: '100px', height: '100px', backgroundColor: `${design.accentColor}08`, borderRadius: '50%' }} />
        <h1 style={{ fontSize: `${design.headingSize + 14}px`, fontWeight: 800, margin: 0, position: 'relative' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 3}px`, color: design.accentColor, marginTop: '4px', position: 'relative' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px', fontSize: `${design.fontSize - 1}px`, color: '#6b7280', position: 'relative' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      <div style={{ padding: `0 ${design.margins}mm ${design.margins}mm` }}>
        {summary && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '24px', height: '24px', backgroundColor: design.accentColor, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>01</span>
              Profile
            </h2>
            <p style={{ whiteSpace: 'pre-line', color: '#374151', paddingLeft: '32px' }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '24px', height: '24px', backgroundColor: design.accentColor, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>02</span>
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px', paddingLeft: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: `${design.fontSize + 1}px` }}>{exp.position}</strong>
                  <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p style={{ color: design.accentColor, fontWeight: 500 }}>{exp.company}</p>
                {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#374151', whiteSpace: 'pre-line' }}>{exp.description}</p>}
                {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '24px', height: '24px', backgroundColor: design.accentColor, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>03</span>
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px', paddingLeft: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</strong>
                  <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{edu.startDate} – {edu.endDate}</span>
                </div>
                <p style={{ color: '#555' }}>{edu.institution}</p>
              </div>
            ))}
          </section>
        )}

        <div style={{ display: 'flex', gap: '30px' }}>
          {skills.length > 0 && (
            <section style={{ flex: 1, marginBottom: `${design.sectionSpacing}px` }}>
              <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '24px', height: '24px', backgroundColor: design.accentColor, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>04</span>
                Skills
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map((g) => g.skills.map((s, i) => (
                  <span key={`${g.id}-${i}`} style={{ backgroundColor: `${design.accentColor}15`, color: design.accentColor, padding: '4px 10px', borderRadius: '4px', fontSize: `${design.fontSize - 1}px` }}>{s}</span>
                )))}
              </div>
            </section>
          )}

          {languages.length > 0 && (
            <section style={{ flex: 1, marginBottom: `${design.sectionSpacing}px` }}>
              <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '24px', height: '24px', backgroundColor: design.accentColor, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>05</span>
                Languages
              </h2>
              {languages.map((l) => <div key={l.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '4px' }}>{l.language} ({l.proficiency})</div>)}
            </section>
          )}
        </div>

        {projects.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '24px', height: '24px', backgroundColor: design.accentColor, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>06</span>
              Projects
            </h2>
            {projects.map((p) => (
              <div key={p.id} style={{ marginBottom: '10px', paddingLeft: '32px' }}>
                <strong>{p.name}</strong>
                {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px` }}>{p.description}</p>}
                {p.technologies.length > 0 && <p style={{ fontSize: `${design.fontSize - 1}px`, color: '#6b7280' }}>{p.technologies.join(' · ')}</p>}
              </div>
            ))}
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '24px', height: '24px', backgroundColor: design.accentColor, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>07</span>
              Certifications
            </h2>
            {certifications.map((c) => <div key={c.id} style={{ marginBottom: '6px', paddingLeft: '32px' }}><strong>{c.name}</strong> — {c.issuer} ({c.date})</div>)}
          </section>
        )}
      </div>
    </div>
  );
};
