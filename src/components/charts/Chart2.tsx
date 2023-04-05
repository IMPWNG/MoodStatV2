/* eslint-disable @typescript-eslint/no-shadow */
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

const Chart2 = ({ moods }: { moods: Mood[] }) => {
  // Group moods by date
  const moodsByDate = moods.reduce(
    (acc: Record<string, Mood[]>, mood: Mood) => {
      const date = new Date(mood.created_at).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date]?.push(mood);
      return acc;
    },
    {}
  );

  // Extract data for chart
  const data = Object.keys(moodsByDate).map((date) => ({
    date,
    count: moodsByDate[date]?.length,
  }));

  return (
    <ChartCard title="Entries over time">
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
        <YAxis tickLine={false} axisLine={false} />
        <CartesianGrid stroke="#E5E7EB" strokeDasharray="15" vertical={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="count"
          name="Count"
          strokeWidth={5}
          stroke="#10B981"
          fill="#10B981"
          fillOpacity={0.25}
        />
      </AreaChart>
    </ChartCard>
  );
};

export { Chart2 };
