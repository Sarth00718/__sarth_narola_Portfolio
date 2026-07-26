'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES, SKILL_PROFICIENCY } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(SKILL_CATEGORIES[0].id);
  const active = SKILL_CATEGORIES.find((c) => c.id === activeCategory)!;
  const proficiencyGroups = [
    {
      title: 'Frontend',
      accent: '#4F8CFF',
      items: SKILL_PROFICIENCY.filter((skill) => skill.category === 'Frontend'),
    },
    {
      title: 'Backend',
      accent: '#00F5FF',
      items: SKILL_PROFICIENCY.filter((skill) => skill.category === 'Backend'),
    },
    {
      title: 'Database',
      accent: '#7DF9FF',
      items: SKILL_PROFICIENCY.filter((skill) => skill.category === 'Database'),
    },
    {
      title: 'AI / ML',
      accent: '#34D399',
      items: SKILL_PROFICIENCY.filter((skill) => skill.category === 'AI/ML'),
    },
    {
      title: 'DevOps',
      accent: '#A78BFA',
      items: SKILL_PROFICIENCY.filter((skill) => skill.category === 'DevOps'),
    },
  ];

  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="03"
          title="Skills Reactor"
          subtitle="Technologies powering my builds — tap a reactor core to explore"
          icon="⚛️"
        />

        {/* Category selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {SKILL_CATEGORIES.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              className="cursor-hover relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background:
                  activeCategory === cat.id ? cat.bg : 'rgba(255,255,255,0.03)',
                border: `1px solid ${activeCategory === cat.id ? cat.border : 'rgba(255,255,255,0.08)'}`,
                color: activeCategory === cat.id ? cat.color : 'rgba(255,255,255,0.5)',
              }}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Active reactor */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-[1fr_1.5fr] gap-8"
        >
          {/* Reactor core */}
          <div className="relative flex items-center justify-center min-h-[360px]">
            <div
              className="relative w-64 h-64"
              style={{ filter: `drop-shadow(0 0 40px ${active.color}40)` }}
            >
              {/* Pulsing glow */}
              <div
                className="absolute inset-0 rounded-full blur-3xl animate-pulse-glow"
                style={{ background: `${active.color}20` }}
              />
              {/* Rotating rings */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 10 + i * 8, repeat: Infinity, ease: 'linear' }}
                  className="absolute rounded-full border-2 border-dashed"
                  style={{
                    inset: `${i * 30}px`,
                    borderColor: `${active.color}${i === 0 ? '40' : i === 1 ? '30' : '20'}`,
                  }}
                />
              ))}
              {/* Core */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-20 rounded-full glass-strong flex items-center justify-center"
                style={{ borderColor: `${active.color}40` }}
              >
                <div className="text-center">
                  <div className="text-5xl mb-2">{active.icon}</div>
                  <div
                    className="font-heading text-sm font-semibold"
                    style={{ color: active.color }}
                  >
                    {active.label}
                  </div>
                </div>
              </motion.div>
              {/* Orbiting skill nodes */}
              {active.skills.slice(0, 6).map((skill, i) => {
                const angle = (i / Math.min(active.skills.length, 6)) * Math.PI * 2;
                const radius = 130;
                return (
                  <motion.div
                    key={skill}
                    className="absolute top-1/2 left-1/2"
                    animate={{
                      x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI * 2) * radius, Math.cos(angle) * radius],
                      y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI * 2) * radius, Math.sin(angle) * radius],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  >
                    <div
                      className="cursor-hover -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg glass text-xs font-medium whitespace-nowrap"
                      style={{ color: active.color, borderColor: `${active.color}30` }}
                    >
                      {skill}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Skill list */}
          <div className="space-y-3">
            {active.skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="glass rounded-xl p-4 flex items-center justify-between group hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: active.color, boxShadow: `0 0 10px ${active.color}` }}
                  />
                  <span className="text-white/80 text-sm font-medium">{skill}</span>
                </div>
                <div
                  className="text-xs px-2 py-1 rounded-md font-mono"
                  style={{ background: `${active.color}10`, color: active.color }}
                >
                  {active.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Proficiency bars */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="font-heading text-2xl font-semibold text-white mb-2">
              Proficiency Levels
            </h3>
            <p className="text-white/40 text-sm max-w-2xl mx-auto">
              Self-assessed mastery across the technologies I use most often, organized by category.
            </p>
          </div>
          <div className="grid gap-6 max-w-5xl mx-auto">
            {proficiencyGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIndex * 0.08, duration: 0.45 }}
                className="glass rounded-2xl p-5 md:p-6"
                style={{ borderColor: `${group.accent}20` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: group.accent, boxShadow: `0 0 12px ${group.accent}` }}
                    />
                    <h4 className="font-heading text-lg font-semibold text-white">{group.title}</h4>
                  </div>
                  <span className="text-xs font-mono text-white/35">
                    {group.items.length} skills
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                  {group.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: groupIndex * 0.08 + skillIndex * 0.05, duration: 0.45 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/75 font-medium">{skill.name}</span>
                        <span className="text-xs text-white/40 font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            delay: groupIndex * 0.08 + skillIndex * 0.05 + 0.18,
                            duration: 0.8,
                            ease: 'easeOut',
                          }}
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${group.accent}, #00F5FF)` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
