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
  title: 'thedipverse | I Build. I Think. I Create.',
  description: 'MERN Developer | Cinematic Storyteller | Entrepreneur',
  verification: {
    google: 'Bcm0NF1xXrh9SZ3Olc6-XM-BWLRvA0w0IMe7BBx5SMg',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
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
