'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Save, ExternalLink, Loader2, Image as ImageIcon, Music, GripVertical, Rocket, Upload, Copy } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import Link from 'next/link';
import { storage, ref, uploadBytes, getDownloadURL } from '@/lib/firebase';

interface LinkItem {
  title: string;
  url: string;
  icon?: string;
  isMusic?: boolean;
}

export default function YourSpaceEditor() {
  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    avatarUrl: '',
    username: '',
    theme: 'cinema-crimson'
  });
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `avatars/${profile.username || 'unnamed'}-${Date.now()}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setProfile({ ...profile, avatarUrl: url });
    } catch (err) {
      console.error('Upload Error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/your-space');
        if (res.ok) {
          const data = await res.json();
          if (data.space) {
            setProfile({
              displayName: data.space.displayName || '',
              bio: data.space.bio || '',
              avatarUrl: data.space.avatarUrl || '',
              username: data.space.username || '',
              theme: data.space.theme || 'cinema-crimson'
            });
            setLinks(data.space.links || []);
          }
        }
      } catch (err) {
        console.error('Fetch Error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAddLink = () => {
    setLinks([...links, { title: '', url: '' }]);
  };

  const handleLinkChange = (index: number, field: keyof LinkItem, value: any) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/your-space', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profile, links })
      });
      if (res.ok) {
        // Success feedback
      }
    } catch (err) {
      console.error('Save Error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-warm-white pt-32 pb-20 px-6">
      <PageTransition>
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-warm-white/5 pb-12">
             <div className="space-y-4">
                <label className="mono text-crimson text-xs font-bold uppercase tracking-[0.5em]">005 — SPACE ENGINE</label>
                <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tighter leading-[0.8]">
                   Design your <br />
                   <span className="text-muted italic">Digital Home.</span>
                </h1>
             </div>
             <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-10 py-5 bg-crimson text-white mono text-xs font-bold uppercase tracking-widest flex items-center gap-4 hover:bg-red-700 transition-all disabled:opacity-50 shadow-2xl shadow-crimson/20"
             >
                {isSaving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>}
                [ COMMIT CHANGES ]
             </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            
            {/* Editor Side */}
            <section className="space-y-16">
                
                {/* 0. Public URL Vault */}
                <div className="editorial-card p-6 border border-crimson/20 bg-crimson/[0.02] flex flex-col md:flex-row items-center justify-between gap-6 group">
                    <div className="space-y-1">
                        <label className="mono text-[10px] text-crimson font-bold uppercase tracking-[0.4em]">LIVE ARCHIVE LINK</label>
                        <p className="font-display text-xl md:text-2xl italic tracking-tighter text-warm-white">
                            thedipverse.com/<span className="text-crimson decoration-wavy underline underline-offset-4">{profile.username || 'yourname'}</span>
                        </p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/${profile.username}`);
                                alert('ARCHIVE LINK COPIED.');
                            }}
                            className="flex-1 md:flex-none px-6 py-3 border border-warm-white/10 hover:border-crimson transition-all mono text-[10px] uppercase tracking-widest flex items-center justify-center gap-3"
                        >
                            <Copy size={12} />
                            [ COPY ]
                        </button>
                        <Link 
                            href={`/${profile.username}`} 
                            target="_blank"
                            className="p-3 border border-warm-white/10 hover:border-crimson transition-all text-muted hover:text-crimson"
                        >
                            <ExternalLink size={16} />
                        </Link>
                    </div>
                </div>

                {/* 1. Identity */}
                <div className="space-y-10">
                    <h2 className="text-2xl font-display italic font-bold border-l-4 border-crimson pl-6">01. Identity Matrix</h2>
                    <div className="space-y-8">
                        <div className="flex items-center gap-8">
                            <div className="w-20 h-20 rounded-full bg-warm-white/2 border border-warm-white/10 flex items-center justify-center overflow-hidden relative group">
                                {profile.avatarUrl ? (
                                    <img src={profile.avatarUrl} className="w-full h-full object-cover" />
                                ) : (
                                    <Rocket size={24} className="text-muted/10" />
                                )}
                                {isUploading && (
                                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                        <Loader2 className="animate-spin text-crimson" size={16} />
                                    </div>
                                )}
                            </div>
                            <label className="px-6 py-3 border border-warm-white/10 hover:border-crimson transition-all mono text-[10px] uppercase tracking-widest cursor-pointer flex items-center gap-2">
                                <Upload size={12} />
                                [ UPLOAD AVATAR ]
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="mono text-[10px] text-muted uppercase tracking-widest">Public Username</label>
                                <input 
                                    type="text" value={profile.username} onChange={(e) => setProfile({...profile, username: e.target.value})}
                                    placeholder="YOURNAME"
                                    className="w-full bg-warm-white/2 border border-warm-white/5 p-4 mono text-xs focus:border-crimson outline-none transition-all uppercase"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="mono text-[10px] text-muted uppercase tracking-widest">Display Name</label>
                                <input 
                                    type="text" value={profile.displayName} onChange={(e) => setProfile({...profile, displayName: e.target.value})}
                                    placeholder="DIPESH RAJPUT"
                                    className="w-full bg-warm-white/2 border border-warm-white/5 p-4 mono text-xs focus:border-crimson outline-none transition-all uppercase"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="mono text-[10px] text-muted uppercase tracking-widest">Short Biography</label>
                            <textarea 
                                value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})}
                                placeholder="I BUILD EXPERIENCES. NOT JUST APPS." rows={3}
                                className="w-full bg-warm-white/2 border border-warm-white/5 p-4 mono text-xs focus:border-crimson outline-none transition-all uppercase"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Content Links */}
                <div className="space-y-10">
                    <div className="flex justify-between items-end">
                        <h2 className="text-2xl font-display italic font-bold border-l-4 border-crimson pl-6">02. The Vault (Links)</h2>
                        <button onClick={handleAddLink} className="mono text-[10px] text-crimson hover:text-white transition-colors flex items-center gap-2">
                            [ + ADD LINK ]
                        </button>
                    </div>

                    <div className="space-y-4">
                        {links.map((link, index) => (
                            <div key={index} className="editorial-card p-6 flex gap-6 items-center group relative">
                                <GripVertical className="text-muted/20" size={18} />
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input 
                                        type="text" value={link.title} onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                                        placeholder="LINK LABEL (e.g., INSTAGRAM)"
                                        className="bg-transparent border-b border-warm-white/10 focus:border-crimson outline-none mono text-[10px] uppercase p-2 tracking-widest"
                                    />
                                    <input 
                                        type="text" value={link.url} onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                                        placeholder="HTTPS://..."
                                        className="bg-transparent border-b border-warm-white/10 focus:border-crimson outline-none mono text-[10px] p-2 tracking-tight opacity-50 focus:opacity-100"
                                    />
                                </div>
                                <button onClick={() => handleRemoveLink(index)} className="text-muted hover:text-crimson transition-all p-2">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </section>

            {/* Preview Side */}
            <section className="sticky top-40 space-y-10 hidden lg:block">
                <div className="space-y-2">
                    <h2 className="text-2xl font-display italic font-bold tracking-tight text-center">Neural Preview.</h2>
                    <p className="mono text-[10px] text-muted uppercase tracking-widest text-center">// How the world sees your archive.</p>
                </div>

                <div className="iphone-frame-mockup mx-auto w-[320px] h-[640px] border-8 border-warm-white/10 rounded-[3rem] p-4 relative overflow-hidden bg-background">
                     <div className="w-full h-full space-y-10 overflow-y-auto pr-2 custom-scrollbar flex flex-col items-center pt-10">
                        {/* Mock Persona */}
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 bg-warm-white/5 border border-crimson/30 rounded-full mx-auto flex items-center justify-center">
                                <Rocket className="text-crimson" size={32} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-display text-2xl tracking-tighter truncate max-w-[200px]">{profile.displayName || 'CREATOR'}</h3>
                                <p className="mono text-[8px] uppercase tracking-widest text-muted truncate max-w-[150px]">{profile.username ? `@${profile.username}` : 'HANDLE'}</p>
                            </div>
                            <p className="mono text-[9px] lowercase text-muted/60 max-w-[180px] leading-relaxed italic line-clamp-3">
                                {profile.bio || '// your cinematic bio starts here...'}
                            </p>
                        </div>

                        {/* Mock Links */}
                        <div className="w-full space-y-3">
                            {links.filter(l => l.title).map((link, i) => (
                                <div key={i} className="w-full p-4 border border-warm-white/10 text-center mono text-[10px] uppercase tracking-widest hover:border-crimson transition-all cursor-default">
                                    {link.title}
                                </div>
                            ))}
                            {links.length === 0 && (
                                [1,2,3].map(i => (
                                    <div key={i} className="w-full p-4 border border-warm-white/5 text-center opacity-10 mono text-[9px] uppercase tracking-widest">
                                        LINK_SLOT_0{i}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Mock Footer */}
                        <div className="mt-auto pt-10 opacity-20 mono text-[8px] uppercase tracking-widest">
                            thedipverse. ENGINE
                        </div>
                     </div>
                </div>
            </section>

          </div>

        </div>
      </PageTransition>
    </main>
  );
}
