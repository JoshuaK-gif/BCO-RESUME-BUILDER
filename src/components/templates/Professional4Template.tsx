import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Professional4Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      <div style={{ display: 'flex', gap: '30px' }}>
        <div style={{ flex: 2 }}>
          <h1 style={{ fontSize: `${design.headingSize + 12}px`, fontWeight: 700, margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, color: design.accentColor, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        </div>
        <div style={{ flex: 1, textAlign: 'right', fontSize: `${design.fontSize - 1}px`, color: '#666' }}>
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
        </div>
      </div>
      <div style={{ height: '2px', backgroundColor: design.accentColor, margin: '16px 0 20px' }} />

      {summary && <section style={{ marginBottom: '16px' }}><h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px' }}>Summary</h2><p style={{ whiteSpace: 'pre-line', color: '#374151' }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontWeight: 700 }}>{exp.position}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#666' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ color: design.accentColor, fontWeight: 500 }}>{exp.company}</p>
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{edu.degree}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#666' }}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p style={{ color: '#555' }}>{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px' }}>Skills</h2>
          {skills.map((g) => (
            <div key={g.id} style={{ marginBottom: '4px' }}>
              <span style={{ fontWeight: 600 }}>{g.category}: </span>
              <span style={{ color: '#555' }}>{g.skills.join(', ')}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
