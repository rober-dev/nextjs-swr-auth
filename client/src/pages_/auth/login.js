// Vendor libs
import React, { useEffect, useState, useContext } from 'react';

// Custom libs
import useTranslation from 'next-translate/useTranslation';
import { getI18nProps, withI18n } from '../../libs/i18n';
import { postLogin } from '../../libs/auth';

// Custom components
import Layout from '../../layouts/default';
import LoginForm from '../../components/auth/login-form';

// Context
import { AuthContext } from '../../context/auth';

// Component definition
const LoginPage = () => {
  // Context members
  const { user, setAuth, logOut } = useContext(AuthContext);

  const { t, lang } = useTranslation();

  async function onLoginFormSuccessHandler(args) {
    const result = await postLogin({ ...args, lang });

    if (result.accessToken) {
      setAuth(result.accessToken);
    }
  }

  return (
    <Layout>
      <h1>{t('auth:login')}</h1>

      {user && <p>Current user: {user.email}</p>}

      {!user && <LoginForm onFormSuccess={onLoginFormSuccessHandler} />}
    </Layout>
  );
};

// Static props
export async function getStaticProps(ctx) {
  const trans = await getI18nProps(ctx, ['common', 'auth']);

  return { props: { ...trans }, revalidate: 1 };
}

export default withI18n(LoginPage);
