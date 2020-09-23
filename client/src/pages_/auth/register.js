// Vendor libs
import React from 'react';

// Custom libs
import useTranslation from 'next-translate/useTranslation';
import { getI18nProps, withI18n } from '../../libs/i18n';

// Custom components
import Layout from '../../layouts/default';

// Component definition
const RegisterPage = () => {
  const { t, lang } = useTranslation();
  return (
    <Layout>
      <h1>{t('auth:register')}</h1>
    </Layout>
  );
};

// Static props
export async function getStaticProps(ctx) {
  const trans = await getI18nProps(ctx, ['common', 'auth']);

  return { props: { ...trans }, revalidate: 1 };
}

export default withI18n(RegisterPage);
