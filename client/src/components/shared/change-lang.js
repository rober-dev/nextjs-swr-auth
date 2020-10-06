// Vendor libs
import React from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import i18nConfig from '../../../i18n.json';
import { useRouter } from 'next/router';

// Component definition
const ChangeLanguage = props => {
  const router = useRouter();

  const { allLanguages, defaultLanguage } = i18nConfig;
  const { t } = useTranslation();

  function removeLang(path) {
    if (path.length < 4) {
      return path;
    }

    const lang = path.substr(0, 4);
    if (lang[0] === '/' && lang[3] === '/') {
      return path.substr(3);
    }

    return path;
  }

  function getTranslatedLink(lng) {
    // Remove lang from pathname
    const currentPath = removeLang(router.asPath);
    if (lng === defaultLanguage) {
      return currentPath;
    } else {
      return `/${lng}${currentPath}`;
    }
  }

  return allLanguages.map(lng => {
    if (router) {
      return (
        <div key={lng}>
          <Link href={getTranslatedLink(lng)}>
            {t(`layout:language-name-${lng}`)}
          </Link>
          <span>&nbsp; | &nbsp;</span>
        </div>
      );
    }
  });
};

export default ChangeLanguage;
