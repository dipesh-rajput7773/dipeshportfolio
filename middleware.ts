import middleware from 'next-auth/middleware';

export default middleware;

export const config = {
  // Protect all /dashboard/* routes except /dashboard/smart-link
  matcher: ['/dashboard/script-lab', '/dashboard/your-space', '/dashboard/analytics', '/dashboard'],
};
