// eslint-disable-next-line import/no-extraneous-dependencies
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Auth } from '@supabase/auth-ui-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { FullCenterSection } from '@/layout/FullCenterSection';
import { getURL } from '@/utils/url';

// eslint-disable-next-line consistent-return
const LoginForm = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  useEffect(() => {
    if (user) {
      router.replace('/');
    }
  }, [user]);

  if (!user)
    return (
      <FullCenterSection title="Sign in to your account">
        <Auth
          supabaseClient={supabaseClient}
          providers={['github']}
          redirectTo={getURL()}
          magicLink={true}
          theme="dark"
        />
      </FullCenterSection>
    );
};

export { LoginForm };
