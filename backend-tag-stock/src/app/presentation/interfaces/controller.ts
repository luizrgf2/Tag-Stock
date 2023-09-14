import { HTTPRequest, HTTPResponse } from './http';

export interface ControllerInterface {
  exec: (req: HTTPRequest) => Promise<HTTPResponse>;
}
