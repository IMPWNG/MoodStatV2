import classNames from 'classnames';
import type { ReactNode } from 'react';

type IFormElementBoxProps = {
  htmlFor?: string;
  text: string;
  children: ReactNode;
  colSpanSize?: string;
};

/**
 * Style radio and checkbox options with design style.
 * @component
 * @params props - Component props.
 * @param props.htmlFor - for attribute in HTML.
 * @param props.text - Label text.
 * @param props.children - Children components.
 * @param props.colSpanSize - Tailwind CSS class to control how elements are sized in grid.
 */
const FormElementBox = (props: IFormElementBoxProps) => {
  const boxClass = classNames(
    'form-element-box',
    'flex',
    'items-center',
    props.colSpanSize
  );

  return (
    <div className={boxClass}>
      {props.children}

      <label htmlFor={props.htmlFor} className="ml-2">
        {props.text}
      </label>

      <style jsx>
        {`
          .form-element-box :global(input[type='checkbox']),
          .form-element-box :global(input[type='radio']) {
            @apply border-gray-300 text-primary-600 shadow-sm hover:border-gray-300 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0;
          }

          .form-element-box :global(input[type='checkbox']) {
            @apply rounded;
          }
        `}
      </style>
    </div>
  );
};

export { FormElementBox };
