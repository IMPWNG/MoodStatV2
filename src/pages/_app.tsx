/* eslint-disable import/no-extraneous-dependencies */
import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import { SessionContextProvider, useUser } from '@supabase/auth-helpers-react';
import moment from 'moment-timezone';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SWRConfig } from 'swr';

import { MoodsProvider } from '@/context/MoodContext';
import { fetcher } from '@/utils/fetcher';
import { createBrowserSupabaseClient } from '@/utils/supabase';

config.autoAddCss = false;

moment.tz.setDefault('America/New_York');

export default function MyApp({ Component, pageProps }: AppProps) {
  const { push } = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user) {
      push('/');
    }
  }, [user]);

  const [supabaseClient] = useState(createBrowserSupabaseClient());

  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <MoodsProvider>
        <SWRConfig value={{ fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
      </MoodsProvider>
    </SessionContextProvider>
  );
}
