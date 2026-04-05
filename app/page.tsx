import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
    title: 'Build. Automate. Scale.',
    description: 'High-performance tools and visual narratives for modern creators. Explore the thedipverse studio projects and tools.',
};

export default function Home() {
    return <HomeClient />;
}
