import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Listar eventos (GET) e criar evento (POST)
export async function GET() {
  try {
    const events = await prisma.event.findMany({ orderBy: { startDate: 'asc' } });
    return NextResponse.json({ success: true, events });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const event = await prisma.event.create({ data });
    return NextResponse.json({ success: true, event });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
