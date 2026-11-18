'use server';

import { getUserId } from '@/lib/auth';



import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';



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

    revalidatePath('/profile/me');
    return { success: true, isFollowing: !isFollowing };
  } catch (error: any) {
    console.error('Toggle follow error:', error);
    return { error: error.message };
  }
}
