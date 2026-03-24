'use client';

import { motion } from 'motion/react';
import { Instagram, Youtube, Play, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function CreatorSection() {
  const content = [
    { type: 'reel', title: 'Deep Thoughts', image: 'https://images.unsplash.com/photo-1516280440502-61b601f48661?q=80&w=600&auto=format&fit=crop' },
    { type: 'reel', title: 'Cinematic Storytelling', image: 'https://images.unsplash.com/photo-1585501865207-6bb4feeb5419?q=80&w=600&auto=format&fit=crop' },
    { type: 'video', title: 'Engineering Growth', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <section id="creator" className="py-32 relative bg-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">Content Creator</h2>
            <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
              The Cinematic <span className="text-white/20">Vision.</span>
            </h3>
            <p className="text-xl text-zinc-400 font-medium tracking-tight leading-relaxed pt-4">
              Documenting the growth journey through cinematic storytelling and deep philosophical insights.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/thedipverse/" target="_blank" className="p-6 glass rounded-full hover:bg-white/10 transition-all text-white">
              <Instagram size={32} />
            </a>
            <a href="https://www.instagram.com/dip_builds/" target="_blank" className="p-6 glass rounded-full hover:bg-white/10 transition-all text-white">
              <Instagram size={32} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="p-6 bg-white text-black rounded-full">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">{item.type}</p>
                <h4 className="text-2xl font-display font-bold text-white tracking-tight">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 glass rounded-[40px] text-center space-y-8">
          <h4 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter">
            Join the journey on Instagram.
          </h4>
          <p className="max-w-xl mx-auto text-zinc-400 font-medium tracking-tight">
            Follow my dual journey. @thedipverse for cinematic storytelling and deep insights, and @dip_builds for behind-the-scenes engineering.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
            <a href="https://www.instagram.com/thedipverse/" target="_blank" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
              Follow @thedipverse <ArrowRight size={20} />
            </a>
            <a href="https://www.instagram.com/dip_builds/" target="_blank" className="inline-flex items-center gap-3 px-8 py-4 glass text-white font-bold rounded-full hover:scale-105 transition-transform">
              Follow @dip_builds <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
