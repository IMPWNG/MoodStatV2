/* eslint-disable import/no-anonymous-default-export */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default (_request: NextRequest) => {
  return NextResponse.json({
    name: `Hello, from ${_request.url} I'm now an Edge Function!`,
  });
};
