import { InterceptorManager } from 'src/core/interceptor-manager';

describe('interceptor', function() {
  const interceptorManager: InterceptorManager = new InterceptorManager();

  it('interceptor初始化', function() {
    //@ts-ignore
    expect(interceptorManager.interceptors).toBeArrayOfSize(0);
  });

  it('interceptorManager-use方法会加入interceptor', function() {
    const resolved = (val: any) => val;
    interceptorManager.use(resolved);
    //@ts-ignore
    expect(interceptorManager.interceptors[0].resolved).toBe(resolved);
  });
  it('interceptorManger-foreach', function() {
    const interceptorManager: InterceptorManager = new InterceptorManager();
    const fn = (val: any) => val;
    const resolved = jest.fn();
    interceptorManager.use(fn);
    interceptorManager.use(fn);
    interceptorManager.use(fn);
    interceptorManager.forEach(resolved);
    expect(resolved).toHaveBeenCalledTimes(3);
  });

  it('resolved不传函数跑异常', function() {
    const interceptorManager: InterceptorManager = new InterceptorManager();
    expect(interceptorManager.use).toThrow();
  });

  it('rejected乱传抛出异常', function() {
    const interceptorManager: InterceptorManager = new InterceptorManager();
    // @ts-ignore
    expect(interceptorManager.use.bind(interceptorManager, () => {}, 'asd')).toThrow();
  });
});
