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

import { ChartCard } from '@/chart/ChartCard';
import type { Mood } from '@/types/moodTypes';

const data = [
  {
    users: 30,
    month: 'Apr',
  },
  {
    users: 25,
    month: 'May',
  },
  {
    users: 38,
    month: 'Jun',
  },
  {
    users: 45,
    month: 'Jul',
  },
  {
    users: 42,
    month: 'Aug',
  },
  {
    users: 40,
    month: 'Sep',
  },
  {
    users: 50,
    month: 'Oct',
  },
  {
    users: 55,
    month: 'Nov',
  },
  {
    users: 57,
    month: 'Dec',
  },
];

const Chart2 = () => {
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
        console.error(error);
      }
    }
    getMoods();
  }, [user]);

  const formatDateTime = (dateTimeString = '', format = '') => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    let formattedDateTime = '';
    switch (format) {
      case 'date':
        formattedDateTime = `${year}-${month}-${day}`;
        break;
      case 'time':
        formattedDateTime = `${hours}:${minutes}:${seconds}`;
        break;
      default:
        formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        break;
    }
    return formattedDateTime;
  };

  return (
    <ChartCard title="Count per Month">
      <AreaChart
        data={data}
        margin={{
          top: 0,
          right: 28,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <CartesianGrid stroke="#E5E7EB" strokeDasharray="15" vertical={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="users"
          name="Users"
          strokeWidth={5}
          stroke="#3B82F6"
          fill="#3B82F6"
          fillOpacity={0.25}
        />
      </AreaChart>
    </ChartCard>
  );
};

export { Chart2 };
