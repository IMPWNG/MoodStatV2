import { useSession } from '@supabase/auth-helpers-react';

import { MoodsProvider, useMoodsContext } from '@/context/MoodContext';
import { useThoughts } from '@/hooks/useUserData';
import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { AiResponse } from '@/template/AiResponse';
import { LoginForm } from '@/template/auth/LoginForm';
import Shell from '@/template/Shell';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const session = useSession();
  const moodsData = useMoodsContext();
  const { thoughts } = useThoughts();
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {session ? (
        <Shell title="Add">
          <Section>
            <AiResponse moods={moodsData.moods} thoughts={thoughts} />
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
