import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Minimalist11Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1a1a1a', backgroundColor: '#fff', minHeight: '297mm', padding: `${design.margins * 1.5}mm` }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: `${design.headingSize + 16}px`, fontWeight: 200, margin: 0, letterSpacing: '0.15em' }}>{personalInfo.fullName || 'Your Name'}</h1>
        <div style={{ marginTop: '8px', fontSize: `${design.fontSize - 1}px`, color: '#888' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span> · {personalInfo.phone}</span>}
          {personalInfo.location && <span> · {personalInfo.location}</span>}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '24px' }}>
        {[...Array(5)].map((_, i) => <div key={i} style={{ width: '4px', height: '4px', backgroundColor: '#ccc', borderRadius: '50%' }} />)}
      </div>

      {summary && <section style={{ marginBottom: '20px', textAlign: 'center' }}><p style={{ whiteSpace: 'pre-line', color: '#444' }}>{summary}</p></section>}

      {experience.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: `${design.fontSize - 1}px`, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px', textAlign: 'center', color: '#888' }}>Experience</h2>
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
          <h2 style={{ fontSize: `${design.fontSize - 1}px`, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '12px', textAlign: 'center', color: '#888' }}>Education</h2>
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
          <h2 style={{ fontSize: `${design.fontSize - 1}px`, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px', color: '#888' }}>Skills</h2>
          <p style={{ color: '#555' }}>{skills.map(g => g.skills.join(' | ')).join(' | ')}</p>
        </section>
      )}
    </div>
  );
};
