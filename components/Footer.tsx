'use client';

import { motion } from 'motion/react';
import { Instagram, Linkedin, Mail, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Define where Footer should be visible (same as Navbar)
  const visiblePaths = ['/', '/login', '/signup', '/script-lab', '/contact', '/projects', '/about'];
  const isDashboard = pathname?.startsWith('/dashboard');
  const isPublicSpace = !visiblePaths.includes(pathname || '') && !isDashboard && pathname !== '/';
  
  if (isPublicSpace) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-24 relative overflow-hidden bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24">
          <div className="space-y-6 max-w-md text-center md:text-left">
            <Link href="/" className="text-3xl font-display font-bold tracking-tighter text-white">
              thedipverse<span className="text-white/40">.</span>
            </Link>
            <p className="text-xl text-zinc-400 font-medium tracking-tight leading-relaxed">
              &quot;I&apos;m not here to be average. I&apos;m here to create impact.&quot;
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-8">
            <div className="flex gap-8">
              <a href="https://www.instagram.com/thedipverse/" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://www.instagram.com/dip_builds/" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="mailto:thevisualdip@gmail.com" className="text-zinc-400 hover:text-white transition-colors">
                <Mail size={24} />
              </a>
            </div>
            <button
              onClick={scrollToTop}
              className="p-6 glass rounded-full hover:bg-white/10 transition-all text-white group"
            >
              <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-bold uppercase tracking-widest text-white/20">
          <p>© 2026 thedipverse. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
