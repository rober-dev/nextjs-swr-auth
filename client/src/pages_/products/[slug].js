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
import { GET_PRODUCT_BY_SLUG, GET_PRODUCT_SLUGS } from '../../queries/products';
import { GET_STOCK_BY_PRODUCT } from '../../queries/stock';

// Component definition
const ProductPage = props => {
  // Context members
  const { accessToken } = useContext(AuthContext);

  // Get translations
  const { t, lang } = useTranslation();
  const t_title = t('catalog:product');
  const t_back = t('common:back');

  // Get params
  const router = useRouter();
  const { slug } = router.query;

  // Get headers
  const headers = {
    lng: lang,
    authorization: accessToken ? `Bearer ${accessToken}` : ''
  };

  // Get product data
  const { data: dataProduct, error: errorProduct } = useSWR(
    [GET_PRODUCT_BY_SLUG, { slug }, headers],
    graphQLFetcher,
    {
      initialData: props
    }
  );

  // Get product stock
  const { data: dataStock, error: errorStock } = useSWR(
    [GET_STOCK_BY_PRODUCT, { slug }, headers],
    graphQLFetcher,
    {
      initialData: props
    }
  );

  if (errorProduct) {
    return <div>{`Error: ${errorProduct}`}</div>;
  }

  if (!errorProduct && !dataProduct) {
    return <div>Loading ...</div>;
  }

  const product = dataProduct?.getProductBySlug;
  const stock = dataStock?.getProductStock;

  return (
    <Layout>
      <h1>
        {t_title} - {lang}
      </h1>

      <Link href='/products' lang={lang} key={lang}>
        {t_back}
      </Link>

      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>ID: {product.id}</p>
          <p>SLUG: {product.slug}</p>
          <p>PRICE: {product.price}</p>
          <p>DESCRIPTION: {product.description}</p>
        </div>
      )}

      <hr />

      {stock && (
        <div>
          <h4>Stock</h4>
          <p>CURRENT: {stock.current}</p>
          <p>MIN: {stock.min}</p>
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
  const trans = await getI18nProps(ctx, ['common', 'catalog']);
  const product = await graphQLFetcher(GET_PRODUCT_BY_SLUG, { slug }, headers);
  const stock = await graphQLFetcher(GET_STOCK_BY_PRODUCT, { slug }, headers);

  return { props: { ...product, ...stock, ...trans }, revalidate: 1 };
}

// Static paths
export async function getStaticPaths(ctx) {
  const headers = {
    lng: ctx.lang
  };

  const data = await graphQLFetcher(GET_PRODUCT_SLUGS, {}, headers);
  const paths = data.getProductSlugs.map(slug => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: true
  };
}

export default withI18n(ProductPage);
