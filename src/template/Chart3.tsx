import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

import { ChartCard } from '@/chart/ChartCard';
import type { Mood } from '@/types/moodTypes';

const Chart3 = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const user = useUser();

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

  // Group moods by category
  const moodsByCategory = moods.reduce((acc, mood) => {
    const { category } = mood;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += 1;
    return acc;
  }, {});

  // Extract data for chart
  const data = Object.keys(moodsByCategory).map((category) => ({
    category,
    count: moodsByCategory[category],
  }));

  return (
    <ChartCard title="Most used Categories">
      <BarChart
        data={data}
        margin={{
          top: 0,
          right: 28,
          left: 25,
          bottom: 0,
        }}
      >
        <XAxis dataKey="category" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <CartesianGrid stroke="#E5E7EB" strokeDasharray="15" vertical={false} />
        <Tooltip cursor={{ fill: 'rgb(156, 163, 175, 0.2)' }} />
        <Bar dataKey="count" name="Count" fill="#667EEA" fillOpacity={0.6} />
      </BarChart>
    </ChartCard>
  );
};

export { Chart3 };
