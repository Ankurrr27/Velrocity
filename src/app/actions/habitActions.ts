'use server';

import { getUserId } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import mongoose from 'mongoose';
import Habit from '@/models/Habit';
import ActivityLog from '@/models/ActivityLog';
import { revalidatePath } from 'next/cache';

export async function fetchHabits(dateIso?: string) {
  try {
    const userId = await getUserId();
    await connectToDatabase();
    const User = (await import('@/models/User')).default;
    await User.findByIdAndUpdate(userId, { lastActive: new Date() });
    return await fetchHabitsForUser(userId, dateIso);
  } catch (error) {
    console.error('Fetch habits error:', error);
    return [];
  }
}

export async function fetchHabitsForUser(userId: string, dateIso?: string) {
  try {
    await connectToDatabase();
    const habits = (await Habit.find({ user: userId, isArchived: false }).lean()) as any[];
    
    const targetDate = dateIso ? new Date(dateIso) : new Date();
    targetDate.setUTCHours(0, 0, 0, 0);

    const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const currentDayName = dayNames[targetDate.getUTCDay()];

    // Filter habits based on frequency and schedule for the target date
    const filteredHabits = habits.filter((habit: any) => {
      if (habit.frequency === 'daily') return true;
      
      if (habit.frequency === 'weekly') {
        return habit.days && habit.days.includes(currentDayName);
      }
      
      if (habit.frequency === 'interval') {
         const start = new Date(habit.startDate);
         start.setUTCHours(0,0,0,0);
         const diffTime = Math.abs(targetDate.getTime() - start.getTime());
         const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
         return diffDays % habit.intervalDays === 0;
      }
      
      return true;
    });

    const logs = await ActivityLog.find({
      user: userId,
      date: targetDate
    }).lean();

    const loggedHabitIds = new Set(logs.map(log => log.habit.toString()));

    const result = filteredHabits.map((habit: any) => ({
      _id: habit._id.toString(),
      title: habit.title,
      type: habit.type,
      frequency: habit.frequency,
      isCompletedToday: loggedHabitIds.has(habit._id.toString())
    }));

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error('Fetch habits for user error:', error);
    throw error;
  }
}

export async function checkInHabit(habitId: string) {
  await connectToDatabase();
  try {
    const userId = await getUserId();
    const habit = await Habit.findById(habitId);
    
    if (!habit || habit.user.toString() !== userId) {
      throw new Error('Habit not found or unauthorized');
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Check if already logged
    const existingLog = await ActivityLog.findOne({
      user: userId,
      habit: habitId,
      date: today
    });

    if (existingLog) {
      // Toggle off
      await ActivityLog.deleteOne({ _id: existingLog._id });
      // Decrease credibility
      const User = (await import('@/models/User')).default;
      await User.findByIdAndUpdate(userId, { $inc: { credibilityScore: -10 } });
    } else {
      // Toggle on
      await ActivityLog.create({
        user: userId,
        habit: habitId,
        habitType: habit.type,
        date: today,
        status: 'done',
        confidence: 100
      });
      // Increase credibility
      const User = (await import('@/models/User')).default;
      await User.findByIdAndUpdate(userId, { $inc: { credibilityScore: 10 } });
    }

    revalidatePath('/dashboard');
    revalidatePath('/profile');

    return { success: true };
  } catch (error: any) {
    console.error('Checkin error:', error);
    return { success: false, error: error.message };
  }
}

export async function createHabit(
  payload: {
    title: string;
    type: string;
    frequency: string;
    days?: string[];
    intervalDays?: number;
    verificationRule: string;
    platformSource?: string;
    githubRepo?: string;
  }
) {
  await connectToDatabase();
  try {
    const userId = await getUserId();
    
    const habitData = {
      user: userId,
      ...payload,
    };

    const habit = await Habit.create(habitData);

    revalidatePath('/dashboard');
    return { success: true, habit: JSON.parse(JSON.stringify(habit)) };
  } catch (error: any) {
    console.error('Create habit error:', error);
    return { success: false, error: error.message };
  }
}
export async function fetchActivityFeed() {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    
    const logs = (await ActivityLog.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('habit', 'title')
      .lean()) as any[];

    return JSON.parse(JSON.stringify(logs));
  } catch (error) {
    console.error('Fetch activity feed error:', error);
    return [];
  }
}

