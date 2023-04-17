/* eslint-disable object-shorthand */
/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';

import type { UsersModel } from '@/types/usersTypes';
import { supabase } from '@/utils/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: UsersModel | null; error?: Error }>
) {
  const { method } = req;

  switch (method) {
    case 'PUT':
      try {
        const userId = req.body.user_id;
        const avatarUrl = req.body.avatar_url;

        if (!userId) {
          throw new Error('No user_id provided');
        }

        const { data, error } = await supabase
          .from('users_data')
          .update({ avatarUrl: avatarUrl })
          .eq('user_id', userId)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        res.status(200).json({ data: data as UsersModel });
      } catch (error) {
        console.log('PUT request error:', error);
        res.status(400).json({ data: null, error: error as Error });
      }
      break;

    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
