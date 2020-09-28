// Vendor libs
import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

// Contexts
import AuthContext from './auth.context';

// Custom libs
import { removeRefreshToken } from '../../libs/auth';
import { getAccessToken } from '../../libs/token-helper';

// Component definition
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function loadToken() {
      if (!accessToken || !user) {
        const result = await getAccessToken();
        if (result) {
          setAuth(result);
          setInitialized(true);
        } else {
          setAccessToken(null);
          setUser(null);
          setInitialized(true);
        }
      } else {
        setInitialized(true);
      }
    }
    if (!initialized) {
      loadToken();
    }
  }, []);

  const logOut = async () => {
    setUser(null);
    setAccessToken(null);
    await removeRefreshToken();
  };

  const setAuth = token => {
    const data = jwtDecode(token);
    setAccessToken(token);
    setUser(data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setAuth,
        accessToken,
        setAccessToken,
        logOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Exportation
export default AuthProvider;
