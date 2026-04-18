'use server';

import { getUserId } from '@/lib/auth';



import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';



export async function fetchUsers(query?: string) {
  try {
    await connectToDatabase();
    const currentUserId = await getUserId();
    
    let filter: any = { _id: { $ne: currentUserId } };
    if (query) {
      filter.$or = [
        { username: { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } }
      ];
    }

    const users = (await User.find(filter)
      .select('name username avatar followers credibilityScore lastActive')
      .sort({ lastActive: -1, credibilityScore: -1 })
      .lean()) as any[];

    const formattedUsers = users.map((u: any) => ({
      ...u,
      id: u._id.toString(),
      _id: u._id.toString(),
      isFollowing: u.followers?.some((fId: any) => fId.toString() === currentUserId.toString())
    }));

    return JSON.parse(JSON.stringify(formattedUsers));
  } catch (error) {
    console.error('Fetch users error:', error);
    return [];
  }
}

export async function toggleFollow(targetUserId: string) {
  try {
    await connectToDatabase();
    const currentUserId = await getUserId();

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) throw new Error('User not found');

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      currentUser.following = currentUser.following.filter((id: any) => id.toString() !== targetUserId);
      targetUser.followers = targetUser.followers.filter((id: any) => id.toString() !== currentUserId);
    } else {
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);
    }

    await Promise.all([currentUser.save(), targetUser.save()]);

    revalidatePath('/users');
    revalidatePath('/profile/me');
    return { success: true, isFollowing: !isFollowing };
  } catch (error: any) {
    console.error('Toggle follow error:', error);
    return { error: error.message };
  }
}

export async function fetchTopUsers() {
  try {
    await connectToDatabase();
    const topUsers = (await User.find({ profilePublic: true })
      .sort({ credibilityScore: -1, streak: -1 })
      .limit(5)
      .select('name username avatar credibilityScore')
      .lean()) as any[];

    return JSON.parse(JSON.stringify(topUsers));
  } catch (error) {
    console.error('Fetch top users error:', error);
    return [];
  }
}
