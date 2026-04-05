import type { Metadata } from 'next';
import ProjectsClient from '@/components/ProjectsClient';

export const metadata: Metadata = {
    title: 'Selected Systems | Full-Stack & Video Projects',
    description: 'Explore the technical architectures and cinematic experiments engineered by thedipverse studio.',
};

export default function ProjectsPage() {
    return <ProjectsClient />;
}
