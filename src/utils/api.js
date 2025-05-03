export class JsonAPI {
  constructor() {
    this._baseUrl = `http://localhost:3001/`;
    this._headers = {
      "Content-Type": "application/json"
    };
  }
  _request(endpoint, options = {}) {
    const finalOptions = {
      ...options,
      headers: {
        ...this._headers,
        ...(options.headers || {})
      }
    };
    console.log("Making request to:", endpoint); // Add this
    console.log("With options:", finalOptions); // Add this

    return fetch(endpoint, finalOptions).then(this._checkResponse);
  }

  getItems() {
    return this._request(`${this._baseUrl}items`, { method: "GET" }).then(
      (response) => response.data
    );
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
    return res.json().then((err) => {
      if (err.message) {
        throw new Error(err.message);
      }
      throw new Error(`Error: ${res.status}`);
    });
  }

  createUser(data) {
    console.log("Creating user with data:", data);
    return this._request(`${this._baseUrl}signup`, {
      method: "POST",
      body: JSON.stringify(data)
    });
  }

  getUserInfo(token) {
    return this._request(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    });
  }

  authorize(data) {
    console.log("Authorizing with data:", data);
    return this._request(`${this._baseUrl}signin`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: JSON.stringify(data)
    });
  }
}
