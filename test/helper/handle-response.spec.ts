import { Response, Headers, Request, Body } from 'node-fetch';
import { TmsRequestError } from 'src/core/tms-request-error';
import * as GetParseData from 'src/helper/get-parse-data';
import { handleResponse } from 'src/helper/handle-response';

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

describe('fetch-request', function() {
  it('handleResponse 不传response抛出异常', function() {
    // @ts-ignore
    return handleResponse().catch(err => {
      expect(err).toBeInstanceOf(TmsRequestError);
    });
  });
  it('handleResponse 不传originResponseWrapper抛出异常', function() {
    // @ts-ignore
    return handleResponse(new Response()).catch(err => {
      expect(err).toBeInstanceOf(TmsRequestError);
    });
  });

  it('handleResponse response不ok rejectTmsError', function() {
    const response = new Response();
    Object.defineProperty(response, 'ok', {
      get(): any {
        return false;
      }
    });
    // @ts-ignore
    return handleResponse(response, {}).catch((err: TmsRequestError) => {
      expect(err.type).toBe('network');
    });
  });
  it('handleResponse response成功,调用getParseData', function() {
    const response = new Response();
    const k = jest.spyOn(GetParseData, 'getParseData'); //mock
    // @ts-ignore
    return handleResponse(response, {}).then(() => {
      expect(k).toBeCalledWith(response, undefined);
      k.mockClear();
    });
  });
  it('handleResponse response成功,调用getParseData异常，会reject', function() {
    jest.spyOn(GetParseData, 'getParseData').mockRejectedValue('err');
    const response = new Response();

    // @ts-ignore
    expect(handleResponse(response, {})).toReject('err');
  });
});
