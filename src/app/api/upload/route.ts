import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let buffer: Buffer;
    let ext = 'webp';
    let folder = 'portfolio';
    let name = 'project';
    let mediaType: 'image' | 'video' = 'image';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      folder = ((formData.get('folder') as string) || 'portfolio').trim();
      name = ((formData.get('name') as string) || 'project').trim();

      if (!file) {
        return NextResponse.json({ error: 'لم يتم إرفاق ملف' }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);

      const mime = (file.type || '').toLowerCase();
      const origExt = path.extname(file.name || '').replace('.', '').toLowerCase();

      if (mime.startsWith('video/') || ['mp4', 'webm', 'mov', 'm4v'].includes(origExt)) {
        mediaType = 'video';
        ext = ['mp4', 'webm', 'mov'].includes(origExt) ? origExt : 'mp4';
      } else {
        mediaType = 'image';
        if (mime.includes('png') || origExt === 'png') ext = 'png';
        else if (mime.includes('jpeg') || mime.includes('jpg') || origExt === 'jpg' || origExt === 'jpeg') ext = 'jpg';
        else ext = 'webp';
      }
    } else {
      const body = await request.json();
      const { image, folder: bodyFolder = 'portfolio', name: bodyName = 'project' } = body;
      folder = bodyFolder;
      name = bodyName;

      if (!image || typeof image !== 'string' || (!image.startsWith('data:image/') && !image.startsWith('data:video/'))) {
        return NextResponse.json(
          { error: 'Invalid media data. Expected base64 data URI.' },
          { status: 400 }
        );
      }

      const match = image.match(/^data:(image|video)\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
      if (!match) {
        return NextResponse.json({ error: 'Failed to parse media data' }, { status: 400 });
      }

      mediaType = match[1] === 'video' ? 'video' : 'image';
      ext = match[2].toLowerCase();
      if (ext === 'jpeg') ext = 'jpg';
      if (ext === 'quicktime') ext = 'mov';
      buffer = Buffer.from(match[3], 'base64');
    }

    const safeFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '') || 'portfolio';
    const cleanName =
      name
        .trim()
        .toLowerCase()
        .replace(/[\s_]+/g, '-')
        .replace(/[^a-zA-Z0-9\u0600-\u06FF-]/g, '')
        .slice(0, 40) || 'custom-media';

    const timestamp = Date.now() + '-' + Math.floor(Math.random() * 1000);
    const subFolder = mediaType === 'video' ? 'videos' : safeFolder;
    const filename = `saudi-${safeFolder}-${cleanName}-${timestamp}.${ext}`;

    const relativeSubpath =
      mediaType === 'video'
        ? path.join('assets', 'videos')
        : path.join('assets', 'images', safeFolder);

    const primaryDir = path.join(process.cwd(), 'public', relativeSubpath);

    if (!fs.existsSync(primaryDir)) {
      fs.mkdirSync(primaryDir, { recursive: true });
    }

    const filePath = path.join(primaryDir, filename);
    fs.writeFileSync(filePath, buffer);

    // Also mirror to standalone directory if Next.js was built in standalone mode
    const standaloneDir = path.join(
      process.cwd(),
      '.next',
      'standalone',
      'public',
      relativeSubpath
    );
    if (fs.existsSync(standaloneDir)) {
      try {
        fs.writeFileSync(path.join(standaloneDir, filename), buffer);
      } catch (e) {
        console.warn('Could not mirror upload to standalone dir:', e);
      }
    }

    const publicUrl =
      mediaType === 'video'
        ? `/assets/videos/${filename}`
        : `/assets/images/${subFolder}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      type: mediaType,
      sizeBytes: buffer.length,
      filename,
    });
  } catch (error: any) {
    console.error('Media upload failed:', error);
    return NextResponse.json(
      { error: 'Media upload failed', details: error?.message },
      { status: 500 }
    );
  }
}
