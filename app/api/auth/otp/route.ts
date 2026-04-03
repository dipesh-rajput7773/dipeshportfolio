import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json(); // ✅ ONLY ONCE

    const { email, name, mobileNumber, isSignup, password } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

    await dbConnect();

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    let user = await User.findOne({ email: email.toLowerCase() });

    if (isSignup) {
      if (user) {
        return NextResponse.json(
          { error: 'Email already registered. Sign In instead.' },
          { status: 400 }
        );
      }

      if (!password || password.length < 6) {
        return NextResponse.json(
          { error: 'Password must be 6+ chars' },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      user = await User.create({
        email: email.toLowerCase(),
        name: name || 'Creator',
        password: hashedPassword,
        mobileNumber: mobileNumber || 'N/A',
        otp: otpCode,
        otpExpires: expires,
        credits: 5,
        browser: userAgent,
        ipAddress: ip,
      });

    } else {
      if (!user) {
        return NextResponse.json(
          { error: 'Account not found. Please Sign Up.' },
          { status: 404 }
        );
      }

      user.otp = otpCode;
      user.otpExpires = expires;
      user.browser = userAgent;
      user.ipAddress = ip;
      user.lastLogin = Date.now();

      await user.save();
    }

    // Email sending
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"thedipverse" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Your specialist portal code: ${otpCode}`,
      html: `...`,
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('OTP API Error:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP. Please check server logs.' },
      { status: 500 }
    );
  }
}
