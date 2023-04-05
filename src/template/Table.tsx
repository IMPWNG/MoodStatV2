/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
import { useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/button/Button';
import { DetailTable } from '@/components/table/DetailTable';
import { useMoods } from '@/hooks/useMoods';
import type { Mood } from '@/types/moodTypes';

const Table = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { moods, deleteMood, modifyMood } = useMoods();
  const [isOpen, setIsOpen] = useState(false);
  const [categoryText, setCategoryText] = useState<string>('');
  const [openMood, setOpenMood] = useState<Mood | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [, setCreateCategory] = useState<string[]>([]);
  const user = useUser();

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch(`/api/mood/?user_id=${user?.id}`);
        const { data } = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const categories = data.map((item: any) => item.category);
        const uniqueCategories = Array.from(new Set(categories));
        setCreateCategory(uniqueCategories as string[]);
        setCategories(data);
      } catch (error: unknown) {
        console.log('error', error);
      }
    }
    getCategories();
  }, [user, setCategories, setCreateCategory]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getUniqueCategories = (categories: any[]) => {
    const uniqueCategories: any[] = [];
    categories.forEach((category) => {
      if (!uniqueCategories.includes(category.category)) {
        uniqueCategories.push(category.category);
      }
    });
    return uniqueCategories;
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

  const handleDelete = async (id: number) => {
    setShowAlert(true);
    setIsLoading(true);
    await deleteMood(id);
    setIsLoading(false);
    setTimeout(() => {
      setIsLoading(false);
      setShowAlert(false);
      setOpenMood(null);
    }, 3000);
  };

  const openModal = (mood: Mood | null) => {
    setOpenMood(mood);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const Spinner = () => {
    return (
      <div className="flex h-screen items-center justify-center">
        <svg
          className="-ml-1 mr-3 h-5 w-5 animate-spin text-gray-900"
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
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      </div>
    );
  };

  const ModifyModal = ({
    mood,
    isOpen,
    onClose,
  }: {
    mood: Mood;
    isOpen: boolean;
    onClose: () => void;
  }) => {
    const [description, setDescription] = useState(mood?.description ?? '');
    const [category] = useState(mood?.category ?? '');
    const [rating, setRating] = useState<Mood['rating'] | null>(
      mood?.rating ?? null
    );
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [created_at, setCreated_at] = useState(mood?.created_at ?? '');

    return (
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } fixed inset-0 z-10 overflow-y-auto`}
        aria-labelledby="modal-title"
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
            className="inline-block overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
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
                    {mood ? 'Modify Mood' : 'Create Mood'}
                  </h3>
                  <div className="mt-2">
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        if (
                          !description ||
                          !rating ||
                          !category ||
                          !created_at
                        ) {
                          return;
                        }
                        if (mood) {
                          modifyMood(mood.id, {
                            description,
                            category,
                            rating,
                            created_at,
                            id: 0,
                            user_id: "", // eslint-disable-line @typescript-eslint/naming-convention
                          });
                        } else {
                          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                          null;
                        }
                        onClose();
                      }}
                    >
                      <div className="mb-4">
                        <label
                          className="mb-2 block text-sm font-bold text-gray-700"
                          htmlFor="description"
                        >
                          Description
                        </label>
                        <input
                          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                          id="description"
                          type="text"
                          placeholder="Description"
                          name="description"
                          value={description}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="mb-2 block text-sm font-bold text-gray-700"
                          htmlFor="rating"
                        >
                          Rating
                        </label>
                        <select
                          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                          id="rating"
                          name="rating"
                          value={rating ?? 0}
                          onChange={(event) =>
                            setRating(Number(event.target.value))
                          }
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          className="mb-2 block text-sm font-bold text-gray-700"
                          htmlFor="category"
                        >
                          Category
                        </label>
                        {getUniqueCategories(categories).map(
                          (category, index) => {
                            return (
                              <button
                                key={index}
                                type="button"
                                className={`form-category-button${
                                  category === categoryText ? ' selected' : ''
                                }`}
                                onClick={() => setCategoryText(category)}
                              >
                                {category}
                              </button>
                            );
                          }
                        )}
                      </div>
                      <div className="mb-4">
                        <label
                          className="mb-2 block text-sm font-bold text-gray-700"
                          htmlFor="created_at"
                        >
                          Date
                        </label>
                        <input
                          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                          id="created_at"
                          type="date"
                          name="created_at"
                          value={created_at}
                          onChange={(event) =>
                            setCreated_at(event.target.value)
                          }
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="inline-flex items-center rounded bg-gray-200 px-4 py-2 font-bold text-gray-800 hover:bg-gray-300"
                          onClick={onClose}
                        >
                          <svg
                            className="mr-2 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                          <span>Cancel</span>
                        </button>
                        <button
                          type="submit"
                          className="ml-2 inline-flex items-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                        >
                          <svg
                            className="mr-2 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            ></path>
                          </svg>
                          <span>{mood ? 'Modify' : 'Create'}</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
      {isLoading && <Spinner />}
      {showAlert && <PopupAlert />}
      {openMood && (
        <ModifyModal mood={openMood} isOpen={isOpen} onClose={closeModal} />
      )}
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
        pagination={{
          stats: '1 - 10 of 350',
          current: 2,
          nbPage: 5,
          href: '/tables',
        }}
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
                  secondary
                  backgroundColor="btn-yellow mr-2"
                  onClick={() => openModal(mood)}
                >
                  Edit
                </Button>
                <Button
                  sm
                  onClick={() => handleDelete(mood.id)}
                  // change the background color of the button
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
