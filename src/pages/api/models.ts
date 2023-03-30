import type { NextApiResponse } from 'next';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
});

const openai = new OpenAIApi(configuration);

export default async function handler(res: NextApiResponse) {
  const response = await openai.listModels();
  res.status(200).json(response.data);
}
