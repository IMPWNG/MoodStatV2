/* eslint-disable prefer-destructuring */
/* eslint-disable no-unsafe-optional-chaining */
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

import {
  faHeart,
  faPaperPlane,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useMoods } from '@/hooks/useMoods';
import { useUsers } from '@/hooks/useUserData';
import type { Mood } from '@/types/moodTypes';
import type { UsersModel } from '@/types/usersTypes';

const AiResponse = ({
  moods,
  usersModels,
}: {
  moods: Mood[];
  usersModels: UsersModel[];
}) => {
  const messageInput = useRef<HTMLTextAreaElement | null>(null);
  const [response, setResponse] = useState<{ role: string; content: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [buttonColor, setButtonColor] = useState('transparent');
  const [startDate] = useState<string>('');
  const [endDate] = useState<string>('');
  const [userTyped, setUserTyped] = useState<boolean>(false);
  const { setMoods } = useMoods();
  const { setUsers } = useUsers();
  const [displayOnlyResponse, setDisplayOnlyResponse] =
    useState<boolean>(false);
  const [previousReplies, setPreviousReplies] = useState<
    {
      reply: string;
      date: string;
    }[]
  >([]);

  useEffect(() => {
    const data = {
      moods,
      usersModels,
    };
    localStorage.setItem('data', JSON.stringify(data));
  }, [moods, usersModels]);

  // const handleDateChange = (from: string, to: string) => {
  //   console.log(`Date changed from ${from} to ${to}`);
  //   setStartDate(from);
  //   setEndDate(to);
  // };

  const getMoodsShortenDescriptionByDate = useCallback(() => {
    const moodsByDate = moods.filter(
      (mood) =>
        new Date(mood.created_at).getTime() >= new Date(startDate).getTime() &&
        new Date(mood.created_at).getTime() <= new Date(endDate).getTime()
    );

    return moodsByDate.map((mood) =>
      mood.description
        .split(' ')
        .map((word) => word.slice(0, 3))
        .join(' ')
    );
  }, [moods, startDate, endDate]);

  const getMoodsShortenDescription = useCallback(() => {
    return moods.map((mood) =>
      mood.description
        .split(' ')
        .map((word) => word.slice(0, 3))
        .join(' ')
    );
  }, [moods]);

  const getAgeOfUsers = useCallback(() => {
    return usersModels.map((user) => user.age).join('\n');
  }, [usersModels]);

  const getGenderOfUsers = useCallback(() => {
    return usersModels.map((user) => user.gender).join('\n');
  }, [usersModels]);

  const handleInput = () => {
    setUserTyped(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = messageInput.current?.value;

    if (message !== undefined) {
      setResponse((prev) => [...prev, { role: 'user', content: message }]);
      messageInput.current!.value = '';
    }

    if (!message) {
      return;
    }

    const previousRepliesText = previousReplies
      .map((prevReply) => `${prevReply.reply} (${prevReply.date})`)
      .join('\n');

    const localData = localStorage.getItem('data');
    const { moods: localMoods, usersModels: localUsers } = localData
      ? JSON.parse(localData)
      : { moods: [], usersModels: [] };

    const response = await fetch('/api/response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        previousReplies: previousRepliesText,
        moods: localMoods,
        usersModels: localUsers,
        age: getAgeOfUsers(),
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
    let currentResponse: string[] = [];

    setResponse((prev) => [...prev, { role: 'user', content: message }]);

    while (!done) {
      const { value, done: doneReading } = await reader.read();

      done = doneReading;

      const chunkValue = decoder.decode(value);
      currentResponse = [...currentResponse, chunkValue];

      setResponse((prev) => [
        ...prev.slice(0, -1),
        {
          role: 'assistant',
          content: currentResponse.join(''),
        },
      ]);
    }

    setIsLoading(false);

    const lastAssistantResponse = currentResponse.join('');
    setPreviousReplies((prev) => [
      ...prev,
      {
        reply: lastAssistantResponse,
        date: new Date().toLocaleString(),
      },
    ]);

    messageInput.current!.value = '';

    return Promise.resolve();
  };

  const handleButtonClickResume = useCallback(async () => {
    setButtonDisabled(true);
    setButtonColor('rgba(150, 150, 150, 0.5)');
    setDisplayOnlyResponse(true);

    const messageInput = document.getElementById(
      'message-input'
    ) as HTMLTextAreaElement;

    if (messageInput) {
      messageInput.value = `You are ChatGPT, a large language model trained by OpenAI, based on the GPT-4 architecture. 
      You are simulating a user speaking to himself, providing a deep analytical view of his thoughts and feelings based on
      several parameters such as : 
      
      1. My mood data from ${startDate} to ${endDate}.
      2. My age ${getAgeOfUsers()}.
      3. My gender ${getGenderOfUsers()}.
      4. My thoughts ${
        startDate && endDate
          ? getMoodsShortenDescriptionByDate()
          : getMoodsShortenDescription()
      }.
Help me analyze my thoughts and feelings as if I were speaking to myself, providing a deep and insightful understanding.

Rules that you must follow:

1. You must respond to the user's input.
2. You must respond to the user's input in a way that is consistent with the user's moods data.
3. You must respond to the user's input in a way that is consistent with the user's moods data and the user's input.
4. You must respond to the user's input in a way that is consistent with the user's moods data, the user's input, and the user's input history.
6. You need to reply like a human, not a bot.
7. You must never used the word "bot" or "AI" in your response.
8. You must never use the word "human" or "person" in your response.
9. You must never use the term mood data in your response.

`;
    }

    if (previousReplies.length === 1) {
      messageInput.value += `\n\nYou previously mentioned: "${previousReplies[0]?.reply}"`;
    }
    await handleSubmit(new Event('click') as any);

    setButtonDisabled(false);
    setButtonColor('');
  }, [
    getMoodsShortenDescription,
    getAgeOfUsers,
    startDate,
    endDate,
    getMoodsShortenDescriptionByDate,
    previousReplies,
  ]);

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

  const handleReset = () => {
    setMoods([]);
    setUsers([]);
    setResponse([]);
    setButtonDisabled(false);
    setButtonColor('');
  };

  return (
    <>
      {response
        ? response.map((item, index) => {
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
                    <p className="leading-normal">{item.content}</p>
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
        : null}

      <div className="container fixed inset-x-0 bottom-0 mx-auto border border-gray-200 bg-white">
        <div className="flex items-center justify-center space-x-3 px-4 py-3">
          <button
            type="button"
            className="rounded-full  p-3 transition-colors duration-300 hover:bg-gray-300 hover:text-white focus:outline-none"
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
            className="rounded-full p-3 transition-colors duration-300 hover:bg-gray-300 hover:text-white focus:outline-none"
            onClick={handleReset}
          >
            <FontAwesomeIcon
              icon={faTrashAlt}
              style={{ color: '#EA6666' }}
              size="2x"
            />
            <span className="sr-only">Clear</span>
          </button>

          <div className="relative flex-grow sm:max-w-xs">
            <textarea
              id="message-input"
              name="message"
              rows={2}
              onKeyDown={handleEnter}
              ref={messageInput}
              onInput={handleInput}
              placeholder='"Select a date range to view your moods"'
              className="focus:shadow-outline-blue w-full resize-none rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:placeholder:text-gray-600"
            />
          </div>

          <button
            type="submit"
            className="rounded-full  p-3 transition-colors duration-300 hover:bg-gray-300 hover:text-white focus:outline-none"
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              size="2x"
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
