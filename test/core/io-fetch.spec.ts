import '../__mocks__/setUpFetch';
import { IoFetch } from 'src/core/i-o-fetch';
import * as FetchRequest from 'src/core/fetch-request';
import { InterceptorManager } from 'src/core/interceptor-manager';
import { RequestConfig, IFetchResponse } from 'src/interface';

describe('tms-fetch', function() {
  const ioFetch = new IoFetch();

  it('初始化interceptor', () => {
    expect(ioFetch.interceptors.response).toBeInstanceOf(InterceptorManager);
    expect(ioFetch.interceptors.request).toBeInstanceOf(InterceptorManager);
  });

  it('使用请求拦截器会被调用', () => {
    const $ioFetch = new IoFetch();
    const requestInter = jest.fn().mockImplementation((config: RequestConfig) => config);
    const responseInter = jest.fn().mockImplementation((response: IFetchResponse) => response);
    jest.spyOn(FetchRequest, 'fetchRequest').mockResolvedValue({});

    $ioFetch.interceptors.request.use(requestInter);
    $ioFetch.interceptors.response.use(responseInter);
    return $ioFetch.request().then(() => {
      expect(requestInter).toBeCalled();
      expect(responseInter).toBeCalled();
    });
  });

  it('存在常规方法', function() {
    const hasAllMethods = Boolean(
      ioFetch.get && ioFetch.post && ioFetch.delete && ioFetch.put && ioFetch.patch && ioFetch.head
    );
    expect(hasAllMethods).toBeTrue();
  });

  it('mergeConfig正常', function() {
    const $fetch = new IoFetch({
      url: '/'
    });
    // @ts-ignore
    const config = $fetch.getMergeConfig({ method: 'get' });
    expect(config).toEqual({
      url: '/',
      method: 'get'
    });
  });

  it('调用get等简写方法方法会调用request方法', () => {
    const $fetch = new IoFetch();
    const k = jest.spyOn($fetch, 'request');

    return $fetch.get('/').then(() => {
      expect(k).toBeCalledWith({ method: 'get', url: '/', headers: {} });
      k.mockReset();
    });
  });

  it('调用request会触发mergeConfig', function() {
    const $fetch = new IoFetch();
    // @ts-ignore
    const k = jest.spyOn($fetch, 'getMergeConfig');
    const f = jest.spyOn(FetchRequest, 'fetchRequest').mockResolvedValue(new Response({} as any));

    return $fetch.request().then(() => {
      expect(k).toBeCalled();
      expect(f).toBeCalled();
      k.mockClear();
      f.mockClear();
      // @ts-ignore
      global.fetch = null;
    });
  });
});
