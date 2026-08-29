import React from 'react';

/* ─── Shared premium section title with icon ─── */
export function PremiumSectionTitle({
  title,
  icon,
  accentColor,
  headingSize,
}: {
  title: string;
  icon: string;
  accentColor: string;
  headingSize: number;
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '14px',
      paddingBottom: '8px',
      borderBottom: `2px solid ${accentColor}25`,
    }}>
      <div style={{
        width: '30px',
        height: '30px',
        borderRadius: '8px',
        background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        color: '#fff',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <h2 style={{
        fontSize: `${headingSize}px`,
        fontWeight: 700,
        color: '#0f172a',
        margin: 0,
        letterSpacing: '0.01em',
      }}>
        {title}
      </h2>
    </div>
  );
}

/* ─── Sidebar section title ─── */
export function SidebarSectionTitle({
  title,
  icon,
  accentColor,
}: {
  title: string;
  icon: string;
  accentColor: string;
}) {
  return (
    <h3 style={{
      fontSize: '10px',
      fontWeight: 700,
      color: accentColor,
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      marginBottom: '10px',
      paddingBottom: '6px',
      borderBottom: '1px solid rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    }}>
      <span style={{ fontSize: '11px' }}>{icon}</span> {title}
    </h3>
  );
}

/* ─── Contact badge chip ─── */
export function ContactBadge({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '10px',
      background: 'rgba(255,255,255,0.15)',
      padding: '4px 12px',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.2)',
    }}>
      {icon} {children}
    </span>
  );
}

/* ─── Skill progress bar ─── */
export function SkillBar({
  skill,
  accentColor,
  fontSize,
}: {
  skill: string;
  accentColor: string;
  fontSize: number;
}) {
  const width = 70 + Math.random() * 30;
  return (
    <div style={{ marginBottom: '6px' }}>
      <div style={{
        fontSize: `${fontSize - 1.5}px`,
        color: '#e2e8f0',
        marginBottom: '3px',
      }}>
        {skill}
      </div>
      <div style={{
        height: '4px',
        background: 'rgba(255,255,255,0.12)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${width}%`,
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`,
          borderRadius: '2px',
        }} />
      </div>
    </div>
  );
}

/* ─── Skill pill badge ─── */
export function SkillPill({
  skill,
  accentColor,
  fontSize,
  premium = false,
}: {
  skill: string;
  accentColor: string;
  fontSize: number;
  premium?: boolean;
}) {
  return (
    <span style={{
      padding: '4px 12px',
      borderRadius: '14px',
      fontSize: `${fontSize - 1.5}px`,
      fontWeight: 500,
      ...(premium
        ? {
            color: '#fff',
            background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
          }
        : {
            color: accentColor,
            background: `${accentColor}12`,
            border: `1px solid ${accentColor}25`,
          }),
    }}>
      {skill}
    </span>
  );
}

/* ─── Timeline dot + line ─── */
export function TimelineDot({
  color,
  size = 12,
}: {
  color: string;
  size?: number;
}) {
  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${color}, ${color}cc)`,
      flexShrink: 0,
      boxShadow: `0 0 0 3px ${color}18`,
    }} />
  );
}

export function TimelineLine({ color }: { color: string }) {
  return (
    <div style={{
      width: '2px',
      flex: 1,
      background: `linear-gradient(180deg, ${color}40, ${color}10)`,
      marginLeft: '5px',
      marginTop: '4px',
    }} />
  );
}

/* ─── Card section with consistent styling ─── */
export function CardSection({
  title,
  icon,
  accentColor,
  headingSize,
  children,
}: {
  title: string;
  icon: string;
  accentColor: string;
  headingSize: number;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      marginBottom: '16px',
      padding: '16px',
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      <PremiumSectionTitle title={title} icon={icon} accentColor={accentColor} headingSize={headingSize} />
      {children}
    </div>
  );
}

/* ─── Date pill ─── */
export function DatePill({
  start,
  end,
  current,
  accentColor,
  fontSize,
}: {
  start: string;
  end: string;
  current: boolean;
  accentColor: string;
  fontSize: number;
}) {
  return (
    <span style={{
      fontSize: `${fontSize - 2}px`,
      color: '#64748b',
      whiteSpace: 'nowrap',
      marginLeft: '12px',
      padding: '3px 10px',
      background: `${accentColor}10`,
      borderRadius: '12px',
      fontWeight: 500,
      flexShrink: 0,
    }}>
      {start} – {current ? 'Present' : end}
    </span>
  );
}

/* ─── Certification badge ─── */
export function CertBadge({
  name,
  issuer,
  date,
  accentColor,
  fontSize,
}: {
  name: string;
  issuer: string;
  date: string;
  accentColor: string;
  fontSize: number;
}) {
  return (
    <div style={{
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
    }}>
      <div style={{
        width: '20px',
        height: '20px',
        background: accentColor,
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        color: '#fff',
        fontWeight: 700,
        flexShrink: 0,
      }}>
        ✓
      </div>
      <div>
        <span style={{ fontWeight: 600, fontSize: `${fontSize - 1}px`, color: '#0f172a' }}>{name}</span>
        <p style={{ color: '#94a3b8', fontSize: `${fontSize - 1.5}px`, margin: '1px 0 0' }}>
          {issuer}{date ? ` · ${date}` : ''}
        </p>
      </div>
    </div>
  );
}

/* ─── Language chip ─── */
export function LanguageChip({
  language,
  proficiency,
  accentColor,
  fontSize,
  variant = 'default',
}: {
  language: string;
  proficiency: string;
  accentColor: string;
  fontSize: number;
  variant?: 'default' | 'badge';
}) {
  if (variant === 'badge') {
    return (
      <span style={{
        padding: '6px 14px',
        background: `${accentColor}08`,
        borderRadius: '20px',
        border: `1.5px solid ${accentColor}25`,
        fontSize: `${fontSize - 0.5}px`,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <span style={{ width: '6px', height: '6px', background: accentColor, borderRadius: '50%' }} />
        <strong style={{ color: '#0f172a' }}>{language}</strong>
        <span style={{ color: '#94a3b8', fontSize: `${fontSize - 1.5}px` }}>{proficiency}</span>
      </span>
    );
  }

  return (
    <div style={{
      fontSize: `${fontSize - 1}px`,
      marginBottom: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    }}>
      <span style={{ width: '6px', height: '6px', background: accentColor, borderRadius: '50%', flexShrink: 0 }} />
      <strong style={{ color: '#0f172a' }}>{language}</strong>
      <span style={{ color: '#94a3b8' }}>{proficiency}</span>
    </div>
  );
}

/* ─── Achievement bullet ─── */
export function AchievementBullet({
  text,
  accentColor,
  fontSize,
  icon = '→',
}: {
  text: string;
  accentColor: string;
  fontSize: number;
  icon?: string;
}) {
  return (
    <li style={{
      marginBottom: '3px',
      lineHeight: 1.5,
      paddingLeft: '18px',
      position: 'relative',
      fontSize: `${fontSize - 0.5}px`,
      color: '#334155',
    }}>
      <span style={{
        position: 'absolute',
        left: 0,
        color: accentColor,
        fontWeight: 700,
      }}>
        {icon}
      </span>
      {text}
    </li>
  );
}
