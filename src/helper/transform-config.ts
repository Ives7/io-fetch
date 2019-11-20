import { RequestConfig } from 'src/interface';
import { checker } from 'src/helper/checker';
import { buildURL } from 'src/helper/build-url';
import { transformBody } from 'src/helper/transform-body';
import { createFullURL } from 'src/helper/create-full-url';

export const defaultRequestConfig: RequestConfig = {
  url: ''
};

export function transformConfig(requestConfig: RequestConfig = {}): RequestConfig {
  const resultConfig: RequestConfig = {
    ...defaultRequestConfig,
    ...requestConfig
  };
  const headers = requestConfig.headers;
  const { baseURL } = requestConfig;
  if (headers) {
    if (!checker.isPlainObject(headers) && !(headers instanceof Headers)) {
      throw new TypeError('传入了非法headers-->transformConfig');
    }
    resultConfig.headers = new Headers(headers);
  }

  requestConfig.body = transformBody(resultConfig.body);
  if (baseURL) {
    resultConfig.url = createFullURL(baseURL, resultConfig.url || '');
  }
  resultConfig.url = buildURL(resultConfig.url as string, resultConfig.params);

  return resultConfig;
}
