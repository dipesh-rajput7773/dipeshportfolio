'use client';

import { motion } from 'motion/react';
import { Quote, ArrowRight, Sparkles, Target, Rocket } from 'lucide-react';

export default function VisionSection() {
  const visions = [
    { title: 'Vision Statement', description: 'To create a legacy of impactful digital products and cinematic storytelling that inspires growth and ambition.', icon: <Sparkles size={32} /> },
    { title: 'Building in Public', description: 'Sharing every win, loss, and lesson learned on the path to becoming a world-class developer and entrepreneur.', icon: <Target size={32} /> },
    { title: 'Documenting Success', description: 'Creating a blueprint for others to follow, proving that consistency and discipline lead to extraordinary results.', icon: <Rocket size={32} /> },
  ];

  return (
    <section id="vision" className="py-32 relative bg-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="space-y-4 text-center mb-24">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">The Vision</h2>
          <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
            Beyond the <span className="text-white/20">Code.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visions.map((vision, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-12 glass rounded-[40px] space-y-8 hover:bg-white/5 transition-all group"
            >
              <div className="p-6 rounded-3xl bg-white/5 text-white/40 group-hover:text-white transition-colors inline-block">
                {vision.icon}
              </div>
              <div className="space-y-4">
                <h4 className="text-3xl font-display font-bold text-white tracking-tight">{vision.title}</h4>
                <p className="text-lg text-zinc-400 font-medium tracking-tight leading-relaxed">{vision.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 p-16 glass rounded-[60px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 text-white/5 group-hover:text-white/10 transition-colors">
            <Quote size={120} />
          </div>
          <div className="relative z-10 space-y-8 max-w-4xl">
            <h4 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter leading-[0.9]">
              &quot;Success is not a destination, it&apos;s a disciplined journey of continuous creation.&quot;
            </h4>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <ArrowRight size={20} />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/60">thedipverse vision 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
