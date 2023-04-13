/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */

import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

import type { Thoughts } from '@/types/thoughtsTypes';

export interface ThoughtsData {
  thoughts: Thoughts[];
  fetchThoughts: (userId: string) => Promise<void>;
  setThoughts: React.Dispatch<React.SetStateAction<Thoughts[]>>;
}

export const useThoughts = (): ThoughtsData => {
  const [thoughts, setThoughts] = useState<Thoughts[]>([]);
  const user = useUser();

  const fetchThoughts = async (userId: string) => {
    console.log('fetchThoughtsFromuseThoughts', userId);
    try {
      if (userId) {
        const response = await fetch(`/api/thoughts/?user_id=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch thoughts');
        }
        const { data } = await response.json();
        console.log('dataArrayforHook', data);
        setThoughts(data);
      }
    } catch (error) {
      console.error(error);
      setThoughts([]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchThoughts(user.id);
    }
  }, [user]);

  return { thoughts, fetchThoughts, setThoughts };
};
