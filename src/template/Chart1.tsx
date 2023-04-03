/* eslint-disable no-unsafe-optional-chaining */
import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartCard } from '@/components/chart/ChartCard';
import type { Mood } from '@/types/moodTypes';

const Chart1 = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const user = useUser();

  useEffect(() => {
    async function getMoods() {
      try {
        const response = await fetch('/api/mood');
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { data: moods } = await response.json();
        setMoods(moods as Mood[]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
    getMoods();
  }, [user]);

  // Group moods by date
  const moodsByDate = moods.reduce((acc: Record<string, Mood[]>, mood) => {
    const date = new Date(mood.created_at).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date]?.push(mood);
    return acc;
  }, {} as Record<string, Mood[]>); // Add the "as Record<string, Mood[]>" part

  // Extract data for chart
  const data = Object.keys(moodsByDate).map((date) => ({
    date,
    rating:
      (moodsByDate[date]?.reduce(
        (acc: number, mood: Mood) => acc + mood.rating,
        0
      ) ?? 0) / (moodsByDate[date]?.length ?? 1),
  }));

  return (
    <ChartCard title="Rating over time">
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 28,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} domain={[0, 10]} />
        <CartesianGrid stroke="#E5E7EB" strokeDasharray="15" vertical={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="rating"
          name="Rating"
          strokeWidth={5}
          stroke="#667EEA"
          fill="#667EEA"
          fillOpacity={0.25}
        />
      </AreaChart>
    </ChartCard>
  );
};

export { Chart1 };
