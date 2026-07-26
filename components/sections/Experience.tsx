'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="04"
          title="Work Experience"
          subtitle="Real-world projects and professional contributions"
          icon="💼"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              whileHover={{ scale: 1.01, y: -5 }}
              className="glass-strong rounded-3xl p-6 md:p-10 relative overflow-hidden border-2 group"
              style={{
                borderColor: `${exp.color}30`,
                boxShadow: `0 0 40px ${exp.color}15`,
              }}
            >
              {/* Background Glows */}
              <div
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                style={{ background: exp.color }}
              />
              <div
                className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                style={{ background: exp.color }}
              />

              <div className="relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                  {/* Left: Title & Company */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      {/* Company Logo */}
                      {exp.logo && (
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          className="w-16 h-16 md:w-20 md:h-20 rounded-2xl glass border-2 border-white/20 overflow-hidden flex items-center justify-center shrink-0"
                          style={{ boxShadow: `0 0 30px ${exp.color}30` }}
                        >
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={80}
                            height={80}
                            className="object-contain p-2"
                          />
                        </motion.div>
                      )}

                      <div>
                        <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-lg md:text-xl font-semibold" style={{ color: exp.color }}>
                            {exp.company}
                          </span>
                          <span className="text-white/40">•</span>
                          <span
                            className="text-xs font-mono font-bold px-3 py-1 rounded-lg"
                            style={{
                              background: `${exp.color}20`,
                              color: exp.color,
                            }}
                          >
                            {exp.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            📅 {exp.duration}
                          </span>
                          <span className="text-white/30">•</span>
                          <span className="flex items-center gap-1">
                            📍 {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 leading-relaxed text-base mb-6">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Key Contributions */}
                <div className="mb-6">
                  <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    Key Contributions
                  </h4>
                  <div className="space-y-2">
                    {exp.contributions.map((contribution, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 text-white/60 text-sm md:text-base"
                      >
                        <span
                          className="shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                          style={{ background: exp.color }}
                        />
                        <span>{contribution}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                    <span>🛠️</span>
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium glass border border-white/10 hover:bg-white/10 transition-colors duration-300"
                        style={{
                          color: tech.color || exp.color,
                        }}
                      >
                        {tech.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
