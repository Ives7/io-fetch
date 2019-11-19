import { Body, Headers, Request, Response } from 'node-fetch';

declare const global: NodeJS.Global & {
  Headers: typeof Headers;
  Request: typeof Request;
  Response: typeof Response;
  Body: typeof Body;
  fetch: any;
};

beforeAll(() => {
  global.Headers = Headers;
  global.Request = Request;
  global.Response = Response;
  global.Body = Body;
  global.fetch = jest.fn().mockResolvedValue(new Response());
});
