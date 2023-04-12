/* eslint-disable unused-imports/no-unused-vars */
export type Thoughts = {
  id: number;
  created_at: string;
  user_id: string;
  age: number;
  gender: string;
  negativeThoughtsFrequency: number;
  emotionManagementDifficulty: boolean;
  stressFrequency: number;
  sleepProblems: boolean;
  lifeChangeExperience: string;
  diagnosedWithMentalIllness: boolean;
  supportSystemAvailability: boolean;
  helpfulActivities: string;
};

export type EditedMood = Omit<Thoughts, 'created_at' | 'user_id'>;
