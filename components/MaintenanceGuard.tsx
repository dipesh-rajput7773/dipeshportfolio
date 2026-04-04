import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Settings from '@/models/Settings';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function MaintenanceGuard({ children }: { children: React.ReactNode }) {
  const session: any = await getServerSession(authOptions as any);
  const headList = await headers();
  const pathname = headList.get('x-invoke-path') || '';

  const authorizedAdmins = ['dipeshrajput2002@gmail.com', 'admin@thedipverse.com']; 
  const isAdmin = authorizedAdmins.includes(session?.user?.email);

  // 2. We skip maintenance check for admin access and maintenance page itself to avoid loops
  if (isAdmin || pathname.includes('/admin') || pathname.includes('/maintenance')) {
    return <>{children}</>;
  }

  // 3. Connect and check DB state
  try {
    await dbConnect();
    const settings = await Settings.findOne();
    
    if (settings?.maintenanceMode) {
        redirect('/maintenance');
    }
  } catch (err) {
     console.error('Maintenance Guard Failure:', err);
  }

  return <>{children}</>;
}
