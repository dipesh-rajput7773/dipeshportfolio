import { Metadata } from 'next';
import ScriptLab from '@/components/ScriptLab';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Script Lab | thedipverse',
  description: 'AI-powered script generation tool for cinematic storytelling and high-engagement content.',
};

export default function ScriptLabPage() {
  return (
    <main className="pt-24 pb-20 overflow-x-hidden">
      <PageTransition>
        <ScriptLab />
      </PageTransition>
    </main>
  );
}
