'use server';

import { getUserId } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import Habit from '@/models/Habit';
import ActivityLog from '@/models/ActivityLog';
import Note from '@/models/Note';
import { revalidatePath } from 'next/cache';

import Task from '@/models/Task';

export async function fetchDayStatus(dateStr: string) {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    
    // Normalize date to UTC midnight for comparison
    const targetDate = new Date(dateStr);
    targetDate.setUTCHours(0, 0, 0, 0);

    // 1. Fetch habits and filter by schedule
    const habits = (await Habit.find({ user: userId, isArchived: false }).lean()) as any[];
    const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const currentDayName = dayNames[targetDate.getUTCDay()];

    const filteredHabits = habits.filter((habit: any) => {
      if (habit.frequency === 'daily') return true;
      if (habit.frequency === 'weekly') return habit.days && habit.days.includes(currentDayName);
      if (habit.frequency === 'interval') {
         const start = new Date(habit.startDate);
         start.setUTCHours(0,0,0,0);
         const diffTime = Math.abs(targetDate.getTime() - start.getTime());
         const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
         return diffDays % habit.intervalDays === 0;
      }
      return true;
    });
    
    // 2. Fetch habit logs for this day
    const entries = (await ActivityLog.find({
      user: userId,
      date: targetDate
    }).lean()) as any[];

    // 3. Fetch tasks for this day
    const tasks = (await Task.find({
      user: userId,
      date: targetDate
    }).lean()) as any[];

    const habitResults = filteredHabits.map((h: any) => {
      const log = entries.find((e: any) => e.habit.toString() === h._id.toString());
      return {
        habitId: h._id.toString(), // Keep habitId for frontend compatibility
        title: h.title,
        frequency: h.frequency,
        done: !!log,
        type: 'habit'
      };
    });

    const taskResults = tasks.map((t: any) => ({
      habitId: t._id.toString(), // Mapping to habitId for frontend compatibility
      title: t.title,
      frequency: 'one-time',
      done: t.status === 'done',
      type: 'task'
    }));

    return JSON.parse(JSON.stringify([...habitResults, ...taskResults]));
  } catch (error) {
    console.error('Fetch day status error:', error);
    return [];
  }
}

export async function fetchNote(dateKey: string) {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    const note = (await Note.findOne({ user: userId, dateKey }).lean()) as any;
    return note ? JSON.parse(JSON.stringify(note)) : null;
  } catch (error) {
    console.error('Fetch note error:', error);
    return null;
  }
}

export async function saveNote(dateKey: string, content: string) {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    
    await Note.findOneAndUpdate(
      { user: userId, dateKey },
      { content },
      { upsert: true, new: true }
    );

    revalidatePath('/calendar');
    return { success: true };
  } catch (error: any) {
    console.error('Save note error:', error);
    return { error: error.message };
  }
}
