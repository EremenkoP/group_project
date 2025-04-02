import {
  IApiAuth,
  IApiRegestry,
  IFilms,
  IPeople,
  IPlanet,
  ISpecies,
  IStarships,
  IVehicles,
  AnswerBySearch,
} from "../types";
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

  getAllPeoples = (query?: string): Promise<AnswerBySearch<IPeople>> =>
    this._fetcher("/people" + (query ? `/?${query}` : ""), "GET");

  getPeople = (id: string): Promise<IPeople> =>
    this._fetcher(`/people/${id}`, "GET");

  getAllFilms = (query?: string): Promise<AnswerBySearch<IFilms>> =>
    this._fetcher("/films" + (query ? `/?${query}` : ""), "GET");

  getFilm = (id: string): Promise<IFilms> =>
    this._fetcher(`/films/${id}`, "GET");

  getAllStarships = (query?: string): Promise<AnswerBySearch<IStarships>> =>
    this._fetcher("/starships" + (query ? `/?${query}` : ""), "GET");

  getStarship = (id: string): Promise<IStarships> =>
    this._fetcher(`/starships/${id}`, "GET");

  getAllVehicles = (query?: string): Promise<AnswerBySearch<IVehicles>> =>
    this._fetcher("/vehicles" + (query ? `/?${query}` : ""), "GET");

  getVehicle = (id: string): Promise<IVehicles> =>
    this._fetcher(`/vehicles/${id}`, "GET");

  getAllSpecies = (query?: string): Promise<AnswerBySearch<ISpecies>> =>
    this._fetcher("/species" + (query ? `/?${query}` : ""), "GET");

  getSpecie = (id: string): Promise<ISpecies> =>
    this._fetcher(`/species/${id}`, "GET");

  getAllPlanets = (query?: string): Promise<AnswerBySearch<IPlanet>> =>
    this._fetcher("/planets" + (query ? `/?${query}` : ""), "GET");

  getPlanet = (id: string): Promise<IPlanet> =>
    this._fetcher(`/species/${id}`, "GET");
}

const adress = "https://swapi.dev/api";

const Api = new mainApi({
  baseUrl: adress,
});

export default Api;
