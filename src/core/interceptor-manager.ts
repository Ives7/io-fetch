import { TmsRequestError } from 'src/core/tms-request-error';

export interface ResolvedFn<T = any, R extends T = T> {
  (val: T): R | Promise<R>;
}
export interface RejectedFn {
  (error: Error | string): Promise<never> | never | void;
}

export type Interceptor = {
  resolved: ResolvedFn;
  rejected?: RejectedFn;
};

export interface InterceptorEachHandle {
  (interceptor: Interceptor): any;
}

export class InterceptorManager<T = any> {
  constructor(private readonly interceptors: Array<Interceptor> = []) {}

  public use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    if (typeof resolved !== 'function') {
      throw new TmsRequestError('resolved必须为函数', {} as Response, 'program');
    }

    if (rejected && typeof rejected !== 'function') {
      throw new TmsRequestError('rejected必须为函数', {} as Response, 'program');
    }

    return this.interceptors.push({
      resolved,
      rejected
    });
  }

  public forEach(interceptorEachHandle: InterceptorEachHandle): void {
    this.interceptors.forEach(interceptor => {
      interceptorEachHandle(interceptor);
    });
  }
}
