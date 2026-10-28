import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET() {
  const db = getDb();
  return NextResponse.json(db);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentDb = getDb();

    const updatedDb = {
      ...currentDb,
      ...body,
    };

    const ok = saveDb(updatedDb);
    if (!ok) {
      return NextResponse.json({ error: 'Failed to save database' }, { status: 500 });
    }
    return NextResponse.json({ success: true, db: updatedDb });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
