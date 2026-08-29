import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Executive7Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: `${design.headingSize + 14}px`, fontWeight: 700, margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
          {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 2}px`, color: design.accentColor, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
        </div>
        <div style={{ textAlign: 'right', backgroundColor: design.accentColor, color: '#fff', padding: '12px 20px', borderRadius: '8px' }}>
          {personalInfo.email && <div style={{ fontSize: `${design.fontSize - 1}px` }}>{personalInfo.email}</div>}
          {personalInfo.phone && <div style={{ fontSize: `${design.fontSize - 1}px` }}>{personalInfo.phone}</div>}
          {personalInfo.location && <div style={{ fontSize: `${design.fontSize - 1}px` }}>{personalInfo.location}</div>}
        </div>
      </div>

      {summary && <section style={{ marginBottom: '20px' }}><h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, marginBottom: '8px' }}>Executive Summary</h2><p style={{ whiteSpace: 'pre-line', color: '#374151' }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, marginBottom: '12px' }}>Professional Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontWeight: 700 }}>{exp.position}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#666' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ color: design.accentColor, fontWeight: 600 }}>{exp.company}</p>
              {exp.achievements.length > 0 && <ul style={{ margin: '4px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, marginBottom: '10px' }}>Education</h2>
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
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 700, marginBottom: '8px' }}>Core Competencies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {skills.map((g) => g.skills.map((s, i) => (
              <span key={`${g.id}-${i}`} style={{ padding: '6px', backgroundColor: '#f9fafb', textAlign: 'center', fontSize: `${design.fontSize - 1}px` }}>{s}</span>
            )))}
          </div>
        </section>
      )}
    </div>
  );
};
