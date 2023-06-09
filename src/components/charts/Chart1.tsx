/* eslint-disable prettier/prettier */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable unused-imports/no-unused-vars */
import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartCard } from '@/components/chartCard/ChartCard';
import type { Mood } from '@/types/moodTypes';

const Chart1 = ({ moods }: any) => {
  const { data } = useMemo(() => {
    const moodsByDate = moods.reduce(
      (acc: Record<string, Mood[]>, mood: Mood) => {
        const date = new Date(mood.created_at).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date]?.push(mood as Mood);
        return acc;
      },
      {}
    );

    const data = Object.keys(moodsByDate).map((date) => ({
      date,
      rating:
        (moodsByDate[date]?.reduce(
          (acc: number, mood: Mood) => acc + mood.rating,
          0
        ) ?? 0) / (moodsByDate[date]?.length ?? 1),
    }));

    return { moodsByDate, data };
  }, [moods]);

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
