import '../__mocks__/setUpFetch';
import * as TransformConfig from 'src/helper/transform-config';
import * as HandleResponse from 'src/helper/handle-response';
import * as WrapperResponse from 'src/helper/wrapper-response';
import { Response } from 'node-fetch';
import { fetchRequest } from 'src/core/fetch-request';
import { getParseData } from 'src/helper/get-parse-data';
import { OriginResponseWrapper } from 'src/helper/handle-response';

describe('fetchRequest', function() {
  it('transformConfig被调用', function() {
    const tk = jest.spyOn(TransformConfig, 'transformConfig');
    fetchRequest({}, fetch);
    expect(tk).toBeCalled();
    tk.mockClear();
  });

  it('handleResponse被调用', function() {
    const hk = jest.spyOn(HandleResponse, 'handleResponse').mockImplementation(() => {
      return Promise.resolve('hello world');
    });

    // @ts-ignore
    return fetchRequest({}, global.fetch).then(() => {
      expect(hk).toBeCalled();
      hk.mockClear();
    });
  });

  it('wrapperResponse会被调用', function() {
    const wk = jest.spyOn(WrapperResponse, 'wrapperResponse');
    //@ts-ignore
    return fetchRequest(undefined, global.fetch).then(() => {
      expect(wk).toBeCalled();
    });
  });

  it('会返回对应的response和data', function() {
    const body = { name: 'lee', age: 28 };
    const response = new Response(JSON.stringify(body));
    jest
      .spyOn(HandleResponse, 'handleResponse')
      .mockImplementation((_: any, originResponseWrapper: OriginResponseWrapper) => {
        // @ts-ignore
        originResponseWrapper.response = response;
        // @ts-ignore
        return getParseData(response);
      });
    fetchRequest({ body }, fetch).then(result => {
      expect(result.responseData).toEqual(body);
      expect(result.originResponse).toBe(response);
      expect(result.requestConfig.body).toEqual(body);
    });
  });
});
