import middleware from 'next-auth/middleware';

export default middleware;

export const config = {
  matcher: ['/dashboard/script-lab', '/dashboard/bioverse', '/dashboard/analytics', '/dashboard'],
};
