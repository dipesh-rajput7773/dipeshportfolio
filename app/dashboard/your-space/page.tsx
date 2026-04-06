'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus, Trash2, Save, ExternalLink, Loader2,
  GripVertical, Upload, Copy, Check,
  Link2, Palette, Eye, Sparkles, ChevronRight, Camera,
  Instagram, Github, Twitter, Youtube, Globe, Music, Mail
} from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import Link from 'next/link';
import AvatarCropper from '@/components/AvatarCropper';

interface LinkItem {
  title: string;
  url: string;
  icon?: string;
}

// Background presets - user-friendly, NOT cinematic
const BG_PRESETS = [
  { id: 'soft-purple', label: 'Purple Haze', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: '#fff' },
  { id: 'sunset', label: 'Sunset', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', text: '#fff' },
  { id: 'ocean', label: 'Ocean Blue', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', text: '#fff' },
  { id: 'forest', label: 'Forest', value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', text: '#1a1a1a' },
  { id: 'peach', label: 'Peach', value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', text: '#1a1a1a' },
  { id: 'midnight', label: 'Midnight', value: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', text: '#fff' },
  { id: 'rose', label: 'Rose Gold', value: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)', text: '#fff' },
  { id: 'sky', label: 'Sky', value: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', text: '#1a1a1a' },
  { id: 'dark', label: 'Dark', value: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', text: '#fff' },
  { id: 'cream', label: 'Cream', value: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', text: '#1a1a1a' },
  { id: 'neon', label: 'Neon', value: 'linear-gradient(135deg, #13547a 0%, #80d0c7 100%)', text: '#fff' },
  { id: 'lavender', label: 'Lavender', value: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', text: '#1a1a1a' },
];

function getIconForUrl(url: string) {
  const u = url.toLowerCase();
  if (u.includes('instagram.com')) return <Instagram size={14} />;
  if (u.includes('github.com')) return <Github size={14} />;
  if (u.includes('twitter.com') || u.includes('x.com')) return <Twitter size={14} />;
  if (u.includes('youtube.com')) return <Youtube size={14} />;
  if (u.includes('spotify.com')) return <Music size={14} />;
  if (u.includes('mailto:') || u.includes('mail')) return <Mail size={14} />;
  return <Globe size={14} />;
}

export default function YourSpaceEditor() {
  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    avatarUrl: '',
    username: '',
    theme: 'soft-purple'
  });
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'links' | 'theme'>('profile');
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentBg = BG_PRESETS.find(b => b.id === profile.theme) ?? BG_PRESETS[0];

  // Step 1: user picks file → open cropper
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // reset so same file can be re-selected
    e.target.value = '';
    const reader = new FileReader();
    reader.onload = () => setCropSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Step 2: cropper done → upload via server route (no Firebase CORS issues)
  const handleCropDone = async (blob: Blob) => {
    setCropSrc(null);
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append('avatar', blob, 'avatar.jpg');
      const res = await fetch('/api/upload-avatar', { method: 'POST', body: form });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setProfile(prev => ({ ...prev, avatarUrl: data.avatarUrl }));
    } catch (err) {
      console.error('Upload Error:', err);
      alert('Avatar upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };


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
              theme: data.space.theme || 'soft-purple'
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
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Save Error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${profile.username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#f8f7ff] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
          <p style={{ fontFamily: "'Inter', sans-serif" }} className="text-gray-500 text-sm">Loading your space...</p>
        </div>
      </main>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <Camera size={15} /> },
    { id: 'links', label: 'Links', icon: <Link2 size={15} /> },
    { id: 'theme', label: 'Background', icon: <Palette size={15} /> },
  ] as const;

  return (
    <>
      {/* Avatar Crop Modal */}
      {cropSrc && (
        <AvatarCropper
          imageSrc={cropSrc}
          onCropDone={handleCropDone}
          onCancel={() => setCropSrc(null)}
        />
      )}

      <main
        style={{ fontFamily: "'Inter', 'DM Sans', sans-serif", background: '#f8f7ff', minHeight: '100vh' }}
        className="pt-24 pb-20 px-4 md:px-8"
      >
        <PageTransition>
          {/* Header */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={16} className="text-purple-500" />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: '#8b5cf6', textTransform: 'uppercase' }}>
                    Your Space
                  </span>
                </div>
                <h1 style={{ fontFamily: "'DM Sans', 'Inter', sans-serif", fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, color: '#1a1a2e', lineHeight: 1.15 }}>
                  Customize your Space
                </h1>
                <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '6px' }}>
                  Your Linktree alternative — one link, everything you are.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Live Link + Copy */}
                {profile.username && (
                  <div style={{ background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: '12px', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>thedipverse.com/<strong style={{ color: '#1a1a2e' }}>{profile.username}</strong></span>
                    <button onClick={handleCopy} style={{ color: copied ? '#10b981' : '#8b5cf6', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                    </button>
                    <Link href={`/${profile.username}`} target="_blank" style={{ color: '#9ca3af', display: 'flex' }}>
                      <ExternalLink size={14} />
                    </Link>
                  </div>
                )}

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  style={{
                    background: saveSuccess ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '10px 22px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 15px rgba(139,92,246,0.35)',
                    opacity: isSaving ? 0.7 : 1
                  }}
                >
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : saveSuccess ? <Check size={16} /> : <Save size={16} />}
                  {saveSuccess ? 'Saved!' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>

          {/* Main Layout */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">

            {/* Editor Panel */}
            <div style={{ background: '#fff', borderRadius: '20px', border: '1.5px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>

              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: '1.5px solid #f3f4f6', padding: '0 24px' }}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      padding: '16px 20px',
                      fontSize: '13px',
                      fontWeight: activeTab === tab.id ? 700 : 500,
                      color: activeTab === tab.id ? '#7c3aed' : '#6b7280',
                      borderBottom: activeTab === tab.id ? '2.5px solid #7c3aed' : '2.5px solid transparent',
                      marginBottom: '-1.5px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{ padding: '28px' }}>
                <AnimatePresence mode="wait">

                  {/* Profile Tab */}
                  {activeTab === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
                    >
                      {/* Avatar with crop-on-click */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div
                          style={{ position: 'relative', flexShrink: 0, cursor: 'pointer' }}
                          onClick={() => !isUploading && fileInputRef.current?.click()}
                          title="Click to change photo"
                          className="group/avatar"
                        >
                          <div style={{
                            width: '90px', height: '90px', borderRadius: '50%',
                            overflow: 'hidden', background: currentBg.value,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                          }}>
                            {profile.avatarUrl ? (
                              <img src={profile.avatarUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Avatar" />
                            ) : (
                              <span style={{ fontSize: '28px', fontWeight: 800, color: currentBg.text }}>
                                {profile.displayName ? profile.displayName[0].toUpperCase() : '?'}
                              </span>
                            )}
                          </div>
                          {/* Hover / loading overlay */}
                          <div style={{
                            position: 'absolute', inset: 0, borderRadius: '50%',
                            background: 'rgba(0,0,0,0)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s',
                          }} className="group-hover/avatar:!bg-black/50">
                            {isUploading
                              ? <Loader2 className="animate-spin" size={22} color="#fff" />
                              : <Camera size={20} color="#fff" style={{ opacity: 0 }} className="group-hover/avatar:!opacity-100 transition-opacity" />
                            }
                          </div>
                        </div>
                        <div>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: '8px',
                              padding: '9px 18px', borderRadius: '10px', cursor: 'pointer',
                              border: '1.5px solid #e5e7eb', fontSize: '13px', fontWeight: 600,
                              color: '#374151', background: '#fff', transition: 'all 0.2s',
                              opacity: isUploading ? 0.6 : 1,
                            }}
                            className="hover:border-purple-400 hover:text-purple-600"
                          >
                            {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                            {profile.avatarUrl ? 'Change Photo' : 'Upload Photo'}
                          </button>
                          <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '6px' }}>Select image · adjust &amp; crop in circle</p>
                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileSelect}
                            disabled={isUploading}
                          />
                        </div>
                      </div>

                      {/* Username + Display Name */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                            Username <span style={{ color: '#ef4444' }}>*</span>
                          </label>
                          <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: '#9ca3af' }}>@</span>
                            <input
                              type="text"
                              value={profile.username}
                              onChange={(e) => setProfile({ ...profile, username: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                              placeholder="yourname"
                              style={{
                                width: '100%', padding: '11px 12px 11px 28px', borderRadius: '10px',
                                border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none',
                                transition: 'border-color 0.2s', boxSizing: 'border-box', color: '#1a1a2e'
                              }}
                              className="focus:border-purple-400"
                            />
                          </div>
                          <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '5px' }}>thedipverse.com/{profile.username || 'yourname'}</p>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Display Name</label>
                          <input
                            type="text"
                            value={profile.displayName}
                            onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                            placeholder="Your Name"
                            style={{
                              width: '100%', padding: '11px 12px', borderRadius: '10px',
                              border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none',
                              transition: 'border-color 0.2s', boxSizing: 'border-box', color: '#1a1a2e'
                            }}
                            className="focus:border-purple-400"
                          />
                        </div>
                      </div>

                      {/* Bio */}
                      <div>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Bio</label>
                        <textarea
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                          placeholder="Write a short bio about yourself..." rows={3}
                          maxLength={150}
                          style={{
                            width: '100%', padding: '11px 12px', borderRadius: '10px',
                            border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none',
                            transition: 'border-color 0.2s', resize: 'none', boxSizing: 'border-box',
                            color: '#1a1a2e', lineHeight: 1.6
                          }}
                          className="focus:border-purple-400"
                        />
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '5px', textAlign: 'right' }}>{profile.bio.length}/150</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Links Tab */}
                  {activeTab === 'links' && (
                    <motion.div
                      key="links"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e' }}>Your Links</p>
                          <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{links.length} link{links.length !== 1 ? 's' : ''} added</p>
                        </div>
                        <button
                          onClick={handleAddLink}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '7px',
                            padding: '9px 18px', borderRadius: '10px', border: 'none',
                            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                            color: '#fff', fontSize: '13px', fontWeight: 700,
                            cursor: 'pointer', boxShadow: '0 3px 12px rgba(139,92,246,0.3)'
                          }}
                        >
                          <Plus size={15} />
                          Add Link
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <AnimatePresence>
                          {links.map((link, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '16px', borderRadius: '14px',
                                border: '1.5px solid #e5e7eb', background: '#fafafa'
                              }}
                            >
                              <GripVertical size={16} color="#d1d5db" style={{ flexShrink: 0, cursor: 'grab' }} />

                              {/* Link icon preview */}
                              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: currentBg.value, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: currentBg.text }}>
                                {link.url ? getIconForUrl(link.url) : <Link2 size={14} />}
                              </div>

                              <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '10px' }}>
                                <input
                                  type="text"
                                  value={link.title}
                                  onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                                  placeholder="Link title (eg: Instagram)"
                                  style={{
                                    padding: '9px 12px', borderRadius: '8px',
                                    border: '1.5px solid #e5e7eb', fontSize: '13px',
                                    outline: 'none', color: '#1a1a2e', background: '#fff'
                                  }}
                                  className="focus:border-purple-400"
                                />
                                <input
                                  type="url"
                                  value={link.url}
                                  onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                                  placeholder="https://..."
                                  style={{
                                    padding: '9px 12px', borderRadius: '8px',
                                    border: '1.5px solid #e5e7eb', fontSize: '13px',
                                    outline: 'none', color: '#1a1a2e', background: '#fff'
                                  }}
                                  className="focus:border-purple-400"
                                />
                              </div>

                              <button
                                onClick={() => handleRemoveLink(index)}
                                style={{ padding: '8px', borderRadius: '8px', border: 'none', background: '#fee2e2', color: '#ef4444', cursor: 'pointer', display: 'flex', flexShrink: 0, transition: 'all 0.2s' }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        {links.length === 0 && (
                          <div style={{ textAlign: 'center', padding: '48px 20px', border: '2px dashed #e5e7eb', borderRadius: '16px' }}>
                            <Link2 size={32} color="#d1d5db" style={{ margin: '0 auto 12px' }} />
                            <p style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>No links yet</p>
                            <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>Click "Add Link" to get started</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Theme/Background Tab */}
                  {activeTab === 'theme' && (
                    <motion.div
                      key="theme"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>
                        Choose a background for your public link page. Your visitors will see this.
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
                        {BG_PRESETS.map((bg) => (
                          <button
                            key={bg.id}
                            onClick={() => setProfile({ ...profile, theme: bg.id })}
                            style={{
                              borderRadius: '14px', overflow: 'hidden', cursor: 'pointer',
                              border: profile.theme === bg.id ? '3px solid #7c3aed' : '3px solid transparent',
                              outline: profile.theme === bg.id ? '2px solid #c4b5fd' : 'none',
                              transition: 'all 0.2s', padding: 0, background: 'none',
                              boxShadow: profile.theme === bg.id ? '0 4px 16px rgba(124,58,237,0.3)' : 'none'
                            }}
                          >
                            <div style={{ width: '100%', height: '70px', background: bg.value, position: 'relative' }}>
                              {profile.theme === bg.id && (
                                <div style={{ position: 'absolute', top: '8px', right: '8px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Check size={12} color="#7c3aed" />
                                </div>
                              )}
                            </div>
                            <div style={{ padding: '8px', background: '#fff', textAlign: 'center' }}>
                              <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>{bg.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Live Preview */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <Eye size={13} />
                  Live Preview
                </span>
              </div>

              {/* Phone Frame */}
              <div style={{
                width: '280px', margin: '0 auto', background: '#1a1a2e',
                borderRadius: '36px', padding: '12px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08) inset'
              }}>
                <div style={{ background: currentBg.value, borderRadius: '26px', overflow: 'hidden', height: '560px' }}>
                  <div style={{ padding: '32px 20px 24px', overflowY: 'auto', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>

                    {/* Avatar Preview */}
                    <div style={{
                      width: '72px', height: '72px', borderRadius: '50%',
                      background: 'rgba(255,255,255,0.25)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      border: '3px solid rgba(255,255,255,0.4)',
                      overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}>
                      {profile.avatarUrl ? (
                        <img src={profile.avatarUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Avatar" />
                      ) : (
                        <span style={{ fontSize: '22px', fontWeight: 800, color: currentBg.text, opacity: 0.9 }}>
                          {profile.displayName ? profile.displayName[0].toUpperCase() : '?'}
                        </span>
                      )}
                    </div>

                    {/* Name & Bio */}
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', fontWeight: 800, color: currentBg.text, margin: 0, opacity: 0.95 }}>
                        {profile.displayName || 'Your Name'}
                      </p>
                      {profile.username && (
                        <p style={{ fontSize: '11px', fontWeight: 500, color: currentBg.text, opacity: 0.65, margin: '3px 0 0' }}>
                          @{profile.username}
                        </p>
                      )}
                      {profile.bio && (
                        <p style={{ fontSize: '11px', color: currentBg.text, opacity: 0.75, marginTop: '8px', lineHeight: 1.5, maxWidth: '200px' }}>
                          {profile.bio}
                        </p>
                      )}
                    </div>

                    {/* Link Buttons Preview */}
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '9px', marginTop: '4px' }}>
                      {links.filter(l => l.title).map((link, i) => (
                        <div key={i} style={{
                          width: '100%', padding: '11px 16px',
                          borderRadius: '12px', textAlign: 'center',
                          background: 'rgba(255,255,255,0.25)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255,255,255,0.35)',
                          fontSize: '12px', fontWeight: 700,
                          color: currentBg.text,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ opacity: 0.8 }}>{getIconForUrl(link.url)}</span>
                          {link.title}
                        </div>
                      ))}
                      {links.length === 0 && [1, 2, 3].map(i => (
                        <div key={i} style={{
                          width: '100%', height: '38px', borderRadius: '12px',
                          background: 'rgba(255,255,255,0.15)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          boxSizing: 'border-box'
                        }} />
                      ))}
                    </div>

                    {/* Footer Branding */}
                    <div style={{ marginTop: 'auto', paddingTop: '12px', opacity: 0.45 }}>
                      <p style={{ fontSize: '10px', fontWeight: 600, color: currentBg.text, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        thedipverse
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Live Link */}
              {profile.username && (
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <Link
                    href={`/${profile.username}`}
                    target="_blank"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      fontSize: '13px', fontWeight: 600, color: '#7c3aed',
                      textDecoration: 'none'
                    }}
                  >
                    <Eye size={14} />
                    View live page
                    <ChevronRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </PageTransition>

        {/* Google Fonts */}
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        input:focus, textarea:focus {
          border-color: #a78bfa !important;
          box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.15);
        }
      `}</style>
      </main>
    </>
  );
}
