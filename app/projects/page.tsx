'use client';

import { motion } from 'motion/react';
import { ExternalLink, Github, Code, ArrowUpRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  const allProjects = [
    {
      title: "ScriptLab",
      description: "A professional AI-powered script generator for high-retention content creation.",
      stack: ["Next.js", "GPT-4", "MongoDB", "Auth.js"],
      isMain: true,
      href: "/dashboard/script-lab"
    },
    {
      title: "Your Space",
      description: "A premium, cinematic Linktree alternative with customizable themes and analytics.",
      stack: ["MERN", "Framer Motion", "JWT"],
      href: "/dashboard/your-space"
    },
    {
      title: "The Dipverse V1",
      description: "A minimalist digital archive of my journey and projects as a full-stack engineer.",
      stack: ["React", "Lucide", "Motion"],
      href: "/"
    },
    {
        title: "Creator Engine",
        description: "An automated workflow for generating social media assets and hooks.",
        stack: ["Node.js", "Python", "FFmpeg"],
        href: "#"
      }
  ];

  return (
    <main className="relative min-h-screen pt-40 pb-20 px-6 selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto space-y-32">
        
        {/* Header */}
        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-display font-bold tracking-tighter text-white"
          >
            The <br />
            <span className="text-white/20">Systems.</span>
          </motion.h1>
          <div className="h-1 w-24 bg-white/20 rounded-full" />
          <p className="text-zinc-500 font-medium tracking-tight text-xl max-w-sm">
            Everything I build is a system designed to solve a problem or share a story.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {allProjects.map((p, i) => (
            <div 
              key={p.title} 
              className={`group p-10 glass rounded-[60px] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between h-[450px] relative overflow-hidden ${p.isMain ? 'md:col-span-2' : ''}`}
            >
              {p.isMain && (
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <Zap size={150} />
                </div>
              )}

              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-start">
                    <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 group-hover:bg-white group-hover:text-black transition-all">
                        <Code size={24}/>
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="text-white/20 hover:text-white transition-all"><Github size={20}/></a>
                        <a href={p.href} className="text-white/20 hover:text-white transition-all"><ExternalLink size={20}/></a>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter italic">
                        {p.title}<span className="text-white/20">.</span>
                    </h3>
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-xs">{p.description}</p>
                </div>
              </div>

              <div className="relative z-10 space-y-6">
                <div className="flex flex-wrap gap-2">
                    {p.stack.map(s => (
                        <span key={s} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-white/30 whitespace-nowrap">
                            {s}
                        </span>
                    ))}
                </div>
                <Link href={p.href} className="flex items-center gap-2 text-white/40 font-bold text-[10px] uppercase tracking-widest pt-4 group-hover:text-white transition-all">
                    View Case Study <ArrowUpRight size={14}/>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <section className="py-20 border-t border-white/5 text-center">
            <h4 className="text-4xl font-display font-bold text-white tracking-tighter">Need a custom system?</h4>
            <p className="text-zinc-500 font-medium pt-4 pb-12">I specialize in high-performance digital architectures.</p>
            <Link href="/contact" className="px-10 py-5 border border-white/20 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Let&apos;s build it
            </Link>
        </section>

      </div>
    </main>
  );
}
