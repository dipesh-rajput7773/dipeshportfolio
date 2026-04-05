'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Lock, Loader2, AlertCircle, Trash2, Zap } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const FREE_LIMIT = 5;

export default function ScriptLab() {
  const { data: session, status } = useSession();
  const isLoaded = status !== 'loading';
  const isSignedIn = !!session;
  const user = session?.user;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [freeUsesLeft, setFreeUsesLeft] = useState<number>(FREE_LIMIT);
  const [showUpgradeWall, setShowUpgradeWall] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isCheckingLimit, setIsCheckingLimit] = useState(false);

  // Check IP-based usage from server on mount
  useEffect(() => {
    if (!isLoaded) return;
    if (isSignedIn) return; // unlimited for logged-in users

    async function checkUsage() {
      try {
        const res = await fetch('/api/free-usage?tool=script-lab');
        const data = await res.json();
        setFreeUsesLeft(data.remaining ?? 0);
        if (data.exceeded) setShowUpgradeWall(true);
      } catch {
        setFreeUsesLeft(FREE_LIMIT); // fallback: allow usage
      }
    }
    checkUsage();
  }, [isSignedIn, isLoaded]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateScripts = async () => {
    if (!input.trim() || isGenerating) return;

    // Guest flow: check IP-based free uses
    if (!isSignedIn) {
      setIsCheckingLimit(true);
      try {
        const res = await fetch('/api/free-usage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tool: 'script-lab' }),
        });
        const data = await res.json();
        setFreeUsesLeft(data.remaining ?? 0);

        // Already exceeded before this call
        if (data.exceeded && data.count > FREE_LIMIT) {
          setShowUpgradeWall(true);
          setIsCheckingLimit(false);
          return;
        }
        // Just hit limit on this use — allow generation, then show wall
        if (data.exceeded) setShowUpgradeWall(true);
      } catch {
        // API error — allow usage
      } finally {
        setIsCheckingLimit(false);
      }
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate scripts');
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content,
      };

      setMessages(prev => [...prev, aiMessage]);




    } catch (err: any) {
      console.error('Generation Error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  if (!isLoaded) {
    return (
      <div className="h-[600px] flex items-center justify-center glass rounded-[40px]">
        <Loader2 className="animate-spin text-white/40" size={48} />
      </div>
    );
  }

  return (
    <section id="script-lab" className="max-w-4xl mx-auto px-6">
      <div className="space-y-4 text-center mb-16">
        <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">Tool Dashboard</h2>
        <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
          Script <span className="text-white/20">Lab.</span>
        </h3>
        <p className="text-zinc-400 font-medium tracking-tight">
          Turn your ideas into high-engagement reel scripts. Driven by AI, Engineered for you.
        </p>
        {/* Free uses badge (guests only) */}
        {!isSignedIn && (
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs font-bold tracking-widest uppercase text-white/40 rounded-full">
            <Zap size={12} className="text-amber-400" />
            {freeUsesLeft > 0 ? `${freeUsesLeft} free ${freeUsesLeft === 1 ? 'use' : 'uses'} remaining` : 'Free limit reached'}
          </div>
        )}
      </div>

      <div className="relative glass rounded-[40px] overflow-hidden border-white/10 flex flex-col h-[700px]">
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 text-white">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="font-display font-bold text-white tracking-tight">Story Specialist AI</h4>
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold tracking-tighter">Live Generation Engine</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="p-3 rounded-full hover:bg-white/10 text-white/40 hover:text-red-400 transition-all flex items-center gap-2 group"
            >
              <Trash2 size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Clear Chat</span>
            </button>
          )}
        </div>

        {/* Messages Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth"
        >
          {/* Upgrade wall — shown when guest hits limit */}
          {showUpgradeWall && !isSignedIn && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="p-6 rounded-full bg-amber-500/10 text-amber-400">
                <Zap size={48} />
              </div>
              <div className="space-y-2">
                <h5 className="text-2xl font-display font-bold text-white tracking-widest">5 Free Uses Used</h5>
                <p className="text-zinc-400 max-w-xs mx-auto">Create a free account to keep generating scripts. No card required.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                    Create Free Account
                  </button>
                </Link>
                <Link href="/login">
                  <button className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all">
                    Sign In
                  </button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Already signed in empty state */}
          {isSignedIn && messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
              <Sparkles size={48} className="text-white/20" />
              <p className="text-zinc-400 max-w-xs font-medium tracking-tight">Drop your reel idea below and I&apos;ll craft 2 specialist scripts for you instantly.</p>
            </div>
          )}

          {/* Guest empty state (uses remaining) */}
          {!isSignedIn && !showUpgradeWall && messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
              <Sparkles size={48} className="text-white/20" />
              <p className="text-zinc-400 max-w-xs font-medium tracking-tight">Drop your reel idea below. No login needed for your first {FREE_LIMIT} scripts.</p>
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[100%] p-6 rounded-3xl ${msg.role === 'user'
                  ? 'bg-white text-black font-medium'
                  : 'glass text-zinc-300 leading-relaxed'
                  }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="glass p-6 rounded-3xl flex items-center gap-3 text-white/40">
                <Loader2 className="animate-spin" size={18} />
                <span className="text-sm font-medium tracking-tight">Crafting your scripts...</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white/5 border-t border-white/5">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-medium"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateScripts()}
              placeholder={showUpgradeWall && !isSignedIn ? "Create an account to continue..." : "Describe your reel idea (e.g. A vlog about coding)..."}
              disabled={isGenerating || (showUpgradeWall && !isSignedIn)}
              className="w-full px-8 py-6 glass rounded-3xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50"
            />
            <button
              onClick={generateScripts}
              disabled={isGenerating || !input.trim() || (showUpgradeWall && !isSignedIn)}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
            >
              {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          <p className="mt-4 text-center text-[10px] uppercase tracking-widest font-bold text-white/20">
            {isSignedIn ? "Unlimited Access — Logged In" : freeUsesLeft > 0 ? `${freeUsesLeft} free ${freeUsesLeft === 1 ? 'use' : 'uses'} left · Login for unlimited` : "Free limit reached · Create account to continue"}
          </p>
        </div>
      </div>
    </section>
  );
}
