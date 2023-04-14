/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */

import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

import type { UsersModel } from '@/types/usersTypes';

export interface UsersData {
  usersModel: UsersModel[];
  fetchUsers: (userId: string) => Promise<void>;
  setUsers: React.Dispatch<React.SetStateAction<UsersModel[]>>;
}

export const useUsers = (): UsersData => {
  const [usersData, setUsersData] = useState<UsersModel[]>([]);
  const user = useUser();

  const fetchUsers = async (userId: string) => {
    try {
      if (userId) {
        const response = await fetch(`/api/users/?user_id=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch thoughts');
        }
        const { data } = await response.json();

        setUsersData(data);
      }
    } catch (error) {
      console.error(error);
      setUsersData([]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsers(user.id);
    }
  }, [user]);

  return {
    usersModel: usersData,
    fetchUsers,
    setUsers: setUsersData,
  };
};
