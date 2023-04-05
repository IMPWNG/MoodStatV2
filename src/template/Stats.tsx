/* eslint-disable @typescript-eslint/no-shadow */
import React, { useMemo } from 'react';

import { StatsCard } from '@/components/stats/StatsCard';
import type { Mood } from '@/types/moodTypes';

const Stats = ({ moods }: { moods: Mood[] }) => {
  const { countMoodsYear, mostUsedCategory, leastUsedCategory, averageRating } =
    useMemo(() => {
      const currentYear = new Date().getFullYear();
      const moodsThisYear = [];
      const categoryCounts: { [key: string]: number } = {};
      let sumRatings = 0;

      moods.forEach((mood) => {
        const moodDate = new Date(mood.created_at);
        const category = mood?.category ?? null;

        if (moodDate.getFullYear() === currentYear) {
          moodsThisYear.push(mood);
        }

        if (category !== null) {
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }

        sumRatings += mood.rating;
      });

      const sortedCategories = Object.entries(categoryCounts).sort(
        (a, b) => b[1] - a[1]
      );

      const mostUsedCategory = sortedCategories[0]?.[0] || null;
      const leastUsedCategory =
        sortedCategories[sortedCategories.length - 1]?.[0] || null;
      const averageRating = sumRatings / moods.length || 0;

      return {
        countMoodsYear: moodsThisYear.length,
        mostUsedCategory,
        leastUsedCategory,
        averageRating: averageRating.toFixed(1),
      };
    }, [moods]);

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
        {mostUsedCategory}
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
        {leastUsedCategory}
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
        {averageRating}
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
        {countMoodsYear}
      </StatsCard>
    </div>
  );
};

export { Stats };
