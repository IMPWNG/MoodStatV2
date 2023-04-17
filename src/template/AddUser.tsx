/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable func-names */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';



const PopupAlert = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 mx-auto md:bottom-auto md:right-0 md:m-8 md:w-auto md:max-w-md">
      <div
        className="mx-auto w-full rounded-lg border-t-4 border-green-500 bg-white px-4 py-3 text-gray-700 shadow-md md:mx-0 md:w-auto"
        role="alert"
      >
        <div className="flex justify-center md:justify-start">
          <div className="py-1">
            <svg
              className="mr-4 h-6 w-6 fill-current text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">User Created!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Form1 = () => {
  const [age, setAge] = useState<number | null>(null);
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [, setNegativeThoughtsFrequency] = useState<number | null>(null);

  const [emotionManagementDifficulty, setEmotionManagementDifficulty] =
    useState<boolean>(false);
  const [, setStressFrequency] = useState<number | null>(null);
  const [sleepProblems, setSleepProblems] = useState<boolean>(false);
  const [lifeChangeExperience, setLifeChangeExperience] = useState<string>('');
  const [diagnosedWithMentalIllness, setDiagnosedWithMentalIllness] =
    useState<boolean>(false);
  const [supportSystemAvailability, setSupportSystemAvailability] =
    useState<boolean>(false);
  const [helpfulActivities, setHelpfulActivities] = useState<string>('');


  const [, setIsAdded] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [clickedThoughtsFrequency, setClickedThoughtsFrequency] = useState<
    number | null
  >(null);
  const [clickedStressFrequency, setClickedStressFrequency] = useState<
    number | null
  >(null);

  const user = useUser();
  const supabase = useSupabaseClient();

  const supabaseClient = useSupabaseClient<any>();




  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) console.log('Error logging out:', error.message);
  };

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    try {
      const { error } = await supabase.from('users_data').insert([
        {
          user_id: user?.id,
          name,
          age,
          gender,
          negativeThoughtsFrequency: clickedThoughtsFrequency,
          emotionManagementDifficulty,
          stressFrequency: clickedStressFrequency,
          sleepProblems,
          lifeChangeExperience,
          diagnosedWithMentalIllness,
          supportSystemAvailability,
          helpfulActivities,

        },
      ]);

      if (error) throw error;

      setIsAdded(true);
      setAge(null);
      setName('');
      setGender('');

      setNegativeThoughtsFrequency(null);
      setClickedThoughtsFrequency(null);
      setEmotionManagementDifficulty(false);
      setStressFrequency(null);
      setClickedStressFrequency(null);
      setSleepProblems(false);
      setLifeChangeExperience('');
      setDiagnosedWithMentalIllness(false);
      setSupportSystemAvailability(false);
      setHelpfulActivities('');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      window.location.href = '/';
    } catch (error: unknown) {
      console.log('error', error);
    }
  };

  const handleClickedThoughtsFrequency = (
    negativeThoughtsFrequency: number
  ) => {
    setClickedThoughtsFrequency(negativeThoughtsFrequency);
  };

  const handleClickedStressFrequency = (stressFrequency: number) => {
    setClickedStressFrequency(stressFrequency);
  };


  return (
    <div className="form-container flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto w-full items-center justify-center rounded-md md:w-auto md:max-w-lg md:rounded-lg">
        {showAlert && <PopupAlert />}
        {showAlert && <PopupAlert />}
        <h2 className="form-title mt-8 text-center text-gray-800">
          Hello {user?.user_metadata.full_name} 👋
             </h2>
        <p className="form-subtitle mb-6 text-center text-gray-600"> Welcome on Thought Explorer! Fill out the form below, so we can get to know you better 😄 </p>
        <form
          className="form px-8 py-6"
          onSubmit={handleAddUser}
        >
          <div className="form-field">
            <label htmlFor="comment" className="form-label">
              What's your Name ? *
            </label>
            <div className="form-comment">
              <input
                type="string"
                id="name"
                className="form-input mt-4"
                placeholder="Enter your name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <label htmlFor="comment" className="form-label">
              How old are you? *
            </label>
            <div className="form-comment">
              <input
                type="number"
                id="age"
                className="form-input mt-4"
                placeholder="Enter your age"
                required
                onChange={(e) => setAge(Number(e.target.value))}
              />
            </div>
            <label htmlFor="comment" className="form-label">
              What's your gender? *
            </label>
            <div className="form-comment">
              <input
                type="text"
                id="gender"
                className="form-input mt-4"
                placeholder="I am..."
                required
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <label htmlFor="comment" className="form-label">
              On a scale of 1 to 10, how often do you have negative thoughts per
              day? *
            </label>
            <div className="form-comment mt-4 justify-center text-center">
              {Array.from({ length: 10 }, (_, index) => {
                const negativeThoughtsFrequency = index + 1;
                return (
                  <button
                    key={negativeThoughtsFrequency}
                    type="button"
                    className={`form-rating-button${
                      negativeThoughtsFrequency === clickedThoughtsFrequency
                        ? ' selected'
                        : ''
                    }`}
                    onClick={() =>
                      handleClickedThoughtsFrequency(negativeThoughtsFrequency)
                    }
                  >
                    {negativeThoughtsFrequency}
                  </button>
                );
              })}
            </div>

            <label htmlFor="comment" className="form-label">
              Is it difficul for you to manage your emotions? *
            </label>
            <div className="form-comment">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="emotionManagementDifficultyYes"
                  className="form-radio my-4"
                  name="emotionManagementDifficulty"
                  value="Yes"
                  onChange={(_e) => setEmotionManagementDifficulty(true)}
                  required
                />
                <label htmlFor="emotionManagementDifficulty" className="ml-2">
                  Yes
                </label>
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="radio"
                  id="emotionManagementDifficultyNo"
                  className="form-radio"
                  name="emotionManagementDifficulty"
                  value="No"
                  onChange={(_e) => setEmotionManagementDifficulty(false)}
                  required
                />
                <label htmlFor="emotionManagementDifficulty" className="ml-2">
                  No
                </label>
              </div>
            </div>

            <label htmlFor="comment" className="form-label">
              On a scale of 1 to 10, how often do you feel stressed per day? *
            </label>
            <div className="form-comment mt-4 justify-center text-center">
              {Array.from({ length: 10 }, (_, index) => {
                const stressFrequency = index + 1;
                return (
                  <button
                    key={stressFrequency}
                    type="button"
                    className={`form-rating-button${
                      stressFrequency === clickedStressFrequency
                        ? ' selected'
                        : ''
                    }`}
                    onClick={() =>
                      handleClickedStressFrequency(stressFrequency)
                    }
                  >
                    {stressFrequency}
                  </button>
                );
              })}
            </div>

            <label htmlFor="comment" className="form-label">
              Do you have problems sleeping? *
            </label>
            <div className="form-comment">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="sleepProblemsYes"
                  name="sleepProblems"
                  className="form-radio my-4"
                  value="yes"
                  onChange={(_e) => setSleepProblems(true)}
                  required
                />
                <label htmlFor="sleepProblemsYes" className="ml-2">
                  Yes
                </label>
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="radio"
                  id="sleepProblemsNo"
                  name="sleepProblems"
                  className="form-radio"
                  value="no"
                  onChange={(_e) => setSleepProblems(false)}
                  required
                />
                <label htmlFor="sleepProblemsNo" className="ml-2">
                  No
                </label>
              </div>
            </div>

            <label htmlFor="comment" className="form-label">
              Have you experienced a life change recently? *
            </label>
            <div className="form-comment mt-4">
              <input
                type="text"
                id="lifeChangeExperience"
                className="form-input"
                placeholder="If yes, what was it?"
                onChange={(e) => setLifeChangeExperience(e.target.value)}
                required
              />
            </div>
            <label htmlFor="comment" className="form-label">
              Did you get diagnosed with a mental illness? *
            </label>
            <div className="form-comment">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="diagnosedWithMentalIllnessYes"
                  name="diagnosedWithMentalIllness"
                  className="form-radio my-4"
                  value="yes"
                  onChange={(_e) => setDiagnosedWithMentalIllness(true)}
                  required
                />
                <label htmlFor="diagnosedWithMentalIllness" className="ml-2">
                  Yes
                </label>
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="radio"
                  id="diagnosedWithMentalIllnessNo"
                  name="diagnosedWithMentalIllness"
                  className="form-radio"
                  value="no"
                  onChange={(_e) => setDiagnosedWithMentalIllness(false)}
                  required
                />
                <label htmlFor="diagnosedWithMentalIllness" className="ml-2">
                  No
                </label>
              </div>
            </div>

            <label htmlFor="comment" className="form-label">
              Do you have a support system? *
            </label>
            <div className="form-comment">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="supportSystemAvailabilityYes"
                  name="supportSystemAvailability"
                  className="form-radio my-4"
                  value="yes"
                  onChange={(_e) => setSupportSystemAvailability(true)}
                  required
                />
                <label htmlFor="supportSystemAvailability" className="ml-2">
                  Yes
                </label>
              </div>

              <div className="mb-4 flex items-center">
                <input
                  type="radio"
                  id="supportSystemAvailabilityNo"
                  name="supportSystemAvailability"
                  className="form-radio"
                  value="no"
                  onChange={(_e) => setSupportSystemAvailability(false)}
                  required
                />
                <label htmlFor="supportSystemAvailability" className="ml-2">
                  No
                </label>
              </div>
            </div>
            <label htmlFor="comment" className="form-label">
              Did you have an helpfull activity? *
            </label>
            <div className="form-comment">
              <input
                type="text"
                id="helpfulActivities"
                className="form-input mt-4"
                placeholder="I did..."
                onChange={(e) => setHelpfulActivities(e.target.value)}
                required
              />
            </div>
           
          </div>

          <button
            type="submit"
            className="form-submit-button mt-6 w-full rounded-md bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600"
          >
            Add
          </button>
          <button
            className="form-submit-button mt-6 w-full rounded-md bg-red-500 py-2 font-semibold text-white hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export { Form1 };
