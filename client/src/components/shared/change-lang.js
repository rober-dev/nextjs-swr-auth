// Vendor libs
import React from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import i18nConfig from '../../../i18n.json';
import { useRouter } from 'next/router';
import { getTranslatedLink } from '../../libs/route-helper';

// Component definition
const ChangeLanguage = (props) => {
  const router = useRouter();

  const { allLanguages } = i18nConfig;
  const { t, lang } = useTranslation();

  return allLanguages.map((lng) => {
    if (lng === lang) return null;

    const href = getTranslatedLink(lng, router);

    return (
      <div key={lng}>
        <Link href={href} key={lng}>
          {t(`layout:language-name-${lng}`)}
        </Link>
        <span>&nbsp; | &nbsp;</span>
      </div>
    );
  });
};

export default ChangeLanguage;
