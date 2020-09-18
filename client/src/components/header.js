// Vendor libs
import React from 'react';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';

// Custom components
import ChangeLanguage from './change-language';

// Component definition
const Header = () => {
  const { t, lang } = useTranslation();

  return (
    <>
      <h3>Header</h3>
      <ChangeLanguage />
      <ul>
        <li>
          <Link href='/'>{t('layout:home')}</Link>
        </li>
        <li>
          <Link href={`/${t('layout:brands-slug')}`}>{t('layout:brands')}</Link>
        </li>
      </ul>
    </>
  );
};

export default Header;
