'use client';

import { motion } from 'motion/react';
import { Sparkles, Zap, Rocket, Terminal, ArrowRight, MessageSquare, Brain, Target } from 'lucide-react';
import Link from 'next/link';

export default function ScriptLabIntroPage() {
  const features = [
    { name: 'Neural Flow', desc: 'Analyzes viral hooks and retention patterns.', icon: <Brain size={24}/> },
    { name: 'Target Focus', desc: 'Tailors scripts for your specific audience.', icon: <Target size={24}/> },
    { name: 'Instant Output', desc: 'Generate complete 60-sec scripts in 2 secs.', icon: <Zap size={24}/> }
  ];

  return (
    <main className="relative min-h-screen pt-40 pb-20 px-6 selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto space-y-32">
        
        {/* Flagship Header */}
        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-9xl font-display font-bold tracking-tighter text-white"
          >
            The <br />
            <span className="text-white/20">AI Script Engine.</span>
          </motion.h1>
          <div className="h-1 w-24 bg-white/20 rounded-full" />
          <p className="text-zinc-500 font-medium tracking-tight text-xl max-w-lg">
            Stop guessing. Start engineering your retention with ScriptLab. 
          </p>
        </div>

        {/* Product Flow Section: Visual representation */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
                <h2 className="text-4xl font-display font-bold tracking-tighter text-white">Input to Impact.</h2>
                <div className="space-y-6">
                    <div className="p-8 glass rounded-[40px] border border-white/5 space-y-4 relative group hover:border-white/20 transition-all">
                        <div className="flex items-center gap-4 text-white/40">
                            <MessageSquare size={20}/>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Input Topic</span>
                        </div>
                        <p className="text-sm text-zinc-400 font-medium">"How I scaled a MERN project in 24 hours"</p>
                        <ArrowRight className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-8 glass rounded-[40px] border border-white/5 space-y-4">
                        <div className="flex items-center gap-4 text-white/40">
                            <Sparkles size={20}/>
                            <span className="text-[10px] font-bold uppercase tracking-widest">AI Synthesis</span>
                        </div>
                        <p className="text-sm text-zinc-400 font-medium italic opacity-50">Processing hooks... Analyzing audience intent...</p>
                    </div>
                    <div className="p-8 glass rounded-[40px] border border-white/20 space-y-4 bg-white/5">
                        <div className="flex items-center gap-4 text-white">
                            <Terminal size={20}/>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Final Script</span>
                        </div>
                        <p className="text-sm text-white font-bold tracking-tight">"Listen... Most devs fail at scaling because..."</p>
                    </div>
                </div>
            </div>
            
            <div className="p-12 glass rounded-[60px] border border-white/5 bg-gradient-to-tr from-zinc-900/50 via-black to-black space-y-8 flex flex-col justify-center items-center text-center">
                <div className="p-6 bg-white rounded-full text-black shadow-2xl shadow-white/10 animate-bounce">
                    <Zap size={48} />
                </div>
                <h3 className="text-4xl font-display font-bold text-white tracking-tighter">10x Your Efficiency.</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-xs">
                    ScriptLab helps you focus on the story while we handle the data-driven hooks.
                </p>
                <Link href="/dashboard/script-lab" className="w-full">
                    <button className="w-full py-6 bg-white text-black font-bold rounded-full hover:scale-105 transition-all text-xs uppercase tracking-[0.2em] shadow-2xl shadow-white/10">
                        Launch ScriptLab Now
                    </button>
                </Link>
            </div>
        </section>

        {/* Technical Mastery Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-20 border-t border-white/5">
            {features.map(f => (
                <div key={f.name} className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-2xl w-fit text-white/40 border border-white/5">{f.icon}</div>
                    <h4 className="text-lg font-display font-bold text-white tracking-tight italic">{f.name}</h4>
                    <p className="text-zinc-500 text-xs font-medium leading-relaxed">{f.desc}</p>
                </div>
            ))}
        </section>

        {/* Global CTA */}
        <section className="py-20 bg-white/5 rounded-[60px] border border-white/10 text-center space-y-8">
            <Rocket size={48} className="mx-auto text-white/20" />
            <h2 className="text-5xl font-display font-bold text-white tracking-tighter">Ready to Scale?</h2>
            <Link href="/login" className="inline-block px-12 py-5 bg-white text-black font-bold rounded-full hover:scale-110 transition-all">
                Access Engine
            </Link>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 underline">Designed by thedipverse studio</p>
        </section>

      </div>
    </main>
  );
}
