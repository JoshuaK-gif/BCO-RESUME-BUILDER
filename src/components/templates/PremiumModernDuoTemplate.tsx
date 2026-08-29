import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const PremiumModernDuoTemplate: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1e293b', backgroundColor: '#fff', minHeight: '297mm', display: 'flex' }}>
      {/* Left: 45% colored panel */}
      <div style={{
        width: '45%',
        background: `linear-gradient(180deg, ${design.accentColor} 0%, ${design.accentColor}f0 30%, ${design.accentColor}dd 100%)`,
        color: '#fff', padding: `${design.margins + 2}mm ${design.margins - 1}mm`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: '60px', left: '-25px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', border: '3px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', fontSize: '34px', fontWeight: 700,
              boxShadow: '0 0 25px rgba(255,255,255,0.08)',
            }}>
              {(personalInfo.fullName || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <h1 style={{ fontSize: `${design.headingSize + 3}px`, fontWeight: 800, margin: 0, lineHeight: 1.15, wordBreak: 'break-word' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.professionalTitle && (
              <p style={{ fontSize: `${design.fontSize}px`, opacity: 0.9, marginTop: '6px', fontWeight: 300 }}>{personalInfo.professionalTitle}</p>
            )}
          </div>

          {/* Contact */}
          <div style={{ marginBottom: '22px' }}>
            <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.25)' }}>Contact</h3>
            <div style={{ fontSize: `${design.fontSize - 1.5}px`, lineHeight: 2.2 }}>
              {personalInfo.email && <div style={{ wordBreak: 'break-all' }}>✉ {personalInfo.email}</div>}
              {personalInfo.phone && <div>☎ {personalInfo.phone}</div>}
              {personalInfo.location && <div>📍 {personalInfo.location}</div>}
              {personalInfo.linkedin && <div style={{ wordBreak: 'break-all' }}>🔗 {personalInfo.linkedin}</div>}
              {personalInfo.github && <div style={{ wordBreak: 'break-all' }}>⚙ {personalInfo.github}</div>}
              {personalInfo.website && <div style={{ wordBreak: 'break-all' }}>🌐 {personalInfo.website}</div>}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.25)' }}>Skills</h3>
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '14px' }}>
                  <div style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px`, marginBottom: '6px', opacity: 0.95 }}>{g.category}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {g.skills.map((s, i) => (
                      <span key={i} style={{ fontSize: `${design.fontSize - 1.5}px`, background: 'rgba(255,255,255,0.12)', padding: '4px 12px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.15)' }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.25)' }}>Languages</h3>
              {languages.map((l) => (
                <div key={l.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '5px', height: '5px', background: 'rgba(255,255,255,0.6)', borderRadius: '50%' }} />{l.language} — {l.proficiency}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.25)' }}>Certifications</h3>
              {certifications.map((c) => (
                <div key={c.id} style={{ fontSize: `${design.fontSize - 1.5}px`, marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <span style={{ opacity: 0.7, marginTop: '2px' }}>✓</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                    <div style={{ opacity: 0.7 }}>{c.issuer} · {c.date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: 55% white panel */}
      <div style={{ flex: 1, padding: `${design.margins + 2}mm ${design.margins}mm` }}>
        {summary && (
          <div style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff' }}>★</div>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: '#1e293b', margin: 0 }}>Summary</h2>
            </div>
            <div style={{ padding: '12px 16px', background: '#f8fafc', borderRadius: '8px', borderLeft: `3px solid ${design.accentColor}`, color: '#475569', whiteSpace: 'pre-line', fontSize: `${design.fontSize - 0.5}px` }}>{summary}</div>
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff' }}>💼</div>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: '#1e293b', margin: 0 }}>Experience</h2>
            </div>
            {experience.map((exp, idx) => (
              <div key={exp.id} style={{ marginBottom: idx < experience.length - 1 ? '18px' : '0', paddingBottom: idx < experience.length - 1 ? '18px' : '0', borderBottom: idx < experience.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                    <p style={{ color: design.accentColor, fontWeight: 600, margin: '2px 0 0', fontSize: `${design.fontSize - 0.5}px` }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                  </div>
                  <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#64748b', padding: '3px 10px', background: `${design.accentColor}10`, borderRadius: '12px', fontWeight: 500, whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#64748b', margin: '6px 0', whiteSpace: 'pre-line' }}>{exp.description}</p>}
                {exp.achievements.length > 0 && (
                  <ul style={{ margin: '6px 0 0', paddingLeft: '0', listStyle: 'none', fontSize: `${design.fontSize - 0.5}px`, color: '#334155' }}>
                    {exp.achievements.map((a, i) => a && (
                      <li key={i} style={{ marginBottom: '4px', lineHeight: 1.5, paddingLeft: '18px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: design.accentColor, fontWeight: 700 }}>→</span>{a}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff' }}>🎓</div>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: '#1e293b', margin: 0 }}>Education</h2>
            </div>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                  <p style={{ color: '#64748b', fontWeight: 500, margin: '2px 0 0', fontSize: `${design.fontSize - 0.5}px` }}>{edu.institution}</p>
                </div>
                <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#64748b', padding: '3px 10px', background: `${design.accentColor}10`, borderRadius: '12px' }}>{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff' }}>🚀</div>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: '#1e293b', margin: 0 }}>Projects</h2>
            </div>
            {projects.map((p) => (
              <div key={p.id} style={{ marginBottom: '10px', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px', borderLeft: `4px solid ${design.accentColor}` }}>
                <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{p.name}</h3>
                {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#64748b', margin: '4px 0' }}>{p.description}</p>}
                {p.technologies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {p.technologies.map((t, i) => (
                      <span key={i} style={{ padding: '2px 8px', background: `${design.accentColor}15`, color: design.accentColor, borderRadius: '8px', fontSize: `${design.fontSize - 1.5}px`, fontWeight: 600 }}>{t}</span>
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
