/* eslint-disable unused-imports/no-unused-vars */
export type Mood = {
  id: number;
  created_at: string;
  description: string;
  category: string;
  user_id: string; // changed to string
  rating: number;
};

export type EditedMood = Omit<Mood, 'created_at' | 'user_id'>;
