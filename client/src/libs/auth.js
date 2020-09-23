// Vendor libs
import axios from 'axios';

// Get environment variables
const API_URL = process.env.API_URL;

// Custom libs
import { setAccessToken, getAccessToken } from './token-helper';

export const postLogin = ({ lang, email, password, rememberMe }) => {
  const LOGIN_URL = `${API_URL}/auth/login`;

  return new Promise((resolve, reject) => {
    axios
      .post(
        LOGIN_URL,
        {
          email,
          password,
          rememberMe
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            lang
          },
          withCredentials: true
        }
      )
      .then((res) => {
        if (res && res.data && res.data.ok) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const postRegister = ({
  lang,
  email,
  password,
  passwordConfirmation,
  username,
  rememberMe
}) => {
  const LOGIN_URL = `${API_URL}/auth/login`;

  return new Promise((resolve, reject) => {
    axios
      .post(
        LOGIN_URL,
        {
          email,
          password,
          passwordConfirmation,
          username,
          rememberMe
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            lang
          },
          withCredentials: true
        }
      )
      .then((res) => {
        if (res && res.data && res.data.ok) {
          resolve(res.data);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};
