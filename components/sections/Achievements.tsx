'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ACHIEVEMENTS, CP_PROFILES } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { X, ExternalLink } from 'lucide-react';

export default function Achievements() {
  const [selected, setSelected] = useState<(typeof ACHIEVEMENTS)[0] | null>(null);

  return (
    <section id="achievements" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="07"
          title="Crystal Cave"
          subtitle="Glowing trophies of milestones and recognitions"
          icon="🏆"
        />

        {/* Crystal grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.button
              key={a.id}
              onClick={() => setSelected(a)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, rotateY: 5 }}
              className="cursor-hover group relative"
            >
              <div className="relative aspect-[3/4] glass rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 text-center"
                style={{ borderColor: `${a.color}30` }}
              >
                {/* Crystal glow */}
                <div
                  className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${a.color}, transparent 70%)`,
                  }}
                />

                {/* Crystal shape */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative mb-4"
                >
                  <div
                    className="w-20 h-24 relative"
                    style={{
                      background: `linear-gradient(135deg, ${a.color}40, ${a.color}10)`,
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                      boxShadow: `0 0 30px ${a.color}40`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-3xl">
                      {a.icon}
                    </div>
                  </div>
                </motion.div>

                <div
                  className="text-xs font-mono px-2 py-0.5 rounded mb-2"
                  style={{ background: `${a.color}15`, color: a.color }}
                >
                  {a.type}
                </div>
                <h3 className="font-heading text-sm font-bold text-white mb-1 leading-tight">
                  {a.title}
                </h3>
                <p className="text-xs text-white/40">{a.organization}</p>
                <p className="text-xs text-white/30 mt-1">{a.date}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Competitive programming */}
        <div>
          <div className="text-center mb-8">
            <h3 className="font-heading text-2xl font-bold gradient-text mb-2">
              Competitive Programming
            </h3>
            <p className="text-white/40 text-sm">Active across major CP platforms</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {CP_PROFILES.map((cp, i) => (
              <motion.a
                key={cp.platform}
                href={cp.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="cursor-hover glass rounded-2xl p-6 group relative overflow-hidden block"
                style={{ borderColor: `${cp.color}25` }}
              >
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-10 group-hover:opacity-25 transition-opacity"
                  style={{ background: cp.color }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-heading text-lg font-bold text-white">{cp.platform}</h4>
                    <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
                  </div>
                  <div
                    className="font-mono text-sm mb-2"
                    style={{ color: cp.color }}
                  >
                    @{cp.handle}
                  </div>
                  <div className="text-xs text-white/50 mb-3">{cp.status}</div>
                  <p className="text-xs text-white/40 leading-relaxed">{cp.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Detail modal */}
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
              className="glass-strong rounded-3xl p-8 max-w-md w-full relative text-center"
              style={{ borderColor: `${selected.color}40` }}
            >
              <button
                onClick={() => setSelected(null)}
                className="cursor-hover absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
              <div
                className="w-24 h-28 mx-auto mb-4 relative"
                style={{
                  background: `linear-gradient(135deg, ${selected.color}50, ${selected.color}15)`,
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  boxShadow: `0 0 40px ${selected.color}60`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                  {selected.icon}
                </div>
              </div>
              <div
                className="text-xs font-mono px-3 py-1 rounded-md inline-block mb-3"
                style={{ background: `${selected.color}15`, color: selected.color }}
              >
                {selected.type}
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-1">{selected.title}</h3>
              <p className="text-white/50 text-sm mb-4">
                {selected.organization} · {selected.date}
              </p>
              <p className="text-white/60 text-sm leading-relaxed">{selected.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
