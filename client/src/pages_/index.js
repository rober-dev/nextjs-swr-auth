// Vendor libs
import React from 'react';
import useTranslation from 'next-translate/useTranslation';

// Custom libs
import { getI18nProps, withI18n } from '../libs/i18n';

// Custom components
import Layout from '../layouts/default';

// Component definition
const HomePage = () => {
  // Get translations
  const { t, lang } = useTranslation();
  const title = t('home:title');

  return (
    <Layout>
      <h1>
        {title} - {lang}
      </h1>
    </Layout>
  );
};

// Static props
export async function getStaticProps(ctx) {
  const trans = await getI18nProps(ctx, ['common', 'home']);

  return { props: { ...trans }, revalidate: 1 };
}

// export default BrandsPage;
export default withI18n(HomePage);
