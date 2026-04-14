export type CommunityUser = {
  id: string;
  name: string;
  username?: string;
  avatar?: string;
  credibilityScore?: number;
  currentStreak?: number;
  streak?: number;
  isFollowing?: boolean;
};
