import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('google-site-verification: googlee2326d23d9418ce1.html', {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
