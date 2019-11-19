import { buildQuery, buildURL, encode, insertQuery } from 'src/helper/build-url';

describe('build-query', function() {
  it('不传入params直接返回空串', () => {
    expect(buildQuery()).toBe('');
  });

  it('传入对象将会返回queryString', () => {
    expect(
      buildQuery({
        name: 123,
        age: 2
      })
    ).toBe('name=123&age=2');
  });

  it('单个query为数组则返回逗号分隔', () => {
    expect(
      buildQuery({
        arr: [1, 2, 3]
      })
    ).toBe('arr=1,2,3');
  });

  it('query-value不为真时,不拼接', () => {
    expect(
      buildQuery({
        name: undefined,
        age: null
      })
    ).toBe('');
  });

  it('传入Plain对象时，返回序列化字符', function() {
    expect(
      buildQuery({
        obj: {
          age: 1
        }
      })
    ).toBe(`${encode('obj')}=${encode(`{"age":1}`)}`);
  });

  it('传入日期类型时，返回对应ISO字符', function() {
    const date = new Date();
    expect(buildQuery({ date })).toBe(`${encode('date')}=${encode(date.toISOString())}`);
  });

  it('insertQuery不传入数组将报错', function() {
    expect(insertQuery).toThrow(TypeError);
  });

  it('insertQuery不传入key将报错', function() {
    expect(insertQuery.bind(null, [])).toThrow(TypeError);
  });

  it('insertQuery-value不为真报错', function() {
    expect(() => {
      //@ts-ignore
      insertQuery([], '123', undefined);
    }).toThrow(TypeError);
  });

  it('insertQuery会将元素组扩充，并加入键值对字符串', function() {
    const arr: string[] = [];
    insertQuery(arr, 'aaa', '222');
    expect(arr)
      .toBeArrayOfSize(1)
      .toContain('aaa=222');
  });

  it('build-url不传入url应当报错', function() {
    expect(buildURL).toThrow(TypeError);
  });

  it('build-url不传入params直接返回url', function() {
    expect(buildURL('./asd')).toBe('./asd');
  });

  it('build-url传入非法params时报错', function() {
    expect(() => buildURL('./asd', new Date())).toThrow();
  });

  it('build-url传入Params和url应当返回queryString', function() {
    expect(buildURL('./asd', { name: 'ives', age: 29 })).toBe('./asd?name=ives&age=29');
  });

  it('build-url的url参数如果尾部有问号，不应当拼接问号', function() {
    expect(buildURL('./asd?', { name: 'ives', age: 29 })).toBe('./asd?name=ives&age=29');
  });
  //
  it('build-url的url如果已经有query，继续追加', function() {
    expect(buildURL('./asd?age=123', { name: 'ives', age2: 29 })).toBe('./asd?age=123&name=ives&age2=29');
  });

});
