// Index.tsx
import { useSession } from '@supabase/auth-helpers-react';

import { MoodsProvider, useMoodsContext } from '@/context/MoodContext';
import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { LoginForm } from '@/template/auth/LoginForm';
import { Charts } from '@/template/Charts';
import Shell from '@/template/Shell';
import { Stats } from '@/template/Stats';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const session = useSession();
  const moodsData = useMoodsContext();

  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {session ? (
        <Shell title="Hello nTest">
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
