'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Lock, Loader2, AlertCircle, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ScriptLab() {
  const { data: session, status } = useSession();
  const isLoaded = status !== 'loading';
  const isSignedIn = !!session;
  const user = session?.user;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateScripts = async () => {
    if (!input.trim() || !user || isGenerating) return;

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
          {!isSignedIn && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="p-6 rounded-full bg-white/5 text-white/20">
                <Lock size={48} />
              </div>
              <div className="space-y-2">
                <h5 className="text-2xl font-display font-bold text-white tracking-widest">Access Restricted</h5>
                <p className="text-zinc-400 max-w-xs mx-auto">Please login via the secure portal to access our generation engine.</p>
              </div>
              <Link href="/login">
                <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                  Login & Verify
                </button>
              </Link>
            </div>
          )}

          {isSignedIn && messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
              <Sparkles size={48} className="text-white/20" />
              <p className="text-zinc-400 max-w-xs font-medium tracking-tight">Drop your reel idea below and I&apos;ll craft 2 specialist scripts for you instantly.</p>
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
                <div className={`max-w-[100%] p-6 rounded-3xl ${
                  msg.role === 'user' 
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
              placeholder={user ? "Describe your reel idea (e.g. A vlog about coding)..." : "Please sign in first"}
              disabled={!user || isGenerating}
              className="w-full px-8 py-6 glass rounded-3xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50"
            />
            <button
              onClick={generateScripts}
              disabled={!user || isGenerating || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
            >
              {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          <p className="mt-4 text-center text-[10px] uppercase tracking-widest font-bold text-white/20">
            {user ? "Safe & Secured Engine" : "Account Verification Required"}
          </p>
        </div>
      </div>
    </section>
  );
}
