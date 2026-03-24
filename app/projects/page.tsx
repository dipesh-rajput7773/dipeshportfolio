import { Metadata } from 'next';
import Projects from '@/components/Projects';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Projects | thedipverse',
  description: 'Portfolio of work including full-stack web applications, AI tools, and creative digital experiences.',
};

export default function ProjectsPage() {
  return (
    <main className="pt-24 pb-20 overflow-x-hidden">
      <PageTransition>
        <Projects />
      </PageTransition>
    </main>
  );
}
