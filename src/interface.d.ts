export type HttpMethod =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

export type DataType =
  | 'Number'
  | 'Array'
  | 'String'
  | 'Object'
  | 'Boolean'
  | 'Function'
  | 'Null'
  | 'Undefined'
  | 'Map'
  | 'Set'
  | 'WeakMap'
  | 'WeakSet'
  | 'Symbol'
  | 'Date';

export interface TypeFunction {
  (data: any): boolean;
}

export type StringMap = Record<string, string>;
export type AnyMap = Record<string, any>;

export interface RequestConfig extends RequestInit {
  url?: string;
  method?: HttpMethod;
  headers?: StringMap | Headers;
  body?: Body | any;
  params?: AnyMap;
  timeout?: number;
  responseType?: XMLHttpRequestResponseType;
  baseURL?: string;
}

export interface Checker {
  isNumber: TypeFunction;
  isArray: TypeFunction;
  isString: TypeFunction;
  isObject: TypeFunction;
  isPlainObject: TypeFunction;
  isBoolean: TypeFunction;
  isFunction: TypeFunction;
  isNull: TypeFunction;
  isUndefined: TypeFunction;
  isMap: TypeFunction;
  isSet: TypeFunction;
  isWeakMap: TypeFunction;
  isWeakSet: TypeFunction;
  isSymbol: TypeFunction;
  isDate: TypeFunction;
}

export type CheckHelperFunctionName = keyof Checker;

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IFetchResponse<T = any> {
  responseData: T;
  originResponse: Response;
  requestConfig: RequestConfig;
}
