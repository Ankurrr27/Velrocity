'use server';

import { getUserId } from '@/lib/auth';



import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';



export async function updateProfile(data: any) {
  try {
    await connectToDatabase();
    const userId = await getUserId();
    
    // Whitelist fields to prevent injection
    const allowedFields = [
      'name', 'bio', 'tagline', 'location', 'currentFocus', 'college',
      'accentColor', 'profilePublic', 'externalProfiles', 'banner', 'avatar'
    ];
    
    const update: any = {};
    Object.keys(data).forEach(key => {
      if (allowedFields.includes(key)) {
        update[key] = data[key];
      }
    });

    const user = (await User.findByIdAndUpdate(userId, update, { new: true }).lean()) as any;
    
    if (!user) throw new Error('User not found');

    revalidatePath('/profile');
    revalidatePath(`/u/${user.username}`);
    return { success: true, user: JSON.parse(JSON.stringify(user)) };
  } catch (error: any) {
    console.error('Update profile error:', error);
    return { error: error.message };
  }
}
