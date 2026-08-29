import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';

export const Modern15Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1e293b', backgroundColor: '#fff', minHeight: '297mm', display: 'flex' }}>
      {/* Premium dark sidebar */}
      <div style={{
        width: '35%',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        color: '#e2e8f0', padding: `${design.margins}mm`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: `${design.accentColor}15` }} />
        <div style={{ position: 'absolute', bottom: '60px', left: '-20px', width: '60px', height: '60px', borderRadius: '50%', background: `${design.accentColor}10` }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '85px', height: '85px', borderRadius: '50%',
            background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px', fontSize: '28px', fontWeight: 700, color: '#fff',
            boxShadow: `0 4px 20px ${design.accentColor}40`,
          }}>
            {(personalInfo.fullName || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ fontSize: `${design.headingSize + 3}px`, fontWeight: 700, margin: 0, color: '#fff', lineHeight: 1.2 }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.professionalTitle && <p style={{ color: design.accentColor, marginTop: '4px', fontSize: `${design.fontSize}px` }}>{personalInfo.professionalTitle}</p>}
          </div>

          {/* Contact */}
          <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: '6px' }}>✉ Contact</h3>
          <div style={{ fontSize: `${design.fontSize - 1.5}px`, lineHeight: 2.2, marginBottom: '20px' }}>
            {personalInfo.email && <div style={{ wordBreak: 'break-all' }}>✉ {personalInfo.email}</div>}
            {personalInfo.phone && <div>☎ {personalInfo.phone}</div>}
            {personalInfo.location && <div>📍 {personalInfo.location}</div>}
            {personalInfo.linkedin && <div style={{ wordBreak: 'break-all' }}>🔗 {personalInfo.linkedin}</div>}
            {personalInfo.github && <div style={{ wordBreak: 'break-all' }}>⚙ {personalInfo.github}</div>}
            {personalInfo.website && <div style={{ wordBreak: 'break-all' }}>🌐 {personalInfo.website}</div>}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>⚡ Skills</h3>
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px`, marginBottom: '6px', color: design.accentColor }}>{g.category}</div>
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
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>🌍 Languages</h3>
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
              <h3 style={{ fontSize: `${design.fontSize - 2}px`, fontWeight: 700, color: design.accentColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>🏆 Certifications</h3>
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
      <div style={{ flex: 1, padding: `${design.margins}mm` }}>
        {summary && (
          <section style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff' }}>★</div>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: '#1e293b', margin: 0 }}>Profile</h2>
            </div>
            <div style={{ padding: '12px 16px', background: '#f8fafc', borderRadius: '8px', borderLeft: `3px solid ${design.accentColor}`, color: '#475569', whiteSpace: 'pre-line', fontSize: `${design.fontSize - 0.5}px` }}>{summary}</div>
          </section>
        )}

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
          </section>
        )}

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
