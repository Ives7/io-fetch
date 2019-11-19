import { getParseData } from 'src/helper/get-parse-data';
import { Body, Headers, Request, Response } from 'node-fetch';

declare const global: NodeJS.Global & {
  Headers: typeof Headers;
  Request: typeof Request;
  Response: typeof Response;
  Body: typeof Body;
};

beforeAll(() => {
  global.Headers = Headers;
  global.Request = Request;
  global.Response = Response;
  global.Body = Body;
});

describe('get-parse-data', function() {
  it('getParseData不传入responseType与response会抛出异常', function() {
    expect(getParseData).toThrow();
  });

  it('response-text正确解析', function() {
    const response = new Response('123');
    // @ts-ignore
    return getParseData(response).then(data => {
      expect(data).toBe('123');
    });
  });

  it('response-json正确解析', function() {
    const json = { age: 13 };
    const response = new Response(JSON.stringify(json));
    // @ts-ignore
    return getParseData(response, 'json').then(data => {
      expect(data).toEqual(json);
    });
  });

  it('response-blob正确解析', function() {
    const blob = new Blob();
    // @ts-ignore
    const response = new Response(blob);
    // @ts-ignore
    return getParseData(response, 'blob').then(data => {
      expect(data.constructor.name).toBe('Blob');
    });
  });

  it('response-array-buffer正确解析', function() {
    const arrayBuffer = new ArrayBuffer(100);
    const response = new Response(arrayBuffer);
    //@ts-ignore
    return getParseData(response, 'arraybuffer').then(data => {
      expect(data).toBeInstanceOf(ArrayBuffer);
    });
  });
});
