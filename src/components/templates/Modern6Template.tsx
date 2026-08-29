import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Modern6Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1e293b', backgroundColor: '#f8fafc', minHeight: '297mm', display: 'flex' }}>
      {/* Premium dark sidebar */}
      <div style={{
        width: '32%',
        background: `linear-gradient(180deg, ${design.accentColor} 0%, ${design.accentColor}ee 50%, ${design.accentColor}dd 100%)`,
        color: '#fff', padding: `${design.margins + 2}mm ${design.margins - 1}mm`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative shapes */}
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: '100px', left: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '15px', width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', transform: 'rotate(45deg)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Photo circle with glow */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)',
              border: '3px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', fontSize: '32px', fontWeight: 700,
              boxShadow: '0 0 30px rgba(255,255,255,0.1)',
            }}>
              {(personalInfo.fullName || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <h1 style={{ fontSize: `${design.headingSize + 4}px`, fontWeight: 800, margin: 0, lineHeight: 1.15, wordBreak: 'break-word' }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.professionalTitle && (
              <p style={{ fontSize: `${design.fontSize}px`, opacity: 0.9, marginTop: '6px', fontWeight: 300 }}>{personalInfo.professionalTitle}</p>
            )}
          </div>

          {/* Contact with icons */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.25)' }}>Contact</h3>
            <div style={{ fontSize: `${design.fontSize - 1.5}px`, lineHeight: 2.4 }}>
              {personalInfo.email && <div style={{ wordBreak: 'break-all' }}>✉ {personalInfo.email}</div>}
              {personalInfo.phone && <div>☎ {personalInfo.phone}</div>}
              {personalInfo.location && <div>📍 {personalInfo.location}</div>}
              {personalInfo.linkedin && <div style={{ wordBreak: 'break-all' }}>🔗 {personalInfo.linkedin}</div>}
              {personalInfo.github && <div style={{ wordBreak: 'break-all' }}>⚙ {personalInfo.github}</div>}
            </div>
          </div>

          {/* Skills with progress bars */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.25)' }}>Skills</h3>
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '14px' }}>
                  <div style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px`, marginBottom: '6px', opacity: 0.95 }}>{g.category}</div>
                  {g.skills.map((s, i) => (
                    <div key={i} style={{ marginBottom: '6px' }}>
                      <div style={{ fontSize: `${design.fontSize - 1.5}px`, opacity: 0.85, marginBottom: '3px' }}>{s}</div>
                      <div style={{ height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${75 + Math.random() * 25}%`, background: 'rgba(255,255,255,0.6)', borderRadius: '2px' }} />
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
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.25)' }}>Languages</h3>
              {languages.map((l) => (
                <div key={l.id} style={{ fontSize: `${design.fontSize - 1}px`, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', background: 'rgba(255,255,255,0.6)', borderRadius: '50%' }} />
                  {l.language} — {l.proficiency}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.25)' }}>Certifications</h3>
              {certifications.map((c) => (
                <div key={c.id} style={{ fontSize: `${design.fontSize - 1.5}px`, marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>✓</span>
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

      {/* Main content */}
      <div style={{ flex: 1, padding: `${design.margins + 2}mm ${design.margins}mm`, backgroundColor: '#fff' }}>
        {/* Summary */}
        {summary && (
          <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff' }}>★</div>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: '#1e293b', margin: 0 }}>About Me</h2>
            </div>
            <div style={{ padding: '12px 16px', background: '#f8fafc', borderRadius: '8px', borderLeft: `3px solid ${design.accentColor}`, color: '#475569', whiteSpace: 'pre-line', fontSize: `${design.fontSize - 0.5}px` }}>{summary}</div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
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
                  <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#64748b', whiteSpace: 'nowrap', marginLeft: '12px', padding: '3px 10px', background: `${design.accentColor}10`, borderRadius: '12px', fontWeight: 500 }}>
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
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
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
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
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
          </section>
        )}
      </div>
    </div>
  );
};
