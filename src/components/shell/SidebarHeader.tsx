/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import className from 'classnames';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Logo } from '@/template/Logo';
import { useMenu } from '@/utils/Navigation';

import { Profile } from '../userProfile/Profile';

type ISidebarHeaderProps = {
  topLinks?: ReactNode;
  bottomLinks?: ReactNode;
  title: string;
  leftContent: ReactNode;
  children: ReactNode;
};

const SidebarHeader = (props: ISidebarHeaderProps) => {
  const { showMenu, handleClose } = useMenu();

  const clickableBgClass = className(
    'fixed',
    'w-full',
    'h-full',
    'z-40',
    'inset-0',
    'bg-black',
    'opacity-50',
    'cursor-default',
    {
      hidden: !showMenu,
    },
    'lg:hidden'
  );

  return (
    <div className="flex h-screen text-gray-600 antialiased">
      <button
        className={clickableBgClass}
        onClick={handleClose}
        aria-label="Close"
        type="button"
        tabIndex={-1}
      />

      <div className="flex flex-1 flex-col overflow-hidden bg-gray-200 p-4 lg:p-4">
        <header className="flex h-16 items-center justify-between rounded-2xl bg-white p-4 shadow-xl">
          <div className="flex flex-1 items-center justify-center lg:flex-none lg:justify-start">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <div className="ml-auto flex items-center justify-between space-x-4">
            <Link href="/addMood">
              <p className="font-display max-w-sm text-xl font-bold leading-tight">
                <span className="link link-underline link-underline-black text-black">
                  &nbsp;&nbsp;Add Mood &nbsp;&nbsp;
                </span>
              </p>
            </Link>
            <Link href="/aiResponse">
              <p className="font-display max-w-sm text-xl font-bold leading-tight">
                <span className="link link-underline link-underline-black text-black">
                  &nbsp;&nbsp;AI&nbsp;&nbsp;
                </span>
              </p>
            </Link>

            {props.leftContent}
          </div>
          <div className="ml-10">
            <Profile />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="py-8">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export { SidebarHeader };
