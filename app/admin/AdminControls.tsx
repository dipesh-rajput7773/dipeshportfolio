'use client';

import { useState } from 'react';
import { Power, Zap, Trash2, Loader2, Save, User as UserIcon, Search, TrendingUp, Users, Terminal, CreditCard, Bell, Sparkles } from 'lucide-react';

interface AdminControlsProps {
    initialSettings: any;
    initialUsers: any[];
    totalCreditsValue: number;
    totalAnalytics: number;
}

export default function AdminControls({ initialSettings, initialUsers, totalCreditsValue, totalAnalytics }: AdminControlsProps) {
    const [settings, setSettings] = useState(initialSettings);
    const [users, setUsers] = useState(initialUsers);
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(u => 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [alert, setAlert] = useState(settings.globalAlert || { message: '', level: 'info', active: false });
    const [prompt, setPrompt] = useState(settings.dailyPrompt || { title: '', body: '', niche: 'Any' });

    const toggleMaintenance = async () => {
        setIsUpdating('maintenance');
        try {
            const res = await fetch('/api/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'toggle-maintenance', payload: !settings.maintenanceMode })
            });
            if (res.ok) {
                const data = await res.json();
                setSettings(data.settings);
            }
        } catch (err) {
            console.error('Maintenance Toggle Error:', err);
        } finally {
            setIsUpdating(null);
        }
    };

    const handleSaveGlobalSignals = async () => {
        setIsUpdating('signals');
        try {
            const res = await fetch('/api/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    action: 'update-global-signals', 
                    payload: { globalAlert: alert, dailyPrompt: prompt } 
                })
            });
            if (res.ok) {
                const data = await res.json();
                setSettings(data.settings);
                window.alert('SIGNAL CALIBRATED: Global changes applied.');
            }
        } catch (err) {
            console.error('Save Signals Error:', err);
        } finally {
            setIsUpdating(null);
        }
    };

    const handleUpdateCredits = async (userId: string, currentCredits: number) => {
        const newCreditsStr = window.prompt('Enter new credit balance:', currentCredits.toString());
        if (newCreditsStr === null) return;
        const newCredits = parseInt(newCreditsStr);
        if (isNaN(newCredits)) return;

        setIsUpdating(userId);
        try {
            const res = await fetch('/api/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'update-user-credits', payload: { userId, credits: newCredits } })
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(users.map(u => u._id === userId ? data.user : u));
            }
        } catch (err) {
            console.error('Update Credits Error:', err);
        } finally {
            setIsUpdating(null);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        if (!window.confirm('Are you absolutely sure? This will delete the creator and all their archives.')) return;

        setIsUpdating(userId);
        try {
            const res = await fetch('/api/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete-user', payload: { userId } })
            });
            if (res.ok) {
                setUsers(users.filter(u => u._id !== userId));
            }
        } catch (err) {
            console.error('Delete User Error:', err);
        } finally {
            setIsUpdating(null);
        }
    };

    return (
        <div className="space-y-12 pb-20">
            
            {/* Control Panel Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-slate-200 pb-8">
                <div className="space-y-1">
                    <h1 className="text-3xl font-sans font-extrabold tracking-tight text-slate-900 text-left">
                        Master Operations Hub
                    </h1>
                    <p className="text-sm text-slate-500 font-medium tracking-tight">Platform Governance Control Center — V1.0</p>
                </div>
                
                <button 
                    onClick={toggleMaintenance}
                    disabled={isUpdating === 'maintenance'}
                    className={`px-6 py-3 border rounded-lg font-sans text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-4 shadow-sm ${settings.maintenanceMode ? 'border-crimson bg-crimson text-white' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
                >
                    <Power size={14} />
                    {isUpdating === 'maintenance' ? 'Processing...' : settings.maintenanceMode ? 'Maintenance: ON' : 'Maintenance: OFF'}
                </button>
            </div>

            {/* Platform Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Creators', value: users.length, icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50' },
                    { label: 'Total Credits', value: totalCreditsValue, icon: Zap, color: 'text-amber-600', bgColor: 'bg-amber-50' },
                    { label: 'System Analytics', value: totalAnalytics, icon: Terminal, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
                    { label: 'Projected Revenue', value: '₹0.00', icon: CreditCard, color: 'text-crimson', bgColor: 'bg-red-50' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm transition-all hover:shadow-md hover:border-slate-300 flex flex-col justify-between">
                         <div className="flex justify-between items-start pb-6">
                             <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                <stat.icon size={20} className={stat.color} />
                             </div>
                             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none pt-2">{stat.label}</span>
                         </div>
                         <h3 className="text-4xl font-sans font-bold text-slate-900 items-baseline gap-2 leading-none">
                            {stat.value}
                         </h3>
                    </div>
                ))}
            </div>

            {/* Dynamic Operations Hub */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                 {/* Editorial Broadcast Center */}
                 <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 p-6 border-b border-slate-100 bg-slate-50/50">
                        <Bell size={16} className="text-crimson" />
                        <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-slate-700">Editorial Broadcast</h2>
                    </div>
                    <div className="p-8 space-y-6 flex-1 text-left">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[11px] text-slate-500 uppercase font-bold tracking-widest">Global Action Banner</label>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase">{alert.active ? 'Status: Active' : 'Status: Off'}</span>
                                    <input 
                                        type="checkbox" 
                                        checked={alert.active}
                                        onChange={(e) => setAlert({...alert, active: e.target.checked})}
                                        className="accent-crimson h-5 w-5 cursor-pointer"
                                    />
                                </div>
                            </div>
                            <textarea 
                                value={alert.message}
                                onChange={(e) => setAlert({...alert, message: e.target.value})}
                                placeholder="What is the platform's current announcement?"
                                className="w-full bg-slate-50 border border-slate-200 p-5 rounded-lg text-sm text-slate-800 font-sans min-h-[120px] outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all resize-none shadow-inner"
                            />
                            <div className="space-y-2">
                                <label className="text-[11px] text-slate-500 uppercase font-bold tracking-widest block">Alert Authority Level</label>
                                <select 
                                    value={alert.level}
                                    onChange={(e) => setAlert({...alert, level: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-lg text-xs font-sans font-bold uppercase tracking-widest text-slate-700 outline-none focus:border-crimson"
                                >
                                    <option value="info">General Info (Slate)</option>
                                    <option value="warning">Engagement (Amber)</option>
                                    <option value="critical">Platform Alert (Crimson)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                 </div>

                 {/* Daily Neural Feed Center */}
                 <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
                    <div className="flex items-center gap-2 p-6 border-b border-slate-100 bg-slate-50/50">
                        <Sparkles size={16} className="text-amber-500" />
                        <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-slate-700 text-left">Daily Creator Fuel</h2>
                    </div>
                    <div className="p-8 space-y-6 flex-1 text-left">
                        <div className="space-y-4">
                            <label className="text-[11px] text-slate-500 uppercase font-bold tracking-widest block">Viral Concept Title</label>
                            <input 
                                value={prompt.title}
                                onChange={(e) => setPrompt({...prompt, title: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-lg text-sm text-slate-800 font-sans outline-none focus:border-crimson shadow-inner"
                                placeholder="The Architecture of Silence..."
                            />
                            <label className="text-[11px] text-slate-500 uppercase font-bold tracking-widest pt-2 block">Full Creative Blueprint</label>
                            <textarea 
                                value={prompt.body}
                                onChange={(e) => setPrompt({...prompt, body: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 p-5 rounded-lg text-sm text-slate-800 font-sans min-h-[120px] outline-none focus:border-crimson transition-all resize-none shadow-inner"
                                placeholder="Describe today's Viral strategy..."
                            />
                        </div>
                    </div>
                 </div>
            </section>

            {/* Global Signal Save Button */}
            <div className="flex justify-start">
                 <button 
                    onClick={handleSaveGlobalSignals}
                    disabled={isUpdating === 'signals'}
                    className="px-10 py-5 bg-slate-900 hover:bg-black text-white rounded-xl font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-4 shadow-xl disabled:opacity-50"
                 >
                    {isUpdating === 'signals' ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    Sync Global Operations
                 </button>
            </div>

            {/* Platform Management Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-10 border-t border-slate-200">
                 {/* User Management List */}
                 <div className="lg:col-span-2 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 border border-slate-200 rounded-xl shadow-sm text-left">
                        <div className="space-y-1">
                            <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-slate-800">Verified Creator Directory</h2>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">Auditing {filteredUsers.length} active identities</p>
                        </div>
                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input 
                                type="text" 
                                placeholder="Global Search..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-slate-50 border border-slate-200 rounded-lg p-3 pl-12 text-sm text-slate-800 font-sans focus:ring-1 focus:ring-crimson focus:border-crimson outline-none transition-all w-full md:w-80"
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 text-[11px] font-sans font-bold uppercase text-slate-500 border-b border-slate-200 text-left">
                                    <th className="p-6">CREATOR IDENTITY</th>
                                    <th className="p-6 text-center">ACCESS RANK</th>
                                    <th className="p-6 text-center">NEURAL POWER</th>
                                    <th className="p-6 text-right">OPERATIONS</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-sans">
                                {filteredUsers.map((u) => (
                                    <tr key={u._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                        <td className="p-6 font-semibold text-slate-800 text-left">{u.email}</td>
                                        <td className="p-6 text-center">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${u.tier === 'admin' ? 'bg-crimson/10 text-crimson' : 'bg-slate-100 text-slate-500'}`}>
                                                {u.tier || 'CREATOR'}
                                            </span>
                                        </td>
                                        <td className="p-6 text-center font-bold text-slate-700">{u.credits || 0}</td>
                                        <td className="p-6 text-right">
                                            <div className="flex justify-end gap-3 text-slate-400">
                                                <button onClick={() => handleUpdateCredits(u._id, u.credits)} className="p-2 hover:bg-slate-100 rounded-lg hover:text-amber-500 transition-all">
                                                    <Zap size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteUser(u._id)}
                                                    disabled={u.tier === 'admin' || isUpdating === u._id}
                                                    className="p-2 hover:bg-slate-100 rounded-lg hover:text-crimson disabled:opacity-50 transition-all"
                                                >
                                                    {isUpdating === u._id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </div>

                 {/* System Signals & Activity */}
                 <div className="space-y-8">
                    <div className="bg-white p-8 border border-slate-200 rounded-xl shadow-sm space-y-6">
                        <div className="flex items-center gap-2 text-slate-700 border-b border-slate-100 pb-4">
                            <TrendingUp size={16} />
                            <h2 className="text-sm font-sans font-bold uppercase tracking-wider">Activity Pulse</h2>
                        </div>
                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar text-left">
                             {[1, 2, 3, 4, 5, 6].map(i => (
                                 <div key={i} className="text-xs bg-slate-50 border border-slate-100 p-5 rounded-lg space-y-3 relative overflow-hidden group hover:border-slate-300 transition-all">
                                     <div className="flex justify-between items-start">
                                        <p className="text-slate-800 font-semibold leading-relaxed pr-8">
                                            Creator #{Math.floor(Math.random() * 9999)} just shared their Live Space.
                                        </p>
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                     </div>
                                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                                        3m ago / global-telemetry
                                     </p>
                                 </div>
                             ))}
                        </div>
                    </div>
                 </div>
            </section>
        </div>
    );
}
