'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ShieldCheck, ArrowRight, Loader2, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function CustomLoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [step, setStep] = useState(1); // 1: Info/Credentials, 2: OTP (only for signup or forgot)
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle Login with Password (Direct)
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const authorizedAdmins = ['dipeshrajput2002@gmail.com', 'admin@thedipverse.com'];

    try {
      const result = await signIn('otp-provider', {
        email,
        password,
        otp: 'none', // Not using OTP for direct password login
        isOtpLogin: false,
        redirect: false,
      });
      if (result?.error) throw new Error(result.error);

      const targetUrl = authorizedAdmins.includes(email.toLowerCase()) ? '/admin' : '/dashboard';
      window.location.href = targetUrl;
    } catch (err: any) {
      setError(err.message || 'Identity verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Request OTP (only for signup)
  const handleRequestOtp = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, mobileNumber: mobile, password, isSignup: true }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Identity registration failed');
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Verify OTP (for signup)
  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const authorizedAdmins = ['dipeshrajput2002@gmail.com', 'admin@thedipverse.com'];

      const result = await signIn('otp-provider', {
        email,
        password,
        otp,
        isOtpLogin: true,
        redirect: false,
      });
      if (result?.error) throw new Error(result.error);

      const targetUrl = authorizedAdmins.includes(email.toLowerCase()) ? '/admin' : '/dashboard';
      window.location.href = targetUrl;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-warm-white flex items-center justify-center px-6 pt-32 relative overflow-hidden">

      {/* Cinematic Split Rule Backdrop */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-crimson pointer-events-none transform -translate-y-1/2 opacity-10" />
      <div className="absolute top-0 right-0 w-1/4 h-full bg-crimson/2 -z-10 blur-[150px]" />

      <PageTransition>
        <div className="max-w-md w-full space-y-12">

          {/* Header */}
          <div className="text-center space-y-6">
            <label className="mono text-crimson text-[10px] uppercase tracking-[0.5em] font-bold">000 — ACCESS PORTAL</label>
            <h1 className="text-7xl font-display font-medium tracking-tighter leading-[0.8] text-warm-white">
              The <br /><span className="text-muted italic">Gateway.</span>
            </h1>
          </div>

          {/* Form Container: Editorial Card Style */}
          <div className="editorial-card p-10 space-y-10 group relative">

            {/* Mode Switcher */}
            {step === 1 && (
              <div className="grid grid-cols-2 bg-warm-white/2 p-1 border border-warm-white/5">
                <button
                  onClick={() => { setMode('login'); setError(null); }}
                  className={`py-3 text-[9px] mono font-bold uppercase tracking-widest transition-all ${mode === 'login' ? 'bg-crimson text-white shadow-lg shadow-crimson/20' : 'text-muted hover:text-warm-white'}`}
                >
                  [ SIGN IN ]
                </button>
                <button
                  onClick={() => { setMode('signup'); setError(null); }}
                  className={`py-3 text-[9px] mono font-bold uppercase tracking-widest transition-all ${mode === 'signup' ? 'bg-crimson text-white shadow-lg shadow-crimson/20' : 'text-muted hover:text-warm-white'}`}
                >
                  [ NEW CREATOR ]
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={mode === 'login' ? handleLogin : handleRequestOtp}
                  className="space-y-6"
                >
                  <div className="space-y-6">
                    {mode === 'signup' && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] mono font-bold uppercase tracking-widest text-muted block ml-1">Creator Name</label>
                          <input
                            type="text" required
                            value={name} onChange={(e) => setName(e.target.value)}
                            placeholder="IDENTITY / ALIAS"
                            className="w-full px-6 py-4 bg-background border border-warm-white/5 focus:border-crimson outline-none text-warm-white mono text-xs transition-all uppercase placeholder:opacity-20"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] mono font-bold uppercase tracking-widest text-muted block ml-1">Whatsapp/Mobile</label>
                          <input
                            type="tel" required
                            value={mobile} onChange={(e) => setMobile(e.target.value)}
                            placeholder="+91 / SYSTEM LINK"
                            className="w-full px-6 py-4 bg-background border border-warm-white/5 focus:border-crimson outline-none text-warm-white mono text-xs transition-all placeholder:opacity-20"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-[10px] mono font-bold uppercase tracking-widest text-muted block ml-1">Access Identity (Email)</label>
                      <input
                        type="email" required
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="USER@SYSTEM.IO"
                        className="w-full px-6 py-4 bg-background border border-warm-white/5 focus:border-crimson outline-none text-warm-white mono text-xs transition-all uppercase placeholder:opacity-20"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between ml-1">
                        <label className="text-[10px] mono font-bold uppercase tracking-widest text-muted">{mode === 'signup' ? 'System Key (Password)' : 'Secret Password'}</label>
                        {mode === 'login' && (
                          <Link href="/forgot-password" className="text-[9px] mono font-bold uppercase tracking-widest text-muted hover:text-crimson transition-colors">
                            Forgot password?
                          </Link>
                        )}
                      </div>
                      <input
                        type="password" required
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-6 py-4 bg-background border border-warm-white/5 focus:border-crimson outline-none text-warm-white mono text-xs transition-all placeholder:opacity-20"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 border-l border-crimson bg-crimson/5 text-crimson text-[10px] mono uppercase tracking-widest leading-relaxed">
                        // ERROR: {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || !email || !password}
                    className="w-full py-5 bg-crimson text-white font-mono font-bold text-xs uppercase tracking-[0.2em] hover:bg-red-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <>{mode === 'signup' ? 'Request Access' : '[ UNLOCK GATEWAY ]'}</>}
                  </button>
                </motion.form>

              ) : (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleVerifyOtp}
                  className="space-y-8 text-center"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] mono font-bold text-crimson uppercase tracking-widest italic animate-pulse">// OTP SENT TO: {email}</span>
                    <div className="space-y-4">
                      <label className="text-[10px] mono font-bold uppercase tracking-widest text-muted block">Verification Code</label>
                      <input
                        type="text" required maxLength={6}
                        value={otp} onChange={(e) => setOtp(e.target.value)}
                        placeholder="000000"
                        className="w-full py-6 bg-background border border-warm-white/5 focus:border-crimson outline-none text-warm-white text-center text-4xl font-display font-bold tracking-[0.5em] transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || otp.length < 6}
                    className="w-full py-5 bg-crimson text-white font-mono font-bold text-xs uppercase tracking-[0.2em] hover:bg-red-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <>[ AUTHORIZE ]</>}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[10px] mono font-bold uppercase tracking-widest text-muted hover:text-warm-white transition-colors"
                  >
                    // Go Back
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Branding */}
          <div className="text-center opacity-30">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono">
              Encrypted Connection <br />
              <span className="text-warm-white mt-1 block tracking-widest underline decoration-crimson underline-offset-4">THEDIPVERSE SECURE-SYSTEM</span>
            </p>
          </div>

        </div>
      </PageTransition>
    </main>
  );
}
