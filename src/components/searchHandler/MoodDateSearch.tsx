import { useUser } from '@supabase/auth-helpers-react';
import type { NextComponentType } from 'next';
import React, { useState } from 'react';

import { useMoodsContext } from '@/context/MoodContext';
import styles from '@/styles/MoodSearchByDate.module.scss';

const MoodSearchByDate: NextComponentType = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showInput, setShowInput] = useState(false);
  const { fetchMoods, fetchMoodsByDateRange } = useMoodsContext();
  const user = useUser();

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const handleClickBackground = () => {
    setShowInput(false);
  };

  const handleDateChange = (from: string, to: string) => {
    if (user && user.id) {
      if (from && to) {
        fetchMoodsByDateRange(user.id, from, to);
      } else {
        fetchMoods(user.id);
      }
      setShowInput(false);
    }
  };

  const handleSearchAll = () => {
    if (user && user.id) {
      fetchMoods(user.id);
    }
    setShowInput(false);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.inputContainer} ${
          showInput ? styles.showInput : ''
        }`}
      >
        <label className={styles.label} htmlFor="from-date">
          From:
        </label>
        <input
          className={styles.input}
          type="date"
          id="from-date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <label className={styles.label} htmlFor="to-date">
          To:
        </label>
        <input
          className={styles.input}
          type="date"
          id="to-date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => handleDateChange(fromDate, toDate)}
        >
          Search
        </button>

        <button className={styles.button} onClick={handleSearchAll}>
          All
        </button>
      </div>
      <div className={styles.iconContainer} onClick={toggleInput}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.icon}
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </div>
      {showInput && (
        <div
          className={`${styles.clickableBackground} ${
            showInput ? styles.showBackground : ''
          }`}
          onClick={handleClickBackground}
        ></div>
      )}
    </div>
  );
};

export { MoodSearchByDate };
