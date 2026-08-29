import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Executive4Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fafafa', minHeight: '297mm', padding: `${design.margins}mm` }}>
      <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '28px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: `${design.headingSize + 14}px`, fontWeight: 300, margin: 0, letterSpacing: '0.08em' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, color: '#ccc', marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', gap: '20px', marginTop: '12px', fontSize: `${design.fontSize - 1}px`, color: '#aaa' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {summary && <section style={{ marginBottom: '20px' }}><h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Summary</h2><p style={{ whiteSpace: 'pre-line', color: '#374151' }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '12px' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontWeight: 700 }}>{exp.position}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#666' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ color: '#555' }}>{exp.company}</p>
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px' }}>Education</h2>
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
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {skills.map((g) => (
              <div key={g.id}>
                <div style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px` }}>{g.category}</div>
                <div style={{ fontSize: `${design.fontSize - 1}px`, color: '#555' }}>{g.skills.join(', ')}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
