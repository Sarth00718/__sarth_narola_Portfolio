'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PROFILE } from '@/lib/data';
import { Github, Linkedin, Mail, ExternalLink, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: PROFILE.github, label: 'GitHub' },
    { icon: Linkedin, href: PROFILE.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${PROFILE.email}`, label: 'Email' },
  ];

  const quickLinks = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Hackathons', id: 'projects' },
    { label: 'Achievements', id: 'achievements' },
  ];

  const experienceLinks = [
    { label: 'Skills', id: 'skills' },
    { label: 'Certificates', id: 'certificates' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="relative pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 px-4 sm:px-6 mt-16 sm:mt-24 md:mt-32 border-t border-white/5 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0E27]/50 to-[#050816] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-[#4F8CFF]/50 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Logo & Name */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden glass-strong border-2 border-white/10">
                  <Image
                    src="/logo.png"
                    alt="Sarth Narola Logo"
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    {PROFILE.name}
                  </h3>
                  <p className="text-sm text-white/60 font-medium">
                    Full Stack Developer & AI Engineer
                  </p>
                </div>
              </div>

              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-md">
                Building production-ready systems at the intersection of modern web and AI-integrated pipelines.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-[#4F8CFF]/50 hover:bg-[#4F8CFF]/10 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigate Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
                Navigate
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-white/60 hover:text-[#4F8CFF] text-sm transition-colors duration-300 hover:translate-x-1 inline-block transform"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sections */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
                Sections
              </h4>
              <ul className="space-y-3">
                {experienceLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-white/60 hover:text-[#4F8CFF] text-sm transition-colors duration-300 hover:translate-x-1 inline-block transform"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Status Section */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
                Status
              </h4>
              <div className="space-y-4">
                {/* Availability Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass border border-emerald-500/30 bg-emerald-500/10">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-emerald-400">
                    Available for Opportunities
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <p className="text-sm text-white/60 font-medium">
                    Open to SDE, Full Stack, and AI/ML roles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 rounded-lg glass border border-white/10 text-white/50">
                      Remote
                    </span>
                    <span className="text-xs px-3 py-1 rounded-lg glass border border-white/10 text-white/50">
                      Hybrid
                    </span>
                    <span className="text-xs px-3 py-1 rounded-lg glass border border-white/10 text-white/50">
                      On-site
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/40 text-sm text-center md:text-left">
            © {currentYear} {PROFILE.name}. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-white/60 hover:text-[#4F8CFF] transition-colors duration-300"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
