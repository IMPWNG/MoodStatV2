import type { ReactNode } from 'react';

import { Logo } from '@/template/Logo';

type IFullCenterSectionProps = {
  children?: ReactNode;
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
};

/**
 * A centered layout when the whole page needs to be centered.
 * @component
 */
const FullCenterSection = (props: IFullCenterSectionProps) => (
  <div className="custom-bg flex min-h-screen items-center justify-center p-6">
    <div className="w-full max-w-md rounded-lg bg-white p-4 text-center shadow-lg">
      <Logo xl />

      <div className="mt-5">
        {props.icon && <div className="mb-1">{props.icon}</div>}
        <div className="mt-1">
          <div className="text-left">{props.children}</div>
        </div>
      </div>
    </div>
  </div>
);

export { FullCenterSection };
