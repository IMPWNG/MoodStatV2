import type { Mood } from '@/types/moodTypes';
import type { UsersModel } from '@/types/usersTypes';
import type { ChatGPTAgent, OpenAIStreamPayload } from '@/utils/openAIStream';
import { OpenAIStream } from '@/utils/openAIStream';

type RequestData = {
  currentModel: string;
  message: string;
  moods: Mood[];
  usersModels: UsersModel[];
};

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const runtime = 'edge';

export default async function handler(request: Request) {
  const { message, moods, usersModels } = (await request.json()) as RequestData;

  if (!message) {
    return new Response('No message in the request', { status: 400 });
  }

  const systemMessage = {
    role: 'system' as ChatGPTAgent,
    content:
      "You are ChatGPT, a large language model trained by OpenAI, based on the GPT-4 architecture. You are simulating a deep analytical view of the user's thoughts, as if they were speaking to themselves and exploring their own ideas in depth.",
  };

  const userMessage = {
    role: 'user' as ChatGPTAgent,
    content: message,
  };

  const moodState = moods.map((mood) => ({
    role: 'user' as ChatGPTAgent,
    content: `User mood category: ${mood.category}. Description: ${mood.description}, Rating: ${mood.rating}, Date of addition: ${mood.created_at}.`,
  }));

  const userPersonality = usersModels.map((usersModel) => ({
    role: 'user' as ChatGPTAgent,
    content: `User Age: ${usersModel.age}, gender: ${usersModel.gender}.`,
  }));

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: [systemMessage, ...moodState, ...userPersonality, userMessage],
    temperature: 0.717828233,
    top_p: 0.9,
    frequency_penalty: 0.6,
    presence_penalty: 0.5,
    max_tokens: 1000,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
