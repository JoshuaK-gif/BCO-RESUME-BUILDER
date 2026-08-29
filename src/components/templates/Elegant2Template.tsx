import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Elegant2Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins * 1.5}mm` }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: `${design.headingSize + 16}px`, fontWeight: 300, margin: 0, letterSpacing: '0.1em' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, color: '#666', marginTop: '4px', letterSpacing: '0.05em' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px', fontSize: `${design.fontSize - 1}px`, color: '#888' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
        {[...Array(3)].map((_, i) => <div key={i} style={{ width: '40px', height: '1px', backgroundColor: design.accentColor }} />)}
      </div>

      {summary && <section style={{ marginBottom: '20px', textAlign: 'center' }}><p style={{ whiteSpace: 'pre-line', color: '#444', fontStyle: 'italic', maxWidth: '80%', margin: '0 auto' }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 300, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px', textAlign: 'center' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontWeight: 600 }}>{exp.position}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#999' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ color: design.accentColor, fontStyle: 'italic' }}>{exp.company}</p>
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 300, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px', textAlign: 'center' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px', textAlign: 'center' }}>
              <strong style={{ fontWeight: 600 }}>{edu.degree}</strong> — {edu.institution}
              <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#999', marginLeft: '8px' }}>{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 300, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px' }}>Skills</h2>
          <p style={{ color: '#555' }}>{skills.map(g => g.skills.join(' | ')).join(' | ')}</p>
        </section>
      )}
    </div>
  );
};
