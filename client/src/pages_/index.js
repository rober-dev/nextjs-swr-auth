// Vendor libs
import React from 'react';
import useTranslation from 'next-translate/useTranslation';

// Custom libs
import { getI18nProps, withI18n } from '../libs/i18n';

// Component definition
const HomePage = () => {
  // Get translations
  const { t, lang } = useTranslation();
  const title = t('home:title');

  return (
    <>
      <h1>
        {title} - {lang}
      </h1>
    </>
  );
};

// Static props
export async function getStaticProps(ctx) {
  const trans = await getI18nProps(ctx, ['common', 'home']);

  return { props: { ...trans }, revalidate: 1 };
}

// export default BrandsPage;
export default withI18n(HomePage);
