import className from 'classnames';
import type { ReactNode } from 'react';

import { Logo } from '@/template/Logo';

type ISidebarProps = {
  show?: boolean;
  topLinks: ReactNode;
  bottomLinks: ReactNode;
};

const Sidebar = (props: ISidebarProps) => {
  const sidebarClass = className(
    'w-64',
    'inset-y-0',
    'left-0',
    'z-50',
    'bg-white',
    'overflow-y-auto',
    'py-8',
    'px-3',
    'flex',
    'flex-col',
    'fixed',
    'lg:static',
    'transition',
    'duration-300',
    'ease-in-out',
    'transform',
    {
      'translate-x-0': props.show,
      '-translate-x-full': !props.show,
    },
    'lg:translate-x-0'
  );

  return (
    <div className={sidebarClass}>
      <Logo />

      <div className="mt-10 flex-1">{props.topLinks}</div>

      <div>{props.bottomLinks}</div>
    </div>
  );
};

export { Sidebar };
