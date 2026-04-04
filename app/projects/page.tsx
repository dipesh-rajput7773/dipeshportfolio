'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Lock, ShieldCheck, Sparkles, Zap, Terminal, BarChart3, Globe, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  const allProjects = [
    {
       title: "PROJECT: ACCIO INDIA",
       description: "Founder Venture: An India-centric procurement & buying ecosystem for modern builders and creators. Simplifying supply-chain for the Dip Builds audience.",
       stack: ["Next.js", "Supabase", "Logistics-API"],
       status: "FOUNDER-VENTURE",
       href: "#"
    },
    {
      title: "ScriptLab",
      description: "Neural script engine for high-retention content. AI-driven identity synthesis.",
      stack: ["Next.js", "Gemini AI", "MongoDB"],
      status: "LIVE",
      href: "/dashboard/script-lab"
    },
    {
       title: "PROJECT: NEURAL-AGENT",
       description: "Custom AI agent for automated CRM engagement using Ollama and predictive embedding engines.",
       stack: ["Ollama", "Python", "LangChain"],
       status: "NDA",
       href: "#"
    },
    {
       title: "PROJECT: Z-WORKFLOW",
       description: "Autonomous operational pipelines and browser automation engine for high-volume data extraction.",
       stack: ["n8n", "Playwright", "Node.js"],
       status: "NDA",
       href: "#"
    },
    {
       title: "PROJECT: GOV-CORE",
       description: "Secure, high-compliance digital infrastructure engineered for governmental-scale public services.",
       stack: ["Next.js", "PostgreSQL", "AWS-Gov"],
       status: "NDA",
       href: "#"
    },
    {
       title: "EDITORIAL-ECOSYSTEM",
       description: "High-traffic News, Blog, and Corporate sites with advanced SEO & multi-tenant content delivery.",
       stack: ["WordPress", "PHP", "Headless-React"],
       status: "LIVE",
       href: "#"
    },
    {
       title: "PROJECT: SAVETAX-HUB",
       description: "FinTech advisory architecture with integrated blog-funnel logic for tax-optimization mapping.",
       stack: ["Next.js", "Logic-Calculators", "Node.js"],
       status: "NDA",
       href: "#"
    },
    {
      title: "PROJECT: OMNI-COMMERCE",
      description: "Enterprise e-commerce logic with complex checkout flows and editorial engagement layers.",
      stack: ["Next.js", "Stripe", "Prisma"],
      status: "NDA",
      href: "#"
    },
    {
      title: "The Dipverse Engine",
      description: "Minimalist full-stack ecosystem designed as a personal portal for creators and builders.",
      stack: ["Typescript", "Motion", "NexthAuth"],
      status: "LIVE",
      href: "/"
    }
  ];

  const expertArchives = [
    { label: 'Neural Agent Orchestration', value: 'Private LLM (Ollama) and embedding engines for predictive text and intelligent recommendation algorithms.', icon: Sparkles },
    { label: 'Autonomous Workflow', value: 'Scaling complex operational pipelines using n8n and Playwright for high-volume automation.', icon: Terminal },
    { label: 'FinTech Advisory Logic', value: 'Designing complex tax-mapping algorithms and secure financial content funnels (SaveTax).', icon: BarChart3 },
    { label: 'Supply Chain Architecture', value: 'Conceptualizing India-centric procurement ecosystems for builders and creators (Accio India).', icon: Rocket }
  ];

  return (
    <main className="relative min-h-screen pt-40 pb-20 px-6 selection:bg-crimson/30 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Header */}
        <div className="space-y-6">
          <label className="mono text-crimson text-xs uppercase tracking-[0.5em] font-bold">004 — SELECTED WORKS</label>
          <h1 className="text-6xl md:text-9xl font-display font-medium tracking-tighter text-warm-white leading-tight">
            The <br />
            <span className="text-muted italic">Systems.</span>
          </h1>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 pt-12 border-t border-warm-white/10">
          {allProjects.map((p, i) => (
            <div 
              key={p.title} 
              className={`editorial-card p-10 md:p-14 space-y-12 flex flex-col justify-between group relative overflow-hidden ${p.status === 'NDA' ? 'cursor-help' : 'cursor-pointer'}`}
            >
              {/* Founder Venture Glow */}
              {p.status === 'FOUNDER-VENTURE' && (
                  <div className="absolute inset-0 bg-blue-500/5 -z-10 group-hover:bg-blue-500/10 transition-colors" />
              )}

              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                         <span className={`mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 border 
                            ${p.status === 'NDA' ? 'border-amber-500/30 text-amber-500 bg-amber-500/5' : 
                              p.status === 'FOUNDER-VENTURE' ? 'border-blue-500/40 text-blue-400 bg-blue-500/10' : 
                              'border-crimson/30 text-crimson bg-crimson/5'}`}>
                            {p.status}
                         </span>
                         {p.status === 'NDA' && (
                             <span className="mono text-[8px] text-muted uppercase tracking-widest animate-pulse flex items-center gap-2">
                                <Lock size={10} /> ACCESS RESTRICTED
                             </span>
                         )}
                         {p.status === 'FOUNDER-VENTURE' && <Rocket size={14} className="text-blue-400 animate-bounce" />}
                    </div>
                    {p.status !== 'NDA' ? (
                        <Link href={p.href}>
                             <ArrowUpRight size={22} className="text-muted group-hover:text-warm-white transition-colors" />
                        </Link>
                    ) : (
                        <Lock size={18} className="text-muted opacity-30" />
                    )}
                </div>

                <div className="aspect-video bg-background/80 relative overflow-hidden group-hover:border-crimson/20 border border-warm-white/5 transition-all flex items-center justify-center p-8">
                     {p.status === 'NDA' ? (
                         <div className="text-center space-y-4 opacity-20 group-hover:opacity-40 transition-opacity">
                             <ShieldCheck size={60} strokeWidth={0.5} />
                             <p className="mono text-[8px] uppercase tracking-[0.5em]">System Encrypted</p>
                         </div>
                     ) : (
                         <div className="absolute inset-x-8 bottom-8 flex justify-between items-end border-b border-warm-white/5 pb-4 opacity-20 group-hover:opacity-50">
                            <span className="mono text-[10px] uppercase tracking-widest">BUILD / 24</span>
                            <span className="mono text-[10px] uppercase tracking-widest">EXP / {i + 1}</span>
                         </div>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-br from-crimson/5 to-transparent pointer-events-none" />
                </div>

                <div className="space-y-4">
                  <h3 className={`text-4xl md:text-5xl font-display font-medium tracking-tighter italic leading-snug 
                    ${p.status === 'FOUNDER-VENTURE' ? 'text-blue-100 group-hover:text-blue-400' : 'text-warm-white'}`}>
                    {p.title}.
                  </h3>
                  <p className="mono text-muted text-xs md:text-sm leading-relaxed max-w-sm lowercase opacity-70 group-hover:opacity-100 transition-opacity">
                    // {p.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-10 border-t border-warm-white/5 relative z-10">
                {p.stack.map(s => (
                    <span key={s} className={`px-4 py-2 text-[9px] mono font-bold uppercase tracking-widest border transition-all
                        ${p.status === 'FOUNDER-VENTURE' ? 'bg-blue-500/5 text-blue-200 border-blue-500/10 group-hover:border-blue-500/30' : 
                        'bg-warm-white/5 text-muted group-hover:text-warm-white border-warm-white/5 group-hover:border-warm-white/10'}`}>
                        {s}
                    </span>
                ))}
              </div>
              
              <div className="absolute top-0 right-0 w-1/3 h-full bg-crimson/2 -z-10 blur-[100px] group-hover:opacity-40 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Technical Expertise Log */}
        <section className="space-y-16 pt-20 border-t border-warm-white/10">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                     <Terminal size={16} className="text-crimson" />
                     <h2 className="text-sm font-sans font-bold uppercase tracking-widest text-warm-white">KNOWLEDGE ARCHIVE / TECHNICAL PROWESS</h2>
                </div>
                <p className="text-xs text-muted-foreground uppercase mono tracking-[0.2em] leading-relaxed max-w-2xl">
                    Engineering milestones and digital systems hardened across professional deployments and global infrastructures.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                 {expertArchives.map((exp, i) => (
                    <div key={i} className="p-8 bg-warm-white/[0.02] border border-warm-white/5 hover:border-crimson/20 transition-all group lg:space-y-4">
                         <div className="flex items-center gap-3 text-muted group-hover:text-crimson transition-all">
                             <exp.icon size={16} />
                             <span className="text-[10px] mono font-bold uppercase tracking-widest">{exp.label}</span>
                         </div>
                         <p className="text-xs leading-relaxed text-muted-foreground italic group-hover:text-warm-white transition-colors">
                            "{exp.value}"
                         </p>
                    </div>
                 ))}
            </div>
        </section>

        {/* Call to Build */}
        <div className="pt-40 text-center pb-20">
            <Link href="/" className="mono text-xs uppercase tracking-widest text-muted hover:text-crimson border-b border-crimson/20 pb-4 transition-all">
                Let&apos;s build a new system together
            </Link>
        </div>

      </div>
    </main>
  );
}
