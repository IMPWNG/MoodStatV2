/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */

import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

import type { UsersModel } from '@/types/usersTypes';

export interface UsersData {
  usersModel: UsersModel[];
  fetchData: (userId: string) => Promise<void>;
  setUsers: React.Dispatch<React.SetStateAction<UsersModel[]>>;
  updateAvatar: (avatarUrl: string) => Promise<void>;
  loading: boolean;
}

export const useUsers = (): UsersData => {
  const [usersData, setUsersData] = useState<UsersModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useUser();

  const fetchData = async (userId: string) => {
    try {
      if (userId) {
        const response = await fetch(`/api/userData/?user_id=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const { data } = await response.json();

        setUsersData(data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setUsersData([]);
      setLoading(false);
    }
  };

  const updateAvatar = async (avatarUrl: string) => {
    try {
      if (user) {
        const response = await fetch('/api/updateAvatar', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user.id,
            avatar_url: avatarUrl,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to update avatar');
        }
        const { data } = await response.json();

        setUsersData((prev) => {
          if (!prev) {
            return [];
          }
          return [...prev, data];
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setUsersData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData(user.id);
    }
  }, [user]);

  return {
    usersModel: usersData,
    fetchData,
    setUsers: setUsersData,
    updateAvatar,
    loading,
  };
};