export async function fetchUserProgress() {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    const User = (await import('@/models/User')).default;
    const user = (await User.findById(userId).select('credibilityScore').lean()) as any;
    
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const habitsCompletedToday = await ActivityLog.countDocuments({
      user: userId,
      date: today,
      status: 'done'
    });

    // Calculate actual current streak
    let currentStreak = 0;
    let streakDate = new Date(today);
    
    while (true) {
      const dayLogs = await ActivityLog.countDocuments({
        user: userId,
        date: streakDate,
        status: 'done'
      });
      
      if (dayLogs > 0) {
        currentStreak++;
        streakDate.setDate(streakDate.getDate() - 1);
      } else {
        // If it's today and 0 completions, check yesterday to continue streak
        if (currentStreak === 0) {
           const yesterday = new Date(today);
           yesterday.setDate(yesterday.getDate() - 1);
           const yesterdayLogs = await ActivityLog.countDocuments({
             user: userId,
             date: yesterday,
             status: 'done'
           });
           if (yesterdayLogs > 0) {
              // Still in streak if yesterday was done, even if today isn't done yet
              let tempStreak = 0;
              let tempDate = new Date(yesterday);
              while (true) {
                const logs = await ActivityLog.countDocuments({ user: userId, date: tempDate, status: 'done' });
                if (logs > 0) {
                  tempStreak++;
                  tempDate.setDate(tempDate.getDate() - 1);
                } else break;
              }
              currentStreak = tempStreak;
           }
        }
        break;
      }
      if (currentStreak > 1000) break; // safety
    }
    
    return {
      totalStreaks: currentStreak,
      credibilityScore: user?.credibilityScore || 0,
      habitsCompletedToday
    };
  } catch (error) {
    console.error('Fetch progress error:', error);
    return { totalStreaks: 0, credibilityScore: 0, habitsCompletedToday: 0 };
  }
}

export async function fetchHabitTimelineData() {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    const habits = (await Habit.find({ user: userId, isArchived: false }).lean()) as any[];
    
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 10);
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 5);

    const logs = (await ActivityLog.find({
      user: userId,
      date: { $gte: startDate, $lte: endDate }
    }).lean()) as any[];

    const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const logsMap = new Set();
    logs.forEach(log => {
      const key = `${log.habit.toString()}-${log.date.toISOString().split('T')[0]}`;
      logsMap.add(key);
    });

    const expectedLogs = new Set();
    habits.forEach((habit: any) => {
      const current = new Date(startDate);
      while (current <= endDate) {
        const dateStr = current.toISOString().split('T')[0];
        const dayName = dayNames[current.getUTCDay()];
        let isScheduled = false;

        if (habit.frequency === 'daily') isScheduled = true;
        else if (habit.frequency === 'weekly') {
          isScheduled = habit.days && habit.days.includes(dayName);
        } else if (habit.frequency === 'interval') {
          const start = new Date(habit.startDate);
          start.setUTCHours(0,0,0,0);
          const diffTime = Math.abs(current.getTime() - start.getTime());
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          isScheduled = diffDays % habit.intervalDays === 0;
        }

        if (isScheduled) {
          expectedLogs.add(`${habit._id.toString()}-${dateStr}`);
        }
        current.setDate(current.getDate() + 1);
      }
    });

    const result = {
      habits: habits.map(h => ({ _id: h._id.toString(), title: h.title })),
      logs: Array.from(logsMap),
      expectedLogs: Array.from(expectedLogs),
      today: today.toISOString()
    };
    
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error('Fetch timeline error:', error);
    return { habits: [], logs: [], today: new Date().toISOString() };
  }
}

