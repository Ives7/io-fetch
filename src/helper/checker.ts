import { Checker, CheckHelperFunctionName, DataType } from 'src/interface';

const dataTypes: Array<DataType> = [
  'Number',
  'String',
  'Object',
  'Boolean',
  'Array',
  'Function',
  'Null',
  'Undefined',
  'Map',
  'Set',
  'WeakMap',
  'WeakSet',
  'Symbol',
  'Date'
];

const toString = Object.prototype.toString;

const checker: Checker = {} as Checker;

dataTypes.forEach((type: string) => {
  const functionName: CheckHelperFunctionName = `is${type}` as CheckHelperFunctionName;

  checker[functionName] = (data: any): boolean => {
    return Boolean(toString.call(data) === `[object ${type}]`);
  };
});

checker.isPlainObject = (data: any): boolean => {
  if (checker.isUndefined(data) || !checker.isObject(data) || checker.isNull(data)) return false;

  let proto = data;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(data) === proto;
};

export { checker };
