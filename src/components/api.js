const apiBaseUrl = 'https://mesto.nomoreparties.co';
const authToken = 'fc879d85-5bd2-4f1e-ba5f-87f045fea77d';
const cohortId = 'higher-front-back-dev';
const contentType = 'application/json';
const imagesContentTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/svg+xml',
  'image/webp',
];

const apiConfig = {
  cohortId,
  apiBaseUrl,
  authHeaders: {
    authorization: authToken,
  },
  contentTypeHeaders: {
    'Content-Type': contentType,
  },
};

const endPoints = {
  userGet: () => `${apiConfig.apiBaseUrl}/v1/${apiConfig.cohortId}/users/me`,
  cardsGet: () => `${apiConfig.apiBaseUrl}/v1/${apiConfig.cohortId}/cards`,
  userPatch: () => `${apiConfig.apiBaseUrl}/v1/${apiConfig.cohortId}/users/me`,
  cardPost: () => `${apiConfig.apiBaseUrl}/v1/${apiConfig.cohortId}/cards`,
  cardDelete: (cardId) =>
    `${apiConfig.apiBaseUrl}/v1/${apiConfig.cohortId}/cards/${cardId}`,
  cardLikePut: (cardId) =>
    `${apiConfig.apiBaseUrl}/v1/${apiConfig.cohortId}/cards/likes/${cardId}`,
  cardLikeDelete: (cardId) =>
    `${apiConfig.apiBaseUrl}/v1/${apiConfig.cohortId}/cards/likes/${cardId}`,
  userAvatarPatch: () =>
    `${apiConfig.apiBaseUrl}/v1/${apiConfig.cohortId}/users/me/avatar`,
};

// todo util for error messages

/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {string} name
 * @property {string} about
 * @property {string} avatar
 * @property {string} cohort
 */

/**
 *
 * @returns {Promise<User>}
 */
const getUserInfo = () => {
  return fetch(endPoints.userGet(), { headers: apiConfig.authHeaders }).then(
    (response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Unable get user info, ${response.status}`);
      }
    },
  );
};

// для загрузки данных пользователя и карточек необходимо воспользоваться методом Promise.all()
// todo check userId
// get cards list (name, link, _id)
const getCardsList = () => {
  return fetch(endPoints.cardsGet(), { headers: apiConfig.authHeaders }).then(
    (response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Unable get cards, ${response.status}`);
      }
    },
  );
};

/**
 *
 * @param {string} newUserName
 * @param {string} newUserDescription
 * @returns {Promise}
 */
const editUserProfile = (newUserName, newUserDescription) => {
  return fetch(endPoints.userPatch(), {
    method: 'PATCH',
    headers: { ...apiConfig.authHeaders, ...apiConfig.contentTypeHeaders },
    body: JSON.stringify({
      name: newUserName,
      about: newUserDescription,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Unable edit user profile, ${response.status}`);
    }
  });
};

/**
 *
 * @param {string} cardName
 * @param {string} pictureLink
 * @returns {Promise}
 */
const addNewCard = (cardName, pictureLink) => {
  return fetch(endPoints.cardPost(), {
    method: 'POST',
    headers: { ...apiConfig.authHeaders, ...apiConfig.contentTypeHeaders },
    body: JSON.stringify({
      name: cardName,
      link: pictureLink,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(
        `Unable add new card ${cardName}, ${response.status}`,
      );
    }
  });
};

/**
 *
 * @param {string} cardId
 * @returns {Promise}
 */
const deleteCard = (cardId) => {
  return fetch(endPoints.cardDelete(cardId), {
    method: 'DELETE',
    headers: apiConfig.authHeaders,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Unable delete card ${cardId}, ${response.status}`);
    }
  });
};

/**
 *
 * @param {string} cardId
 * @returns {Promise}
 */
const incrementLikes = (cardId) => {
  return fetch(endPoints.cardLikePut(cardId), {
    method: 'PUT',
    headers: apiConfig.authHeaders,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Unable like card ${cardId}, ${response.status}`);
    }
  });
};

/**
 *
 * @param {string} cardId
 * @returns {Promise}
 */
const decrementLikes = (cardId) => {
  return fetch(endPoints.cardLikeDelete(cardId), {
    method: 'DELETE',
    headers: apiConfig.authHeaders,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(
        `Unable remove like from card ${cardId}, ${response.status}`,
      );
    }
  });
};

/**
 *
 * @param {string} avatarLink
 * @returns {Promise}
 */
const changeUserAvatar = (avatarLink) => {
  return fetch(endPoints.userAvatarPatch(), {
    method: 'PATCH',
    headers: { ...apiConfig.authHeaders, ...apiConfig.contentTypeHeaders },
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Unable change user avatar, ${response.status}`);
    }
  });
};

/**
 *
 * @param {string} link
 * @returns {Promise<boolean>}
 */
const checkIsPicture = (link) => {
  return fetch(`${link}`, {
    method: 'HEAD',
  }).then((response) => {
    if (response.ok) {
      const { contentType } = response.headers;
      console.log(`checkIsPicture headers: ${response.headers}`);
      return imagesContentTypes.includes(contentType);
    } else {
      return Promise.reject(`Unable change user avatar, ${response.status}`);
    }
  });
};

export { getUserInfo };
