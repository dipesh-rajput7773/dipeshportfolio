'use client';

import { motion } from 'motion/react';
import { Film, Play, Instagram, Youtube, Scissors, Sparkles, ArrowRight, Eye, Camera } from 'lucide-react';
import Link from 'next/link';

export default function ContentPage() {
  const archives = [
    { name: 'Cinematic Log', desc: 'A collection of frames that breathe. Focus on light, texture, and silence.', icon: <Camera size={24}/> },
    { name: 'Short-Form Narrative', desc: 'Retention-first storytelling. Turning 60 seconds into a cinematic experience.', icon: <Scissors size={24}/> },
    { name: 'Visual Branding', desc: 'Designing the look and feel of high-performance digital identities.', icon: <Sparkles size={24}/> }
  ];

  return (
    <main className="relative min-h-screen pt-40 pb-20 px-6 selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto space-y-40">
        
        {/* Editorial Header */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] uppercase font-bold tracking-[0.5em] text-white/20 italic"
          >
            02 / THE VISUAL ARCHIVE
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-display font-bold tracking-tighter text-white"
          >
            The <br />
            <span className="text-white/20 italic">Frames.</span>
          </motion.h1>
          <div className="h-1 w-24 bg-white/20 rounded-full" />
          <p className="text-zinc-500 font-medium tracking-tight text-xl max-w-sm italic pt-6">
            Capturing the world through a lens, document life, one frame at a time.
          </p>
        </div>

        {/* Cinematic Grid: No Generic Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {archives.map((c, i) => (
                <div 
                    key={c.name}
                    className="group p-10 glass rounded-[60px] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between h-[500px] relative overflow-hidden bg-gradient-to-tr from-stone-900/40 via-black to-black"
                >
                    <div className="p-4 bg-white/5 rounded-3xl w-fit group-hover:bg-white group-hover:text-black transition-all">
                        {c.icon}
                    </div>
                    <div className="space-y-4 pt-12 relative z-10">
                        <h3 className="text-4xl font-display font-bold text-white tracking-tighter leading-tight italic">{c.name}</h3>
                        <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-xs pt-4">
                            {c.desc}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-white/40 font-bold text-[10px] uppercase tracking-widest pt-4 group-hover:text-white transition-all">
                        Launch Gallery <Play size={14}/>
                    </div>
                    {/* Visual Overlay texture */}
                    <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Play size={250} />
                    </div>
                </div>
            ))}
        </div>

        {/* Visual Showcase: Clean & Minimal */}
        <section className="space-y-12 pb-40">
            <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-white/40 italic">Visual History</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="aspect-[9/16] bg-zinc-900/50 rounded-[40px] border border-white/5 transition-all hover:scale-[1.02] flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity" />
                        <Link href="https://instagram.com" target="_blank" className="p-4 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                             <Instagram size={20}/>
                        </Link>
                        {/* Film-like details */}
                        <div className="absolute top-10 left-10 flex gap-2">
                             <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                             <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">REC</span>
                        </div>
                        <p className="absolute bottom-10 text-[8px] font-bold uppercase tracking-[0.5em] text-white/20 border-t border-white/5 pt-4">CINEMA / NO {i}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Closing: High Conversion Section */}
        <section className="py-20 bg-white/5 rounded-[60px] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 px-12 text-center md:text-left">
            <div className="space-y-4">
                <h3 className="text-5xl font-display font-bold text-white tracking-tighter italic">Ready for Narrative?</h3>
                <p className="text-zinc-500 text-sm font-medium max-w-sm">I engineer stories that stay in the mind long after the screen goes black.</p>
            </div>
            <Link href="/contact" className="px-12 py-6 bg-white text-black font-bold rounded-full hover:scale-110 transition-all flex items-center gap-3 shadow-2xl shadow-white/5">
                Let&apos;s Build Impact <Eye size={18}/>
            </Link>
        </section>

      </div>
    </main>
  );
}
