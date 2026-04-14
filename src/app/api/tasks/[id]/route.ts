import { NextResponse } from 'next/server';
import { deleteTask } from '@/app/actions/taskActions';

export const dynamic = 'force-dynamic';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await deleteTask(id);
    if (!result.error) {
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
