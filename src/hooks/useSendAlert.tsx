/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { useState } from 'react';

export const useSendAlert = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sendMessage = async (message: string, to: string) => {
    setIsLoading(true);

    try {
      const response = await axios.post('/api/alert', {
        message,
        to,
      });

      setIsLoading(false);
      setData(response.data);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response.data);
    }
  };

  return {
    isLoading,
    error,
    data,
    sendMessage,
  };
};
