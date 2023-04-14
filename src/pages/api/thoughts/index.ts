/* eslint-disable no-console */
import type { PostgrestError } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { Thoughts } from '@/types/thoughtsTypes';
import { supabase } from '@/utils/supabase';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Thoughts[]; error?: Error | PostgrestError }>
) {
  const { method } = req;
  switch (method) {
    case 'GET':
      try {
        const userId = req.query.user_id?.toString();
        const fromDate = req.query.from?.toString();
        const toDate = req.query.to?.toString();

        if (!userId || !UUID_REGEX.test(userId)) {
          throw new Error('No user_id provided');
        }
        const { data, error } = await supabase
          .from('stats_thoughts')
          .select('*')
          .eq('user_id', userId);
        if (fromDate && toDate) {
          const filteredData = data?.filter(
            (thoughts) =>
              new Date(thoughts.created_at).getTime() >=
                new Date(fromDate).getTime() &&
              new Date(thoughts.created_at).getTime() <=
                new Date(toDate).getTime()
          );
          res.status(200).json({ data: filteredData as Thoughts[] });
          return;
        }

        if (error) {
          throw new Error(error.message);
        }

        res.status(200).json({ data: data as Thoughts[] });
      } catch (error) {
        console.log('GET request error:', error);
        res.status(400).json({ data: [], error: error as Error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
