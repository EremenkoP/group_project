import { IApiAuth, IApiRegestry } from "../types";
import { login, regestry } from "./fakeAuth";

interface ImainApi {
  baseUrl: string;
}

class mainApi {
  private _baseUrl: string;

  constructor({ baseUrl }: ImainApi) {
    this._baseUrl = baseUrl;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _fetcher(path: string, method: "GET" | "POST" | "PATCH", body?: any) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method,
      headers,
      body,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return fetch(`${this._baseUrl}${path}`, options).then(this.responseHandler);
  }

  private responseHandler = (res: Response) =>
    res.ok ? res.json() : Promise.reject(res);

  registration = (body: IApiRegestry) => regestry(body);

  login = (body: IApiAuth) => login(body);
}

const adress = "https://swapi.dev/api";

const Api = new mainApi({
  baseUrl: adress,
});

export default Api;
