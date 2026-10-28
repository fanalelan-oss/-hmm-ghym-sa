import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';
import { LeadItem } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();

    const newLead: LeadItem = {
      id: 'lead-' + Date.now(),
      name: body.name || 'عميل',
      phone: body.phone || '',
      email: body.email || '',
      customerType: body.customerType || 'b2c',
      company: body.company || '',
      service: body.service || 'signage',
      requestType: body.requestType || 'quote',
      city: body.city || 'الرياض',
      details: body.details || '',
      source: body.source || 'website',
      status: 'new',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };

    db.leads = [newLead, ...(db.leads || [])];
    saveDb(db);

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const db = getDb();
    db.leads = (db.leads || []).map((l) =>
      l.id === body.id ? { ...l, status: body.status } : l
    );
    saveDb(db);
    return NextResponse.json({ success: true, leads: db.leads });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 400 });
  }
}
