'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  const timeline = [
    { 
        date: '2024 / Q4', 
        event: 'Dropped Clerk. Built my own auth from scratch.', 
        note: 'Control over data is everything. Switched to NextAuth + MongoDB.' 
    },
    { 
        date: '2024 / Q3', 
        event: 'Founded thedipverse studio.', 
        note: 'Bridging the gap between engineering and narrative.' 
    },
    { 
        date: '2023 / Q2', 
        event: 'First commercial cinematic project.', 
        note: 'Learning the discipline of the lens.' 
    }
  ];

  return (
    <main className="relative min-h-screen pt-40 pb-20 px-6 selection:bg-crimson/30 selection:text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        
        {/* Left Side: The Narrative (Film Crawl) */}
        <div className="space-y-12">
            <label className="mono text-crimson text-xs uppercase tracking-[0.5em]">002 — THE STORY</label>
            <div className="space-y-10 font-display text-4xl md:text-6xl text-warm-white leading-[1.1] text-left">
                <p>
                    I didn&apos;t start as a coder. <br />
                    I started as a kid obsessed with how light hits a frame.
                </p>
                <p className="text-muted">
                    That obsession evolved. Today, code is my camera, and the web is my stage.
                </p>
                <p>
                    I build experiences that breathe because I refuse to ship anything without a soul.
                </p>
            </div>
            
            {/* The Crimson Quote */}
            <div className="pt-20 border-t border-crimson/20">
                <blockquote className="font-display text-4xl md:text-7xl text-warm-white leading-none">
                    &quot;A builder who <span className="text-crimson">thinks in frames.</span>&quot;
                </blockquote>
            </div>
        </div>

        {/* Right Side: Building in Public (Timeline) */}
        <section className="space-y-16 py-12 md:pl-20 border-l border-warm-white/5">
            <label className="mono text-crimson text-xs uppercase tracking-[0.5em]">006 — JOURNEY LOG</label>
            
            <div className="space-y-20 relative before:content-[''] before:absolute before:left-[4px] before:top-2 before:bottom-0 before:w-[1px] before:bg-warm-white/5">
                {timeline.map((item) => (
                    <div key={item.date} className="relative pl-12 group">
                        <div className="absolute left-0 top-2 w-[9px] h-[9px] bg-crimson rounded-full group-hover:scale-[2] transition-transform shadow-[0_0_15px_rgba(196,18,48,0.4)]" />
                        
                        <div className="space-y-4">
                            <span className="font-display text-3xl text-warm-white tracking-tight">{item.date}</span>
                            <div className="space-y-1">
                                <h4 className="mono text-sm uppercase tracking-widest text-warm-white">{item.event}</h4>
                                <p className="mono text-muted text-[11px] leading-relaxed max-w-sm lowercase">
                                    // {item.note}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Visual Balance Placeholder */}
            <div className="pt-20">
                <div className="aspect-video bg-surface overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-crimson/5 to-transparent pb-12 flex flex-col justify-end p-8">
                        <p className="mono text-[10px] text-muted uppercase tracking-[0.3em]">REPRESENTATION / 02</p>
                        <h4 className="font-display text-2xl pt-2">The Texture of Code.</h4>
                    </div>
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}
