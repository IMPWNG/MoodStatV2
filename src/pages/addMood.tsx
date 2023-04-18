/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-tabs/style/react-tabs.css';

import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import { useSession } from '@supabase/auth-helpers-react';
import React from 'react';

import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import styles from '@/styles/FormGrid.module.scss';
import { Form } from '@/template/AddMood';
import { FormNegative } from '@/template/AddNegative';
import { FormPositive } from '@/template/AddPositive';
import { LoginForm } from '@/template/auth/LoginForm';
import Shell from '@/template/Shell';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const session = useSession();

  // create const data wih array of Form1, Form2, Form3
  const data = [
    {
      label: '➕💬',
      value: 'form',
    },
    {
      label: '➕💢',
      value: 'form2',
    },
    {
      label: '➕✅',
      value: 'form3',
    },
  ];

  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {session ? (
        <Shell title="Add">
          <Section>
            <div className={styles.formGrid}>
              <Tabs value="form">
                <TabsHeader>
                  {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      <div className="flex items-center gap-2">{label}</div>
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody>
                  {data.map(({ value, label }) => (
                    <TabPanel key={label} value={value}>
                      {value === 'form' && <Form />}
                      {value === 'form2' && <FormNegative />}
                      {value === 'form3' && <FormPositive />}
                    </TabPanel>
                  ))}
                </TabsBody>
              </Tabs>
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
