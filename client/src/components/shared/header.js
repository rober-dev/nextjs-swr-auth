// Vendor libs
import React, { useEffect, useState, useContext } from 'react';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';

// Custom components
import ChangeLanguage from './change-lang';

// Context
import { AuthContext } from '../../context/auth.context';

// Component definition
const Header = props => {
  // Context members
  const { user, logOut } = useContext(AuthContext);

  const { t, lang } = useTranslation();

  return (
    <>
      <h3>Header</h3>
      <ChangeLanguage />

      <hr />

      {user && (
        <>
          <p>Current user: {user.email}</p>
          <button type='button' onClick={() => logOut()}>
            LogOut
          </button>
        </>
      )}

      {!user && (
        <>
          <p>Current user: Guest</p>
          <Link href='/auth/login'>
            <a>Login</a>
          </Link>
        </>
      )}
      <hr />
      <ul>
        <li>
          <Link href='/' lang={lang}>
            {t('layout:home')}
          </Link>
        </li>
        <li>
          <Link href='/brands' lang={lang}>
            {t('layout:brands')}
          </Link>
        </li>

        <li>
          <Link href='/products' lang={lang}>
            {t('layout:products')}
          </Link>
        </li>

        <li></li>

        <li>
          <Link href='/auth/login' lang={lang}>
            {t('layout:login')}
          </Link>
        </li>

        <li>
          <Link href='/auth/register' lang={lang}>
            {t('layout:register')}
          </Link>
        </li>

        <li>
          <Link href='/auth/profile' lang={lang}>
            {t('layout:profile')}
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Header;
