import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

export async function GET() {
  const db = getDb();
  return NextResponse.json(db, { headers: NO_CACHE_HEADERS });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentDb = getDb();

    const updatedDb = {
      ...currentDb,
      ...body,
      updatedAt: Date.now(),
    };

    const ok = saveDb(updatedDb);
    if (!ok) {
      return NextResponse.json(
        { error: 'Failed to save database' },
        { status: 500, headers: NO_CACHE_HEADERS }
      );
    }
    const saved = getDb();
    return NextResponse.json(
      { success: true, db: saved },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400, headers: NO_CACHE_HEADERS }
    );
  }
}
