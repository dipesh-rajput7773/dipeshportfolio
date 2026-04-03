import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) return NextResponse.json({ error: 'Exiting...' }, { status: 400 });

  // YouTube App Intent Logic
  let appUrl = url;
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    // Extract video ID or Channel ID
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
          body { background: #050505; color: white; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .loader { border: 2px solid #333; border-top: 2px solid #fff; border-radius: 50%; width: 24px; height: 24px; animation: spin 1s linear infinite; margin-bottom: 20px; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          .content { text-align: center; }
        </style>
      </head>
      <body>
        <div class="content">
          <div class="loader"></div>
          <p style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; color: #666;">Opening in App...</p>
        </div>
        <script>
          const appUrl = "${appUrl}";
          const webUrl = "${url}";
          
          // Attempt 1: Open App
          window.location.replace(appUrl);
          
          // Attempt 2: Fallback to Web after 1.5 seconds if app doesn't open
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
