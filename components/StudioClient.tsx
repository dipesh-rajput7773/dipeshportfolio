'use client';

import { motion } from 'motion/react';
import { Sparkles, Link as LinkIcon, Rocket, Activity, FileText, Brain, Target, Mic, Video, Zap, ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        id: '01',
        name: 'Script Lab',
        tagline: 'High-Retention Scripting',
        desc: 'Save 4+ hours on content creation. Get 2 complete 60-second scripts with proven hooks and high-retention frameworks instantly.',
        icon: <Sparkles size={32} />,
        color: 'text-crimson',
        border: 'border-crimson/20 hover:border-crimson/50',
        bg: 'bg-crimson/[0.03]',
        link: '/dashboard/script-lab',
        status: 'Live',
        statusColor: 'text-emerald-400',
        freeNote: '5 uses free · login for unlimited',
        freeColor: 'text-amber-400',
    },
    {
        id: '02',
        name: 'The Archive',
        tagline: 'Creative Control Center',
        desc: 'Securely document your build journey. Save script drafts, track project milestones, and organize your creative assets in one hub.',
        icon: <Rocket size={32} />,
        color: 'text-amber-500',
        border: 'border-amber-500/20 hover:border-amber-500/50',
        bg: 'bg-amber-500/[0.03]',
        link: '/dashboard/your-space',
        status: 'Live',
        statusColor: 'text-emerald-400',
        freeNote: 'Login required',
        freeColor: 'text-white/20',
    },
    {
        id: '03',
        name: 'Smart Link Hub',
        tagline: 'Boost Engagement CTR',
        desc: 'Increase your social conversion rate. Convert any URL into an "Open-in-App" intent link for Instagram, YouTube, and Spotify.',
        icon: <LinkIcon size={32} />,
        color: 'text-blue-400',
        border: 'border-blue-400/20 hover:border-blue-400/50',
        bg: 'bg-blue-400/[0.03]',
        link: '/dashboard/smart-link',
        status: 'Live',
        statusColor: 'text-emerald-400',
        freeNote: '5 uses free · login for unlimited',
        freeColor: 'text-amber-400',
    },
    {
        id: '04',
        name: 'Growth Analytics',
        tagline: 'Data-Driven Decisions',
        desc: 'Stop guessing. Monitor audience signals and content performance with real-time metrics to scale your reach effectively.',
        icon: <Activity size={32} />,
        color: 'text-purple-400',
        border: 'border-purple-400/20 hover:border-purple-400/50',
        bg: 'bg-purple-400/[0.03]',
        link: '/dashboard/analytics',
        status: 'Live',
        statusColor: 'text-emerald-400',
        freeNote: 'Login required',
        freeColor: 'text-white/20',
    },
    {
        id: '05',
        name: 'Hook Analyzer',
        tagline: 'Script Strength Scorer',
        desc: 'Paste any script and get a hook strength score with rewrite suggestions based on retention psychology.',
        icon: <Brain size={32} />,
        color: 'text-rose-400',
        border: 'border-rose-400/20 hover:border-rose-400/50',
        bg: 'bg-rose-400/[0.03]',
        link: '/studio',
        status: 'Coming Soon',
        statusColor: 'text-amber-400',
        freeNote: 'Coming soon',
        freeColor: 'text-white/20',
    },
    {
        id: '06',
        name: 'Visual Shot Planner',
        tagline: 'Shot-by-Shot Breakdown',
        desc: 'Describe your concept and get a full shot plan — what to film, in what order, and how long each clip should be.',
        icon: <Video size={32} />,
        color: 'text-teal-400',
        border: 'border-teal-400/20 hover:border-teal-400/50',
        bg: 'bg-teal-400/[0.03]',
        link: '/studio',
        status: 'Coming Soon',
        statusColor: 'text-amber-400',
        freeNote: 'Coming soon',
        freeColor: 'text-white/20',
    },
];

export default function ScriptLabIntroPage() {
    return (
        <main className="relative min-h-screen pt-40 pb-20 px-6 selection:bg-white selection:text-black">
            <div className="max-w-6xl mx-auto space-y-32">

                {/* Header */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <label className="mono text-crimson text-xs uppercase tracking-[0.5em] font-bold">All Tools & Services</label>
                        <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter text-white leading-[0.9]">
                            The <br />
                            <span className="text-white/20">Studio.</span>
                        </h1>
                        <p className="text-zinc-400 font-medium tracking-tight text-xl max-w-xl">
                            Tools built for developers and video editors. Script generation, smart links, content planning, and more. Free to try — no account needed to start.
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap gap-6 pt-4">
                        <Link href="/dashboard" className="px-10 py-5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-crimson hover:text-white transition-all shadow-xl">
                            Open Dashboard — All Tools
                        </Link>
                        <Link href="/login" className="px-10 py-5 border border-white/10 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white hover:border-white/30 transition-all flex items-center gap-3">
                            <Lock size={14} /> Login / Create Account
                        </Link>
                    </div>

                    <p className="mono text-white/20 text-[10px] uppercase tracking-widest">
            // Script Lab: 5 free uses · No card required · Full access after login
                    </p>
                </div>

                {/* Services Grid */}
                <section className="space-y-12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Zap size={18} className="text-crimson" />
                            <h2 className="mono text-warm-white text-sm uppercase tracking-widest font-bold">All Services</h2>
                        </div>
                        <span className="mono text-[10px] text-muted uppercase tracking-widest">{services.length} tools available</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <Link key={service.id} href={service.link}>
                                <div className={`p-10 border ${service.border} ${service.bg} group transition-all space-y-6 cursor-pointer h-full flex flex-col`}>
                                    {/* Top row */}
                                    <div className="flex items-start justify-between">
                                        <div className={`p-3 bg-white/5 rounded-xl ${service.color}`}>
                                            {service.icon}
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="mono text-[9px] text-muted-foreground uppercase tracking-widest">{service.id}</span>
                                            <span className={`mono text-[9px] font-bold uppercase tracking-widest ${service.statusColor}`}>
                                                ● {service.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2 flex-1">
                                        <p className={`mono text-[10px] uppercase tracking-widest font-bold ${service.color} opacity-70`}>{service.tagline}</p>
                                        <h3 className="font-display text-2xl text-warm-white tracking-tight font-bold group-hover:translate-x-1 transition-transform">
                                            {service.name}.
                                        </h3>
                                        <p className="text-sm text-zinc-500 leading-relaxed font-medium pt-2">
                                            {service.desc}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <span className={`mono text-[9px] uppercase tracking-widest font-bold ${service.freeColor}`}>
                                            {service.freeNote}
                                        </span>
                                        <div className={`flex items-center gap-2 ${service.color} text-[10px] mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity`}>
                                            Open <ArrowRight size={12} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-20 border border-white/5 bg-white/[0.01] text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs font-bold tracking-widest uppercase text-white/40">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping inline-block" />
                        No account needed for Script Lab & Smart Link Hub
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter">
                        Start for free. <br /><span className="text-white/20">Unlock everything after login.</span>
                    </h2>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Link href="/dashboard/script-lab" className="inline-block px-12 py-5 bg-white text-black font-bold hover:bg-crimson hover:text-white transition-all text-xs uppercase tracking-widest">
                            Try Script Lab Free
                        </Link>
                        <Link href="/login" className="inline-block px-12 py-5 border border-white/20 text-white font-bold hover:bg-white/5 transition-all text-xs uppercase tracking-widest">
                            Create Account
                        </Link>
                    </div>
                </section>

            </div>
        </main>
    );
}
