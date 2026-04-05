'use client';

import { motion } from 'motion/react';
import { Power, Terminal } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6 text-center overflow-hidden">
      <PageTransition>
        <div className="max-w-xl w-full space-y-12 relative z-10">
          
          {/* Animated Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-crimson/5 blur-[120px] rounded-full -z-10 animate-pulse duration-5000" />

          <div className="space-y-6">
            <div className="w-20 h-20 border border-crimson/20 rounded-full flex items-center justify-center mx-auto mb-10 group">
                <Power size={24} className="text-crimson animate-pulse" />
            </div>
            
            <label className="mono text-crimson text-xs font-bold uppercase tracking-[0.5em]">SYSTEM_PAUSED / 503</label>
            <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tighter leading-[0.9] text-warm-white italic">
               The Archive is <br /> 
               <span className="text-muted">re-rendering.</span>
            </h1>
            <p className="mono text-xs text-muted/60 uppercase tracking-[0.3em] pt-4 max-w-xs mx-auto leading-relaxed">
               // UNDERGOING NEURAL MAINTENANCE. BACK SHORTLY TO BREVity.
            </p>
          </div>

          <div className="pt-10 flex flex-col items-center gap-4 border-t border-warm-white/5 opacity-40">
             <div className="flex gap-4 items-center mono text-[10px] uppercase tracking-widest text-muted">
                <Terminal size={12} />
                <span>BUILDER_MODE: ACTIVE</span>
             </div>
             <p className="mono text-[8px] text-muted tracking-widest uppercase">
                thedipverse.com / studio archive v1.2.5
             </p>
          </div>

        </div>
      </PageTransition>
    </main>
  );
}
