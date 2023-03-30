import classNames from 'classnames';
import type { ReactNode } from 'react';

type IFormElementProps = {
  children: ReactNode;
  colSpanSize?: string;
  helper?: string;
};

/**
 * Style html form elements with design style.
 * @component
 * @params props - Component props.
 * @param props.children - Children components.
 * @param props.colSpanSize - Tailwind CSS class to control how elements are sized in grid.
 * @param props.helper - Helper message for users on how fill the form element.
 */
const FormElement = (props: IFormElementProps) => {
  const inputClass = classNames('input', props.colSpanSize);

  return (
    <div className={inputClass}>
      {props.children}

      {props.helper && (
        <div className="mt-1 text-sm text-gray-500">{props.helper}</div>
      )}

      <style jsx>
        {`
          .input :global(input),
          .input :global(select),
          .input :global(textarea) {
            @apply w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50;
          }
        `}
      </style>
    </div>
  );
};

export { FormElement };
