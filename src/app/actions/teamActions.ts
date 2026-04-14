'use server';

import { getUserId } from '@/lib/auth';



import connectToDatabase from '@/lib/mongodb';
import Team from '@/models/Team';
import User from '@/models/User';
import TeamProject from '@/models/TeamProject';
import TeamProjectTask from '@/models/TeamProjectTask';
import { revalidatePath } from 'next/cache';



export async function fetchUserTeams() {
  await connectToDatabase();
  try {
    const userId = await getUserId();
    const teams = (await Team.find({ 'members.user': userId }).lean()) as any[];
    
    return teams.map((team: any) => ({
      _id: team._id.toString(),
      name: team.name,
      description: team.description,
      memberCount: team.members.length,
      isPrivate: team.isPrivate
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchTeamById(teamId: string) {
  await connectToDatabase();
  try {
    // Populate user details for the leaderboard/dashboard mapping
    const team = (await Team.findById(teamId)
      .populate('members.user', 'name username avatar credibilityScore')
      .lean()) as any;
      
    if (!team) return null;

    return {
      _id: team._id.toString(),
      name: team.name,
      description: team.description,
      meetingLink: team.meetingLink,
      members: team.members.map((m: any) => ({
        _id: m.user._id.toString(),
        name: m.user.name,
        username: m.user.username,
        avatar: m.user.avatar,
        role: m.role,
        credibilityScore: m.user.credibilityScore || 0
      })).sort((a: any, b: any) => b.credibilityScore - a.credibilityScore) // Leaderboard sorting
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchTeamTasks(teamId: string) {
  await connectToDatabase();
  try {
    const projects = (await TeamProject.find({ team: teamId }).lean()) as any[];
    const projectIds = projects.map(p => p._id);

    const tasks = (await TeamProjectTask.find({ project: { $in: projectIds } })
      .populate('assignedTo', 'name username avatar')
      .populate('project', 'name')
      .lean()) as any[];

    return tasks.map((t: any) => ({
      _id: t._id.toString(),
      title: t.title,
      projectName: t.project?.name || 'General',
      status: t.status,
      assignedTo: {
        name: t.assignedTo?.name || 'Unassigned',
        avatar: t.assignedTo?.avatar || ''
      }
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
