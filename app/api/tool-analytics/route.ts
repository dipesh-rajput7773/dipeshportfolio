import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import ToolAnalytics from '@/models/ToolAnalytics';

export async function POST(req: Request) {
    try {
        const session: any = await getServerSession(authOptions as any);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { tool, action, meta } = await req.json();
        // tool: 'script-lab' | 'smart-link'
        // action: e.g. 'generate', 'convert'
        // meta: optional extra data like script type

        await dbConnect();
        const user = await User.findOne({ email: session.user.email });
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        await ToolAnalytics.create({
            userId: String(user._id),
            tool,
            action,
            meta: meta || {},
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to log' }, { status: 500 });
    }
}
