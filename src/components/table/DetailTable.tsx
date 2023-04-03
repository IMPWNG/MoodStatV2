import type { ReactNode } from 'react';

import { Pagination } from '@/components/pagination/Pagination';

type IDetailTableType = {
  head: ReactNode;
  buttons: ReactNode;
  pagination: {
    stats: string;
    current: number;
    nbPage: number;
    href: string;
  };
  children: ReactNode;
};

const DetailTable = (props: IDetailTableType) => (
  <div>
    <div className="flex items-center justify-between">
      <div className="text-lg font-semibold text-gray-800">See your moods</div>

      <div className="flex space-x-2">{props.buttons}</div>
    </div>

    {/*
     * Border style applied to div and not to table.
     * Border style don't work with table.
     */}
    <div className="mt-5 overflow-auto rounded-xl border border-gray-200">
      <table className="mx-auto min-w-full overflow-auto whitespace-nowrap text-left">
        <thead className="border-b border-gray-300 bg-gray-100">
          {props.head}
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {props.children}
        </tbody>
      </table>
    </div>

    <div className="mt-5 flex flex-col items-center justify-between text-sm sm:flex-row">
      <div className="mb-2 sm:mb-0">{`Showing ${props.pagination.stats} entries`}</div>

      <Pagination
        current={props.pagination.current}
        nbPage={props.pagination.nbPage}
        href={props.pagination.href}
      />
    </div>

    <style jsx>
      {`
        table :global(thead th),
        table :global(tbody td) {
          @apply px-6 py-5;
        }

        table :global(tbody td:first-child) {
          @apply text-gray-800 font-semibold;
        }

        table :global(a) {
          @apply text-primary-500;
        }

        table :global(a:hover) {
          @apply text-primary-600;
        }
      `}
    </style>
  </div>
);

export { DetailTable };
