
export function getParseData(
  response: Response,
  responseType?: XMLHttpRequestResponseType
): Promise<any> {
  if (!response || !(response instanceof Response)) {
    throw new TypeError('未获得正确Response类型-->parseData');
  }

  switch (responseType) {
    case 'json':
      return response.json();
    case 'arraybuffer':
      return response.arrayBuffer();
    case 'blob':
      return response.blob();
    default:
      return response.text();
  }
}
