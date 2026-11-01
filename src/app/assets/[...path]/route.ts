import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// MIME types map
const MIME_TYPES: Record<string, string> = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.gif': 'image/gif',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.json': 'application/json',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params;
  if (!pathSegments || pathSegments.length === 0) {
    return new NextResponse('Not Found', { status: 404 });
  }

  // Prevent directory traversal
  const safeSegments = pathSegments.filter((seg) => !seg.includes('..') && !seg.includes('/') && !seg.includes('\\'));
  if (safeSegments.length !== pathSegments.length) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  const relativeSubpath = path.join('assets', ...safeSegments);

  // Search candidate directories where public assets may reside in standard or standalone builds
  const candidatePaths = [
    path.join(process.cwd(), 'public', relativeSubpath),
    path.join(process.cwd(), '.next', 'standalone', 'public', relativeSubpath),
    path.resolve('./public', relativeSubpath),
    path.join(__dirname, '..', '..', '..', '..', 'public', relativeSubpath),
    path.join(__dirname, '..', '..', '..', 'public', relativeSubpath),
  ];

  let targetPath = '';
  for (const candidate of candidatePaths) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      targetPath = candidate;
      break;
    }
  }

  if (!targetPath) {
    return new NextResponse(`Asset not found: ${relativeSubpath}`, { status: 404 });
  }

  try {
    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const fileBuffer = fs.readFileSync(targetPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Asset-Served-By': 'AppRouter-Fallback-Handler',
      },
    });
  } catch (error) {
    console.error('Error reading asset file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
