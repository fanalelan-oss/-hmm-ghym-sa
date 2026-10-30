import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';
import { ReviewItem } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();

    const newReview: ReviewItem = {
      id: 'rev-' + Date.now(),
      name: body.name || 'عميل همم غيم',
      role: body.role || 'عميل — المملكة العربية السعودية',
      service: body.service || 'signage',
      rating: Number(body.rating) || 5,
      date: new Date().toISOString().slice(0, 10),
      comment: body.comment || '',
      reply: body.reply || '',
      approved: body.approved !== undefined ? Boolean(body.approved) : true,
      featured: Boolean(body.featured),
    };

    db.reviews = [newReview, ...(db.reviews || [])];
    saveDb(db);

    return NextResponse.json({ success: true, review: newReview, reviews: db.reviews });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();

    db.reviews = (db.reviews || []).map((r) =>
      r.id === body.id
        ? {
            ...r,
            approved: body.approved !== undefined ? body.approved : r.approved,
            featured: body.featured !== undefined ? body.featured : r.featured,
            reply: body.reply !== undefined ? body.reply : r.reply,
          }
        : r
    );
    saveDb(db);
    return NextResponse.json({ success: true, reviews: db.reviews });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update review' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const db = getDb();
    db.reviews = (db.reviews || []).filter((r) => r.id !== id);
    saveDb(db);
    return NextResponse.json({ success: true, reviews: db.reviews });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 400 });
  }
}
