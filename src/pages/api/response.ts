import type { Mood } from '@/types/moodTypes';
import type { Thoughts } from '@/types/thoughtsTypes';
import type { ChatGPTAgent, OpenAIStreamPayload } from '@/utils/openAIStream';
import { OpenAIStream } from '@/utils/openAIStream';

type RequestData = {
  currentModel: string;
  message: string;
  moods: Mood[];
  thoughts: Thoughts[];
};

if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const runtime = 'edge';

export default async function handler(request: Request) {
  const { message, moods, thoughts } = (await request.json()) as RequestData;

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

  const userPersonality = thoughts.map((thought) => ({
    role: 'user' as ChatGPTAgent,
    content: `User Age: ${thought.age}, gender: ${thought.gender}.`,
  }));

  // Check if the user's message is about their age
  const askingForAge =
    message.toLowerCase().includes('my age') ||
    message.toLowerCase().includes('how old');

  if (askingForAge && thoughts.length > 0) {
    const ageResponse = `Based on the information provided, your age is ${thoughts[0]?.age}.`;
    return new Response(ageResponse);
  }

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
