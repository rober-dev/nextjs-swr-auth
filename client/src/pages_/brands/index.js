// Vendor libs
import React, { useEffect, useState, useContext } from 'react';
import useSWR from 'swr';
import Link from 'next-translate/Link';

// Custom libs
import useTranslation from 'next-translate/useTranslation';
import { graphQLFetcher } from '../../libs/fetchers';
import { getI18nProps, withI18n } from '../../libs/i18n';
import { getStaticHeaders } from '../../libs/headers-helper';

// Context
import { AuthContext } from '../../context/auth';

// Custom components
import Layout from '../../layouts/default';

// Queries
import { GET_ALL_BRANDS } from '../../queries/brands';

// Component definition
const BrandsPage = props => {
  // Context members
  const { user, accessToken } = useContext(AuthContext);

  // Get translations
  const { t, lang } = useTranslation();
  const title = t('brands:brands');

  // Get headers
  const headers = getStaticHeaders(props);
  headers.authorization = accessToken ? `Bearer ${accessToken}` : '';

  const { data, error } = useSWR(
    [GET_ALL_BRANDS, null, headers],
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

  return (
    <Layout>
      <h1>
        {title} - {lang}
      </h1>

      {data && data.getAllBrands && (
        <ul>
          {data.getAllBrands.map(b => (
            <li key={b.id}>
              <Link href={`/${t('layout:brands-slug')}/${b.slug}`}>
                {b.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
};

// Static props
export async function getStaticProps(ctx) {
  const data = await graphQLFetcher(GET_ALL_BRANDS, {}, getStaticHeaders(ctx));
  const trans = await getI18nProps(ctx, ['common', 'brands']);

  return { props: { ...data, ...trans }, revalidate: 1 };
}

// export default BrandsPage;
export default withI18n(BrandsPage);
