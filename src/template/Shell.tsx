/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { Button } from '@/components/button/Button';
import { SidebarHeader } from '@/components/shell/SidebarHeader';

type IShellProps = {
  title: string;
  children: ReactNode;
};

const Shell = (props: IShellProps) => {
  const user = useUser();

  return (
    <SidebarHeader
      title={props.title}
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
