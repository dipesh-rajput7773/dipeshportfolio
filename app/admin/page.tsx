import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Settings from '@/models/Settings';
import Analytics from '@/models/Analytics';
import PageTransition from '@/components/PageTransition';
import AdminControls from './AdminControls';

export default async function AdminDashboard() {
  const session: any = await getServerSession(authOptions as any);
  const headList = await headers();
  const pathname = headList.get('x-invoke-path') || '';

  const authorizedAdmins = ['dipeshrajput2002@gmail.com', 'admin@thedipverse.com']; 
  const isAdmin = authorizedAdmins.includes(session?.user?.email);

  // Hardcore Security: Only you can pass.
  if (!session || !authorizedAdmins.includes(session.user?.email)) {
    redirect('/dashboard');
  }

  await dbConnect();
  
  // Dashboard Metrics & Data
  const usersData = await User.find().sort({ createdAt: -1 });
  const totalCreditsValue = usersData.reduce((acc, u) => acc + (u.credits || 0), 0);
  const totalAnalytics = await Analytics.countDocuments();
  const settingsData = await Settings.findOne() || await Settings.create({});

  // Serialize Mongoose data for Client Component
  const users = JSON.parse(JSON.stringify(usersData));
  const settings = JSON.parse(JSON.stringify(settingsData));

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-10 md:pt-16 pb-20 px-4 md:px-6 relative z-50">
      {/* Absolute Emergency Style Override for Admin Bright Mode */}
      <style dangerouslySetInnerHTML={{ __html: `
        html, body { 
          background-color: #f8fafc !important; 
          color: #0f172a !important; 
        }
        nav, footer { display: none !important; }
        * { border-color: rgba(15, 23, 42, 0.1) !important; }
      ` }} />

      <div className="max-w-7xl mx-auto">
          <AdminControls 
            initialSettings={settings} 
            initialUsers={users} 
            totalCreditsValue={totalCreditsValue}
            totalAnalytics={totalAnalytics}
          />
      </div>
    </main>
  );
}