export async function fetchUserProfile(username?: string) {
  try {
    await connectToDatabase();
    const currentUserId = await getUserId();
    const User = (await import('@/models/User')).default;
    
    let user: any;
    if (username) {
      user = await User.findOne({ username }).lean();
    } else {
      user = await User.findById(currentUserId).lean();
    }
    
    if (!user) return null;

    const targetUserId = user._id.toString();
    const habitCount = await Habit.countDocuments({ user: targetUserId, isArchived: false });
    const logCount = await ActivityLog.countDocuments({ user: targetUserId, status: 'done' });

    const recentHabits = await ActivityLog.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(targetUserId), status: 'done' } },
      { $group: { _id: '$habit', logs: { $count: {} } } },
      { $sort: { logs: -1 } },
      { $limit: 3 },
      { $lookup: { from: 'habits', localField: '_id', foreignField: '_id', as: 'habit' } },
      { $unwind: '$habit' }
    ]);

    const result = {
      id: user._id.toString(),
      name: user.name,
      username: user.username,
      avatar: user.avatar || "",
      bio: user.bio || "",
      tagline: user.tagline || "",
      location: user.location || "",
      accentColor: user.accentColor || "indigo",
      profilePublic: user.profilePublic ?? false,
      streak: user.streak || 0,
      credibilityScore: user.credibilityScore || 0,
      followersCount: user.followers?.length || 0,
      followingCount: user.following?.length || 0,
      isPro: true,
      externalProfiles: user.externalProfiles || {
        github: "", leetcode: "", codeforces: "", codechef: "", gfg: "", codolio: ""
      },
      college: user.college || "",
      lastActive: user.lastActive,
      stats: {
        habitCount,
        logCount,
        currentStreak: user.streak || 0,
        totalTicks: logCount,
        activeDays: logCount,
        successRate: logCount > 0 ? Math.min(100, Math.round((logCount / Math.max(1, habitCount * 30)) * 100)) : 0,
        rank: await User.countDocuments({ credibilityScore: { $gt: user.credibilityScore } }) + 1
      },
      recentHabits: recentHabits.map(h => ({
        title: h.habit.title,
        status: h.logs > 15 ? '🔥 High' : h.logs > 7 ? '⚡ Peak' : '✨ Stable',
        logs: h.logs
      }))
    };

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error('Fetch profile error:', error);
    return null;
  }
}
export async function fetchProgressHistory() {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    const Task = (await import('@/models/Task')).default;
    
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 29);

    // Get total habits
    const totalHabits = await Habit.countDocuments({ user: userId, isArchived: false });
    
    // Get logs for the last 30 days
    const logs = await ActivityLog.aggregate([
      { 
        $match: { 
          user: new mongoose.Types.ObjectId(userId), 
          date: { $gte: startDate, $lte: today },
          status: 'done'
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 }
        }
      }
    ]);

    const taskLogs = await Task.aggregate([
      { 
        $match: { 
          user: new mongoose.Types.ObjectId(userId), 
          date: { $gte: startDate, $lte: today },
          status: 'done'
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 }
        }
      }
    ]);

    const logsMap = new Map();
    logs.forEach(l => logsMap.set(l._id, (logsMap.get(l._id) || 0) + l.count));
    taskLogs.forEach(l => logsMap.set(l._id, (logsMap.get(l._id) || 0) + l.count));

    const history = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const completed = logsMap.get(dateStr) || 0;
      
      const divisor = Math.max(totalHabits, 5);
      const percentage = Math.min(100, Math.floor((completed / divisor) * 100));
      
      history.push({
        date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        progress: percentage
      });
    }

    return JSON.parse(JSON.stringify(history));
  } catch (error) {
    console.error('Fetch progress history error:', error);
    return [];
  }
}

export async function fetchHeatmapData() {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    const Task = (await import('@/models/Task')).default;
    
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364); // 52 weeks

    const logs = await ActivityLog.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId), date: { $gte: startDate, $lte: today }, status: 'done' } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, count: { $sum: 1 } } }
    ]);

    const taskLogs = await Task.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId), date: { $gte: startDate, $lte: today }, status: 'done' } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, count: { $sum: 1 } } }
    ]);

    const logsMap = new Map();
    logs.forEach(l => logsMap.set(l._id, (logsMap.get(l._id) || 0) + l.count));
    taskLogs.forEach(l => logsMap.set(l._id, (logsMap.get(l._id) || 0) + l.count));

    const heatmap = [];
    for (let i = 0; i < 365; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const count = logsMap.get(dateStr) || 0;
      
      const intensity = Math.min(4, count);
      heatmap.push({ intensity, date: dateStr });
    }

    return JSON.parse(JSON.stringify(heatmap));
  } catch (error) {
    console.error('Fetch heatmap error:', error);
    return [];
  }
}
export async function deleteHabit(habitId: string) {
  await connectToDatabase();
  try {
    const userId = await getUserId();
    
    // First verify ownership
    const habit = await Habit.findOne({ _id: habitId, user: userId });
    if (!habit) throw new Error("Habit not found or unauthorized");

    // Delete associated activity logs
    await ActivityLog.deleteMany({ habit: habitId, user: userId });
    
    // Delete the habit itself
    await Habit.deleteOne({ _id: habitId, user: userId });

    revalidatePath('/dashboard');
    revalidatePath('/profile');

    return { success: true };
  } catch (error: any) {
    console.error('Delete habit error:', error);
    return { success: false, error: error.message };
  }
}
