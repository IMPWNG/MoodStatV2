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
/* eslint-disable-next-line import/no-extraneous-dependencies */

'use client';

import { faHeart, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faStaffSnake } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FormElement } from '@/components/form/FormElement';
import { MoodSearchByDate } from '@/components/searchHandler/MoodDateSearch';
import { useMoods } from '@/hooks/useMoods';
import type { Mood } from '@/types/moodTypes';

const AiResponse = ({ moods }: { moods: Mood[] }) => {
  const messageInput = useRef<HTMLTextAreaElement | null>(null);
  const [response, setResponse] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [buttonColor, setButtonColor] = useState('transparent');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [userTyped, setUserTyped] = useState<boolean>(false);
  const { setMoods } = useMoods();
  const [displayOnlyResponse, setDisplayOnlyResponse] =
    useState<boolean>(false);

  // useEffect to load moods and response from localStorage, if available.
  useEffect(() => {
    const memoryMoods = loadFromMemory('moods');
    if (memoryMoods) {
      setMoods(memoryMoods);
    }

    const memoryResponse = loadFromMemory('response');
    if (memoryResponse) {
      setResponse(memoryResponse);
    }
  }, []);

  // useEffect to save the updated moods to localStorage.
  useEffect(() => {
    saveToMemory('moods', moods);
  }, [moods]);

  // useEffect to save the updated response to localStorage.
  useEffect(() => {
    saveToMemory('response', response);
  }, [response]);

  // Function to filter moods by date range and return their categories.
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

  // Function to return descriptions of all moods.
  const getMoodsDescription = useCallback(() => {
    return moods.map((mood) => mood.description).join('\n');
  }, [moods]);

  // Function to set the userTyped state when the input is changed.
  const handleInput = () => {
    setUserTyped(true);
  };

  // Function to handle the "Resume" button click, setting up the message input value and invoking handleSubmit.
  const handleButtonClickResume = useCallback(async () => {
    setButtonDisabled(true);
    setButtonColor('red');
    setDisplayOnlyResponse(true);

    const messageInput = document.getElementById(
      'message-input'
    ) as HTMLTextAreaElement;

    if (messageInput) {
      messageInput.value = `  

You're my personal analyst. You're going to help me feel better with myself.

I'm going to tell you about my day and you're going to tell me what you think about it.

From ${startDate} to ${endDate} I felt like this:

${
  startDate && endDate
    ? getMoodsCategoryByDate(startDate, endDate)
    : getMoodsDescription()
}

}`;
    }
    await handleSubmit(new Event('click') as any);

    setButtonDisabled(false);
    setButtonColor('');
  }, [getMoodsDescription, startDate, endDate, getMoodsCategoryByDate]);

  // Function to handle the "Enter" key press in the input field, invoking handleSubmit.
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

  // Function to handle form submission, send the message to the API, and receive and process the response.
  // Define an asynchronous function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the value of the message input field
    const message = messageInput.current?.value;

    // If the message is not undefined, update the response state and clear the input field
    if (message !== undefined) {
      setResponse((prev) => [...prev, message]);
      messageInput.current!.value = '';
    }

    // If the message is falsy, return early without submitting
    if (!message) {
      return;
    }

    // Send an HTTP POST request to the `/api/response` endpoint with the message payload
    const response = await fetch('/api/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
      }),
    });

    // If the response status is not OK, throw an error
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Get the response body as a readable stream
    const data = response.body;

    // If the response body is not present, return early without processing
    if (!data) {
      return;
    }

    // Create a new ReadableStream reader and TextDecoder instance
    const reader = data.getReader();
    const decoder = new TextDecoder();

    // Initialize the loop control variable and currentResponse array
    let done = false;
    let currentResponse: string[] = [];

    // Update the response state with the user input message
    setResponse((prev) => [...prev, message]);

    // Loop until the stream is completely read
    while (!done) {
      // Read a chunk of data from the response body stream
      const { value, done: doneReading } = await reader.read();

      // Update the loop control variable
      done = doneReading;

      // Decode the received chunk of data and add it to the currentResponse array
      const chunkValue = decoder.decode(value);
      currentResponse = [...currentResponse, chunkValue];

      // Update the response state with the concatenated currentResponse array
      setResponse((prev) => [...prev.slice(0, -1), currentResponse.join('')]);
    }

    // Set the loading state to false, indicating the request is complete
    setIsLoading(false);

    // Clear the message input field
    messageInput.current!.value = '';

    // Resolve the returned Promise, indicating the function is complete
    return Promise.resolve();
  };

  // Function to save data to localStorage by key and value.
  const saveToMemory = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Function to load data from localStorage by key and return the value or null.
  const loadFromMemory = (key: string): any => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  // Function to handle the change of the date range for mood search.
  const handleDateChange = (from: string, to: string) => {
    console.log(`Date changed from ${from} to ${to}`);
    setStartDate(from);
    setEndDate(to);
  };

  // Function to reset the moods and response data, clear localStorage, and update button state.
  const handleReset = () => {
    localStorage.removeItem('moods');
    localStorage.removeItem('response');
    setMoods([]);
    setResponse([]);
    setButtonDisabled(false);
    setButtonColor('');
  };

  return (
    <>
      <div className="mb-4 flex flex-col">
        <MoodSearchByDate onDateChange={handleDateChange} />
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
        response.map((item: string, index: number) => {
          if (displayOnlyResponse && index % 2 === 0) {
            return null;
          }
          if (!userTyped && index % 2 === 0) {
            return null;
          }
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
                      : 'bg-red-400 text-gray-800'
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
              disabled={buttonDisabled}
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
              onInput={handleInput}
              placeholder='"Select a date range to view your moods"'
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

export { AiResponse };
