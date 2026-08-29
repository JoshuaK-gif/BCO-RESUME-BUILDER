'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  FileText, Sparkles, Download, CheckCircle, ArrowRight,
  Zap, Shield, Clock, Star, ChevronRight
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion';
import { ResumePreview } from '@/components/templates/ResumePreview';
import { ResumeContent, DesignSettings } from '@/types/resume';

/* ─── section wrapper with scroll-triggered reveal ─── */
function RevealSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── floating dot decorations ─── */
function FloatingDots({ count = 6, color = '#0f5e9e' }: { count?: number; color?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-10"
          style={{
            background: color,
            width: 8 + Math.random() * 24,
            height: 8 + Math.random() * 24,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20 - Math.random() * 30, 0],
            x: [0, (Math.random() - 0.5) * 40, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

/* ─── mouse-follow gradient ─── */
function MouseGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [x, y]);

  return (
    <motion.div
      className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-0"
      style={{
        left: springX,
        top: springY,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(15,94,158,0.06) 0%, transparent 70%)',
      }}
    />
  );
}

/* ─── hero variant definitions ─── */
const heroText = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const heroWord = {
  hidden: { opacity: 0, y: 40, rotateX: -30 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

/* ─── card with 3D tilt ─── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useSpring(y, { stiffness: 300, damping: 30 }), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useSpring(x, { stiffness: 300, damping: 30 }), { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / 20);
    y.set(-(e.clientY - rect.top - rect.height / 2) / 20);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileHover={{ scale: 1.03, transition: { duration: 0.25 } }}
    >
      {children}
    </motion.div>
  );
}

/* ─── sparkle burst ─── */
function SparkleBurst() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => {
        const next = prev.filter((s) => Date.now() - s.id < 1000);
        if (next.length < 5) {
          next.push({ id: Date.now(), x: Math.random() * 100, y: Math.random() * 100 });
        }
        return next;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180] }}
          transition={{ duration: 0.8 }}
        >
          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
        </motion.div>
      ))}
    </div>
  );
}

const showcaseDesign: DesignSettings = {
  font: 'Inter', fontSize: 10, lineHeight: 1.5, margins: 12, sectionSpacing: 10,
  accentColor: '#1e40af', headingSize: 13, layout: 'classic',
  sectionOrder: ['summary', 'experience', 'education', 'skills'],
  nameSize: 22, subtitleSize: 12, boldHeadings: true, uppercaseHeadings: true,
};

