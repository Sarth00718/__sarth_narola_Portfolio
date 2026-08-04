'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon, Linkedin, Download, Menu, X } from 'lucide-react';
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
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6, ease: 'easeOut' }}
        className={`fixed left-1/2 z-50 transition-all duration-500 flex items-center justify-between gap-2 md:gap-4 rounded-full border border-white/10 ${
          scrolled ? 'top-4 py-2 px-4 shadow-[0_0_40px_rgba(79,140,255,0.15)]' : 'top-6 py-3 px-6 shadow-2xl'
        } w-[95%] max-w-[1200px]`}
        style={{
          background: scrolled ? 'rgba(5, 8, 22, 0.85)' : 'rgba(5, 8, 22, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Logo Section */}
        <button
          onClick={() => scrollTo('hero')}
          className="cursor-hover group shrink-0"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-[#4F8CFF]/60 transition-all duration-300 shadow-[0_0_15px_rgba(79,140,255,0.1)]">
            <Image
              src="/logo.png"
              alt="Sarth Narola"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center max-w-4xl">
          {NAV_SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`cursor-hover relative px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                active === s.id
                  ? 'text-white'
                  : 'text-white/60 hover:text-white/90 hover:bg-white/5'
              }`}
            >
              {active === s.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4F8CFF]/20 to-[#00F5FF]/20 border border-white/10"
                  style={{
                    boxShadow: '0 0 20px rgba(79, 140, 255, 0.1)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-1.5">
                <span className="text-sm">{s.icon}</span>
                <span className="hidden xl:block">{s.label}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <motion.a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-hover w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#4F8CFF]/60 hover:bg-[#4F8CFF]/10 transition-all duration-300"
          >
            <GithubIcon className="w-4 h-4" />
          </motion.a>
          <motion.a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-hover w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-[#0A66C2] hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 transition-all duration-300"
          >
            <Linkedin className="w-4 h-4" />
          </motion.a>

          <motion.a
            href={PROFILE.resumeUrl}
            download
            aria-label="Download Resume"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-hover flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs transition-all duration-300 relative overflow-hidden group ml-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF] blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-[#050816] flex items-center gap-1.5 whitespace-nowrap">
              <Download className="w-4 h-4" />
              <span className="hidden xl:block">Resume</span>
            </span>
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden cursor-hover border border-white/20 p-2.5 rounded-full hover:bg-white/5 hover:border-[#4F8CFF]/60 transition-all duration-300 shrink-0"
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[280px] max-w-[85vw] z-50 lg:hidden flex flex-col shadow-2xl"
              style={{
                background: 'linear-gradient(to bottom, rgba(10, 14, 39, 0.98), rgba(5, 8, 22, 0.98))',
                backdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(79, 140, 255, 0.3)',
              }}
            >
              {/* Header with Close Button */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between flex-shrink-0">
                <div>
                  <h3 className="font-heading text-base font-bold text-white">Menu</h3>
                  <p className="text-xs text-white/50 mt-0.5">Navigate portfolio</p>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 rounded-lg glass border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-4 overflow-y-auto scrollbar-hide">
                <ul className="space-y-1">
                  {NAV_SECTIONS.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollTo(section.id)}
                        className={`w-full px-4 py-3 rounded-lg text-left text-sm font-medium transition-all duration-200 flex items-center gap-3 ${
                          active === section.id
                            ? 'bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF] text-white shadow-lg'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span className="text-base">{section.icon}</span>
                        <span>{section.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer Actions */}
              <div className="p-4 border-t border-white/10 space-y-3 flex-shrink-0">
                {/* Social Links */}
                <div className="flex items-center gap-2">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 h-11 rounded-lg glass border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#4F8CFF]/60 transition-all"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 h-11 rounded-lg glass border border-white/20 flex items-center justify-center text-white/70 hover:text-[#0A66C2] hover:border-[#0A66C2]/60 transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>

                {/* Resume Download Button */}
                <a
                  href={PROFILE.resumeUrl}
                  download
                  onClick={() => setMenuOpen(false)}
                  className="w-full h-11 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold text-white transition-all relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF] group-hover:opacity-90 transition-opacity" />
                  <Download className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Download Resume</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
