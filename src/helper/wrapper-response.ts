import { RequestConfig, IFetchResponse } from 'src/interface';
import { checker } from 'src/helper/checker';

export const wrapperResponse = function wrapperResponse<T = any>(
  responseData: T,
  originResponse: Response,
  requestConfig: RequestConfig
): IFetchResponse<T> {
  if (typeof responseData === 'string') {
    try {
      responseData = JSON.parse(responseData);
      if (checker.isNumber(responseData)) {
        responseData = String(responseData) as any;
      }
    } catch (e) {}
  }
  return {
    responseData,
    originResponse,
    requestConfig
  };
};
