// Vendor libs
import React from 'react';
import useSWR from 'swr';
import useTranslation from 'next-translate/useTranslation';

// Custom libs
import { graphQLFetcher } from '../../libs/fetchers';
import { getI18nProps, withI18n } from '../../libs/i18n';

// Queries
import { GET_ALL_BRANDS } from '../../queries/brands';

// Component definition
const BrandsPage = (props) => {
  // Get translations
  const { t, lang } = useTranslation();
  const title = t('brands:brands');

  // Get data
  const { data, error } = useSWR(GET_ALL_BRANDS, graphQLFetcher, {
    initialData: props,
  });

  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  if (!error && !data) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <h1>
        {title} - {lang}
      </h1>
      {data && data.getAllBrands && (
        <ul>
          {data.getAllBrands.map((b) => (
            <li key={b.id}>{b.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

// Static props
export async function getStaticProps(ctx) {
  const data = await graphQLFetcher(GET_ALL_BRANDS);
  const trans = await getI18nProps(ctx, ['common', 'brands']);

  return { props: { ...data, ...trans }, revalidate: 1 };
}

// export default BrandsPage;
export default withI18n(BrandsPage);
