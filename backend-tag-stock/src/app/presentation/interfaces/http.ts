export interface HTTPResponse<T = any> {
  error?: string;
  body?: T;
  status: number;
}

export interface HTTPRequest<T = any> {
  body: T;
}
