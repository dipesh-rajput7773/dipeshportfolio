'use client';

import { motion } from 'motion/react';
import { ChevronDown, Play, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[160px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)] opacity-80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium tracking-widest uppercase text-white/60 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Available for new projects
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter text-white leading-[0.9]">
            I Build<span className="text-white/20">.</span><br />
            I Think<span className="text-white/20">.</span><br />
            I Create<span className="text-white/20">.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 font-medium tracking-tight">
            MERN Developer <span className="text-white/20 mx-2">|</span> 
            Cinematic Storyteller <span className="text-white/20 mx-2">|</span> 
            Entrepreneur
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
            >
              Connect With Me
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
