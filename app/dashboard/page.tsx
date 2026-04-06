import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Settings from '@/models/Settings';
import { LayoutDashboard, Sparkles, UserCircle, Settings as SettingsIcon, Rocket, Link as LinkIcon, ArrowRight, Activity, Bell, Info, AlertTriangle, Zap } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const session: any = await getServerSession(authOptions as any);

  if (!session) {
    redirect('/login');
  }

  const userEmail = session.user?.email;

  await dbConnect();

  let mongoUser;
  let platformSettings;

  try {
    mongoUser = await User.findOne({ email: userEmail });
    if (!mongoUser) {
      mongoUser = await User.create({ email: userEmail, name: session.user?.name || 'Creator' });
    }
    if (mongoUser && (userEmail === 'dipeshrajput2002@gmail.com' || userEmail === 'admin@thedipverse.com') && mongoUser.tier !== 'admin') {
      mongoUser.tier = 'admin';
      await mongoUser.save();
    }

    // Fetch Global Signals
    platformSettings = await Settings.findOne() || { globalAlert: { active: false }, dailyPrompt: { title: 'The Void Engine', body: 'Neural signal disconnected.' } };
  } catch (error) {
    console.error('MongoDB Dashboard Fetch Failed:', error);
    mongoUser = { name: session.user?.name, credits: 0, email: userEmail, tier: 'free' };
    platformSettings = { globalAlert: { active: false }, dailyPrompt: { title: 'Emergency Protocol', body: 'Neural bridge unstable.' } };
  }

  const tools = [
    {
      name: 'Script Lab',
      description: 'Neural script engine for high-retention content.',
      href: '/dashboard/script-lab',
      icon: <Sparkles size={24} />,
      status: 'Ready',
    },
    {
      name: 'LinkVerse',
      description: 'Your personal link page. One link for everything.',
      href: '/dashboard/your-space',
      icon: <Rocket size={24} />,
      status: 'Ready',
    },
    {
      name: 'Smart Link Hub',
      description: 'Convert any URL to an "Open in App" intent instantly.',
      href: '/dashboard/smart-link',
      icon: <LinkIcon size={24} />,
      status: 'Ready',
    },
    {
      name: 'Neural Analytics',
      description: 'Visualize your audience signals and reach.',
      href: '/dashboard/analytics',
      icon: <Activity size={24} className="text-crimson" />,
      status: 'Live',
    },
  ];

  return (
    <main className="min-h-screen bg-background text-warm-white pt-24 md:pt-32 pb-10 md:pb-20 px-4 md:px-6 selection:bg-crimson/30 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">

        {/* Global System Alert Banner */}
        {platformSettings.globalAlert?.active && (
          <div className={`p-5 md:p-6 mb-12 border-l-4 overflow-hidden relative group transition-all duration-500 animate-in slide-in-from-top-4 ${platformSettings.globalAlert.level === 'critical' ? 'border-crimson bg-crimson/[0.08] text-crimson shadow-lg shadow-crimson/10' :
              platformSettings.globalAlert.level === 'warning' ? 'border-amber-500 bg-amber-500/5 text-amber-500' :
                'border-warm-white/20 bg-warm-white/5 text-warm-white'
            }`}>
            <div className="flex items-start gap-5 md:gap-8 relative z-10">
              <div className="pt-1">
                {platformSettings.globalAlert.level === 'critical' ? <AlertTriangle size={20} /> : <Info size={20} />}
              </div>
              <div className="space-y-2">
                <p className="mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Platform Editorial Broadcast — {platformSettings.globalAlert.level}</p>
                <p className="text-sm md:text-md italic font-medium leading-relaxed leading-snug">
                  {platformSettings.globalAlert.message}
                </p>
              </div>
            </div>
            {/* Cinematic Texture */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        )}

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
          <div className="space-y-4 md:space-y-6 text-center md:text-left">
            <label className="mono text-crimson text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold">000 — CONTROL CENTER</label>
            <h1 className="text-4xl md:text-8xl font-display font-medium tracking-tighter leading-[0.9] md:leading-[0.8]">
              Welcome back, <br />
              <span className="text-muted italic">{mongoUser.name || 'Creator'}.</span>
            </h1>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-6 p-6 border border-warm-white/5 bg-warm-white/2">
            <div className="text-3xl font-display font-bold text-crimson italic">
              {mongoUser.credits || 0}
            </div>
            <div className="vertical-rule h-8 opacity-20" />
            <div>
              <p className="mono text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-muted">Generation Credits</p>
              <p className="mono text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-warm-white">System: Functional</p>
            </div>
          </div>
        </div>

        {/* Daily Neural Feed Card */}
        <div className="editorial-card p-1 md:p-1.5 bg-gradient-to-br from-amber-500/20 via-crimson/10 to-transparent">
          <div className="bg-background/95 p-8 md:p-12 space-y-8 relative overflow-hidden">
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-4">
                <Sparkles className="text-amber-500 animate-pulse" size={20} />
                <span className="mono text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-amber-500/80">The Daily Neural Feed</span>
              </div>
              <div className="text-[10px] mono text-muted uppercase tracking-widest hidden md:block">Signal Origin: Master Control</div>
            </div>
            <div className="space-y-6 relative z-10">
              <h2 className="text-4xl md:text-6xl font-display italic font-bold tracking-tighter leading-tight max-w-4xl">
                {platformSettings.dailyPrompt?.title || 'The Infinite Sequence.'}
              </h2>
              <p className="text-muted-foreground text-md md:text-lg italic font-medium leading-relaxed max-w-3xl leading-snug">
                "{platformSettings.dailyPrompt?.body || 'Neural signal calibration incomplete. Check back shortly for today’s content blueprint.'}"
              </p>
            </div>

            {/* Visual Flair */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/5 blur-[100px] rounded-full" />
            <div className="absolute right-12 bottom-12 opacity-5">
              <Zap size={180} />
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 pt-10 md:pt-12 border-t border-warm-white/5">
          {tools.map((tool, i) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="editorial-card p-8 md:p-10 space-y-10 md:space-y-12 flex flex-col justify-between group h-auto min-h-[350px] md:min-h-[400px]"
            >
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <div className="p-4 border border-warm-white/10 group-hover:bg-crimson group-hover:border-crimson transition-all text-muted group-hover:text-white">
                    {tool.icon}
                  </div>
                  <span className="mono text-[8px] text-muted uppercase tracking-[0.2em] group-hover:text-crimson transition-colors pt-2">
                    [ TOOL / 0{i + 1} ]
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-warm-white tracking-tighter italic">{tool.name}.</h3>
                  <p className="mono text-muted text-[10px] md:text-[11px] leading-relaxed max-w-xs pt-2 md:pt-4 lowercase">
                    // {tool.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mono text-[9px] uppercase tracking-widest text-muted group-hover:text-warm-white transition-all pt-4">
                Access Engine <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* System Meta */}
        <div className="pt-10 md:pt-20 border-t border-warm-white/5 flex flex-wrap gap-6 md:gap-12 opacity-30 justify-center md:justify-start">
          <div className="flex items-center gap-4 mono text-[8px] md:text-[9px] uppercase tracking-[0.2em]">
            <div className="w-1.5 h-1.5 bg-crimson" />
            Identity: {mongoUser.email}
          </div>
          <div className="flex items-center gap-4 mono text-[8px] md:text-[9px] uppercase tracking-[0.2em]">
            <div className="w-1.5 h-1.5 bg-green-500 animate-pulse" />
            Neural Flow: 100% Operational
          </div>
          <div className="flex items-center gap-4 mono text-[8px] md:text-[9px] uppercase tracking-[0.2em]">
            <div className="w-1.5 h-1.5 bg-crimson" />
            Studio V1.2.5
          </div>
        </div>

      </div>
    </main>
  );
}
