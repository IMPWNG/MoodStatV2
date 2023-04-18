/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useEffect, useState } from 'react';

const PopupAlert = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="fixed bottom-0 right-0 mb-8 mr-8">
      <div className="mx-auto flex w-full max-w-sm items-center justify-center overflow-hidden rounded-lg bg-white shadow-md">
        <div
          className={`flex h-full w-12 items-center justify-center ${
            isLoading ? 'animate-pulse' : ''
          }`}
        >
          <svg
            className="h-6 w-6 fill-current text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div className="px-3 py-2">
          <div
            className={`text-sm font-semibold ${
              isLoading ? 'text-gray-400' : 'text-green-500'
            }`}
          >
            {isLoading ? 'Loading...' : 'Mood Added!'}
          </div>
        </div>
      </div>
    </div>
  );
};

const FormPositive = () => {
  const [showAlert] = useState<boolean>(false);

  return (
    <>
      {showAlert && <PopupAlert />}
      <div className="form-container flex min-h-screen items-center justify-center bg-white">
        <div className="mx-auto w-full items-center justify-center rounded-md md:w-auto md:max-w-lg md:rounded-lg">
          <h2 className="form-title mt-8 text-center text-gray-800">
            Add a Positive input
          </h2>
          <p className="form-subtitle mb-6 text-center text-gray-600">
            What made you happy today?
          </p>
          <p className="form-subtitle mb-6 text-center text-gray-600">
            Coming soon! This feature is currently under development. Please
          </p>
        </div>
      </div>
    </>
  );
};

export { FormPositive };
