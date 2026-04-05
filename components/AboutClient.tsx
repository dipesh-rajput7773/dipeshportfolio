'use client';

import { motion } from 'motion/react';
import { Terminal, Film, Instagram, ArrowRight, Zap, Camera, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const grindLog = [
        { date: "APRIL 2026", event: "Automating the thedipverse studio. Every workflow is a system. Every edit is a rep." },
        { date: "MARCH 2026", event: "Rebuilt Auth architecture from scratch. Full control over user data cycles." },
        { date: "2025", event: "Focusing on the craft. Code by day, precision editing by night." }
    ];

    const contentMilestones = [
        { stat: "30M+", label: "Total Accounts Reached", desc: "Massive scale across the network." },
        { stat: "3", label: "Theme/Meme Pages", desc: "Built, managed, and grew communities." },
        { stat: "100%", label: "Viral Understanding", desc: "Organic audience retention and deep hooks." }
    ];

    const deepThoughts = [
        {
            id: "#001",
            hook: "Core Values",
            content: "Content shouldn't just be about the algorithm. It should be a byproduct of meaningful work and deep system learning."
        },
        {
            id: "#002",
            hook: "On Modern Build",
            content: "Editing and coding are the same discipline. Both are about aggressive optimization until only the essential remains."
        }
    ];

    return (
        <main className="relative min-h-screen pt-40 pb-20 px-6 selection:bg-crimson/30 selection:text-white">
            <div className="max-w-7xl mx-auto space-y-40">

                {/* Section 01: The Narrative */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                    <div className="space-y-12">
                        <label className="mono text-crimson text-xs uppercase tracking-[0.5em]">001 — THE NARRATIVE</label>
                        <div className="space-y-10 font-display text-4xl md:text-6xl text-warm-white leading-[1.1] text-left">
                            <p>Engineering <br /> High-Retention Content.</p>
                            <p className="text-muted italic text-2xl md:text-3xl leading-relaxed">Building systems that drive engagement through deep technical logic and visual storytelling.</p>
                        </div>
                        <div className="pt-20 border-t border-crimson/20">
                            <blockquote className="font-display text-4xl md:text-7xl text-warm-white leading-none">
                                &quot;Systems that <span className="text-crimson">perform.</span>&quot;
                            </blockquote>
                        </div>
                    </div>

                    {/* The Grind Log (Terminal Vibe) */}
                    <div className="space-y-16 py-12 md:pl-20 border-l border-warm-white/5">
                        <label className="mono text-crimson text-xs uppercase tracking-[0.5em]">002 — THE GRIND LOG</label>
                        <div className="bg-black/40 border border-warm-white/5 p-8 space-y-10">
                            {grindLog.map((log, i) => (
                                <div key={i} className="space-y-3">
                                    <span className="mono text-[10px] text-crimson font-bold uppercase tracking-widest">[{log.date}]</span>
                                    <p className="text-sm text-muted italic leading-relaxed lowercase">
                                        // {log.event}
                                    </p>
                                </div>
                            ))}
                            <div className="flex items-center gap-4 pt-6 border-b border-warm-white/5 pb-10">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                <span className="mono text-[10px] text-emerald-500 uppercase tracking-widest font-bold">System Online: Building in Public.</span>
                            </div>

                            {/* Content Milestones */}
                            <div className="space-y-8 pt-6">
                                <h4 className="font-display text-2xl text-warm-white tracking-tighter">Content & Scale</h4>
                                <div className="grid grid-cols-1 gap-6">
                                    {contentMilestones.map((item, i) => (
                                        <div key={i} className="flex gap-6 items-center">
                                            <div className="font-display text-4xl text-crimson/80 font-bold w-24 shrink-0">
                                                {item.stat}
                                            </div>
                                            <div>
                                                <h5 className="mono text-[10px] text-warm-white uppercase tracking-widest mb-1">{item.label}</h5>
                                                <p className="text-xs text-muted italic">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 02: Visual Experiments (Reels / Work Attachments) */}
                <section className="space-y-16">
                    <div className="flex items-center gap-3">
                        <Film size={18} className="text-crimson" />
                        <h4 className="mono text-warm-white text-sm uppercase tracking-widest font-bold">003 — VISUAL ARCHIVE / SELECTED WORK</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {/* REEL PLACEHOLDER 01 */}
                        <div className="editorial-card group p-0 overflow-hidden relative border border-warm-white/10 aspect-[9/16] bg-surface flex flex-col justify-center items-center p-8 space-y-6">
                            <div className="p-4 bg-crimson/10 rounded-full text-crimson group-hover:scale-110 transition-transform">
                                <Instagram size={32} />
                            </div>
                            <div className="space-y-4 z-20">
                                <h4 className="font-display text-3xl text-warm-white uppercase tracking-tighter italic">Cinema Test 01.</h4>
                                <p className="mono text-[10px] text-muted uppercase tracking-widest opacity-60 italic leading-relaxed px-6">// Attached: Grading and Pacing Experiment.</p>
                            </div>
                            <Link href="https://www.instagram.com/thedipverse/" target="_blank" className="px-8 py-4 bg-crimson text-white text-[10px] mono font-bold uppercase tracking-widest z-20 hover:bg-black transition-all">
                                Watch Reel
                            </Link>
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-crimson/10 to-transparent pointer-events-none" />
                        </div>

                        {/* REEL PLACEHOLDER 02 */}
                        <div className="border border-warm-white/5 border-dashed flex items-center justify-center aspect-[9/16] opacity-30 hover:opacity-100 transition-opacity">
                            <p className="mono text-[10px] uppercase tracking-[0.4em] text-muted rotate-90">Archive Slot Pending</p>
                        </div>

                        {/* REEL PLACEHOLDER 03 */}
                        <div className="border border-warm-white/5 border-dashed flex items-center justify-center aspect-[9/16] opacity-30 hover:opacity-100 transition-opacity">
                            <p className="mono text-[10px] uppercase tracking-[0.4em] text-muted rotate-90">Archive Slot Pending</p>
                        </div>
                    </div>
                </section>

                {/* Section 03: Philosophical Hooks */}
                <section className="space-y-16">
                    <div className="flex items-center gap-3">
                        <Sparkles size={18} className="text-amber-500" />
                        <h4 className="mono text-warm-white text-sm uppercase tracking-widest font-bold">004 — STRATEGIC LOGIC</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {deepThoughts.map((script, i) => (
                            <div key={i} className="editorial-card p-12 bg-white/[0.01] border border-warm-white/5 space-y-12 group hover:border-crimson/20 transition-all">
                                <div className="flex justify-between items-center opacity-40">
                                    <span className="mono text-[10px] uppercase tracking-widest">Logic {script.id}</span>
                                    <span className="mono text-[10px] uppercase tracking-widest">{script.hook}</span>
                                </div>
                                <p className="text-2xl md:text-4xl font-display text-warm-white leading-[1.1] md:leading-[1.15]">
                                    &quot;{script.content}&quot;
                                </p>
                                <div className="pt-8 border-t border-warm-white/5 flex justify-between items-center px-2">
                                    <span className="mono text-[8px] text-muted italic">— Strategy defined. Implementation pending.</span>
                                    <ArrowRight size={14} className="text-muted group-hover:text-crimson transition-transform group-hover:translate-x-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>



                <div className="pt-40 text-center pb-20 border-t border-warm-white/5 mt-20">
                    <Link href="/" className="mono text-xs uppercase tracking-widest text-muted hover:text-crimson transition-all">
                        // Return to Base Deployment
                    </Link>
                </div>
            </div>
        </main>
    );
}
