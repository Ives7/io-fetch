import { checker } from 'src/helper/checker';

export function transformBody(body?: any): any {
  if (checker.isPlainObject(body)) {
    return JSON.stringify(body);
  }
  return body;
}
