import { fetchHabits, fetchUserProgress } from '@/app/actions/habitActions';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const habits = await fetchHabits();
    const progress = await fetchUserProgress();

    // Check if user has ANY habits at all (archived ignored)
    // We can use habits.length if fetchHabits was unfiltered, but it is filtered.
    // So let's look at habits in habitActions.ts again.
    
    const transformed = habits.map((h: any) => ({
      habitId: h._id,
      title: h.title,
      done: h.isCompletedToday,
      type: h.type
    }));

    return addCors(NextResponse.json({
      habits: transformed,
      streak: progress.totalStreaks || 0,
      hasAnyHabits: transformed.length > 0 // This is still today filtered.
    }));
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
