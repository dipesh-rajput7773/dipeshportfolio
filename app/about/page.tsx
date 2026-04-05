import type { Metadata } from 'next';
import AboutClient from '@/components/AboutClient';

export const metadata: Metadata = {
    title: 'Engineering High-Retention Content',
    description: 'Building systems that drive engagement through deep technical logic and visual storytelling. Explore the narrative behind thedipverse studio.',
};

export default function AboutPage() {
    return <AboutClient />;
}
