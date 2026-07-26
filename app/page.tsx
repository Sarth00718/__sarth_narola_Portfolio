'use client';

import { useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import LoadingSequence from '@/components/LoadingSequence';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Timeline from '@/components/sections/Timeline';
import Achievements from '@/components/sections/Achievements';
import Certificates from '@/components/sections/Certificates';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingSequence onDone={() => setLoaded(true)} />
      <ParticleBackground />
      <CustomCursor />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Timeline />
        <Achievements />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
