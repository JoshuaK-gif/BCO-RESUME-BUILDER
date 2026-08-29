import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Minimalist12Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins * 1.5}mm` }}>
      <h1 style={{ fontSize: `${design.headingSize + 16}px`, fontWeight: 200, margin: 0, letterSpacing: '-0.01em' }}>{personalInfo.fullName || 'Your Name'}</h1>
      <div style={{ marginTop: '8px', fontSize: `${design.fontSize - 1}px`, color: '#888' }}>
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span> · {personalInfo.phone}</span>}
        {personalInfo.location && <span> · {personalInfo.location}</span>}
      </div>

      {summary && <section style={{ marginTop: '20px', marginBottom: '20px' }}><p style={{ whiteSpace: 'pre-line', color: '#444' }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.fontSize}px`, fontWeight: 400, marginBottom: '10px' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontWeight: 600 }}>{exp.position}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#999' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ color: '#666', fontSize: `${design.fontSize - 1}px`, margin: '2px 0' }}>{exp.company}</p>
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '16px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.fontSize}px`, fontWeight: 400, marginBottom: '10px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontWeight: 600 }}>{edu.degree}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#999' }}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p style={{ color: '#666', fontSize: `${design.fontSize - 1}px`, margin: '2px 0' }}>{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 style={{ fontSize: `${design.fontSize}px`, fontWeight: 400, marginBottom: '10px' }}>Skills</h2>
          <p style={{ color: '#555' }}>{skills.map(g => g.skills.join(', ')).join(' · ')}</p>
        </section>
      )}
    </div>
  );
};
