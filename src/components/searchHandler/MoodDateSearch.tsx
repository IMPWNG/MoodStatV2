/* eslint-disable @typescript-eslint/no-unused-expressions */
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '@supabase/auth-helpers-react';
import React, { useState } from 'react';

import { useMoodsContext } from '@/context/MoodContext';
import styles from '@/styles/MoodSearchByDate.module.scss';

interface DateChangeProps {
  onDateChange?: (from: string, to: string) => void;
}

const MoodSearchByDate = ({ onDateChange }: DateChangeProps) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { fetchMoods, fetchMoodsByDateRange } = useMoodsContext();
  const user = useUser();

  const handleDateChange = (from: string, to: string) => {
    if (user && user.id) {
      if (from && to) {
        fetchMoodsByDateRange(user.id, from, to);
      } else {
        fetchMoods(user.id);
      }
      setShowModal(false);
    }
    onDateChange && onDateChange(from, to);
  };

  return (
    <div className={styles.container}>
      <button
        className="mb-1 mr-1 rounded-xl bg-white px-6 py-3 text-sm font-bold uppercase text-black outline-none transition-all duration-150 ease-linear hover:shadow-2xl focus:outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <FontAwesomeIcon
          icon={faCalendarDays}
          style={{ color: '#667eea' }}
          size="3x"
        />
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-3xl">
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                <div className="flex items-center justify-center rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="align-center items-center justify-center text-center text-3xl font-semibold">
                    Search by Date
                  </h3>
                </div>

                <div className="relative flex-auto p-6">
                  <label className={styles.label} htmlFor="from-date">
                    From{' '}
                  </label>
                  <input
                    className={styles.input}
                    type="date"
                    id="from-date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                  <label className={styles.label} htmlFor="to-date">
                    To
                  </label>
                  <input
                    className={styles.input}
                    type="date"
                    id="to-date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                  <button
                    className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="button"
                    onClick={() => handleDateChange(fromDate, toDate)}
                  >
                    Save Dates
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </div>
  );
};

export { MoodSearchByDate };
