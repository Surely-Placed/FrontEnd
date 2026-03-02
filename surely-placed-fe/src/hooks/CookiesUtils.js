// src/hooks/CookiesUtils.js
import Cookies from 'js-cookie';

const LOGIN_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const REFRESH_TOKEN_EXPIRY_DAYS = 7;


export const setAuthToken = (token) => {
  const minutes = 50;
  Cookies.set(LOGIN_TOKEN_KEY, token, {
    expires: minutes / (24 * 60),
    sameSite: 'strict',
    path: '/',
  });
};

export const setRefreshToken = (token) => {
  Cookies.set(REFRESH_TOKEN_KEY, token, {
    expires: REFRESH_TOKEN_EXPIRY_DAYS,
    sameSite: 'strict',
    path: '/',
  });
};

export const getAuthToken = () => Cookies.get(LOGIN_TOKEN_KEY);

export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN_KEY);

export const removeAuthToken = () => {
  Cookies.remove(LOGIN_TOKEN_KEY, { path: '/' });
};

export const removeRefreshToken = () => {
  Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
};
