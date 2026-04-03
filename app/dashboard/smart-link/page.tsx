'use client';

import { useState } from 'react';
import { Link as LinkIcon, Copy, Check, Zap, ExternalLink, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SmartLinkPage() {
  const [inputUrl, setInputUrl] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!inputUrl) return;
    
    // Construct the smart redirect URL
    const baseUrl = window.location.origin;
    const smartUrl = `${baseUrl}/api/redirect?url=${encodeURIComponent(inputUrl)}`;
    setGeneratedUrl(smartUrl);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40 italic">App Intent Engine</h2>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9]">
            Smart <br />
            <span className="text-white/20">Link Hub.</span>
          </h1>
          <p className="text-zinc-400 font-medium tracking-tight max-w-md mx-auto">
            Bypass in-app browsers. Force YouTube & Spotify to open native applications instantly.
          </p>
        </div>

        {/* Generator Card */}
        <div className="glass p-10 rounded-[40px] border border-white/5 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Zap size={120} />
            </div>

            <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2">Original Destination URL</label>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 flex items-center gap-4 px-6 py-5 bg-white/5 rounded-3xl border border-white/5 focus-within:border-white/20 transition-all">
                            <LinkIcon size={20} className="text-white/20" />
                            <input 
                                type="text"
                                value={inputUrl}
                                onChange={(e) => setInputUrl(e.target.value)}
                                placeholder="https://www.youtube.com/watch?v=..."
                                className="bg-transparent border-none outline-none text-white font-bold w-full placeholder:text-white/10"
                            />
                        </div>
                        <button 
                            onClick={handleGenerate}
                            className="px-8 py-5 bg-white text-black font-bold rounded-3xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                        >
                            Generate Smart Link <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {generatedUrl && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="pt-8 border-t border-white/5 space-y-4"
                        >
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2">Your thedipverse Smart Link</label>
                            <div className="flex items-center justify-between p-6 bg-white/5 rounded-[30px] border border-white/10 group">
                                <span className="text-sm font-bold text-white/80 truncate pr-4">{generatedUrl}</span>
                                <button 
                                    onClick={handleCopy}
                                    className={`p-4 rounded-2xl transition-all flex items-center gap-2 ${copied ? 'bg-green-500/20 text-green-500' : 'bg-white text-black hover:scale-110'}`}
                                >
                                    {copied ? <><Check size={18} /> Copied</> : <><Copy size={18} /> Copy Link</>}
                                </button>
                            </div>
                            <div className="flex items-center gap-4 pt-2 ml-2">
                                <span className="flex h-2 w-2 rounded-full bg-green-500" />
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest italic">
                                    Ready to bypass in-app browsers
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40">
            <div className="p-6 border border-white/5 rounded-3xl space-y-3">
                <div className="p-3 bg-white/5 rounded-xl w-fit"><Zap size={20}/></div>
                <h4 className="text-sm font-bold uppercase tracking-widest">Zero Latency</h4>
                <p className="text-xs font-medium leading-relaxed">Instantly triggers the app intent without third-party middleware.</p>
            </div>
            <div className="p-6 border border-white/5 rounded-3xl space-y-3">
                <div className="p-3 bg-white/5 rounded-xl w-fit"><ExternalLink size={20}/></div>
                <h4 className="text-sm font-bold uppercase tracking-widest">Broad Support</h4>
                <p className="text-xs font-medium leading-relaxed">Works for YouTube, Spotify, and more to ensures app delivery.</p>
            </div>
            <div className="p-6 border border-white/5 rounded-3xl space-y-3">
                <div className="p-3 bg-white/5 rounded-xl w-fit"><Check size={20}/></div>
                <h4 className="text-sm font-bold uppercase tracking-widest">Self Hosted</h4>
                <p className="text-xs font-medium leading-relaxed">100% data sovereignty under the thedipverse infrastructure.</p>
            </div>
        </div>

      </div>
    </div>
  );
}
