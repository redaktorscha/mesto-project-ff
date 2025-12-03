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

/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} about
 * @property {string} avatar
 * @property {string} _id
 * @property {string} cohort
 */

/**
 * @typedef {Object} Card
 * @property {User[]} likes
 * @property {string} _id
 * @property {string} name
 * @property {string} link
 * @property {User} owner
 * @property {string} createdAt
 */

/**
 *
 * @param {Response} response
 * @param {string} errorMessage
 * @returns {Promise}
 */
const getResponseData = (response, errorMessage) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`${errorMessage}, ${response.status}`);
};
/**
 *
 * @returns {Promise<User>}
 */
const getUserInfo = () => {
  return fetch(endPoints.userGet(), { headers: apiConfig.authHeaders }).then(
    (response) => getResponseData(response, 'Unable get user info'),
  );
};

/**
 *
 * @returns {Promise<Card[]>}
 */
const getCardsList = () => {
  return fetch(endPoints.cardsGet(), { headers: apiConfig.authHeaders }).then(
    (response) => getResponseData(response, 'Unable get cards'),
  );
};

/**
 *
 * @param {string} newUserName
 * @param {string} newUserDescription
 * @returns {Promise<User>}
 */
const editUserProfile = (newUserName, newUserDescription) => {
  return fetch(endPoints.userPatch(), {
    method: 'PATCH',
    headers: { ...apiConfig.authHeaders, ...apiConfig.contentTypeHeaders },
    body: JSON.stringify({
      name: newUserName,
      about: newUserDescription,
    }),
  }).then((response) => getResponseData(response, 'Unable edit user profile'));
};

/**
 *
 * @param {string} cardName
 * @param {string} pictureLink
 * @returns {Promise<Card>}
 */
const addNewCard = (cardName, pictureLink) => {
  return fetch(endPoints.cardPost(), {
    method: 'POST',
    headers: { ...apiConfig.authHeaders, ...apiConfig.contentTypeHeaders },
    body: JSON.stringify({
      name: cardName,
      link: pictureLink,
    }),
  }).then((response) =>
    getResponseData(response, `Unable add new card ${cardName}`),
  );
};

/**
 *
 * @param {string} cardId
 * @returns {Promise<void>}
 */
const deleteCard = (cardId) => {
  return fetch(endPoints.cardDelete(cardId), {
    method: 'DELETE',
    headers: apiConfig.authHeaders,
  }).then((response) =>
    getResponseData(response, `Unable delete card ${cardId}`),
  );
};

/**
 *
 * @param {string} cardId
 * @returns {Promise<Card>}
 */
const incrementLikes = (cardId) => {
  return fetch(endPoints.cardLikePut(cardId), {
    method: 'PUT',
    headers: apiConfig.authHeaders,
  }).then((response) =>
    getResponseData(response, `Unable like card ${cardId}`),
  );
};

/**
 *
 * @param {string} cardId
 * @returns {Promise<Card>}
 */
const decrementLikes = (cardId) => {
  return fetch(endPoints.cardLikeDelete(cardId), {
    method: 'DELETE',
    headers: apiConfig.authHeaders,
  }).then((response) =>
    getResponseData(response, `Unable remove like from card ${cardId}`),
  );
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
  }).then((response) => getResponseData(response, 'Unable change user avatar'));
};

/**
 *
 * @param {string} link
 * @returns {Promise<boolean>}
 */
const checkIsPicture = (link) => {
  return fetch(`${link}`, {
    method: 'HEAD',
  }).then((response) =>
    getResponseData(response, `Unable check resource ${link}`),
  );
};

export {
  getUserInfo,
  getCardsList,
  editUserProfile,
  addNewCard,
  deleteCard,
  incrementLikes,
  decrementLikes,
  checkIsPicture,
  changeUserAvatar,
};
