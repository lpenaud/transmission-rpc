export class HttpError extends Error {
  request: Request;

  response: Response;

  constructor(request: Request, response: Response) {
    super(`${response.status} ${response.statusText}`);
    this.request = request;
    this.response = response;
  }
}
