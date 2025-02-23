import { coordinates } from "./constants";

export class weatherAPI {
  constructor() {
    this._APIkey = import.meta.env.VITE_TOKEN;
    this._baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longtitude}&units=imperial&appid=${this._APIkey}`;
    this._headers = {
      authorization: this._APIkey,
      "Content-type": "application/json"
    };
  }
  _request(endpoint, options = {}) {
    const finalOptions = {
      //   headers: this._headers,
      ...options
    };

    return fetch(endpoint, finalOptions).then(this._checkResponse);
  }

  getWeather() {
    return this._request(this._baseUrl, { method: "GET" });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
