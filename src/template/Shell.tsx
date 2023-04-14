/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Button } from '@/components/button/Button';
import { SidebarHeader } from '@/components/shell/SidebarHeader';
import { SidebarLink } from '@/components/shell/SidebarLink';

type IShellProps = {
  title: string;
  children: ReactNode;
};

const Shell = (props: IShellProps) => {
  const user = useUser();

  return (
    <SidebarHeader
      title={props.title}
      topLinks={
        <>
          <Link href="/">
            <SidebarLink
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M0 0h24v24H0z" stroke="none" />
                  <path d="M5 12H3l9-9 9 9h-2M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  <path d="M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6" />
                </svg>
              }
            >
              Home
            </SidebarLink>
          </Link>

          <Link href="/addMood">
            <SidebarLink
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M0 0h24v24H0z" stroke="none" />
                  <path d="M12 5v14M5 12h14" />
                </svg>
              }
            >
              Add
            </SidebarLink>
          </Link>
          <Link href="/viewMoods">
            <SidebarLink
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M0 0h24v24H0z" stroke="none" />
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path d="M10 12h4M12 10v4" />
                </svg>
              }
            >
              Data
            </SidebarLink>
          </Link>

          <Link href="/aiResponse">
            <SidebarLink
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0zm9-3a3 3 0 1 1-6 0a3 3 0 0 1 6 0z" />
                  <path d="M0 0h24v24H0z" stroke="none" />
                </svg>
              }
            >
              Ai - Resume
            </SidebarLink>
          </Link>
        </>
      }
      bottomLinks={
        <>
          <div className="flex flex-col items-center justify-center space-y-6 p-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-sm font-medium">
                  Thoughts & Emotion Explorer{' '}
                </span>
              </div>
            </div>
          </div>
        </>
      }
      leftContent={
        <>
          {user ? (
            <></>
          ) : (
            <>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            </>
          )}
        </>
      }
    >
      {props.children}
    </SidebarHeader>
  );
};

export default Shell;
