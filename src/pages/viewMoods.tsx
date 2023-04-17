/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-tabs/style/react-tabs.css';

import { useSession } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

import { MoodsProvider, useMoodsContext } from '@/context/MoodContext';
import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { LoginForm } from '@/template/auth/LoginForm';
import Shell from '@/template/Shell';
import { Table } from '@/template/Table';
import { AppConfig } from '@/utils/AppConfig';

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-r-4 border-t-4 border-solid border-blue-500" />
        <h1 className="text-2xl font-bold text-gray-900">
          Loading your moods ...
        </h1>
      </div>
    </div>
  );
};

const Index = () => {
  const session = useSession();
  const moodsData = useMoodsContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (moodsData) {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  }, [moodsData]);

  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {loading ? (
        <Loader />
      ) : session && moodsData ? (
        <Shell title="Add">
          <Section>
            <Table moods={moodsData.moods} />
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
