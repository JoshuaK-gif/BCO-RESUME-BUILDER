import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Timeline2Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      <h1 style={{ fontSize: `${design.headingSize + 14}px`, fontWeight: 700, margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
      {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, color: design.accentColor, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '8px', fontSize: `${design.fontSize - 1}px`, color: '#666' }}>
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.location && <span>{personalInfo.location}</span>}
      </div>

      {summary && <section style={{ marginTop: '20px', marginBottom: '20px' }}><p style={{ whiteSpace: 'pre-line', color: '#374151' }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '12px' }}>Experience</h2>
          <div style={{ borderLeft: `3px solid ${design.accentColor}`, paddingLeft: '20px' }}>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '16px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-27px', top: '4px', width: '12px', height: '12px', backgroundColor: design.accentColor, borderRadius: '50%' }} />
                <div style={{ fontSize: `${design.fontSize - 1}px`, color: '#999', marginBottom: '4px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</div>
                <strong style={{ fontWeight: 700 }}>{exp.position}</strong>
                <p style={{ color: design.accentColor, fontSize: `${design.fontSize - 1}px` }}>{exp.company}</p>
                {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '16px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '12px' }}>Education</h2>
          <div style={{ borderLeft: `3px solid ${design.accentColor}`, paddingLeft: '20px' }}>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-27px', top: '4px', width: '12px', height: '12px', backgroundColor: design.accentColor, borderRadius: '50%' }} />
                <div style={{ fontSize: `${design.fontSize - 1}px`, color: '#999', marginBottom: '4px' }}>{edu.startDate} – {edu.endDate}</div>
                <strong>{edu.degree}</strong>
                <p style={{ color: '#666', fontSize: `${design.fontSize - 1}px` }}>{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px' }}>Skills</h2>
          <p style={{ color: '#555' }}>{skills.map(g => g.skills.join(', ')).join(' · ')}</p>
        </section>
      )}
    </div>
  );
};
