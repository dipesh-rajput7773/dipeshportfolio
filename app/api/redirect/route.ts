import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Analytics from '@/models/Analytics';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const spaceId = searchParams.get('spaceId');
  const userId = searchParams.get('userId');
  const linkTitle = searchParams.get('linkTitle');

  if (!url) return NextResponse.json({ error: 'Exiting...' }, { status: 400 });

  // 1. Log Click to Database (Don't await, keep redirect fast)
  if (spaceId && userId && linkTitle) {
    try {
        await dbConnect();
        // Fire and forget
        Analytics.create({
            spaceId,
            userId,
            linkTitle: decodeURIComponent(linkTitle),
            browser: req.headers.get('user-agent') || 'unknown',
            ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
        }).catch(e => console.error("Anayltics Log Failed:", e));
    } catch (e) {
        console.error("DB Connect Anayltics Failed:", e);
    }
  }

  // 2. YouTube App Intent Logic
  let appUrl = url;
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (videoId) {
        appUrl = `vnd.youtube://${videoId}`;
    } else if (url.includes('/@') || url.includes('/channel/')) {
        appUrl = `vnd.youtube://www.youtube.com/${url.split('youtube.com/')[1]}`;
    }
  }

  // HTML to perform the redirect attempt
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Opening App...</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { background: #080808; color: #F0EDE8; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .loader { border: 2px solid #111; border-top: 2px solid #C41230; border-radius: 50%; width: 24px; height: 24px; animation: spin 1s linear infinite; margin-bottom: 20px; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          .content { text-align: center; }
        </style>
      </head>
      <body>
        <div class="content">
          <div class="loader"></div>
          <p style="font-size: 10px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; color: #6B6B6B;">Opening neural archive...</p>
        </div>
        <script>
          const appUrl = "${appUrl}";
          const webUrl = "${url}";
          window.location.replace(appUrl);
          setTimeout(() => {
            window.location.replace(webUrl);
          }, 1500);
        </script>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
