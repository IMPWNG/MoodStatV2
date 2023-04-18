/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-tabs/style/react-tabs.css';

import { useSession } from '@supabase/auth-helpers-react';

import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import styles from '@/styles/FormGrid.module.scss';
import { Form } from '@/template/AddMood';
import { LoginForm } from '@/template/auth/LoginForm';
import Shell from '@/template/Shell';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const session = useSession();
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {session ? (
        <Shell title="Add">
          <Section>
            <div className={styles.formGrid}>
              <Form />
              <Form />
              <Form />
              <Form />
              <Form />
              <Form />
            </div>
          </Section>
        </Shell>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default Index;
