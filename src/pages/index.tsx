import { useSession } from '@supabase/auth-helpers-react';
import { Button } from 'flowbite-react';
import Link from 'next/link';

import { useMoods } from '@/hooks/useMoods';
import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { Charts } from '@/template/Charts';
import Shell from '@/template/Shell';
import { Stats } from '@/template/Stats';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const session = useSession();
  const moodsData = useMoods();
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Shell title="Dashboard">
        {session ? (
          <>
            <Section>
              <Stats moods={moodsData.moods} />
            </Section>
            <Section>
              <Charts />
            </Section>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-6 p-6 text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome to Mood Tracker!
            </h1>
            <Link href="/login">
              <Button className="rounded bg-indigo-600 px-4 py-2 font-bold text-white hover:bg-indigo-700">
                Login
              </Button>
            </Link>
          </div>
        )}
      </Shell>
    </>
  );
};

export default Index;
