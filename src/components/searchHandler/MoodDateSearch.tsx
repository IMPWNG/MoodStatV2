// components/MoodSearchByDate.tsx
import type { NextComponentType } from 'next';
import React, { useState } from 'react';

import { useMoods } from '@/hooks/useMoods';
import styles from '@/styles/MoodSearchByDate.module.css';

const MoodSearchByDate: NextComponentType = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const { fetchMoodsByDateRange } = useMoods();
  const userId = '...'; // Get the user ID

  const handleSearchClick = async () => {
    if (fromDate && toDate) {
      await fetchMoodsByDateRange(userId, fromDate, toDate);
    }
  };

  return (
    <div className={styles.container}>
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
      <button className={styles.button} onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
};

export { MoodSearchByDate };
