import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Analytics from '@/models/Analytics';
import User from '@/models/User';
import PageTransition from '@/components/PageTransition';
import { Activity, MousePointer2, Eye, TrendingUp, Clock, Globe } from 'lucide-react';

export default async function AnalyticsDashboard() {
  const session: any = await getServerSession(authOptions as any);
  if (!session) redirect('/login');

  await dbConnect();
  const user = await User.findOne({ email: session.user.email });
  
  // Fetch Analytics Data
  const allAnalytics = await Analytics.find({ userId: user._id }).sort({ timestamp: -1 });
  const pageViews = allAnalytics.filter(a => a.linkTitle === 'biopage').length;
  const linkClicks = allAnalytics.filter(a => a.linkTitle !== 'biopage').length;
  const ctr = pageViews > 0 ? ((linkClicks / pageViews) * 100).toFixed(1) : 0;

  // Group link clicks
  const topLinksMap: any = {};
  allAnalytics.forEach(a => {
    if (a.linkTitle !== 'biopage') {
        topLinksMap[a.linkTitle] = (topLinksMap[a.linkTitle] || 0) + 1;
    }
  });
  const topLinks = Object.entries(topLinksMap).sort((a: any, b: any) => b[1] - a[1]).slice(0, 5);

  return (
    <main className="min-h-screen bg-background text-warm-white pt-32 pb-20 px-6">
      <PageTransition>
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Header Section */}
          <div className="space-y-6">
            <label className="mono text-crimson text-xs font-bold uppercase tracking-[0.5em]">006 — ANALYTICS ENGINE</label>
            <h1 className="text-5xl md:text-8xl font-display font-medium tracking-tighter leading-[0.8]">
               Narrative <br />
               <span className="text-muted italic">Performance Hub.</span>
            </h1>
            <p className="mono text-muted text-sm tracking-tight leading-relaxed max-w-sm pt-4 italic">
              // Visualizing the signal in the digital noise.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="editorial-card p-10 border border-warm-white/5 space-y-6">
                <p className="mono text-[10px] text-muted uppercase tracking-widest flex items-center gap-3">
                    <Eye size={14} className="text-crimson" /> Neural Impressions
                </p>
                <h3 className="text-5xl font-display font-bold tracking-tighter italic">{pageViews}</h3>
                <p className="mono text-[8px] text-muted uppercase tracking-widest leading-relaxed opacity-50">// Total visitors on your archive handle.</p>
            </div>
            <div className="editorial-card p-10 border border-warm-white/5 space-y-6">
                <p className="mono text-[10px] text-muted uppercase tracking-widest flex items-center gap-3">
                    <MousePointer2 size={14} className="text-crimson" /> Strategic Clicks
                </p>
                <h3 className="text-5xl font-display font-bold tracking-tighter italic">{linkClicks}</h3>
                <p className="mono text-[8px] text-muted uppercase tracking-widest leading-relaxed opacity-50">// Intent clicks on your cinematic vault links.</p>
            </div>
            <div className="editorial-card p-10 border border-crimson/10 bg-crimson/[0.02] space-y-6 relative overflow-hidden">
                <p className="mono text-[10px] text-crimson font-bold uppercase tracking-widest flex items-center gap-3">
                    <TrendingUp size={14} /> Narrative CTR
                </p>
                <h3 className="text-5xl font-display font-bold tracking-tighter italic text-crimson">{ctr}%</h3>
                <p className="mono text-[8px] text-muted uppercase tracking-widest leading-relaxed opacity-50">// Your overall engagement conversion rate.</p>
                <Activity className="absolute -bottom-4 -right-4 text-crimson/5" size={120} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             {/* Top Links Table */}
             <div className="space-y-10">
                <h2 className="text-3xl font-display italic font-bold border-l-4 border-crimson pl-6 uppercase tracking-tighter">High-Value Links.</h2>
                <div className="space-y-4">
                    {topLinks.length > 0 ? topLinks.map(([title, count], i) => (
                        <div key={i} className="flex items-center justify-between p-6 border border-warm-white/5 bg-white/[0.01]">
                            <div className="flex items-center gap-6">
                                <span className="mono text-[10px] text-muted font-bold opacity-30">/0{i+1}</span>
                                <p className="font-display text-xl italic tracking-tight text-warm-white/80">{String(title)}</p>
                            </div>
                            <span className="mono font-bold text-crimson text-sm">{String(count)} Clicks</span>
                        </div>
                    )) : (
                        <p className="mono text-[10px] text-muted uppercase italic opacity-20 tracking-widest">// Monitoring incoming signals...</p>
                    )}
                </div>
             </div>

             {/* Recent Stream */}
             <div className="space-y-10">
                <h2 className="text-3xl font-display italic font-bold border-l-4 border-crimson pl-6 uppercase tracking-tighter">Signal Stream.</h2>
                <div className="space-y-3 h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                    {allAnalytics.slice(0, 10).map((a, i) => (
                        <div key={i} className="p-4 border border-warm-white/5 mono text-[8px] uppercase tracking-widest flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <Clock size={10} className="text-muted/30 group-hover:text-crimson transition-colors" />
                                <span className="text-muted/60">{new Date(a.timestamp).toLocaleString()}</span>
                            </div>
                            <span className={a.linkTitle === 'biopage' ? 'text-warm-white/50' : 'text-crimson/80'}>
                                {a.linkTitle === 'biopage' ? 'VISIT' : 'CLICK:' + a.linkTitle}
                            </span>
                        </div>
                    ))}
                    {allAnalytics.length === 0 && <p className="mono text-[10px] text-muted opacity-20">// Signal empty.</p>}
                </div>
             </div>
          </div>

        </div>
      </PageTransition>
    </main>
  );
}
