'use client';

import { motion } from 'motion/react';
import { Menu, X, Instagram, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoaded = status !== 'loading';
  const isSignedIn = !!session;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();
  
  // Define where Navbar should be visible
  const visiblePaths = ['/', '/login', '/signup', '/script-lab', '/contact', '/projects', '/about'];
  const isDashboard = pathname?.startsWith('/dashboard');
  const isPublicSpace = !visiblePaths.includes(pathname || '') && !isDashboard && pathname !== '/';
  
  if (isPublicSpace) return null;

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Script Lab', href: '/script-lab' },
    { name: 'Content', href: '/content' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled ? 'py-4 bg-black/50 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-display font-bold tracking-tighter text-white">
          thedipverse<span className="text-white/40">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/thedipverse/" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
            <a href="https://www.instagram.com/dip_builds/" target="_blank" className="text-zinc-400 hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
            
            {isSignedIn ? (
              <div className="flex items-center gap-6">
                <Link href="/dashboard" className="text-sm font-bold text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   Dashboard
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="px-4 py-2 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:border-white/20 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login">
                <button className="px-5 py-2 bg-white text-black text-xs font-bold rounded-full hover:scale-105 transition-transform shadow-xl shadow-white/5">
                  Portal Login
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-lg font-medium ${
                  pathname === link.href ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
