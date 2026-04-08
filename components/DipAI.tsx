'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, X, Send, Phone, Volume2, VolumeX, Sparkles, ChevronDown } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const QUICK_PROMPTS = [
    "What can Dipesh do for me?",
    "How much does a reel edit cost?",
    "Can you automate my store?",
    "Tell me about thedipverse",
];

export default function DipAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [listening, setListening] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // focus input when open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Global Wake Word Listener ("Hey Jarvis")
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognizer = new SpeechRecognition();
        recognizer.continuous = true;
        recognizer.interimResults = true;
        recognizer.lang = 'en-US';

        recognizer.onresult = (e: any) => {
            const current = e.resultIndex;
            const transcript = e.results[current][0].transcript.toLowerCase();
            if (transcript.includes('hey jarvis') || transcript.includes('jarvis') || transcript.includes('jarvish')) {
                setIsOpen(true);
            }
        };

        // Start listening after first user interaction to bypass browser restrictions
        const startListening = () => {
             try { recognizer.start(); } catch(err) {} 
             window.removeEventListener('click', startListening);
             window.removeEventListener('keydown', startListening);
        };
        window.addEventListener('click', startListening);
        window.addEventListener('keydown', startListening);

        return () => {
            window.removeEventListener('click', startListening);
            window.removeEventListener('keydown', startListening);
            try { recognizer.stop(); } catch(err) {}
        };
    }, []);

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;
        const userMsg: Message = { role: 'user', content: text };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setLoading(true);
        setIsTyping(true);

        try {
            const res = await fetch('/api/dipai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages }),
            });
            const data = await res.json();
            const reply = data.reply || 'System error. Try again.';
            setIsTyping(false);
            const aiMsg: Message = { role: 'assistant', content: reply };
            setMessages(prev => [...prev, aiMsg]);

            // speak response if voice enabled
            if (voiceEnabled && typeof window !== 'undefined') {
                const utterance = new SpeechSynthesisUtterance(reply);
                utterance.rate = 0.95;
                utterance.pitch = 0.85;
                utterance.volume = 1;
                window.speechSynthesis.speak(utterance);
            }
        } catch {
            setIsTyping(false);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Connection lost. Retry.' }]);
        } finally {
            setLoading(false);
        }
    };

    const toggleVoiceInput = () => {
        if (typeof window === 'undefined') return;
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Voice input not supported in this browser.');
            return;
        }

        if (listening) {
            recognitionRef.current?.stop();
            setListening(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.onresult = (e: any) => {
            const transcript = e.results[0][0].transcript;
            sendMessage(transcript);
        };
        recognition.onend = () => setListening(false);
        recognitionRef.current = recognition;
        recognition.start();
        setListening(true);
    };

    return (
        <>
            {/* Floating Orb */}
            <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100]">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            onClick={() => setIsOpen(true)}
                            className="relative group"
                            aria-label="Open DIP-AI"
                            id="dipai-orb-btn"
                        >
                            {/* Pulse rings */}
                            <span className="absolute inset-0 rounded-full bg-crimson opacity-20 animate-ping" />
                            <span className="absolute inset-[-6px] rounded-full bg-crimson/10 animate-pulse" />
                            <div className="relative w-14 h-14 rounded-full bg-[#0a0a0a] border border-crimson/60 flex items-center justify-center shadow-2xl shadow-crimson/30 hover:shadow-crimson/50 transition-all hover:border-crimson group-hover:scale-110 duration-300">
                                <Sparkles size={22} className="text-crimson" />
                            </div>
                            <div className="absolute -top-10 right-0 bg-[#111] border border-warm-white/10 text-warm-white text-[10px] mono px-3 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all">
                                DIP-AI — Ask anything
                            </div>
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Chat Panel */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.95 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="w-[calc(100vw-32px)] sm:w-[360px] max-h-[80vh] sm:max-h-[600px] flex flex-col bg-[#050505] border border-warm-white/10 rounded-xl shadow-2xl shadow-black/60 overflow-hidden origin-bottom-right"
                        >
                            {/* Header */}
                            <div className="bg-[#0d0d0d] border-b border-warm-white/10 px-4 py-3 flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="flex-1 text-center">
                                    <span className="mono text-[10px] text-warm-white/50 uppercase tracking-widest">DIP-AI // THEDIPVERSE</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setVoiceEnabled(v => !v)}
                                        className={`p-1.5 rounded transition-all ${voiceEnabled ? 'text-crimson' : 'text-warm-white/30 hover:text-warm-white/60'}`}
                                        title={voiceEnabled ? 'Voice output on' : 'Voice output off'}
                                        id="dipai-voice-toggle"
                                    >
                                        {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="p-1.5 text-warm-white/30 hover:text-warm-white/60 transition-all"
                                        id="dipai-close-btn"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-[200px] max-h-[380px]">
                                {messages.length === 0 && (
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-crimson/20 border border-crimson/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Sparkles size={10} className="text-crimson" />
                                            </div>
                                            <div className="bg-[#111] border border-warm-white/5 rounded-lg px-3 py-2.5 text-xs text-warm-white/80 mono leading-relaxed">
                                                DIP-AI online. Ask me anything about Dipesh's work — video editing, automation, web dev, or the story behind thedipverse.
                                            </div>
                                        </div>
                                        {/* Quick prompts */}
                                        <div className="space-y-2 pl-9">
                                            {QUICK_PROMPTS.map(p => (
                                                <button
                                                    key={p}
                                                    onClick={() => sendMessage(p)}
                                                    className="block w-full text-left text-[10px] mono text-warm-white/40 hover:text-crimson border border-warm-white/5 hover:border-crimson/30 px-3 py-2 rounded transition-all"
                                                >
                                                    → {p}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[8px] mono font-bold border ${msg.role === 'user' ? 'bg-crimson/20 border-crimson/40 text-crimson' : 'bg-warm-white/5 border-warm-white/10 text-warm-white/40'}`}>
                                            {msg.role === 'user' ? 'U' : 'AI'}
                                        </div>
                                        <div className={`max-w-[75%] rounded-lg px-3 py-2.5 text-xs mono leading-relaxed border ${msg.role === 'user' ? 'bg-crimson/10 border-crimson/20 text-warm-white/90 text-right' : 'bg-[#111] border-warm-white/5 text-warm-white/80'}`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-warm-white/5 border border-warm-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 text-[8px] mono text-warm-white/40">AI</div>
                                        <div className="bg-[#111] border border-warm-white/5 rounded-lg px-4 py-3 flex gap-1.5 items-center">
                                            <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                )}
                                <div ref={bottomRef} />
                            </div>

                            {/* Input Bar */}
                            <div className="border-t border-warm-white/10 bg-[#0a0a0a] px-3 py-3">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={toggleVoiceInput}
                                        className={`p-2.5 rounded-lg border transition-all flex-shrink-0 ${listening ? 'bg-crimson border-crimson text-white animate-pulse' : 'border-warm-white/10 text-warm-white/40 hover:text-crimson hover:border-crimson/30'}`}
                                        title={listening ? 'Stop listening' : 'Speak to DIP-AI'}
                                        id="dipai-mic-btn"
                                    >
                                        {listening ? <MicOff size={14} /> : <Mic size={14} />}
                                    </button>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && !loading && sendMessage(input)}
                                        placeholder={listening ? 'Listening...' : 'Ask DIP-AI...'}
                                        disabled={loading || listening}
                                        className="flex-1 bg-transparent text-warm-white/80 text-xs mono placeholder:text-warm-white/20 focus:outline-none"
                                        id="dipai-text-input"
                                    />
                                    <button
                                        onClick={() => sendMessage(input)}
                                        disabled={loading || !input.trim()}
                                        className="p-2.5 rounded-lg bg-crimson/10 border border-crimson/30 text-crimson hover:bg-crimson hover:text-white transition-all disabled:opacity-30 flex-shrink-0"
                                        id="dipai-send-btn"
                                    >
                                        <Send size={14} />
                                    </button>
                                </div>
                                <p className="mono text-[9px] text-warm-white/15 text-center mt-2">
                                    {listening ? '● REC — speak now' : 'Type · Press Enter · Or speak 🎙'}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
