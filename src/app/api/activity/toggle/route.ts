import { checkInHabit } from '@/app/actions/habitActions';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { habitId } = await req.json();
    const result = await checkInHabit(habitId);
    if (result.success) {
      return addCors(NextResponse.json({ success: true }));
    } else {
      return addCors(NextResponse.json({ error: result.error }, { status: 400 }));
    }
  } catch (error: any) {
    return addCors(NextResponse.json({ error: error.message }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return addCors(new NextResponse(null, { status: 204 }));
}

function addCors(res: NextResponse) {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res;
}
