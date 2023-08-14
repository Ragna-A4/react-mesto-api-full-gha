class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResult(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка - ${res.status}`);
  }

  getCards() {
    return fetch(this._url + "/cards", {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  addCard({ name, link }) {
    return fetch(this._url + "/cards", {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkResult(res));
  }

  deleteCard(cardID) {
    return fetch(this._url + `/cards/${cardID}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  getProfile() {
    return fetch(this._url + "/users/me", {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  patchProfile({ name, about }) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => this._checkResult(res));
  }

  patchAvatar({ avatar }) {
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => this._checkResult(res));
  }

  changeLikeCardStatus(cardID, isLiked) {
    return fetch(this._url + `/cards/${cardID}/likes`, {
      method: `${isLiked ? `PUT` : `DELETE`}`,
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }
}

const api = new Api({
  url: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };