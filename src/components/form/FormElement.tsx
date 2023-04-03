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

type IDateRangeFormProps = {
  onDateRangeSelected: (startDate: string, endDate: string) => void;
};

/**
 * Component to select a date range.
 * @component
 * @params props - Component props.
 * @param props.onDateRangeSelected - Function to call when the date range is selected.
 */
const DateRangeForm = (props: IDateRangeFormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const startDate = (
      event.currentTarget.elements.namedItem('startDate') as HTMLInputElement
    )?.value;
    const endDate = (
      event.currentTarget.elements.namedItem('endDate') as HTMLInputElement
    )?.value;
    props.onDateRangeSelected(startDate, endDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormElement colSpanSize="sm:col-span-4 mr-3">
        <label htmlFor="startDate">Start Date:</label>
        <input id="startDate" type="date" required />
      </FormElement>

      <FormElement colSpanSize="sm:col-span-4 mr-3">
        <label htmlFor="endDate">End Date:</label>
        <input id="endDate" type="date" required />
      </FormElement>

      <button type="submit">Submit</button>
    </form>
  );
};

export { DateRangeForm, FormElement };
