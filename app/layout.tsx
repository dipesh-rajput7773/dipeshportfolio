import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body suppressHydrationWarning className="bg-[#050505] text-zinc-300 antialiased selection:bg-white/20 selection:text-white">
        <AuthProvider>
          <div className="grain" />
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
