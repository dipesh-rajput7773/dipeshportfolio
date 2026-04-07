import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Analytics from '@/models/Analytics';
import User from '@/models/User';
import Space from '@/models/Space';
import PageTransition from '@/components/PageTransition';
import {
  Eye, MousePointer2, TrendingUp, Activity,
  Link2, Users, BarChart3, Zap, Calendar, Clock
} from 'lucide-react';

export default async function AnalyticsDashboard() {
  const session: any = await getServerSession(authOptions as any);
  if (!session) redirect('/login');

  await dbConnect();
  const user = await User.findOne({ email: session.user.email });
  const space = await Space.findOne({ userId: user._id });

  // Fetch all analytics
  const allAnalytics = await Analytics.find({ userId: user._id }).sort({ timestamp: -1 });

  // Core metrics
  const pageViews = allAnalytics.filter(a => a.linkTitle === 'biopage').length;
  const linkClicks = allAnalytics.filter(a => a.linkTitle !== 'biopage').length;
  const ctr = pageViews > 0 ? ((linkClicks / pageViews) * 100).toFixed(1) : '0';

  // Today's metrics
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const todayViews = allAnalytics.filter(a => a.linkTitle === 'biopage' && new Date(a.timestamp) >= todayStart).length;
  const todayClicks = allAnalytics.filter(a => a.linkTitle !== 'biopage' && new Date(a.timestamp) >= todayStart).length;

  // Last 7 days per-day views
  const last7: { label: string; views: number; clicks: number }[] = [];
  for (let d = 6; d >= 0; d--) {
    const dayStart = new Date(); dayStart.setHours(0, 0, 0, 0); dayStart.setDate(dayStart.getDate() - d);
    const dayEnd = new Date(dayStart); dayEnd.setDate(dayEnd.getDate() + 1);
    const dayLabel = dayStart.toLocaleDateString('en-US', { weekday: 'short' });
    last7.push({
      label: dayLabel,
      views: allAnalytics.filter(a => a.linkTitle === 'biopage' && new Date(a.timestamp) >= dayStart && new Date(a.timestamp) < dayEnd).length,
      clicks: allAnalytics.filter(a => a.linkTitle !== 'biopage' && new Date(a.timestamp) >= dayStart && new Date(a.timestamp) < dayEnd).length,
    });
  }
  const maxBarVal = Math.max(...last7.map(d => d.views), 1);

  // Top links
  const topLinksMap: Record<string, number> = {};
  allAnalytics.forEach(a => {
    if (a.linkTitle !== 'biopage') topLinksMap[a.linkTitle] = (topLinksMap[a.linkTitle] || 0) + 1;
  });
  const topLinks = Object.entries(topLinksMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Recent 8 events
  const recentEvents = allAnalytics.slice(0, 8);

  return (
    <main
      style={{ fontFamily: "'Inter', 'DM Sans', sans-serif", background: '#f8f7ff', minHeight: '100vh' }}
      className="pt-24 pb-20 px-4 md:px-8"
    >
      <PageTransition>
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Header */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <BarChart3 size={16} color="#8b5cf6" />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: '#8b5cf6', textTransform: 'uppercase' }}>
                Analytics
              </span>
            </div>
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 800, color: '#1a1a2e', lineHeight: 1.15, margin: 0 }}>
              BioVerse Performance
            </h1>
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '6px' }}>
              See how visitors interact with your link page at{' '}
              <strong style={{ color: '#7c3aed' }}>thedipverse.com/{space?.username || '…'}</strong>
            </p>
          </div>

          {/* Stat Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { icon: <Eye size={18} />, label: 'Total Page Views', value: pageViews, sub: `+${todayViews} today`, color: '#7c3aed', bg: '#f5f3ff' },
              { icon: <MousePointer2 size={18} />, label: 'Total Link Clicks', value: linkClicks, sub: `+${todayClicks} today`, color: '#0ea5e9', bg: '#f0f9ff' },
              { icon: <TrendingUp size={18} />, label: 'Click-through Rate', value: `${ctr}%`, sub: 'clicks ÷ visits', color: '#10b981', bg: '#f0fdf4' },
              { icon: <Zap size={18} />, label: 'Links Live', value: space?.links?.length ?? 0, sub: 'active on your page', color: '#f59e0b', bg: '#fffbeb' },
            ].map(({ icon, label, value, sub, color, bg }) => (
              <div key={label} style={{
                background: '#fff', borderRadius: '18px', padding: '22px 24px',
                border: '1.5px solid #e5e7eb',
                boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                display: 'flex', flexDirection: 'column', gap: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>{label}</span>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
                </div>
                <div>
                  <p style={{ fontSize: '32px', fontWeight: 800, color: '#1a1a2e', lineHeight: 1, margin: 0 }}>{value}</p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '5px' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bar Chart + Top Links */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-5">

            {/* 7-day bar chart */}
            <div style={{ background: '#fff', borderRadius: '18px', padding: '24px', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '15px', color: '#1a1a2e', margin: 0 }}>Page Views — Last 7 Days</p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '3px' }}>Daily visitors to your link page</p>
                </div>
                <Calendar size={16} color="#9ca3af" />
              </div>
              {/* Bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '140px' }}>
                {last7.map((day, i) => {
                  const heightPct = maxBarVal > 0 ? Math.max((day.views / maxBarVal) * 100, 4) : 4;
                  const isToday = i === 6;
                  return (
                    <div key={day.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#1a1a2e', opacity: day.views > 0 ? 1 : 0 }}>{day.views}</span>
                      <div style={{
                        width: '100%', borderRadius: '6px 6px 0 0',
                        height: `${heightPct}%`,
                        background: isToday
                          ? 'linear-gradient(180deg, #8b5cf6, #7c3aed)'
                          : day.views > 0 ? 'linear-gradient(180deg, #c4b5fd, #ddd6fe)' : '#f3f4f6',
                        transition: 'height 0.4s ease',
                        minHeight: '4px',
                      }} />
                      <span style={{ fontSize: '10px', color: isToday ? '#7c3aed' : '#9ca3af', fontWeight: isToday ? 700 : 500 }}>{day.label}</span>
                    </div>
                  );
                })}
              </div>
              {/* Legend */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'linear-gradient(180deg, #8b5cf6, #7c3aed)' }} />
                  <span style={{ fontSize: '11px', color: '#6b7280' }}>Today</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#c4b5fd' }} />
                  <span style={{ fontSize: '11px', color: '#6b7280' }}>Previous days</span>
                </div>
              </div>
            </div>

            {/* Top Links */}
            <div style={{ background: '#fff', borderRadius: '18px', padding: '24px', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '15px', color: '#1a1a2e', margin: 0 }}>Top Links</p>
                  <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '3px' }}>Most clicked this month</p>
                </div>
                <Link2 size={16} color="#9ca3af" />
              </div>
              {topLinks.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {topLinks.map(([title, count], i) => {
                    const maxCount = Number(topLinks[0][1]);
                    const pct = maxCount > 0 ? (Number(count) / maxCount) * 100 : 0;
                    const colors = ['#7c3aed', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];
                    return (
                      <div key={title}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', textTransform: 'capitalize' }}>{title}</span>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: colors[i] }}>{String(count)} clicks</span>
                        </div>
                        <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '99px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: colors[i], borderRadius: '99px', transition: 'width 0.5s ease' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <Link2 size={28} color="#d1d5db" style={{ margin: '0 auto 10px' }} />
                  <p style={{ fontSize: '13px', color: '#9ca3af' }}>No link clicks yet</p>
                  <p style={{ fontSize: '12px', color: '#d1d5db', marginTop: '4px' }}>Share your page to start tracking</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div style={{ background: '#fff', borderRadius: '18px', padding: '24px', border: '1.5px solid #e5e7eb', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: '15px', color: '#1a1a2e', margin: 0 }}>Recent Activity</p>
                <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '3px' }}>Live feed of visits and link clicks</p>
              </div>
              <Activity size={16} color="#9ca3af" />
            </div>
            {recentEvents.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {recentEvents.map((a, i) => {
                  const isVisit = a.linkTitle === 'biopage';
                  const dt = new Date(a.timestamp);
                  const timeAgo = (() => {
                    const diff = (Date.now() - dt.getTime()) / 1000;
                    if (diff < 60) return 'just now';
                    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
                    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
                    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  })();
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '12px 14px', borderRadius: '12px', transition: 'background 0.15s',
                    }} className="hover:bg-gray-50">
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                        background: isVisit ? '#f5f3ff' : '#f0fdf4',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isVisit
                          ? <Users size={14} color="#7c3aed" />
                          : <MousePointer2 size={14} color="#10b981" />
                        }
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: '#1a1a2e', margin: 0 }}>
                          {isVisit ? 'Someone visited your page' : `Clicked "${a.linkTitle}"`}
                        </p>
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                          <Clock size={10} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                          {timeAgo}
                        </p>
                      </div>
                      <span style={{
                        fontSize: '11px', fontWeight: 700, padding: '3px 10px',
                        borderRadius: '99px',
                        background: isVisit ? '#f5f3ff' : '#f0fdf4',
                        color: isVisit ? '#7c3aed' : '#10b981',
                      }}>
                        {isVisit ? 'VIEW' : 'CLICK'}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Activity size={32} color="#d1d5db" style={{ margin: '0 auto 12px' }} />
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>No activity yet</p>
                <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>Share your link page and activity will appear here</p>
              </div>
            )}
          </div>

        </div>
      </PageTransition>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Sans:wght@400;600;700;800&display=swap');
      `}</style>
    </main>
  );
}
