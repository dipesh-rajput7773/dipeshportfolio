import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    await dbConnect();

    // 1. Check if user has enough credits
    const user = await User.findOne({ clerkId: clerkUser.id });
    if (!user) {
      return NextResponse.json({ error: 'User profile not found. Please visit dashboard first.' }, { status: 404 });
    }

    if (user.credits <= 0 && user.tier !== 'admin') {
      return NextResponse.json({ 
        error: 'You have run out of credits. Credits reset every 24 hours (feature coming soon) or can be topped up.' 
      }, { status: 403 });
    }

    // 2. Generate Content via Gemini
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });

    const instructions = `
      You are a specialist storyteller and content specialist. 
      The user has an idea for a reel: "${prompt}".
      Generate 2 unique, high-engagement reel scripts based on this idea.
      Each script must include:
      1. Hook (First 3 seconds)
      2. Body (Value/Story)
      3. CTA (Call to Action)
      4. Visual cues/descriptions.
      Format the output clearly with "Script 1" and "Script 2" headers.
    `;

    const result = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: instructions
    });
    const scriptText = result.text;

    // 3. Deduct 1 credit (only for non-admins)
    if (user.tier !== 'admin') {
      user.credits -= 1;
      await user.save();
    }

    return NextResponse.json({ 
      content: scriptText, 
      remainingCredits: user.credits 
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
