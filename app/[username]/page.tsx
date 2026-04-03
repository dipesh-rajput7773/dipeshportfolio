import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Space from '@/models/Space';
import { Instagram, Github, Twitter, Globe, ExternalLink, Youtube, Music } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import Link from 'next/link';

const themes: any = {
  midnight: { bg: 'bg-[#050505]', border: 'border-white/10', text: 'text-white' },
  sunset: { bg: 'bg-gradient-to-tr from-orange-600/30 via-[#050505] to-[#050505]', border: 'border-orange-500/10', text: 'text-amber-500' },
  ocean: { bg: 'bg-gradient-to-tr from-blue-700/30 via-[#050505] to-[#050505]', border: 'border-blue-500/10', text: 'text-sky-400' },
  forest: { bg: 'bg-gradient-to-tr from-emerald-600/30 via-[#050505] to-[#050505]', border: 'border-emerald-500/10', text: 'text-emerald-400' },
  neon: { bg: 'bg-gradient-to-tr from-pink-600/30 via-[#050505] to-[#050505]', border: 'border-pink-500/20', text: 'text-pink-400' },
  silver: { bg: 'bg-[#111]', border: 'border-white/5', text: 'text-zinc-100' },
  glass: { bg: 'bg-[#080808]', border: 'border-white/10', text: 'text-white' },
};

export async function generateMetadata(props: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const params = await props.params;
  const username = params.username;
  return {
    title: `${username} | Your Space`,
    description: `Connect with ${username} in their digital space.`,
  };
}

const IconMap: { [key: string]: any } = {
  instagram: <Instagram size={20} />,
  github: <Github size={20} />,
  twitter: <Twitter size={20} />,
  globe: <Globe size={20} />,
};

export default async function PublicSpacePage(props: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const username = params.username;
  await dbConnect();
  
  const spaceData = await Space.findOne({ username: username.toLowerCase() });

  if (!spaceData) {
    notFound();
  }

  const space = JSON.parse(JSON.stringify(spaceData));
  const currentTheme = themes[space.theme || 'midnight'] || themes.midnight;

  return (
    <main className={`min-h-screen ${currentTheme.bg} text-white pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden transition-all duration-700`}>
      {/* Background Animated Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full -z-10 animate-pulse duration-5000" />

      
      <PageTransition>
        <div className="max-w-md w-full text-center space-y-10">
          
          {/* Header Profile */}
          <div className="space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full p-[2px] bg-gradient-to-tr from-white/20 via-white/50 to-white/20">
              <div className="w-full h-full rounded-full bg-[#050505] border border-white/10 flex items-center justify-center overflow-hidden">
                {space.avatarUrl ? (
                  <img src={space.avatarUrl} alt={space.displayName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-display font-bold text-white/40 uppercase">
                    {space.displayName.charAt(0)}
                  </span>
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              <h1 className="text-3xl font-display font-bold tracking-tighter text-white">
                {space.displayName}
              </h1>
              <p className={`text-sm font-bold uppercase tracking-[0.2em] opacity-40 ${currentTheme.text}`}>
                 @{space.username}
              </p>
            </div>
            
            {space.bio && (
              <p className="text-zinc-400 font-medium tracking-tight leading-relaxed max-w-sm mx-auto text-sm italic">
                {space.bio}
              </p>
            )}
          </div>

          {/* Links Grid with improved styling */}
          <div className="space-y-3">
            {space.links.map((link: any) => {
               // Auto-detect social icon based on URL
               let icon = <Globe size={18} />;
               const url = link.url.toLowerCase();
               let finalUrl = link.url;

               if (url.includes('instagram.com')) icon = <Instagram size={18} />;
               if (url.includes('github.com')) icon = <Github size={18} />;
               if (url.includes('twitter.com') || url.includes('x.com')) icon = <Twitter size={18} />;
               if (url.includes('spotify.com')) icon = <Music size={18} />;
               
               if (url.includes('youtube.com') || url.includes('youtu.be')) {
                 icon = <Youtube size={18} />;
                 // Use Smart Redirector to "Open in App"
                 finalUrl = `/api/redirect?url=${encodeURIComponent(link.url)}`;
               }

               return (
                <a
                  key={link._id}
                  href={finalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-5 glass rounded-3xl hover:scale-[1.01] transition-all group border ${currentTheme.border} bg-white/5 active:scale-95`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 opacity-20 group-hover:opacity-100 transition-all ${currentTheme.text}`}>
                      {icon}
                    </div>
                    <span className="font-bold tracking-tight text-white/90 group-hover:text-white">{link.title}</span>
                  </div>
                  <ExternalLink size={14} className="text-white/10 group-hover:text-white transition-opacity pr-2" />
                </a>
               )
            })}
          </div>

        </div>
      </PageTransition>
    </main>


  );
}
