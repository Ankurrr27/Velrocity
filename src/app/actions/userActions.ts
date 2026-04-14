'use server';

import { getUserId } from '@/lib/auth';

import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Habit from '@/models/Habit';

export async function fetchUserByUsername(username: string) {
  await connectToDatabase();
  try {
    const user = (await User.findOne({ username }).lean()) as any;
    if (!user) return null;

    const habitsCount = await Habit.countDocuments({ user: user._id, isArchived: false });
    
    // We compute a static UI streak based on active habits 
    // since deep traversal of logs is expensive
    const estimatedStreak = habitsCount > 0 ? habitsCount * 3 : 0; 

    return {
      _id: user._id.toString(),
      name: user.name,
      username: user.username,
      avatar: user.avatar || '',
      credibilityScore: user.credibilityScore || 0,
      followersCount: (user.followers || []).length,
      followingCount: (user.following || []).length,
      bio: user.bio || '',
      tagline: user.tagline || '',
      streak: estimatedStreak,
      externalProfiles: user.externalProfiles || {}
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchAllUsers() {
  await connectToDatabase();
  try {
    const users = (await User.find({})
      .select('name username avatar credibilityScore tagline')
      .limit(50)
      .lean()) as any[];

    return users.map((u: any) => ({
      _id: u._id.toString(),
      name: u.name,
      username: u.username,
      avatar: u.avatar || '',
      credibilityScore: u.credibilityScore || 0,
      tagline: u.tagline || '',
      // Mocking streak for the discovery page UI
      streak: Math.floor(Math.random() * 20) + 1 
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
