import '../__mocks__/setUpFetch';
import { TmsFetch } from 'src/core/tms-fetch';
import * as FetchRequest from 'src/core/fetch-request';
import { InterceptorManager } from 'src/core/interceptor-manager';
import { RequestConfig, TmsResponse } from 'src/interface';

describe('tms-fetch', function() {
  const tmsFetch = new TmsFetch();

  it('初始化interceptor', () => {
    expect(tmsFetch.interceptors.response).toBeInstanceOf(InterceptorManager);
    expect(tmsFetch.interceptors.request).toBeInstanceOf(InterceptorManager);
  });

  it('使用请求拦截器会被调用', () => {
    const $tmsFetch = new TmsFetch();
    const requestInter = jest.fn().mockImplementation((config: RequestConfig) => config);
    const responseInter = jest.fn().mockImplementation((response: TmsResponse) => response);
    jest.spyOn(FetchRequest, 'fetchRequest').mockResolvedValue({});

    $tmsFetch.interceptors.request.use(requestInter);
    $tmsFetch.interceptors.response.use(responseInter);
    return $tmsFetch.request().then(() => {
      expect(requestInter).toBeCalled();
      expect(responseInter).toBeCalled();
    });
  });

  it('存在常规方法', function() {
    const hasAllMethods = Boolean(
      tmsFetch.get &&
        tmsFetch.post &&
        tmsFetch.delete &&
        tmsFetch.put &&
        tmsFetch.patch &&
        tmsFetch.head
    );
    expect(hasAllMethods).toBeTrue();
  });

  it('mergeConfig正常', function() {
    const $fetch = new TmsFetch({
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
    const $fetch = new TmsFetch();
    const k = jest.spyOn($fetch, 'request');

    return $fetch.get('/').then(() => {
      expect(k).toBeCalledWith({ method: 'get', url: '/', headers: {} });
      k.mockReset();
    });
  });

  it('调用request会触发mergeConfig', function() {
    const $fetch = new TmsFetch();
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
