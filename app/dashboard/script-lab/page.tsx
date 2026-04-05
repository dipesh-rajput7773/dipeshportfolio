'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, Brain, Target, MessageSquare, Loader2, ArrowRight, CheckCircle2, Copy, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

type ToolType = 'niche' | 'ideas' | 'script' | 'carousel';

export default function ScriptLabPage() {
  const [activeTool, setActiveTool] = useState<ToolType>('niche');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const [isExporting, setIsExporting] = useState(false);
  const [formData, setFormData] = useState({
    q1: '', q2: '', q3: '',
    niche: '',
    idea: '',
    topic: ''
  });

  const downloadAllSlides = async () => {
    if (!result?.slides) return;
    setIsExporting(true);
    
    for (const slide of result.slides) {
      const element = document.getElementById(`export-slide-${slide.slide_number}`);
      if (element) {
        const canvas = await html2canvas(element, { 
          scale: 3, // High Res
          useCORS: true, 
          backgroundColor: '#080808' 
        });
        const link = document.createElement('a');
        link.download = `slide_0${slide.slide_number}_${profile.username || 'thedipverse'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    }
    setIsExporting(false);
  };

  // Fetch profile for branding
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/your-space');
        if (res.ok) {
          const data = await res.json();
          setProfile(data.space);
        }
      } catch (err) {
        console.error('Profile fetch failed:', err);
      }
    }
    fetchProfile();
  }, []);

  const tools = [
    { id: 'niche', name: 'Niche Discovery', icon: <Brain size={20}/>, desc: 'Find your unique voice.' },
    { id: 'ideas', name: 'Idea Engine', icon: <Target size={20}/>, desc: '7 viral angles for your niche.' },
    { id: 'script', name: 'Script Generator', icon: <MessageSquare size={20}/>, desc: 'Full high-retention script.' },
    { id: 'carousel', name: 'Carousel Designer', icon: <Zap size={20}/>, desc: '5-slide value builder.' }
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeTool, userData: formData })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Identity processing failed');
      setResult(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // UI feedback logic could be added here
  };

  return (
    <main className="min-h-screen bg-background text-warm-white pt-32 pb-20 px-6 selection:bg-crimson/30 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header Section */}
        <div className="space-y-6">
          <label className="mono text-crimson text-xs uppercase tracking-[0.5em] font-bold">004 — SCRIPT LAB</label>
          <h1 className="text-5xl md:text-8xl font-display font-medium tracking-tighter leading-[0.8]">
             The Content <br />
             <span className="text-muted italic">Neural Engine.</span>
          </h1>
          <p className="mono text-muted text-sm tracking-tight leading-relaxed max-w-sm pt-4 italic">
            // Engineering viral narratives with data-driven precision.
          </p>
        </div>

        {/* Tool Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {tools.map((tool) => (
                <button 
                    key={tool.id}
                    onClick={() => { setActiveTool(tool.id as ToolType); setResult(null); setError(null); }}
                    className={`p-6 border text-left transition-all relative ${activeTool === tool.id ? 'bg-crimson border-crimson shadow-2xl shadow-crimson/20' : 'bg-transparent border-warm-white/5 hover:border-crimson/30'}`}
                >
                    <div className={activeTool === tool.id ? 'text-white' : 'text-muted'}>{tool.icon}</div>
                    <h3 className="font-display text-xl pt-4 font-bold tracking-tight">{tool.name}</h3>
                    <p className={`mono text-[9px] uppercase tracking-widest pt-2 ${activeTool === tool.id ? 'text-white/60' : 'text-muted/50'}`}>
                        {tool.desc}
                    </p>
                    {activeTool === tool.id && <div className="absolute top-4 right-4 h-2 w-2 bg-white rounded-full animate-pulse" />}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 pt-8 md:pt-12 border-t border-warm-white/5">
            {/* Results Side - High Priority on Mobile */}
            <section className="space-y-10 lg:space-y-12 order-1 lg:order-2">
                <div className="space-y-2">
                    <h2 className="text-xl md:text-2xl font-display font-bold italic tracking-tight">Engine Result.</h2>
                    <p className="mono text-[8px] md:text-[10px] text-muted uppercase tracking-widest leading-relaxed">// Analyzed, synthesized, and ready for impact.</p>
                </div>

                <div className="editorial-card min-h-[400px] md:min-h-[500px] p-6 md:p-10 flex flex-col justify-center items-center relative overflow-hidden bg-white/2 group transition-all">
                    <div className="absolute inset-0 bg-gradient-to-tr from-crimson/2 to-transparent pointer-events-none" />
                    
                    {!result && !isLoading && !error && (
                        <div className="text-center space-y-6 opacity-20 transform scale-75 md:scale-100">
                            <Sparkles size={64} className="mx-auto" />
                            <p className="mono text-[10px] uppercase tracking-widest">Awaiting Neural Input...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-center space-y-6 animate-in fade-in duration-500">
                             {error.includes('Zero credits') ? (
                                <div className="space-y-6">
                                    <div className="w-16 h-16 border border-crimson/50 rounded-full flex items-center justify-center mx-auto animate-pulse">
                                        <Zap size={32} className="text-crimson" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-display font-bold italic text-crimson uppercase tracking-widest leading-tight">// Neural Flow Exhausted</h3>
                                        <p className="mono text-[10px] text-muted max-w-[200px] md:max-w-[250px] mx-auto leading-relaxed">System limit reached for this cycle. Wait for reset or authorize more power.</p>
                                    </div>
                                    <button className="px-6 py-3 border border-crimson text-crimson mono text-[10px] uppercase font-bold tracking-widest hover:bg-crimson hover:text-white transition-all">
                                        Unlock Access [ ⚡ ]
                                    </button>
                                </div>
                             ) : error.includes('Cooling Down') ? (
                                <div className="space-y-4 text-center">
                                     <div className="text-crimson flex justify-center"><Loader2 className="animate-spin" size={32} /></div>
                                     <div className="space-y-1">
                                        <h3 className="text-lg font-display font-bold italic text-warm-white uppercase tracking-widest">Cooling Down</h3>
                                        <p className="mono text-[9px] md:text-[10px] text-muted">{error}</p>
                                     </div>
                                </div>
                             ) : (
                                <p className="mono text-[10px] md:text-xs text-crimson leading-relaxed italic text-center px-4">// SYSTEM_ERROR: {error}</p>
                             )}
                        </div>
                    )}

                    {result && (
                        <div className="w-full space-y-8 md:space-y-12 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                             {/* niche output */}
                            {activeTool === 'niche' && (
                                <div className="space-y-8">
                                    <div className="space-y-2 border-l-2 border-crimson pl-4 md:pl-6">
                                        <label className="mono text-[8px] md:text-[10px] text-muted uppercase tracking-widest">Identified Niche</label>
                                        <p className="text-xl md:text-2xl font-display font-bold text-warm-white italic">{result.niche}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="mono text-[8px] md:text-[10px] text-muted uppercase tracking-widest">Sub-Niches to Own</label>
                                        <div className="flex flex-wrap gap-2 md:gap-4">
                                            {result.sub_niches.map((s: string) => (
                                                <span key={s} className="px-4 py-2 bg-warm-white/5 border border-warm-white/5 mono text-[8px] md:text-[10px] uppercase tracking-widest">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="mono text-[10px] text-muted leading-relaxed italic opacity-70">// {result.why}</p>
                                </div>
                            )}

                            {/* ideas output */}
                            {activeTool === 'ideas' && (
                                <div className="space-y-8 md:space-y-10 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                                    {result.ideas.map((idea: any, i: number) => (
                                        <div key={i} className="space-y-3 group/idea">
                                            <label className="mono text-[8px] text-muted uppercase tracking-widest flex items-center gap-2">
                                                <span className="w-3 md:w-4 h-[1px] bg-crimson" /> Angle / 0{i + 1}
                                            </label>
                                            <h4 className="font-display text-lg md:text-xl underline decoration-crimson/20 group-hover/idea:decoration-crimson transition-all leading-tight italic">{idea.title}</h4>
                                            <p className="mono text-[9px] md:text-[10px] text-muted lowercase pt-1 leading-relaxed tracking-tight">// {idea.angle}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                             {/* script output */}
                             {activeTool === 'script' && (
                                <div className="space-y-10">
                                    <div className="flex justify-between items-center bg-warm-white/5 p-4 rounded-sm">
                                        <label className="mono text-[8px] md:text-[10px] text-muted uppercase tracking-widest px-1">Formula: {result.formula_used}</label>
                                        <button onClick={() => copyToClipboard(result.script.hook + "\n" + result.script.body.join("\n") + "\n" + result.script.cta)} className="text-muted hover:text-white transition-all"><Copy size={16}/></button>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="p-4 md:p-6 border-l-2 border-crimson bg-crimson/5">
                                            <label className="mono text-[8px] text-crimson uppercase tracking-widest font-bold">HOOK / OPENER</label>
                                            <p className="font-display text-lg md:text-2xl text-warm-white pt-2 italic leading-tight">{result.script.hook}</p>
                                        </div>
                                        <div className="space-y-4">
                                            {result.script.body.map((b: string, i: number) => (
                                                <p key={i} className="mono text-[10px] md:text-[11px] text-muted leading-relaxed tracking-tight lowercase">// {b}</p>
                                            ))}
                                        </div>
                                        <div className="p-4 md:p-6 border border-warm-white/10 uppercase mono text-[9px] md:text-[10px] bg-white/2 tracking-widest text-center text-warm-white/80 rounded-sm italic">
                                            {result.script.cta}
                                        </div>
                                    </div>
                                    <p className="text-center mono text-[8px] text-muted uppercase tracking-[0.3em] opacity-40">// Est Duration: {result.estimated_duration}</p>
                                </div>
                             )}

                             {/* carousel output */}
                             {activeTool === 'carousel' && (
                                <div className="space-y-12">
                                    <div className="space-y-6 md:space-y-8 h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                                        {result.slides.map((s: any) => (
                                            <div key={s.slide_number} className="editorial-card p-4 md:p-6 border-l-4 border-crimson space-y-4">
                                                <div className="flex justify-between items-center text-[8px] md:text-[10px] mono text-muted uppercase tracking-widest">
                                                    <span>Slide 0{s.slide_number}</span>
                                                    <CheckCircle2 size={12}/>
                                                </div>
                                                <h4 className="font-display text-xl md:text-2xl tracking-tighter italic leading-snug">{s.heading}</h4>
                                                <p className="mono font-bold text-[9px] md:text-[10px] text-muted uppercase tracking-widest pt-2 leading-relaxed italic">{s.body}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-4 border-t border-warm-white/5 pt-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <label className="mono text-[8px] md:text-[10px] text-muted uppercase tracking-widest">Caption & Archive</label>
                                            <div className="flex gap-4">
                                                <button onClick={() => copyToClipboard(result.caption + "\n\n" + result.hashtags.join(" "))} className="p-3 border border-warm-white/10 text-muted hover:text-white transition-all"><Copy size={16}/></button>
                                                <button 
                                                    onClick={downloadAllSlides} 
                                                    disabled={isExporting}
                                                    className="flex-1 px-6 py-4 bg-crimson text-white mono text-[10px] uppercase tracking-widest font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-4 shadow-xl shadow-crimson/10"
                                                >
                                                    {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                                                    [ DOWNLOAD ARCHIVE ]
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                             )}
                        </div>
                    )}
                </div>
            </section>

            {/* Input Side */}
            <section className="space-y-10 lg:space-y-12 order-2 lg:order-1">
                <div className="space-y-2">
                    <h2 className="text-xl md:text-2xl font-display font-bold italic tracking-tight">System Input.</h2>
                    <p className="mono text-[8px] md:text-[10px] text-muted uppercase tracking-widest leading-relaxed">// Engineering viral context through logic.</p>
                </div>

                <form onSubmit={handleGenerate} className="space-y-8 md:space-y-10">
                    <AnimatePresence mode="wait">
                        {activeTool === 'niche' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                <div className="space-y-4">
                                    <label className="mono text-[10px] text-muted uppercase tracking-widest">Q1: Topic friends talk about?</label>
                                    <input type="text" value={formData.q1} onChange={(e) => setFormData({...formData, q1: e.target.value})} className="w-full bg-background border border-warm-white/5 p-5 mono text-xs focus:border-crimson outline-none transition-all" required/>
                                </div>
                                <div className="space-y-4">
                                    <label className="mono text-[10px] text-muted uppercase tracking-widest">Q2: What advice do people ask you?</label>
                                    <input type="text" value={formData.q2} onChange={(e) => setFormData({...formData, q2: e.target.value})} className="w-full bg-background border border-warm-white/5 p-5 mono text-xs focus:border-crimson outline-none transition-all" required/>
                                </div>
                                <div className="space-y-4">
                                    <label className="mono text-[10px] text-muted uppercase tracking-widest">Q3: What would you post for 0 views?</label>
                                    <input type="text" value={formData.q3} onChange={(e) => setFormData({...formData, q3: e.target.value})} className="w-full bg-background border border-warm-white/5 p-5 mono text-xs focus:border-crimson outline-none transition-all" required/>
                                </div>
                            </motion.div>
                        )}

                        {activeTool === 'ideas' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                <label className="mono text-[10px] text-muted uppercase tracking-widest">My Content Niche:</label>
                                <input type="text" value={formData.niche} onChange={(e) => setFormData({...formData, niche: e.target.value})} placeholder="e.g., MERN Development with Cinematics" className="w-full bg-background border border-warm-white/5 p-5 mono text-xs focus:border-crimson outline-none transition-all" required/>
                            </motion.div>
                        )}

                        {activeTool === 'script' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                <label className="mono text-[10px] text-muted uppercase tracking-widest">Input Content Idea:</label>
                                <textarea rows={4} value={formData.idea} onChange={(e) => setFormData({...formData, idea: e.target.value})} placeholder="e.g., Why standard Linktree is killing your agency conversions." className="w-full bg-background border border-warm-white/5 p-5 mono text-xs focus:border-crimson outline-none transition-all" required/>
                            </motion.div>
                        )}

                        {activeTool === 'carousel' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                <label className="mono text-[10px] text-muted uppercase tracking-widest">Carousel Topic:</label>
                                <input type="text" value={formData.topic} onChange={(e) => setFormData({...formData, topic: e.target.value})} placeholder="e.g., 5 Rules for Cinematic Storytelling" className="w-full bg-background border border-warm-white/5 p-5 mono text-xs focus:border-crimson outline-none transition-all" required/>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button disabled={isLoading} type="submit" className="w-full py-6 bg-crimson hover:bg-red-700 transition-all font-mono text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-crimson/10 disabled:opacity-50">
                        {isLoading ? <Loader2 className="animate-spin" size={18}/> : <>[ EXECUTE AI ENGINE ] <ArrowRight size={18}/></>}
                    </button>
                </form>
            </section>

            {/* Output Side */}
            <section className="space-y-12">
                <div className="space-y-2">
                    <h2 className="text-2xl font-display font-bold italic tracking-tight">Engine Result.</h2>
                    <p className="mono text-[10px] text-muted uppercase tracking-widest leading-relaxed">// Analyzed, synthesized, and ready for impact.</p>
                </div>

                <div className="editorial-card min-h-[500px] p-10 flex flex-col justify-center items-center relative overflow-hidden bg-white/2 group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-crimson/2 to-transparent pointer-events-none" />
                    
                    {!result && !isLoading && !error && (
                        <div className="text-center space-y-6 opacity-20">
                            <Sparkles size={64} className="mx-auto" />
                            <p className="mono text-[10px] uppercase tracking-widest">Awaiting Identity Input...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-center space-y-6 animate-in fade-in duration-500">
                             {error.includes('Zero credits') ? (
                                <div className="space-y-6">
                                    <div className="w-16 h-16 border border-crimson/50 rounded-full flex items-center justify-center mx-auto animate-pulse">
                                        <Zap size={32} className="text-crimson" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-display font-bold italic text-crimson uppercase tracking-widest">// Neural Flow Exhausted</h3>
                                        <p className="mono text-[10px] text-muted max-w-[250px] mx-auto leading-relaxed">System limit reached for this cycle. Wait for reset or authorize more power.</p>
                                    </div>
                                    <button className="px-6 py-3 border border-crimson text-crimson mono text-[10px] uppercase font-bold tracking-widest hover:bg-crimson hover:text-white transition-all">
                                        Unlock Access [ ⚡ ]
                                    </button>
                                </div>
                             ) : error.includes('Cooling Down') ? (
                                <div className="space-y-4">
                                     <div className="text-crimson flex justify-center"><Loader2 className="animate-spin" size={32} /></div>
                                     <div className="space-y-1">
                                        <h3 className="text-lg font-display font-bold italic text-warm-white uppercase tracking-widest">System Cooling Down</h3>
                                        <p className="mono text-[10px] text-muted">{error}</p>
                                     </div>
                                </div>
                             ) : (
                                <p className="mono text-xs text-crimson leading-relaxed italic">// SYSTEM_ERROR: {error}</p>
                             )}
                        </div>
                    )}

                    {result && (
                        <div className="w-full space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                             {/* niche output */}
                            {activeTool === 'niche' && (
                                <div className="space-y-8">
                                    <div className="space-y-2 border-l border-crimson pl-6">
                                        <label className="mono text-[10px] text-muted uppercase tracking-widest">Identified Niche</label>
                                        <p className="text-2xl font-display font-bold text-warm-white italic">{result.niche}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="mono text-[10px] text-muted uppercase tracking-widest">Sub-Niches to Own</label>
                                        <div className="flex flex-wrap gap-4">
                                            {result.sub_niches.map((s: string) => (
                                                <span key={s} className="px-5 py-2 bg-warm-white/5 border border-warm-white/5 mono text-[10px] uppercase tracking-widest">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="mono text-xs text-muted leading-relaxed italic">// {result.why}</p>
                                </div>
                            )}

                            {/* ideas output */}
                            {activeTool === 'ideas' && (
                                <div className="space-y-8">
                                    {result.ideas.map((idea: any, i: number) => (
                                        <div key={i} className="space-y-2 group/idea">
                                            <label className="mono text-[9px] text-muted uppercase tracking-widest flex items-center gap-2">
                                                <span className="w-4 h-[1px] bg-crimson" /> Angle / 0{i + 1}
                                            </label>
                                            <h4 className="font-display text-xl underline decoration-crimson/20 group-hover/idea:decoration-crimson transition-all">{idea.title}</h4>
                                            <p className="mono text-[10px] text-muted lowercase pt-2 leading-relaxed tracking-tight">// {idea.angle}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                             {/* script output */}
                             {activeTool === 'script' && (
                                <div className="space-y-10">
                                    <div className="flex justify-between items-center bg-warm-white/5 p-4">
                                        <label className="mono text-[10px] text-muted uppercase tracking-widest px-1">Formula: {result.formula_used}</label>
                                        <button onClick={() => copyToClipboard(result.script.hook + "\n" + result.script.body.join("\n") + "\n" + result.script.cta)} className="text-muted hover:text-white transition-all"><Copy size={16}/></button>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="p-4 border-l-2 border-crimson bg-crimson/5">
                                            <label className="mono text-[8px] text-crimson uppercase tracking-widest font-bold">HOOK / OPENER</label>
                                            <p className="font-display text-xl text-warm-white pt-2 italic leading-tight">{result.script.hook}</p>
                                        </div>
                                        <div className="space-y-4">
                                            {result.script.body.map((b: string, i: number) => (
                                                <p key={i} className="mono text-[11px] text-muted leading-relaxed tracking-tight">// {b}</p>
                                            ))}
                                        </div>
                                        <div className="p-4 border border-warm-white/10 uppercase mono text-[10px] bg-white/2 tracking-widest text-center text-warm-white/80">
                                            {result.script.cta}
                                        </div>
                                    </div>
                                    <p className="text-center mono text-[9px] text-muted uppercase tracking-[0.3em]">// Est Duration: {result.estimated_duration}</p>
                                </div>
                             )}

                             {/* carousel output */}
                             {activeTool === 'carousel' && (
                                <div className="space-y-12">
                                    <div className="space-y-8 h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                                        {result.slides.map((s: any) => (
                                            <div key={s.slide_number} className="editorial-card p-6 border-l-4 border-crimson space-y-4">
                                                <div className="flex justify-between items-center text-[10px] mono text-muted uppercase tracking-widest">
                                                    <span>Slide 0{s.slide_number}</span>
                                                    <CheckCircle2 size={12}/>
                                                </div>
                                                <h4 className="font-display text-2xl tracking-tighter italic">{s.heading}</h4>
                                                <p className="mono font-bold text-[10px] text-muted uppercase tracking-widest pt-2 leading-relaxed">{s.body}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="mono text-[10px] text-muted uppercase tracking-widest">Caption & Tags</label>
                                            <div className="flex gap-4">
                                                <button onClick={() => copyToClipboard(result.caption + "\n\n" + result.hashtags.join(" "))} className="text-muted hover:text-white transition-all"><Copy size={16}/></button>
                                                <button 
                                                    onClick={downloadAllSlides} 
                                                    disabled={isExporting}
                                                    className="px-4 py-2 bg-crimson text-white mono text-[8px] uppercase tracking-widest font-bold hover:bg-red-700 transition-all flex items-center gap-2"
                                                >
                                                    {isExporting ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                                                    [ DOWNLOAD PNG ]
                                                </button>
                                            </div>
                                        </div>
                                        <p className="mono text-[10px] text-muted/60 leading-relaxed max-h-[100px] overflow-y-auto pr-2 custom-scrollbar bg-white/2 p-4 italic tracking-tight lowercase">
                                            {result.caption}
                                            <br /><br />
                                            {result.hashtags.join(" ")}
                                        </p>
                                    </div>
                                </div>
                             )}
                        </div>
                    )}
                </div>

                {/* Hidden Exportable Elements */}
                {result?.slides && (
                    <div className="fixed -left-[2000px] top-0 pointer-events-none">
                        {result.slides.map((s: any) => (
                            <div 
                                key={s.slide_number} 
                                id={`export-slide-${s.slide_number}`}
                                style={{ width: '1080px', height: '1350px' }}
                                className="bg-background flex flex-col p-24 items-center justify-between text-center relative overflow-hidden"
                            >
                                {/* Branded Rules */}
                                <div className="absolute top-10 left-10 text-crimson mono text-xl uppercase tracking-widest font-bold">/ 0{s.slide_number}</div>
                                <div className="absolute top-10 right-10 text-muted/30 mono text-xl uppercase tracking-widest font-bold italic">thedipverse.ARCHIVE</div>
                                <div className="absolute bottom-10 left-0 right-0 text-muted/20 mono text-sm uppercase tracking-[1em] font-bold">ENGINEERED CONTEXT</div>

                                <div className="flex-1 flex flex-col justify-center gap-12 w-full max-w-4xl pt-20">
                                    <h2 className="text-9xl font-display font-medium text-warm-white italic tracking-tighter leading-[0.8]">{s.heading}</h2>
                                    <div className="h-[2px] w-48 bg-crimson mx-auto" />
                                    <p className="mono text-2xl text-muted leading-relaxed uppercase tracking-widest pt-4">{s.body}</p>
                                </div>

                                <div className="pb-10 space-y-4">
                                     <p className="mono text-xl text-crimson uppercase tracking-[0.4em] font-bold">@{profile.username || 'thedipverse'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>

      </div>
    </main>
  );
}
