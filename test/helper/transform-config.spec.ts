import { defaultRequestConfig, transformConfig } from 'src/helper/transform-config';
import { RequestConfig } from 'src/interface';
import * as nodeFetch from 'node-fetch';
import * as Builder from 'src/helper/build-url';
import * as TransformBody from 'src/helper/transform-body';
import * as CreateFullURL from 'src/helper/create-full-url';

declare const global: NodeJS.Global & {
  Headers: typeof nodeFetch.Headers;
  Request: typeof nodeFetch.Request;
  Response: typeof nodeFetch.Response;
  Body: typeof nodeFetch.Body;
};

beforeAll(() => {
  global.Headers = nodeFetch.Headers;
  global.Request = nodeFetch.Request;
  global.Response = nodeFetch.Response;
  global.Body = nodeFetch.Body;
});

describe('desc-->transformRequest', function() {
  it('it-->不传requestConfig默认也会创造defaultConfig', () => {
    const config = transformConfig();
    //  此非引用比较
    expect(config).toMatchObject(defaultRequestConfig);
  });

  it('it-->不传url会得到empty', () => {
    const config: RequestConfig = {};

    const expectConfig: RequestConfig = {
      url: ''
    };
    expect(transformConfig(config)).toEqual(expectConfig);
  });

  it('it-->传入stringMap，会返回Headers实例', () => {
    const config: RequestConfig = {
      headers: {}
    };
    expect(transformConfig(config).headers).toBeInstanceOf(Headers);
  });

  it('it-->乱传headers会抛出异常', () => {
    const configs: Array<RequestConfig> = [
      {
        // @ts-ignore
        headers: 'asdasdas'
      },
      {
        // @ts-ignore
        headers: new Date()
      },
      {
        // @ts-ignore
        headers: []
      },
      {
        // @ts-ignore
        headers: 123123123123
      }
    ];

    let result = 0;
    configs.forEach(config => {
      try {
        transformConfig(config);
      } catch (e) {
        result++;
      }
    });

    expect(result).toBe(4);
  });

  it('buildURL方法被调用', function() {
    const k = jest.spyOn(Builder, 'buildURL');
    transformConfig({});
    expect(k).toBeCalledWith('', undefined);
    k.mockClear();
  });

  it('transformBody方法被调用', function() {
    const k = jest.spyOn(TransformBody, 'transformBody');
    transformConfig({});
    expect(k).toBeCalledWith(undefined);
    k.mockClear();
  });

  it('传入普通对象，可以得到headers实例', () => {
    const config: RequestConfig = transformConfig({ headers: {} });

    expect(config.headers).toBeInstanceOf(Headers);
  });

  it('传入baseURL会调用createURL方法', function() {
    const k = jest.spyOn(CreateFullURL,'createFullURL');

    transformConfig({
      baseURL: '/api'
    });
    expect(k).toBeCalledWith('/api','');
  });

  it('it-->传入Headers对象，可以得到Headers实例', () => {
    const config: RequestConfig = transformConfig({ headers: new Headers() });
    expect(config.headers).toBeInstanceOf(Headers);
  });
});
