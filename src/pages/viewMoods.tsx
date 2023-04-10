/* eslint-disable import/no-extraneous-dependencies */
import 'react-tabs/style/react-tabs.css';

import { useSession } from '@supabase/auth-helpers-react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { MoodsProvider, useMoodsContext } from '@/context/MoodContext';
import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { LoginForm } from '@/template/auth/LoginForm';
import Shell from '@/template/Shell';
import { Table } from '@/template/Table';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const session = useSession();
  const moodsData = useMoodsContext();
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Shell title="Add">
        {session ? (
          <Tabs>
            <TabList>
              <Tab>View Moods</Tab>
              <Tab>View Thoughts</Tab>
            </TabList>
            <TabPanel>
              <Section>
                <Table moods={moodsData.moods} />
              </Section>
            </TabPanel>
            <TabPanel>
              <Section>
                <Table moods={moodsData.moods} />
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

export default function IndexPage() {
  return (
    <MoodsProvider>
      <Index />
    </MoodsProvider>
  );
}
