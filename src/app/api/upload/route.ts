import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, folder = 'portfolio', name = 'project' } = body;

    if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
      return NextResponse.json(
        { error: 'Invalid image data. Expected base64 data URI.' },
        { status: 400 }
      );
    }

    // Parse mime type and base64 buffer
    const match = image.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
    if (!match) {
      return NextResponse.json({ error: 'Failed to parse image data' }, { status: 400 });
    }

    let ext = match[1].toLowerCase();
    if (ext === 'jpeg') ext = 'jpg';
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, 'base64');

    // Clean folder name to prevent path traversal
    const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '') || 'portfolio';
    const cleanName = name
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, '-')
      .replace(/[^a-zA-Z0-9\u0600-\u06FF-]/g, '')
      .slice(0, 40) || 'custom-image';

    const timestamp = Date.now();
    const filename = `saudi-${safeFolder}-${cleanName}-${timestamp}.${ext}`;

    const relativeSubpath = path.join('assets', 'images', safeFolder);
    const primaryDir = path.join(process.cwd(), 'public', relativeSubpath);

    if (!fs.existsSync(primaryDir)) {
      fs.mkdirSync(primaryDir, { recursive: true });
    }

    const filePath = path.join(primaryDir, filename);
    fs.writeFileSync(filePath, buffer);

    // Also mirror to standalone directory if Next.js was built in standalone mode
    const standaloneDir = path.join(process.cwd(), '.next', 'standalone', 'public', relativeSubpath);
    if (fs.existsSync(standaloneDir)) {
      try {
        fs.writeFileSync(path.join(standaloneDir, filename), buffer);
      } catch (e) {
        console.warn('Could not mirror upload to standalone dir:', e);
      }
    }

    const publicUrl = `/assets/images/${safeFolder}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      sizeBytes: buffer.length,
      filename,
    });
  } catch (error: any) {
    console.error('Image upload failed:', error);
    return NextResponse.json(
      { error: 'Image upload failed', details: error?.message },
      { status: 500 }
    );
  }
}
