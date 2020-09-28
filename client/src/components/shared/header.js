// Vendor libs
import React, { useEffect, useState, useContext } from 'react';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';

// Custom components
import ChangeLanguage from './change-lang';

// Context
import { AuthContext } from '../../context/auth';

// Component definition
const Header = props => {
  // Context members
  const { user, setAuth, logOut } = useContext(AuthContext);

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
          <Link href={`/${t('layout:brands-slug')}`} lang={lang}>
            {t('layout:brands')}
          </Link>
        </li>

        <li></li>

        <li>
          <Link href={`/auth/${t('layout:login-slug')}`} lang={lang}>
            {t('layout:login')}
          </Link>
        </li>

        <li>
          <Link href={`/auth/${t('layout:register-slug')}`} lang={lang}>
            {t('layout:register')}
          </Link>
        </li>

        <li>
          <Link href={`/auth/${t('layout:profile-slug')}`} lang={lang}>
            {t('layout:profile')}
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Header;
