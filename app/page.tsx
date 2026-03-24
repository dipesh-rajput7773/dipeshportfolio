'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import VisionSection from '@/components/VisionSection';
import ScriptLabTeaser from '@/components/ScriptLabTeaser';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-x-hidden">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
          >
            <div className="space-y-4 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-white"
              >
                thedipverse<span className="text-white/20">.</span>
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="h-[1px] bg-white/20 w-48 mx-auto"
              />
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/40">Loading Experience</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Hero />
          <ScriptLabTeaser />
          <VisionSection />
        </motion.div>
      )}
    </main>
  );
}
