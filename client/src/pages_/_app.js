//  Vendor libs
import React from 'react';

// Contexts
import { AuthProvider } from '../context/auth.context';

// Component definition
const BaseApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

// Exportation
export default BaseApp;
