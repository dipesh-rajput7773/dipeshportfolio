import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Settings from '@/models/Settings';

const authorizedAdmins = ['dipeshrajput2002@gmail.com', 'admin@thedipverse.com'];

export async function GET(req: Request) {
    try {
        const session: any = await getServerSession(authOptions as any);
        if (!session || !authorizedAdmins.includes(session.user?.email)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const settings = await Settings.findOne() || await Settings.create({});
        return NextResponse.json({ settings });
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session: any = await getServerSession(authOptions as any);
        if (!session || !authorizedAdmins.includes(session.user?.email)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { action, payload } = await req.json();
        await dbConnect();

        switch (action) {
            case 'toggle-maintenance':
                const settings = await Settings.findOneAndUpdate(
                    {}, 
                    { maintenanceMode: payload }, 
                    { upsert: true, new: true }
                );
                return NextResponse.json({ settings });

            case 'update-user-credits':
                const user = await User.findByIdAndUpdate(
                    payload.userId,
                    { credits: payload.credits },
                    { new: true }
                );
                return NextResponse.json({ user });

            case 'delete-user':
                await User.findByIdAndDelete(payload.userId);
                return NextResponse.json({ success: true });

            default:
                return NextResponse.json({ error: 'Invalid Action' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to execute action' }, { status: 500 });
    }
}
