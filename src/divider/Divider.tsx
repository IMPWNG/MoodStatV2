type IDividerProps = {
  children: string;
};

/**
 * Equivalent to <hr /> HTML tag but with content.
 * @component
 * @params props - Component props.
 * @param props.children - The content to display.
 */
const Divider = (props: IDividerProps) => (
  <div className="mt-6 mb-4 flex items-center">
    <div className="grow border-t border-gray-300" />
    <span className="mx-4 shrink text-gray-400">{props.children}</span>
    <div className="grow border-t border-gray-300" />
  </div>
);

export { Divider };
