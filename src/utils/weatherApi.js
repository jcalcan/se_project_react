import { coordinates } from "./constants";

export class WeatherAPI {
  constructor() {
    this._APIkey = "100c869ad85fcdbeb33a5d6ec14de055";
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

  filterWeatherData(data) {
    const result = {};
    result.city = data.name;
    result.temp = {
      F: data.main.temp,
      C: Math.round(((data.main.temp - 32) * 5) / 9)
    };
    result.type = this.getWeatherType(result.temp.F);

    return result;
  }

  getWeatherType(temperature) {
    if (temperature > 80) {
      return "hot";
    } else if (temperature >= 66 && temperature < 80) {
      return "warm";
    } else {
      return "cold";
    }
  }
}
