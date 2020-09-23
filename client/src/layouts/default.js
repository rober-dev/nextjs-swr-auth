// Vendor libs
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

// Custom components
import BaseLayout from './_base';
import Header from '../components/shared/header';

// Component definition
const DefaultLayout = ({ children }) => {
  return (
    <BaseLayout>
      <Header />
      {children}
    </BaseLayout>
  );
};

// PropTypes
BaseLayout.propTypes = {
  children: PropTypes.node.isRequired
};

// Exportation
export default DefaultLayout;
