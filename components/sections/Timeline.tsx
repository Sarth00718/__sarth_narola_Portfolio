'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { TIMELINE } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';

type TimelineItem = (typeof TIMELINE)[number] & {
  logoUrl?: string;
  logoAlt?: string;
};

export default function Timeline() {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section id="timeline" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 pb-24 sm:pb-32 md:pb-48">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          index="06"
          title="Journey Timeline"
          subtitle="Every milestone in my journey — from start to now"
          icon="🛗"
        />

        <div className="relative">
          {/* Central Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4F8CFF] via-[#00F5FF] to-transparent -translate-x-1/2" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8 md:space-y-16"
          >
            {TIMELINE.map((item, index) => {
              const isLeft = index % 2 === 0;
              const timelineItem = item as TimelineItem;

              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-[calc(50%-3rem)] ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="glass-strong rounded-3xl p-6 md:p-8 relative overflow-hidden border-2 group cursor-pointer"
                      style={{ 
                        borderColor: `${item.color}30`,
                        boxShadow: `0 0 40px ${item.color}15`,
                      }}
                    >
                      {/* Background Glow */}
                      <div
                        className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                        style={{ background: item.color }}
                      />
                      <div
                        className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                        style={{ background: item.color }}
                      />

                      <div className="relative z-10">
                        {/* Logo */}
                        {timelineItem.logoUrl && (
                          <div className={`flex ${isLeft ? 'md:justify-end' : 'md:justify-start'} mb-4`}>
                            <div
                              className="w-16 h-16 rounded-2xl glass border-2 border-white/20 overflow-hidden flex items-center justify-center"
                              style={{ boxShadow: `0 0 30px ${item.color}20` }}
                            >
                              <Image
                                src={timelineItem.logoUrl}
                                alt={timelineItem.logoAlt ?? 'Timeline logo'}
                                width={64}
                                height={64}
                                className="object-contain p-2"
                                priority={timelineItem.id === '2026-internship'}
                              />
                            </div>
                          </div>
                        )}

                        {/* Type Badge */}
                        <div className={`flex ${isLeft ? 'md:justify-end' : 'md:justify-start'} mb-3`}>
                          <span
                            className="inline-block text-xs font-mono font-bold px-3 py-1.5 rounded-lg"
                            style={{
                              background: `${item.color}20`,
                              color: item.color,
                            }}
                          >
                            {item.type}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                          {item.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-white/60 text-sm md:text-base mb-4">
                          {item.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-white/50 text-sm leading-relaxed mb-6">
                          {item.description}
                        </p>

                        {/* Items Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          {item.items.map((detail, i) => (
                            <div
                              key={i}
                              className="glass rounded-xl p-3 border border-white/5 hover:bg-white/5 transition-colors duration-300"
                            >
                              <div className="text-2xl mb-1">{detail.icon}</div>
                              <div className="text-xs text-white/40 mb-1 uppercase tracking-wide">
                                {detail.label}
                              </div>
                              <div className="text-sm font-bold text-white">{detail.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Circle */}
                  <div className="relative z-10 shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.4 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-display text-xl md:text-2xl font-bold relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)`,
                        boxShadow: `0 0 30px ${item.color}60, 0 0 60px ${item.color}30, inset 0 0 20px ${item.color}40`,
                        color: '#0A0E27',
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{ background: item.color }}
                      />
                      <span className="relative z-10">{item.floor}</span>
                    </motion.div>

                    {/* Year Badge */}
                    <div
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold px-3 py-1 rounded-full glass border whitespace-nowrap"
                      style={{
                        borderColor: `${item.color}40`,
                        color: item.color,
                      }}
                    >
                      {item.year}
                    </div>
                  </div>

                  {/* Empty Space for Alignment */}
                  <div className="hidden md:block w-[calc(50%-3rem)]" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
