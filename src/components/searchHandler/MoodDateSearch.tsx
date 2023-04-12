/* eslint-disable @typescript-eslint/no-unused-expressions */
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
    onDateChange && onDateChange(from, to);
  };

  const handleSearchAll = () => {
    if (user && user.id) {
      fetchMoods(user.id);
    }
    setShowInput(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={toggleInput}>
        Date Range
      </button>
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
          Search {fromDate} - {toDate}
        </button>

        <button className={styles.button} onClick={handleSearchAll}>
          Search All
        </button>
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
