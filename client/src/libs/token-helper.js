// Vendor libs
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import jwtDecode from 'jwt-decode';

// Custom libs
import { renewToken } from './auth';

const DOMAIN = process.env.DOMAIN;
const cookieName = 'accessToken';

export const saveCookie = value => {
  setCookie(null, cookieName, value, {
    maxAge: 10 * 60, // 10 minutes
    path: '/',
    domain: DOMAIN
  });
};

export const getAccessToken = async () => {
  try {
    // Get all cookies
    const cookies = parseCookies();
    const token = cookies[cookieName];
    // Check token
    if (token && token !== '-') {
      const jwtDecoded = jwtDecode(token);
      if (Date.now() > jwtDecoded.exp * 1000) {
        saveCookie(null);
      } else {
        return token;
      }
    }

    console.log('REFRESHING TOKEN');
    // AccessToken cookie does NOT exists, but jit cookie YES. Try refresh token
    const tokens = await renewToken();

    if (tokens && tokens.accessToken && tokens.refreshToken) {
      saveCookie(tokens.accessToken);
      return tokens.accessToken;
    } else {
      return null;
    }
  } catch (err) {
    console.error('Error trying refreshing token', err);
    return null;
  }
};
