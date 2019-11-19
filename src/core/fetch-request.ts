import { RequestConfig, TmsResponse } from 'src/interface';
import { transformConfig } from 'src/helper/transform-config';
import { handleResponse, OriginResponseWrapper } from '../helper/handle-response';
import { wrapperResponse } from 'src/helper/wrapper-response';

type Fetch = typeof fetch;
export function fetchRequest<T = any, R = TmsResponse<T>>(
  config: RequestConfig = {},
  fetch: Fetch
): Promise<R> {
  const sendConfig = transformConfig(config);
  const originResponseWrapper: OriginResponseWrapper = {} as OriginResponseWrapper;
  const request = fetch(sendConfig.url as string, sendConfig);
  return request
    .then(response => {
      return handleResponse(response, originResponseWrapper, sendConfig);
    })
    .then(responseData => {
      return wrapperResponse<T>(responseData, originResponseWrapper.response, sendConfig);
    }) as Promise<R>;
}

