import { useSession } from '@supabase/auth-helpers-react';

import { useMoods } from '@/hooks/useMoods';
import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { LoginForm } from '@/template/auth/LoginForm';
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
      {session ? (
        <Shell title="Dashboard">
          <>
            <Section>
              <Stats moods={moodsData.moods} />
            </Section>
            <Section>
              <Charts />
            </Section>
          </>
        </Shell>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default Index;
