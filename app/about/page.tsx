'use client';

import { motion } from 'motion/react';
import { Github, Instagram, Globe, Sparkles, Code, User, Play, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const toolbox = [
    { category: 'The Engine', items: ['Next.js 15', 'TypeScript', 'Node.js'] },
    { category: 'The Soul', items: ['Cinematography', 'Scripting', 'Storytelling'] },
    { category: 'The Future', items: ['Agentic AI', 'Neural Flow', 'Automations'] }
  ];

  return (
    <main className="relative min-h-screen pt-40 pb-20 px-6 selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto space-y-40">
        
        {/* Editorial Header */}
        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]"
          >
            <div className="h-[1px] w-12 bg-white/10" />
            01 / The Human behind the code
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-display font-bold tracking-tighter leading-[0.8] text-white"
          >
            I Build <br />
            <span className="text-white/20 italic">Things that breathe.</span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-medium tracking-tight leading-relaxed max-w-2xl">
            I don&apos;t build for the sake of scaling metrics. I build to bridge the gap between 
            unrefined logic and cinematic narratives. 
          </p>
        </div>

        {/* Authentic Narrative: The Why */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div className="space-y-8">
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/40 italic">Philosophy</h2>
                <div className="space-y-6 text-zinc-500 font-medium leading-relaxed">
                    <p>
                        Started as a kid obsessed with frames—the way light hits a surface to tell a story. 
                        That obsession eventually led me to the grid of code. 
                    </p>
                    <p className="text-white">
                        For me, an app isn&apos;t just a collection of APIs. It&apos;s a stage. 
                        Whether it&apos;s <span className="italic">ScriptLab</span> or this digital archive, 
                        I want every interaction to feel like a scene from a movie. 
                    </p>
                    <p>
                        This isn&apos;t a job. It&apos;s my way of documenting existence through technology.
                    </p>
                </div>
            </div>
            
            <div className="p-10 glass rounded-[60px] border border-white/5 space-y-8 bg-gradient-to-tr from-white/5 to-transparent flex flex-col justify-center items-center text-center">
                <div className="h-24 w-24 rounded-full border border-white/10 p-2 overflow-hidden bg-black">
                     {/* Replace with your real image */}
                     <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <User size={32} className="text-white/10" />
                     </div>
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-white tracking-tighter italic">Dipesh Rajput</h3>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-white/20 italic">Architect of the dipverse</p>
                </div>
            </div>
        </section>

        {/* Toolbox: Authentic Skills */}
        <section className="space-y-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/40 italic">The Weaponry</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border border-white/5 rounded-[40px] overflow-hidden">
                {toolbox.map((box) => (
                    <div key={box.category} className="p-10 bg-black/50 space-y-6 hover:bg-white/5 transition-colors">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">{box.category}</h4>
                        <div className="space-y-3">
                            {box.items.map(item => (
                                <div key={item} className="flex items-center gap-3 text-sm font-bold text-white/80">
                                    <ChevronRight size={12} className="text-white/20"/> {item}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Digital Logs: Not Generic Milestones */}
        <section className="space-y-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/40 italic">Digital History</h2>
            <div className="space-y-16">
                <div className="group relative pl-12 border-l border-white/5">
                    <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] bg-white rounded-full group-hover:scale-150 transition-transform" />
                    <span className="text-xs font-bold text-white/20 uppercase tracking-widest italic">Current Era</span>
                    <h3 className="text-3xl font-display font-bold text-white tracking-tighter pt-2">Engineering the ScriptLab Product.</h3>
                    <p className="text-zinc-500 text-base font-medium max-w-xl pt-4">
                        Building the tool I wished I had when I started content creation. A neural engine designed to automate retention. No fluff, just high-performance scripts.
                    </p>
                </div>
                
                <div className="group relative pl-12 border-l border-white/5">
                    <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] bg-white/20 rounded-full group-hover:bg-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                    <span className="text-xs font-bold text-white/20 uppercase tracking-widest italic">2024 / Q4</span>
                    <h3 className="text-3xl font-display font-bold text-white/40 tracking-tighter pt-2">Unlocking "Your Space".</h3>
                    <p className="text-zinc-500/50 text-base font-medium max-w-xl pt-4">
                        Created a minimalist digital real estate system. My own take on identity on the web—cinematic, dark, and purposeful.
                    </p>
                </div>
            </div>
        </section>

        {/* Interaction Footer */}
        <section className="py-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div className="space-y-4">
                <h3 className="text-4xl font-display font-bold text-white tracking-tighter italic">Building in Public.</h3>
                <p className="text-zinc-500 text-sm font-medium">No templates. No masks. Just the grind and the glow.</p>
            </div>
            <div className="flex gap-8 items-center">
                <Link href="/projects" className="text-white/40 hover:text-white transition-all flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest">
                    View Systems <Code size={14}/>
                </Link>
                <Link href="/content" className="text-white/40 hover:text-white transition-all flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest">
                    See Visuals <Play size={14}/>
                </Link>
            </div>
        </section>

      </div>
    </main>
  );
}
