import { transformBody } from 'src/helper/transform-body';

describe('transformBody', function() {
  it('传入plainObject返回序列化后的字符串', function() {
    const data = { num: 123 };
    const body = transformBody(data);
    expect(body).toBe(JSON.stringify(data));
  });

  it('啥也不传会返回undefined', function() {
    expect(transformBody()).toBeUndefined();
  });

  it('传入formData会返回formData', function() {
    const formData = new FormData();
    expect(transformBody(formData)).toBe(formData);
  });
});
