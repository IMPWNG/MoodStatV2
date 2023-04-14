/* eslint-disable no-nested-ternary */
// Index.tsx
import { useSession } from '@supabase/auth-helpers-react';

import { MoodsProvider, useMoodsContext } from '@/context/MoodContext';
import { useUsers } from '@/hooks/useUserData';
import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { Form1 } from '@/template/AddThought';
import { LoginForm } from '@/template/auth/LoginForm';
import { Charts } from '@/template/Charts';
import Shell from '@/template/Shell';
import { Stats } from '@/template/Stats';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const session = useSession();
  const moodsData = useMoodsContext();
  const { usersModel } = useUsers();

  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {session ? (
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
