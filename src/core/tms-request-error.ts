export type ErrorType = 'network' | 'program';

export class TmsRequestError extends Error {
  public readonly requestError: boolean;
  public readonly response: Response;
  public readonly type: ErrorType;

  constructor(message: string, response: Response, type: ErrorType = 'network') {
    super(message || 'network error');
    this.requestError = true;
    this.response = response;
    this.type = type;
  }
}
