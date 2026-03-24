'use client';

import { motion } from 'motion/react';
import { Mail, Instagram, Linkedin, ArrowRight, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  const socialLinks = [
    { name: '@thedipverse', href: 'https://www.instagram.com/thedipverse/', icon: <Instagram size={24} /> },
    { name: '@dip_builds', href: 'https://www.instagram.com/dip_builds/', icon: <Instagram size={24} /> },
    { name: 'thevisualdip@gmail.com', href: 'mailto:thevisualdip@gmail.com', icon: <Mail size={24} /> },
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-[#050505]">
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
              <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">Connect</h2>
              <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
                Let&apos;s Build <br />
                <span className="text-white/20">Something Great.</span>
              </h3>
            </div>

            <p className="text-xl text-zinc-400 font-medium tracking-tight leading-relaxed max-w-md">
              Whether you have a project in mind, want to collaborate, or just want to say hi, I&apos;m always open to new opportunities and connections.
            </p>

            <div className="flex flex-col gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  className="flex items-center gap-6 p-6 glass rounded-3xl hover:bg-white/10 transition-all group"
                >
                  <div className="p-4 rounded-2xl bg-white/5 text-white/40 group-hover:text-white transition-colors">
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-display font-bold text-white tracking-tight">{link.name}</h4>
                    <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">Connect with me</p>
                  </div>
                  <ArrowRight size={24} className="text-white/20 group-hover:text-white transition-colors group-hover:translate-x-2" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-12 glass rounded-[60px] space-y-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 text-white/5">
              <MessageSquare size={120} />
            </div>
            
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-bold tracking-widest uppercase text-white/60 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Currently Booking for Q3 2026
              </div>
              <h4 className="text-4xl font-display font-bold text-white tracking-tighter">
                Let&apos;s engineer your vision.
              </h4>
              <p className="text-zinc-400 font-medium tracking-tight">
                Use the form below to initiate a project discussion. I typically respond within 24 hours.
              </p>
            </div>

            <form className="space-y-6 relative z-10">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-8 py-6 glass rounded-3xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-8 py-6 glass rounded-3xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-8 py-6 glass rounded-3xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-6 bg-white text-black font-bold rounded-3xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
              >
                Send Message <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
