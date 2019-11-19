import { genSimpleConfig } from 'src/helper/gen-simple-config';

describe('genSimpleConfig', function() {
  it('什么也不传入也会返回默认值', function() {
    //@ts-ignore
    const result = genSimpleConfig();
    expect(result).toEqual({
      method: 'get',
      url: '/',
      headers: {}
    });
  });

  it('method和url将以传入为准', function() {
    //@ts-ignore
    const result = genSimpleConfig('post', '/asd', {
      method: 'get',
      url: 'asdsadsddasdas'
    });
    expect(result).toEqual({
      method: 'post',
      url: '/asd',
      headers: {}
    });
  });
});
