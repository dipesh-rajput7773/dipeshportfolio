import { Metadata } from 'next';
import ScriptLab from '@/components/ScriptLab';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Script Lab | Dashboard',
  description: 'AI-powered script generation tool driven by the Dipverse data layer.',
};

export default function DashboardScriptLabPage() {
  return (
    <main className="pt-32 pb-20 overflow-x-hidden min-h-screen bg-[#050505]">
      <PageTransition>
        <ScriptLab />
      </PageTransition>
    </main>
  );
}
