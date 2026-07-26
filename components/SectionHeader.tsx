'use client';

import { motion } from 'framer-motion';

export default function SectionHeader({
  index,
  title,
  subtitle,
  icon,
}: {
  index: string;
  title: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="text-center mb-16"
    >
      <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full mb-5">
        <span className="text-sm">{icon}</span>
        <span className="font-display text-xs tracking-[0.2em] text-white/50 uppercase">
          World {index}
        </span>
      </div>
      <h2 className="font-heading text-4xl md:text-6xl font-bold mb-3 tracking-tight">
        <span className="gradient-text">{title}</span>
      </h2>
      <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">{subtitle}</p>
    </motion.div>
  );
}
