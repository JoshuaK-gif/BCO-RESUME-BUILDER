import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Creative3Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins}mm` }}>
      <div style={{ background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}dd)`, color: '#fff', padding: '32px', marginBottom: '24px' }}>
        <h1 style={{ fontSize: `${design.headingSize + 18}px`, fontWeight: 900, margin: 0, textTransform: 'uppercase' }}>{personalInfo.fullName || 'Your Name'}</h1>
        {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 3}px`, opacity: 0.9, marginTop: '8px' }}>{personalInfo.professionalTitle}</p>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px', fontSize: `${design.fontSize - 1}px` }}>
          {personalInfo.email && <span style={{ padding: '4px 12px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20px' }}>{personalInfo.email}</span>}
          {personalInfo.phone && <span style={{ padding: '4px 12px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20px' }}>{personalInfo.phone}</span>}
          {personalInfo.location && <span style={{ padding: '4px 12px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '20px' }}>{personalInfo.location}</span>}
        </div>
      </div>

      {summary && <section style={{ marginBottom: '20px' }}><h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 800, color: design.accentColor, marginBottom: '8px' }}>About Me</h2><p style={{ whiteSpace: 'pre-line', color: '#374151' }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 800, color: design.accentColor, marginBottom: '12px' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontWeight: 800, fontSize: `${design.fontSize + 1}px` }}>{exp.position}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#666', backgroundColor: `${design.accentColor}15`, padding: '4px 12px', borderRadius: '12px' }}>{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ color: design.accentColor, fontWeight: 600, marginTop: '4px' }}>{exp.company}</p>
              {exp.achievements.length > 0 && <ul style={{ margin: '8px 0 0', paddingLeft: '18px', fontSize: `${design.fontSize - 0.5}px` }}>{exp.achievements.map((a, i) => a && <li key={i}>{a}</li>)}</ul>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 800, color: design.accentColor, marginBottom: '10px' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '12px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontWeight: 800 }}>{edu.degree}</strong>
                <span style={{ fontSize: `${design.fontSize - 1}px`, color: '#666' }}>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p style={{ color: '#555' }}>{edu.institution}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 800, color: design.accentColor, marginBottom: '8px' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((g) => g.skills.map((s, i) => (
              <span key={`${g.id}-${i}`} style={{ padding: '6px 14px', backgroundColor: design.accentColor, color: '#fff', fontSize: `${design.fontSize - 1}px`, fontWeight: 700, borderRadius: '20px' }}>{s}</span>
            )))}
          </div>
        </section>
      )}
    </div>
  );
};
