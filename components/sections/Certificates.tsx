'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CERTIFICATES } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { Download, X } from 'lucide-react';

export default function Certificates() {
  const [selected, setSelected] = useState<(typeof CERTIFICATES)[0] | null>(null);

  return (
    <section id="certificates" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="08"
          title="Certificate Museum"
          subtitle="Holographic displays of verified achievements"
          icon="🏛️"
        />

        <div className="grid sm:grid-cols-2 gap-6">
          {CERTIFICATES.map((cert, i) => (
            <motion.button
              key={cert.id}
              onClick={() => setSelected(cert)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="cursor-hover group relative overflow-hidden rounded-2xl glass p-1 text-left"
              style={{ borderColor: `${cert.color}25` }}
            >
              {/* Holographic frame */}
              <div className="relative rounded-xl overflow-hidden">
                {/* Scan line effect on hover */}
                <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div
                    className="absolute w-full h-px animate-scan"
                    style={{ background: `${cert.color}80`, boxShadow: `0 0 10px ${cert.color}` }}
                  />
                </div>

                {/* Glow */}
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${cert.color}, transparent 70%)`,
                  }}
                />

                <div className="relative p-6">
                  {/* Certificate header */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: `${cert.color}15` }}
                    >
                      {cert.icon}
                    </div>
                    <div
                      className="text-xs font-mono px-2.5 py-1 rounded-md"
                      style={{ background: `${cert.color}15`, color: cert.color }}
                    >
                      {cert.category}
                    </div>
                  </div>

                  {/* Holographic display */}
                  <div
                    className="relative h-32 rounded-xl mb-5 overflow-hidden flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${cert.color}08, transparent)`,
                      border: `1px solid ${cert.color}20`,
                    }}
                  >
                    {/* Grid lines */}
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    {/* Holographic content */}
                    <div className="relative text-center px-4">
                      <div className="text-xs uppercase tracking-[0.3em] text-white/30 mb-1">
                        Certificate of
                      </div>
                      <div
                        className="font-heading text-lg font-bold mb-1"
                        style={{ color: cert.color }}
                      >
                        {cert.title}
                      </div>
                      <div className="text-xs text-white/40">— {cert.issuer} —</div>
                    </div>
                    {/* Corner accents */}
                    {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map(
                      (pos, idx) => (
                        <div
                          key={idx}
                          className={`absolute ${pos} w-4 h-4 border-${pos.includes('left') ? 'l' : 'r'}-2 border-${
                            pos.includes('top') ? 't' : 'b'
                          }-2`}
                          style={{ borderColor: `${cert.color}40` }}
                        />
                      )
                    )}
                  </div>

                  <h3 className="font-heading text-base font-bold text-white mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-white/40 text-xs mb-3">
                    {cert.issuer} · {cert.date}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-white/50"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Fullscreen certificate view */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotateX: 15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.85, opacity: 0, rotateX: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-8 md:p-12 max-w-lg w-full relative text-center"
              style={{ borderColor: `${selected.color}40` }}
            >
              <button
                onClick={() => setSelected(null)}
                className="cursor-hover absolute top-4 right-4 w-9 h-9 rounded-full glass flex items-center justify-center"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>

              {/* Glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${selected.color}, transparent 60%)`,
                }}
              />

              <div className="relative">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-5"
                  style={{ background: `${selected.color}15` }}
                >
                  {selected.icon}
                </div>

                <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">
                  Certificate of {selected.category}
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2" style={{ color: selected.color }}>
                  {selected.title}
                </h3>
                <p className="text-white/50 text-sm mb-1">Issued by {selected.issuer}</p>
                <p className="text-white/30 text-xs mb-6">{selected.date}</p>

                <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-md mx-auto">
                  {selected.description}
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  {selected.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1.5 rounded-lg font-mono"
                      style={{ background: `${selected.color}10`, color: selected.color, border: `1px solid ${selected.color}25` }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {selected.certificateUrl && (
                  <a
                    href={selected.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="cursor-hover inline-flex items-center justify-center gap-2 mt-7 px-5 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: `${selected.color}15`,
                      border: `1px solid ${selected.color}35`,
                      color: selected.color,
                    }}
                  >
                    <Download className="w-4 h-4" />
                    View Certificate
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
