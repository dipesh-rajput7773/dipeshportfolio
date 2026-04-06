'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Something went wrong');
            setSent(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main
            style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
            className="min-h-screen bg-[#f8f7ff] flex items-center justify-center px-4 pt-20"
        >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Sans:wght@400;600;700;800&display=swap');`}</style>

            <div style={{ width: '100%', maxWidth: '420px' }}>
                {/* Back link */}
                <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6b7280', textDecoration: 'none', marginBottom: '28px' }}
                    className="hover:text-purple-600 transition-colors"
                >
                    <ArrowLeft size={14} /> Back to login
                </Link>

                <div style={{
                    background: '#fff', borderRadius: '24px', padding: '36px',
                    boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
                    border: '1.5px solid #e5e7eb',
                }}>
                    <AnimatePresence mode="wait">
                        {!sent ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                            >
                                {/* Header */}
                                <div style={{ marginBottom: '28px' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                        <Mail size={20} color="#7c3aed" />
                                    </div>
                                    <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 6px', fontFamily: "'DM Sans', sans-serif" }}>
                                        Forgot your password?
                                    </h1>
                                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                                        Enter your email and we'll send you a reset link.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                                            Email address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            style={{
                                                width: '100%', padding: '12px 14px', borderRadius: '10px',
                                                border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none',
                                                fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 0.2s',
                                            }}
                                            onFocus={e => (e.target.style.borderColor = '#8b5cf6')}
                                            onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                                        />
                                    </div>

                                    {error && (
                                        <div style={{ fontSize: '13px', color: '#ef4444', background: '#fef2f2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #fecaca' }}>
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoading || !email}
                                        style={{
                                            padding: '13px', borderRadius: '12px', border: 'none',
                                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                            color: '#fff', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                            opacity: isLoading || !email ? 0.6 : 1, transition: 'opacity 0.2s',
                                            boxShadow: '0 4px 14px rgba(124,58,237,0.3)',
                                        }}
                                    >
                                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <><Mail size={15} /> Send Reset Link</>}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ textAlign: 'center', padding: '16px 0' }}
                            >
                                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                    <CheckCircle2 size={28} color="#16a34a" />
                                </div>
                                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 10px', fontFamily: "'DM Sans', sans-serif" }}>
                                    Check your inbox!
                                </h2>
                                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 24px', lineHeight: 1.6 }}>
                                    We sent a password reset link to <strong style={{ color: '#1a1a2e' }}>{email}</strong>. The link expires in 1 hour.
                                </p>
                                <Link
                                    href="/login"
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                        padding: '11px 22px', borderRadius: '10px',
                                        background: '#f5f3ff', color: '#7c3aed',
                                        fontWeight: 700, fontSize: '14px', textDecoration: 'none',
                                    }}
                                >
                                    Back to login <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
