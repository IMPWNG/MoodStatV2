import type { OpenAIStreamPayload } from '@/utils/openAIStream';
import { OpenAIStream } from '@/utils/openAIStream';

type RequestData = {
  currentModel: string;
  message: string;
};

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const runtime = 'edge';

export default async function handler(request: Request) {
  const { message } = (await request.json()) as RequestData;

  if (!message) {
    return new Response('No message in the request', { status: 400 });
  }
  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are ChatGPT, a large language model trained by OpenAI, based on the GPT-4 architecture.',
      },
      {
        role: 'user',
        content: message,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
    max_tokens: 500,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
