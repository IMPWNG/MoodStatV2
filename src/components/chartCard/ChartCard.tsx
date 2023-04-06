/* eslint-disable tailwindcss/classnames-order */
import type { ReactElement } from 'react';
import { ResponsiveContainer } from 'recharts';

type IChartCardProps = {
  title: string;
  children: ReactElement;
};

const ChartCard = (props: IChartCardProps) => (
  <div className="rounded-md border border-gray-200 bg-white pt-6 pb-8 shadow-lg">
    <div className="mb-8 pl-5 text-lg font-semibold text-gray-800">
      {props.title}
    </div>

    <ResponsiveContainer height={400}>{props.children}</ResponsiveContainer>
  </div>
);

export { ChartCard };
