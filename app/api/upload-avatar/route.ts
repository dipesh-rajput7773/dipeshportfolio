import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Space from '@/models/Space';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const session: any = await getServerSession(authOptions as any);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const formData = await req.formData();
        const file = formData.get('avatar') as File | null;
        if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

        // Validate size (max 2MB before base64)
        if (file.size > 2 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large. Max 2MB.' }, { status: 400 });
        }

        // Convert to base64 data URL
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        const dataUrl = `data:${file.type || 'image/jpeg'};base64,${base64}`;

        // Save to Space doc
        await dbConnect();
        const user = await User.findOne({ email: session.user.email });
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        await Space.findOneAndUpdate(
            { userId: user._id },
            { avatarUrl: dataUrl },
            { upsert: true }
        );

        return NextResponse.json({ avatarUrl: dataUrl });
    } catch (err) {
        console.error('Avatar upload error:', err);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
