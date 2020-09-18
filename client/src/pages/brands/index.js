// Vendor libs
import React from 'react';
import useSWR from 'swr';

// Custom libs
import { graphQLFetcher } from '../../libs/fetchers';

// Queries
import { GET_ALL_BRANDS } from '../../queries/brands';

// Component definition
const BrandsPage = (props) => {
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
      <h1>Brands page</h1>
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
export async function getStaticProps() {
  debugger;
  const data = await graphQLFetcher(GET_ALL_BRANDS);
  return { props: { ...data }, revalidate: 1 };
}

export default BrandsPage;
