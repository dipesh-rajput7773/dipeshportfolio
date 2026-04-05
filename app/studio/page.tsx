import type { Metadata } from 'next';
import StudioClient from '@/components/StudioClient';

export const metadata: Metadata = {
    title: 'Launch the Studio | Creator Tools & Automation',
    description: 'AI-powered script generation, link optimization, and cinematic workflows for modern creators. Free access available.',
};

export default function StudioPage() {
    return <StudioClient />;
}
