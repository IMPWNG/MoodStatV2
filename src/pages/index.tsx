/* eslint-disable tailwindcss/no-contradicting-classname */
/* eslint-disable no-nested-ternary */
// Index.tsx
import { useSession } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

import { MoodsProvider, useMoodsContext } from '@/context/MoodContext';
import { useUsers } from '@/hooks/useUserData';
import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { Form1 } from '@/template/AddUser';
import { LoginForm } from '@/template/auth/LoginForm';
import { Charts } from '@/template/Charts';
import Shell from '@/template/Shell';
import { Stats } from '@/template/Stats';
import { AppConfig } from '@/utils/AppConfig';

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-r-4 border-t-4 border-solid border-blue-500" />
        <h1 className="text-2xl font-bold text-gray-900">
          Loading your data ...
        </h1>
      </div>
    </div>
  );
};

const Index = () => {
  const session = useSession();
  const moodsData = useMoodsContext();
  const [loading, setLoading] = useState<boolean>(true);

  const { usersModel } = useUsers();

  useEffect(() => {
    if (usersModel) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [usersModel]);

  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {loading ? (
        <Loader />
      ) : session && usersModel ? (
        usersModel.map((userModels) => userModels).length > 0 ? (
          <Shell title="Hello">
            <>
              <Section>
                <Stats moods={moodsData.moods} />
              </Section>
              <Section>
                <Charts moods={moodsData.moods} />
              </Section>
            </>
          </Shell>
        ) : (
          <Section>
            <Form1 />
          </Section>
        )
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default function IndexPage() {
  return (
    <MoodsProvider>
      <Index />
    </MoodsProvider>
  );
}
