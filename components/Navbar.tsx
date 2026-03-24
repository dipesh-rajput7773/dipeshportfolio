'use client';

import { motion } from 'motion/react';
import { Menu, X, Instagram, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Script Lab', href: '/script-lab' },
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
