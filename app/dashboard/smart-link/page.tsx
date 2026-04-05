'use client';

import { useState, useEffect } from 'react';
import { Link as LinkIcon, Copy, Check, Zap, ExternalLink, ArrowRight, Lock, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const FREE_LIMIT = 5;

export default function SmartLinkPage() {
    const { data: session, status } = useSession();
    const isSignedIn = !!session;
    const isLoading = status === 'loading';

    const [inputUrl, setInputUrl] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [freeUsesLeft, setFreeUsesLeft] = useState<number | null>(null); // null = loading
    const [showUpgradeWall, setShowUpgradeWall] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    // On mount: check IP-based usage from server
    useEffect(() => {
        if (isLoading) return;
        if (isSignedIn) {
            setFreeUsesLeft(Infinity as any); // logged in = unlimited
            return;
        }

        async function checkUsage() {
            try {
                const res = await fetch('/api/free-usage?tool=smart-link');
                const data = await res.json();
                setFreeUsesLeft(data.remaining ?? 0);
                if (data.exceeded) setShowUpgradeWall(true);
            } catch {
                setFreeUsesLeft(FREE_LIMIT); // fallback: allow usage
            }
        }
        checkUsage();
    }, [isSignedIn, isLoading]);

    const handleGenerate = async () => {
        if (!inputUrl) return;

        // Logged-in users: no limit check
        if (!isSignedIn) {
            setIsChecking(true);
            try {
                const res = await fetch('/api/free-usage', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tool: 'smart-link' }),
                });
                const data = await res.json();
                setFreeUsesLeft(data.remaining ?? 0);

                if (data.exceeded && data.count > FREE_LIMIT) {
                    // Was already exceeded before this call
                    setShowUpgradeWall(true);
                    setIsChecking(false);
                    return;
                }

                if (data.exceeded) {
                    // Just hit the limit on this use — allow this generation, then show wall
                    setShowUpgradeWall(true);
                }
            } catch {
                // API failed — allow usage (don't punish user for server error)
            } finally {
                setIsChecking(false);
            }
        }

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

    const freeUsesDisplay = typeof freeUsesLeft === 'number' && isFinite(freeUsesLeft as number)
        ? freeUsesLeft
        : null;

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

                    {/* Status badge */}
                    {!isSignedIn && freeUsesDisplay !== null && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-xs font-bold tracking-widest uppercase rounded-full text-white/40">
                            <Zap size={12} className={freeUsesDisplay > 0 ? 'text-amber-400' : 'text-red-400'} />
                            {freeUsesDisplay > 0
                                ? `${freeUsesDisplay} free ${freeUsesDisplay === 1 ? 'use' : 'uses'} remaining`
                                : 'Free limit reached — log in for unlimited'}
                        </div>
                    )}
                    {isSignedIn && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-500/20 text-xs font-bold tracking-widest uppercase rounded-full text-emerald-400">
                            <Zap size={12} />
                            Unlimited — logged in
                        </div>
                    )}
                </div>

                {/* Upgrade Wall — shown when IP-tracked limit exceeded */}
                <AnimatePresence>
                    {showUpgradeWall && !isSignedIn && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass p-12 rounded-[40px] border border-amber-500/20 flex flex-col items-center text-center space-y-6"
                        >
                            <div className="p-6 rounded-full bg-amber-500/10 text-amber-400">
                                <Zap size={48} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-display font-bold text-white tracking-tighter">
                                    You&apos;ve used all 5 free links.
                                </h3>
                                <p className="text-zinc-400 max-w-sm mx-auto font-medium">
                                    Log in to get unlimited Smart Links — it&apos;s free. No card required. Your usage is tracked to your IP so clearing cache won&apos;t reset this.
                                </p>
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
                </AnimatePresence>

                {/* Generator — hidden only if wall shown AND not signed in */}
                {(!showUpgradeWall || isSignedIn) && (
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
                                            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            className="bg-transparent border-none outline-none text-white font-bold w-full placeholder:text-white/10"
                                        />
                                    </div>
                                    <button
                                        onClick={handleGenerate}
                                        disabled={!inputUrl || isChecking}
                                        className="px-8 py-5 bg-white text-black font-bold rounded-3xl hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                                    >
                                        {isChecking
                                            ? <><Loader2 size={18} className="animate-spin" /> Checking...</>
                                            : <>Generate Smart Link <ArrowRight size={18} /></>
                                        }
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
                                        <div className="flex items-center justify-between p-6 bg-white/5 rounded-[30px] border border-white/10">
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

                        {/* Footer */}
                        {!isSignedIn && freeUsesDisplay !== null && (
                            <p className="text-center text-[10px] uppercase tracking-widest font-bold text-white/20 relative z-10">
                                {freeUsesDisplay > 0
                                    ? `${freeUsesDisplay} free ${freeUsesDisplay === 1 ? 'use' : 'uses'} left · Login for unlimited`
                                    : 'Free limit reached · Create account to continue'}
                            </p>
                        )}
                    </div>
                )}

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40">
                    <div className="p-6 border border-white/5 rounded-3xl space-y-3">
                        <div className="p-3 bg-white/5 rounded-xl w-fit"><Zap size={20} /></div>
                        <h4 className="text-sm font-bold uppercase tracking-widest">Zero Latency</h4>
                        <p className="text-xs font-medium leading-relaxed">Instantly triggers the app intent without third-party middleware.</p>
                    </div>
                    <div className="p-6 border border-white/5 rounded-3xl space-y-3">
                        <div className="p-3 bg-white/5 rounded-xl w-fit"><ExternalLink size={20} /></div>
                        <h4 className="text-sm font-bold uppercase tracking-widest">Broad Support</h4>
                        <p className="text-xs font-medium leading-relaxed">Works for YouTube, Spotify, and more to ensure app delivery.</p>
                    </div>
                    <div className="p-6 border border-white/5 rounded-3xl space-y-3">
                        <div className="p-3 bg-white/5 rounded-xl w-fit"><Lock size={20} /></div>
                        <h4 className="text-sm font-bold uppercase tracking-widest">IP-Tracked Limit</h4>
                        <p className="text-xs font-medium leading-relaxed">5 free uses per device. Tracked server-side — clearing cache won&apos;t reset it.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
