import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Space from '@/models/Space';
import { Instagram, Github, Twitter, Globe, ExternalLink, Youtube, Music, ArrowUpRight, Mail, Briefcase } from 'lucide-react';
import Analytics from '@/models/Analytics';
import { headers } from 'next/headers';

export async function generateMetadata(props: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const username = params.username;
  return {
    title: `${username} | thedipverse`,
    description: `${username} — All my links in one place.`,
  };
}

// Background presets (must match editor)
const BG_PRESETS: Record<string, { value: string; text: string }> = {
  'soft-purple': { value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: '#fff' },
  'sunset': { value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', text: '#fff' },
  'ocean': { value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', text: '#fff' },
  'forest': { value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', text: '#1a1a1a' },
  'peach': { value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', text: '#1a1a1a' },
  'midnight': { value: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', text: '#fff' },
  'rose': { value: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)', text: '#fff' },
  'sky': { value: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', text: '#1a1a1a' },
  'dark': { value: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', text: '#fff' },
  'cream': { value: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', text: '#1a1a1a' },
  'neon': { value: 'linear-gradient(135deg, #13547a 0%, #80d0c7 100%)', text: '#fff' },
  'lavender': { value: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', text: '#1a1a1a' },
  // legacy themes
  'cinema-crimson': { value: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #1a0408 100%)', text: '#fff' },
};

function getIconForUrl(url: string) {
  const u = url.toLowerCase();
  if (u.includes('instagram.com')) return <Instagram size={17} />;
  if (u.includes('github.com')) return <Github size={17} />;
  if (u.includes('twitter.com') || u.includes('x.com')) return <Twitter size={17} />;
  if (u.includes('youtube.com')) return <Youtube size={17} />;
  if (u.includes('spotify.com')) return <Music size={17} />;
  if (u.includes('mailto:') || u.includes('mail')) return <Mail size={17} />;
  if (u.includes('portfolio') || u.includes('work')) return <Briefcase size={17} />;
  return <Globe size={17} />;
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

  const theme = BG_PRESETS[space.theme as string] ?? BG_PRESETS['soft-purple'];

  const initials = (space.displayName as string)
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const isDark = theme.text === '#fff';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', 'DM Sans', sans-serif;
        }

        .link-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 14px 20px;
          border-radius: 16px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          border: 1.5px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.18);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          letter-spacing: 0.01em;
          cursor: pointer;
          text-align: left;
        }

        .link-btn:hover {
          transform: translateY(-2px) scale(1.01);
          background: rgba(255,255,255,0.28);
          border-color: rgba(255,255,255,0.5);
          box-shadow: 0 8px 30px rgba(0,0,0,0.15);
        }

        .link-btn:active {
          transform: translateY(0) scale(0.99);
        }

        .link-btn-dark {
          border-color: rgba(0,0,0,0.12);
          background: rgba(0,0,0,0.08);
        }

        .link-btn-dark:hover {
          background: rgba(0,0,0,0.14);
          border-color: rgba(0,0,0,0.2);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        }

        .avatar-ring {
          animation: ring-pulse 3s ease-in-out infinite;
        }

        @keyframes ring-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(255,255,255,0); }
        }

        .page-enter {
          animation: fadeUp 0.5s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .stagger > * {
          animation: fadeUp 0.4s ease both;
        }
        .stagger > *:nth-child(1) { animation-delay: 0.05s; }
        .stagger > *:nth-child(2) { animation-delay: 0.1s; }
        .stagger > *:nth-child(3) { animation-delay: 0.15s; }
        .stagger > *:nth-child(4) { animation-delay: 0.2s; }
        .stagger > *:nth-child(5) { animation-delay: 0.25s; }
        .stagger > *:nth-child(6) { animation-delay: 0.3s; }
        .stagger > *:nth-child(7) { animation-delay: 0.35s; }
        .stagger > *:nth-child(8) { animation-delay: 0.4s; }
      `}</style>

      <main
        style={{
          minHeight: '100vh',
          background: theme.value,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '60px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Soft background glow */}
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)',
        }} />

        <div
          className="page-enter"
          style={{
            maxWidth: '460px', width: '100%', padding: '60px 24px 40px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px',
            position: 'relative', zIndex: 1,
          }}
        >
          {/* Avatar */}
          <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div
              className="avatar-ring"
              style={{
                width: '96px', height: '96px', borderRadius: '50%',
                overflow: 'hidden', border: '3px solid rgba(255,255,255,0.5)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              }}
            >
              {space.avatarUrl ? (
                <img
                  src={space.avatarUrl}
                  alt={space.displayName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '32px', fontWeight: 900,
                    color: theme.text, opacity: 0.85,
                  }}>
                    {initials}
                  </span>
                </div>
              )}
            </div>

            {/* Name & Bio */}
            <div style={{ textAlign: 'center' }}>
              <h1 style={{
                fontFamily: "'DM Sans', 'Inter', sans-serif",
                fontSize: '26px', fontWeight: 800,
                color: theme.text, lineHeight: 1.15,
                letterSpacing: '-0.01em',
                textShadow: isDark ? '0 2px 12px rgba(0,0,0,0.2)' : 'none',
              }}>
                {space.displayName}
              </h1>
              <p style={{
                fontSize: '13px', fontWeight: 500,
                color: theme.text, opacity: 0.65, marginTop: '4px',
                letterSpacing: '0.01em',
              }}>
                @{space.username}
              </p>
              {space.bio && (
                <p style={{
                  fontSize: '14px', fontWeight: 400,
                  color: theme.text, opacity: 0.8,
                  marginTop: '10px', lineHeight: 1.6,
                  maxWidth: '320px', margin: '10px auto 0',
                }}>
                  {space.bio}
                </p>
              )}
            </div>
          </section>

          {/* Divider */}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1, height: '1px', background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: theme.text, opacity: 0.5 }}>
              links
            </span>
            <div style={{ flex: 1, height: '1px', background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }} />
          </div>

          {/* Links */}
          <section className="stagger" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(space.links as { title: string; url: string; icon?: string; appScheme?: string }[]).map((link, i) => {
              const finalUrl = `/api/redirect?url=${encodeURIComponent(link.url)}&spaceId=${space._id}&userId=${space.userId}&linkTitle=${encodeURIComponent(link.title)}`;
              const icon = getIconForUrl(link.url);

              return (
                <button
                  key={i}
                  data-url={finalUrl}
                  data-app-scheme={link.appScheme || ''}
                  id={`link-${i}-${link.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`link-btn ${!isDark ? 'link-btn-dark' : ''}`}
                  style={{ color: theme.text }}
                  onClick={undefined}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '10px',
                      background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {icon}
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '14px' }}>{link.title}</span>
                  </div>
                  <ArrowUpRight size={16} style={{ opacity: 0.6, flexShrink: 0 }} />
                </button>
              );
            })}

            {space.links.length === 0 && (
              <p style={{ textAlign: 'center', color: theme.text, opacity: 0.5, fontSize: '14px', padding: '20px' }}>
                No links added yet.
              </p>
            )}
          </section>

          {/* Footer */}
          <footer style={{ marginTop: '16px', textAlign: 'center' }}>
            <p style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: theme.text, opacity: 0.35,
            }}>
              thedipverse
            </p>
          </footer>
        </div>
      </main>

      {/* Deep-link handler: try app scheme → fallback to web URL */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          document.querySelectorAll('.link-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
              e.preventDefault();
              var appScheme = btn.getAttribute('data-app-scheme') || '';
              var webUrl   = btn.getAttribute('data-url') || '';
              if (!webUrl) return;

              if (appScheme) {
                // Try opening the native app.
                // After 1.5 s, if the page is still visible, fall back to the website.
                var fallbackTimer = setTimeout(function() {
                  window.open(webUrl, '_blank', 'noopener,noreferrer');
                }, 1500);

                // Navigating away (app opened) cancels the document's focus state;
                // detect it and cancel the fallback timer.
                window.addEventListener('blur', function onBlur() {
                  clearTimeout(fallbackTimer);
                  window.removeEventListener('blur', onBlur);
                }, { once: true });

                window.location.href = appScheme;
              } else {
                window.open(webUrl, '_blank', 'noopener,noreferrer');
              }
            });
          });
        })();
      ` }} />
    </>
  );
}
