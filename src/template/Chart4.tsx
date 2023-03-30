import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

import { ChartCard } from '@/chart/ChartCard';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const Chart4 = () => (
  <ChartCard title="Most used word">
    <PieChart>
      <Pie data={data} dataKey="value">
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

export { Chart4 };
