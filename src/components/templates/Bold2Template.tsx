import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Bold2Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      <div style={{ backgroundColor: design.accentColor, color: '#fff', padding: '24px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: `${design.headingSize + 16}px`, fontWeight: 800, margin: 0, textTransform: 'uppercase' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 3}px`, opacity: 0.9, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px', fontSize: `${design.fontSize - 1}px`, opacity: 0.9 }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {summary && <section style={{ marginBottom: '20px' }}><h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 800, color: design.accentColor, marginBottom: '8px', textTransform: 'uppercase' }}>Profile</h2><p style={{ whiteSpace: 'pre-line', color: '#374151' }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 800, color: design.accentColor, marginBottom: '12px', textTransform: 'uppercase' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontWeight: 800, fontSize: `${design.fontSize + 1}px` }}>{exp.position}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#666' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ color: design.accentColor, fontWeight: 700 }}>{exp.company}</p>
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 800, color: design.accentColor, marginBottom: '10px', textTransform: 'uppercase' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontWeight: 800 }}>{edu.degree}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#666' }}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p style={{ color: '#555' }}>{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 800, color: design.accentColor, marginBottom: '8px', textTransform: 'uppercase' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((g) => g.skills.map((s, i) => (
              <span key={`${g.id}-${i}`} style={{ padding: '4px 12px', backgroundColor: design.accentColor, color: '#fff', fontSize: `${design.fontSize - 1}px`, fontWeight: 700 }}>{s}</span>
            )))}
          </div>
        </section>
      )}
    </div>
  );
};
