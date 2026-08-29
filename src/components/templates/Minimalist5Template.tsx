import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Minimalist5Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins * 1.5}mm` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
        <h1 style={{ fontSize: `${design.headingSize + 14}px`, fontWeight: 300, margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
        <div style={{ textAlign: 'right', fontSize: `${design.fontSize - 1}px`, color: '#666' }}>
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
        </div>
      </div>

      {summary && <section style={{ marginBottom: '20px' }}><p style={{ whiteSpace: 'pre-line', color: '#374151' }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px', display: 'flex', gap: '20px' }}>
              <div style={{ width: '120px', fontSize: `${design.fontSize - 1}px`, color: '#999', flexShrink: 0 }}>
                {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
              </div>
              <div style={{ flex: 1 }}>
                <strong style={{ fontWeight: 600 }}>{exp.position}</strong>
                <p style={{ color: '#666', fontSize: `${design.fontSize - 1}px`, margin: '2px 0' }}>{exp.company}</p>
                {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '16px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
              </div>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px', display: 'flex', gap: '20px' }}>
              <div style={{ width: '120px', fontSize: `${design.fontSize - 1}px`, color: '#999', flexShrink: 0 }}>
                {edu.startDate} – {edu.endDate}
              </div>
              <div style={{ flex: 1 }}>
                <strong style={{ fontWeight: 600 }}>{edu.degree}</strong>
                <p style={{ color: '#666', fontSize: `${design.fontSize - 1}px`, margin: '2px 0' }}>{edu.institution}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <p style={{ margin: 0, color: '#555' }}>{skills.map(g => g.skills.join(' · ')).join(' · ')}</p>
        </section>
      )}
    </div>
  );
};
