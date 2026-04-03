'use server';

import dbConnect from '@/lib/mongodb';
import Space from '@/models/Space';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function saveSpace(formData: any) {
  try {
    const session: any = await getServerSession(authOptions as any);
    if (!session || !session.user) return { error: 'Unauthorized' };

    await dbConnect();
    const userId = (session.user as any).id;

    const username = formData.get('username').toLowerCase().replace(/[^a-z0-9_-]/g, '');
    const displayName = formData.get('displayName');
    const bio = formData.get('bio');
    const avatarUrl = formData.get('avatarUrl');
    const theme = formData.get('theme');
    
    // Simple reserved usernames check
    const reserved = ['about', 'projects', 'contact', 'dashboard', 'api', 'admin'];
    if (reserved.includes(username)) {
        return { error: 'This username is reserved. Please try another one.' };
    }

    // Check if username is taken by another user
    const existingSpaceByUsername = await Space.findOne({ username });
    if (existingSpaceByUsername && existingSpaceByUsername.userId !== userId) {
      return { error: 'Username already taken.' };
    }

    // Parse links from formData (complex implementation for now)
    // Here we'll just handle basic metadata for the first pass
    
    const updatedSpace = await Space.findOneAndUpdate(
      { userId: userId },
      {
        userId: userId,
        username,
        displayName: displayName || (session.user as any).name || 'User',
        bio,
        avatarUrl: avatarUrl || '',
        theme: theme || 'midnight',
        updatedAt: Date.now(),
      },
      { upsert: true, new: true }
    );

    revalidatePath(`/${username}`);
    revalidatePath('/dashboard/your-space');
    
    return { success: true, data: JSON.parse(JSON.stringify(updatedSpace)) };
  } catch (error: any) {
    console.error('Save error:', error);
    return { error: 'Failed to save space. Server Error.' };
  }
}

export async function addSpaceLink(title: string, url: string, icon: string = 'globe') {
    try {
        const session: any = await getServerSession(authOptions as any);
        if (!session || !session.user) return { error: 'Unauthorized' };

        await dbConnect();
        const userId = (session.user as any).id;

        const updated = await Space.findOneAndUpdate(
            { userId: userId },
            { $push: { links: { title, url, icon } } },
            { new: true }
        );

        return { success: true, links: JSON.parse(JSON.stringify(updated.links)) };
    } catch (error: any) {
        return { error: 'Failed to add link' };
    }
}

export async function getSpace() {
  try {
    const session: any = await getServerSession(authOptions as any);
    if (!session || !session.user) return { error: 'Unauthorized' };

    await dbConnect();
    const userId = (session.user as any).id;
    const space = await Space.findOne({ userId });
    
    if (!space) return { success: false, error: 'No space found' };

    return { success: true, data: JSON.parse(JSON.stringify(space)) };
  } catch (error: any) {
    return { error: 'Failed to fetch space' };
  }
}

export async function deleteSpaceLink(linkId: string) {
  try {
    const session: any = await getServerSession(authOptions as any);
    if (!session || !session.user) return { error: 'Unauthorized' };

    await dbConnect();
    const userId = (session.user as any).id;
    
    const updated = await Space.findOneAndUpdate(
      { userId: userId },
      { $pull: { links: { _id: linkId } } },
      { new: true }
    );

    return { success: true, links: JSON.parse(JSON.stringify(updated.links)) };
  } catch (error: any) {
    return { error: 'Failed to delete link' };
  }
}
