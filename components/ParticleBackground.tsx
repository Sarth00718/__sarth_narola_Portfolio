'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  twinkle: number;
  twinkleSpeed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();

    const starCount = Math.min(Math.floor((width * height) / 4000), 280);
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2,
        size: Math.random() * 1.6 + 0.3,
        speed: Math.random() * 0.05 + 0.01,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
      });
    }

    const particles: Particle[] = [];
    const colors = ['#4F8CFF', '#7DF9FF', '#00F5FF', '#A78BFA'];

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (Math.random() < 0.3) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: Math.random() * 60 + 40,
        });
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resize);

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let t = 0;
    const render = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Nebula gradient blobs
      const blob1X = width * 0.2 + Math.sin(t * 0.1) * 80;
      const blob1Y = height * 0.3 + Math.cos(t * 0.08) * 60 + scrollY * 0.3;
      const blob1R = Math.max(50, 300);
      const grad1 = ctx.createRadialGradient(blob1X, blob1Y, 0, blob1X, blob1Y, blob1R);
      grad1.addColorStop(0, 'rgba(79, 140, 255, 0.08)');
      grad1.addColorStop(1, 'rgba(79, 140, 255, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const blob2X = width * 0.8 + Math.cos(t * 0.12) * 100;
      const blob2Y = height * 0.7 + Math.sin(t * 0.1) * 80 + scrollY * 0.2;
      const grad2 = ctx.createRadialGradient(blob2X, blob2Y, 0, blob2X, blob2Y, 320);
      grad2.addColorStop(0, 'rgba(0, 245, 255, 0.06)');
      grad2.addColorStop(1, 'rgba(0, 245, 255, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      const blob3X = width * 0.5 + Math.sin(t * 0.07) * 120;
      const blob3Y = height * 0.5 + Math.cos(t * 0.09) * 100 + scrollY * 0.15;
      const grad3 = ctx.createRadialGradient(blob3X, blob3Y, 0, blob3X, blob3Y, 400);
      grad3.addColorStop(0, 'rgba(167, 139, 250, 0.05)');
      grad3.addColorStop(1, 'rgba(167, 139, 250, 0)');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      // Stars
      for (const s of stars) {
        s.twinkle += s.twinkleSpeed;
        const alpha = 0.3 + Math.sin(s.twinkle) * 0.4;
        const driftY = (scrollY * s.speed * 0.5) % height;
        const y = (s.y + driftY) % height;
        ctx.beginPath();
        ctx.arc(s.x, y, s.size * s.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * s.z})`;
        ctx.fill();
        if (s.size > 1.2) {
          ctx.beginPath();
          ctx.arc(s.x, y, s.size * s.z * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(125, 249, 255, ${alpha * 0.08})`;
          ctx.fill();
        }
      }

      // Mouse particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const lifeRatio = 1 - p.life / p.maxLife;
        if (lifeRatio <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * lifeRatio, 0, Math.PI * 2);
        const hex = p.color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${lifeRatio * 0.6})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #0a0f2e 0%, #050816 60%)' }}
      aria-hidden="true"
    />
  );
}
