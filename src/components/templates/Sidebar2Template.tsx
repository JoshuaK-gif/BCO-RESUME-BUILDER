import React from 'react';
import { ResumeContent, DesignSettings } from '@/types/resume';
import { SidebarSectionTitle, SkillBar, AchievementBullet, LanguageChip, CertBadge, DatePill } from './PremiumComponents';

export const Sidebar2Template: React.FC<{ content: ResumeContent; design: DesignSettings }> = ({ content, design }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages } = content;

  return (
    <div style={{ fontFamily: design.font, fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight, color: '#1e293b', backgroundColor: '#fff', minHeight: '297mm', display: 'flex' }}>
      {/* Gradient sidebar */}
      <div style={{
        width: '35%',
        background: `linear-gradient(180deg, ${design.accentColor} 0%, ${design.accentColor}ee 50%, ${design.accentColor}dd 100%)`,
        color: '#fff', padding: `${design.margins + 2}mm ${design.margins - 1}mm`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: '50px', left: '-20px', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Photo circle */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '90px', height: '90px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', border: '3px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px', fontSize: '30px', fontWeight: 700,
              boxShadow: '0 0 25px rgba(255,255,255,0.08)',
            }}>
              {(personalInfo.fullName || 'YN').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <h1 style={{ fontSize: `${design.headingSize + 4}px`, fontWeight: 800, margin: 0, lineHeight: 1.15 }}>{personalInfo.fullName || 'Your Name'}</h1>
            {personalInfo.professionalTitle && <p style={{ fontSize: `${design.fontSize}px`, opacity: 0.9, marginTop: '4px', fontWeight: 300 }}>{personalInfo.professionalTitle}</p>}
          </div>

          {/* Contact */}
          <div style={{ marginBottom: '22px' }}>
            <SidebarSectionTitle title="Contact" icon="✉" accentColor={design.accentColor} />
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
              <SidebarSectionTitle title="Skills" icon="⚡" accentColor={design.accentColor} />
              {skills.map((g) => (
                <div key={g.id} style={{ marginBottom: '14px' }}>
                  <div style={{ fontWeight: 600, fontSize: `${design.fontSize - 1}px`, marginBottom: '6px', opacity: 0.95 }}>{g.category}</div>
                  {g.skills.map((s, i) => (
                    <SkillBar key={i} skill={s} accentColor={design.accentColor} fontSize={design.fontSize} />
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div style={{ marginBottom: '22px' }}>
              <SidebarSectionTitle title="Languages" icon="🌍" accentColor={design.accentColor} />
              {languages.map((l) => (
                <LanguageChip key={l.id} language={l.language} proficiency={l.proficiency} accentColor={design.accentColor} fontSize={design.fontSize} />
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <SidebarSectionTitle title="Certifications" icon="🏆" accentColor={design.accentColor} />
              {certifications.map((c) => (
                <CertBadge key={c.id} name={c.name} issuer={c.issuer} date={c.date} accentColor={design.accentColor} fontSize={design.fontSize} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: `${design.margins + 2}mm ${design.margins}mm` }}>
        {summary && (
          <div style={{ marginBottom: `${design.sectionSpacing + 4}px` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff' }}>★</div>
              <h2 style={{ fontSize: `${design.headingSize - 1}px`, fontWeight: 700, color: '#1e293b', margin: 0 }}>About</h2>
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
                <span style={{ fontSize: `${design.fontSize - 2}px`, color: '#94a3b8' }}>{edu.startDate} – {edu.endDate}</span>
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
