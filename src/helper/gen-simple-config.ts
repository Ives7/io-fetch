import { HttpMethod, RequestConfig } from 'src/interface';

export function genSimpleConfig(
  method: HttpMethod,
  url: string,
  config: RequestConfig = {}
): RequestConfig {
  return {
    headers: {},
    ...config,
    url: url || '/',
    method: method || 'get'
  };
}
