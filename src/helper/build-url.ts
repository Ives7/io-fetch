import { AnyMap } from 'src/interface';
import { checker } from 'src/helper/checker';

export function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']');
}

export function insertQuery(array: Array<string>, key: string, value: string): number {
  if (!Array.isArray(array)) {
    throw new TypeError('未传入片段数组-->insertQuery');
  }
  if (!checker.isString(key) || !key) {
    throw new TypeError('未传入正确的key-->insertQuery');
  }

  if (typeof value === 'undefined' || value === null) {
    throw new TypeError('未传入正确value-->insertQuery');
  }

  return array.push(`${encode(key)}=${encode(value)}`);
}

export function buildQuery(params?: AnyMap): string {
  if (params) {
    const queryList: Array<string> = [];
    Object.keys(params as AnyMap).forEach(key => {
      const value: any = params[key];
      if (value === null || typeof value === 'undefined') {
        return;
      }
      if (Array.isArray(value)) {
        insertQuery(queryList, key, value.join(','));
        return;
      }
      if (checker.isDate(value)) {
        insertQuery(queryList, key, (value as Date).toISOString());
        return;
      }
      if (checker.isPlainObject(value)) {
        insertQuery(queryList, key, JSON.stringify(value));
        return;
      }
      insertQuery(queryList, key, value);
    });
    return queryList.join('&');
  }
  return '';
}

export function buildURL(url: string, params?: AnyMap): string {
  if (!checker.isString(url)) {
    throw new TypeError('url必须为字符串-->buildURL');
  }

  if (!params) {
    return url;
  }

  if (!checker.isPlainObject(params)) {
    throw new TypeError('params必须为plainObject-->buildURL');
  }

  if (/[?&]$/.test(url)) {
    url = url.slice(0, -1);
  }

  const splitStr = url.indexOf('?') >= 0 ? '&' : '?';

  return url + splitStr + buildQuery(params);
}
