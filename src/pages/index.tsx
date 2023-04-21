/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-alert */
/* eslint-disable tailwindcss/no-contradicting-classname */
/* eslint-disable no-nested-ternary */
// Index.tsx
import { useSession } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

import { Toast } from '@/components/toast/AddMood';
import { MoodsProvider, useMoodsContext } from '@/context/MoodContext';
import { useSendAlert } from '@/hooks/useSendAlert';
import { useUsers } from '@/hooks/useUserData';
import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { Form1 } from '@/template/AddUser';
import { LoginForm } from '@/template/auth/LoginForm';
import { Charts } from '@/template/Charts';
import Shell from '@/template/Shell';
import { Stats } from '@/template/Stats';
import { AppConfig } from '@/utils/AppConfig';

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-r-4 border-t-4 border-solid border-blue-500" />
        <h1 className="text-2xl font-bold text-gray-900">
          Loading your data ...
        </h1>
      </div>
    </div>
  );
};

const Index = () => {
  const session = useSession();
  const moodsData = useMoodsContext();
  const { usersModel } = useUsers();

  const sendMessage = useSendAlert();
  const [loading, setLoading] = useState<boolean>(true);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleToastVisibility = () => {
    setShowToast(!showToast);
  };

  const formatDateTime = (dateTimeString = '') => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
  };

  const { user } = session || {};

  useEffect(() => {
    if (usersModel) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [usersModel]);

  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      {loading ? (
        <Loader />
      ) : session && usersModel ? (
        usersModel.map((userModels) => userModels).length > 0 ? (
          <Shell title="Hello">
            <>
              <Toast
                onClick={handleToastVisibility}
                lastestMood={
                  moodsData.moods[moodsData.moods.length - 1]?.description || ''
                }
                timeStamp={formatDateTime(
                  moodsData.moods[moodsData.moods.length - 1]?.created_at
                )}
                content={
                  moodsData.moods[moodsData.moods.length - 1]?.description || ''
                }
              />
              <div className="flex flex-col items-center justify-center space-y-4">
                <p className="text-xl font-bold text-gray-900">
                  Send a reminder to log your mood on your phone every day at
                  10am and 4pm
                </p>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  className="focus:shadow-outline rounded-full border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
                  onChange={handlePhoneNumber}
                />

                <button
                  type="button"
                  className="focus:shadow-outline rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
                  onClick={() => {
                    if (phoneNumber) {
                      sendMessage.sendMessage(
                        `Hi, ${user?.user_metadata?.full_name} 👋. Don't forget to log your mood today. Link: https://mood-stat-v2.vercel.app/addMood/`,
                        phoneNumber
                      );
                    } else {
                      alert('Please enter a phone number');
                    }
                  }}
                >
                  Send Alert
                </button>
              </div>

              <Section>
                <Stats moods={moodsData.moods} />
              </Section>
              <Section>
                <Charts moods={moodsData.moods} />
              </Section>
            </>
          </Shell>
        ) : (
          <Section>
            <Form1 />
          </Section>
        )
      ) : (
        <LoginForm />
      )}
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
