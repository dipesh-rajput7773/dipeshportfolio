import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Groq from 'groq-sdk';

export async function POST(req: Request) {
  try {
    const session: any = await getServerSession(authOptions as any);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, userData } = await req.json();
    if (!type || !userData) {
      return NextResponse.json({ error: 'Type and userData are required' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Credits Check
    if (user.credits <= 0 && user.tier !== 'admin') {
      return NextResponse.json({ error: 'Zero credits remaining. Upgrade for more power.' }, { status: 403 });
    }

    // Rate Limit Check (30 seconds for free users)
    if (user.tier !== 'admin' && user.lastGeneratedAt) {
      const secondsSinceLast = (Date.now() - new Date(user.lastGeneratedAt).getTime()) / 1000;
      if (secondsSinceLast < 30) {
        return NextResponse.json({
          error: `System Cooling Down. Wait ${Math.ceil(30 - secondsSinceLast)} seconds.`
        }, { status: 429 });
      }
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'Groq Engine is not configured yet. Add GROQ_API_KEY to your env.' }, { status: 500 });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    let systemPrompt = "";
    let userPrompt = "";

    switch (type) {
      case 'niche':
        systemPrompt = `You are a content strategy expert for short-form creators. Identify the user's content niche in ONE sharp sentence. Suggest 3 sub-niches they can own. Output ONLY JSON:
        {
          "niche": "...",
          "sub_niches": ["...", "...", "..."],
          "why": "..."
        }`;
        userPrompt = `Q1: ${userData.q1} | Q2: ${userData.q2} | Q3: ${userData.q3}`;
        break;

      case 'ideas':
        systemPrompt = `You are a viral content strategist. Generate exactly 7 content ideas for the given niche. Use scroll-stopping angles for 30-60 second reels. Output ONLY JSON:
        {
          "ideas": [
            { "title": "...", "angle": "...", "why_it_works": "..." }
          ]
        }`;
        userPrompt = `Niche is ${userData.niche}. Generate ideas.`;
        break;

      case 'script':
        systemPrompt = `You are an expert short-form scriptwriter.
        1. Pick formula (PAS, STORY, CONTRARIAN, LIST).
        2. Write full script (150-200 words max). Use Hindi-English if content requires.
        Output ONLY JSON:
        {
          "formula_used": "...",
          "formula_reason": "...",
          "script": { "hook": "...", "body": ["...", "...", "..."], "cta": "..." },
          "estimated_duration": "60s"
        }`;
        userPrompt = `Topic is — ${userData.idea}`;
        break;

      case 'carousel':
        systemPrompt = `You are an Instagram carousel expert. Generate a 5-slide carousel for the topic. Slides MAX 15 words. Include caption and 15 hashtags. Output ONLY JSON:
        {
          "slides": [
            {"slide_number": 1, "heading": "...", "body": "..."}
          ],
          "caption": "...",
          "hashtags": ["...", "..."]
        }`;
        userPrompt = `Topic is — ${userData.topic}`;
        break;

      default:
        return NextResponse.json({ error: 'Invalid tool type' }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'llama-3.1-70b-versatile',
      response_format: { type: 'json_object' }
    });

    const data = JSON.parse(completion.choices[0].message.content || '{}');

    // Deduct 1 credit & Update delay
    if (user.tier !== 'admin') {
      user.credits -= 1;
      user.lastGeneratedAt = new Date();
      await user.save();
    }

    // Log tool analytics
    try {
      const ToolAnalytics = (await import('@/models/ToolAnalytics')).default;
      await ToolAnalytics.create({
        userId: String(user._id),
        tool: 'script-lab',
        action: 'generate',
        meta: { scriptType: type },
      });
    } catch (_) { } // non-critical, never block the response

    return NextResponse.json({ data, remainingCredits: user.credits });

  } catch (error: any) {
    console.error('Groq Engine Error:', error);
    return NextResponse.json({ error: 'AI processing failed. Check your API key or try again.' }, { status: 500 });
  }
}
