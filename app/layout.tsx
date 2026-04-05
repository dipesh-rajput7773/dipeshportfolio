import type { Metadata } from 'next';
import { Inter, DM_Serif_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import MaintenanceGuard from '@/components/MaintenanceGuard';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'thedipverse Studio | Full-Stack Developer & Cinematic Video Editor',
    template: '%s | thedipverse Studio'
  },
  description: 'A high-retention studio engineering robust full-stack applications and professional cinematic visual narratives. Specializing in Next.js, n8n automation, and DaVinci Resolve editing.',
  keywords: ['Video Editor', 'Full-Stack Developer', 'Next.js Developer', 'Cinematic Video Editing', 'n8n Automation', 'Marketing Automation', 'Content Strategy'],
  authors: [{ name: 'thedipverse Studio' }],
  creator: 'thedipverse',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dipeshportfolio.vercel.app',
    title: 'thedipverse Studio | Build. Automate. Scale.',
    description: 'High-performance tools and visual storytelling for modern creators.',
    siteName: 'thedipverse Studio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'thedipverse Studio | Developer & Editor',
    description: 'Building tools and visual narratives for creators.',
    creator: '@thedipverse',
  },
  verification: {
    google: 'Bcm0NF1xXrh9SZ3Olc6-XM-BWLRvA0w0IMe7BBx5SMg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="bg-background text-warm-white antialiased selection:bg-crimson/30 selection:text-white">
        <AuthProvider>
          <div className="grain" />
          <Navbar />
          <MaintenanceGuard>
            {children}
          </MaintenanceGuard>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
