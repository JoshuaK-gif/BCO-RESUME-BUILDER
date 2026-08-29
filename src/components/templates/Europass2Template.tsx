import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Europass2Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      <div style={{ backgroundColor: '#003399', color: '#fff', padding: '24px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: `${design.headingSize + 14}px`, fontWeight: 700, margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, opacity: 0.9, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px', fontSize: `${design.fontSize - 1}px`, opacity: 0.9 }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {summary && <section style={{ marginBottom: '16px' }}><h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#003399', marginBottom: '8px' }}>Personal Statement</h2><p style={{ whiteSpace: 'pre-line', color: '#374151' }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#003399', marginBottom: '10px' }}>Work Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontWeight: 700 }}>{exp.position}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#666' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ color: '#003399', fontSize: `${design.fontSize - 1}px` }}>{exp.company}</p>
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#003399', marginBottom: '10px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{edu.degree}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#666' }}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p style={{ color: '#555', fontSize: `${design.fontSize - 1}px` }}>{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#003399', marginBottom: '8px' }}>Skills</h2>
          {skills.map((g) => (
            <div key={g.id} style={{ marginBottom: '6px' }}>
              <span style={{ fontWeight: 700 }}>{g.category}: </span>
              <span>{g.skills.join(', ')}</span>
            </div>
          ))}
        </section>
      )}

      {languages.length > 0 && (
        <section style={{ marginTop: '16px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: '#003399', marginBottom: '8px' }}>Languages</h2>
          {languages.map((l) => <div key={l.id} style={{ marginBottom: '4px' }}>{l.language} – {l.proficiency}</div>)}
        </section>
      )}
    </div>
  );
};
