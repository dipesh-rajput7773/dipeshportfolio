import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'otp-provider',
      name: 'OTP Login',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
        isOtpLogin: { label: "isOtpLogin", type: "boolean" }
      },
      async authorize(credentials) {
        if (!credentials?.email) throw new Error('Email is required');

        await dbConnect();
        const user = await User.findOne({ email: credentials.email.toLowerCase() });

        if (!user) throw new Error('No user found. Please Sign Up.');

        // 1. If it's a direct password login
        if (!credentials.isOtpLogin) {
            if (!user.password) throw new Error('Please set a password or use OTP login.');
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (!isValid) throw new Error('Incorrect password.');
            return { id: user._id.toString(), name: user.name, email: user.email };
        }

        // 2. If it's the final verification step for OTP
        if (user.otp !== credentials.otp) throw new Error('Invalid OTP.');
        if (user.otpExpires < new Date()) throw new Error('OTP expired.');

        user.otp = undefined;
        user.otpExpires = undefined;
        user.isVerified = true;
        await user.save();

        return { id: user._id.toString(), name: user.name, email: user.email };
      }
    })
  ],
  session: {
    strategy: 'jwt', // State of the art secure session
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Redirect users here if unauthorized
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
export { authOptions };
