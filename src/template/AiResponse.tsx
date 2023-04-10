/* eslint-disable consistent-return */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-console */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-nested-ternary */

'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { faHeart, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faStaffSnake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '@supabase/auth-helpers-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FormElement } from '@/components/form/FormElement';
import { MoodSearchByDate } from '@/components/searchHandler/MoodDateSearch';
import type { Mood } from '@/types/moodTypes';

const Form1 = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const messageInput = useRef<HTMLTextAreaElement | null>(null);
  const [response, setResponse] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentModel] = useState<string>('gpt-3.5-turbo');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [buttonClicked] = useState<boolean>(false);
  const [buttonColor, setButtonColor] = useState('transparent');

  const user = useUser();

  useEffect(() => {
    async function getMoods() {
      try {
        const res = await fetch(`/api/mood/?user_id=${user?.id}`);
        const { data } = await res.json();
        setMoods(data);
      } catch (error) {
        console.error(error);
      }
    }
    getMoods();
  }, [user, moods]);

  const getMoodsCategoryByDate = useCallback(
    (startDate: string, endDate: string) => {
      return moods
        .filter(
          (mood) =>
            mood.created_at >= startDate &&
            mood.created_at <= `${endDate} 23:59:59`
        )
        .map((mood) => mood.category)
        .join('\n');
    },
    [moods]
  );

  const getMoodsDescriptionByDate = useCallback(
    (startDate: string, endDate: string) => {
      return moods
        .filter(
          (mood) =>
            mood.created_at >= startDate &&
            mood.created_at <= `${endDate} 23:59:59`
        )
        .map((mood) => mood.description)
        .join('\n');
    },
    [moods]
  );

  const handleButtonClickResume = useCallback(async () => {
    setButtonDisabled(true);
    setButtonColor('red');

    const messageInput = document.getElementById(
      'message-input'
    ) as HTMLTextAreaElement;

    const startDateInput = document.getElementById(
      'startDate'
    ) as HTMLInputElement;
    const endDateInput = document.getElementById('endDate') as HTMLInputElement;
    const startDate = startDateInput?.value;
    const endDate = endDateInput?.value;

    if (messageInput) {
      messageInput.value = `  

  You're my personal analyst. You're going to help me feel better with myself.

  This is all my tought that I have been feeling : 

  - This are the categories that I have been feeling : ${getMoodsCategoryByDate(
    startDate,
    endDate
  )}

  - This are the description that I have been feeling : ${getMoodsDescriptionByDate(
    startDate,
    endDate
  )}
`;
    }
    await handleSubmit(new Event('click') as any);

    setButtonDisabled(false);
    setButtonColor('');
  }, [getMoodsCategoryByDate, getMoodsDescriptionByDate]);

  const handleEnter = (
    e: React.KeyboardEvent<HTMLTextAreaElement> &
      React.FormEvent<HTMLFormElement>
  ) => {
    if (e.key === 'Enter' && isLoading === false) {
      e.preventDefault();
      setIsLoading(true);
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = messageInput.current?.value;
    if (message !== undefined) {
      setResponse((prev) => [...prev, message]);
      messageInput.current!.value = '';
    }
    if (!message) {
      return;
    }

    const response = await fetch('/api/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        currentModel,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    setResponse((prev) => [...prev, message]);

    let currentResponse: string[] = [];
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      currentResponse = [...currentResponse, chunkValue];
      setResponse((prev) => [...prev.slice(0, -1), currentResponse.join('')]);
    }
    setIsLoading(false);

    // Clear input field
    messageInput.current!.value = '';

    return Promise.resolve();
  };

  const handleReset = () => {
    localStorage.removeItem('response');
    setResponse([]);
    setButtonDisabled(false);
    setButtonColor('');
  };

  return (
    <>
      <div className="mb-4 flex flex-col">
        <MoodSearchByDate />
      </div>
      {isLoading ? (
        <div className="mt-2 text-center">
          <div className="inline-flex items-center justify-center space-x-2">
            <svg
              className="h-5 w-5 animate-spin text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16 8 8 0 000 16z"
              ></path>
            </svg>
            <span className="text-gray-500">Loading...</span>
          </div>
        </div>
      ) : response ? (
        response.slice(2).map((item: string, index: number) => {
          return (
            <div key={index} className="flex flex-col">
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? 'items-end' : 'items-start'
                } mb-1 mt-2`}
                key={index}
              >
                <div
                  className={`max-w-sm break-words rounded-lg px-4 py-2 text-sm ${
                    index % 2 === 0
                      ? 'bg-blue-500 text-white'
                      : 'bg-red-100 text-gray-800'
                  }`}
                >
                  <p className="leading-normal">{item}</p>
                </div>
              </div>
              {index === response.length - 2 && (
                <div
                  className={`flex ${
                    index % 2 === 0 ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span
                    className={`text-xs ${
                      index % 2 === 0 ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>
          );
        })
      ) : null}

      <div className="fixed inset-x-0 bottom-0 bg-white bg-opacity-40 shadow-md">
        <div className="container mx-auto flex items-center justify-center px-4 py-3">
          <div className="flex items-center">
            <button
              type="button"
              className="mr-3 rounded-full bg-gray-200 p-3 transition-colors duration-300 hover:bg-gray-300 hover:text-white focus:outline-none"
              onClick={async () => {
                if (!buttonDisabled) {
                  await handleButtonClickResume();
                }
              }}
              title="View Resume"
              disabled={buttonDisabled || buttonClicked}
              style={{ backgroundColor: buttonColor }}
            >
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: '#667eea' }}
                size="2x"
              />
              <span className="sr-only">Resume</span>
            </button>

            <button
              type="button"
              className="mr-3 rounded-full bg-gray-400 p-3 transition-colors duration-300 hover:bg-gray-300 hover:text-white focus:outline-none"
              onClick={handleReset}
            >
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ color: '#EA6666' }}
                size="2xl"
              />
              <span className="sr-only">Clear</span>
            </button>
          </div>
          <FormElement colSpanSize="sm:col-span-4">
            <textarea
              id="message-input"
              name="message"
              rows={2}
              onKeyDown={handleEnter}
              ref={messageInput}
              placeholder='"Resume", "Tips", "Philosophy Vision"'
              className="focus:shadow-outline-blue h-full w-full resize-none rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:placeholder:text-gray-600"
            />
          </FormElement>
          <button
            type="submit"
            className="ml-3 rounded-full bg-gray-400 p-3 transition-colors duration-300 hover:bg-gray-300 hover:text-white focus:outline-none"
          >
            <FontAwesomeIcon
              icon={faStaffSnake}
              size="2xl"
              style={{ color: '#667eea' }}
            />
            <span className="sr-only">Send</span>
          </button>
        </div>
      </div>
    </>
  );
};

export { Form1 };
