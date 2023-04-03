import type { PostgrestError } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { Mood } from '@/types/moodTypes';
import { supabase } from '@/utils/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Mood[]; error?: Error | PostgrestError }>
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { data, error } = await supabase
          .from('stats')
          .select('*')
          .order('id', { ascending: false })
          .limit(10)
          .eq('user_id', req.body.user_id);
        if (error) {
          throw new Error(error.message);
        }
        res.status(200).json({ data: data as Mood[] });
      } catch (error) {
        res.status(400).json({ data: [], error: error as Error });
      }
      break;
    case 'POST':
      try {
        const { data, error } = await supabase.from('stats').insert([
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
          .from('stats')
          .delete()
          .match({ id: req.body.id });
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
          .from('stats')
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
