'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Download, Menu, X } from 'lucide-react';
import { NAV_SECTIONS, PROFILE } from '@/lib/data';

export default function Navigation() {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_SECTIONS.map((s) => document.getElementById(s.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActive(NAV_SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-4'
        }`}
        style={{
          background: scrolled ? 'rgba(5, 8, 22, 0.95)' : 'rgba(5, 8, 22, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(79, 140, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
          {/* Logo Section */}
          <button
            onClick={() => scrollTo('hero')}
            className="cursor-hover group shrink-0"
          >
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-white/20 group-hover:border-[#4F8CFF]/60 transition-all duration-300">
              <Image
                src="/logo.png"
                alt="Sarth Narola"
                width={44}
                height={44}
                className="object-cover"
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1.5 flex-1 justify-center max-w-3xl">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`cursor-hover relative px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                  active === s.id
                    ? 'text-white'
                    : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                }`}
              >
                {active === s.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF]"
                    style={{
                      boxShadow: '0 0 20px rgba(79, 140, 255, 0.5)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  <span className="text-sm">{s.icon}</span>
                  <span>{s.label}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <motion.a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-hover w-10 h-10 rounded-xl border-2 border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#4F8CFF]/60 hover:bg-[#4F8CFF]/10 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-hover w-10 h-10 rounded-xl border-2 border-white/20 flex items-center justify-center text-white/70 hover:text-[#0A66C2] hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>

            <motion.a
              href={PROFILE.resumeUrl}
              download
              aria-label="Download Resume"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-hover flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden group ml-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF] blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
              <span className="relative text-white flex items-center gap-2 whitespace-nowrap">
                <Download className="w-4 h-4" />
                Resume
              </span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="xl:hidden cursor-hover border-2 border-white/20 p-2.5 rounded-xl hover:bg-white/5 hover:border-[#4F8CFF]/60 transition-all duration-300 shrink-0"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 xl:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] z-50 xl:hidden p-6 overflow-y-auto"
              style={{
                background: 'rgba(5, 8, 22, 0.98)',
                backdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(79, 140, 255, 0.2)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white/20">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-heading text-base font-bold text-white">Sarth Narola</div>
                    <div className="text-xs text-white/60">Full Stack Developer</div>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 rounded-xl border-2 border-white/20 flex items-center justify-center hover:bg-white/5 hover:border-[#4F8CFF]/60 transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2 mb-6">
                {NAV_SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`cursor-hover px-4 py-3.5 rounded-xl text-left text-sm font-semibold transition-all duration-300 relative overflow-hidden ${
                      active === s.id ? 'text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {active === s.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF]" />
                    )}
                    <span className="relative flex items-center gap-3">
                      <span className="text-lg">{s.icon}</span>
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Social & Resume */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 h-12 rounded-xl border-2 border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 hover:border-[#4F8CFF]/60 transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 h-12 rounded-xl border-2 border-white/20 flex items-center justify-center text-white/70 hover:text-[#0A66C2] hover:bg-white/5 hover:border-[#0A66C2]/60 transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>

                <a
                  href={PROFILE.resumeUrl}
                  download
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF]" />
                  <span className="relative text-white flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Resume
                  </span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
