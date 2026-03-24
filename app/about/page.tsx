import { Metadata } from 'next';
import About from '@/components/About';
import Skills from '@/components/Skills';
import CreatorSection from '@/components/CreatorSection';
import BusinessSection from '@/components/BusinessSection';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'About | thedipverse',
  description: 'The journey of a disciplined builder, MERN stack developer, and cinematic storyteller.',
};

export default function AboutPage() {
  return (
    <main className="pt-24 pb-20 overflow-x-hidden">
      <PageTransition>
        <About />
        <Skills />
        <CreatorSection />
        <BusinessSection />
      </PageTransition>
    </main>
  );
}
