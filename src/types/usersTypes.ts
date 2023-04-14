/* eslint-disable unused-imports/no-unused-vars */
export type UsersModel = {
  id: number;
  created_at: string;
  user_id: string;
  name: string;
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
  userImage?: string;
};

export type EditedMood = Omit<UsersModel, 'created_at' | 'user_id'>;
