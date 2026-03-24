import { Metadata } from 'next';
import Contact from '@/components/Contact';
import PageTransition from '@/components/PageTransition';

export const metadata: Metadata = {
  title: 'Contact | thedipverse',
  description: 'Get in touch for collaborations, freelance work, or simply to connect.',
};

export default function ContactPage() {
  return (
    <main className="pt-24 pb-20 overflow-x-hidden">
      <PageTransition>
        <Contact />
      </PageTransition>
    </main>
  );
}
