class Api {
  constructor(config) {
    this.baseUrl = config.url;
    this._headers = config.headers;
  }

  _checkResult(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка - ${res.status}`);
  }

  getCards() {
    return fetch(this.baseUrl + "/cards", {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  addCard({ name, link }) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => this._checkResult(res));
  }

  deleteCard(cardID) {
    return fetch(this.baseUrl + `/cards/${cardID}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  getProfile() {
    return fetch(this.baseUrl + "/users/me", {
      method: "GET",
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }

  patchProfile({ name, about }) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => this._checkResult(res));
  }

  patchAvatar({ avatar }) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => this._checkResult(res));
  }

  changeLikeCardStatus(cardID, isLiked) {
    return fetch(this.baseUrl + `/cards/${cardID}/likes`, {
      method: `${isLiked ? `PUT` : `DELETE`}`,
      credentials: 'include',
      headers: this._headers,
    }).then((res) => this._checkResult(res));
  }
}

const api = new Api({
  // url: "http://localhost:3000",
  baseUrl: "https://api.mesto.av4.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };