import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

import { ChartCard } from '@/components/chartCard/ChartCard';
import type { Mood } from '@/types/moodTypes';

const Chart3 = ({ moods }: { moods: Mood[] }) => {
  // Group moods by category
  const moodsByCategory = moods.reduce(
    (acc: Record<string, Mood[]>, mood: Mood) => {
      const { category } = mood;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category]?.push(mood);
      return acc;
    },
    {}
  );

  // Extract data for chart
  const data = Object.keys(moodsByCategory).map((category) => ({
    category,
    count: moodsByCategory[category]?.length,
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
