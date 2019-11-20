import { RequestConfig, IFetchResponse } from 'src/interface';
import { fetchRequest } from 'src/core/fetch-request';
import { genSimpleConfig } from 'src/helper/gen-simple-config';
import { Interceptor, InterceptorManager } from 'src/core/interceptor-manager';
type Methods = keyof Pick<IoFetch, 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head'>;

const methods: Array<Methods> = ['post', 'get', 'patch', 'put', 'delete', 'head'];

export type SimpleMethod = <T = any, R = IFetchResponse<T>>(
  url: string,
  config?: RequestConfig
) => Promise<R>;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IoFetch {
  post: SimpleMethod;
  delete: SimpleMethod;
  put: SimpleMethod;
  patch: SimpleMethod;
  get: SimpleMethod;
  head: SimpleMethod;
}

export class IoFetch {
  constructor(private readonly defaultConfig: RequestConfig = {}) {
    this.interceptors = {
      request: new InterceptorManager<RequestConfig>(),
      response: new InterceptorManager<IFetchResponse<any>>()
    };
  }

  public interceptors: {
    response: InterceptorManager<IFetchResponse<any>>;
    request: InterceptorManager<RequestConfig>;
  };

  public request<T = any, R = IFetchResponse<T>>(config: RequestConfig = {}): Promise<R> {
    const mergeConfig = this.getMergeConfig(config);
    const chain: Array<Interceptor> = [
      {
        resolved: fetchRequest.bind(null, mergeConfig, fetch),
        rejected: undefined
      }
    ];
    let promise = Promise.resolve(config);

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor);
    });
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor);
    });

    while (chain.length) {
      const { resolved, rejected } = chain.shift() as Interceptor;
      promise = promise.then(resolved, rejected);
    }

    return promise as Promise<R>;
  }

  private getMergeConfig(config: RequestConfig): RequestConfig {
    return {
      ...this.defaultConfig,
      ...config
    };
  }
}

methods.forEach(method => {
  IoFetch.prototype[method] = function<T = any, R = IFetchResponse<T>>(
    url: string,
    config: RequestConfig = {}
  ): Promise<R> {
    return this.request(genSimpleConfig(method, url, config));
  };
});
