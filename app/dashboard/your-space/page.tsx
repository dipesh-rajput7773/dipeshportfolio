'use client';

import { useState, useEffect } from 'react';
import { Space, User, LayoutDashboard, Link as LinkIcon, Plus, Save, ExternalLink, Globe, Trash2, Loader2, PenTool, Image as ImageIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { saveSpace, addSpaceLink, getSpace, deleteSpaceLink } from '@/lib/actions';
import Link from 'next/link';

export default function YourSpaceEditor() {
  const { data: session, status } = useSession();
  const isLoaded = status !== 'loading';
  const [formData, setFormData] = useState({ 
    username: '', 
    displayName: '', 
    bio: '', 
    avatarUrl: '', 
    theme: 'midnight' 
  });
  const [links, setLinks] = useState<any[]>([]);
  const [currentSpace, setCurrentSpace] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const themes = [
    { id: 'midnight', name: 'Midnight', bg: 'bg-[#050505]', preview: '#050505', text: 'text-white', border: 'border-white/10' },
    { id: 'sunset', name: 'Sunset', bg: 'bg-gradient-to-tr from-orange-600/30 via-[#050505] to-[#050505]', preview: '#ea580c', text: 'text-amber-500', border: 'border-orange-500/10' },
    { id: 'ocean', name: 'Ocean', bg: 'bg-gradient-to-tr from-blue-600/30 via-[#050505] to-[#050505]', preview: '#2563eb', text: 'text-sky-400', border: 'border-blue-500/10' },
    { id: 'forest', name: 'Forest', bg: 'bg-gradient-to-tr from-emerald-600/30 via-[#050505] to-[#050505]', preview: '#059669', text: 'text-emerald-400', border: 'border-emerald-500/10' },
    { id: 'neon', name: 'Neon', bg: 'bg-gradient-to-tr from-pink-600/30 via-[#050505] to-[#050505]', preview: '#db2777', text: 'text-pink-400', border: 'border-pink-500/20' },
    { id: 'silver', name: 'Silver', bg: 'bg-[#111]', preview: '#ffffff', text: 'text-zinc-100', border: 'border-white/5' },
    { id: 'glass', name: 'Frosted', bg: 'bg-[#080808]', preview: '#666', text: 'text-white', border: 'border-white/10' }
  ];

  // For Adding Link
  const [newLink, setNewLink] = useState({ title: '', url: '', icon: 'globe' });

  // Load existing data on mount
  useEffect(() => {
    const loadSpace = async () => {
      const result = await getSpace();
      if (result.success && result.data) {
        setFormData({
          username: result.data.username,
          displayName: result.data.displayName,
          bio: result.data.bio || '',
          avatarUrl: result.data.avatarUrl || '',
          theme: result.data.theme || 'midnight'
        });
        setLinks(result.data.links || []);
        setCurrentSpace(result.data);
      } else if (session?.user) {
        // Fallback to session info for first-time creators
        setFormData(prev => ({ 
            ...prev, 
            displayName: session.user?.name || '', 
            username: session.user?.name?.toLowerCase().replace(/\s/g, '-') || '' 
        }));
      }
    };

    if (status === 'authenticated') {
      loadSpace();
    }
  }, [session, status]);

  const handleSaveProfile = async (e: any) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccess(false);
    setError(null);

    const fData = new FormData();
    fData.append('username', formData.username);
    fData.append('displayName', formData.displayName);
    fData.append('bio', formData.bio);
    fData.append('avatarUrl', formData.avatarUrl);
    fData.append('theme', formData.theme);

    const result = await saveSpace(fData);
    if (result.success) {
      setSuccess(true);
      setCurrentSpace(result.data);
      setFormData({ 
        username: result.data.username, 
        displayName: result.data.displayName, 
        bio: result.data.bio || '',
        avatarUrl: result.data.avatarUrl || '',
        theme: result.data.theme || 'midnight'
      });
    } else {
      setError(result.error || 'Failed to save profile');
    }
    setIsSaving(false);
  };

  const handleAddLink = async () => {
    if (!newLink.title || !newLink.url) return;
    setIsSaving(true);
    const result = await addSpaceLink(newLink.title, newLink.url);
    if (result.success) {
      setLinks(result.links);
      setNewLink({ title: '', url: '', icon: 'globe' });
    }
    setIsSaving(false);
  };

  const handleDeleteLink = async (linkId: string) => {
    setIsSaving(true);
    const result = await deleteSpaceLink(linkId);
    if (result.success) {
      setLinks(result.links);
    }
    setIsSaving(false);
  };

  if (!isLoaded) return <div className="p-20 text-center"><Loader2 className="animate-spin inline mr-2"/>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Editor Form */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40 italic">Editor</h2>
            <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter leading-[0.9]">
              Build your <br />
              <span className="text-white/20">Space.</span>
            </h1>
            <p className="text-zinc-400 font-medium tracking-tight">Your personal, cinematic link page starts here.</p>
          </div>

          {/* Profile Section */}
          <form onSubmit={handleSaveProfile} className="glass p-8 rounded-[40px] space-y-8 border-white/5">
            <h4 className="text-xl font-display font-bold flex items-center gap-3">
              <PenTool size={20} className="text-white/40" /> Profile Meta
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Username URL</label>
                <div className="flex items-center gap-2 px-6 py-4 bg-white/5 rounded-2xl border border-white/5 focus-within:border-white/20 transition-colors">
                  <span className="text-white/20 text-xs">thedipverse.app/</span>
                  <input 
                    type="text" 
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="bg-transparent border-none outline-none text-white font-bold w-full"
                    placeholder="your-name" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Display Name</label>
                <input 
                  type="text" 
                  value={formData.displayName}
                  onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                  className="w-full px-6 py-4 bg-white/5 rounded-2xl border border-white/5 focus-within:border-white/20 outline-none text-white font-bold transition-all"
                  placeholder="Creative Name" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Avatar Photo URL</label>
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/5 flex-shrink-0 flex items-center justify-center overflow-hidden">
                   {formData.avatarUrl ? <img src={formData.avatarUrl} className="w-full h-full object-cover" /> : <User size={24} className="text-white/20" />}
                </div>
                <input 
                  type="text" 
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, avatarUrl: e.target.value }))}
                  className="w-full px-6 py-4 bg-white/5 rounded-2xl border border-white/5 focus-within:border-white/20 outline-none text-white font-bold transition-all"
                  placeholder="https://images..." 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Bio (Max 160)</label>
              <textarea 
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full px-6 py-4 bg-white/5 rounded-2xl border border-white/5 focus-within:border-white/20 outline-none text-zinc-300 font-medium transition-all"
                placeholder="I build cinematic experiences and software..." 
              />
            </div>

            <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Visual Theme</label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                    {themes.map(t => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, theme: t.id })}
                            className={`p-1 rounded-2xl border transition-all ${formData.theme === t.id ? 'border-white scale-110' : 'border-white/5 opacity-50 hover:opacity-100'}`}
                        >
                            <div style={{ backgroundColor: t.preview }} className="w-full aspect-square rounded-xl shadow-lg" />
                            <span className="text-[8px] font-bold uppercase mt-2 block">{t.name}</span>
                        </button>
                    ))}
                </div>
            </div>


            {error && <p className="text-red-400 text-xs font-bold">{error}</p>}
            {success && <p className="text-green-400 text-xs font-bold">Profile metadata updated!</p>}

            <button 
              type="submit" 
              disabled={isSaving}
              className="w-full py-5 bg-white text-black font-bold rounded-3xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20}/> : <Save size={20} />} Save Metadata
            </button>
          </form>

          {/* Links Section */}
          <div className="glass p-8 rounded-[40px] space-y-8 border-white/5">
            <h4 className="text-xl font-display font-bold flex items-center gap-3">
              <LinkIcon size={20} className="text-white/40" /> Active Links
            </h4>
            
            <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Link Title (e.g. My Portfolio)" 
                        value={newLink.title}
                        onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-6 py-4 bg-white/5 rounded-2xl border border-white/5 outline-none text-white text-sm"
                    />
                    <input 
                        type="text" 
                        placeholder="https://..." 
                        value={newLink.url}
                        onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                        className="w-full px-6 py-4 bg-white/5 rounded-2xl border border-white/5 outline-none text-white text-sm"
                    />
                    <button 
                        onClick={handleAddLink}
                        className="w-full py-4 bg-white/5 text-white/50 border border-white/5 hover:bg-white hover:text-black font-bold rounded-2xl transition-all flex justify-center items-center gap-2 text-xs uppercase tracking-widest"
                    >
                        <Plus size={16}/> Add Link to Space
                    </button>
                </div>

                {/* Real-time Link Listing */}
                <div className="space-y-3 pt-6">
                    {links.map((link) => (
                        <div 
                            key={link._id} 
                            className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/10 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-white/5 rounded-xl text-white/40">
                                    <Globe size={16} />
                                </div>
                                <div>
                                    <h6 className="text-sm font-bold tracking-tight text-white/80">{link.title}</h6>
                                    <p className="text-[10px] text-white/20 truncate max-w-[150px]">{link.url}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleDeleteLink(link._id)}
                                disabled={isSaving}
                                className="p-2 text-white/10 hover:text-red-500 transition-colors active:scale-95 disabled:opacity-50"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    {links.length === 0 && (
                        <p className="text-center py-8 text-xs font-bold uppercase tracking-[0.3em] text-white/10">No active links yet.</p>
                    )}
                </div>
            </div>

          </div>
        </div>

        {/* Right Side: Preview */}
        <div className="sticky top-40 h-fit space-y-8">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40 italic">Preview</h2>
            <p className="text-zinc-500 text-xs font-bold">This is how your live space looks to others.</p>
          </div>

          <div className={`w-full max-w-sm mx-auto overflow-hidden rounded-[60px] border-[12px] border-white/5 shadow-2xl relative transition-all duration-700 ${themes.find(t => t.id === formData.theme)?.bg}`}>
            <div className="h-[700px] overflow-y-auto p-8 text-center space-y-12">
               {/* Tiny Profile Header */}
               <div className="space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-tr from-white/20 to-transparent">
                    <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center border border-white/10 overflow-hidden">
                        {formData.avatarUrl ? <img src={formData.avatarUrl} className="w-full h-full object-cover" /> : <User size={24} className="text-white/20"/>}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-2xl font-display font-bold text-white tracking-tight">{formData.displayName || "Display Name"}</h5>
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${themes.find(t => t.id === formData.theme)?.text}`}>@{formData.username || "username"}</p>
                  </div>
                  <p className="text-xs text-zinc-400 font-medium max-w-[200px] mx-auto italic leading-relaxed">{formData.bio || "Write your story here..."}</p>
               </div>


               {/* Real-time Links Preview */}
               <div className="space-y-3">
                  {links.map((link: any) => (
                    <div 
                        key={link._id} 
                        className={`p-5 glass rounded-2xl border ${themes.find(t => t.id === formData.theme)?.border} text-left flex justify-between items-center hover:scale-[1.02] transition-transform`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`p-2 bg-white/5 rounded-lg opacity-40 ${themes.find(t => t.id === formData.theme)?.text}`}>
                                <Globe size={14}/>
                            </div>
                            <span className="text-xs font-bold tracking-tight text-white/90">{link.title}</span>
                        </div>
                        <ExternalLink size={12} className="text-white/20"/>
                    </div>
                  ))}
                  {links.length === 0 && (
                    <>
                        <div className="p-5 glass rounded-2xl border border-white/5 text-left flex justify-between items-center opacity-20">
                            <span className="text-xs font-bold tracking-tight">Your New Link</span>
                            <ExternalLink size={12}/>
                        </div>
                        <div className="p-5 glass rounded-2xl border border-white/5 text-left flex justify-between items-center opacity-10">
                            <span className="text-xs font-bold tracking-tight">Social Profile</span>
                            <ExternalLink size={12}/>
                        </div>
                    </>
                  )}
               </div>


               <div className="pt-20">
                    <Link 
                        href={`/${formData.username}`} 
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-white transition-all shadow-lg shadow-white/5 border border-white/10"
                    >
                         View Live Space <ExternalLink size={12}/>
                    </Link>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
