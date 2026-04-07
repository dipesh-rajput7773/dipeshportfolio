import { NextRequest, NextResponse } from 'next/server';

// Vapi.ai Outbound Call Integration
// To activate: Get your API key from https://vapi.ai and set VAPI_API_KEY + VAPI_PHONE_NUMBER_ID in .env.local

export async function POST(req: NextRequest) {
    try {
        const { phoneNumber } = await req.json();

        const vapiKey = process.env.VAPI_API_KEY;
        const phoneNumberId = process.env.VAPI_PHONE_NUMBER_ID;

        if (!vapiKey || !phoneNumberId) {
            return NextResponse.json({
                success: false,
                error: 'Voice call system not configured yet. Email thevisualdip@gmail.com to connect.'
            }, { status: 503 });
        }

        const response = await fetch('https://api.vapi.ai/call/phone', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${vapiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumberId,
                customer: { number: phoneNumber },
                assistant: {
                    name: 'DIP-AI',
                    firstMessage: "Hey! I'm DIP-AI, the assistant for thedipverse. How can I help you today?",
                    model: {
                        provider: 'groq',
                        model: 'llama-3.3-70b-versatile',
                        systemPrompt: `You are DIP-AI, the intelligent voice assistant for Dipesh Rajput — founder of thedipverse. 
                        Dipesh is a Full-Stack Developer, Cinematic Video Editor, and E-commerce Automation builder.
                        Services: Cinematic video editing, n8n automation workflows, and Next.js web development.
                        For pricing: "Dipesh works on project-based quotes — I'll have him reach out to you."
                        Keep responses short and conversational since this is a phone call. Be confident and professional.`,
                    },
                    voice: {
                        provider: 'playht',
                        voiceId: 'larry',
                    },
                    endCallFunctionEnabled: true,
                    transcriber: {
                        provider: 'deepgram',
                        language: 'en',
                    },
                },
            }),
        });

        if (!response.ok) {
            const err = await response.json();
            return NextResponse.json({ success: false, error: err.message || 'Call failed.' }, { status: 400 });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('[DIP-AI Call Error]', error);
        return NextResponse.json({ success: false, error: 'Call system error.' }, { status: 500 });
    }
}
