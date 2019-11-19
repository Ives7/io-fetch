// @ts-ignore
import { wrapperResponse } from 'src/helper/wrapper-response';

describe('wrapperResponse', function() {
  it('所见即所得 ', function() {
    const originResponse = {} as Response;
    const requestConfig = {};
    const responseData = { name: '123' };
    const result = wrapperResponse(responseData, originResponse, requestConfig);
    expect(result).toEqual({
      originResponse,
      responseData,
      requestConfig
    });
  });

  it('自动parse-json ', function() {
    const originResponse = {} as Response;
    const requestConfig = {};
    const responseData = JSON.stringify({ name: '123' });
    const result = wrapperResponse(responseData, originResponse, requestConfig);
    expect(result).toEqual({
      originResponse,
      responseData: JSON.parse(responseData),
      requestConfig
    });
  });

  it('字符串parse不出错 ', function() {
    const originResponse = {} as Response;
    const requestConfig = {};
    const responseData = '123';
    const result = wrapperResponse(responseData, originResponse, requestConfig);
    expect(result).toEqual({
      originResponse,
      responseData: '123',
      requestConfig
    });
  });
});
