// Vendor libs
import React, { useEffect, useState, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import fetch from 'isomorphic-unfetch';

const API_URL = process.env.API_URL;

// Contexts
export const AuthContext = createContext();

// Provider definition
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [accessToken, setAccessToken] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const setToken = at => {
    if (at) {
      setAccessToken(at);
      const decodedAT = jwtDecode(at);
      setUser(decodedAT);
    }
  };

  const refreshToken = async () => {
    fetch(`${API_URL}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include'
    }).then(async response => {
      const data = await response.json();
      const { accessToken } = data;
      if (accessToken) {
        setToken(accessToken);
      }
      setInitialized(true);
    });
  };

  const logOut = async () => {
    fetch(`${API_URL}/auth/remove-refresh-token`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(async response => {
        const data = await response.json();
        if (data) {
          setToken(null);
          setUser(null);
        }
        setInitialized(true);
      })
      .catch(err => {
        console.error(err);
        setToken(null);
        setUser(null);
      });
  };

  useEffect(() => {
    try {
      if (!initialized) {
        refreshToken();
      } else if (accessToken) {
        const decodedAT = jwtDecode(accessToken);
        if (new Date() < decodedAT) {
          refreshToken();
        }
      }
    } catch (err) {
      console.error(err);
      setInitialized(true);
    }
  }, [initialized]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        setToken,
        logOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
