import React from 'react';

import { StatsCard } from '@/components/stats/StatsCard';
import { useMoods } from '@/hooks/useMoods';
import type { Mood } from '@/types/moodTypes';

const Stats = () => {
  const moods = useMoods();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const countMoodsYear = (moods: Mood[]) => {
    const currentYear = new Date(2023, 0, 1);
    if (!Array.isArray(moods)) {
      return 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const moodsThisYear = moods.filter((mood) => {
      const moodDate = new Date(mood.created_at);
      return moodDate.getFullYear() === currentYear.getFullYear();
    });
    return moodsThisYear.length;
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getMostUsedCategory = (moods: Mood[]) => {
    const categoryCounts: { [key: string]: number } = {};
    if (!Array.isArray(moods)) {
      return null;
    }
    moods.forEach((mood) => {
      const category = mood?.category ?? null;
      if (category !== null) {
        if (category in categoryCounts) {
          categoryCounts[category] += 1;
        } else {
          categoryCounts[category] = 1;
        }
      }
    });

    const sortedCategories: [string, number][] = Object.entries(
      categoryCounts
    ).sort((a, b) => b[1] - a[1]);

    if (sortedCategories.length > 0) {
      return sortedCategories[0]![0];
    }
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getLessUsedCategory = (moods: Mood[]) => {
    const categoryCounts: { [key: string]: number } = {};
    if (!Array.isArray(moods)) {
      return null;
    }
    moods.forEach((mood) => {
      const category = mood?.category ?? null;
      if (category !== null) {
        if (category in categoryCounts) {
          categoryCounts[category] += 1;
        } else {
          categoryCounts[category] = 1;
        }
      }
    });

    const sortedCategories: [string, number][] = Object.entries(
      categoryCounts
    ).sort((a, b) => a[1] - b[1]);

    if (sortedCategories.length > 0) {
      return sortedCategories[0]![0];
    }
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getAverageRating = (moods: Mood[]) => {
    if (!Array.isArray(moods) || moods.length === 0) {
      return 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    const ratings = moods.map((mood: { rating: number }) => mood.rating);
    const sum = ratings.reduce(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      (sum: number, rating: number) => sum + rating,
      0
    );
    const averageRating = sum / ratings.length;
    return averageRating.toFixed(1);
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M12 5v14M5 12h14" />
          </svg>
        }
        text="Most used category"
        iconColor="bg-green-500"
      >
        {getMostUsedCategory(moods.moods)}
      </StatsCard>
      <StatsCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M5 12h14" />
          </svg>
        }
        text="Less used category"
        iconColor="bg-red-500"
      >
        {getLessUsedCategory(moods.moods)}
      </StatsCard>
      <StatsCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M12 17V7" />
            <path d="M12 17l5-5M12 17l-5-5" />
            <circle cx="6" cy="19" r="2" />
            <circle cx="17" cy="19" r="2" />
          </svg>
        }
        text="Average Rating"
      >
        {getAverageRating(moods.moods)}
      </StatsCard>
      <StatsCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M4 21V8a3 3 0 013-3h10a3 3 0 013 3v6a3 3 0 01-3 3H8l-4 4M8 9h8M8 13h6" />
          </svg>
        }
        text="Entries this year"
      >
        {countMoodsYear(moods.moods)}
      </StatsCard>
    </div>
  );
};

export { Stats };
