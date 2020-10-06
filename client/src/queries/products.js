import { gql } from 'graphql-request';

export const GET_ALL_PRODUCTS = gql`
  query {
    getAllProducts {
      id
      name
      price
      slug
      description
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query($slug: String!) {
    getProductBySlug(slug: $slug) {
      id
      name
      price
      slug
      description
    }
  }
`;

export const GET_PRODUCT_SLUGS = gql`
  query {
    getProductSlugs
  }
`;
