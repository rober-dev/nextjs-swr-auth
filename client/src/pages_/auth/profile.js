// Vendor libs
import React, { useContext, useEffect } from 'react';
import Router from 'next-translate/Router';

// Custom libs
import useTranslation from 'next-translate/useTranslation';
import { getI18nProps, withI18n } from '../../libs/i18n';

// Context
import { AuthContext } from '../../context/auth.context';

// Custom components
import Layout from '../../layouts/default';

// Component definition
const ProfilePage = () => {
  const { t, lang } = useTranslation();

  // Context members
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    if (!accessToken) {
      Router.pushI18n('/auth/login', undefined, { lang });
    }
  }, []);

  return (
    <Layout>
      <h1>{t('auth:profile')}</h1>
    </Layout>
  );
};

// Static props
export async function getStaticProps(ctx) {
  const trans = await getI18nProps(ctx, ['common', 'auth']);

  return { props: { ...trans }, revalidate: 1 };
}

export default withI18n(ProfilePage);
