'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
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
              <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">About Me</h2>
              <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
                The Journey of a <br />
                <span className="text-white/20">Disciplined Builder.</span>
              </h3>
            </div>

            <div className="space-y-6 text-xl text-zinc-400 font-medium tracking-tight leading-relaxed">
              <p>
                I engineer digital experiences that tell a story. As a software developer with a filmmaker&apos;s eye, I bridge the gap between technical precision and creative expression.
              </p>
              <p>
                I don&apos;t just write code—I architect scalable solutions while obsessing over the micro-interactions that make a product feel intuitive, powerful, and premium.
              </p>
              <p className="text-white italic">
                &quot;I&apos;m not here to build average products. I&apos;m here to engineer impact.&quot;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <h4 className="text-3xl font-display font-bold text-white">3+ Years</h4>
                <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold">Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-display font-bold text-white">15+ Projects</h4>
                <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold">Completed</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden glass group"
          >
            <Image
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop"
              alt="thedipverse creator"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-8 left-8 right-8 p-8 glass rounded-2xl">
              <p className="text-sm font-bold uppercase tracking-widest text-white/60 mb-2">Current Focus</p>
              <h4 className="text-2xl font-display font-bold text-white tracking-tight">Building the next generation of digital products.</h4>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
