'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE, ABOUT_PANELS } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { X } from 'lucide-react';

export default function About() {
  const [selected, setSelected] = useState<(typeof ABOUT_PANELS)[0] | null>(null);

  return (
    <section id="about" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="02"
          title="About Me"
          subtitle="A holographic profile of who I am and what I build"
          icon="🪐"
        />

        {/* Profile Image Section */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center order-1 lg:order-none"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
              {/* Single rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, rgba(79, 140, 255, 0.4) 25%, transparent 50%, rgba(0, 245, 255, 0.4) 75%, transparent 100%)',
                }}
              />

              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4F8CFF]/20 to-[#00F5FF]/20 blur-2xl" />

              {/* Main profile image */}
              <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px] rounded-full overflow-hidden border-4 border-[#4F8CFF]/50 shadow-2xl bg-gradient-to-br from-[#1a1f3a] to-[#0A0E27]">
                {/* Profile Image */}
                <Image
                  src="/IMGME.png"
                  alt={PROFILE.name}
                  fill
                  className="object-cover mix-blend-lighten"
                  style={{ filter: 'brightness(1.1) contrast(1.1)' }}
                  priority
                />

                {/* Subtle gradient overlay */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(79,140,255,0.2) 100%)',
                  }}
                />

                {/* Inner border glow */}
                <div className="absolute inset-0 rounded-full border-2 border-[#00F5FF]/30 pointer-events-none" />
              </div>

              {/* Clean corner accents */}
              <div className="absolute -inset-6 sm:-inset-8">
                <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-[#4F8CFF] rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-[#00F5FF] rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-[#00F5FF] rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-[#4F8CFF] rounded-br-lg" />
              </div>
            </div>
          </motion.div>

          {/* Profile text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2"
          >
            <h3 className="font-heading text-xl sm:text-2xl font-bold mb-3 text-white">
              {PROFILE.title}
            </h3>
            <p className="text-white/60 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">{PROFILE.summary}</p>

            <div className="mb-6 sm:mb-8">
              <div className="text-xs uppercase tracking-[0.2em] text-[#7DF9FF]/70 mb-3 font-display">
                Core Expertise
              </div>
              <div className="flex flex-wrap gap-2">
                {PROFILE.expertise.map((e) => (
                  <span
                    key={e}
                    className="glass px-3 py-1.5 rounded-lg text-xs sm:text-sm text-white/70"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#7DF9FF]/70 mb-3 font-display">
                Looking For
              </div>
              <div className="flex flex-wrap gap-2">
                {PROFILE.lookingFor.map((l) => (
                  <span
                    key={l}
                    className="px-3 py-1.5 rounded-lg text-xs sm:text-sm text-white/70 border border-[#4F8CFF]/20 bg-[#4F8CFF]/5"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Data panels grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-12 sm:mt-16">
          {ABOUT_PANELS.map((panel, i) => (
            <motion.button
              key={panel.id}
              onClick={() => setSelected(panel)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="cursor-hover glass rounded-xl sm:rounded-2xl p-4 sm:p-5 text-left group transition-all"
              style={{ borderColor: `${panel.color}30` }}
            >
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-lg sm:text-xl mb-2 sm:mb-3"
                style={{ background: `${panel.color}15` }}
              >
                {panel.icon}
              </div>
              <div className="text-xs text-white/40 uppercase tracking-wide mb-1">
                {panel.label}
              </div>
              <div className="font-heading font-semibold text-white text-xs sm:text-sm mb-0.5">
                {panel.title}
              </div>
              <div className="text-xs text-white/50">{panel.subtitle}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Expanded panel modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-8 max-w-md w-full relative"
              style={{ borderColor: `${selected.color}40` }}
            >
              <button
                onClick={() => setSelected(null)}
                className="cursor-hover absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
                style={{ background: `${selected.color}15` }}
              >
                {selected.icon}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: selected.color }}>
                {selected.label}
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                {selected.title}
              </h3>
              <p className="text-white/60 mb-1">{selected.subtitle}</p>
              <p className="text-white/40 text-sm">{selected.detail}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
