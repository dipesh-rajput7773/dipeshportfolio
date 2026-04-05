import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import FreeUsage from '@/models/FreeUsage';

const FREE_LIMIT = 5;

// Helper to extract real IP from request headers
function getIP(req: NextRequest): string {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    if (forwarded) return forwarded.split(',')[0].trim();
    if (realIp) return realIp.trim();
    return 'unknown';
}

// GET /api/free-usage?tool=smart-link
// Returns current usage status for this IP + tool
export async function GET(req: NextRequest) {
    const tool = req.nextUrl.searchParams.get('tool') as 'smart-link' | 'script-lab' | null;
    if (!tool || !['smart-link', 'script-lab'].includes(tool)) {
        return NextResponse.json({ error: 'Invalid tool' }, { status: 400 });
    }

    const ip = getIP(req);

    try {
        await dbConnect();
        const record = await FreeUsage.findOne({ ip, tool });
        const count = record?.count || 0;
        const remaining = Math.max(0, FREE_LIMIT - count);
        const exceeded = count >= FREE_LIMIT;

        return NextResponse.json({ count, remaining, exceeded, limit: FREE_LIMIT });
    } catch (err) {
        console.error('FreeUsage GET error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

// POST /api/free-usage
// Body: { tool: 'smart-link' | 'script-lab' }
// Increments use count if under limit. Returns updated status.
export async function POST(req: NextRequest) {
    const body = await req.json();
    const tool = body?.tool as 'smart-link' | 'script-lab' | null;

    if (!tool || !['smart-link', 'script-lab'].includes(tool)) {
        return NextResponse.json({ error: 'Invalid tool' }, { status: 400 });
    }

    const ip = getIP(req);

    try {
        await dbConnect();

        // Find existing record
        let record = await FreeUsage.findOne({ ip, tool });

        if (!record) {
            record = await FreeUsage.create({ ip, tool, count: 0 });
        }

        // Already exceeded — don't increment, just return exceeded
        if (record.count >= FREE_LIMIT) {
            return NextResponse.json({
                count: record.count,
                remaining: 0,
                exceeded: true,
                limit: FREE_LIMIT,
            });
        }

        // Increment
        record.count += 1;
        record.lastUsed = new Date();
        await record.save();

        const remaining = Math.max(0, FREE_LIMIT - record.count);
        const exceeded = record.count >= FREE_LIMIT;

        return NextResponse.json({ count: record.count, remaining, exceeded, limit: FREE_LIMIT });
    } catch (err) {
        console.error('FreeUsage POST error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
