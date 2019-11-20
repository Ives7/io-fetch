import { RequestConfig } from 'src/interface';
import { checker } from 'src/helper/checker';
import { buildURL } from 'src/helper/build-url';
import { transformBody } from 'src/helper/transform-body';

export const defaultRequestConfig: RequestConfig = {
  url: '/'
};


export function transformConfig(requestConfig: RequestConfig = {}): RequestConfig {
  const resultConfig: RequestConfig = {
    ...defaultRequestConfig,
    ...requestConfig
  };
  const headers = requestConfig.headers;
  if (headers) {
    if (!checker.isPlainObject(headers) && !(headers instanceof Headers)) {
      throw new TypeError('传入了非法headers-->transformConfig');
    }
    resultConfig.headers = new Headers(headers);
  }

  requestConfig.body = transformBody(resultConfig.body);
  resultConfig.url = buildURL(resultConfig.url as string, resultConfig.params);

  return resultConfig;
}
