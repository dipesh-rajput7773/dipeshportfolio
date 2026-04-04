import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Space from '@/models/Space';
import { Instagram, Github, Twitter, Globe, ExternalLink, Youtube, Music, Rocket } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import Analytics from '@/models/Analytics';
import { headers } from 'next/headers';

export async function generateMetadata(props: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const username = params.username;
  return {
    title: `${username} | thedipverse archive`,
    description: `Access the digital archive of ${username}. Narrative. Code. Cinema.`,
  };
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

  // Log Page View (Neural Tracker)
  const headerList = await headers();
  Analytics.create({
    spaceId: space._id,
    userId: space.userId,
    linkTitle: 'biopage',
    browser: headerList.get('user-agent') || 'unknown',
    ipAddress: headerList.get('x-forwarded-for') || 'unknown'
  }).catch(e => console.error("Page View Log Failed:", e));

  return (
    <main className="min-h-screen bg-background text-warm-white pb-20 px-6 flex flex-col items-center relative overflow-hidden selection:bg-crimson/30">
      
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-crimson/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-crimson/5 blur-[120px] rounded-full -z-10" />

      <PageTransition>
        <div className="max-w-xl w-full pt-24 space-y-16 relative z-10">
          
          {/* Persona Section */}
          <section className="text-center space-y-8">
            <div className="relative inline-block group">
                 <div className="absolute -inset-4 bg-crimson/10 rounded-full blur-2xl group-hover:bg-crimson/20 transition-all duration-700" />
                 <div className="w-32 h-32 rounded-full border border-warm-white/10 p-1 relative z-10 bg-background overflow-hidden mx-auto">
                    {space.avatarUrl ? (
                         <img src={space.avatarUrl} alt={space.displayName} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/2">
                            <Rocket size={40} className="text-muted/20" />
                        </div>
                    )}
                 </div>
            </div>

            <div className="space-y-4">
                <label className="mono text-crimson text-[10px] font-bold uppercase tracking-[0.4em]">ARCHIVE / {space.username.toUpperCase()}</label>
                <h1 className="text-4xl md:text-6xl font-display font-medium tracking-tighter leading-none italic">
                    {space.displayName}
                </h1>
                <p className="mono text-[10px] text-muted max-w-sm mx-auto leading-relaxed tracking-tight lowercase pt-2 italic">
                    // {space.bio || 'the narrative begins here. builder in public.'}
                </p>
            </div>
          </section>

          {/* Links Archive */}
          <section className="space-y-4">
            <div className="flex items-center gap-4 pb-4">
                <div className="h-[1px] flex-1 bg-warm-white/5" />
                <span className="mono text-[9px] text-muted uppercase tracking-[0.3em]">Direct Access</span>
                <div className="h-[1px] flex-1 bg-warm-white/5" />
            </div>
            
            <div className="grid grid-cols-1 gap-4">
                {space.links.map((link: any, i: number) => {
                    let icon = <Globe size={16} />;
                    const url = link.url.toLowerCase();
                    const finalUrl = `/api/redirect?url=${encodeURIComponent(link.url)}&spaceId=${space._id}&userId=${space.userId}&linkTitle=${encodeURIComponent(link.title)}`;
                    
                    if (url.includes('instagram.com')) icon = <Instagram size={16} />;
                    if (url.includes('github.com')) icon = <Github size={16} />;
                    if (url.includes('twitter.com') || url.includes('x.com')) icon = <Twitter size={16} />;
                    if (url.includes('youtube.com')) icon = <Youtube size={16} />;
                    if (url.includes('spotify.com')) icon = <Music size={16} />;

                    return (
                        <a 
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block p-6 border border-warm-white/5 bg-white/[0.01] hover:border-crimson/50 hover:bg-crimson/[0.02] transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-20 transition-opacity">
                                <ExternalLink size={12} />
                            </div>
                            <div className="flex items-center justify-between border-l-2 border-transparent group-hover:border-crimson pl-0 group-hover:pl-4 transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="text-muted group-hover:text-crimson transition-colors">
                                        {icon}
                                    </div>
                                    <span className="font-display text-xl tracking-tight text-warm-white/80 group-hover:text-warm-white transition-colors uppercase italic">{link.title}</span>
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
          </section>

          {/* Footer Branding */}
          <footer className="pt-10 text-center space-y-6">
             <div className="h-[1px] w-12 bg-crimson mx-auto" />
             <p className="mono text-[8px] text-muted uppercase tracking-[0.5em] opacity-30">
                Powered by thedipverse neural engine.
             </p>
          </footer>

        </div>
      </PageTransition>
    </main>
  );
}
