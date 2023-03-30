export type Mood = {
  id: number;
  created_at: string;
  description: string;
  category: string;
  user_id: string | undefined;
  rating: number;
};

export type EditedMood = Omit<Mood, 'created_at' | 'user_id'>;
