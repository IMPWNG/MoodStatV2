import classNames from 'classnames';
import Link from 'next/link';

type IPaginationProps = {
  current: number;
  nbPage: number;
  href: string;
};

const Pagination = (props: IPaginationProps) => {
  const aPreviousClass = classNames({
    'pointer-events-none': props.current === 1,
  });

  const divPreviousClass = classNames({
    'pagination-elt': true,
    'rounded-l-md': true,
    unselected: props.current !== 1,
    disabled: props.current === 1,
  });

  const aNextClass = classNames({
    'pointer-events-none': props.current === props.nbPage,
  });

  const divNextClass = classNames({
    'pagination-elt': true,
    'rounded-r-md': true,
    unselected: props.current !== props.nbPage,
    disabled: props.current === props.nbPage,
  });

  return (
    <div className="pagination flex items-stretch -space-x-px">
      <Link
        href={`${props.href}/${props.current - 1}`}
        className={aPreviousClass}
      >
        <div className={divPreviousClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </div>
      </Link>

      {[...Array(props.nbPage)].map((_elt, i) => {
        if (props.current !== i + 1) {
          return (
            // Disable eslint because it doesn't apply here,
            // element represents a page not an element
            // eslint-disable-next-line react/no-array-index-key
            <Link href={`${props.href}/${i + 1}`} key={i}>
              <div className="pagination-elt unselected">{i + 1}</div>
            </Link>
          );
        }

        return (
          // eslint-disable-next-line react/no-array-index-key
          <div className="pagination-elt bg-primary-500 text-gray-100" key={i}>
            {i + 1}
          </div>
        );
      })}

      <Link href={`${props.href}/${props.current + 1}`} className={aNextClass}>
        <div className={divNextClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none" />
            <path d="M9 6l6 6-6 6" />
          </svg>
        </div>
      </Link>

      <style jsx>
        {`
          .pagination :global(.pagination-elt) {
            @apply px-4 py-2 flex items-center justify-center border border-gray-200 h-full;
          }

          .pagination :global(.unselected) {
            @apply bg-white;
          }

          .pagination :global(.disabled) {
            @apply bg-gray-100;
          }

          .pagination :global(.unselected:hover) {
            @apply bg-gray-100;
          }

          .pagination svg {
            @apply stroke-current stroke-2 h-5 w-3;
          }
        `}
      </style>
    </div>
  );
};

export { Pagination };
