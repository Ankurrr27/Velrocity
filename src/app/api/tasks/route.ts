import { fetchTasks, createTask } from '@/app/actions/taskActions';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const tasks = await fetchTasks();
    return addCors(NextResponse.json(tasks));
  } catch (error: any) {
    return addCors(NextResponse.json({ error: error.message }, { status: 500 }));
  }
}

export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    const task = await createTask(title);
    if (!task.error) {
      return addCors(NextResponse.json(task));
    } else {
      return addCors(NextResponse.json({ error: task.error }, { status: 400 }));
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
