import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const PremiumExecutivePortraitTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: '"Georgia", serif', fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1e293b', backgroundColor: '#fff', minHeight: '297mm', display: 'flex' }}>
      {/* Elegant dark sidebar */}
      <div style={{
        width: '36%',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        color: '#e2e8f0', padding: `${design.margins + 2}mm ${design.margins - 1}mm`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: `${design.accentColor}15` }} />
        <div style={{ position: 'absolute', bottom: '60px', left: '-20px', width: '60px', height: '60px', borderRadius: '50%', background: `${design.accentColor}10` }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Large photo circle */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              width: '110px', height: '110px', borderRadius: '50%',
              background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', fontSize: '36px', fontWeight: 700, color: '#fff',
              boxShadow: `0 4px 25px ${design.accentColor}40`,
              border: '4px solid rgba(255,255,255,0.15)',
            }}>
              {(personalInfo.fullName || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <h1 style={{ fontSize: `${design.headingSize + 4}px`, fontWeight: 700, margin: 0, lineHeight: 1.15, color: '#fff', fontStyle: 'italic' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.professionalTitle && (
              <p style={{ fontSize: `${design.fontSize}px`, color: design.accentColor, marginTop: '6px', fontWeight: 400, letterSpacing: '0.05em' }}>
                {personalInfo.professionalTitle}
              </p>
            )}
          </div>

          {/* Contact */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Contact</h3>
            <div style={{ fontSize: `${design.fontSize - 1.5}px`, lineHeight: 2.4 }}>
              {personalInfo.email && <div style={{ wordBreak: 'break-all' }}>✉ {personalInfo.email}</div>}
              {personalInfo.phone && <div>☎ {personalInfo.phone}</div>}
              {personalInfo.location && <div>📍 {personalInfo.location}</div>}
              {personalInfo.linkedin && <div style={{ wordBreak: 'break-all' }}>🔗 {personalInfo.linkedin}</div>}
              {personalInfo.github && <div style={{ wordBreak: 'break-all' }}>⚙ {personalInfo.github}</div>}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Expertise</h3>
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '14px' }}>
                  <div style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px`, marginBottom: '6px', color: '#fff' }}>{g.category}</div>
                  {g.skills.map((s, i) => (
                    <div key={i} style={{ marginBottom: '5px' }}>
                      <div style={{ fontSize: `${design.fontSize - 1.5}px`, opacity: 0.85, marginBottom: '3px' }}>{s}</div>
                      <div style={{ height: '3px', background: 'rgba(255,255,255,0.12)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${70 + Math.random() * 30}%`, background: design.accentColor, borderRadius: '2px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Languages</h3>
              {languages.map((l) => (
                <div key={l.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '4px', opacity: 0.85 }}>
                  <span style={{ width: '5px', height: '5px', background: design.accentColor, borderRadius: '50%', display: 'inline-block', marginRight: '6px' }} />{l.language} — {l.proficiency}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>Credentials</h3>
              {certifications.map((c) => (
                <div key={c.id} style={{ fontSize: `${design.fontSize - 1.5}px`, marginBottom: '8px' }}>
                  <div style={{ fontWeight: 600 }}>✓ {c.name}</div>
                  <div style={{ opacity: 0.7 }}>{c.issuer} · {c.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: `${design.margins + 2}mm ${design.margins}mm` }}>
        {summary && (
          <div style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 400, color: '#0f172a', marginBottom: '12px', paddingBottom: '6px', borderBottom: `1px solid #e5e7eb`, fontStyle: 'italic', letterSpacing: '0.08em' }}>Professional Profile</h2>
            <div style={{ padding: '14px 18px', background: '#f8fafc', borderRadius: '8px', borderLeft: `3px solid ${design.accentColor}`, color: '#475569', whiteSpace: 'pre-line', fontSize: `${design.fontSize}px`, fontStyle: 'italic', lineHeight: 1.7 }}>{summary}</div>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: `${design.sectionSpacing + 6}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 400, color: '#0f172a', marginBottom: '14px', paddingBottom: '6px', borderBottom: `1px solid #e5e7eb`, fontStyle: 'italic', letterSpacing: '0.08em' }}>Professional Experience</h2>
            {experience.map((exp, idx) => (
              <div key={exp.id} style={{ marginBottom: idx < experience.length - 1 ? '18px' : '0', paddingBottom: idx < experience.length - 1 ? '18px' : '0', borderBottom: idx < experience.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                  <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#94a3b8', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p style={{ color: design.accentColor, fontWeight: 600, margin: '2px 0 6px', fontSize: `${design.fontSize}px`, fontStyle: 'italic' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#64748b', marginBottom: '6px', whiteSpace: 'pre-line' }}>{exp.description}</p>}
                {exp.achievements.length > 0 && (
                  <ul style={{ margin: '4px 0 0', paddingLeft: '0', listStyle: 'none', fontSize: `${design.fontSize - 0.5}px`, color: '#334155' }}>
                    {exp.achievements.map((a, i) => a && (
                      <li key={i} style={{ marginBottom: '3px', lineHeight: 1.5, paddingLeft: '16px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: design.accentColor }}>—</span>{a}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 400, color: '#0f172a', marginBottom: '12px', paddingBottom: '6px', borderBottom: `1px solid #e5e7eb`, fontStyle: 'italic', letterSpacing: '0.08em' }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                  <p style={{ color: '#64748b', fontStyle: 'italic', margin: '2px 0 0', fontSize: `${design.fontSize - 0.5}px` }}>{edu.institution}</p>
                </div>
                <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#94a3b8', fontStyle: 'italic' }}>{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div style={{ marginTop: `${design.sectionSpacing + 6}px` }}>
            <h2 style={{ fontSize: `${design.headingSize}px`, fontWeight: 400, color: '#0f172a', marginBottom: '12px', paddingBottom: '6px', borderBottom: `1px solid #e5e7eb`, fontStyle: 'italic', letterSpacing: '0.08em' }}>Notable Projects</h2>
            {projects.map((p) => (
              <div key={p.id} style={{ marginBottom: '10px', padding: '12px 14px', background: '#f8fafc', borderRadius: '8px', borderLeft: `3px solid ${design.accentColor}` }}>
                <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{p.name}</h3>
                {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#64748b', margin: '4px 0' }}>{p.description}</p>}
                {p.technologies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {p.technologies.map((t, i) => (
                      <span key={i} style={{ padding: '2px 8px', background: `${design.accentColor}15`, color: design.accentColor, borderRadius: '6px', fontSize: `${design.fontSize - 1.5}px`, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
