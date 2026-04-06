'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Eye, EyeOff, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ResetPasswordPage() {
    const { token } = useParams<{ token: string }>();
    const router = useRouter();

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [done, setDone] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) { setError('Passwords do not match'); return; }
        if (password.length < 8) { setError('Password must be at least 8 characters'); return; }

        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Something went wrong');
            setDone(true);
            setTimeout(() => router.push('/login'), 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const strength = password.length === 0 ? 0 : password.length < 8 ? 1 : password.length < 12 ? 2 : 3;
    const strengthColors = ['#e5e7eb', '#ef4444', '#f59e0b', '#10b981'];
    const strengthLabels = ['', 'Too short', 'Good', 'Strong'];

    return (
        <main
            style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
            className="min-h-screen bg-[#f8f7ff] flex items-center justify-center px-4 pt-20"
        >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Sans:wght@400;600;700;800&display=swap');`}</style>

            <div style={{ width: '100%', maxWidth: '420px' }}>
                <div style={{
                    background: '#fff', borderRadius: '24px', padding: '36px',
                    boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
                    border: '1.5px solid #e5e7eb',
                }}>
                    <AnimatePresence mode="wait">
                        {!done ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                            >
                                {/* Header */}
                                <div style={{ marginBottom: '28px' }}>
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                        <Lock size={20} color="#7c3aed" />
                                    </div>
                                    <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 6px', fontFamily: "'DM Sans', sans-serif" }}>
                                        Set a new password
                                    </h1>
                                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                                        Choose something strong that you'll remember.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {/* New Password */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                                            New Password
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type={showPass ? 'text' : 'password'}
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Min. 8 characters"
                                                style={{
                                                    width: '100%', padding: '12px 42px 12px 14px', borderRadius: '10px',
                                                    border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none',
                                                    fontFamily: 'inherit', boxSizing: 'border-box', transition: 'border-color 0.2s',
                                                }}
                                                onFocus={e => (e.target.style.borderColor = '#8b5cf6')}
                                                onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                                            />
                                            <button type="button" onClick={() => setShowPass(s => !s)}
                                                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex' }}>
                                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                        {/* Strength bar */}
                                        {password.length > 0 && (
                                            <div style={{ marginTop: '8px' }}>
                                                <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                                                    {[1, 2, 3].map(i => (
                                                        <div key={i} style={{ flex: 1, height: '3px', borderRadius: '99px', background: i <= strength ? strengthColors[strength] : '#e5e7eb', transition: 'background 0.3s' }} />
                                                    ))}
                                                </div>
                                                <p style={{ fontSize: '11px', color: strengthColors[strength], fontWeight: 600 }}>{strengthLabels[strength]}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Confirm Password */}
                                    <div>
                                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            value={confirm}
                                            onChange={(e) => setConfirm(e.target.value)}
                                            placeholder="Repeat your password"
                                            style={{
                                                width: '100%', padding: '12px 14px', borderRadius: '10px',
                                                border: `1.5px solid ${confirm && confirm !== password ? '#ef4444' : '#e5e7eb'}`,
                                                fontSize: '14px', outline: 'none', fontFamily: 'inherit',
                                                boxSizing: 'border-box', transition: 'border-color 0.2s',
                                            }}
                                            onFocus={e => (e.target.style.borderColor = '#8b5cf6')}
                                            onBlur={e => (e.target.style.borderColor = confirm && confirm !== password ? '#ef4444' : '#e5e7eb')}
                                        />
                                        {confirm && confirm !== password && (
                                            <p style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>Passwords don't match</p>
                                        )}
                                    </div>

                                    {error && (
                                        <div style={{ fontSize: '13px', color: '#ef4444', background: '#fef2f2', padding: '10px 14px', borderRadius: '8px', border: '1px solid #fecaca' }}>
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isLoading || !password || !confirm || password !== confirm}
                                        style={{
                                            padding: '13px', borderRadius: '12px', border: 'none',
                                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                            color: '#fff', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                            opacity: (isLoading || !password || !confirm || password !== confirm) ? 0.6 : 1,
                                            transition: 'opacity 0.2s', boxShadow: '0 4px 14px rgba(124,58,237,0.3)',
                                        }}
                                    >
                                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <><Lock size={15} /> Update Password</>}
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
                                    Password updated!
                                </h2>
                                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 24px' }}>
                                    Your password has been reset. Redirecting you to login…
                                </p>
                                <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '11px 22px', borderRadius: '10px', background: '#f5f3ff', color: '#7c3aed', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
                                    Login now <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
