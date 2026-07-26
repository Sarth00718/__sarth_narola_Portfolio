'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) {
      setHidden(true);
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], input, textarea, .cursor-hover');
      setHovering(!!interactive);
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ marginLeft: '-4px', marginTop: '-4px' }}
      >
        <div
          className="rounded-full bg-[#00F5FF] transition-all duration-200"
          style={{
            width: hovering ? '12px' : '8px',
            height: hovering ? '12px' : '8px',
            boxShadow: '0 0 10px rgba(0, 245, 255, 0.8)',
          }}
        />
      </div>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ marginLeft: '-18px', marginTop: '-18px' }}
      >
        <div
          className="rounded-full border border-[#4F8CFF] transition-all duration-300"
          style={{
            width: hovering ? '56px' : '36px',
            height: hovering ? '56px' : '36px',
            opacity: hovering ? 0.8 : 0.4,
            boxShadow: hovering ? '0 0 20px rgba(79, 140, 255, 0.4)' : 'none',
          }}
        />
      </div>
    </>
  );
}
