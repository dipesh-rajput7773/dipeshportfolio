'use client';

import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Bot, PenTool } from 'lucide-react';
import { useState } from 'react';

export default function ScriptLabTeaser() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt) {
      // In a real app, we might pass this via query params, but here we just route them.
      router.push('/script-lab');
    }
  };

  return (
    <section className="py-32 relative bg-[#050505] overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)] opacity-80" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-widest uppercase text-white/60 mb-2">
            <Bot size={14} /> LIVE AI EXPERIMENT
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">Script</span> Lab.
          </h2>
          <p className="text-xl text-zinc-400 font-medium tracking-tight leading-relaxed max-w-lg">
            Stop telling. Start showing. Experience my custom-built AI engine designed to generate high-retention cinematic scripts in seconds.
          </p>
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2"
        >
          <div className="p-8 md:p-12 glass rounded-[40px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-white/10 transition-colors">
              <Sparkles size={80} />
            </div>
            
            <form onSubmit={handleGenerate} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-white/60">
                  Test the Engine
                </label>
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40">
                    <PenTool size={20} />
                  </div>
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. A cinematic intro for a fitness brand..."
                    className="w-full pl-16 pr-8 py-6 bg-black border border-white/10 rounded-3xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors shadow-2xl"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full py-6 bg-white text-black font-bold rounded-3xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
              >
                Generate Script <ArrowRight size={20} />
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <button 
                onClick={() => router.push('/script-lab')}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
              >
                Or enter the full lab experience
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
