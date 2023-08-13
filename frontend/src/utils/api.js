class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => 
      this._getResponseData(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then((res) => 
      this._getResponseData(res)
    );
  }

  getPromiseAll() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => 
      this._getResponseData(res)
    );
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => 
      this._getResponseData(res)
    );
  }

  addAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => 
      this._getResponseData(res)
    );
  }

  changeLikeCardStatus(cardId, isLiked) {
   if (isLiked) {
    return this.removeLikeCard(cardId)
   } else {
    return this.setLikeCard(cardId)
   }
  }

  setLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => 
      this._getResponseData(res)
    );
  }

  removeLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => 
      this._getResponseData(res)
    );
  }

  handleDeleteButton(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => 
      this._getResponseData(res)
    );
  }
}

export const api = new Api({
  baseUrl: 'http://localhost:4000',
})


