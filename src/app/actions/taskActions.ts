'use server';

import { getUserId } from '@/lib/auth';



import connectToDatabase from '@/lib/mongodb';
import Task from '@/models/Task';
import { revalidatePath } from 'next/cache';



export async function fetchTasks(dateStr?: string) {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    
    const targetDate = dateStr ? new Date(dateStr) : new Date();
    targetDate.setUTCHours(0,0,0,0);

    const today = new Date();
    today.setUTCHours(0,0,0,0);

    let query: any = { user: userId };

    if (targetDate.getTime() === today.getTime()) {
      // For today, fetch today's tasks OR any pending tasks from the past (rollover)
      query.$or = [
        { date: targetDate },
        { date: { $lt: targetDate }, status: 'pending' }
      ];
    } else {
      // For history dates, only fetch tasks for that specific day
      query.date = targetDate;
    }

    const tasks = (await Task.find(query).sort({ createdAt: -1 }).lean()) as any[];

    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {
    console.error('Fetch tasks error:', error);
    return [];
  }
}

export async function createTask(title: string) {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    
    const today = new Date();
    today.setUTCHours(0,0,0,0);

    const task = await Task.create({
      user: userId,
      title,
      date: today
    });

    revalidatePath('/dashboard');
    return JSON.parse(JSON.stringify(task));
  } catch (error: any) {
    console.error('Create task error:', error);
    return { error: error.message };
  }
}

export async function toggleTask(taskId: string) {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) throw new Error('Task not found');

    task.status = task.status === 'done' ? 'pending' : 'done';
    await task.save();

    revalidatePath('/dashboard');
    return JSON.parse(JSON.stringify(task));
  } catch (error: any) {
    console.error('Toggle task error:', error);
    return { error: error.message };
  }
}

export async function deleteTask(taskId: string) {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    
    await Task.deleteOne({ _id: taskId, user: userId });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error: any) {
    console.error('Delete task error:', error);
    return { error: error.message };
  }
}

export async function setTaskDeadline(taskId: string, deadline: string | null) {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) throw new Error('Task not found');
    
    task.deadline = deadline ? new Date(deadline) : null;
    await task.save();

    revalidatePath('/dashboard');
    return JSON.parse(JSON.stringify(task));
  } catch (error: any) {
    console.error('Set deadline error:', error);
    return { error: error.message };
  }
}
