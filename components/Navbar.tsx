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
  const visiblePaths = ['/', '/login', '/signup', '/studio', '/contact', '/projects', '/about', '/content'];
  const isDashboard = pathname?.startsWith('/dashboard');
  const isPublicSpace = !visiblePaths.includes(pathname || '') && !isDashboard;

  if (isPublicSpace) return null;

  const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Studio', href: '/studio' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 bg-background ${scrolled ? 'py-4 border-b border-warm-white/5' : 'py-8'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-display font-medium tracking-tighter text-warm-white">
          thedipverse<span className="text-crimson font-mono">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative group ${pathname === link.href ? 'text-warm-white' : 'text-muted hover:text-warm-white'
                }`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 h-[1px] bg-crimson transition-all ${pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}

          {isSignedIn ? (
            <div className="flex items-center gap-8 border-l border-warm-white/10 pl-8">
              <Link href="/dashboard" className="mono text-[10px] font-bold uppercase tracking-[0.2em] text-crimson animate-pulse">
                [ DASHBOARD ]
              </Link>
              <button
                onClick={() => signOut()}
                className="mono text-[9px] font-bold uppercase tracking-widest text-muted hover:text-warm-white transition-all"
              >
                [ LOGOUT ]
              </button>
            </div>
          ) : (
            <Link href="/login" className="px-6 py-2 border border-warm-white/10 hover:border-crimson text-[10px] mono uppercase tracking-widest transition-all">
              PORTAL LOGIN
            </Link>
          )}
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
          className="absolute top-full left-0 right-0 bg-background border-b border-warm-white/10 p-10 md:hidden"
        >
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`mono text-[11px] font-bold uppercase tracking-[0.3em] ${pathname === link.href ? 'text-crimson' : 'text-muted hover:text-warm-white'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!isSignedIn && (
              <Link href="/login" className="px-6 py-4 border border-warm-white/10 text-[10px] mono uppercase tracking-widest text-center" onClick={() => setIsOpen(false)}>
                PORTAL LOGIN
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
