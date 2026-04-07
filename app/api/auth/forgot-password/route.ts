import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

        await dbConnect();
        const user = await User.findOne({ email: email.toLowerCase() });

        // Always return success to prevent email enumeration
        if (!user) {
            return NextResponse.json({ ok: true });
        }

        // Generate a secure token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

        user.resetToken = resetToken;
        user.resetTokenExpires = resetTokenExpires;
        await user.save();

        const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"thedipverse" <${process.env.SMTP_USER}>`,
            to: user.email,
            subject: 'Reset your password — thedipverse',
            html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #f8f7ff; padding: 40px 32px; border-radius: 16px;">
          <h1 style="font-size: 24px; font-weight: 800; color: #1a1a2e; margin: 0 0 8px;">Reset your password</h1>
          <p style="font-size: 15px; color: #6b7280; margin: 0 0 28px;">We received a request to reset your password for your thedipverse account. Click the button below within <strong>1 hour</strong>.</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: #fff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 15px;">
            Reset Password
          </a>
          <p style="font-size: 12px; color: #9ca3af; margin: 24px 0 0;">If you didn't request this, you can safely ignore this email. Your password will remain unchanged.</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="font-size: 11px; color: #d1d5db; margin: 0;">thedipverse Studio · thedipverse.vercel.app</p>
        </div>
      `,
        });

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('Forgot password error:', err);
        return NextResponse.json({ error: 'Failed to send reset email' }, { status: 500 });
    }
}
