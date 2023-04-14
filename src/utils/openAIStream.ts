/* eslint-disable no-param-reassign */
import type { ParsedEvent, ReconnectInterval } from 'eventsource-parser';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createParser } from 'eventsource-parser';

import type { Mood } from '@/types/moodTypes';
import type { UsersModel } from '@/types/usersTypes';

export type ChatGPTAgent = 'user' | 'system';

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export interface OpenAIStreamPayload {
  model: string;
  messages: ChatGPTMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
  moods?: Mood[];
  usersModels?: UsersModel[];
}

function handleMoodsAndUsers(
  message: string,
  moods: Mood[] | undefined,
  usersModels: UsersModel[] | undefined
) {
  if (moods && moods.length > 0) {
    const moodState = moods.map((mood) => ({
      role: 'user',
      content: `User mood category: ${mood.category}. Description: ${mood.description}, Rating: ${mood.rating}, Date of addition: ${mood.created_at}.`,
    }));
    message += moodState.map((mood) => mood.content).join(' ');
  }

  if (usersModels && usersModels.length > 0) {
    const userPersonality = usersModels.map((usersModel) => ({
      role: 'user',
      content: `User Age: ${usersModel.age}, gender: ${usersModel.gender}.`,
    }));
    message += userPersonality
      .map((usersModel) => usersModel.content)
      .join(' ');
  }

  return message;
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const { moods, usersModels } = payload;
  payload.messages[1]!.content = handleMoodsAndUsers(
    payload.messages[1]!.content,
    moods,
    usersModels
  );

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY ?? ''}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const { data } = event;
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === '[DONE]') {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || '';
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            // eslint-disable-next-line no-plusplus
            counter++;
          } catch (e) {
            // maybe parse error
            controller.error(e);
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse);
      // https://web.dev/streams/#asynchronous-iteration
      // eslint-disable-next-line no-restricted-syntax
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}
