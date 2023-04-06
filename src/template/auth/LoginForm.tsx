/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { FullCenterSection } from '@/layout/FullCenterSection';

// eslint-disable-next-line consistent-return
const LoginForm = () => {
  const supabaseClient = useSupabaseClient();
  const session = useSession();

  const handleLogInWithGoogle = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      console.log('Error logging in with Google:', error.message);

      return;
    }
    console.log('data', data);
  };

  if (!session) {
    return (
      <FullCenterSection title="Sign in to your account">
        <div className="align-center my-4 flex items-center justify-center text-center">
          <button
            onClick={handleLogInWithGoogle}
            className="google-signin-button transition duration-300 ease-in-out hover:scale-105"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'linear-gradient(135deg, #4285F4 0%, #DB4437 33%, #F4B400 66%, #0F9D58 100%)',

              color: '#fff',
              borderRadius: '12px',
              border: '1px solid ',
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
              className="transition duration-300 ease-in-out hover:scale-105"
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
