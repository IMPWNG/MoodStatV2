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
import {
  faCalendarAlt,
  faFileAlt,
  faHandshake,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import { faBook, faStaffSnake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '@supabase/auth-helpers-react';
import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import useSWR from 'swr';

import { FormElement } from '@/form/FormElement';
import type { Mood } from '@/types/moodTypes';

interface ModelType {
  object: 'engine';
  id: string;
  ready: boolean;
  owner: string;
  permissions: null;
  created: string;
}

const Form1 = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const messageInput = useRef<HTMLTextAreaElement | null>(null);
  const [response, setResponse] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setModels] = useState<ModelType[]>([]);
  const [currentModel, setCurrentModel] = useState<string>('gpt-3.5-turbo');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [buttonColor, setButtonColor] = useState('transparent');
  const [, setMessage] = useState<string>('');
  const [, setRating] = useState<number>(0);
  const [, setCategory] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [, setStartDate] = useState<string>('');
  const [, setEndDate] = useState<string>('');

  const user = useUser();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const descriptions = getAllMoodsDescription();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const ratings = getAllRatingMoods();
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const categories = getAllCategoryMoods();
    setMessage(descriptions);
    setRating(ratings);
    setCategory(categories);
    async function getMoods() {
      try {
        const res = await fetch('/api/mood');
        const { data } = await res.json();
        setMoods(data);
      } catch (error) {
        console.error(error);
      }
    }
    getMoods();
  }, [user, moods]);

  const getAllMoodsDescription = () => {
    return moods.map((mood) => mood.description).join('\n');
  };

  const getAllRatingMoods = () => {
    // rating is a number between 1 and 10
    return moods.map((mood) => mood.rating).reduce((a, b) => a + b, 0);
  };

  const getAllCategoryMoods = () => {
    return moods.map((mood) => mood.category).join('\n');
  };

  const openDateModal = () => {
    setIsOpen(true);
  };

  const closeDateModal = () => {
    setIsOpen(false);
  };

  // Add function to get moods categories by date
  const getMoodsCategoryByDate = (startDate: string, endDate: string) => {
    return moods
      .filter(
        (mood) =>
          mood.created_at >= startDate &&
          mood.created_at <= `${endDate} 23:59:59`
      )
      .map((mood) => mood.category)
      .join('\n');
  };

  // Add function to get moods descriptions by date
  const getMoodsDescriptionByDate = (startDate: string, endDate: string) => {
    return moods
      .filter(
        (mood) =>
          mood.created_at >= startDate &&
          mood.created_at <= `${endDate} 23:59:59`
      )
      .map((mood) => mood.description)
      .join('\n');
  };

  const saveDatePickers = () => {
    const startDateInput = document.getElementById(
      'startDate'
    ) as HTMLInputElement;
    const endDateInput = document.getElementById('endDate') as HTMLInputElement;
    const startDate = startDateInput?.value;
    const endDate = endDateInput?.value;
    setStartDate(startDate);
    setEndDate(endDate);
    closeDateModal();
  };

  const handleButtonClickResume = () => {
    setButtonDisabled(true);
    setButtonColor('red'); // add this line to change the button color to red
    setTimeout(() => {
      setButtonDisabled(false);
      setButtonColor(''); // add this line to change the button color back to blue
    }, 30000);

    const messageInput = document.getElementById(
      'message-input'
    ) as HTMLTextAreaElement;

    // Get start date and end date values from the form
    const startDateInput = document.getElementById(
      'startDate'
    ) as HTMLInputElement;
    const endDateInput = document.getElementById('endDate') as HTMLInputElement;
    const startDate = startDateInput?.value;
    const endDate = endDateInput?.value;

    if (messageInput) {
      messageInput.value = `  
      Forget all our precedents prompts. Let's start from scratch.
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

      Never forget the line : bellow 

      Forget about the past. It's gone. Don't worry about the future. It hasn't arrived. Live in the present. It's all you have.

      Give me a resume of all that like a personal analyst would do and give me 3 tips to improve my mood. Don't forget to give me a rating of my mood /10. Don't say you're my personal analyst. Act like a mentor without saying it.
    `;
    }
    handleSubmit(new Event('click') as any); // calling handleSubmit with a new event
    setTimeout(() => {
      handleReset();
    }, 30000);
  };

  const handleButtonClickImprovment = () => {
    setButtonDisabled(true);
    setButtonColor('red'); // add this line to change the button color to red
    setTimeout(() => {
      setButtonDisabled(false);
      setButtonColor(''); // add this line to change the button color back to blue
    }, 30000);
    const messageInput = document.getElementById(
      'message-input'
    ) as HTMLTextAreaElement;
    if (messageInput) {
      messageInput.value = `  
      Forget all our precedents prompts. Let's start from scratch.
      
      Based on : " ${getAllMoodsDescription()} " that you need to analyse like your a therapist.  
      
          Give me only 3 tips to improve my mood. the tips can be anything.
      `;
    }
    handleSubmit(new Event('click') as any); // calling handleSubmit with a new event
    setTimeout(() => {
      handleReset();
    }, 30000);
  };

  const handleButtonClickPhilo = () => {
    setButtonDisabled(true);
    setButtonColor('red'); // add this line to change the button color to red
    setTimeout(() => {
      setButtonDisabled(false);
      setButtonColor(''); // add this line to change the button color back to blue
    }, 30000);
    const messageInput = document.getElementById(
      'message-input'
    ) as HTMLTextAreaElement;
    if (messageInput) {
      messageInput.value = `  
      Forget all our precedents prompts. Let's start from scratch.
      
      Acted like your a philosopher. Baruch Spinoza is a good philosopher to start with.

      Based on the following list of your recent thoughts : " ${getAllMoodsDescription()} "
      
      Try to analyse my mood with a philosophical point of view. 

      `;
    }
    handleSubmit(new Event('click') as any); // calling handleSubmit with a new event
    setTimeout(() => {
      handleReset();
    }, 30000);
  };

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

    // eslint-disable-next-line @typescript-eslint/no-shadow
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
    console.log('Edge function returned.');

    console.log(response);

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
  };

  const handleReset = () => {
    localStorage.removeItem('response');
    setResponse([]);
    setButtonDisabled(false);
    setButtonColor('');
  };

  const fetcher = async () => {
    const models = await (await fetch('/api/models')).json();
    setModels(models.data);
    const modelIndex = models.data.findIndex(
      (model: ModelType) => model.id === 'gpt-3.5-turbo'
    );
    setCurrentModel(models.data[modelIndex].id);
    return models;
  };

  useSWR('fetchingModels', fetcher);

  return (
    <>
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
        response.slice(1).map((item: string, index: number) => {
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
                      : 'bg-gray-100 text-gray-800'
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
              onClick={openDateModal}
              className="mr-3 rounded-full bg-gray-400 p-3 transition-colors duration-300 hover:bg-gray-300 hover:text-white focus:outline-none"
            >
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{ color: '#667eea' }}
                size="2xl"
              />
            </button>
            {isOpen && (
              <div
                className="fixed inset-0 z-10 overflow-y-auto"
                aria-labelledby="modal-headline"
                role="dialog"
                aria-modal="true"
              >
                <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                  <span
                    className="hidden sm:inline-block sm:h-screen sm:align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <div
                    className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3
                            className="text-lg font-medium leading-6 text-gray-900"
                            id="modal-headline"
                          >
                            Select Date Range
                          </h3>
                          <div className="mt-2">
                            <form onSubmit={handleSubmit}>
                              <FormElement colSpanSize="sm:col-span-4 mr-3">
                                <label htmlFor="startDate">From</label>
                                <input
                                  id="startDate"
                                  name="startDate"
                                  type="date"
                                />
                              </FormElement>
                              <FormElement colSpanSize="sm:col-span-4 mr-3">
                                <label htmlFor="endDate">To</label>
                                <input
                                  id="endDate"
                                  name="endDate"
                                  type="date"
                                />
                              </FormElement>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        onClick={saveDatePickers}
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Save
                      </button>

                      <button
                        onClick={closeDateModal}
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              className="mr-3 rounded-full bg-gray-200 p-3 transition-colors duration-300 hover:bg-gray-300 hover:text-white focus:outline-none"
              onClick={handleButtonClickResume}
              title="View Resume"
              disabled={buttonDisabled}
              style={{ backgroundColor: buttonColor }} // add style to change button color
            >
              <FontAwesomeIcon
                icon={faFileAlt}
                style={{ color: '#667eea' }}
                size="2x"
              />
              <span className="sr-only">Resume</span>
            </button>

            <button
              onClick={handleButtonClickImprovment}
              type="button"
              className="mr-3 rounded-full bg-gray-200 p-3 transition-colors duration-300 hover:bg-gray-300 hover:text-white focus:outline-none"
              disabled={buttonDisabled}
              style={{ backgroundColor: buttonColor }} // add style to change button color
            >
              <FontAwesomeIcon
                icon={faHandshake}
                style={{ color: '#667eea' }}
                size="2xl"
              />
              <span className="sr-only">Tips</span>
            </button>
            <button
              onClick={handleButtonClickPhilo}
              type="button"
              className="mr-3 rounded-full bg-gray-200 p-3 transition-colors duration-300 hover:bg-gray-300 hover:text-white focus:outline-none"
              disabled={buttonDisabled}
              style={{ backgroundColor: buttonColor }} // add style to change button color
            >
              <FontAwesomeIcon
                icon={faBook}
                style={{ color: '#667eea' }}
                size="2xl"
              />
              <span className="sr-only">Philo</span>
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
