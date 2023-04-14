/* eslint-disable import/no-extraneous-dependencies */
import 'react-tabs/style/react-tabs.css';

import { useSession } from '@supabase/auth-helpers-react';

import { Meta } from '@/layout/Meta';
import { Form1 } from '@/template/AddUser';
import { LoginForm } from '@/template/auth/LoginForm';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const session = useSession();

  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {session ? <Form1 /> : <LoginForm />}
    </>
  );
};

export default Index;
