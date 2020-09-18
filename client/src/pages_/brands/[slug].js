// Vendor libs
import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

// Custom libs
import { graphQLFetcher } from '../../libs/fetchers';
import { getI18nProps, withI18n } from '../../libs/i18n';

// Custom components
import Layout from '../../layouts/default';

// Queries
import { GET_BRAND_BY_SLUG, GET_BRAND_SLUGS } from '../../queries/brands';

// Component definition
const BrandPage = (props) => {
  // Get translations
  const { t, lang } = useTranslation();
  const title = t('brands:brand');

  // Get params
  const router = useRouter();
  const { slug } = router.query;

  // Get data
  const { data, error } = useSWR(
    [GET_BRAND_BY_SLUG, { slug }],
    graphQLFetcher,
    {
      initialData: props,
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
        {title} - {lang}
      </h1>
      {brand && (
        <div>
          <h3>{brand.name}</h3>
          <p>{brand.id}</p>
          <p>{brand.slug}</p>
        </div>
      )}
    </Layout>
  );
};

// Static props
export async function getStaticProps(ctx) {
  const { slug } = ctx.params;
  const data = await graphQLFetcher(GET_BRAND_BY_SLUG, { slug });
  const trans = await getI18nProps(ctx, ['common', 'brands']);

  console.log(ctx);
  return { props: { ...data, ...trans }, revalidate: 1 };
}

// Static paths
export async function getStaticPaths() {
  const data = await graphQLFetcher(GET_BRAND_SLUGS);
  const paths = data.getBrandSlugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

// export default BrandsPage;
export default withI18n(BrandPage);
