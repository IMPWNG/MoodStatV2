/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

import { ChartCard } from '@/components/chartCard/ChartCard';
import type { Mood } from '@/types/moodTypes';

interface WordsCount {
  [key: string]: number | undefined;
}

const Chart4 = ({ moods }: { moods: Mood[] }) => {
  const wordsCount: WordsCount = moods.reduce((acc: WordsCount, mood: Mood) => {
    mood.description.split(' ').forEach((word) => {
      if (word.length >= 4) {
        acc[word] = (acc[word] || 0) + 1;
      }
    });
    return acc;
  }, {});

  const sortedData = Object.entries(wordsCount)
    .sort(([, count1], [, count2]) => (count2 || 0) - (count1 || 0))
    .map(([name, value]) => ({ name, value }))
    .filter(({ value }) => (value || 0) > 5);

  return (
    <ChartCard title="Most used word">
      <PieChart>
        <Pie data={sortedData} dataKey="value">
          <Cell fill="#A3BFFA" />
          <Cell fill="#7F9CF5" />
          <Cell fill="#667EEA" />
          <Cell fill="#5A67D8" />
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ChartCard>
  );
};

export { Chart4 };
