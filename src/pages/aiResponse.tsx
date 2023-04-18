/* eslint-disable no-nested-ternary */
import { useSession } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

import { MoodsProvider, useMoodsContext } from '@/context/MoodContext';
import { useUsers } from '@/hooks/useUserData';
import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { AiResponse } from '@/template/AiResponse';
import { LoginForm } from '@/template/auth/LoginForm';
import Shell from '@/template/Shell';
import { AppConfig } from '@/utils/AppConfig';

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-r-4 border-t-4 border-solid border-blue-500" />
        <h1 className="text-2xl font-bold text-gray-900">Loading AI ...</h1>
      </div>
    </div>
  );
};

const Index = () => {
  const session = useSession();
  const moodsData = useMoodsContext();
  const { usersModel } = useUsers();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (usersModel) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [usersModel]);

  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {loading ? (
        <Loader />
      ) : session ? (
        <Shell title="Add">
          <Section>
            <AiResponse moods={moodsData.moods} usersModels={usersModel} />
          </Section>
        </Shell>
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
