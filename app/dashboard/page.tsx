import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { LayoutDashboard, Sparkles, UserCircle, Settings, Rocket, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const session: any = await getServerSession(authOptions as any);

  if (!session) {
    redirect('/login');
  }

  const userEmail = session.user?.email;

  // SYNC logic: Save/Update user in your MongoDB database
  await dbConnect();

  let mongoUser;
  try {
    mongoUser = await User.findOne({ email: userEmail });
    if (!mongoUser) {
        // Fallback: Create user if they don't exist for some reason
        mongoUser = await User.create({ email: userEmail, name: session.user?.name || 'Creator' });
    }
  } catch (error) {
    console.error('MongoDB Dashboard Fetch Failed:', error);
    mongoUser = { name: session.user?.name, credits: 0, email: userEmail };
  }

  const tools = [
    {
      name: 'Script Lab',
      description: 'Generate high-retention AI scripts instantly.',
      href: '/dashboard/script-lab',
      icon: <Sparkles className="text-zinc-500 group-hover:text-white transition-colors" size={32} />,
      status: 'Ready',
    },
    {
      name: 'Your Space',
      description: 'The premium Linktree alternative. Built for creators.',
      href: '/dashboard/your-space',
      icon: <Rocket className="text-zinc-500 group-hover:text-white transition-colors" size={32} />,
      status: 'Ready',
    },
    {
      name: 'Smart Link Hub',
      description: 'Convert any URL to an "Open in App" smart link instantly.',
      href: '/dashboard/smart-link',
      icon: <LinkIcon className="text-zinc-500 group-hover:text-white transition-colors" size={32} />,
      status: 'Ready',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">Portal</h2>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.9]">
              Welcome, <br />
              <span className="text-white/20">{mongoUser.name || 'Creator'}.</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
            <div className="p-3 rounded-2xl bg-white/5 text-white">
              <span className="text-2xl font-bold">{mongoUser.credits}</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40">Available Credits</p>
              <p className="text-sm font-bold text-white">Generation Engine</p>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-white/5">
          {tools.map((tool) => (
            <Link 
              key={tool.name} 
              href={tool.href}
              className={`p-10 glass rounded-[40px] space-y-8 group transition-all hover:scale-[1.02] ${tool.status === 'Development' ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="p-5 rounded-3xl bg-white/5 group-hover:bg-white text-white/50 group-hover:text-black transition-all">
                  {tool.icon}
                </div>
                <span className={`px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${tool.status === 'Ready' ? 'border-green-500/50 text-green-500' : 'border-white/10 text-white/40'}`}>
                  {tool.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-3xl font-display font-bold text-white tracking-tight">{tool.name}</h3>
                <p className="text-zinc-400 font-medium tracking-tight leading-relaxed max-w-sm">
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer/Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/5 opacity-50">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/5 rounded-xl"><UserCircle size={20}/></div>
            <p className="text-sm font-medium tracking-tight">Syncing to: {mongoUser.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/5 rounded-xl"><LayoutDashboard size={20}/></div>
            <p className="text-sm font-medium tracking-tight">System Status: 100% Operational</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/5 rounded-xl"><Settings size={20}/></div>
            <p className="text-sm font-medium tracking-tight">Manage Preferences</p>
          </div>
        </div>

      </div>
    </div>
  );
}
