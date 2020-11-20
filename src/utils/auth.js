import Cookies from 'js-cookie';

const RefreshKey = 'Authorization-Refresh';
const RefreshTokenKey = 'Authorization';
const AccessTokenKey = 'Authorization-Token';
const CurrentUserKey = 'Authorization-User';
const authTimeKey = 'Auth-Time';
const requestTimeKey = 'Request-Time';
const expireTimeKey = 'Expire-Time';

export function getToken() {
  return {
    Authorization: Cookies.get(RefreshTokenKey),
    'Authorization-Token': Cookies.get(AccessTokenKey)
  };
}

export function setAuthTime(authTime) {
  Cookies.set(authTimeKey, authTime);
}

export function removeUser() {
  localStorage.removeItem(CurrentUserKey);
}

export function isLogined() {
  return !!Cookies.get(AccessTokenKey);
}

export function setToken(refreshToken, accessToken) {
  Cookies.set(RefreshTokenKey, refreshToken);
  Cookies.set(AccessTokenKey, accessToken);
  setAuthTime(new Date().getTime());
}

export function removeTime() {
  Cookies.remove(requestTimeKey);
  Cookies.remove(authTimeKey);
  Cookies.remove(expireTimeKey);
}
export function removeToken() {
  Cookies.remove(RefreshTokenKey);
  Cookies.remove(AccessTokenKey);
  Cookies.remove(RefreshKey);
  removeTime();
  removeUser();
}

export function getRefreshToken() {
  return Cookies.get(RefreshKey);
}

export function setRefreshToken(refresh) {
  Cookies.set(RefreshKey, refresh);
}

export function getUser() {
  return localStorage.getItem(CurrentUserKey);
}

export function setUser(CurrentUser) {
  localStorage.setItem(CurrentUserKey, JSON.stringify(CurrentUser));
}

export function getAuthTime() {
  return Cookies.get(authTimeKey);
}

export function setRequestTime(requstTime) {
  Cookies.set(requestTimeKey, requstTime);
}

export function getRequestTime() {
  return Cookies.get(requestTimeKey);
}

export function setExpireTime(expires) {
  Cookies.set(expireTimeKey, expires);
}

export function getExpireTime() {
  return Cookies.get(expireTimeKey);
}
