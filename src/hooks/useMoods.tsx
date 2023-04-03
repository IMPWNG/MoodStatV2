/* eslint-disable no-console */
import { useEffect, useState } from 'react';

import type { Mood } from '@/types/moodTypes';

export const useMoods = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await fetch('/api/mood');
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { data: moods } = await response.json();
        setMoods(moods);
      } catch (error) {
        console.error(error);
      }
    };

    if (shouldFetch) {
      fetchMoods();
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  const deleteMood = async (id: number) => {
    try {
      const response = await fetch('/api/mood', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { data: moods } = await response.json();
      setMoods(moods);
      setShouldFetch(true); // fetch the moods again
    } catch (error) {
      console.error(error);
    }
  };

  const modifyMood = async (id: number, mood: Mood) => {
    try {
      const response = await fetch('/api/mood', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          mood,
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { data: moods } = await response.json();
      setMoods(moods);
      setShouldFetch(true); // fetch the moods again
    } catch (error) {
      console.error(error);
    }
  };

  return { moods, deleteMood, modifyMood };
};
