import { useSession } from '@supabase/auth-helpers-react';

import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { LoginForm } from '@/template/auth/LoginForm';
import { Form } from '@/template/Form';
import Shell from '@/template/Shell';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const session = useSession();
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Shell title="Add">
        {session ? (
          <>
            <Section>
              <Form />
            </Section>
          </>
        ) : (
          <LoginForm />
        )}
      </Shell>
    </>
  );
};

export default Index;
