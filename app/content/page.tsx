'use client';

import { motion } from 'framer-motion';
import { Instagram, Youtube, User, Film, Sparkles, Zap, Wand2, Lightbulb, Camera, BarChart3, TrendingUp, DollarSign, Activity, Users, ArrowRight, History, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function ContentPage() {
  const exitArchive = [
    { 
        id: "FLAGSHIP OP", 
        action: "BUILT / SCALED / SOLD", 
        stat: "30M+ REACTIONS", 
        sub: "8,000 FOLLOWERS | 16M REEL",
        lesson: "Engagement density beats follower count.",
        color: "border-crimson/40 shadow-crimson/5",
        bg: "bg-crimson/[0.03]"
    },
    { 
        id: "DUAL SECONDARY", 
        action: "SCALED / SOLD (₹10K)", 
        stat: "2 PAGES", 
        sub: "EXPERIMENTAL OPS",
        lesson: "Buy your next chapter with your exits.",
        color: "border-amber-500/30",
        bg: "bg-amber-500/[0.03]"
    },
    { 
        id: "DELETED PROTOCOL", 
        action: "TESTED / DELETED", 
        stat: "1 PAGE", 
        sub: "RAW FEEDBACK LOOP",
        lesson: "Break the system to understand the atoms.",
        color: "border-warm-white/10",
        bg: "bg-warm-white/[0.02]"
    }
  ];

  const deepThoughts = [
    { 
        id: "#001", 
        hook: "Script Outline", 
        content: "Log viral hone ke liye content banate hain. Main content banata hun kyunki kuch dard karta hai andar — aur usse bahar nikalna hai kisi tarah." 
    },
    { 
        id: "#002", 
        hook: "The Architect Mindset", 
        content: "I've seen the top (30M reactions). I chose to rebuild from zero. This time, with intention. 26 followers is a story, not a failure." 
    }
  ];

  const grindLog = [
    { date: "APRIL 2026", event: "41 posts. 26 followers. Still posting. Not for numbers. For the reps." },
    { date: "MARCH 2026", event: "Rebuilt Auth from scratch. Learned more in 3 days than 3 months." },
    { date: "2024", event: "Sold 2 meme ops for ₹10K. 16M view reel milestone achieved." }
  ];

  const youtubeArchive = [
    { 
        id: "DOCUMENTARY EDIT", 
        action: "ANIMATED / 20 DAYS / UNPUBLISHED", 
        stat: "RAM MANDIR CONFLICT", 
        sub: "MOBILE VN EDIT",
        lesson: "High-end narrative requires scalable tools. 20 days on mobile is grit, but not a system.",
        color: "border-blue-500/30",
        bg: "bg-blue-500/[0.02]"
    },
    { 
        id: "SONG SYNC", 
        action: "TESTED / SHOT", 
        stat: "MUSIC VISUALS", 
        sub: "EDIT PACING",
        lesson: "Visual momentum lives in the edit rhythm, not just the footage.",
        color: "border-amber-500/30",
        bg: "bg-amber-500/[0.02]"
    },
    { 
        id: "MUKBANG FORMAT", 
        action: "FILMED / ARCHIVED", 
        stat: "FOOD & AUDIO", 
        sub: "CULTURAL FORMAT",
        lesson: "Following trends without resonance disrupts your real creative identity.",
        color: "border-warm-white/10",
        bg: "bg-warm-white/[0.02]"
    }
  ];

  return (
    <main className="relative min-h-screen pt-40 pb-20 px-6 selection:bg-crimson/30 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-40">
        
        {/* Honest Hero Narrative */}
        <div className="space-y-6">
          <label className="mono text-crimson text-xs uppercase tracking-[0.5em] font-bold">005 — THE NARRATIVE ARCHIVE</label>
          <h1 className="text-6xl md:text-[10rem] font-display font-medium tracking-tighter text-warm-white leading-tight uppercase">
             Pages Sold. <br />
            <span className="text-muted italic">Lessons Kept.</span>
          </h1>
          <p className="mono text-muted text-xs md:text-sm max-w-xl leading-relaxed lowercase pt-4 border-l border-crimson pl-6">
             // Precision documentation of a 30M+ reaction journey. Exited the noise to build something that breathes. 26 followers, 30M lessons.
          </p>
        </div>

        {/* THE EXIT ARCHIVE SECTION */}
        <section className="space-y-16">
             <div className="flex items-center gap-3">
                  <History size={18} className="text-crimson" />
                  <h4 className="mono text-warm-white text-sm uppercase tracking-widest font-bold">THE EXIT ARCHIVE (REACH OPERATIONS)</h4>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {exitArchive.map((page, i) => (
                    <div key={i} className={`p-10 border ${page.color} ${page.bg} transition-all group relative overflow-hidden backdrop-blur-sm shadow-2xl`}>
                         <div className="space-y-8 relative z-10">
                            <span className="mono text-[10px] text-muted-foreground uppercase tracking-widest">{page.id}</span>
                            <div className="space-y-4">
                                <h5 className="font-display text-4xl text-warm-white leading-tight uppercase italic">{page.action}</h5>
                                <div className="space-y-1">
                                    <p className="mono text-crimson text-xl font-bold tracking-widest">{page.stat}</p>
                                    <p className="mono text-muted text-[10px] tracking-widest opacity-60 uppercase">{page.sub}</p>
                                </div>
                            </div>
                            <p className="text-xs italic text-muted leading-relaxed border-t border-warm-white/5 pt-6 opacity-60 group-hover:opacity-100 transition-opacity">
                                // {page.lesson}
                            </p>
                         </div>
                         <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                             <TrendingUp size={80} strokeWidth={0.5} />
                         </div>
                    </div>
                  ))}
             </div>
        </section>

        {/* THE YOUTUBE LAB (UNPUBLISHED ARCHIVE) */}
        <section className="space-y-16">
             <div className="flex items-center gap-3">
                  <Youtube size={18} className="text-red-500" />
                  <h4 className="mono text-warm-white text-sm uppercase tracking-widest font-bold">THE YOUTUBE EXPERIMENTS / UNPUBLISHED</h4>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {youtubeArchive.map((lab, i) => (
                    <div key={i} className={`p-10 border ${lab.color} ${lab.bg} transition-all group relative overflow-hidden backdrop-blur-sm shadow-2xl`}>
                         <div className="space-y-8 relative z-10">
                            <span className="mono text-[10px] text-muted-foreground uppercase tracking-widest">{lab.id}</span>
                            <div className="space-y-4">
                                <h5 className="font-display text-2xl text-warm-white leading-tight uppercase italic">{lab.action}</h5>
                                <div className="space-y-1">
                                    <p className="mono font-bold tracking-widest text-warm-white pt-2">{lab.stat}</p>
                                    <p className="mono text-muted text-[10px] tracking-widest opacity-60 uppercase">{lab.sub}</p>
                                </div>
                            </div>
                            <p className="text-xs italic text-muted leading-relaxed border-t border-warm-white/5 pt-6 opacity-60 group-hover:opacity-100 transition-opacity">
                                // {lab.lesson}
                            </p>
                         </div>
                    </div>
                  ))}
             </div>
        </section>

        {/* DEEP THOUGHT SCRIPT CARDS */}
        <section className="space-y-16">
             <div className="flex items-center gap-3">
                  <Wand2 size={18} className="text-crimson" />
                  <h4 className="mono text-warm-white text-sm uppercase tracking-widest font-bold">DEEP THOUGHT SCRIPTS / HOOKS</h4>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {deepThoughts.map((script, i) => (
                    <div key={i} className="editorial-card p-12 bg-white/[0.01] border border-warm-white/5 space-y-12 group hover:border-crimson/20 transition-all">
                        <div className="flex justify-between items-center opacity-40">
                             <span className="mono text-[10px] uppercase tracking-widest">Thought {script.id}</span>
                             <span className="mono text-[10px] uppercase tracking-widest">{script.hook}</span>
                        </div>
                        <p className="text-2xl md:text-4xl font-display text-warm-white leading-[1.1] md:leading-[1.15]">
                            &quot;{script.content}&quot;
                        </p>
                        <div className="pt-8 border-t border-warm-white/5 flex justify-between items-center px-2">
                             <span className="mono text-[8px] text-muted italic">— Hook generated. Reel pending shoot.</span>
                             <ArrowRight size={14} className="text-muted group-hover:text-crimson transition-transform group-hover:translate-x-2" />
                        </div>
                    </div>
                  ))}
             </div>
        </section>

        {/* THE GRIND LOG (TERMINAL VIBE) */}
        <section className="space-y-16">
             <div className="flex items-center gap-3">
                  <Terminal size={18} className="text-emerald-500" />
                  <h4 className="mono text-warm-white text-sm uppercase tracking-widest font-bold">THE GRIND LOG / STATUS: ACTIVE</h4>
             </div>
             <div className="bg-black/40 border border-emerald-500/10 p-10 md:p-16 space-y-12">
                  {grindLog.map((log, i) => (
                    <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-10 border-b border-warm-white/5 last:border-0 pb-10 last:pb-0 mb-10 last:mb-0">
                         <span className="mono text-[10px] text-emerald-500 font-bold uppercase tracking-widest group-hover:scale-105 transition-transform inline-block">[{log.date}]</span>
                         <p className="md:col-span-3 text-sm md:text-md text-muted italic leading-relaxed group hover:text-warm-white transition-colors">
                             &quot;{log.event}&quot;
                         </p>
                    </div>
                  ))}
                  <div className="flex items-center gap-4 pt-10">
                       <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                       <span className="mono text-[10px] text-emerald-500 uppercase tracking-widest font-bold">System Online: Current Status — Building from 0.</span>
                  </div>
             </div>
        </section>

        {/* FIXED VIRTUAL CINEMA (STATIC THUMBNAILS) */}
        <section className="space-y-16">
             <div className="flex items-center gap-3">
                  <Film size={18} className="text-crimson" />
                  <h4 className="mono text-warm-white text-sm uppercase tracking-widest font-bold">VIRTUAL CINEMA / SELECTED EXPERIMENTS</h4>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  <div className="editorial-card group p-0 overflow-hidden relative border border-warm-white/10 aspect-[9/16] bg-surface flex flex-col justify-center items-center text-center p-8 space-y-6">
                        <div className="p-4 bg-crimson/10 rounded-full text-crimson group-hover:scale-110 transition-transform shadow-2xl">
                             <Instagram size={32} />
                        </div>
                        <div className="space-y-4 z-20">
                             <h4 className="font-display text-3xl text-warm-white px-6 uppercase tracking-tighter italic">Cinematic Test 01.</h4>
                             <p className="mono text-[10px] text-muted uppercase tracking-widest opacity-60 italic leading-relaxed px-6">// Shot on Phone. Graded in DaVinci.</p>
                        </div>
                        <Link href="https://instagram.com" className="px-8 py-4 bg-crimson text-white text-[10px] mono font-bold uppercase tracking-widest z-20 hover:bg-black transition-all shadow-2xl">
                             Watch on Instagram
                        </Link>
                        {/* Digital Texture */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-crimson/10 to-transparent pointer-events-none" />
                  </div>
                  {/* Empty Slot for Progress */}
                  <div className="border border-warm-white/5 border-dashed flex items-center justify-center aspect-[9/16] opacity-30 hover:opacity-100 transition-opacity">
                        <p className="mono text-[10px] uppercase tracking-[0.4em] text-muted rotate-90">Archive Slot Pending</p>
                  </div>
             </div>
        </section>

        {/* Creator Channel Bridge */}
        <section className="py-40 text-center border-t border-warm-white/5 bg-gradient-to-b from-transparent to-crimson/[0.01]">
            <h4 className="mono text-crimson text-[10px] uppercase tracking-[0.4em] font-bold mb-16 italic opacity-40 uppercase">THE MISSION: BUILD WITH INTENTION</h4>
            <div className="flex flex-wrap gap-12 md:gap-24 justify-center items-center">
                <a href="https://instagram.com" className="font-display text-4xl md:text-6xl text-warm-white hover:text-crimson transition-all flex items-center gap-4 group italic tracking-tighter">
                    @thedipverse <Instagram size={28} className="text-muted group-hover:text-crimson" />
                </a>
                <a href="https://youtube.com" className="font-display text-4xl md:text-6xl text-warm-white hover:text-crimson transition-all flex items-center gap-4 group italic tracking-tighter">
                    CHANNEL <Youtube size={28} className="text-muted group-hover:text-crimson" />
                </a>
            </div>
        </section>

      </div>
    </main>
  );
}
