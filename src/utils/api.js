export class JsonAPI {
  constructor() {
    this._baseUrl = `http://localhost:3001/`;
    this._headers = {
      "Content-type": "application/json"
    };
  }
  _request(endpoint, options = {}) {
    const finalOptions = {
      headers: this._headers,
      ...options
    };

    return fetch(endpoint, finalOptions).then(this._checkResponse);
  }

  getItems() {
    return this._request(`${this._baseUrl}items`, { method: "GET" });
  }

  postItems(data) {
    return this._request(`${this._baseUrl}items`, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }

  deleteItem(id) {
    return this._request(`${this._baseUrl}items/${id}`, {
      method: "DELETE"
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
}
