'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Lock, User as UserIcon, LogOut, Loader2, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp, 
  Timestamp,
  User,
  OperationType,
  handleFirestoreError
} from '@/lib/firebase';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export default function ScriptLab() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [usage, setUsage] = useState<{ count: number; lastReset: Timestamp } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUsage(currentUser.uid);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchUsage = async (uid: string) => {
    const path = `script_usage/${uid}`;
    try {
      const docRef = doc(db, 'script_usage', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as { count: number; lastReset: Timestamp };
        const lastResetDate = data.lastReset.toDate();
        const now = new Date();
        
        // Reset if it's a new day
        if (lastResetDate.toDateString() !== now.toDateString()) {
          const resetData = { count: 0, lastReset: serverTimestamp() };
          await updateDoc(docRef, resetData);
          setUsage({ count: 0, lastReset: Timestamp.now() });
        } else {
          setUsage(data);
        }
      } else {
        const initialData = { count: 0, lastReset: serverTimestamp() };
        await setDoc(docRef, initialData);
        setUsage({ count: 0, lastReset: Timestamp.now() });
      }
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, path);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to sign in. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMessages([]);
      setUsage(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const generateScripts = async () => {
    if (!input.trim() || !user || isGenerating) return;
    if (usage && usage.count >= 2) {
      setError('Daily limit reached. You can generate 2 scripts per day.');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });
      const model = ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a specialist storyteller and content specialist. 
        The user has an idea for a reel: "${input}".
        Generate 2 unique, high-engagement reel scripts based on this idea.
        Each script should include:
        1. Hook (First 3 seconds)
        2. Body (Value/Story)
        3. CTA (Call to Action)
        4. Visual cues/descriptions.
        Format the output clearly with "Script 1" and "Script 2" headers.`,
      });

      const response = await model;
      const aiContent = response.text || 'Sorry, I could not generate the scripts.';

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiContent,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update usage
      const docRef = doc(db, 'script_usage', user.uid);
      const newCount = (usage?.count || 0) + 1;
      await updateDoc(docRef, { count: newCount });
      setUsage(prev => prev ? { ...prev, count: newCount } : null);

    } catch (err) {
      console.error('Generation error:', err);
      setError('Failed to generate scripts. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center glass rounded-[40px]">
        <Loader2 className="animate-spin text-white/40" size={48} />
      </div>
    );
  }

  return (
    <section id="script-lab" className="py-32 relative overflow-hidden bg-[#050505]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-4 text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">AI Powered</h2>
          <h3 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-[0.9]">
            Script <span className="text-white/20">Lab.</span>
          </h3>
          <p className="text-zinc-400 font-medium tracking-tight">
            Turn your ideas into high-engagement reel scripts. 2 scripts per day.
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
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Powered by Gemini</p>
              </div>
            </div>
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-white">{user.displayName}</p>
                  <p className="text-[10px] text-white/40">{2 - (usage?.count || 0)} scripts left today</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2"
              >
                <UserIcon size={14} /> Sign In to Start
              </button>
            )}
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth"
          >
            {!user && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="p-6 rounded-full bg-white/5 text-white/20">
                  <Lock size={48} />
                </div>
                <div className="space-y-2">
                  <h5 className="text-2xl font-display font-bold text-white">Authentication Required</h5>
                  <p className="text-zinc-400 max-w-xs mx-auto">Sign in with Google to access the Script Lab and start creating.</p>
                </div>
                <button 
                  onClick={handleLogin}
                  className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
                >
                  Sign In with Google
                </button>
              </div>
            )}

            {user && messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                <Sparkles size={48} className="text-white/20" />
                <p className="text-zinc-400 max-w-xs">Drop your reel idea below and I&apos;ll craft 2 specialist scripts for you.</p>
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
                  <div className={`max-w-[85%] p-6 rounded-3xl ${
                    msg.role === 'user' 
                      ? 'bg-white text-black font-medium' 
                      : 'glass text-zinc-300 leading-relaxed'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <div className="whitespace-pre-wrap prose prose-invert prose-sm max-w-none">
                        {msg.content}
                      </div>
                    ) : (
                      msg.content
                    )}
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
                className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm"
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
                onKeyPress={(e) => e.key === 'Enter' && generateScripts()}
                placeholder={user ? "Describe your reel idea..." : "Please sign in first"}
                disabled={!user || isGenerating}
                className="w-full px-8 py-6 glass rounded-3xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50"
              />
              <button
                onClick={generateScripts}
                disabled={!user || isGenerating || !input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-4 bg-white text-black rounded-2xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="mt-4 text-center text-[10px] uppercase tracking-widest font-bold text-white/20">
              {user ? `${2 - (usage?.count || 0)} generations remaining today` : "Sign in to track your daily limit"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
