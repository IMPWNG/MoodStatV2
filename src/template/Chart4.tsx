import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

import { ChartCard } from '@/chart/ChartCard';
import type { Mood } from '@/types/moodTypes';

const Chart4 = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const user = useUser();
  console.log(moods);

  useEffect(() => {
    async function getMoods() {
      try {
        const response = await fetch('/api/mood');
        const { data: moods } = await response.json();
        setMoods(moods as Mood[]);
      } catch (error) {
        console.error(error);
      }
    }
    getMoods();
  }, [user]);

  const wordsCount = {};

  moods?.forEach((mood) => {
    const words = mood.description.split(' ');
    words.forEach((word) => {
      wordsCount[word] = wordsCount[word] ? wordsCount[word] + 1 : 1;
    });
  });

  const sortedData = Object.keys(wordsCount)
    .map((word) => ({
      name: word,
      value: wordsCount[word],
    }))
    .filter((data) => data.name.length >= 4) // exclude words with length less than 4
    .sort((a, b) => b.value - a.value);

  const filteredData = sortedData
    .slice(0, moods?.length)
    .filter((item) => item.value > 5);

  return (
    <ChartCard title="Most used word">
      <PieChart>
        <Pie data={filteredData} dataKey="value">
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
