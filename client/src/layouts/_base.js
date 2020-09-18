// Vendor libs
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

// Component definition
const BaseLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>ECommerce SSG sandbox</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      {children}
    </>
  );
};

// PropTypes
BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

// Exportation
export default BaseLayout;
