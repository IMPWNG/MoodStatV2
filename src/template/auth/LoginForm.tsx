/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { FullCenterSection } from '@/layout/FullCenterSection';

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

  const handleLogInWithGoogle = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    if (error) {
      console.log('Error logging in with Google:', error.message);

      return;
    }
    console.log('data', data);
  };

  if (!user) {
    return (
      <FullCenterSection title="Sign in to your account">
        <div className="align-center my-4 flex items-center justify-center text-center">
          <button
            onClick={handleLogInWithGoogle}
            className="google-signin-button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#4285F4',
              color: '#fff',
              borderRadius: '4px',
              border: '1px solid #4285F4',
              fontSize: '14px',
              fontWeight: 'bold',
              fontFamily: 'Roboto, Arial, sans-serif',
              cursor: 'pointer',
              padding: '8px 24px',
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google logo"
              style={{
                width: '18px',
                height: '18px',
                marginRight: '8px',
              }}
            />
            Sign in with Google
          </button>
        </div>
      </FullCenterSection>
    );
  }
  return null;
};

export { LoginForm };
