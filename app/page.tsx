'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, User, Code, Film, Rocket, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen pt-24 pb-20 overflow-x-hidden selection:bg-white selection:text-black">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center p-8 text-center"
          >
            <div className="space-y-4">
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
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/40">Opening Digital Archive</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="mx-auto max-w-6xl px-6 space-y-40">
          
          {/* THE HERO: Experience over Code */}
          <section className="h-[70vh] flex flex-col justify-center items-center text-center space-y-12">
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 block mb-6 px-4 py-2 border border-white/5 rounded-full w-fit mx-auto"
              >
                Dipesh Rajput — thedipverse.
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-6xl md:text-9xl font-display font-bold tracking-tighter leading-[0.8] text-white"
              >
                I Build <br />
                <span className="text-white/20">Experiences.</span> <br />
                <span className="text-5xl md:text-8xl mt-4 block">Not Just Apps.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-sm font-medium tracking-[0.2em] uppercase text-white/40 pt-8"
              >
                MERN Engineer • Cinematic Storyteller • Builder
              </motion.p>
            </div>
          </section>

          {/* THE HOOK: Engineering & Scaling */}
          <section className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white leading-tight">
               Documenting the evolution of <br />
               <span className="text-white/30 italic">Logic → Narrative → Impact</span>
            </h2>
            <p className="text-zinc-500 font-medium tracking-tight text-lg max-w-xl mx-auto leading-relaxed">
                Refining code, building systems, and scaling narratives. I am documenting the process of turning day-zero ideas into global digital experiences.
            </p>
          </section>

          {/* SECTION PREVIEWS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. About Preview */}
            <Link href="/about" className="group p-10 glass rounded-[60px] border border-white/5 hover:border-white/10 transition-all space-y-8 h-[500px] flex flex-col justify-end">
                <div className="space-y-4">
                    <User className="text-white/20 group-hover:text-white transition-colors" size={32} />
                    <h3 className="text-4xl font-display font-bold text-white tracking-tighter">Who am I?</h3>
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-xs">
                        Developer by trade. Storyteller by soul. Learn about my philosophy and why I build.
                    </p>
                    <div className="flex items-center gap-2 text-white/40 font-bold text-[10px] uppercase tracking-widest pt-4 group-hover:text-white transition-all">
                        Read Detailed Story <ArrowRight size={14} />
                    </div>
                </div>
            </Link>

            {/* 2. Projects Preview */}
            <Link href="/projects" className="group p-10 glass rounded-[60px] border border-white/5 hover:border-white/10 transition-all space-y-8 h-[500px] flex flex-col justify-end bg-gradient-to-tr from-zinc-900/50 to-transparent">
                <div className="space-y-4">
                    <Code className="text-white/20 group-hover:text-white transition-colors" size={32} />
                    <h3 className="text-4xl font-display font-bold text-white tracking-tighter">The Projects.</h3>
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-xs">
                        From full-stack SaaS tools to minimalist experiments. Minimal code, high impact.
                    </p>
                    <div className="flex items-center gap-2 text-white/40 font-bold text-[10px] uppercase tracking-widest pt-4 group-hover:text-white transition-all">
                        View All Systems <ArrowRight size={14} />
                    </div>
                </div>
            </Link>

            {/* 3. ScriptLab Preview */}
            <Link href="/script-lab" className="md:col-span-2 group p-12 glass rounded-[60px] border border-white/10 hover:border-white/20 transition-all space-y-8 min-h-[400px] flex flex-col md:flex-row items-center justify-between gap-12 bg-[#080808]">
                <div className="space-y-6 max-w-md">
                    <div className="p-4 bg-white/5 rounded-3xl w-fit group-hover:bg-white group-hover:text-black transition-all">
                        <Sparkles size={32} />
                    </div>
                    <div>
                        <h3 className="text-5xl font-display font-bold text-white tracking-tighter">ScriptLab<span className="text-white/20">.</span></h3>
                        <p className="text-zinc-500 text-base font-medium leading-relaxed pt-4">
                            My flagship product. Generate high-retention AI scripts for reels/shorts instantly. Designed for content engineers.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-white/40 font-bold text-[10px] uppercase tracking-widest pt-2 group-hover:text-white transition-all">
                        Try Agentic Generation <ArrowRight size={14} />
                    </div>
                </div>
                <div className="w-full md:w-1/2 aspect-video bg-white/5 rounded-[40px] border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opaicty-20" />
                    <Rocket size={48} className="text-white/10 group-hover:text-white transition-colors animate-pulse" />
                </div>
            </Link>

            {/* 4. Content Preview */}
            <Link href="/content" className="md:col-span-2 group p-12 glass rounded-[60px] border border-white/5 hover:border-white/10 transition-all space-y-8 h-[500px] flex flex-col justify-center items-center text-center">
                <Film className="text-white/20 group-hover:text-white transition-colors" size={48} />
                <div className="space-y-4 max-w-xl">
                    <h3 className="text-5xl font-display font-bold text-white tracking-tighter italic">Cinema & Stories.</h3>
                    <p className="text-zinc-500 text-base font-medium leading-relaxed">
                        Visual storytelling is the bridge between technology and emotion. See my content creation journey.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-white/40 font-bold text-[10px] uppercase tracking-widest pt-4 group-hover:text-white transition-all">
                        Explore Visuals <ArrowRight size={14} />
                    </div>
                </div>
            </Link>
          </div>

          {/* THE CTA: Building Meaning */}
          <section className="py-40 text-center space-y-12 border-t border-white/5">
             <div className="space-y-4">
                <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-[0.8]">
                    Let&apos;s build <br />
                    <span className="text-white/20">something meaningful.</span>
                </h2>
                <p className="text-zinc-500 font-medium uppercase tracking-[0.3em] text-xs pt-8">Collaboration • Engineering • Narrative</p>
             </div>
             <Link href="/contact">
                <button className="px-12 py-6 bg-white text-black font-bold rounded-full hover:scale-105 transition-all shadow-2xl shadow-white/10">
                    Get in touch
                </button>
             </Link>
          </section>

        </div>
      )}
    </main>
  );
}
