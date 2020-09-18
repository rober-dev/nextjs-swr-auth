// Vendor libs
import React from 'react';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';
import i18nConfig from '../../i18n.json';
import { useRouter } from 'next/router';

// Component definition
const ChangeLanguage = (props) => {
  const router = useRouter();
  const { allLanguages } = i18nConfig;
  const { t, lang } = useTranslation();

  return allLanguages.map((lng) => {
    if (lng === lang) return null;

    // Or you can attach the current pathname at the end
    // to keep the same page

    return (
      <div key={lng}>
        <Link href='/' lang={lng} key={lng}>
          {t(`layout:language-name-${lng}`)}
        </Link>
        <span>&nbsp; | &nbsp;</span>
      </div>
    );
  });
};

export default ChangeLanguage;
