// Vendor libs
import React, { useEffect, useState, useContext } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next-translate/Link';

// Custom libs
import { graphQLFetcher } from '../../libs/fetchers';
import { getI18nProps, withI18n } from '../../libs/i18n';

// Context
import { AuthContext } from '../../context/auth.context';

// Custom components
import Layout from '../../layouts/default';

// Queries
import { GET_BRAND_BY_SLUG, GET_BRAND_SLUGS } from '../../queries/brands';

// Component definition
const BrandPage = props => {
  // Context members
  const { accessToken } = useContext(AuthContext);

  // Get translations
  const { t, lang } = useTranslation();
  const t_title = t('brands:brand');
  const t_back = t('common:back');

  // Get params
  const router = useRouter();
  const { slug } = router.query;

  // Get headers
  const headers = {
    lng: lang,
    authorization: accessToken ? `Bearer ${accessToken}` : ''
  };

  // Get data
  const { data, error } = useSWR(
    [GET_BRAND_BY_SLUG, { slug }, headers],
    graphQLFetcher,
    {
      initialData: props
    }
  );

  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  if (!error && !data) {
    return <div>Loading ...</div>;
  }

  const brand = data?.getBrandBySlug;
  return (
    <Layout>
      <h1>
        {t_title} - {lang}
      </h1>

      <Link href='/brands' lang={lang} key={lang}>
        {t_back}
      </Link>

      {brand && (
        <div>
          <h2>{brand.name}</h2>
          <p>{brand.id}</p>
          <p>{brand.slug}</p>
        </div>
      )}
    </Layout>
  );
};

// Static props
export async function getStaticProps(ctx) {
  const headers = {
    lng: ctx.lang
  };

  const { slug } = ctx.params;
  const trans = await getI18nProps(ctx, ['common', 'brands']);
  const data = await graphQLFetcher(GET_BRAND_BY_SLUG, { slug }, headers);

  return { props: { ...data, ...trans }, revalidate: 1 };
}

// Static paths
export async function getStaticPaths(ctx) {
  const headers = {
    lng: ctx.lang
  };

  const data = await graphQLFetcher(GET_BRAND_SLUGS, {}, headers);
  const paths = data.getBrandSlugs.map(slug => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: true
  };
}

// export default BrandsPage;
export default withI18n(BrandPage);
