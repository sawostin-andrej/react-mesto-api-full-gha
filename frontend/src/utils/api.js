class Api {
  constructor(feature) {
    this._url = feature.baseUrl;
    this._headers = feature.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject;
  }

  getinfo() {
    return this._request(`${this._url}/users/me`, { headers: this._headers });
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, { headers: this._headers });
  }

  setUserInfo(data) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        about: data.subtitle,
      }),
    });
  }

  setAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  addCard(data) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  remuvelikeCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "0d2042a6-4158-4b2d-9cd1-8958c66a2f7c",
    "Content-Type": "application/json",
  },
});

export default api;