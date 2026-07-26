'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '@/lib/data';
import { Github, Linkedin, Mail, MapPin, ArrowDown, Download } from 'lucide-react';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = PROFILE.roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayText.length < role.length) {
      timeout = setTimeout(() => setDisplayText(role.slice(0, displayText.length + 1)), 80);
    } else if (!deleting && displayText.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(role.slice(0, displayText.length - 1)), 40);
    } else if (deleting && displayText.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % PROFILE.roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayText, deleting, roleIndex]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20"
    >
      {/* Central planet */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="relative w-[500px] h-[500px] md:w-[700px] md:h-[700px]">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-[#4F8CFF]/10 blur-3xl animate-pulse-glow" />
          {/* Planet core */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-16 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, #1a2456, #0a0f2e 50%, #050816 80%)',
              boxShadow:
                'inset -30px -30px 80px rgba(0,0,0,0.6), inset 20px 20px 60px rgba(79,140,255,0.15), 0 0 100px rgba(79,140,255,0.2)',
            }}
          >
            {/* Surface texture lines */}
            <div className="absolute inset-0 rounded-full opacity-30 bg-grid" />
          </motion.div>
          {/* Orbit rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{ duration: 20 + i * 15, repeat: Infinity, ease: 'linear' }}
              className="absolute rounded-full border border-dashed"
              style={{
                inset: `${i * 50 + 20}px`,
                borderColor: `rgba(${i === 0 ? '79,140,255' : i === 1 ? '0,245,255' : '125,249,255'}, 0.15)`,
              }}
            >
              <div
                className="absolute w-3 h-3 rounded-full -top-1.5 left-1/2"
                style={{
                  background: i === 0 ? '#4F8CFF' : i === 1 ? '#00F5FF' : '#7DF9FF',
                  boxShadow: `0 0 15px ${i === 0 ? '#4F8CFF' : i === 1 ? '#00F5FF' : '#7DF9FF'}`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.6 }}
          className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-white/70 font-medium tracking-wide">
            {PROFILE.availability.status}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.7 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          <span className="text-white">Sarth</span>{' '}
          <span className="gradient-text">Narola</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.5 }}
          className="h-8 mb-6 flex items-center justify-center"
        >
          <span className="font-display text-lg md:text-2xl text-[#7DF9FF] text-glow-accent">
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.6 }}
          className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-10"
        >
          {PROFILE.tagline}. Final-year CS student at {PROFILE.university} (CGPA {PROFILE.cgpa}).
          Selected for Amazon ML Summer School 2025.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={scrollToAbout}
            className="cursor-hover group relative px-7 py-3.5 rounded-xl font-medium text-sm overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF] opacity-90" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF] blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
            <span className="relative text-white flex items-center gap-2">
              Enter Universe
              <ArrowDown className="w-4 h-4" />
            </span>
          </button>

          <a
            href={PROFILE.resumeUrl}
            download
            className="cursor-hover inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm transition-all duration-200"
            style={{
              background: 'rgba(79,140,255,0.18)',
              border: '1px solid rgba(79,140,255,0.35)',
              color: 'var(--primary)',
            }}
          >
            <Download className="w-4 h-4" />
            Resume
          </a>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="cursor-hover glass w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-white/70" />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="cursor-hover glass w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-white/70" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="cursor-hover glass w-12 h-12 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-white/70" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 0.5 }}
          className="flex items-center justify-center gap-6 text-xs text-white/40"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {PROFILE.location}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>{PROFILE.university}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Class of {PROFILE.graduationYear}</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#7DF9FF]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
