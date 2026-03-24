'use client';

import { motion } from 'motion/react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export default function Projects() {
  const projects = [
    {
      title: 'High-Conversion Storefront Architecture',
      description: 'Engineered a scalable e-commerce ecosystem processing seamless transactions via Next.js & Stripe. Optimized for sub-second load times and maximum user retention.',
      tech: ['Next.js', 'MongoDB', 'Stripe', 'Framer Motion'],
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop', // Moody store
      link: '#',
      github: '#',
    },
    {
      title: 'Enterprise Lead Engine (CRM)',
      description: 'Designed a custom relationship management layer for rapid lead processing. Streamlined the entire B2B pipeline into a single, elegant truth layer.',
      tech: ['React', 'Node.js', 'Express', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop', // Moody data/dashboard
      link: '#',
      github: '#',
    },
    {
      title: 'Zero-Knowledge Protocol Vault',
      description: 'Built a peer-to-peer file transfer application featuring absolute end-to-end encryption. A brutalist, highly secure approach to sensitive data sharing.',
      tech: ['WebRTC', 'FastAPI', 'React', 'Redis'],
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop', // Hacker / Matrix
      link: '#',
      github: '#',
    },
  ];

  return (
    <section id="projects" className="py-32 relative overflow-hidden bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-24">
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">Portfolio</h2>
            <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
              Selected <span className="text-white/20">Works.</span>
            </h3>
          </div>
          <p className="max-w-md text-zinc-400 font-medium tracking-tight">
            I don&apos;t just write code; I engineer digital experiences that solve real problems. Here is a curated selection of systems built for impact, precision, and scale.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-32">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
            >
              <div className="w-full lg:w-3/5 group relative aspect-[16/10] rounded-3xl overflow-hidden glass">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6">
                  <a href={project.link} className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform">
                    <ExternalLink size={24} />
                  </a>
                  <a href={project.github} className="p-4 glass text-white rounded-full hover:scale-110 transition-transform">
                    <Github size={24} />
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-2/5 space-y-8">
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-widest font-bold text-white/40 px-3 py-1 rounded-full border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
                <h4 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter leading-tight">
                  {project.title}
                </h4>
                <p className="text-xl text-zinc-400 font-medium tracking-tight leading-relaxed">
                  {project.description}
                </p>
                <div className="pt-4">
                  <a href={project.link} className="inline-flex items-center gap-2 text-white font-bold group">
                    View Case Study <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Funnel Next Steps */}
        <div className="mt-32 pt-24 border-t border-white/5 text-center space-y-8">
          <h4 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter">
            Ready to engineer your next big idea?
          </h4>
          <p className="text-zinc-400 max-w-lg mx-auto font-medium">
            Whether it&apos;s a scalable SaaS or a high-converting storefront, let&apos;s build an experience that matters.
          </p>
          <a href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
            Start a Conversation <ArrowUpRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
