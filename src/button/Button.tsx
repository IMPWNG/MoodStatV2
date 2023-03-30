import classNames from 'classnames';

type IButtonProps = {
  xs?: boolean;
  sm?: boolean;
  xl?: boolean;
  secondary?: boolean;
  full?: boolean;
  children: string;
  onClick?: () => void;
  backgroundColor?: string;
  className?: string;
  isSelected?: boolean;
};

const Button = (props: IButtonProps) => {
  const btnClass = classNames({
    btn: true,
    'btn-xs': props.xs,
    'btn-sm': props.sm,
    'btn-xl': props.xl,
    'btn-base': !props.xl,
    'btn-secondary': props.secondary,
    'btn-primary': !props.secondary,
    'w-full': props.full,
    [props.backgroundColor ?? '']: props.backgroundColor,
    [props.className ?? '']: props.className,
    // set background color to green when the button is selected
    'bg-green-500': props.isSelected,
  });

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <div className={btnClass} onClick={handleClick}>
      {props.children}

      <style jsx>
        {`
          .btn {
            @apply inline-block rounded-md text-center border;
          }

          .btn-base {
            @apply text-lg font-semibold py-2 px-4;
          }

          .btn-xl {
            @apply font-extrabold text-xl py-4 px-6;
          }

          .btn-xs {
            @apply text-sm py-2 px-2;
          }

          .btn-sm {
            @apply text-base font-medium py-2 px-3;
          }

          .btn-primary {
            @apply text-white bg-primary-500 border-gray-100;
          }

          .btn-primary:hover {
            @apply bg-primary-600;
          }

          .btn-primary:active {
            @apply bg-primary-500;
          }

          .btn-secondary {
            @apply bg-white text-primary-500 border-gray-200;
          }

          .btn-secondary:hover {
            @apply bg-gray-100;
          }

          .btn-secondary:active {
            @apply border-gray-200;
          }
          .btn-red {
            @apply text-white bg-red-500 border-red-500;
          }

          .btn-red:hover {
            @apply bg-red-600;
          }

          .btn-red:active {
            @apply bg-red-700;
          }
          .btn-yellow {
            @apply text-black bg-yellow-500 border-yellow-500;
          }

          .btn-yellow:hover {
            @apply bg-yellow-600;
          }

          .btn-yellow:active {
            @apply bg-yellow-700;
          }
          .btn-green {
            @apply text-white bg-green-500 border-green-500;
          }
          .btn-green:hover {
            @apply bg-green-600;
          }
          .btn-green:active {
            @apply bg-green-700;
          }
        `}
      </style>
    </div>
  );
};

export { Button };
