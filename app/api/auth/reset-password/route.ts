import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();
        if (!token || !password) {
            return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
        }
        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
        }

        await dbConnect();
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpires: { $gt: new Date() }, // token must not be expired
        });

        if (!user) {
            return NextResponse.json({ error: 'Reset link is invalid or has expired' }, { status: 400 });
        }

        // Hash new password and clear token
        user.password = await bcrypt.hash(password, 12);
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;
        await user.save();

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('Reset password error:', err);
        return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
    }
}