const showcaseContent: ResumeContent = {
  personalInfo: {
    fullName: 'Sarah Johnson', professionalTitle: 'Product Designer',
    email: 'sarah@example.com', phone: '+1 (555) 987-6543', location: 'New York, NY',
    website: '', linkedin: '', github: '', portfolio: '',
  },
  summary: 'Creative product designer with 6+ years of experience crafting intuitive digital experiences for Fortune 500 companies.',
  experience: [
    { id: '1', position: 'Senior Product Designer', company: 'TechCorp', location: 'New York, NY', startDate: '2022-01', endDate: '', current: true, description: 'Lead design for core platform features.', achievements: ['Redesigned dashboard increasing user engagement by 35%', 'Managed design system used by 40+ engineers'] },
    { id: '2', position: 'Product Designer', company: 'StartupIO', location: 'Remote', startDate: '2019-06', endDate: '2021-12', current: false, description: '', achievements: ['Designed mobile app with 4.8 star rating'] },
  ],
  education: [
    { id: '1', institution: 'Parsons School of Design', degree: 'BFA', field: 'Design & Technology', startDate: '2015-09', endDate: '2019-05', description: '' },
  ],
  skills: [
    { id: '1', category: 'Design', skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping'] },
    { id: '2', category: 'Tools', skills: ['Miro', 'Jira', 'Notion', 'Git'] },
  ],
  projects: [],
  certifications: [],
  languages: [{ id: '1', language: 'English', proficiency: 'Native' }],
  awards: [], volunteerExperience: [], publications: [], references: '', interests: [], customSections: [],
};

/* ════════════════════════════════════════════════════ */
/*                    HOME PAGE                        */
/* ════════════════════════════════════════════════════ */
export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.92]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <MouseGlow />

      {/* ─── Navigation ─── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-xl z-50 border-b border-gray-100/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <motion.img
                src="/BRIDGE.png"
                alt="Bridge Collective Opportunities"
                className="h-10 sm:h-12 md:h-16 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-[#f97316] leading-tight">Bridge Collective</span>
                <span className="text-xs sm:text-sm font-bold text-[#f97316] leading-tight">Opportunities</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {['Templates', 'Pricing'].map((label, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={`/${label.toLowerCase()}`}
                    className="text-sm text-gray-600 hover:text-gray-900 relative group"
                  >
                    {label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0f5e9e] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 relative group">
                  Log in
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0f5e9e] transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Link href="/signup">
                  <Button className="bg-[#0f5e9e] hover:bg-[#0d4f85] shadow-lg shadow-[#0f5e9e]/25 hover:shadow-[#0f5e9e]/40 transition-shadow">
                    Create My CV
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ─── Hero ─── */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 overflow-hidden">
        {/* animated gradient bg */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            background: [
              'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 30%, #f5f3ff 60%, #fff1f2 100%)',
              'linear-gradient(135deg, #f5f3ff 0%, #fff1f2 30%, #f0f9ff 60%, #e0f2fe 100%)',
              'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 30%, #fff1f2 60%, #f5f3ff 100%)',
              'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 30%, #f5f3ff 60%, #fff1f2 100%)',
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <FloatingDots count={8} color="#0f5e9e" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-2 bg-[#0f5e9e]/10 text-[#0f5e9e] px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-[#0f5e9e]/20"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.span>
            AI-powered CV builder
          </motion.div>

          {/* heading – word-by-word */}
          <motion.h1
            variants={heroText}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 tracking-tight mb-6"
            style={{ perspective: 600 }}
          >
            {'Build a CV that gets you noticed.'.split(' ').map((word, i) => (
              <motion.span key={i} variants={heroWord} className="inline-block mr-[0.3em]">
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Create a professional, ATS-friendly CV in minutes with beautiful templates, smart AI assistance and powerful editing tools. Download each finished CV for just $1.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-[#0f5e9e] hover:bg-[#0d4f85] text-sm sm:text-base md:text-lg px-6 sm:px-8 shadow-xl shadow-[#0f5e9e]/30 hover:shadow-[#0f5e9e]/50 transition-all duration-300 group"
              >
                Create My CV
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="text-sm sm:text-base md:text-lg px-6 sm:px-8 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
                Explore Templates
              </Button>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-sm text-gray-500 mt-8"
          >
            $1 per CV download · No subscription · No recurring charges
          </motion.p>
        </motion.div>
      </section>

      {/* ─── Template Showcase ─── */}
      <RevealSection className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4"
            >
              Professional templates for every career
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Choose from 20+ ATS-friendly templates designed by professionals. Switch templates anytime without losing your content.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {([
              { name: 'Modern', id: 'modern-1', color: '#1e40af' },
              { name: 'Creative', id: 'creative-1', color: '#7c3aed' },
              { name: 'Bold', id: 'bold-1', color: '#dc2626' },
              { name: 'Minimal', id: 'minimal-1', color: '#111827' },
            ]).map((template, i) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, y: 40, rotateY: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Link href={`/templates`}>
                  <TiltCard className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 hover:shadow-xl hover:border-[#0f5e9e]/30 transition-all duration-500 cursor-pointer">
                    <div className="aspect-[3/4] rounded-lg mb-3 relative overflow-hidden border border-gray-100">
                      <div className="absolute inset-0 origin-top-left" style={{ transform: 'scale(0.48)', transformOrigin: 'top left', width: '208%', height: '208%' }}>
                        <ResumePreview content={showcaseContent} design={{ ...showcaseDesign, accentColor: template.color }} templateId={template.id} />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900 text-center">{template.name}</p>
                  </TiltCard>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/templates" className="text-[#0f5e9e] hover:text-[#0d4f85] font-medium text-sm inline-flex items-center gap-1 group">
              View all templates
              <motion.span className="inline-block" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <ChevronRight className="h-4 w-4" />
              </motion.span>
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* ─── How It Works ─── */}
      <RevealSection className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4"
            >
              How it works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-600"
            >
              Three simple steps to your professional CV
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* connecting line */}
            <div className="hidden md:block absolute top-7 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-[#0f5e9e]/20 via-[#0f5e9e]/40 to-[#0f5e9e]/20" />
            {[
              {
                step: '01',
                title: 'Build',
                description: 'Create your CV using a professional template. Add your experience, education, and skills.',
                icon: FileText,
              },
              {
                step: '02',
                title: 'Perfect',
                description: 'Use AI assistance, ATS analysis and editing tools to make your CV stand out.',
                icon: Sparkles,
              },
              {
                step: '03',
                title: 'Download',
                description: 'Pay $1 once for the CV you want to download. Re-download anytime.',
                icon: Download,
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center relative"
              >
                <motion.div
                  className="w-14 h-14 bg-[#0f5e9e] rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <item.icon className="h-7 w-7 text-white" />
                </motion.div>
                <div className="text-sm font-bold text-[#0f5e9e] mb-2">Step {item.step}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ─── Features ─── */}
      <RevealSection className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4"
            >
              Everything you need to build the perfect CV
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'AI Writing Assistant', description: 'Improve your content with smart suggestions and professional language.', icon: Sparkles, gradient: 'from-purple-500/10 to-blue-500/10' },
              { title: 'ATS Checker', description: 'Analyze your CV against applicant tracking systems with a 0-100 score.', icon: CheckCircle, gradient: 'from-green-500/10 to-emerald-500/10' },
              { title: 'Job Matching', description: 'Tailor your CV to specific job descriptions for better results.', icon: Zap, gradient: 'from-yellow-500/10 to-orange-500/10' },
              { title: 'Professional Templates', description: '20+ templates designed for different industries and career levels.', icon: FileText, gradient: 'from-blue-500/10 to-indigo-500/10' },
              { title: 'Live Preview', description: 'See changes instantly as you edit. What you see is what you get.', icon: Clock, gradient: 'from-pink-500/10 to-rose-500/10' },
              { title: 'Secure & Private', description: 'Your data is encrypted and never shared. You control your information.', icon: Shield, gradient: 'from-teal-500/10 to-cyan-500/10' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <TiltCard className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#0f5e9e]/20 transition-all duration-500 h-full">
                  <div className={`w-10 h-10 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className="h-5 w-5 text-[#0f5e9e]" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ─── Pricing ─── */}
      <RevealSection className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4"
          >
            Professional CV. Just $1 to download.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 mb-12"
          >
            Create as many CVs as you want. Pay only for the CVs you choose to download.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-md mx-auto relative overflow-hidden"
          >
            <SparkleBurst />
            <motion.div
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            >
              $1
            </motion.div>
            <div className="text-gray-500 mb-6">per CV · one-time payment</div>
            <ul className="text-left space-y-3 mb-8">
              {[
                'Unlimited CV creation',
                'All templates included',
                'AI assistance included',
                'ATS checker included',
                'No subscription',
                'No recurring billing',
                'No hidden fees',
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                  className="flex items-center gap-3 text-sm text-gray-600"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.06, type: 'spring', stiffness: 400 }}
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  </motion.span>
                  {item}
                </motion.li>
              ))}
            </ul>
            <Link href="/signup">
              <Button className="w-full bg-[#0f5e9e] hover:bg-[#0d4f85] shadow-lg shadow-[#0f5e9e]/25 hover:shadow-[#0f5e9e]/40 transition-all duration-300" size="lg">
                Create My CV
              </Button>
            </Link>
          </motion.div>
        </div>
      </RevealSection>

      {/* ─── Testimonials ─── */}
      <RevealSection className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4"
            >
              Loved by job seekers everywhere
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              See what our users say about building their CVs with us
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                name: 'Sarah M.',
                role: 'Marketing Manager',
                text: 'Landed my dream job within 2 weeks of using this CV builder. The AI suggestions were incredibly helpful and the templates are stunning.',
                stars: 5,
              },
              {
                name: 'James K.',
                role: 'Software Engineer',
                text: 'The ATS checker saved me from so many rejections. I optimized my CV and started getting callbacks. Worth every penny at just $1.',
                stars: 5,
              },
              {
                name: 'Priya R.',
                role: 'Recent Graduate',
                text: 'As a fresh graduate with no experience, the AI wizard helped me build a professional CV from scratch. The templates made it look amazing.',
                stars: 5,
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ─── Final CTA ─── */}
      <RevealSection className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0f5e9e]" />
        <FloatingDots count={6} color="#ffffff" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4"
          >
            Ready to build your professional CV?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-blue-100 mb-8 text-sm sm:text-base md:text-lg"
          >
            Join thousands of job seekers who created their CVs with our builder.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-[#0f5e9e] hover:bg-gray-100 text-sm sm:text-base md:text-lg px-6 sm:px-8 shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                Get Started Free
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </RevealSection>

      {/* ─── Footer ─── */}
      <footer className="py-12 bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <img src="/BRIDGE.png" alt="Bridge Collective Opportunities" className="h-8 sm:h-10 md:h-14 w-auto" />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-white leading-tight">Bridge Collective</span>
                <span className="text-xs sm:text-sm font-bold text-[#f97316] leading-tight">Opportunities</span>
              </div>
            </Link>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-400">
              {[
                { label: 'Pricing', href: '/pricing' },
                { label: 'Templates', href: '/templates' },
                { label: 'Contact', href: '/contact' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
              ].map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-white transition-colors duration-300">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2024 Bridge Collective Opportunities. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
