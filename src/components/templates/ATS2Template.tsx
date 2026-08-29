import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const ATS2Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#000', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      <h1 style={{ fontSize: `${design.headingSize + 14}px`, fontWeight: 700, margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
      <div style={{ marginTop: '6px', fontSize: `${design.fontSize - 1}px`, color: '#333' }}>
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span> | {personalInfo.phone}</span>}
        {personalInfo.location && <span> | {personalInfo.location}</span>}
      </div>

      {summary && <section style={{ marginTop: '16px', marginBottom: '12px' }}><h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, marginBottom: '6px' }}>Summary</h2><p style={{ whiteSpace: 'pre-line' }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, marginBottom: '8px' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontWeight: 700 }}>{exp.position}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px` }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <div style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '4px' }}>{exp.company}</div>
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px' }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '12px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, marginBottom: '8px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontWeight: 700 }}>{edu.degree}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px` }}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <div style={{ fontSize: `${design.fontSize - 1}px` }}>{edu.institution}</div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, marginBottom: '6px' }}>Skills</h2>
          {skills.map((g) => (
            <div key={g.id} style={{ marginBottom: '4px' }}><strong>{g.category}:</strong> {g.skills.join(', ')}</div>
          ))}
        </section>
      )}
    </div>
  );
};
