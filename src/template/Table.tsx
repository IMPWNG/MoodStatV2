/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
import Link from 'next/link';
import React, { useState } from 'react';

import { Button } from '@/components/button/Button';
import { MoodSearchByDate } from '@/components/searchHandler/MoodDateSearch';
import { DetailTable } from '@/components/table/DetailTable';
import { useMoods } from '@/hooks/useMoods';
import type { Mood } from '@/types/moodTypes';

const Table = ({ moods }: { moods: Mood[] }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { deleteMood } = useMoods();

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

  const handleDelete = async (id: number) => {
    setShowAlert(true);
    await deleteMood(id);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const PopupAlert = () => {
    return (
      <div className="fixed bottom-0 right-0 m-8">
        <div
          className="rounded-b border-t-4 border-red-500 bg-red-100 px-4 py-3 text-red-900 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="mr-4 h-6 w-6 fill-current text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Mood Deleted!</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {showAlert && <PopupAlert />}
      <div className="mb-4 flex flex-col">
      <MoodSearchByDate  />
      </div>
      <DetailTable
        head={
          <tr>
            <th
              style={{
                maxWidth: '200px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Description
            </th>
            <th>Rating</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        }
        buttons={
          <>
            <Link href="/">
              <Button sm secondary>
                Export as CSV
              </Button>
            </Link>
          </>
        }
      >
        {moods &&
          moods.map((mood: Mood) => (
            <tr key={mood.id}>
              <td
                style={{
                  maxWidth: '200px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {mood.description}
              </td>
              <td>{`${mood.rating}/10`}</td>
              <td>{mood.category}</td>
              <td>{formatDateTime(mood.created_at)}</td>
              <td>
                <Button
                  sm
                  onClick={() => handleDelete(mood.id)}
                  backgroundColor="btn-red"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
      </DetailTable>
    </>
  );
};

export { Table };
