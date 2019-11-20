export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

export function createFullURL(baseURL: string, url: string): string {
  if (isAbsoluteURL(url)) {
    return url;
  }
  if (url) {
    baseURL = baseURL.replace(/\/+$/, '');
    url = url.replace(/^\/+/, '');
    return `${baseURL}/${url}`;
  }
  return baseURL;
}
