import { RequestConfig } from 'src/interface';
import { TmsRequestError } from 'src/core/tms-request-error';
import { checker } from 'src/helper/checker';
import { getParseData } from 'src/helper/get-parse-data';
export type OriginResponseWrapper = {
  response: Response;
};

export const handleResponse = function handleResponse(
  response: Response,
  originResponseWrapper: OriginResponseWrapper,
  config: RequestConfig = {}
): Promise<any> {
  if (!response || !(response instanceof Response)) {
    return Promise.reject(new TmsRequestError('未传入正确的response类型', response, 'program'));
  }

  if (!checker.isObject(originResponseWrapper)) {
    return Promise.reject(
      new TmsRequestError('未传入正确的originResponseWrapper对象', response, 'program')
    );
  }

  originResponseWrapper.response = response;
  if (response.ok) {
    const { responseType } = config;
    return getParseData(response, responseType);
  }
  return Promise.reject(new TmsRequestError(response.statusText, response, 'network'));
};
