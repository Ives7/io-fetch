import { createFullURL, isAbsoluteURL } from 'src/helper/create-full-url';

describe('create-full-url', function() {
  it('传入绝对路径会返回真', function() {
    expect(isAbsoluteURL('http://www.baidu.com')).toBeTrue();
  });

  it('传入相对路径返回假', function() {
    expect(isAbsoluteURL('/asd')).toBeFalse();
  });

  it('绝对路径返回绝对路径', function() {
    expect(createFullURL('/api', 'http://www.baidu.com')).toBe('http://www.baidu.com');
  });

  it('传入正确的baseURL和URL会合并正确的URL', function() {
    expect(createFullURL('/api', '/article')).toBe('/api/article');
  });

  it('URL不为真时，直接返回BASEURL', function() {
    expect(createFullURL('/api', '')).toBe('/api');
  });
});
