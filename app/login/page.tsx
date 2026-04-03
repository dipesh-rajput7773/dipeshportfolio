'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ShieldCheck, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { signIn } from 'next-auth/react';

export default function CustomLoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('signup'); // Default to signup
  const [step, setStep] = useState(1); // 1: Info, 2: OTP
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const handleRequestOtp = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, mobileNumber: mobile, password, isSignup: mode === 'signup' }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send OTP');
      setStep(2);
      setMessage('OTP sent to your email!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const result = await signIn('otp-provider', {
        email,
        password,
        otp,
        isOtpLogin: step === 2, // If step 2, it's an OTP verification
        redirect: false,
      });
      if (result?.error) throw new Error(result.error);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Cinematic Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-white/5 to-transparent -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full -z-20 animate-pulse" />

      <PageTransition>
        <div className="max-w-md w-full space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-white/5 text-white mb-4">
                <Sparkles size={24} />
            </div>
            <h1 className="text-5xl font-display font-bold tracking-tighter leading-[0.9]">
                The <br /><span className="text-white/20">Portal.</span>
            </h1>
            <p className="text-zinc-400 font-medium tracking-tight">Access your specialist tools via secure OTP.</p>
          </div>

          {/* Form Container */}
          <div className="glass p-10 rounded-[40px] border border-white/5 relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            {/* Mode Switcher */}
            {step === 1 && (
                <div className="flex bg-white/5 p-1 rounded-2xl mb-8 border border-white/5">
                    <button 
                        onClick={() => setMode('signup')}
                        className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${mode === 'signup' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        New Creator
                    </button>
                    <button 
                        onClick={() => setMode('login')}
                        className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all ${mode === 'login' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        Sign In
                    </button>
                </div>
            )}

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleRequestOtp} 
                  className="space-y-6"
                >
                  {mode === 'signup' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 block ml-1">Creator Name</label>
                            <input 
                                type="text" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name"
                                className="w-full px-6 py-4 bg-white/5 rounded-2xl border border-white/5 focus:border-white/20 outline-none text-white font-medium text-sm transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 block ml-1">Whatsapp/Mobile</label>
                            <input 
                                type="tel" 
                                required
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="+91"
                                className="w-full px-6 py-4 bg-white/5 rounded-2xl border border-white/5 focus:border-white/20 outline-none text-white font-medium text-sm transition-all"
                            />
                        </div>
                      </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 block ml-1">{mode === 'signup' ? 'Create Password' : 'Secret Key (Password)'}</label>
                    <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-6 py-5 bg-white/5 rounded-3xl border border-white/5 focus:border-white/20 outline-none text-white font-medium transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 block ml-1">Identity (Email)</label>
                    <div className="relative">
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        <input 
                            type="email" 
                            required
                            disabled={isLoading}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full pl-14 pr-6 py-5 bg-white/5 rounded-3xl border border-white/5 focus:border-white/20 outline-none text-white font-medium transition-all"
                        />
                    </div>
                  </div>
                  
                  {error && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>}

                  <button 
                    type="submit" 
                    disabled={isLoading || !email}
                    className="w-full py-5 bg-white text-black font-bold rounded-3xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-white/5"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : <><ArrowRight size={20} /> {mode === 'signup' ? 'Create Account' : 'Verify & Enter'}</>}
                  </button>
                </motion.form>

              ) : (
                <motion.form 
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleVerifyOtp} 
                  className="space-y-6 text-center"
                >
                   <div className="flex justify-center mb-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-[10px] font-bold uppercase tracking-widest">
                            <CheckCircle2 size={12} /> Email Sent
                        </div>
                   </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 block">Verification Code</label>
                    <input 
                        type="text" 
                        required
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="0 0 0 0 0 0"
                        className="w-full py-6 bg-white/5 rounded-3xl border border-white/5 focus:border-white/20 outline-none text-white text-center text-4xl font-display font-bold tracking-[0.5em] transition-all"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isLoading || otp.length < 6}
                    className="w-full py-5 bg-white text-black font-bold rounded-3xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-white/5"
                  >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : <><ShieldCheck size={20} /> Verify & Enter</>}
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                  >
                    Resend Code or Change Email
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Branding */}
          <div className="text-center opacity-30 group cursor-default">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]">100% Secure Interface <br /> <span className="text-white">Powered by thedipverse</span></p>
          </div>

        </div>
      </PageTransition>
    </main>
  );
}
