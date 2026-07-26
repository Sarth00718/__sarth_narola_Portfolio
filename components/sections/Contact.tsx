'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { PROFILE } from '@/lib/data';
import SectionHeader from '@/components/SectionHeader';
import { GithubIcon, Linkedin, Mail, MapPin, Send, Check } from 'lucide-react';

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '';

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof INITIAL_FORM, string>>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors: Partial<Record<keyof typeof INITIAL_FORM, string>> = {};

    if (!form.name.trim()) nextErrors.name = 'Name is required';
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    if (!form.subject.trim()) nextErrors.subject = 'Subject is required';
    if (!form.message.trim()) nextErrors.message = 'Message is required';

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          reply_to: form.email,
          to_name: 'Sarth',
        },
        EMAILJS_PUBLIC_KEY
      );

      setSent(true);
      setForm(INITIAL_FORM);
      setTimeout(() => setSent(false), 7000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setTimeout(() => setSent(false), 6000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          index="09"
          title="Contact Portal"
          subtitle="Step through the portal and send a transmission"
          icon="🌀"
        />

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Portal visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center min-h-[400px]"
          >
            <div className="relative w-72 h-72">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-[#4F8CFF]/20 blur-3xl animate-pulse-glow" />

              {/* Portal rings */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.05, 1] }}
                  transition={{
                    rotate: { duration: 10 + i * 5, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 3 + i, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className="absolute rounded-full border-2"
                  style={{
                    inset: `${i * 20}px`,
                    borderColor: `rgba(${i === 0 ? '79,140,255' : i === 1 ? '0,245,255' : i === 2 ? '125,249,255' : '167,139,250'}, ${0.5 - i * 0.1})`,
                    borderStyle: i % 2 === 0 ? 'solid' : 'dashed',
                  }}
                />
              ))}

              {/* Core */}
              <div
                className="absolute inset-20 rounded-full flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle, rgba(79,140,255,0.3), rgba(0,245,255,0.1), transparent)',
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Mail className="w-12 h-12 text-[#7DF9FF]" style={{ filter: 'drop-shadow(0 0 15px #7DF9FF)' }} />
                </motion.div>
              </div>

              {/* Orbiting social icons */}
              {[
                { Icon: GithubIcon, link: PROFILE.github, color: '#ffffff' },
                { Icon: Linkedin, link: PROFILE.linkedin, color: '#0A66C2' },
                { Icon: Mail, link: `mailto:${PROFILE.email}`, color: '#7DF9FF' },
              ].map((social, i) => {
                const angle = (i / 3) * Math.PI * 2;
                const radius = 150;
                return (
                  <motion.a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-hover absolute top-1/2 left-1/2 w-11 h-11 rounded-full glass-strong flex items-center justify-center"
                    style={{ marginLeft: -22, marginTop: -22 }}
                    animate={{
                      x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI * 2) * radius, Math.cos(angle) * radius],
                      y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI * 2) * radius, Math.sin(angle) * radius],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  >
                    <social.Icon className="w-4 h-4 text-white/70" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Holographic form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-strong rounded-3xl p-8"
          >
            <h3 className="font-heading text-xl font-bold text-white mb-1">
              Send a Transmission
            </h3>
            <p className="text-white/40 text-sm mb-6">
              Let&apos;s build something together.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-white/50 mb-1.5 block font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#4F8CFF]/40 transition-all"
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#4F8CFF]/40 transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#4F8CFF]/40 transition-all"
                  placeholder="Project inquiry / collaboration / internship"
                />
                {errors.subject && <p className="mt-1.5 text-xs text-red-400">{errors.subject}</p>}
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block font-medium">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#4F8CFF]/40 transition-all resize-none"
                  placeholder="Let's connect..."
                />
                {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading || sent}
                className="cursor-hover w-full relative px-6 py-3.5 rounded-xl font-medium text-sm overflow-hidden group disabled:opacity-70"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF]" />
                <span className="absolute inset-0 bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF] blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                <span className="relative text-white flex items-center justify-center gap-2">
                  {sent ? (
                    <>
                      <Check className="w-4 h-4" /> Message Sent
                    </>
                  ) : loading ? (
                    'Transmitting...'
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap items-center gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                {PROFILE.email}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {PROFILE.location}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
