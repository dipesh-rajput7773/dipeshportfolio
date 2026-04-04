'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Zap, Terminal, ShieldCheck, Film } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <main className="relative min-h-screen pt-24 pb-20 overflow-x-hidden selection:bg-crimson/30 selection:text-white">

            {/* 01 — Hero (Full Viewport) */}
            <section className="h-[95vh] md:h-[90vh] flex flex-col justify-center relative px-6 md:px-20">

                {/* The Split Rule */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-crimson pointer-events-none transform -translate-y-1/2 opacity-20" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 w-full">

                    {/* Left Side: Neural Code Architecture */}
                    <div className="hidden md:block">
                        <div className="p-10 border-l border-crimson bg-white/[0.01] backdrop-blur-sm shadow-2xl shadow-crimson/5">
                            <code className="text-crimson/60 text-xs block mb-6 mono font-bold uppercase tracking-widest">// master_identity.sh</code>
                            <code className="text-warm-white/80 text-sm mono leading-relaxed space-y-1 block">
                                <span className="text-crimson">const</span> <span className="text-white">dipesh</span> = {'{'}<br />
                                &nbsp;&nbsp;core: <span className="text-amber-500 italic">&quot;Deep Systems Architecture&quot;</span>,<br />
                                &nbsp;&nbsp;stack: [<span className="text-blue-400">&quot;Next.js&quot;</span>, <span className="text-emerald-400">&quot;FastAPI&quot;</span>, <span className="text-purple-400">&quot;n8n&quot;</span>],<br />
                                &nbsp;&nbsp;vision: <span className="text-cyan-400">&quot;Systems_That_Breathe&quot;</span>,<br />
                                &nbsp;&nbsp;mission: <span className="text-warm-white/40">&quot;Build things that outlast the builder&quot;</span>,<br />
                                &nbsp;&nbsp;mantra: <span className="text-crimson/60">&quot;Precisely_Obsessed&quot;</span><br />
                                {'}'};
                            </code>
                        </div>
                    </div>

                    {/* Right Side: Narrative Impact */}
                    <div className="space-y-10 md:pl-10">
                        <div className="space-y-4">
                            <label className="mono text-crimson text-xs uppercase tracking-[0.5em] font-bold">001 — THE SYSTEM ARCHITECT</label>
                            <h1 className="text-5xl md:text-[8rem] font-display font-medium tracking-tighter leading-[0.85] text-warm-white">
                                Build. <br />
                                Think. <br />
                                <span className="italic">Automate.</span>
                            </h1>
                        </div>
                        <p className="mono text-muted text-sm tracking-tight leading-relaxed max-w-md lowercase md:text-md">
                            // I engineer neural ecosystems, automate autonomous workflows, and shoot cinematic narratives for the digital age.
                        </p>
                        <div className="flex flex-wrap gap-6 pt-6">
                            <Link href="/projects" className="px-10 py-5 bg-crimson text-white text-xs mono font-bold uppercase tracking-widest transition-all hover:bg-black hover:ring-1 hover:ring-crimson shadow-xl shadow-crimson/10">
                                [ View Intelligence ]
                            </Link>
                            <Link href="/dashboard" className="px-10 py-5 border border-warm-white/10 text-xs mono uppercase tracking-widest text-muted hover:text-warm-white transition-all">
                                [ Secure Portal ]
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 02 — The Story (Preview) */}
            <section className="max-w-6xl mx-auto px-6 py-40 space-y-24 border-t border-warm-white/5">
                <label className="mono text-crimson text-xs uppercase tracking-[0.5em] font-bold">002 — THE PHYLOSOPHY</label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                    <div className="space-y-10 font-display text-4xl md:text-6xl text-warm-white leading-[1.1] tracking-tighter">
                        <p>
                            I am not a speaker of hooks.
                        </p>
                        <p className="text-muted italic">
                            I am a builder of deep systems that thrive in the quiet.
                        </p>
                        <p className="text-lg md:text-xl font-mono text-muted-foreground uppercase tracking-widest leading-relaxed pt-10">
                            I shoot cinematic reality to reflect technical complexity. My lens is as sharp as my code.
                        </p>
                    </div>
                    <div className="min-h-[580px] md:min-h-[720px] bg-surface relative overflow-hidden group border border-warm-white/5 hover:border-crimson/30 transition-all duration-700 shadow-2xl shadow-crimson/5">
                        <iframe
                            src="https://www.instagram.com/p/DRC3HW1D5Fn/embed/"
                            className="w-full h-[580px] md:h-[720px] border-none pointer-events-auto grayscale group-hover:grayscale-0 transition-all duration-1000"
                            allowFullScreen={true}
                            scrolling="no"
                        />
                        <div className="absolute top-6 left-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-all">
                            <div className="p-3 bg-black/80 backdrop-blur-md border border-crimson/40 text-crimson mono text-[9px] uppercase tracking-widest font-bold">
                                SYNCING — CINEMATIC_REALITY
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 03 — The High-End Toolkit */}
            <section className="max-w-7xl mx-auto px-6 py-40 space-y-20 border-t border-warm-white/5">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="space-y-4">
                        <label className="mono text-crimson text-xs uppercase tracking-[0.5em] font-bold">003 — ARSENAL</label>
                        <h3 className="text-5xl md:text-8xl font-display tracking-tighter leading-none italic">Neural. <br />Digital. Built.</h3>
                    </div>
                    <Link href="/projects" className="mono text-xs uppercase tracking-widest text-muted hover:text-crimson border-b border-crimson/20 pb-2 transition-all">
                        Access Archive
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-warm-white/5 bg-warm-white/[0.01]">
                    {/* SYSTEMS Side */}
                    <div className="p-12 md:p-16 border-b md:border-b-0 md:border-r border-warm-white/5 group hover:bg-white/2 transition-all space-y-10">
                        <h4 className="mono text-crimson text-xl flex items-center gap-4">
                            <Terminal size={18} /> THE ENGINE
                        </h4>
                        <div className="flex flex-wrap gap-4">
                            {['Next.js 15', 'FastAPI', 'Node.js', 'Express', 'MySQL', 'MongoDB', 'PostgreSQL', 'Sequelize'].map(tech => (
                                <span key={tech} className="px-5 py-3 bg-warm-white/5 text-[10px] mono uppercase tracking-widest text-muted-foreground group-hover:text-warm-white border border-warm-white/5 group-hover:border-warm-white/10 transition-all">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* INTELLIGENCE Side */}
                    <div className="p-12 md:p-16 border-b md:border-b-0 md:border-r border-warm-white/5 group hover:bg-white/2 transition-all space-y-10">
                        <h4 className="mono text-amber-500 text-xl flex items-center gap-4">
                            <Zap size={18} /> NEURAL POWER
                        </h4>
                        <div className="flex flex-wrap gap-4">
                            {['Ollama', 'Hugging Face', 'NLP', 'n8n Automation', 'Playwright', 'Python', 'Embeddings'].map(ai => (
                                <span key={ai} className="px-5 py-3 bg-warm-white/5 text-[10px] mono uppercase tracking-widest text-muted-foreground group-hover:text-amber-500 border border-warm-white/5 group-hover:border-amber-500/20 transition-all">
                                    {ai}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* LENS Side */}
                    <div className="p-12 md:p-16 group hover:bg-white/2 transition-all space-y-10">
                        <h4 className="mono text-emerald-500 text-xl flex items-center gap-4">
                            <Film size={18} /> THE VISION
                        </h4>
                        <div className="flex flex-wrap gap-4">
                            {['DaVinci Resolve', 'Color Grading', 'CapCut', 'Figma', 'Cinematic Shoots', 'Scripting', 'Storytelling'].map(skill => (
                                <span key={skill} className="px-5 py-3 bg-warm-white/5 text-[10px] mono uppercase tracking-widest text-muted-foreground group-hover:text-emerald-400 border border-warm-white/5 group-hover:border-emerald-400/20 transition-all">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 04 — Unified Final Call */}
            <section className="py-40 text-center border-t border-warm-white/5 bg-gradient-to-b from-transparent to-crimson/[0.02]">
                <div className="space-y-12">
                    <div className="flex justify-center">
                        <div className="p-4 border border-crimson/20 bg-crimson/5 rounded-full animate-pulse">
                            <Sparkles className="text-crimson" size={32} />
                        </div>
                    </div>
                    <h2 className="text-5xl md:text-[10rem] font-display font-medium tracking-tighter leading-[0.8] text-warm-white opacity-40 hover:opacity-100 transition-all duration-700">
                        Deep <br />
                        Systems <br />
                        Matter.
                    </h2>
                    <div className="flex flex-col md:flex-row gap-12 justify-center items-center pt-20">
                        {['Email', 'Instagram', 'LinkedIn', 'YouTube'].map(link => (
                            <Link
                                key={link}
                                href="#"
                                className="mono text-[10px] uppercase tracking-[0.4em] text-muted hover:text-crimson transition-all active:scale-95"
                            >
                                [ {link} ]
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
