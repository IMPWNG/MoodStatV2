/* eslint-disable no-console */
import type { PostgrestError } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { Mood } from '@/types/moodTypes';
import { supabase } from '@/utils/supabase';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Mood[]; error?: Error | PostgrestError }>
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
          .from('stats_mood')
          .select('*')
          .eq('user_id', userId);
        if (fromDate && toDate) {
          const filteredData = data?.filter(
            (mood) =>
              new Date(mood.created_at).getTime() >=
                new Date(fromDate).getTime() &&
              new Date(mood.created_at).getTime() <= new Date(toDate).getTime()
          );
          res.status(200).json({ data: filteredData as Mood[] });
          return;
        }

        if (error) {
          throw new Error(error.message);
        }
        if (!data || data.length === 0) {
          console.log('No data found for user_id:', req.query.user_id);
        }

        res.status(200).json({ data: data as Mood[] });
      } catch (error) {
        console.log('GET request error:', error);
        res.status(400).json({ data: [], error: error as Error });
      }
      break;

    case 'POST':
      try {
        const { data, error } = await supabase.from('stats_mood').insert([
          {
            description: req.body.description,
            category: req.body.category,
            user_id: req.body.user_id,
            rating: req.body.rating,
          },
        ]);
        if (error) {
          throw new Error(error.message);
        }
        res.status(200).json({ data: data as unknown as Mood[] });
      } catch (error) {
        res.status(400).json({ data: [], error: error as Error });
      }
      break;
    case 'DELETE':
      try {
        const { data, error } = await supabase
          .from('stats_mood')
          .delete()
          .match({ id: Number(req.query.id) });
        if (error) {
          throw new Error(error.message);
        }
        res.status(200).json({ data: data as unknown as Mood[] });
      } catch (error) {
        res.status(400).json({ data: [], error: error as Error });
      }
      break;
    case 'PUT':
      try {
        const { data, error } = await supabase
          .from('stats_mood')
          .update({
            description: req.body.description,
            category: req.body.category,
            rating: req.body.rating,
          })
          .match({ id: req.body.id });
        if (error) {
          throw new Error(error.message);
        }
        res.status(200).json({ data: data as unknown as Mood[] });
      } catch (error) {
        res.status(400).json({ data: [], error: error as Error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
