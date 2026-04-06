import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Space from '@/models/Space';
import { Instagram, Github, Twitter, Globe, ExternalLink, Youtube, Music, ArrowRight, Mail, Briefcase } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import Analytics from '@/models/Analytics';
import { headers } from 'next/headers';

export async function generateMetadata(props: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const username = params.username;
  return {
    title: `${username} | thedipverse`,
    description: `${username} — Developer. Editor. Building in public.`,
  };
}

// Theme presets
const THEMES: Record<string, { bg: string; glow: string; accent: string; grain: boolean }> = {
  midnight: {
    bg: 'linear-gradient(160deg, #080808 0%, #1a0408 50%, #080808 100%)',
    glow: 'rgba(196,18,48,0.12)',
    accent: '#C41230',
    grain: true,
  },
  dusk: {
    bg: 'linear-gradient(160deg, #0a0814 0%, #1a1230 50%, #0a0814 100%)',
    glow: 'rgba(180,140,30,0.10)',
    accent: '#B48C1E',
    grain: true,
  },
  noir: {
    bg: 'linear-gradient(160deg, #111 0%, #1c1c1c 50%, #111 100%)',
    glow: 'rgba(240,237,232,0.06)',
    accent: '#F0EDE8',
    grain: true,
  },
  ember: {
    bg: 'linear-gradient(160deg, #080808 0%, #1a0c04 50%, #080808 100%)',
    glow: 'rgba(200,90,20,0.12)',
    accent: '#E05A14',
    grain: true,
  },
  dark: {
    bg: 'linear-gradient(160deg, #080808 0%, #1a0408 50%, #080808 100%)',
    glow: 'rgba(196,18,48,0.12)',
    accent: '#C41230',
    grain: true,
  },
};

function getIconForUrl(url: string) {
  const u = url.toLowerCase();
  if (u.includes('instagram.com')) return <Instagram size={16} />;
  if (u.includes('github.com')) return <Github size={16} />;
  if (u.includes('twitter.com') || u.includes('x.com')) return <Twitter size={16} />;
  if (u.includes('youtube.com')) return <Youtube size={16} />;
  if (u.includes('spotify.com')) return <Music size={16} />;
  if (u.includes('mailto:') || u.includes('mail')) return <Mail size={16} />;
  return <Globe size={16} />;
}

function isPrimary(title: string) {
  const t = title.toLowerCase();
  return t.includes('work') || t.includes('portfolio') || t.includes('project');
}

function isContact(title: string) {
  const t = title.toLowerCase();
  return t.includes('contact') || t.includes('email') || t.includes('mail');
}

function isInstagram(title: string) {
  return title.toLowerCase().includes('instagram');
}

export default async function PublicSpacePage(props: {
  params: Promise<{ username: string }>;
}) {
  const params = await props.params;
  const username = params.username;
  await dbConnect();

  const spaceData = await Space.findOne({ username: username.toLowerCase() });

  if (!spaceData) {
    notFound();
  }

  const space = JSON.parse(JSON.stringify(spaceData));

  // Log Page View
  const headerList = await headers();
  Analytics.create({
    spaceId: space._id,
    userId: space.userId,
    linkTitle: 'biopage',
    browser: headerList.get('user-agent') || 'unknown',
    ipAddress: headerList.get('x-forwarded-for') || 'unknown',
  }).catch((e: Error) => console.error('Page View Log Failed:', e));

  const theme = THEMES[space.theme as string] ?? THEMES.midnight;

  // Initials from displayName
  const initials = (space.displayName as string)
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <main
      className="min-h-screen text-warm-white pb-20 px-6 flex flex-col items-center relative overflow-hidden selection:bg-crimson/30"
      style={{ background: theme.bg }}
    >
      {/* Film Grain Overlay */}
      {theme.grain && <div className="grain" aria-hidden="true" />}

      {/* Ambient Glow Center */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none -z-10"
        style={{ background: theme.glow }}
      />

      <PageTransition>
        <div className="max-w-md w-full pt-20 space-y-12 relative z-10">

          {/* ── Avatar ── */}
          <section className="text-center space-y-6">
            <div className="relative inline-block group">
              <div
                className="absolute -inset-5 rounded-full blur-2xl group-hover:opacity-100 opacity-60 transition-all duration-700"
                style={{ background: theme.glow }}
              />
              <div className="w-28 h-28 rounded-full border border-warm-white/10 relative z-10 bg-black overflow-hidden mx-auto shadow-2xl">
                {space.avatarUrl ? (
                  <img
                    src={space.avatarUrl}
                    alt={space.displayName}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: `${theme.accent}18` }}
                  >
                    <span
                      className="font-display text-2xl font-bold tracking-tighter"
                      style={{ color: theme.accent }}
                    >
                      {initials}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Name + Bio */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-display font-medium tracking-tighter leading-none">
                {space.displayName}
              </h1>
              <p className="mono text-[11px] text-muted max-w-xs mx-auto leading-relaxed tracking-wide pt-1">
                {space.bio || 'Developer. Editor. Building in public.'}
              </p>
            </div>
          </section>

          {/* ── Divider ── */}
          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-warm-white/5" />
            <span className="mono text-[9px] text-muted uppercase tracking-[0.35em]">links</span>
            <div className="h-[1px] flex-1 bg-warm-white/5" />
          </div>

          {/* ── Links ── */}
          <section className="space-y-3">
            {space.links.map((link: { title: string; url: string; icon?: string }, i: number) => {
              const finalUrl = `/api/redirect?url=${encodeURIComponent(link.url)}&spaceId=${space._id}&userId=${space.userId}&linkTitle=${encodeURIComponent(link.title)}`;
              const primary = isPrimary(link.title);
              const icon = getIconForUrl(link.url);

              return primary ? (
                /* ── PRIMARY button ── filled crimson border */
                <a
                  key={i}
                  href={finalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`link-${i}-${link.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group relative flex items-center justify-between w-full px-6 py-5 border-2 transition-all duration-300 overflow-hidden"
                  style={{
                    borderColor: theme.accent,
                    background: `${theme.accent}14`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${theme.accent}28`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = `${theme.accent}14`;
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="transition-colors" style={{ color: theme.accent }}>
                      <Briefcase size={15} />
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-warm-white">
                      {link.title}
                    </span>
                  </div>
                  <ArrowRight
                    size={15}
                    className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                    style={{ color: theme.accent }}
                  />
                </a>
              ) : (
                /* ── SECONDARY button ── outline */
                <a
                  key={i}
                  href={finalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`link-${i}-${link.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group relative flex items-center justify-between w-full px-6 py-5 border border-warm-white/10 bg-white/[0.015] hover:border-warm-white/25 hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-muted group-hover:text-warm-white transition-colors">
                      {icon}
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-warm-white/70 group-hover:text-warm-white transition-colors">
                      {link.title}
                    </span>
                  </div>
                  <ExternalLink
                    size={12}
                    className="opacity-0 group-hover:opacity-40 transition-opacity text-muted"
                  />
                </a>
              );
            })}
          </section>

          {/* ── Footer ── */}
          <footer className="pt-8 text-center space-y-4">
            <div className="h-[1px] w-8 bg-warm-white/10 mx-auto" />
            <p className="mono text-[8px] text-muted uppercase tracking-[0.5em] opacity-25">
              thedipverse
            </p>
          </footer>

        </div>
      </PageTransition>
    </main>
  );
}
