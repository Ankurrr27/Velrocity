import { NextResponse } from 'next/server';
import { fetchHabitsForUser } from '@/app/actions/habitActions';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    await connectToDatabase();
    const user = await User.findOne({ username }).lean() as any;
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const habits = await fetchHabitsForUser(user._id.toString(), date || undefined);
    
    // Transform to match extension expectation
    const transformed = habits.map((h: any) => ({
      habitId: h._id,
      title: h.title,
      done: h.isCompletedToday,
      type: h.type
    }));

    return NextResponse.json(transformed);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
