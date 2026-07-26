'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingSequence({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDone(true);
            setTimeout(onDone, 800);
          }, 400);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050816]"
        >
          {/* Rotating rings */}
          <div className="relative w-40 h-40 mb-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-[#4F8CFF]/30 border-t-[#4F8CFF]"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-4 rounded-full border-2 border-[#00F5FF]/30 border-b-[#00F5FF]"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-8 rounded-full border border-[#7DF9FF]/20 border-r-[#7DF9FF]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-display text-3xl font-bold gradient-text"
              >
                SN
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-heading text-sm tracking-[0.3em] text-white/60 uppercase mb-6"
          >
            Initializing Universe
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#4F8CFF] to-[#00F5FF]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 font-display text-xs text-white/40 tabular-nums">
            {Math.min(100, Math.floor(progress))}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
