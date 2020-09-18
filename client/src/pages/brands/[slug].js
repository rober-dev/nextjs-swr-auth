// Vendor libs
import React from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

// Custom libs
import { graphQLFetcher } from '../../libs/fetchers';

// Queries
import { GET_BRAND_BY_SLUG, GET_BRAND_SLUGS } from '../../queries/brands';

// Component definition
const BrandPage = (props) => {
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

  return (
    <>
      <h1>Brand page</h1>
      {data && data.getBrandBySlug && (
        <div>
          <h3>{data.getBrandBySlug.name}</h3>
          <p>{data.getBrandBySlug.id}</p>
          <p>{data.getBrandBySlug.slug}</p>
        </div>
      )}
    </>
  );
};

// Static props
export async function getStaticProps(ctx) {
  const { slug } = ctx.params;
  const data = await graphQLFetcher(GET_BRAND_BY_SLUG, { slug });
  return { props: { ...data }, revalidate: 1 };
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

export default BrandPage;
