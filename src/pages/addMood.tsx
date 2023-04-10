/* eslint-disable import/no-extraneous-dependencies */
import 'react-tabs/style/react-tabs.css';

import { useSession } from '@supabase/auth-helpers-react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { Form } from '@/template/AddMood';
import { LoginForm } from '@/template/auth/LoginForm';
import Shell from '@/template/Shell';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const session = useSession();
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Shell title="Add">
        {session ? (
          <Tabs>
            <TabList>
              <Tab>Add Mood</Tab>
              <Tab>Add Thought</Tab>
            </TabList>
            <TabPanel>
              <Section>
                <Form />
              </Section>
            </TabPanel>
            <TabPanel>
              <Section>
                <Form />
              </Section>
            </TabPanel>
          </Tabs>
        ) : (
          <LoginForm />
        )}
      </Shell>
    </>
  );
};

export default Index;
