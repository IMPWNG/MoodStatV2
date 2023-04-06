import type { ReactNode } from 'react';

type IStatsCardProps = {
  icon: ReactNode;
  text: string;
  children: ReactNode;
  iconColor?: string;
};

const StatsCard = (props: IStatsCardProps) => (
  <div className="stats-card flex items-center rounded-md border border-gray-200 bg-white p-4 shadow-md">
    <div
      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${
        props.iconColor ?? 'bg-indigo-400'
      }`}
    >
      {props.icon}
    </div>

    <div className="ml-4">
      <div className="text-xl font-bold text-gray-800">{props.children}</div>
      <div className="text-lg font-semibold">{props.text}</div>
    </div>

    <style jsx>
      {`
        .stats-card :global(svg) {
          @apply text-gray-100 stroke-current w-8 h-8 stroke-2;
        }
      `}
    </style>
  </div>
);

export { StatsCard };
