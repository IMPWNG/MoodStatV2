/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */
import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

import type { Mood } from '@/types/moodTypes';

interface MoodsData {
  moods: Mood[];
  fetchMoods: (userId: string) => Promise<void>;
  fetchMoodsByDateRange: (
    userId: string,
    from: string,
    to: string
  ) => Promise<void>;
  deleteMood: (id: number) => Promise<void>;
  modifyMood: (id: number, mood: Mood) => Promise<void>;
}

export const useMoods = (): MoodsData => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const user = useUser();

  const fetchMoods = async (userId: string) => {
    // console.log('fetchMoodsFromuseMoods', userId);
    try {
      if (userId) {
        const response = await fetch(`/api/mood/?user_id=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch moods');
        }
        const { data } = await response.json();
        // console.log('dataArrayforHook', data);
        setMoods(data);
      }
    } catch (error) {
      console.error(error);
      setMoods([]);
    }
  };

  const fetchMoodsByDateRange = async (
    userId: string,
    from: string,
    to: string
  ) => {
    try {
      if (userId) {
        const response = await fetch(
          `/api/mood/?user_id=${userId}&from=${from}&to=${to}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch moods');
        }
        const { data } = await response.json();
        setMoods(data);
      }
    } catch (error) {
      console.error(error);
      setMoods([]);
    }
  };

  useEffect(() => {
    // console.log('userFromuseMoods', user);
    if (user && user.id) {
      fetchMoods(user.id);
    }
  }, [user]);

  const deleteMood = async (id: number) => {
    try {
      const response = await fetch(`/api/mood/?user_id=${user?.id}&id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete mood');
      }
      setMoods((prevMoods) => prevMoods.filter((mood) => mood.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const modifyMood = async (id: number, mood: Mood) => {
    try {
      const response = await fetch(`/api/mood?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mood),
      });
      const { data } = await response.json();
      setMoods(data);
    } catch (error) {
      console.error(error);
    }
  };

  return { moods, fetchMoods, deleteMood, modifyMood, fetchMoodsByDateRange };
};
