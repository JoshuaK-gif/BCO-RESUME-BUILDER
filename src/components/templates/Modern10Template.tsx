import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';
import { PremiumSectionTitle, ContactBadge, SkillBar, SkillPill, CertBadge, LanguageChip, AchievementBullet, DatePill } from './PremiumComponents';

export const Modern10Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1e293b', backgroundColor: '#f8fafc', minHeight: '297mm' }}>
      {/* Top accent bar */}
      <div style={{ height: '8px', background: `linear-gradient(90deg, ${design.accentColor}, ${design.accentColor}88)` }} />

      <div style={{ padding: `${design.margins}mm`, display: 'flex', gap: '24px' }}>
        {/* Left Column */}
        <div style={{ width: '35%' }}>
          {/* Photo circle + name */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '50%',
              background: `${design.accentColor}12`, border: `3px solid ${design.accentColor}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px', fontSize: '34px', fontWeight: 800, color: design.accentColor,
            }}>
              {(personalInfo.fullName || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <h1 style={{ fontSize: `${design.headingSize + 6}px`, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize + 1}px`, color: design.accentColor, marginTop: '4px' }}>{personalInfo.professionalTitle}</p>}
          </div>

          {/* Contact */}
          <div style={{ marginBottom: '18px', padding: '14px', background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <PremiumSectionTitle title="Contact" icon="✉" accentColor={design.accentColor} headingSize={design.headingSize - 2} />
            <div style={{ fontSize: `${design.fontSize - 1}px`, lineHeight: 2.2 }}>
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
            <div style={{ marginBottom: '18px', padding: '14px', background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <PremiumSectionTitle title="Skills" icon="⚡" accentColor={design.accentColor} headingSize={design.headingSize - 2} />
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '14px' }}>
                  <div style={{ fontWeight: 700, fontSize: `${design.fontSize - 1.5}px`, color: design.accentColor, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{g.category}</div>
                  {g.skills.map((s, i) => (
                    <SkillBar key={i} skill={s} accentColor={design.accentColor} fontSize={design.fontSize} />
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div style={{ marginBottom: '18px', padding: '14px', background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <PremiumSectionTitle title="Languages" icon="🌍" accentColor={design.accentColor} headingSize={design.headingSize - 2} />
              {languages.map((l) => (
                <LanguageChip key={l.id} language={l.language} proficiency={l.proficiency} accentColor={design.accentColor} fontSize={design.fontSize} />
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div style={{ padding: '14px', background: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <PremiumSectionTitle title="Certifications" icon="🏆" accentColor={design.accentColor} headingSize={design.headingSize - 2} />
              {certifications.map((c) => (
                <CertBadge key={c.id} name={c.name} issuer={c.issuer} date={c.date} accentColor={design.accentColor} fontSize={design.fontSize} />
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ flex: 1 }}>
          {/* Summary */}
          {summary && (
            <div style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
              <PremiumSectionTitle title="About Me" icon="★" accentColor={design.accentColor} headingSize={design.headingSize} />
              <div style={{ padding: '12px 16px', background: '#fff', borderRadius: '10px', borderLeft: `4px solid ${design.accentColor}`, color: '#475569', whiteSpace: 'pre-line', fontSize: `${design.fontSize - 0.5}px`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>{summary}</div>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
              <PremiumSectionTitle title="Experience" icon="💼" accentColor={design.accentColor} headingSize={design.headingSize} />
              {experience.map((exp, idx) => (
                <div key={exp.id} style={{
                  marginBottom: idx < experience.length - 1 ? '18px' : '0',
                  paddingBottom: idx < experience.length - 1 ? '18px' : '0',
                  borderBottom: idx < experience.length - 1 ? '1px solid #f1f5f9' : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize + 1}px`, color: '#0f172a', margin: 0 }}>{exp.position}</h3>
                      <p style={{ color: design.accentColor, fontWeight: 600, margin: '2px 0 0', fontSize: `${design.fontSize - 0.5}px` }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</p>
                    </div>
                    <DatePill start={exp.startDate} end={exp.endDate} current={exp.current} accentColor={design.accentColor} fontSize={design.fontSize} />
                  </div>
                  {exp.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#64748b', margin: '6px 0', whiteSpace: 'pre-line' }}>{exp.description}</p>}
                  {exp.achievements.length > 0 && (
                    <ul style={{ margin: '4px 0 0', paddingLeft: '0', listStyle: 'none' }}>
                      {exp.achievements.map((a, i) => a && <AchievementBullet key={i} text={a} accentColor={design.accentColor} fontSize={design.fontSize} />)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
              <PremiumSectionTitle title="Education" icon="🎓" accentColor={design.accentColor} headingSize={design.headingSize} />
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</h3>
                    <p style={{ color: '#64748b', fontWeight: 500, margin: '2px 0 0', fontSize: `${design.fontSize - 0.5}px` }}>{edu.institution}</p>
                  </div>
                  <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#94a3b8' }}>{edu.startDate} – {edu.endDate}</span>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <PremiumSectionTitle title="Projects" icon="🚀" accentColor={design.accentColor} headingSize={design.headingSize} />
              {projects.map((p) => (
                <div key={p.id} style={{ marginBottom: '12px', padding: '12px 14px', background: '#fff', borderRadius: '10px', borderLeft: `4px solid ${design.accentColor}`, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontWeight: 700, fontSize: `${design.fontSize}px`, color: '#0f172a', margin: 0 }}>{p.name}</h3>
                  {p.description && <p style={{ fontSize: `${design.fontSize - 0.5}px`, color: '#64748b', margin: '4px 0' }}>{p.description}</p>}
                  {p.technologies.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                      {p.technologies.map((t, i) => <SkillPill key={i} skill={t} accentColor={design.accentColor} fontSize={design.fontSize} />)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
