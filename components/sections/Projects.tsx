'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CORE_PROJECTS,
  HACKATHON_PROJECTS,
  ML_PROJECTS,
  DSA_PROJECTS,
} from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { Github, ExternalLink, X } from 'lucide-react';

type Project = {
  id: string;
  emoji?: string;
  icon?: string;
  title: string;
  subtitle: string;
  category: string;
  techStack?: { label: string; color: string }[];
  techTags?: string[];
  techStackStr?: string;
  features?: string[];
  description?: string;
  highlights?: string[];
  tagline?: string;
  githubUrl?: string;
  liveUrl?: string | null;
};

const TABS = [
  { id: 'core', label: 'Full-Stack & AI', data: CORE_PROJECTS as unknown as Project[] },
  { id: 'hackathon', label: 'Hackathon', data: HACKATHON_PROJECTS as unknown as Project[] },
  { id: 'ml', label: 'Machine Learning', data: ML_PROJECTS as unknown as Project[] },
  { id: 'dsa', label: 'DSA & CS', data: DSA_PROJECTS as unknown as Project[] },
];

export default function Projects() {
  const [tab, setTab] = useState('core');
  const [selected, setSelected] = useState<Project | null>(null);

  const activeTab = TABS.find((t) => t.id === tab)!;
  const projects = activeTab.data;

  return (
    <section id="projects" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          index="04"
          title="Projects Galaxy"
          subtitle="Each project is its own world — click a planet to explore"
          icon="🌌"
        />

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`cursor-hover px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                tab === t.id
                  ? 'bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF] text-white'
                  : 'glass text-white/50 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6"
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelected(p)}
              className="cursor-hover relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 group cursor-pointer backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.28)]"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#4F8CFF]/10 to-transparent pointer-events-none" />

              {/* Planet icon */}
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-full glass-strong flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  {p.emoji || p.icon}
                </div>
                <div className="absolute -inset-2 rounded-full bg-[#4F8CFF]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="font-heading text-lg font-bold text-white mb-1">{p.title}</h3>
              <p className="text-white/50 text-sm mb-3">{p.subtitle}</p>

              {p.tagline && (
                <p className="text-xs text-[#7DF9FF]/80 mb-3 font-medium">{p.tagline}</p>
              )}

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {(Array.isArray(p.techStack) ? p.techStack : []).slice(0, 4).map((t) => (
                  <span
                    key={t.label}
                    className="text-xs px-2 py-0.5 rounded-md font-mono"
                    style={{ background: `${t.color}15`, color: t.color }}
                  >
                    {t.label}
                  </span>
                ))}
                {(p.techTags || []).slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-md font-mono bg-white/5 text-white/60"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Project details */}
              <div className="space-y-1.5 text-xs text-white/55 mb-4">
                {(p.features ?? p.highlights ?? [p.description ?? p.subtitle])
                  .slice(0, 2)
                  .map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#00F5FF] shrink-0" />
                      <span className="line-clamp-2">{detail}</span>
                    </div>
                  ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3">
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="cursor-hover text-white/40 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="cursor-hover text-white/40 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <span className="ml-auto text-xs text-[#7DF9FF] group-hover:translate-x-1 transition-transform">
                  Explore →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 glass-strong px-6 py-5 flex items-start justify-between border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-2xl">
                    {selected.emoji || selected.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">{selected.title}</h3>
                    <p className="text-white/50 text-sm">{selected.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="cursor-hover w-9 h-9 rounded-full glass flex items-center justify-center shrink-0"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>

              <div className="p-6">
                {selected.tagline && (
                  <p className="text-[#7DF9FF] text-sm font-medium mb-4">{selected.tagline}</p>
                )}

                {selected.description && (
                  <p className="text-white/60 text-sm leading-relaxed mb-6">{selected.description}</p>
                )}

                {/* Tech stack */}
                {Array.isArray(selected.techStack) && selected.techStack.length > 0 && (
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3 font-display">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selected.techStack.map((t) => (
                        <span
                          key={t.label}
                          className="text-xs px-3 py-1.5 rounded-lg font-mono"
                          style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}30` }}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selected.techTags && selected.techTags.length > 0 && (
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3 font-display">
                      Technologies
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selected.techTags.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1.5 rounded-lg font-mono bg-white/5 text-white/70 border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selected.techStackStr && (
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3 font-display">
                      Tech Stack
                    </div>
                    <p className="text-white/60 text-sm font-mono">{selected.techStackStr}</p>
                  </div>
                )}

                {/* Features */}
                {selected.features && selected.features.length > 0 && (
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3 font-display">
                      Features
                    </div>
                    <ul className="space-y-2">
                      {selected.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                          <span className="text-[#00F5FF] mt-0.5 shrink-0">▹</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Highlights */}
                {selected.highlights && selected.highlights.length > 0 && (
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3 font-display">
                      Highlights
                    </div>
                    <ul className="space-y-2">
                      {selected.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                          <span className="text-[#00F5FF] mt-0.5 shrink-0">▹</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {selected.githubUrl && (
                    <a
                      href={selected.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="cursor-hover glass px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  )}
                  {selected.liveUrl && (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="cursor-hover px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF] text-white flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
