'use client';

import { motion } from 'motion/react';
import { TrendingUp, ShoppingBag, Rocket, Target, ShieldCheck, Zap } from 'lucide-react';

export default function BusinessSection() {
  const visions = [
    { title: 'E-commerce Journey', description: 'Building and scaling digital storefronts with a focus on user experience and conversion.', icon: <ShoppingBag size={32} /> },
    { title: 'Digital Product Plans', description: 'Developing high-value digital assets and SaaS tools for creators and developers.', icon: <Zap size={32} /> },
    { title: 'Future Vision', description: 'Achieving financial independence through brand building and impactful digital solutions.', icon: <Rocket size={32} /> },
  ];

  return (
    <section id="business" className="py-32 relative overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">Entrepreneurship</h2>
              <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
                The Future <br />
                <span className="text-white/20">Entrepreneur.</span>
              </h3>
            </div>

            <p className="text-xl text-zinc-400 font-medium tracking-tight leading-relaxed">
              My vision extends beyond code and content. I am building a digital ecosystem focused on financial independence, brand building, and creating real impact through e-commerce and digital products.
            </p>

            <div className="space-y-8">
              {visions.map((vision, idx) => (
                <div key={idx} className="flex gap-6 items-start p-8 glass rounded-3xl hover:bg-white/5 transition-all group">
                  <div className="p-4 rounded-2xl bg-white/5 text-white/40 group-hover:text-white transition-colors">
                    {vision.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-display font-bold text-white tracking-tight">{vision.title}</h4>
                    <p className="text-zinc-400 font-medium tracking-tight leading-relaxed">{vision.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square rounded-[60px] overflow-hidden glass p-12 flex flex-col justify-center gap-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
            
            <div className="space-y-4 text-center">
              <div className="inline-flex p-6 rounded-full bg-white text-black mb-4">
                <Target size={48} />
              </div>
              <h4 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter">
                Building in Public.
              </h4>
              <p className="max-w-md mx-auto text-zinc-400 font-medium tracking-tight">
                Every step of the journey is documented, shared, and built with transparency.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 glass rounded-3xl text-center space-y-2">
                <h5 className="text-3xl font-display font-bold text-white">100%</h5>
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">Transparency</p>
              </div>
              <div className="p-8 glass rounded-3xl text-center space-y-2">
                <h5 className="text-3xl font-display font-bold text-white">24/7</h5>
                <p className="text-xs font-bold uppercase tracking-widest text-white/40">Consistency</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Funnel Next Steps */}
        <div className="mt-32 pt-24 border-t border-white/5 text-center space-y-8">
          <h4 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter">
            Seen the journey. Now see the results.
          </h4>
          <p className="text-zinc-400 max-w-lg mx-auto font-medium">
            Explore the scalable systems and high-converting platforms I&apos;ve engineered for clients.
          </p>
          <a href="/projects" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
            View Case Studies <Rocket size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
