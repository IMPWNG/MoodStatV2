/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import type { NextApiRequest, NextApiResponse } from 'next';

import { client } from '@/utils/twilioClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case 'POST':
      try {
        const { body } = req;
        const { TWILIO_PHONE_NUMBER, TWILIO_MY_PHONE_NUMBER } = process.env;

        const { message } = body;

        const twilioResponse = await client.messages.create({
          body: message,
          from: TWILIO_PHONE_NUMBER || '',
          to: TWILIO_MY_PHONE_NUMBER || '',
        });
        res.status(200).json({ data: twilioResponse });
        console.log(twilioResponse);
      } catch (error) {
        res.status(400).json({ error });
      }

      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
