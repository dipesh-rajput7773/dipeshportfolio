import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
    try {
        await dbConnect();

        const adminEmail = 'admin@thedipverse.com';
        const hashedPassword = await bcrypt.hash('admin_neural_2024', 10);

        // Check if admin exists
        let user = await User.findOne({ email: adminEmail });

        if (user) {
            user.password = hashedPassword;
            user.tier = 'admin';
            user.credits = 99999;
            await user.save();
            return NextResponse.json({ message: 'Master Admin already existed. Credentials/Credits Reset.', email: adminEmail });
        }

        // Create new Admin
        user = await User.create({
            name: 'Master Admin',
            email: adminEmail,
            password: hashedPassword,
            tier: 'admin',
            credits: 99999
        });

        return NextResponse.json({ 
            message: 'Master Admin Vault successfully initialized.', 
            email: adminEmail,
            tempPassword: 'admin_neural_2024'
        });
    } catch (error) {
        console.error('Master Setup Failure:', error);
        return NextResponse.json({ error: 'Failed to initialize core admin.' }, { status: 500 });
    }
}
