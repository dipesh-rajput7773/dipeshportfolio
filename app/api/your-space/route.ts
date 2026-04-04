import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Space from '@/models/Space';
import User from '@/models/User';

export async function GET(req: Request) {
  try {
    const session: any = await getServerSession(authOptions as any);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const space = await Space.findOne({ userId: user._id });
    return NextResponse.json({ space });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch space' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session: any = await getServerSession(authOptions as any);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    await dbConnect();
    
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Ensure username is lowercased and URL safe
    const cleanUsername = body.username.toLowerCase().replace(/[^a-z0-9_-]/g, '');

    const space = await Space.findOneAndUpdate(
      { userId: user._id },
      { 
        userId: user._id, 
        username: cleanUsername,
        displayName: body.displayName,
        bio: body.bio,
        avatarUrl: body.avatarUrl,
        theme: body.theme || 'cinema-crimson',
        links: body.links,
        updatedAt: new Date()
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ space });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Username is already taken' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to save space' }, { status: 500 });
  }
}
