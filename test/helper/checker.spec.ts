import { checker } from 'src/helper/checker';
import { EventEmitter } from 'events';
describe('checker测试', function() {
  test('isObject反向', () => {
    expect(checker.isObject(undefined)).toBe(false);
  });

  test('isObject正x向', () => {
    expect(checker.isObject({})).toBe(true);
  });

  test('isPlainObject正向', () => {
    expect(checker.isObject({})).toBe(true);
  });

  test('isPlainObject反向', () => {
    const preData = [new Date(), null, undefined, new EventEmitter()];
    let result = 0;

    preData.forEach(data => {
      !checker.isPlainObject(data) && result++;
    });

    expect(result).toBe(4);
  });
});
