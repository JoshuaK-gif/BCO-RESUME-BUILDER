import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Infographic2Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '24px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: design.accentColor, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: `${design.headingSize + 10}px`, fontWeight: 800 }}>
            {personalInfo.fullName?.charAt(0) || 'Y'}
          </div>
          <h1 style={{ fontSize: `${design.headingSize}px`, fontWeight: 800, margin: 0, textAlign: 'center' }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize}px`, color: design.accentColor, marginTop: '4px', textAlign: 'center' }}>{personalInfo.professionalTitle}</p>}

          <div style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: `${design.fontSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px' }}>Contact</h3>
            {personalInfo.email && <div style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '4px' }}>{personalInfo.email}</div>}
            {personalInfo.phone && <div style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '4px' }}>{personalInfo.phone}</div>}
            {personalInfo.location && <div style={{ fontSize: `${design.fontSize - 1}px` }}>{personalInfo.location}</div>}
          </div>

          {skills.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: `${design.fontSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px' }}>Skills</h3>
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '8px' }}>
                  <div style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px` }}>{g.category}</div>
                  <div style={{ fontSize: `${design.fontSize - 1}px`, opacity: 0.9 }}>{g.skills.join(', ')}</div>
                </div>
              ))}
            </div>
          )}

          {languages.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: `${design.fontSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px' }}>Languages</h3>
              {languages.map((l) => <div key={l.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '4px' }}>{l.language} ({l.proficiency})</div>)}
            </div>
          )}
        </div>

        <div>
          {summary && <section style={{ marginBottom: '20px' }}><h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 800, color: design.accentColor, marginBottom: '8px' }}>Profile</h2><p style={{ whiteSpace: 'pre-line', color: '#374151' }}>{summary}</p></section>}

          {experience.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 800, color: design.accentColor, marginBottom: '12px' }}>Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ fontWeight: 800 }}>{exp.position}</strong>
                    <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#666' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p style={{ color: design.accentColor }}>{exp.company}</p>
                  {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 800, color: design.accentColor, marginBottom: '10px' }}>Education</h2>
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
        </div>
      </div>
    </div>
  );
};
