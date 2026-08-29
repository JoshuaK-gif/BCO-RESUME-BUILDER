import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Executive2Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '24px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: `${design.headingSize + 14}px`, fontWeight: 300, margin: 0, letterSpacing: '0.05em' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, color: design.accentColor, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', gap: '20px', marginTop: '12px', fontSize: `${design.fontSize - 1}px`, color: '#999' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {summary && <section style={{ marginBottom: '20px' }}><h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Executive Profile</h2><p style={{ whiteSpace: 'pre-line', color: '#374151', fontSize: `${design.fontSize + 0.5}px` }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Leadership Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px` }}>{exp.position}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#666' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ color: design.accentColor, fontWeight: 500 }}>{exp.company}</p>
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Education</h2>
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
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, color: design.accentColor, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Core Competencies</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((g) => g.skills.map((s, i) => (
              <span key={`${g.id}-${i}`} style={{ padding: '6px 14px', backgroundColor: '#f8f9fa', border: '1px solid #e5e7eb', fontSize: `${design.fontSize - 1}px` }}>{s}</span>
            )))}
          </div>
        </section>
      )}
    </div>
  );
};
