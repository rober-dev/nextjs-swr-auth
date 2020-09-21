// Vendor libs
import React from 'react';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';

// Custom components
import ChangeLanguage from './change-lang';

// Component definition
const Header = () => {
  const { t, lang } = useTranslation();

  return (
    <>
      <h3>Header</h3>
      <ChangeLanguage />
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
      </ul>
    </>
  );
};

export default Header;
